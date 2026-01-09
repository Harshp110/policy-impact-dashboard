from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ✅ CORS — MUST be right after app creation
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://policy-impact-dashboard.vercel.app",
        "https://policy-impact-dashboard-ui.vercel.app",
        "https://policy-impact-dashboard-by-harsh-pandav.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------ MOCK DATA ------------------

policies = [
    {"id": 1, "name": "GST Reform", "year": 2017},
    {"id": 2, "name": "Digital India", "year": 2015},
    {"id": 3, "name": "Make in India", "year": 2014},
    {"id": 4, "name": "Startup India", "year": 2016},
]

impacts = {
    1: {
        "Economy": {"effect": "Boost", "detail": "Unified tax improved compliance"},
        "Business": {"effect": "Growth", "detail": "Easier interstate trade"},
    },
    2: {
        "Technology": {"effect": "Expansion", "detail": "Digital infrastructure growth"},
        "Governance": {"effect": "Uplift", "detail": "E-services adoption"},
    },
    3: {
        "Manufacturing": {"effect": "Rise", "detail": "FDI inflow increased"},
        "Jobs": {"effect": "Growth", "detail": "Employment generation"},
    },
    4: {
        "Startups": {"effect": "Boost", "detail": "Funding & incubation support"},
        "Innovation": {"effect": "Expansion", "detail": "New tech ventures"},
    },
}

# ------------------ ROUTES ------------------

@app.get("/")
def root():
    return {"status": "API running"}

@app.get("/policies")
def get_policies():
    return policies

@app.get("/policy/{policy_id}/impact")
def get_policy_impact(policy_id: int):
    return {"impact": impacts.get(policy_id, {})}
