import { Stack } from "expo-router";
import { AuthProvider } from "./context/AuthContext";
import { PlannerProvider } from "./context/PlannerContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <PlannerProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="splash" />
          <Stack.Screen name="login" />
          <Stack.Screen name="signup" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </PlannerProvider>
    </AuthProvider>
  );
}
