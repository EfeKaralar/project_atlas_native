# app.py
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pydantic_core.core_schema import none_schema
from brain_health import SimpleBrainHealth
import whisper
import tempfile
import os
import torch
import logging

app = FastAPI(title="Brain Health Demo API", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_analyzer = SimpleBrainHealth()

# Logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initializing Whisper model at startup
logger.info("=================LOADING WHISPER MODEL=================")
device = "cuda" if torch.cuda.is_available() else "cpu"

print("\n")
logger.info(f"[DEBUG] Using device for transcription: {device}\n")

whisper_model_name = "base"
_model = whisper.load_model(whisper_model_name).to(device)
print("\n")
logger.info(f"[DEBUG] Whisper {whisper_model_name} model loaded successfully!\n")

class AnalyzeIn(BaseModel):
    text: str

class AnalyzeOut(BaseModel):
    animal_count: int
    repetitions: int
    memory_score: int
    brain_health_score: int
    report: str

class TranscriptionOut(BaseModel):
    text: str

@app.post("/transcribe", response_model=TranscriptionOut)
async def trascribe_audio(file: UploadFile = File(...)):
    temp_file_path = None
    try:
        print(f"[DEBUG] Starting transcription for file: {file.filename}")
        
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".wav")
        temp_file_path = temp_file.name
        
        content = await file.read()
        temp_file.write(content)
        temp_file.close()
        
        logging.info(f"[DEBUG] Temporary file saved: {temp_file_path}")
        
        logging.info("[DEBUG] Running Whisper transcription")
        result = _model.transcribe(temp_file_path, fp16=(device == "cuda"))
        
        transcribed_text = result["text"].strip()
        
        logging.info(f"[DEBUG] Transcription completed: '{transcribed_text[:50]}...'")
        
        return TranscriptionOut(
            text=transcribed_text
        )
        
    except Exception as e:
        logging.error(f"[ERROR] Transcription error: {str(e)}")
        
        # TODO: Change to an actual fallback procedure
        logging.error("[ERROR] Using fallback transcription...")
        return TranscriptionOut(
            text="cat dog bird fish elephant lion tiger bear wolf deer rabbit squirrel mouse rat hamster guinea pig",
            confidence=0.85
        )
    
    finally:
        if temp_file_path and os.path.exists(temp_file_path):
            try:
                os.unlink(temp_file_path)
                logging.info(f"[DEBUG] Cleaned up temporary file: {temp_file_path}")
            except Exception as e:
                logging.error(f"[ERROR] Failed to clean up temp file: {e}")
# TODO: Handle empty input
# TODO: Fix scoring
@app.post("/analyze", response_model=AnalyzeOut)
def analyze(inp: AnalyzeIn):
    res = _analyzer.analyze_speech(inp.text)
    return {
        "animal_count": res["animal_count"],
        "repetitions": res["repetitions"],
        "memory_score": res["memory_score"],
        "brain_health_score": res["brain_health_score"],
        "report": _analyzer.generate_report(res),
    }
