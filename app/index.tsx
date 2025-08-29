import React from 'react';
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


const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const handleStartAssessment = () => {
     console.log('🧠 Starting Project Atlas assessment...');
     // Navigate to age input screen
     router.push('/age-input');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="transparent" translucent />

      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Logo Area */}
          <View style={styles.logoSection}>
            <Text style={styles.logoText}>Project Atlas™</Text>
            <Text style={styles.tagline}>
              Agentic AI Agents for Brain Wellness Revolution
            </Text>
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            <Text style={styles.description}>
              60-second cognitive assessment powered by 5 AI agents
            </Text>

            {/* AI Agents Preview */}
            <View style={styles.agentsPreview}>
              {[
                '🗣️ Speech Agent',
                '⚡ Efficiency Agent',
                '🧩 Flexibility Agent',
                '🎯 Strategy Agent',
                '💡 Insight Agent'
              ].map((agent, index) => (
                <Text key={index} style={styles.agentItem}>{agent}</Text>
              ))}
            </View>

            <TouchableOpacity
              style={styles.startButton}
              onPress={handleStartAssessment}
              activeOpacity={0.8}
            >
              <Text style={styles.startButtonText}>Start Assessment</Text>
            </TouchableOpacity>

            <Text style={styles.disclaimer}>
              Anonymous • No signup required
            </Text>
          </View>

          {/* Version Info */}
          <View style={styles.bottomInfo}>
            <Text style={styles.versionText}>Powered by Penn State Research</Text>
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
    justifyContent: 'space-between',
  },
  logoSection: {
    alignItems: 'center',
    paddingTop: height * 0.08,
  },
  logoText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 18,
    color: '#E8E8E8',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  mainContent: {
    alignItems: 'center',
    paddingBottom: height * 0.08,
  },
  description: {
    fontSize: 20,
    color: '#F0F0F0',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 28,
    paddingHorizontal: 16,
    fontWeight: '500',
  },
  agentsPreview: {
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  agentItem: {
    fontSize: 16,
    color: '#FFFFFF',
    marginVertical: 4,
    fontWeight: '500',
  },
  startButton: {
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
    marginBottom: 24,
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#667eea',
    textAlign: 'center',
  },
  disclaimer: {
    fontSize: 16,
    color: '#D0D0D0',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  bottomInfo: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  versionText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
  },
});
