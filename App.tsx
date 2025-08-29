import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import the Welcome screen
import WelcomeScreen from './src/screens/WelcomeScreen';

export default function App() {
  const handleStartAssessment = () => {
    // For now, just show an alert
    // Later we'll add React Navigation to go to AgeInputScreen
    console.log('🧠 Starting Project Atlas assessment...');
    alert('🎉 Welcome to Project Atlas!\n\nNext: We\'ll add navigation to the Age Input screen.');
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <WelcomeScreen onStartAssessment={handleStartAssessment} />
    </SafeAreaProvider>
  );
}
