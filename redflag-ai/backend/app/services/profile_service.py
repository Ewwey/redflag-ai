from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.user import User
from app.schemas.profile import ProfileUpdateRequest
from app.core.security import hash_password, verify_password


def update_profile(db: Session, current_user: User, data: ProfileUpdateRequest) -> User:

    # --- Update display name ---
    if data.display_name is not None:
        stripped = data.display_name.strip()
        if not stripped:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Display name cannot be empty."
            )
        current_user.display_name = stripped

    # --- Update email ---
    if data.email is not None and data.email != current_user.email:
        existing = db.query(User).filter(User.email == data.email).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="This email is already in use by another account."
            )
        current_user.email = data.email

    # --- Update password ---
    if data.new_password is not None:
        # Must also provide current password
        if not data.current_password:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Current password is required to set a new password."
            )
        # Verify current password is correct
        if not verify_password(data.current_password, current_user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Current password is incorrect."
            )
        # New password and confirm must match
        if data.new_password != data.confirm_password:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Passwords do not match."
            )
        # Minimum length
        if len(data.new_password) < 8:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Password must be at least 8 characters long."
            )
        current_user.password_hash = hash_password(data.new_password)

    db.commit()
    db.refresh(current_user)
    return current_user