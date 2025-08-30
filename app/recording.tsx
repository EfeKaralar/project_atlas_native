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

export default function RecordingScreen() {
  const { age } = useLocalSearchParams<{ age: string }>();

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(60);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [sessionId] = useState<string>(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pulseAnimation = useRef(new Animated.Value(1)).current;
  const recordingStartTime = useRef<number>(0);

  useEffect(() => {
    startRecording();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      stopRecording();
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
    }
  }, [isRecording]);

  const startRecording = async () => {
    try {
      console.log('🎙️ Starting recording...');

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

      setRecording(newRecording);
      setIsRecording(true);
      recordingStartTime.current = Date.now();

      // Start countdown timer
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleStopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (error) {
      console.log('Recording start error:', error);
      Alert.alert('Error', 'Failed to start recording');
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return null;

      console.log('🛑 Stopping recording...');
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      const uri = recording.getURI();
      setIsRecording(false);

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      return uri;
    } catch (error) {
      console.log('Recording stop error:', error);
      return null;
    }
  };

  const handleStopRecording = async () => {
    const audioUri = await stopRecording();
    const actualDuration = (Date.now() - recordingStartTime.current) / 1000;

    if (audioUri) {
      console.log(`Recording complete: ${actualDuration}s, URI: ${audioUri}`);

      // Navigate to results screen
      // For now, just show alert with data
      Alert.alert(
        '🎉 Recording Complete!',
        `Duration: ${actualDuration.toFixed(1)}s\nAge: ${age}\nSession: ${sessionId}\n\nNext: Results screen will be added!`,
        [
          {
            text: 'View Results',
            onPress: () => {
              // Later this will be:
              // router.push({
              //   pathname: '/results',
              //   params: { age, audioUri, duration: actualDuration.toString(), sessionId }
              // });
              console.log('Navigate to results...');
            }
          }
        ]
      );
    } else {
      Alert.alert('Error', 'Recording failed. Please try again.');
      router.back();
    }
  };

  const handleTapToStop = () => {
    if (isRecording && timeRemaining > 0) {
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
    return seconds.toString().padStart(2, '0');
  };

  const getTimerColor = (): string => {
    if (timeRemaining > 30) return '#FFFFFF';
    if (timeRemaining > 10) return '#FFC107';
    return '#FF5722';
  };

  const getProgressPercentage = (): number => {
    return ((60 - timeRemaining) / 60) * 100;
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
              <Text style={styles.recordingText}>Recording...</Text>
            </Animated.View>
          </View>

          {/* Main Timer - The Star of TikTok Videos! */}
          <View style={styles.timerContainer}>
            <Text style={[styles.timerText, { color: getTimerColor() }]}>
              {formatTime(timeRemaining)}
            </Text>
            <Text style={styles.timerLabel}>seconds remaining</Text>

            {/* Age Display for Context */}
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
    backgroundColor: '#000000', // Pure black for TikTok videos
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
    fontSize: 120, // HUGE for TikTok visibility
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
