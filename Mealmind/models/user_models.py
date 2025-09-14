from sqlalchemy import Column, Integer, String, DateTime, Boolean
from database.db import Base
import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=True)
    google_id = Column(String, nullable=True)
    trial_start = Column(DateTime, default=datetime.datetime.utcnow)
    is_subscribed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
