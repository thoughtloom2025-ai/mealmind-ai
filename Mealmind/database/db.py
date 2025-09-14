from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./mealmind.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

# 👇 Import all models BEFORE this line
from models import user_models, plan_models

# 💣 DEV ONLY: Drop all tables and recreate them (to apply new fields like 'date')
#Base.metadata.drop_all(bind=engine)     # ← Drops old schema
Base.metadata.create_all(bind=engine)   # ← Recreates with updated schema
