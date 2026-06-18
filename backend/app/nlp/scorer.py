from app.nlp.keyword_matcher import match_keywords
from app.nlp.classifier import classify_text

def compute_score(text: str):
    """
    Combines Layer 1 (keyword matching) and Layer 2 (classifier) into a final Scam Score (0-100).
    Risk level: 0-30 = Safe, 31-69 = Suspicious, 70-100 = Danger
    """
    keyword_matches = match_keywords(text)
    keyword_score = min(len(keyword_matches) * 15, 60)  # max 60 pts from keywords

    classifier_prob = classify_text(text)
    classifier_score = int(classifier_prob * 40)  # max 40 pts from classifier

    total = min(keyword_score + classifier_score, 100)

    if total <= 30:
        risk_level = "Safe"
    elif total <= 69:
        risk_level = "Suspicious"
    else:
        risk_level = "Danger"

    return total, risk_level
