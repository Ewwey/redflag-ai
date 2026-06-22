import json
import os

KEYWORDS_PATH = os.path.join(os.path.dirname(__file__), "keywords", "scam_keywords.json")

def load_keywords():
    """Loads the scam keywords from the JSON definition file."""
    if not os.path.exists(KEYWORDS_PATH):
        return []
    with open(KEYWORDS_PATH, "r") as f:
        return json.load(f)

def match_keywords(text: str):
    """
    Layer 1: Checks normalized text against known scam keyword list.
    
    CRITICAL: Returns the original 'phrase' from JSON to ensure 
    compatibility with RedFlagEntry database lookups.
    """
    keywords = load_keywords()
    text_lower = text.lower()
    matches = []
    
    for entry in keywords:
        phrase_to_find = entry["phrase"].lower()
        
        # Simple but effective substring check for phrases
        if phrase_to_find in text_lower:
            matches.append({
                "phrase": entry["phrase"],  # Exact original string for DB mapping
                "category": entry["category"],
                "weight": entry.get("weight", 1),
                "highlighted_text": entry["phrase"] 
            })
            
    return matches
