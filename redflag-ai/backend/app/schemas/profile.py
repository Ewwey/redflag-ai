from pydantic import BaseModel, EmailStr
from typing import Optional

class ProfileUpdateRequest(BaseModel):
    display_name: Optional[str] = None
    email: Optional[EmailStr] = None
    current_password: Optional[str] = None
    new_password: Optional[str] = None
    confirm_password: Optional[str] = None
