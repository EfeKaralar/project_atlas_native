# 🧠 Project Atlas™

> **Agentic AI Meets Brain Wellness**
> 60-second cognitive assessment powered by 5 AI agents

[![React Native](https://img.shields.io/badge/React%20Native-0.72+-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2049+-000020.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📱 What is Project Atlas?

Project Atlas is a revolutionary brain wellness app that uses **5 AI agents** to analyze a simple 60-second animal naming test. Users get personalized cognitive insights and can contribute to brain health research.

### 🎯 The Experience
1. **Enter age** (18-99) for personalized scoring
2. **Record 60 seconds** of animal naming
3. **AI agents analyze** speech, efficiency, flexibility, strategy, and insights
4. **Get results** with brain wellness score
5. **Share on social** or help research via wellness survey

### 🤖 The "5 AI Agents"
- **Speech Agent** - Cleans and processes audio
- **Efficiency Agent** - Detects repetitions and errors
- **Flexibility Agent** - Identifies semantic categories
- **Strategy Agent** - Analyzes cognitive approach
- **Insight Agent** - Generates personalized tips

## 🚀 Quick Start with Expo

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI
- Expo Go app on your phone (for testing)

### Setup Instructions

```bash
# 1. Install Expo CLI globally
npm install -g @expo/cli

# 2. Clone the project
git clone <your-repo-url>
cd ProjectAtlas

# 3. Install dependencies
npm install

# 4. Start the development server
# When working on private network
npx expo start
# When working on public network or the test device is on another network
npx expo start --tunnel
# 5. Scan QR code with Expo Go app or press 'a' for Android emulator
```

### 📱 Testing on Device
1. Install **Expo Go** from App Store/Play Store
2. Scan the QR code from your terminal
3. App loads instantly on your phone

### 🖥️ Testing on Emulator
```bash
# Start development server
expo start

# Press 'a' for Android emulator
# Press 'i' for iOS simulator
```

## 🏗️ Project Structure

```
ProjectAtlas/
├── 📱 App.tsx                    # Main app entry point
├── 📁 src/
│   ├── 🖼️  screens/              # The 5 main screens
│   │   ├── WelcomeScreen.tsx     # Welcome + Start Assessment
│   │   ├── AgeInputScreen.tsx    # Age slider (18-99)
│   │   ├── InstructionsScreen.tsx # Recording instructions
│   │   ├── RecordingScreen.tsx   # 60-second timer + recording
│   │   ├── ResultsScreen.tsx     # AI score + results
│   │   └── WellnessSurveyScreen.tsx # Optional research survey
│   ├── 🛠️  services/             # Backend integration
│   │   ├── api.ts               # Azure API calls
│   │   └── audio.ts             # Audio processing
│   ├── 📊 utils/                # Utilities
│   │   ├── tracking.ts          # Analytics/events
│   │   └── storage.ts           # Local data storage
│   ├── 🎨 components/           # Reusable UI components
│   └── 📝 types/                # TypeScript definitions
├── 🤖 android/                  # Android native code
├── 🍎 ios/                      # iOS native code
└── ⚙️  app.json                 # Expo configuration
```

## 🛠️ Tech Stack

### Frontend (React Native + Expo)
- **Framework**: Expo SDK 49+ with React Native
- **Language**: TypeScript
- **Navigation**: React Navigation 6
- **State Management**: React Hooks + Context
- **UI Components**: React Native + Custom styling
- **Audio**: Expo AV for recording
- **Storage**: Expo SecureStore + AsyncStorage
- **Sharing**: Expo Sharing

### Backend (Azure)
- **Storage**: Azure Blob Storage (audio files)
- **Compute**: Azure Functions (AI processing)
- **AI**: Custom AI agents (speech analysis)
- **Database**: Azure Cosmos DB (user data)
- **API**: REST endpoints for assessment processing

### Analytics & Tracking
- **User Events**: Custom tracking system
- **Performance**: React Native performance monitoring
- **Crash Reporting**: Expo native crash reporting

## 📋 Development Roadmap

### ✅ Phase 1: Foundation (Week 1)
- [x] Project setup with Expo
- [x] Basic navigation structure
- [x] Welcome screen with branding
- [x] Age input with slider component
- [x] Instructions screen with permissions
- [ ] Basic recording screen with timer
- [ ] Mock results display

### 🔄 Phase 2: Core Features (Week 2)
- [ ] Audio recording with proper format (WAV, 44.1kHz, 16-bit)
- [ ] Azure Blob Storage integration
- [ ] AI processing API connection
- [ ] Real-time "AI agents analyzing" animation
- [ ] Results screen with actual data
- [ ] Share functionality
- [ ] Wellness survey implementation

### 🚀 Phase 3: Polish & Launch (Week 3)
- [ ] Device testing (iOS/Android)
- [ ] Performance optimization
- [ ] Analytics tracking implementation
- [ ] Error handling and edge cases
- [ ] App store assets and metadata
- [ ] TestFlight submission

### 🎯 Phase 4: Partnership Prep (Week 4)
- [ ] Wellness data analytics dashboard
- [ ] Partnership integration APIs
- [ ] A/B testing infrastructure
- [ ] Viral sharing optimization
- [ ] User onboarding optimization

## 🎨 Design Specifications

### Visual Design
- **Primary Colors**: Purple gradient (`#667eea` to `#764ba2`)
- **Recording Screen**: Black background (TikTok-friendly)
- **Typography**: System fonts, bold weights
- **Layout**: Mobile-first, portrait orientation

### User Experience
- **Flow**: Linear progression through 5 screens
- **Duration**: Complete assessment in under 2 minutes
- **Accessibility**: Voice prompts, clear visual hierarchy
- **Performance**: <3s app launch, <1s screen transitions

## 🔧 Development Scripts

```bash
# Start development server
npm start
# or
expo start

# Start on specific platform
npm run android    # Android emulator
npm run ios        # iOS simulator
npm run web        # Web browser

# Build for production
expo build:android # Android APK/AAB
expo build:ios     # iOS IPA

# TypeScript checking
npm run type-check

# Run tests
npm test

# Lint code
npm run lint
```

## 📱 Testing & Deployment

### Development Testing
```bash
# Test on physical device
expo start → Scan QR code with Expo Go

# Test on emulator
expo start → Press 'a' (Android) or 'i' (iOS)
```

### Production Builds
```bash
# Build for Android Play Store
expo build:android --type app-bundle

# Build for iOS App Store
expo build:ios --type archive
```

### TestFlight Deployment (iOS)
```bash
# Build iOS app
expo build:ios

# Upload to TestFlight
# (Expo will provide instructions after build)
```

## 🔑 Environment Variables

Create `.env` file in project root:

```bash
# Azure Configuration
AZURE_STORAGE_CONNECTION_STRING=your_azure_connection_string
AZURE_STORAGE_CONTAINER=project-atlas-audio

# API Endpoints
API_BASE_URL=https://your-api.azurewebsites.net
AI_PROCESSING_ENDPOINT=/api/process-assessment

# Analytics
ANALYTICS_API_KEY=your_analytics_key

# Development
EXPO_DEBUG=true
```

## 📊 Key Metrics & Goals

### User Funnel
- **App Opens** → **Assessment Started** → **Recording Completed** → **Results Viewed** → **Results Shared**
- **Target**: >60% completion rate (opens → results)
- **Viral Goal**: >25% share rate

### Technical Performance
- **App Launch**: <3 seconds
- **Recording Start**: <1 second
- **AI Processing**: 5-15 seconds
- **Results Display**: Instant

### Partnership Data Collection
- Demographics (age, education, location)
- Sleep patterns and mood tracking
- Exercise habits and cognitive performance
- Family history data (anonymized)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Author**: Kevin Mekulu (kxm5924@psu.edu)
- **Institution**: Penn State University
- **Project**: Brain Wellness Research Initiative

## 🆘 Support

### Common Issues
- **App won't start**: Run `expo doctor` to check setup
- **Audio not recording**: Check device permissions
- **Build fails**: Clear cache with `expo start -c`

### Getting Help
- 📧 Email: kxm5924@psu.edu
- 📚 [Expo Docs](https://docs.expo.dev/)
- 📚 [React Navigation Docs](https://reactnavigation.org/)

---

**🧠 "5 AI Agents revolutionize brain wellness" - Project Atlas™**
