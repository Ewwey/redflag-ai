from sqlalchemy.orm import Session
from app.models.scan import Scan
from fastapi import HTTPException
from datetime import datetime

def get_user_history(db: Session, user_id: int, risk_level: str = None, sort: str = "newest"):
    query = db.query(Scan).filter(Scan.user_id == user_id, Scan.deleted_at == None)
    if risk_level:
        query = query.filter(Scan.risk_level == risk_level)
    if sort == "oldest":
        query = query.order_by(Scan.scanned_at.asc())
    else:
        query = query.order_by(Scan.scanned_at.desc())
    return query.all()

def delete_scan(db: Session, scan_id: int, user_id: int):
    scan = db.query(Scan).filter(Scan.id == scan_id, Scan.user_id == user_id).first()
    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found.")
    scan.deleted_at = datetime.utcnow()
    db.commit()
    return {"message": "Scan removed from history."}

def update_feedback(db: Session, scan_id: int, user_id: int, feedback_status: str):
    scan = db.query(Scan).filter(Scan.id == scan_id, Scan.user_id == user_id).first()
    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found.")
    scan.feedback_status = feedback_status
    db.commit()
    return {"message": "Feedback updated."}
