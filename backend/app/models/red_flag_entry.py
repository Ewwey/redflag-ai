from sqlalchemy import Column, Integer, String, Text, DateTime, func
from app.db.database import Base

class RedFlagEntry(Base):
    __tablename__ = "red_flag_entries"

    id = Column(Integer, primary_key=True, index=True)
    phrase = Column(String(255), nullable=False)
    explanation = Column(Text, nullable=False)
    what_to_do = Column(Text, nullable=False)
    category = Column(String(100), nullable=False)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
