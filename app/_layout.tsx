import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // We're handling our own headers
        gestureEnabled: false, // Disable swipe back for controlled flow
        animation: 'slide_from_right', // Smooth transitions
      }}
    >
      {/* Welcome Screen */}
      <Stack.Screen
        name="index"
        options={{
          title: 'Welcome',
        }}
      />

      {/* Age Input Screen */}
      <Stack.Screen
        name="age-input"
        options={{
          title: 'Age Input',
        }}
      />

      {/* Future screens we'll add */}
      <Stack.Screen
        name="instructions"
        options={{
          title: 'Instructions',
        }}
      />

      <Stack.Screen
        name="recording"
        options={{
          title: 'Recording',
        }}
      />

      <Stack.Screen
        name="results"
        options={{
          title: 'Results',
        }}
      />
    </Stack>
  );
}
