from sqlalchemy.orm import Session
from app.models.scan import Scan, ProcessingStatus, RiskLevel
from app.models.scan_red_flag import ScanRedFlag
from app.schemas.scan import ScanRequest
from app.nlp.scorer import compute_score
from app.nlp.red_flag_detector import detect_red_flags
from datetime import datetime

def process_scan(db: Session, user_id: int, data: ScanRequest):
    # Create scan record with Pending status
    scan = Scan(
        user_id=user_id,
        job_description=data.job_description,
        text_preview=data.job_description[:150],
        processing_status=ProcessingStatus.pending
    )
    db.add(scan)
    db.commit()
    db.refresh(scan)

    try:
        score, risk_level = compute_score(data.job_description)
        red_flags = detect_red_flags(db, data.job_description)

        scan.scam_score = score
        scan.risk_level = risk_level
        scan.processing_status = ProcessingStatus.completed

        for flag in red_flags:
            entry = ScanRedFlag(
                scan_id=scan.id,
                red_flag_id=flag["id"],
                highlighted_text=flag.get("highlighted_text")
            )
            db.add(entry)

        db.commit()
        db.refresh(scan)
        return {"scan_id": scan.id, "scam_score": score, "risk_level": risk_level, "red_flags": red_flags}

    except Exception as e:
        scan.processing_status = ProcessingStatus.failed
        db.commit()
        raise Exception("Something went wrong during analysis. Please try again later.")
