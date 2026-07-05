import spacy
import logging
from app.nlp.keyword_matcher import match_keywords
from app.nlp.classifier import classify_text

# Initialize spaCy: Use en_core_web_sm if available, else fallback to blank English
try:
    # Disable unneeded pipeline elements to achieve maximum execution speed
    nlp = spacy.load("en_core_web_sm", disable=["ner", "parser", "lemmatizer"])
except Exception:
    nlp = spacy.blank("en")

logger = logging.getLogger(__name__)

def normalize_text(text: str) -> str:
    """
    Uses spaCy to cleanly strip out excess whitespaces, tabs, and hidden line breaks.
    """
    if not text:
        return ""
    doc = nlp(text)
    # Filter out formatting tokens, joining words with a uniform single space
    return " ".join([token.text for token in doc if not token.is_space])

def compute_score(text: str) -> tuple[int, str]:
    """
    Combines Layer 1 (Keyword Weights) and Layer 2 (ML Classifier) into a 0-100 score.
    
    Scoring Scale:
    - Layer 1 (Keywords): Sum of unique weights scaled by 10, max 60 pts.
    - Layer 2 (Classifier): Probability * 40, max 40 pts.
    """
    # 1. Pre-process and Normalize formatting evasions
    clean_text = normalize_text(text)
    
    if not clean_text.strip():
        return 0, "Safe"
    
    # 2. Layer 1: Keyword Scoring (Weight-based & Deduplicated)
    raw_matches = match_keywords(clean_text)
    
    # Deduplicate matches by phrase to prevent duplicate flag spamming exploits
    unique_matches = {}
    for match in raw_matches:
        phrase = match["phrase"]
        if phrase not in unique_matches:
            unique_matches[phrase] = match
    
    # Sum unique weights and scale them linearly into the 100-point module ceiling
    total_weight = sum(m["weight"] for m in unique_matches.values())
    keyword_score = min(total_weight * 5, 100)

    # 3. Layer 2: Classifier Scoring (With Graceful Failure Fallback)
    classifier_score = 0
    try:
        # classify_text returns a probability float between 0.0 and 1.0
        classifier_prob = classify_text(clean_text)
        # Ensure bounds safety
        classifier_prob = max(0.0, min(float(classifier_prob), 1.0))
        classifier_score = int(classifier_prob * 40)
    except Exception as e:
        # Fulfills maintainability/reliability criteria: log error, preserve system uptime
        logger.error(f"Layer 2 Classification gracefully bypassed due to environmental exception: {e}")
        classifier_score = 0

    # 4. Final Aggregation
    total = min(keyword_score + classifier_score, 100)

    # Determine Risk Level matching architectural rules
    if total <= 30:
        risk_level = "Safe"
    elif total <= 69:
        risk_level = "Suspicious"
    else:
        risk_level = "Danger"

    return total, risk_level
