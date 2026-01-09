from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ALWAYS add CORS first
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://policy-impact-dashboard.vercel.app",
        "https://policy-impact-dashboard-ui.vercel.app",
        "https://policy-impact-dashboard-by-harsh-pandav.onrender.com",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

POLICIES = [
    {"id": 1, "name": "GST Reform", "year": 2017},
    {"id": 2, "name": "Digital India", "year": 2015},
    {"id": 3, "name": "Make in India", "year": 2014},
    {"id": 4, "name": "Startup India", "year": 2016},
]

IMPACTS = {
    1: {"Economy": {"effect": "Boost", "detail": "Unified tax improved compliance"}},
    2: {"Technology": {"effect": "Expansion", "detail": "Digital infrastructure growth"}},
    3: {"Manufacturing": {"effect": "Rise", "detail": "FDI inflow increased"}},
    4: {"Startups": {"effect": "Boost", "detail": "Funding support"}},
}

@app.get("/")
def root():
    return {"status": "API running"}

@app.get("/policies")
def get_policies():
    return POLICIES

@app.get("/policy/{policy_id}/impact")
def get_policy_impact(policy_id: int):
    return {"impact": IMPACTS.get(policy_id, {})}
