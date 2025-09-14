from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.db import SessionLocal
from models.user_models import User
from models.plan_models import MealPlan
from datetime import datetime, timedelta

router = APIRouter(prefix="/trial", tags=["Trial"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/status")
def check_trial(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    days_left = 7 - (datetime.utcnow() - user.trial_start).days
    plan_count = db.query(MealPlan).filter(MealPlan.user_id == user_id).count()
    return {"trial_days_left": max(0, days_left), "plans_created": plan_count, "is_subscribed": user.is_subscribed}
