# --- routers/plans.py ---
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from database.db import SessionLocal
from models.plan_models import MealPlan, Meal
from services.ai_meal_generator import generate_meal_plan
from typing import List
from pydantic import BaseModel
from datetime import date, timedelta

router = APIRouter(prefix="/plans", tags=["Meal Plans"])

# ----------------- Input Schema -------------------
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
    gender: str = "unspecified"
    age: int = 0
    height: float = 0
    weight: float = 0
    activity_level: str = "sedentary"

# ----------------- Dependency -------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ----------------- TDEE Calculator -------------------
activity_factors = {
    "sedentary": 1.2,
    "light": 1.375,
    "moderate": 1.55,
    "very": 1.725,
    "extra": 1.9
}

def calculate_tdee(gender: str, age: int, height: float, weight: float, activity_level: str) -> int:
    if age <= 0 or height <= 0 or weight <= 0:
        return 2000  # fallback
    if gender.lower() == "male":
        bmr = 10 * weight + 6.25 * height - 5 * age + 5
    elif gender.lower() == "female":
        bmr = 10 * weight + 6.25 * height - 5 * age - 161
    else:
        bmr = 10 * weight + 6.25 * height - 5 * age
    factor = activity_factors.get(activity_level.lower(), 1.2)
    return int(bmr * factor)

# ----------------- POST /plans/create -------------------
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

    tdee = calculate_tdee(req.gender, req.age, req.height, req.weight, req.activity_level)

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

# ----------------- GET /plans/{plan_id} -------------------
@router.get("/{plan_id}")
def get_plan(plan_id: int, db: Session = Depends(get_db)):
    plan = db.query(MealPlan).options(joinedload(MealPlan.meals)).filter(MealPlan.id == plan_id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")

    plan_data = {
        "id": plan.id,
        "title": plan.title,
        "start_date": str(plan.start_date),
        "duration": plan.duration,
        "goal": plan.goal,
        "diet": plan.diet,
        "allergies": plan.allergies,
        "health_conditions": plan.health_conditions,
        "lifestyle": plan.lifestyle,
        "user_id": plan.user_id,
        "meals": []
    }

    for meal in sorted(plan.meals, key=lambda x: x.day):
        plan_data["meals"].append({
            "day": meal.day,
            "date": str(meal.date),
            "breakfast": meal.breakfast,
            "lunch": meal.lunch,
            "snacks": meal.snacks,
            "dinner": meal.dinner
        })

    return plan_data

# ----------------- GET /plans?user_id= -------------------
@router.get("/")
def list_plans(user_id: int, db: Session = Depends(get_db)):
    return db.query(MealPlan).filter(MealPlan.user_id == user_id).all()
