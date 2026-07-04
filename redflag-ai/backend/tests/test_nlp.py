# Tests for NLP keyword matching and classifier output
# TODO: Sprint 3/5 — validate scam score calculation and red flag detection
import sys
import os
import pytest

# Adjust pathing so Python can locate the root 'app' directory
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.nlp.scorer import compute_score
from app.nlp.keyword_matcher import load_keywords

def test_high_risk_scam_detection():
    """Verifies blatant scams with heavy keywords hit the Suspicious/Danger brackets."""
    scam_text = "Urgent Hiring! Earn 5000 PHP daily encoding data from home. No experience required. Send registration fee to secure slot."
    
    score, risk_level = compute_score(scam_text)
    
    assert score >= 40, f"Expected critical keyword hits, got {score}"
    assert risk_level in ["Suspicious", "Danger"]


def test_suspicious_job_detection():
    """Dynamically reads a real phrase from the JSON file to confirm matching works."""
    keywords_list = load_keywords()
    
    # Fallback to a default if the JSON file happens to be completely empty
    if not keywords_list:
        sample_phrase = "registration fee"
    else:
        # Pull the very first valid phrase your team defined in the JSON file
        sample_phrase = keywords_list[0]["phrase"]
        
    suspicious_text = f"This job requires an authorized {sample_phrase} process."
    
    score, risk_level = compute_score(suspicious_text)
    
    assert score > 0, f"Expected keyword '{sample_phrase}' to trigger a match score above 0"


def test_legitimate_job_description():
    """Verifies a completely clean corporate job description scores zero."""
    clean_text = "Junior Software Engineer position. Requirements: Proficiency in Python, understanding of REST APIs, and familiarity with Git. Offers medical insurance."
    
    score, risk_level = compute_score(clean_text)
    
    assert score == 0, f"Expected clean text to score exactly 0, got {score}"
    assert risk_level == "Safe"
