import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import Slider from '@react-native-community/slider';

const { width, height } = Dimensions.get('window');

export default function AgeInputScreen() {
  const [age, setAge] = useState<number>(35); // Default to middle age

  const handleContinue = () => {
    // Navigate to instructions screen (we'll create this next)
    // For now, just alert with the age
    console.log(`User age: ${age}`);
    alert(`Age selected: ${age}\n\nNext: Instructions screen will be added!`);

    // Later this will be:
    // router.push({ pathname: '/instructions', params: { age } });
  };

  const handleBack = () => {
    // Navigate back to welcome screen
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="transparent" translucent />

      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Header with Back Button */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            <Text style={styles.title}>What's your age?</Text>

            <Text style={styles.subtitle}>
              Our AI agents need this for personalized brain wellness scoring
            </Text>

            {/* Age Display */}
            <View style={styles.ageDisplayContainer}>
              <Text style={styles.ageNumber}>{age}</Text>
              <Text style={styles.ageLabel}>years old</Text>
            </View>

            {/* Age Slider */}
            <View style={styles.sliderContainer}>
              <Slider
                style={styles.slider}
                minimumValue={18}
                maximumValue={99}
                value={age}
                onValueChange={(value) => setAge(Math.round(value))}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
                thumbStyle={styles.thumbStyle}
                trackStyle={styles.trackStyle}
              />

              {/* Age Range Labels */}
              <View style={styles.rangeLabels}>
                <Text style={styles.rangeLabel}>18</Text>
                <Text style={styles.rangeLabel}>99</Text>
              </View>
            </View>

            {/* Age Categories Helper */}
            <View style={styles.categoryHelper}>
              <Text style={styles.categoryText}>
                {age < 25 ? '🧠 Young Adult' :
                 age < 40 ? '💼 Adult' :
                 age < 60 ? '🎯 Middle Age' : '🌟 Senior'}
              </Text>
            </View>

            <Text style={styles.disclaimer}>
              Required for accurate scoring
            </Text>
          </View>

          {/* Continue Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
              activeOpacity={0.8}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 18,
    color: '#E8E8E8',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 48,
    paddingHorizontal: 10,
  },
  ageDisplayContainer: {
    alignItems: 'center',
    marginBottom: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 24,
    paddingHorizontal: 48,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  ageNumber: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  ageLabel: {
    fontSize: 20,
    color: '#E8E8E8',
    textAlign: 'center',
    marginTop: 8,
  },
  sliderContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  thumbStyle: {
    backgroundColor: '#FFFFFF',
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  trackStyle: {
    height: 4,
    borderRadius: 2,
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 12,
  },
  rangeLabel: {
    fontSize: 16,
    color: '#D0D0D0',
    fontWeight: '500',
  },
  categoryHelper: {
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
  disclaimer: {
    fontSize: 16,
    color: '#D0D0D0',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  buttonContainer: {
    paddingBottom: 40,
  },
  continueButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 64,
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  continueButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#667eea',
    textAlign: 'center',
  },
});
