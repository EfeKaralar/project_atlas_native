// TODO: Add metric tracking

// TODO: Implement network detection for development and production
// import * as Network from 'expo-network';

// const getApiBaseUrl = async () => {
//   if (__DEV__) {
//     try {
//       const ipAddress = await Network.getIpAddressAsync();
//       return `http://${ipAddress}:8000`;
//     } catch (error) {
//       // Fallback to hardcoded IP if network detection fails
//       console.log('Network detection failed, using fallback IP');
//       return 'http://192.168.106.98:8000';
//     }
//   } else {
//     return "production_url";
//   }
// };

import { API_CONFIG } from "../config/api";

const API_BASE_URL = API_CONFIG.baseUrl;

console.log(`BACKEND FROM: ${API_BASE_URL}`);

export interface AnalyzeRequest {
  text: string;
}


export interface AnalyzeResponse {
  animal_count: number;
  repetitions: number;
  memory_score: number;
  brain_health_score: number;
  report: string;
}

export interface TranscriptionResponse {
  text: string;
  confidence: number;
}


class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // Transcribe audio file to text
  async transcribeAudio(audioUri: string): Promise<TranscriptionResponse> {
    try {
      console.log('[DEBUG] Starting audio transcription...');
      
      const formData = new FormData();
      formData.append('file', {
        uri: audioUri,
        type: 'audio/wav',
        name: 'recording.wav',
      } as any);

      const response = await fetch(`${this.baseUrl}/transcribe`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[ERROR] Response not OK:', response.status, errorText)
        throw new Error(`Transcription failed: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('[DEBUG] Transcription completed:', result);
      
      return {text: result.transcription, confidence: 1.0};
    } catch (error) {
      console.error('[ERROR] Transcription error:', error);
      
      // Fallback: For demo purposes, return a mock transcription
      // TODO: Change to an actual fallback procedure
      console.log('[ERROR] Using fallback transcription for demo...');
      return {
        text: "cat dog bird fish elephant lion tiger bear wolf deer rabbit squirrel mouse rat hamster guinea pig",
        confidence: 0.85
      };
    }
  }

  // Analyze transcribed text
  async analyzeText(text: string): Promise<AnalyzeResponse> {
    try {
      console.log('[DEBUG] Starting cognitive analysis...');
      
      const response = await fetch(`${this.baseUrl}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('[DEBUG] Analysis completed:', result);
      
      return result;
    } catch (error) {
      console.error('[ERROR] Analysis error:', error);
      
      // Fallback: Return mock analysis data for demo
      // TODO: Change to an actual fallback procedure
      console.log('[ERROR] Using fallback analysis for demo...');
      return {
        animal_count: 15,
        repetitions: 2,
        memory_score: 85,
        brain_health_score: 85,
        report: `🧠 AI Cognitive Assessment - Animal Naming (Demo)
-----------------------------------------------
Total entries:     17
Unique animals:    15
Repetitions:       2
Memory score:      85 / 100
Brain health score:85 / 100

Unique list: cat, dog, bird, fish, elephant, lion, tiger, bear, wolf, deer, rabbit, squirrel, mouse, rat, hamster

Disclaimer: Demo-only. Not clinical-grade. Not for diagnosis.`
      };
    }
  }

  // Combined function: transcribe and analyze
  async transcribeAndAnalyze(audioUri: string): Promise<{
    transcription: TranscriptionResponse;
    analysis: AnalyzeResponse;
  }> {
    console.log('🔄 Starting transcription and analysis pipeline...');
    
    // Step 1: Transcribe audio
    const transcription = await this.transcribeAudio(audioUri);
    
    // Step 2: Analyze the transcribed text
    const analysis = await this.analyzeText(transcription.text);
    
    console.log('✅ Pipeline completed successfully');
    
    return {
      transcription,
      analysis,
    };
  }

  // Check if API server is running
  async checkServerHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/docs`);
      return response.ok;
    } catch (error) {
      console.log('[ERROR] API server not available:', error);
      return false;
    }
  }
}

// Export singleton instance
export const apiService = new ApiService();