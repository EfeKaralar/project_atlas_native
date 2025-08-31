# tests/test_basic.py
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from brain_health import SimpleBrainHealth


# --- Core tests from specs ---

def test_basic_analysis():
    analyzer = SimpleBrainHealth()
    results = analyzer.analyze_speech("cat dog cow")

    assert results['animal_count'] == 3
    assert 'brain_health_score' in results
    assert results.get('memory_score', 100) == 100  # No repetitions

def test_empty_input():
    analyzer = SimpleBrainHealth()
    results = analyzer.analyze_speech("")

    assert results['animal_count'] == 0
    assert 'repetitions' in results

def test_with_repetitions():
    analyzer = SimpleBrainHealth()
    results = analyzer.analyze_speech("cat dog cat")

    assert results['animal_count'] == 2  # Only unique animals
    assert results['repetitions'] == 1


# --- Edge cases ---

def test_case_insensitivity_and_punctuation():
    """
    Same animals with different casing and punctuation.
    Expect duplicates to be counted as repetitions after normalization.
    """
    analyzer = SimpleBrainHealth()
    text = "Cat, cat! DOG; dog... cow"
    results = analyzer.analyze_speech(text)

    assert results['animal_count'] == 3           # {'cat','dog','cow'}
    assert results['repetitions'] == 2            # extra 'cat' + extra 'dog'

def test_extra_whitespace_and_newlines():
    """
    Irregular spacing, tabs, and newlines should not change counts.
    """
    analyzer = SimpleBrainHealth()
    text = "   cat   \n   dog\tcow   "
    results = analyzer.analyze_speech(text)

    assert results['animal_count'] == 3
    assert results.get('memory_score', 100) == 100

def test_mixed_delimiters_with_spaces():
    """
    Punctuation with spaces is common in user input.
    If your tokenizer splits on whitespace only, this still passes.
    """
    analyzer = SimpleBrainHealth()
    text = "cat, dog; cow"
    results = analyzer.analyze_speech(text)

    assert results['animal_count'] == 3

def test_robust_to_numbers_and_symbols():
    """
    Ensure function doesn't crash when non-words appear.
    We only assert key presence and that at least 'cat' is counted.
    """
    analyzer = SimpleBrainHealth()
    text = "cat 123 @#! dog 🚀"
    results = analyzer.analyze_speech(text)

    # Expect at least the known tokens to be handled
    assert 'animal_count' in results
    assert 'repetitions' in results
    # If your logic keeps only alphabetic tokens, expected unique is 2
    # If not, you can relax this assertion to >= 2.
    assert results['animal_count'] >= 2

def test_long_input_perf_and_counts():
    """
    Stress test: many repeats of a few animals.
    Expect high repetition count but stable unique animal_count.
    """
    analyzer = SimpleBrainHealth()
    text = ("cat " * 100) + ("dog " * 100)
    results = analyzer.analyze_speech(text.strip())

    assert results['animal_count'] == 2           # {'cat','dog'}
    assert results['repetitions'] == 198          # 99 extra 'cat' + 99 extra 'dog'
    assert 'brain_health_score' in results        # sanity check: still returns a score


if __name__ == "__main__":
    # Allow running as a script too
    test_basic_analysis()
    test_empty_input()
    test_with_repetitions()
    test_case_insensitivity_and_punctuation()
    test_extra_whitespace_and_newlines()
    test_mixed_delimiters_with_spaces()
    test_robust_to_numbers_and_symbols()
    test_long_input_perf_and_counts()
    print("✅ All tests passed!")
