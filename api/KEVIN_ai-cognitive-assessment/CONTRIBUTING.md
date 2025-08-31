# Contributing to AI Cognitive Assessment

Thank you for your interest in contributing! We welcome contributions to the beta version while protecting the patent-pending clinical algorithm.

## 📋 Before You Start

### Contributor License Agreement (CLA)
Due to the patent-pending status of this technology, all contributors must sign a Contributor License Agreement. This ensures:
- Your contributions can be included without affecting patent rights
- You retain copyright to your contributions
- The project can maintain its dual licensing structure

Please email otminfo@psu.edu to receive the CLA.

## 🤝 How to Contribute

### Types of Contributions Welcome

✅ **We Accept:**
- Bug fixes to the beta code
- Documentation improvements
- Example scripts and demos
- UI/UX improvements for the demo app
- Test cases for the beta version
- Translations for international users
- Performance optimizations to the beta code

❌ **We Cannot Accept:**
- Changes to core scoring algorithms
- Additions to clinical features
- Modifications that might affect patent claims
- Medical or diagnostic features

### Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/jkevin2010/ai-cognitive-assessment.git
   cd ai-cognitive-assessment
   ```

2. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the code style guide below
   - Add tests if applicable
   - Update documentation

4. **Test your changes**
   ```bash
   pytest tests/
   ```

5. **Submit a Pull Request**
   - Describe what your change does
   - Reference any relevant issues
   - Confirm you've signed the CLA

## 📝 Code Style Guide

- **Python**: Follow PEP 8
- **Comments**: Clear and concise
- **Functions**: Include docstrings
- **Variables**: Use descriptive names

Example:
```python
def analyze_speech(self, text: str) -> Dict:
    """
    Analyze speech for cognitive patterns.
    
    Args:
        text: Transcribed speech text
        
    Returns:
        Dictionary containing analysis results
    """
    # Implementation here
```

## 🐛 Reporting Issues

### Bug Reports
Please include:
- Python version
- Operating system
- Steps to reproduce
- Expected vs actual behavior
- Error messages (if any)

### Feature Requests
- Describe the feature
- Explain the use case
- Note: We cannot add clinical features to the public version

## 💬 Questions?

- **Technical questions**: Open an issue
- **Licensing questions**: otminfo@psu.edu
- **Research questions**: jkevin2010.kj@gmail.com

## 🏆 Recognition

Contributors will be acknowledged in:
- README.md contributors section
- Academic publications (where appropriate)
- Release notes

## ⚖️ Legal Notes

- Contributions are licensed under MIT (beta code only)
- Clinical algorithm remains proprietary
- Patent rights are retained by Pennsylvania State University
- By contributing, you agree to these terms

## 🚀 Development Setup

```bash
# Install development dependencies
pip install -r requirements.txt
pip install -r requirements-dev.txt

# Run tests
pytest

# Run with coverage
pytest --cov=brain_health tests/
```

## 📊 Current Priorities

We're especially interested in contributions for:
1. Mobile app UI improvements
2. Multi-language support
3. Better demo visualizations
4. Educational content about cognitive health
5. Integration examples with web frameworks

Thank you for helping advance cognitive health technology! 🧠
