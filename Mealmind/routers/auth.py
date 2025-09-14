from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database.db import SessionLocal
from models.user_models import User
from passlib.context import CryptContext
from jose import jwt
import datetime

from database.schemas import UserCreate, UserLogin, TokenResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = "mysecret"

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pw = pwd_context.hash(user.password)
    new_user = User(email=user.email, hashed_password=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully"}


@router.post("/login", response_model=TokenResponse)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not pwd_context.verify(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token_data = {
        "sub": db_user.email,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=12)
    }
    token = jwt.encode(token_data, SECRET_KEY, algorithm="HS256")
    return {"access_token": token, "token_type": "bearer"}


@router.get("/google-oauth")
def google_oauth_stub():
    return {"message": "Google OAuth flow will be implemented here."}
