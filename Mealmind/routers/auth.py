from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database.db import SessionLocal
from models.user_models import User
from jose import jwt
import datetime
import requests
from config.settings import settings

router = APIRouter(prefix="/auth", tags=["Authentication"])

SECRET_KEY = settings.JWT_SECRET_KEY or "mysecret"

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/google-oauth")
def google_oauth(google_token: dict, db: Session = Depends(get_db)):
    try:
        # Verify Google ID token
        google_response = requests.get(
            f"https://oauth2.googleapis.com/tokeninfo?id_token={google_token['credential']}"
        )

        if google_response.status_code != 200:
            raise HTTPException(status_code=400, detail="Invalid Google token")

        google_user_info = google_response.json()
        email = google_user_info.get("email")
        google_id = google_user_info.get("sub")

        if not email:
            raise HTTPException(status_code=400, detail="Email not found in Google account")

        # Check if user exists
        existing_user = db.query(User).filter(User.email == email).first()

        if existing_user:
            # Update Google ID if not set
            if not existing_user.google_id:
                existing_user.google_id = google_id
                db.commit()
            user = existing_user
        else:
            # Create new user
            user = User(
                email=email,
                google_id=google_id,
                hashed_password=None  # No password for OAuth users
            )
            db.add(user)
            db.commit()
            db.refresh(user)

        # Create JWT token
        token_data = {
            "sub": user.email,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=12)
        }
        token = jwt.encode(token_data, SECRET_KEY, algorithm="HS256")

        return {
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "id": str(user.id),
                "email": user.email,
                "name": google_user_info.get("name", "")
            }
        }

    except requests.RequestException:
        raise HTTPException(status_code=400, detail="Failed to verify Google token")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Authentication failed")