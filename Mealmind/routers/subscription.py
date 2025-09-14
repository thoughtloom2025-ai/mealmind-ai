from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.db import SessionLocal
from models.user_models import User

router = APIRouter(prefix="/subscription", tags=["Subscription"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/upgrade")
def upgrade(user_id: int, plan: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return {"message": "User not found"}
    user.is_subscribed = True
    db.commit()
    return {"message": f"User upgraded to {plan} plan"}
