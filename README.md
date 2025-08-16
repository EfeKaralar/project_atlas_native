# Project Atlas™

> **Agentic AI Meets Brain Wellness**

A 60-second cognitive assessment app powered by 5 AI agents that revolutionizes brain wellness testing through advanced speech analysis and personalized insights.

[![React Native](https://img.shields.io/badge/React%20Native-0.73+-blue.svg)](https://reactnative.dev/)
[![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## 🎯 Project Overview

Project Atlas is an innovative brain wellness app that combines:
- **60-second animal naming cognitive test** (established neuropsychological assessment)
- **5 specialized AI agents** that analyze speech patterns, efficiency, and cognitive flexibility
- **Instant personalized results** with brain wellness scoring
- **Social sharing capabilities** for viral growth
- **Optional wellness data collection** for research partnerships

**Target Timeline:** 3.5 weeks to TestFlight submission

## 🚀 Quick Start

### Prerequisites
- Node.js (16 or higher) - [Download](https://nodejs.org/)
- React Native CLI: `npm install -g react-native-cli`
- **For Android development:** Android Studio - [Download](https://developer.android.com/studio)
- **For iOS development:** Xcode (macOS only) - [Mac App Store](https://apps.apple.com/us/app/xcode/id497799835)
- Azure account (for backend services)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/project_atlas.git
   cd project_atlas
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up development environment**

   **For Android (Primary Development):**
   ```bash
   # 1. Install Android Studio from https://developer.android.com/studio
   # 2. Open Android Studio and install SDK components:
   #    - Android SDK Platform-Tools
   #    - Android SDK Build-Tools
   #    - Android SDK Command-line Tools

   # 3. Set environment variables (add to your shell profile):
   # Windows (PowerShell):
   # $env:ANDROID_HOME = "C:\Users\YourUsername\AppData\Local\Android\Sdk"
   # $env:PATH += ";$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\cmdline-tools\latest\bin"

   # macOS/Linux (bash/zsh):
   # export ANDROID_HOME=$HOME/Android/Sdk  # or ~/Library/Android/sdk on macOS
   # export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin

   # 4. Accept Android licenses
   npx react-native doctor  # Check setup
   ```

   **For iOS (Final Testing - Requires macOS):**
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Configure Azure backend**
   - Update API endpoints in `src/constants/AppConstants.ts`
   - Set up Azure Blob Storage for audio uploads
   - Configure Azure Functions for AI processing

5. **Run the app**
   ```bash
   # For Android emulator (primary development)
   npm run android

   # For iOS simulator (requires macOS)
   npm run ios

   # Start Metro bundler
   npm start
   ```

## 💻 Development Environment

### Cross-Platform Development
- **Android Studio + Emulator** - Primary development and testing platform (Windows/macOS/Linux)
- **React Native CLI** - Development toolchain
- **Full feature support** including audio recording and native mobile experience

### Platform Testing Strategy
| Platform | Purpose | Audio Recording | When to Use |
|----------|---------|----------------|-------------|
| **Android Emulator** | Primary development | ✅ Full support | Daily development |
| **iOS Simulator** | Final validation | ✅ Full support | Pre-TestFlight (macOS only) |

### Cross-Platform Benefits
- **Single codebase** works on Android and iOS
- **Consistent UI/UX** across all platforms
- **Team familiar with React/JavaScript** ecosystem
- **Develop on any OS** - Windows, macOS, or Linux

## ✨ Features

### 🎨 Implemented

### 🚧 In Development
- [ ] **Welcome Screen** - Animated onboarding with Project Atlas branding
- [ ] **App Navigation** - Complete routing system with React Navigation
- [ ] **Custom Theme** - Project Atlas brand colors and typography
- [ ] **Reusable Components** - AtlasLogo, WelcomeButton, and core components
- [ ] **Project Structure** - Scalable architecture with TypeScript
- [ ] **Age Input Screen** - User age collection for normative scoring
- [ ] **Instructions Screen** - Clear assessment guidelines
- [ ] **Recording Screen** - 60-second audio recording with smooth timer
- [ ] **Results Screen** - AI score display with agent analysis breakdown
- [ ] **Wellness Survey** - Optional research data collection
- [ ] **Audio Processing** - Integration with Azure AI services
- [ ] **Social Sharing** - Native sharing for viral growth

### 🔮 Planned Features
- [ ] **Performance Analytics** - Detailed cognitive metrics dashboard
- [ ] **Trend Tracking** - Historical performance monitoring
- [ ] **Partnership Integration** - Samsung Health, Apple Health compatibility
- [ ] **Multi-language Support** - Expand beyond English assessments
- [ ] **Advanced AI Insights** - Personalized brain training recommendations

## 🏗️ Architecture

```
src/
├── components/              # Shared UI components
├── screens/                # The 5 main screens + survey
├── navigation/             # React Navigation setup
├── services/               # API, audio, analytics services
├── types/                  # TypeScript definitions
├── constants/              # App constants and configuration
├── theme/                  # App styling and theming
└── utils/                  # Utilities and helpers
```

## 🎯 The 5 AI Agents

| Agent | Function | Purpose |
|-------|----------|---------|
| **Speech Agent** | Audio processing & cleanup | Ensures clear speech analysis |
| **Efficiency Agent** | Repetition detection | Measures cognitive efficiency |
| **Flexibility Agent** | Category identification | Assesses semantic fluency |
| **Strategy Agent** | Approach analysis | Evaluates cognitive strategies |
| **Insight Agent** | Personalized tips | Generates actionable recommendations |

## 📱 User Flow

1. **Welcome** → User sees Project Atlas branding and key features
2. **Age Input** → Collects age for normative scoring (18-99 years)
3. **Instructions** → "Name as many animals as you can in 60 seconds"
4. **Recording** → 60-second audio capture with smooth countdown timer
5. **Results** → AI score, performance level, and agent analysis
6. **Survey** *(Optional)* → Wellness data for research partnerships

## 🔧 Configuration

### API Endpoints
Update these in `src/constants/AppConstants.ts`:
```typescript
export const AppConstants = {
  BASE_API_URL: 'https://your-azure-api.azurewebsites.net',
  PROCESS_ASSESSMENT_ENDPOINT: '/api/process-assessment',
  SUBMIT_WELLNESS_ENDPOINT: '/api/submit-wellness-data',
};
```

### Azure Services Required
- **Azure Functions** - AI processing backend
- **Azure Blob Storage** - Audio file storage
- **Azure Cognitive Services** - Speech analysis (optional enhancement)

## 📊 Performance Targets

| Metric | Target | Android Status | iOS Status |
|--------|--------|----------------|------------|
| App Launch | < 3 seconds | ⏱️ In Progress | ⏱️ Testing Phase |
| Recording Start | < 1 second | ⏱️ In Progress | ⏱️ Testing Phase |
| AI Processing | 5-15 seconds | ⏱️ Pending Backend | ⏱️ Pending Backend |
| Results Display | Instant | ⏱️ In Progress | ⏱️ Testing Phase |

## 📈 Analytics Events

```typescript
export const EVENTS = {
  ASSESSMENT_STARTED: 'assessment_started',
  RECORDING_COMPLETED: 'recording_completed',
  RESULTS_VIEWED: 'results_viewed',
  RESULTS_SHARED: 'results_shared',
  WELLNESS_SURVEY_COMPLETED: 'wellness_survey_completed',
};
```

## 🖼️ Screenshots

### App Flow Preview
*Screenshots will be added as screens are implemented*

| Welcome Screen | Age Input | Recording | Results |
|----------------|-----------|-----------|---------|
| ![Welcome](screenshots/welcome.png) | ![Age](screenshots/age.png) | ![Recording](screenshots/recording.png) | ![Results](screenshots/results.png) |

### Key Features
*Feature demonstrations and UI highlights*

| Timer Animation | AI Agents | Social Sharing | Wellness Survey |
|----------------|-----------|----------------|-----------------|
| ![Timer](screenshots/timer.gif) | ![Agents](screenshots/agents.png) | ![Share](screenshots/share.png) | ![Survey](screenshots/survey.png) |

## 🎯 Partnership Strategy

### Data Collection for Health Partners
- **Demographic insights** (age-normalized cognitive scores)
- **Sleep quality correlations** with cognitive performance
- **Mood tracking integration** possibilities
- **Exercise habit patterns** vs brain wellness
- **Anonymous research data** for product development

Ideal for partnerships with Samsung Health, Apple Health, Fitbit, and wellness platforms.

## 🚀 Development Roadmap

### Week 1: Core Functionality
- [ ] Project setup and welcome screen (React Native)
- [ ] Age input and instructions screens
- [ ] Audio recording implementation
- [ ] Basic navigation flow

### Week 2: AI Integration
- [ ] Azure backend connection
- [ ] Results screen with real data
- [ ] Wellness survey implementation
- [ ] Social sharing functionality

### Week 3: Polish & Launch
- [ ] Performance optimization (Android + iOS)
- [ ] Device testing on iOS hardware
- [ ] TestFlight submission
- [ ] Partnership preparation

## 🔧 Development Scripts

```bash
# Development
npm start              # Start Metro bundler
npm run android        # Run on Android emulator
npm run ios           # Run on iOS simulator

# Testing
npm test              # Run unit tests
npm run lint          # ESLint code checking
npm run type-check    # TypeScript checking

# Build
npm run build:android # Build Android APK
npm run build:ios     # Build iOS archive
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Kevin Mekulu** - [kxm5924@psu.edu](mailto:kxm5924@psu.edu)

---

**Project Atlas™** - Revolutionizing brain wellness through agentic AI technology.
