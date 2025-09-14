
from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional, List

# -----------------------
# ✅ PLAN CREATION SCHEMA
# -----------------------

class PlanRequest(BaseModel):
    title: str
    start_date: date
    duration: int
    goal: str
    diet: str
    allergies: Optional[str] = ""
    health_conditions: Optional[str] = ""
    lifestyle: Optional[str] = ""
    user_id: int
    gender: str = "unspecified"  # male, female, unspecified
    age: int = 0
    height: float = 0  # cm
    weight: float = 0  # kg
    activity_level: str = "sedentary"  # sedentary, light, moderate, very, extra


# -----------------------
# ✅ PLAN RESPONSE SCHEMAS
# -----------------------

class MealBase(BaseModel):
    day: int
    date: date
    breakfast: dict
    lunch: dict
    snacks: dict
    dinner: dict
    cheat_day: bool

    class Config:
        from_attributes = True

class PlanResponse(BaseModel):
    id: int
    title: str
    start_date: date
    duration: int
    goal: str
    diet: str
    allergies: Optional[str]
    health_conditions: Optional[str]
    lifestyle: Optional[str]
    user_id: int
    meals: Optional[List[MealBase]] = []

    class Config:
        from_attributes = True
