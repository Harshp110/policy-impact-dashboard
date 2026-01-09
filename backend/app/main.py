from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

POLICIES = [
    {"id": 1, "name": "GST Reform", "year": 2017},
    {"id": 2, "name": "Digital India", "year": 2015},
    {"id": 3, "name": "Make in India", "year": 2014},
    {"id": 4, "name": "Startup India", "year": 2016},
]

IMPACTS = {
    1: {
        "Economy": {"effect": "Boost", "detail": "Unified tax improved compliance"},
        "Business": {"effect": "Growth", "detail": "Simplified interstate trade"},
    },
    2: {
        "Technology": {"effect": "Expansion", "detail": "Digital infrastructure growth"},
        "Governance": {"effect": "Uplift", "detail": "Online services adoption"},
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

@app.get("/")
def root():
    return {"status": "API running"}

@app.get("/policies")
def get_policies():
    return POLICIES

@app.get("/policy/{policy_id}/impact")
def get_policy_impact(policy_id: int):
    return {"impact": IMPACTS.get(policy_id, {})}
