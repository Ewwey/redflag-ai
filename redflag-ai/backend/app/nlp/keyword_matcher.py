import json
import os

KEYWORDS_PATH = os.path.join(os.path.dirname(__file__), "keywords", "scam_keywords.json")

def load_keywords():
    with open(KEYWORDS_PATH, "r") as f:
        return json.load(f)

def match_keywords(text: str):
    """
    Layer 1: checks text against known scam keyword list.
    Returns list of matched entries with phrase, category, and highlighted_text.
    """
    keywords = load_keywords()
    text_lower = text.lower()
    matches = []
    for entry in keywords:
        if entry["phrase"].lower() in text_lower:
            matches.append({
                "phrase": entry["phrase"],
                "category": entry["category"],
                "weight": entry.get("weight", 1),
                "highlighted_text": entry["phrase"]
            })
    return matches
