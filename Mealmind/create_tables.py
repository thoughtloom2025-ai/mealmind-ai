# create_tables.py
from database.db import Base, engine
from models import plan_models, user_models  # import all models

# Create all tables
Base.metadata.create_all(bind=engine)

print("✅ All tables created successfully.")
