import { useEffect, useState } from "react";

const API = "https://policy-impact-api.onrender.com";

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

  useEffect(() => {
    fetch(`${API}/policies`)
      .then(res => res.json())
      .then(setPolicies)
      .catch(console.error);
  }, []);

  const fetchImpact = async (id, setter) => {
    if (!id) return setter(null);
    const res = await fetch(`${API}/policy/${id}/impact`);
    const data = await res.json();
    setter(data.impact);
  };

  const bg = dark ? "#020617" : "#f4f6fb";
  const card = dark ? "#020617" : "#ffffff";
  const text = dark ? "#e5e7eb" : "#111827";
  const muted = dark ? "#94a3b8" : "#475569";

  const positive = ["Growth", "Boost", "Rise", "Expansion", "Uplift", "Eased"];

  return (
    <div style={{ minHeight: "100vh", background: bg, color: text, fontFamily: "Inter, system-ui" }}>
      {/* HEADER */}
      <div style={{
        padding: "50px",
        background: dark
          ? "linear-gradient(135deg, #020617, #020617)"
          : "linear-gradient(135deg, #0f2027, #2c5364)",
        borderBottomLeftRadius: "40px",
        borderBottomRightRadius: "40px"
      }}>
        <h1 style={{ fontSize: "42px" }}>📊 Public Policy Impact Dashboard</h1>
        <p style={{ opacity: 0.85 }}>Executive-style policy analysis and comparison</p>

        <div style={{ marginTop: "25px", display: "flex", gap: "16px" }}>
          <button onClick={() => setMode("single")} style={{ background: mode === "single" ? "#22c55e" : "#e5e7eb" }}>
            Single Policy
          </button>
          <button onClick={() => setMode("compare")} style={{ background: mode === "compare" ? "#22c55e" : "#e5e7eb" }}>
            Compare Policies
          </button>
          <button onClick={() => setDark(!dark)}>
            {dark ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>

      {/* BODY */}
      <div style={{ maxWidth: "1200px", margin: "auto", padding: "50px" }}>
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
              <div style={{ marginTop: "40px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
                {Object.entries(impact).map(([k, v]) => (
                  <div key={k} style={{ background: card, padding: "25px", borderRadius: "18px" }}>
                    <div style={{ color: muted }}>{k}</div>
                    <div style={{ fontSize: "28px", color: positive.includes(v.effect) ? "#22c55e" : "#ef4444" }}>
                      {v.effect}
                    </div>
                    <div style={{ fontSize: "14px", color: muted }}>{v.detail}</div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        <div style={{ marginTop: "80px", textAlign: "center", opacity: 0.6 }}>
          Built by <strong>Harsh S. Pandav</strong>
        </div>
      </div>
    </div>
  );
}
