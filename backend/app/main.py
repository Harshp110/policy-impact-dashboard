from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Public Policy Impact Analysis API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

POLICIES = [
    {"id": 1, "name": "Fuel Price Revision", "year": 2022, "description": "Fuel price hike due to global oil markets"},
    {"id": 2, "name": "GST Rate Change", "year": 2021, "description": "GST reduction on essential goods"},
    {"id": 3, "name": "Minimum Wage Revision", "year": 2020, "description": "Increase in minimum wage"},
    {"id": 4, "name": "Corporate Tax Cut", "year": 2019, "description": "Tax reduction to boost investments"},
    {"id": 5, "name": "Infrastructure Push", "year": 2023, "description": "Increased spending on public infrastructure"},
    {"id": 6, "name": "Employment Guarantee Expansion", "year": 2021, "description": "Expanded rural employment scheme"},
]

IMPACT_DATA = {
    1: {
        "Inflation": {
            "effect": "Surge",
            "detail": "Fuel cost increase caused cost-push inflation across goods",
        },
        "Transport": {
            "effect": "Spike",
            "detail": "Higher diesel prices raised logistics and freight charges",
        },
        "Spending": {
            "effect": "Dip",
            "detail": "Households reduced discretionary spending",
        },
    },
    2: {
        "Inflation": {
            "effect": "Eased",
            "detail": "Lower GST reduced prices of essential commodities",
        },
        "Revenue": {
            "effect": "Uplift",
            "detail": "Improved compliance increased indirect tax collection",
        },
        "Spending": {
            "effect": "Boost",
            "detail": "Consumers responded positively to lower prices",
        },
    },
    3: {
        "Employment": {
            "effect": "Increase",
            "detail": "Higher minimum wages improved worker income security",
        },
        "Inflation": {
            "effect": "Mild Rise",
            "detail": "Increased labor costs slightly raised service prices",
        },
    },
    4: {
        "Investment": {
            "effect": "Boost",
            "detail": "Lower corporate tax improved capital expenditure",
        },
        "Revenue": {
            "effect": "Short-term Dip",
            "detail": "Initial reduction in tax collections",
        },
    },
    5: {
        "Employment": {
            "effect": "Growth",
            "detail": "Large-scale infrastructure projects created jobs",
        },
        "GDP": {
            "effect": "Expansion",
            "detail": "Capital expenditure stimulated economic activity",
        },
        "Fiscal Deficit": {
            "effect": "Widened",
            "detail": "Higher public spending increased fiscal pressure",
        },
    },
    6: {
        "Employment": {
            "effect": "Expansion",
            "detail": "Rural job guarantees absorbed seasonal unemployment",
        },
        "Spending": {
            "effect": "Stabilized",
            "detail": "Income support sustained rural consumption",
        },
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
    return {
        "policy_id": policy_id,
        "impact": IMPACT_DATA.get(policy_id, {}),
    }
