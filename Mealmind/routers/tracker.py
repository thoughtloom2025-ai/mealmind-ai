from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.db import SessionLocal
from models.plan_models import Meal

router = APIRouter(prefix="/tracker", tags=["Tracker"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/complete")
def mark_meal_complete(plan_id: int, day: int, db: Session = Depends(get_db)):
    meal = db.query(Meal).filter(Meal.plan_id == plan_id, Meal.day == day).first()
    if not meal:
        return {"message": "Meal not found"}
    meal.cheat_day = False
    db.commit()
    return {"message": "Meal marked as complete"}

@router.post("/cheat")
def mark_cheat_day(plan_id: int, day: int, db: Session = Depends(get_db)):
    meal = db.query(Meal).filter(Meal.plan_id == plan_id, Meal.day == day).first()
    if not meal:
        return {"message": "Meal not found"}
    meal.cheat_day = True
    db.commit()
    return {"message": "Cheat day marked"}
