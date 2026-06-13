from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.auth import RegisterRequest, LoginRequest
from app.core.security import hash_password, verify_password, create_access_token
from fastapi import HTTPException

def register_user(db: Session, data: RegisterRequest):
    existing = db.query(User).filter(User.email == data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="This email is already registered. Please log in instead.")
    user = User(
        email=data.email,
        display_name=data.display_name,
        password_hash=hash_password(data.password)
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"message": "Account created successfully"}

def login_user(db: Session, data: LoginRequest):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Incorrect email or password. Please try again.")
    token = create_access_token({"sub": str(user.id)})
    return {"access_token": token, "token_type": "bearer"}
