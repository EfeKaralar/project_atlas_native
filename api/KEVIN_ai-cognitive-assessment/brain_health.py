"""
Beta App - Simple Animal Naming Test
------------------------------------
This version is a simplified demonstration of our cognitive assessment tool.
It is NOT the clinical-grade algorithm used in our research and pilot studies.

Purpose:
    - Public demo for educational and exploratory use
    - Show basic scoring logic for an animal naming task

Important:
    - NOT a medical device
    - NOT validated for diagnosis
    - Should not be used for clinical decision-making

The clinical-grade version of this algorithm is proprietary and remains private.
"""

from dataclasses import dataclass
import re
from typing import Dict, List

_WORD_RE = re.compile(r"[A-Za-z]+")

def _normalize(text: str) -> List[str]:
    # Lowercase and keep only alphabetic tokens (drops emojis/numbers/punct)
    return [m.group(0).lower() for m in _WORD_RE.finditer(text or "")]

@dataclass
class SimpleBrainHealth:
    # Tunables for the demo scoring (keep simple & transparent)
    repetition_penalty: int = 1  # points lost per repetition
    base_score: int = 100

    def analyze_speech(self, text: str) -> Dict:
        tokens = _normalize(text)
        unique = list(dict.fromkeys(tokens))  # preserve order, dedupe
        total = len(tokens)
        unique_count = len(unique)
        repetitions = max(0, total - unique_count)

        # Simple scores
        memory_score = max(0, self.base_score - self.repetition_penalty * repetitions)
        # “Brain health score” here is just the same for demo transparency;
        # you could blend more features later.
        brain_health_score = memory_score

        return {
            "tokens": tokens,
            "unique_animals": unique,
            "animal_count": unique_count,      # unique count as per tests
            "total_entries": total,
            "repetitions": repetitions,
            "memory_score": memory_score,      # 100 if no reps
            "brain_health_score": brain_health_score,
        }

    def generate_report(self, results: Dict) -> str:
        lines = [
            "🧠 AI Cognitive Assessment - Animal Naming (Demo)",
            "-----------------------------------------------",
            f"Total entries:     {results.get('total_entries', 0)}",
            f"Unique animals:    {results.get('animal_count', 0)}",
            f"Repetitions:       {results.get('repetitions', 0)}",
            f"Memory score:      {results.get('memory_score', 0)} / 100",
            f"Brain health score:{results.get('brain_health_score', 0)} / 100",
            "",
            "Unique list: " + ", ".join(results.get('unique_animals', [])) if results.get('unique_animals') else "Unique list: (none)",
            "",
            "Disclaimer: Demo-only. Not clinical-grade. Not for diagnosis.",
        ]
        return "\n".join(lines)
