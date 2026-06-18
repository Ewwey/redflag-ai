from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api import auth, scans, guide, profile
from app.db.database import create_tables

app = FastAPI(title="RedFlag AI API", version="1.0.0")

create_tables()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.ALLOWED_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(scans.router, prefix="/scans", tags=["Scans"])
app.include_router(guide.router, prefix="/guide", tags=["Guide"])
app.include_router(profile.router, prefix="/profile", tags=["Profile"])

@app.get("/")
def root():
    return {"message": "RedFlag AI API is running"}