from pydantic import BaseModel, field_validator
from typing import Optional, List
import bleach

MIN_CHARS = 50
MAX_CHARS = 5000

class ScanRequest(BaseModel):
    job_description: str

    @field_validator('job_description')
    @classmethod
    def validate_text(cls, v):
        clean = bleach.clean(v, tags=[], strip=True)
        if len(clean) < MIN_CHARS:
            raise ValueError(f'Text too short. Please enter at least {MIN_CHARS} characters.')
        if len(clean) > MAX_CHARS:
            raise ValueError(f'Text too long. Please keep it under {MAX_CHARS} characters.')
        return clean

class RedFlagResult(BaseModel):
    phrase: str
    category: str
    explanation: str
    highlighted_text: Optional[str]

class ScanResponse(BaseModel):
    scan_id: int
    scam_score: Optional[int]
    risk_level: Optional[str]
    red_flags: List[RedFlagResult]
