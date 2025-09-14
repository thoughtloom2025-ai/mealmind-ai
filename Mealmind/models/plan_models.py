from sqlalchemy import Column, Integer, String, ForeignKey, Date, Boolean, JSON
from sqlalchemy.orm import relationship
from database.db import Base

class MealPlan(Base):
    __tablename__ = "meal_plans"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    start_date = Column(Date)
    duration = Column(Integer)
    goal = Column(String)
    diet = Column(String)
    allergies = Column(String)
    health_conditions = Column(String)
    lifestyle = Column(String)

    meals = relationship("Meal", back_populates="plan")

class Meal(Base):
    __tablename__ = "meals"
    id = Column(Integer, primary_key=True, index=True)
    plan_id = Column(Integer, ForeignKey("meal_plans.id"))
    day = Column(Integer)
    date = Column(Date, nullable=False)  # ✅ ADD THIS LINE

    breakfast = Column(JSON)
    lunch = Column(JSON)
    snacks = Column(JSON)
    dinner = Column(JSON)
    cheat_day = Column(Boolean, default=False)

    plan = relationship("MealPlan", back_populates="meals")
