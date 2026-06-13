from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.dependencies import get_db, get_current_user
from app.schemas.scan import ScanRequest, ScanResponse
from app.services.scan_service import process_scan
from app.services.history_service import get_user_history, delete_scan, update_feedback

router = APIRouter()

@router.post("/", response_model=ScanResponse)
def submit_scan(data: ScanRequest, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    # TODO: Sprint 3 — call NLP model and save result
    return process_scan(db, current_user.id, data)

@router.get("/")
def get_history(risk_level: str = None, sort: str = "newest", db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    # TODO: Sprint 4 — return filtered + sorted scan history
    return get_user_history(db, current_user.id, risk_level, sort)

@router.get("/{scan_id}")
def get_scan(scan_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    # TODO: Sprint 4 — return single scan detail
    pass

@router.delete("/{scan_id}")
def remove_scan(scan_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    # TODO: Sprint 4 — soft delete
    return delete_scan(db, scan_id, current_user.id)

@router.patch("/{scan_id}/feedback")
def report_feedback(scan_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    # TODO: Sprint 4 — update feedback_status
    pass
