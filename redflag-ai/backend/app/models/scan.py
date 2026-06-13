from sqlalchemy import Column, Integer, String, Text, DateTime, Enum, func
from app.db.database import Base
import enum

class RiskLevel(str, enum.Enum):
    safe = "Safe"
    suspicious = "Suspicious"
    danger = "Danger"

class ProcessingStatus(str, enum.Enum):
    pending = "Pending"
    completed = "Completed"
    failed = "Failed"

class FeedbackStatus(str, enum.Enum):
    none = "None"
    resolved = "Resolved"
    false_positive = "False_Positive"
    false_negative = "False_Negative"

class Scan(Base):
    __tablename__ = "scans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False, index=True)
    job_description = Column(Text, nullable=False)
    text_preview = Column(String(255), nullable=True)
    scam_score = Column(Integer, nullable=True)
    risk_level = Column(Enum(RiskLevel), nullable=True, index=True)
    processing_status = Column(Enum(ProcessingStatus), default=ProcessingStatus.pending)
    feedback_status = Column(Enum(FeedbackStatus), default=FeedbackStatus.none)
    scanned_at = Column(DateTime, default=func.now(), index=True)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    deleted_at = Column(DateTime, nullable=True)
