import { useEffect, useState } from "react";

const API = "https://policy-impact-dashboard-by-harsh-pandav.onrender.com";

export default function App() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch policies");
        return res.json();
      })
      .then(data => {
        setPolicies(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Backend not reachable");
        setLoading(false);
      });
  }, []);

  /* ================= LOAD IMPACT ================= */
  const fetchImpact = async (id, setter) => {
    if (!id) return setter(null);
    try {
      const res = await fetch(`${API}/policy/${id}/impact`);
      const data = await res.json();
      setter(data.impact);
    } catch {
      setter(null);
    }
  };

  const bg = dark ? "#020617" : "#f4f6fb";
  const card = dark ? "#020617" : "#ffffff";
  const text = dark ? "#e5e7eb" : "#111827";
  const muted = dark ? "#94a3b8" : "#475569";

  const positive = ["Growth", "Boost", "Rise", "Expansion", "Uplift", "Eased"];

  return (
    <div style={{ minHeight: "100vh", background: bg, color: text }}>
      {/* HEADER */}
      <div style={{
        padding: "50px",
        background: "linear-gradient(135deg, #0f2027, #2c5364)",
        borderBottomLeftRadius: "40px",
        borderBottomRightRadius: "40px"
      }}>
        <h1>📊 Public Policy Impact Dashboard</h1>
        <p>Executive-style policy analysis and comparison</p>

        <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
          <button onClick={() => setMode("single")}>Single Policy</button>
          <button onClick={() => setMode("compare")}>Compare Policies</button>
          <button onClick={() => setDark(!dark)}>
            {dark ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>

      {/* BODY */}
      <div style={{ padding: 50 }}>
        {loading && <p>Loading policies…</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* SINGLE POLICY */}
        {mode === "single" && !loading && (
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
              <div style={{ marginTop: 30, display: "grid", gap: 20 }}>
                {Object.entries(impact).map(([k, v]) => (
                  <div key={k} style={{ background: card, padding: 20 }}>
                    <strong>{k}</strong>
                    <div style={{
                      color: positive.includes(v.effect) ? "green" : "red"
                    }}>
                      {v.effect}
                    </div>
                    <small style={{ color: muted }}>{v.detail}</small>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* COMPARE */}
        {mode === "compare" && !loading && (
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
              <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {[impactA, impactB].map((imp, i) => (
                  <div key={i} style={{ background: card, padding: 20 }}>
                    {Object.entries(imp).map(([k, v]) => (
                      <div key={k}>
                        <strong>{k}</strong>: {v.effect}
                        <div style={{ fontSize: 12 }}>{v.detail}</div>
                      </div>
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
