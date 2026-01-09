import { useEffect, useState } from "react";

/* ✅ CORRECT LIVE BACKEND */
const API = "https://policy-impact-dashboard-by-harsh-pandav.onrender.com";

export default function App() {
  const [policies, setPolicies] = useState([]);
  const [mode, setMode] = useState("single");

  const [selected, setSelected] = useState("");
  const [impact, setImpact] = useState(null);

  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [impactA, setImpactA] = useState(null);
  const [impactB, setImpactB] = useState(null);

  const [dark, setDark] = useState(false);

  /* ================= LOAD POLICIES ================= */
  useEffect(() => {
    fetch(`${API}/policies`)
      .then(res => res.json())
      .then(data => {
        console.log("POLICIES:", data);
        setPolicies(data);
      })
      .catch(err => console.error(err));
  }, []);

  /* ================= LOAD IMPACT ================= */
  const fetchImpact = async (id, setter) => {
    if (!id) return setter(null);
    const res = await fetch(`${API}/policy/${id}/impact`);
    const data = await res.json();
    setter(data.impact);
  };

  /* ================= THEME ================= */
  const bg = dark ? "#020617" : "#f4f6fb";
  const card = dark ? "#020617" : "#ffffff";
  const text = dark ? "#e5e7eb" : "#111827";
  const muted = dark ? "#94a3b8" : "#475569";
  const positive = ["Growth", "Boost", "Rise", "Expansion", "Uplift", "Eased"];

  return (
    <div style={{ minHeight: "100vh", background: bg, color: text }}>

      {/* ================= HEADER ================= */}
      <div style={{
        padding: 50,
        background: "linear-gradient(135deg, #0f2027, #2c5364)",
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40
      }}>
        <h1 style={{ fontSize: 42 }}>📊 Public Policy Impact Dashboard</h1>
        <p>Executive-style policy analysis and comparison</p>

        <div style={{ marginTop: 20, display: "flex", gap: 16 }}>
          <button onClick={() => setMode("single")}
            style={{ background: mode === "single" ? "#22c55e" : "#e5e7eb" }}>
            Single Policy
          </button>

          <button onClick={() => setMode("compare")}
            style={{ background: mode === "compare" ? "#22c55e" : "#e5e7eb" }}>
            Compare Policies
          </button>

          <button onClick={() => setDark(!dark)}>
            {dark ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>

      {/* ================= BODY ================= */}
      <div style={{ maxWidth: 1200, margin: "auto", padding: 50 }}>

        {/* ===== SINGLE POLICY ===== */}
        {mode === "single" && (
          <>
            <select
              value={selected}
              onChange={e => {
                setSelected(e.target.value);
                fetchImpact(e.target.value, setImpact);
              }}
            >
              <option value="">Select a policy</option>
              {policies.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.year})
                </option>
              ))}
            </select>

            {impact && (
              <div style={{
                marginTop: 40,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))",
                gap: 24
              }}>
                {Object.entries(impact).map(([k, v]) => (
                  <div key={k} style={{
                    background: card,
                    padding: 25,
                    borderRadius: 18
                  }}>
                    <div style={{ color: muted }}>{k}</div>
                    <div style={{
                      fontSize: 26,
                      color: positive.includes(v.effect) ? "#22c55e" : "#ef4444"
                    }}>
                      {v.effect}
                    </div>
                    <div style={{ fontSize: 14, color: muted }}>
                      {v.detail}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ===== COMPARISON MODE ===== */}
        {mode === "compare" && (
          <>
            <div style={{ display: "flex", gap: 20 }}>
              <select onChange={e => {
                setA(e.target.value);
                fetchImpact(e.target.value, setImpactA);
              }}>
                <option value="">Policy A</option>
                {policies.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>

              <select onChange={e => {
                setB(e.target.value);
                fetchImpact(e.target.value, setImpactB);
              }}>
                <option value="">Policy B</option>
                {policies.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {impactA && impactB && (
              <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
                {[impactA, impactB].map((imp, i) => (
                  <div key={i} style={{ background: card, padding: 30, borderRadius: 20 }}>
                    <h3>{i === 0 ? "Policy A" : "Policy B"}</h3>
                    {Object.entries(imp).map(([k, v]) => (
                      <p key={k}>
                        <b>{k}</b>: {v.effect} — {v.detail}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        <div style={{ marginTop: 80, textAlign: "center", opacity: 0.6 }}>
          Built by <strong>Harsh S. Pandav</strong>
        </div>
      </div>
    </div>
  );
}
