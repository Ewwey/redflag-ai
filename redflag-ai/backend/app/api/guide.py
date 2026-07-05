from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.dependencies import get_db
from app.models.red_flag_entry import RedFlagEntry
from app.models.job_hunting_tip import JobHuntingTip

router = APIRouter()


@router.get("/red-flags")
def get_red_flags(db: Session = Depends(get_db)):
    entries = db.query(RedFlagEntry).all()
    return [
        {
            "id": e.id,
            "phrase": e.phrase,
            "category": e.category,
            "explanation": e.explanation,
            "what_to_do": e.what_to_do,
        }
        for e in entries
    ]


@router.get("/tips")
def get_tips(db: Session = Depends(get_db)):
    tips = db.query(JobHuntingTip).order_by(JobHuntingTip.display_order).all()
    return [
        {
            "id": t.id,
            "title": t.title,
            "description": t.description,
        }
        for t in tips
    ]