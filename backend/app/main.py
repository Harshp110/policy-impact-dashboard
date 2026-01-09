from fastapi import FastAPI
from typing import List

app = FastAPI(title="Public Policy Impact Analysis API")

# ---- MOCK DATA (TEMP, REALISTIC) ----

POLICIES = [
    {
        "id": 1,
        "name": "Fuel Price Revision",
        "year": 2022,
        "description": "Increase in fuel prices due to global market changes"
    },
    {
        "id": 2,
        "name": "GST Rate Change",
        "year": 2021,
        "description": "GST rate reduction on essential goods"
    },
    {
        "id": 3,
        "name": "Minimum Wage Revision",
        "year": 2020,
        "description": "Increase in minimum wage for industrial workers"
    }
]

IMPACT_DATA = {
    1: {
        "inflation": "+1.2%",
        "transport_cost": "+8%",
        "consumer_spending": "-2%"
    },
    2: {
        "inflation": "-0.6%",
        "consumer_spending": "+3%",
        "tax_revenue": "+1.1%"
    },
    3: {
        "employment": "+4%",
        "msme_cost": "+2%",
        "household_income": "+6%"
    }
}

# ---- ROUTES ----

@app.get("/")
def root():
    return {"status": "API running"}

@app.get("/policies", response_model=List[dict])
def get_policies():
    return POLICIES

@app.get("/policy/{policy_id}/impact")
def get_policy_impact(policy_id: int):
    impact = IMPACT_DATA.get(policy_id)
    if not impact:
        return {"error": "Policy not found"}
    return {
        "policy_id": policy_id,
        "impact": impact
    }
