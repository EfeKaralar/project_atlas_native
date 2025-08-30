import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { Audio } from 'expo-av';

const { width, height } = Dimensions.get('window');

// 🔧 TESTING CONFIGURATION - Change this ONE line to adjust timer!
// For development: Set to 10 or 15 for quick testing
// For production: Set to 60 for full assessment
const RECORDING_DURATION = 60; // seconds

export default function RecordingScreen() {
  const { age } = useLocalSearchParams<{ age: string }>();

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(RECORDING_DURATION);
  const [sessionId] = useState<string>(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  // Use refs for values that need to persist across renders
  const recordingRef = useRef<Audio.Recording | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pulseAnimation = useRef(new Animated.Value(1)).current;
  const recordingStartTime = useRef<number>(0);
  const isStoppingRef = useRef<boolean>(false);
  const hasStoppedRef = useRef<boolean>(false); // Prevent multiple stops

  useEffect(() => {
    startRecording();

    return () => {
      cleanup();
    };
  }, []);

  useEffect(() => {
    if (isRecording) {
      // Start pulsing animation for recording indicator
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnimation, {
            toValue: 1.3,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnimation, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      // Stop animation when not recording
      pulseAnimation.stopAnimation();
    }
  }, [isRecording]);

  const cleanup = async () => {
    console.log('🧹 Cleaning up recording resources...');

    // Mark as stopped to prevent further operations
    hasStoppedRef.current = true;
    isStoppingRef.current = false;

    // Stop timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Stop and cleanup recording
    if (recordingRef.current) {
      try {
        const status = await recordingRef.current.getStatusAsync();
        if (status.isRecording) {
          await recordingRef.current.stopAndUnloadAsync();
        }
      } catch (error) {
        console.log('Cleanup error (non-critical):', error);
      }
      recordingRef.current = null;
    }

    // Reset audio mode
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
    } catch (error) {
      console.log('Audio mode reset error (non-critical):', error);
    }

    setIsRecording(false);
  };

  const startRecording = async () => {
    try {
      console.log('🎙️ Starting recording...');

      // Reset states
      hasStoppedRef.current = false;
      isStoppingRef.current = false;
      setTimeRemaining(RECORDING_DURATION);

      // Request permissions first
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Microphone permission is required');
        return;
      }

      // Configure audio recording
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording: newRecording } = await Audio.Recording.createAsync({
        android: {
          extension: '.wav',
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
          sampleRate: 44100,
          numberOfChannels: 1,
          bitRate: 128000,
        },
        ios: {
          extension: '.wav',
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
          sampleRate: 44100,
          numberOfChannels: 1,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
      });

      // Store in ref (persists across renders)
      recordingRef.current = newRecording;
      setIsRecording(true);
      recordingStartTime.current = Date.now();

      console.log('✅ Recording object created and stored');

      // Start countdown timer
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          console.log(`⏱️ Timer: ${newTime} seconds remaining`);

          // When timer hits 0, stop recording
          if (newTime <= 0 && !hasStoppedRef.current) {
            console.log('⏰ Timer reached 0, stopping recording...');
            // Clear timer immediately to prevent repeated calls
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            // Stop recording
            handleStopRecording();
            return 0;
          }

          return newTime;
        });
      }, 1000);

      console.log('✅ Recording started successfully');

    } catch (error) {
      console.log('❌ Recording start error:', error);
      Alert.alert('Error', `Failed to start recording: ${error.message}`);
      cleanup();
    }
  };

  const stopRecording = async (): Promise<string | null> => {
    // Prevent multiple simultaneous stops
    if (isStoppingRef.current || hasStoppedRef.current) {
      console.log('⚠️ Already stopping/stopped recording...');
      return null;
    }

    isStoppingRef.current = true;
    hasStoppedRef.current = true;

    try {
      if (!recordingRef.current) {
        console.log('⚠️ No recording object to stop');
        return null;
      }

      console.log('🛑 Stopping recording...');

      // Clear timer first
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      // Check if recording is still active
      const status = await recordingRef.current.getStatusAsync();
      console.log('📊 Recording status:', status);

      if (!status.isRecording) {
        console.log('⚠️ Recording was already stopped');
        const uri = recordingRef.current.getURI();
        return uri;
      }

      // Stop the recording
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();

      console.log('✅ Recording stopped successfully');
      console.log('📁 Recording URI:', uri);

      // Reset audio mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      setIsRecording(false);

      return uri;

    } catch (error) {
      console.log('❌ Recording stop error:', error);
      return null;
    } finally {
      isStoppingRef.current = false;
    }
  };

  const handleStopRecording = async () => {
    // Prevent multiple calls
    if (hasStoppedRef.current) {
      console.log('⚠️ Recording already handled');
      return;
    }

    const audioUri = await stopRecording();
    const actualDuration = (Date.now() - recordingStartTime.current) / 1000;

    if (audioUri) {
      console.log(`✅ Recording complete: ${actualDuration.toFixed(1)}s, URI: ${audioUri}`);

      Alert.alert(
        '🎉 Recording Complete!',
        `Duration: ${actualDuration.toFixed(1)}s\nAge: ${age}\nSession: ${sessionId}\nFile: ${audioUri.split('/').pop()}\n\nNext: Results screen will be added!`,
        [
          {
            text: 'View Results',
            onPress: () => {
              console.log('Navigate to results...');
              // Later: navigate to results screen
            }
          },
          {
            text: 'Record Again',
            onPress: () => {
              router.back();
            }
          }
        ]
      );
    } else {
      console.log('❌ Recording failed - no URI returned');
      Alert.alert(
        'Recording Issue',
        'Recording may not have been saved properly. This can happen on some devices.',
        [
          { text: 'Try Again', onPress: () => router.back() },
          { text: 'Continue Anyway', onPress: () => console.log('Continue with no audio') }
        ]
      );
    }
  };

  const handleTapToStop = () => {
    if (isRecording && timeRemaining > 0 && !hasStoppedRef.current && !isStoppingRef.current) {
      Alert.alert(
        'Stop Early?',
        `You still have ${timeRemaining} seconds left. Stop now?`,
        [
          { text: 'Continue Recording', style: 'cancel' },
          { text: 'Stop Now', onPress: handleStopRecording }
        ]
      );
    }
  };

  const formatTime = (seconds: number): string => {
    return Math.max(0, seconds).toString().padStart(2, '0');
  };

  const getTimerColor = (): string => {
    // Color thresholds as percentages of total duration
    const halfTime = RECORDING_DURATION * 0.5; // 50% of duration
    const finalCountdown = RECORDING_DURATION * 0.17; // ~17% of duration (10s if 60s)

    if (timeRemaining > halfTime) return '#FFFFFF';      // White (plenty of time)
    if (timeRemaining > finalCountdown) return '#FFC107'; // Yellow (getting urgent)
    return '#FF5722';  // Red (final countdown!)
  };

  const getProgressPercentage = (): number => {
    return Math.max(0, Math.min(100, ((RECORDING_DURATION - timeRemaining) / RECORDING_DURATION) * 100));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#000000" translucent />

      <TouchableOpacity
        style={styles.tapArea}
        onPress={handleTapToStop}
        activeOpacity={1}
      >
        <View style={styles.content}>
          {/* Recording Indicator */}
          <View style={styles.header}>
            <Animated.View
              style={[
                styles.recordingIndicator,
                { transform: [{ scale: pulseAnimation }] }
              ]}
            >
              <View style={styles.recordingDot} />
              <Text style={styles.recordingText}>
                {isRecording ? 'Recording...' : 'Starting...'}
              </Text>
            </Animated.View>
          </View>

          {/* Main Timer */}
          <View style={styles.timerContainer}>
            <Text style={[styles.timerText, { color: getTimerColor() }]}>
              {formatTime(timeRemaining)}
            </Text>
            <Text style={styles.timerLabel}>seconds remaining</Text>

            {/* Age Display */}
            <View style={styles.ageDisplay}>
              <Text style={styles.ageText}>Age: {age}</Text>
            </View>
          </View>

          {/* Instructions */}
          <View style={styles.instructionContainer}>
            <Text style={styles.instructionText}>
              Say as many animals as you can
            </Text>
            <Text style={styles.tapHint}>
              Tap anywhere to stop early
            </Text>

            {/* AI Agents Working Indicator */}
            <View style={styles.aiIndicator}>
              <Text style={styles.aiText}>🤖 5 AI Agents listening...</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBackground}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${getProgressPercentage()}%` }
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {getProgressPercentage().toFixed(0)}% Complete
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  tapArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FF0000',
  },
  recordingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF0000',
    marginRight: 12,
  },
  recordingText: {
    fontSize: 18,
    color: '#FF0000',
    fontWeight: 'bold',
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  timerText: {
    fontSize: 120,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'System',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  timerLabel: {
    fontSize: 20,
    color: '#CCCCCC',
    textAlign: 'center',
    marginTop: 8,
  },
  ageDisplay: {
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  ageText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  instructionContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  instructionText: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 16,
  },
  tapHint: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  aiIndicator: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 15,
  },
  aiText: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '500',
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  progressBackground: {
    width: width - 48,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: '#CCCCCC',
    fontWeight: '500',
  },
});
