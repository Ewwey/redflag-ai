from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.dependencies import get_db, get_current_user
from app.schemas.profile import ProfileUpdateRequest

router = APIRouter()

@router.put("/")
def update_profile(data: ProfileUpdateRequest, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    # TODO: Sprint 4 — update display_name, email, password
    pass
