from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.db import SessionLocal
from models.user_models import User
from datetime import datetime

router = APIRouter(prefix="/tokens", tags=["Tokens"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/award")
def award_token(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return {"message": "User not found"}
    # In real case, you would store earned tokens
    return {"message": "👍 Token awarded for completion!"}

@router.get("/share")
def share_token(user_id: int):
    return {"message": "🎖 Token shared to social!", "user": user_id}
