from sqlalchemy import Column, Integer, String, Text
from app.db.database import Base

class JobHuntingTip(Base):
    __tablename__ = "job_hunting_tips"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    display_order = Column(Integer, default=0)
