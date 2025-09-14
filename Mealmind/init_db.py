from database.db import Base, engine
from models.user_models import User
from models.plan_models import MealPlan, Meal

Base.metadata.create_all(bind=engine)
