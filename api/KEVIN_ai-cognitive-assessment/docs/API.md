# API (Beta) – Agentic AI Cognitive Assessment
**Base URL (local):** `http://127.0.0.1:8000`  
**Interactive docs (auto):** `/docs`
## POST /analyze
Analyze an animal-naming text sample.
### Request (JSON)
```json
{
  "text": "cat dog cat"
}
```
### Response 200 (JSON)
```json
{
  "animal_count": 2,
  "repetitions": 1,
  "memory_score": 99,
  "brain_health_score": 99,
  "report": "🧠 AI Cognitive Assessment - Animal Naming (Demo)\n..."
}
```
> **Notes:**  
> - This beta API is for demonstration purposes only.  
> - Not for clinical or diagnostic use.  
> - The clinical-grade API is proprietary and available only through licensing agreements.
