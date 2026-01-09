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

  /* ================= FETCH POLICIES ================= */
  useEffect(() => {
    fetch(`${API}/policies`)
      .then(res => res.json())
      .then(data => setPolicies(data))
      .catch(err => {
        console.error("Failed to load policies", err);
        setPolicies([]);
      });
  }, []);

  /* ================= FETCH IMPACT ================= */
  const fetchImpact = async (id, setter) => {
    if (!id) {
      setter(null);
      return;
    }

    try {
      const res = await fetch(`${API}/policy/${id}/impact`);
      const data = await res.json();
      setter(data.impact);
    } catch (err) {
      console.error("Impact fetch failed", err);
      setter(null);
    }
  };

  /* ================= THEME ================= */
  const bg = dark ? "#020617" : "#f4f6fb";
  const card = dark ? "#020617" : "#ffffff";
  const text = dark ? "#e5e7eb" : "#111827";
  const muted = dark ? "#94a3b8" : "#475569";

  const positive = ["Growth", "Boost", "Rise", "Expansion", "Uplift", "Eased"];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: bg,
        color: text,
        fontFamily: "Inter, system-ui"
      }}
    >
      {/* ================= HEADER ================= */}
      <div
        style={{
          padding: "50px",
          background: dark
            ? "linear-gradient(135deg, #020617, #020617)"
            : "linear-gradient(135deg, #0f2027, #2c5364)",
          borderBottomLeftRadius: "40px",
          borderBottomRightRadius: "40px"
        }}
      >
        <h1 style={{ fontSize: "42px", marginBottom: "8px" }}>
          📊 Public Policy Impact Dashboard
        </h1>
        <p style={{ opacity: 0.85 }}>
          Executive-style policy analysis and comparison
        </p>

        <div style={{ marginTop: "25px", display: "flex", gap: "16px" }}>
          <button
            onClick={() => setMode("single")}
            style={{
              padding: "10px 16px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              background: mode === "single" ? "#22c55e" : "#e5e7eb"
            }}
          >
            Single Policy
          </button>

          <button
            onClick={() => setMode("compare")}
            style={{
              padding: "10px 16px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              background: mode === "compare" ? "#22c55e" : "#e5e7eb"
            }}
          >
            Compare Policies
          </button>

          <button
            onClick={() => setDark(!dark)}
            style={{
              padding: "10px 16px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer"
            }}
          >
            {dark ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>

      {/* ================= BODY ================= */}
      <div style={{ maxWidth: "1200px", margin: "auto", padding: "50px" }}>
        {/* ---------- SINGLE POLICY ---------- */}
        {mode === "single" && (
          <>
            <select
              value={selected}
              onChange={e => {
                setSelected(e.target.value);
                fetchImpact(e.target.value, setImpact);
              }}
              style={{
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid #cbd5f5",
                minWidth: "320px"
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
              <div
                style={{
                  marginTop: "40px",
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "24px"
                }}
              >
                {Object.entries(impact).map(([k, v]) => (
                  <div
                    key={k}
                    style={{
                      background: card,
                      padding: "25px",
                      borderRadius: "18px",
                      boxShadow: "0 15px 30px rgba(0,0,0,0.08)"
                    }}
                  >
                    <div style={{ fontSize: "14px", color: muted }}>{k}</div>
                    <div
                      style={{
                        fontSize: "28px",
                        fontWeight: 600,
                        color: positive.includes(v.effect)
                          ? "#22c55e"
                          : "#ef4444"
                      }}
                    >
                      {v.effect}
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        marginTop: "6px",
                        color: muted
                      }}
                    >
                      {v.detail}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ================= FOOTER ================= */}
        <div
          style={{
            marginTop: "80px",
            textAlign: "center",
            fontSize: "14px",
            opacity: 0.6
          }}
        >
          Built by <strong>Harsh S. Pandav</strong>
        </div>
      </div>
    </div>
  );
}
