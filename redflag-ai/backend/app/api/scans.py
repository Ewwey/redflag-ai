from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.dependencies import get_db, get_current_user
from app.schemas.scan import ScanRequest, ScanResponse
from app.services.scan_service import process_scan
from app.services.history_service import get_user_history, delete_scan, update_feedback
from app.models.scan import Scan
from app.models.scan_red_flag import ScanRedFlag
from app.models.red_flag_entry import RedFlagEntry

router = APIRouter()


@router.post("/", response_model=ScanResponse)
def submit_scan(data: ScanRequest, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return process_scan(db, current_user.id, data)


@router.get("/")
def get_history(risk_level: str = None, sort: str = "newest", db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    scans = get_user_history(db, current_user.id, risk_level, sort)
    return [
        {
            "id": s.id,
            "scan_id": s.id,
            "scanned_at": s.scanned_at.isoformat() if s.scanned_at else None,
            "job_description": s.job_description,
            "text_preview": s.text_preview,
            "scam_score": s.scam_score,
            "risk_level": s.risk_level.value if s.risk_level else None,
            "feedback_status": s.feedback_status.value if s.feedback_status else None,
        }
        for s in scans
    ]


@router.get("/{scan_id}")
def get_scan(scan_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    scan = db.query(Scan).filter(
        Scan.id == scan_id,
        Scan.user_id == current_user.id,
        Scan.deleted_at == None
    ).first()

    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found.")

    # Fetch associated red flags
    scan_flags = db.query(ScanRedFlag).filter(ScanRedFlag.scan_id == scan.id).all()
    red_flags = []
    for sf in scan_flags:
        entry = db.query(RedFlagEntry).filter(RedFlagEntry.id == sf.red_flag_id).first()
        if entry:
            red_flags.append({
                "phrase": entry.phrase,
                "category": entry.category,
                "explanation": entry.explanation,
                "highlighted_text": sf.highlighted_text,
            })

    return {
        "id": scan.id,
        "scan_id": scan.id,
        "scanned_at": scan.scanned_at.isoformat() if scan.scanned_at else None,
        "job_description": scan.job_description,
        "text_preview": scan.text_preview,
        "scam_score": scan.scam_score,
        "risk_level": scan.risk_level.value if scan.risk_level else None,
        "feedback_status": scan.feedback_status.value if scan.feedback_status else None,
        "red_flags": red_flags,
    }


@router.delete("/{scan_id}")
def remove_scan(scan_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return delete_scan(db, scan_id, current_user.id)


@router.patch("/{scan_id}/feedback")
def report_feedback(scan_id: int, feedback_status: str, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return update_feedback(db, scan_id, current_user.id, feedback_status)