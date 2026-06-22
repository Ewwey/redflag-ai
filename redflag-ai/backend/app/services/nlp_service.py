from app.nlp.scorer import compute_score
from app.nlp.keyword_matcher import match_keywords

def analyze_text(text: str):
    score, risk_level = compute_score(text)
    matches = match_keywords(text)

    return {
        "score": score,
        "risk_level": risk_level,
        "red_flags": matches
    }