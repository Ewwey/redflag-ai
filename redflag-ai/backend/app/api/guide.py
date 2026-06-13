from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.dependencies import get_db

router = APIRouter()

@router.get("/red-flags")
def get_red_flags(db: Session = Depends(get_db)):
    # TODO: Sprint 4 — return all RED_FLAG_ENTRIES (public, no auth)
    pass

@router.get("/tips")
def get_tips(db: Session = Depends(get_db)):
    # TODO: Sprint 4 — return all JOB_HUNTING_TIPS (public, no auth)
    pass
