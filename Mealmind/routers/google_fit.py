from fastapi import APIRouter

router = APIRouter(prefix="/google-fit", tags=["Google Fit"])

@router.get("/connect")
def connect():
    return {"message": "🔗 Google Fit OAuth URL to be implemented"}

@router.get("/sync")
def sync():
    return {"steps": 12000, "calories_burned": 540, "active_minutes": 60}
