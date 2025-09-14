# --- routers/plans.py ---
from database.schemas import PlanResponse

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.db import SessionLocal
from models.plan_models import MealPlan, Meal
from services.ai_meal_generator import generate_meal_plan
from models.user_models import User
from typing import List
from pydantic import BaseModel
from datetime import date, timedelta

router = APIRouter(prefix="/plans", tags=["Meal Plans"])

class PlanRequest(BaseModel):
    title: str
    start_date: date
    duration: int
    goal: str
    diet: str
    allergies: str = ""
    health_conditions: str = ""
    lifestyle: str = ""
    user_id: int
    gender: str = "unspecified"  # male, female, unspecified
    age: int = 0
    height: float = 0  # cm
    weight: float = 0  # kg
    activity_level: str = "sedentary"  # sedentary, light, moderate, very, extra

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

activity_factors = {
    "sedentary": 1.2,
    "light": 1.375,
    "moderate": 1.55,
    "very": 1.725,
    "extra": 1.9
}

def calculate_tdee(gender: str, age: int, height: float, weight: float, activity_level: str) -> int:
    if age <= 0 or height <= 0 or weight <= 0:
        return 2000  # fallback value

    if gender.lower() == "male":
        bmr = 10 * weight + 6.25 * height - 5 * age + 5
    elif gender.lower() == "female":
        bmr = 10 * weight + 6.25 * height - 5 * age - 161
    else:
        bmr = 10 * weight + 6.25 * height - 5 * age

    factor = activity_factors.get(activity_level.lower(), 1.2)
    return int(bmr * factor)

@router.post("/create")
def create_plan(req: PlanRequest, db: Session = Depends(get_db)):
    plan = MealPlan(
        title=req.title,
        start_date=req.start_date,
        duration=req.duration,
        goal=req.goal,
        diet=req.diet,
        allergies=req.allergies,
        health_conditions=req.health_conditions,
        lifestyle=req.lifestyle,
        user_id=req.user_id
    )
    db.add(plan)
    db.commit()
    db.refresh(plan)

    # Calculate calories
    tdee = calculate_tdee(req.gender, req.age, req.height, req.weight, req.activity_level)

    # Generate Meals using full input data
    meals_data = generate_meal_plan(
        goal=req.goal,
        diet=req.diet,
        allergies=req.allergies,
        calories=tdee,
        health_conditions=req.health_conditions,
        lifestyle=req.lifestyle
    )

    for day in range(1, req.duration + 1):
        meal_date = req.start_date + timedelta(days=day - 1)
        meal = Meal(plan_id=plan.id, day=day, date=meal_date, **meals_data)
        db.add(meal)
    db.commit()

    return {"message": "Meal plan created", "plan_id": plan.id}

@router.get("/{plan_id}")
def get_plan(plan_id: int, db: Session = Depends(get_db)):
    plan = db.query(MealPlan).filter(MealPlan.id == plan_id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")
    return plan

@router.get("/")
def list_plans(user_id: int, db: Session = Depends(get_db)):
    return db.query(MealPlan).filter(MealPlan.user_id == user_id).all()
