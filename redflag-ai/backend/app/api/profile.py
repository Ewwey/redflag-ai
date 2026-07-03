from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.dependencies import get_db, get_current_user
from app.schemas.profile import ProfileUpdateRequest
from app.services.profile_service import update_profile

router = APIRouter()


@router.put("/")
def update_profile_route(
    data: ProfileUpdateRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    updated_user = update_profile(db, current_user, data)
    return {
        "message": "Profile updated successfully.",
        "user": {
            "id": updated_user.id,
            "email": updated_user.email,
            "display_name": updated_user.display_name,
        }
    }