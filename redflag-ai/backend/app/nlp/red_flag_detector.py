from sqlalchemy.orm import Session
from app.nlp.keyword_matcher import match_keywords
from app.models.red_flag_entry import RedFlagEntry

def detect_red_flags(db: Session, text: str):
    """
    Matches keywords found in text against RED_FLAG_ENTRIES in the database.
    Returns full red flag details including explanation and highlighted text.
    """
    keyword_hits = match_keywords(text)
    results = []
    for hit in keyword_hits:
        entry = db.query(RedFlagEntry).filter(RedFlagEntry.phrase == hit["phrase"]).first()
        if entry:
            results.append({
                "id": entry.id,
                "phrase": entry.phrase,
                "category": entry.category,
                "explanation": entry.explanation,
                "highlighted_text": hit.get("highlighted_text")
            })
    return results
