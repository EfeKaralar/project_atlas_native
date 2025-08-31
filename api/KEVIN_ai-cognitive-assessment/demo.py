
from brain_health import SimpleBrainHealth

def main():
    print("🧠 AI Cognitive Assessment - Demo")
    print("=" * 40)
    
    # Example text
    text = input("Enter animals (or press Enter for demo): ").strip()
    
    if not text:
        text = "cat dog cow horse pig sheep lion tiger bear elephant"
        print(f"Using demo text: {text}")
    
    # Analyze
    analyzer = SimpleBrainHealth()
    results = analyzer.analyze_speech(text)
    
    # Show report
    print(analyzer.generate_report(results))

if __name__ == "__main__":
    main()
