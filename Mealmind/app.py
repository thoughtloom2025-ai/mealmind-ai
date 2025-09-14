from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import all routers
from routers import (
    auth, trial, plans, dashboard,
    tracker, notifications, tokens,
    subscription, google_fit
)

app = FastAPI()

# CORS (if frontend is calling backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register all routers
app.include_router(auth.router)
app.include_router(trial.router)
app.include_router(plans.router)
app.include_router(dashboard.router)  # ✅ Include here
app.include_router(tracker.router)
app.include_router(notifications.router)
app.include_router(tokens.router)
app.include_router(subscription.router)
app.include_router(google_fit.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
