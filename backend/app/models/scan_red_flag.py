from sqlalchemy import Column, Integer, Text
from app.db.database import Base

class ScanRedFlag(Base):
    __tablename__ = "scan_red_flags"

    id = Column(Integer, primary_key=True, index=True)
    scan_id = Column(Integer, nullable=False, index=True)
    red_flag_id = Column(Integer, nullable=False, index=True)
    highlighted_text = Column(Text, nullable=True)
