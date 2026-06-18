import pickle
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), "keywords", "model.pkl")

def load_model():
    if not os.path.exists(MODEL_PATH):
        return None
    with open(MODEL_PATH, "rb") as f:
        return pickle.load(f)

def classify_text(text: str) -> float:
    """
    Layer 2: uses trained scikit-learn classifier.
    Returns a probability score (0.0 to 1.0) that the text is a scam.
    Falls back to 0 if model not trained yet.
    """
    model = load_model()
    if model is None:
        return 0.0
    prediction = model.predict_proba([text])
    return float(prediction[0][1])
