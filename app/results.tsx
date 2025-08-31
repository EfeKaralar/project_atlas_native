import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnalyzeResponse, apiService, TranscriptionResponse } from './services/api';

const { width, height } = Dimensions.get('window');

interface ResultsData {
  transcription: TranscriptionResponse;
  analysis: AnalyzeResponse;
  age: string;
  sessionId: string;
  audioUri: string;
}

export default function ResultsScreen() {
  const params = useLocalSearchParams<{
    age: string;
    sessionId: string;
    audioUri: string;
  }>();

  const [results, setResults] = useState<ResultsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.audioUri) {
      processRecording();
    }
  }, [params.audioUri]);

  const processRecording = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('🔄 Processing recording...');
      console.log('Audio URI:', params.audioUri);

      // Transcribe and analyze the recording
      const { transcription, analysis } = await apiService.transcribeAndAnalyze(params.audioUri);

      setResults({
        transcription,
        analysis,
        age: params.age || 'Unknown',
        sessionId: params.sessionId || 'Unknown',
        audioUri: params.audioUri,
      });

    } catch (error) {
      console.error('❌ Processing error:', error);
      setError('Failed to process recording. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return '#4CAF50'; // Green
    if (score >= 60) return '#FF9800'; // Orange
    return '#F44336'; // Red
  };

  const getScoreLevel = (score: number): string => {
    if (score >= 90) return '�� Brain Master';
    if (score >= 80) return '💪 Brain Athlete';
    if (score >= 70) return '🎯 Sharp Mind';
    if (score >= 60) return '📚 Learning';
    return '🌱 Growing';
  };

  const handleShare = () => {
    Alert.alert(
      'Share Results',
      'Sharing functionality will be added soon!',
      [{ text: 'OK' }]
    );
  };

  const handleNewAssessment = () => {
    router.push('/');
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" backgroundColor="#000000" translucent />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>🤖 AI Agents Analyzing...</Text>
          <Text style={styles.loadingSubtext}>Processing your cognitive assessment</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" backgroundColor="#000000" translucent />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>❌ {error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={processRecording}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!results) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" backgroundColor="#000000" translucent />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No results available</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#000000" translucent />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🧠 Brain Health Results</Text>
          <Text style={styles.subtitle}>Your AI Cognitive Assessment</Text>
        </View>

        {/* Score Card */}
        <View style={styles.scoreCard}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.scoreGradient}
          >
            <Text style={styles.scoreLabel}>Brain Health Score</Text>
            <Text style={[styles.scoreValue, { color: getScoreColor(results.analysis.brain_health_score) }]}>
              {results.analysis.brain_health_score}
            </Text>
            <Text style={styles.scoreMax}>/ 100</Text>
            <Text style={styles.scoreLevel}>{getScoreLevel(results.analysis.brain_health_score)}</Text>
          </LinearGradient>
        </View>

        {/* Metrics */}
        <View style={styles.metricsContainer}>
          <View style={styles.metricRow}>
            <View style={styles.metric}>
              <Text style={styles.metricValue}>{results.analysis.animal_count}</Text>
              <Text style={styles.metricLabel}>Unique Animals</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricValue}>{results.analysis.repetitions}</Text>
              <Text style={styles.metricLabel}>Repetitions</Text>
            </View>
            <View style={styles.metric}>
              <Text style={[styles.metricValue, { color: getScoreColor(results.analysis.memory_score) }]}>
                {results.analysis.memory_score}
              </Text>
              <Text style={styles.metricLabel}>Memory Score</Text>
            </View>
          </View>
        </View>

        {/* Transcription */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎤 What You Said</Text>
          <View style={styles.transcriptionBox}>
            <Text style={styles.transcriptionText}>{results.transcription.text}</Text>
            <Text style={styles.confidenceText}>
              Confidence: {(results.transcription.confidence * 100).toFixed(1)}%
            </Text>
          </View>
        </View>

        {/* Detailed Report */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Detailed Analysis</Text>
          <View style={styles.reportBox}>
            <Text style={styles.reportText}>{results.analysis.report}</Text>
          </View>
        </View>

        {/* Session Info */}
        <View style={styles.sessionInfo}>
          <Text style={styles.sessionText}>Age: {results.age}</Text>
          <Text style={styles.sessionText}>Session: {results.sessionId}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Text style={styles.shareButtonText}>📤 Share Results</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.newButton} onPress={handleNewAssessment}>
            <Text style={styles.newButtonText}>🔄 New Assessment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  loadingText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  loadingSubtext: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  errorText: {
    fontSize: 18,
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#667eea',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
  },
  scoreCard: {
    marginHorizontal: 24,
    marginBottom: 30,
    borderRadius: 16,
    overflow: 'hidden',
  },
  scoreGradient: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 72,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  scoreMax: {
    fontSize: 24,
    color: '#FFFFFF',
    opacity: 0.7,
    marginBottom: 12,
  },
  scoreLevel: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  metricsContainer: {
    marginHorizontal: 24,
    marginBottom: 30,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metric: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 20,
    marginHorizontal: 4,
    borderRadius: 12,
  },
  metricValue: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: '#CCCCCC',
    textAlign: 'center',
  },
  section: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 12,
  },
  transcriptionBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
  },
  transcriptionText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    marginBottom: 8,
  },
  confidenceText: {
    fontSize: 12,
    color: '#CCCCCC',
    fontStyle: 'italic',
  },
  reportBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
  },
  reportText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
    fontFamily: 'monospace',
  },
  sessionInfo: {
    marginHorizontal: 24,
    marginBottom: 24,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  sessionText: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
  },
  actionButtons: {
    marginHorizontal: 24,
    marginBottom: 40,
    gap: 12,
  },
  shareButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  newButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  newButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
