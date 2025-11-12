import { Redirect } from "expo-router";
import { useAuth } from "@/utils/auth/useAuth";

export default function Index() {
  const { isAuthenticated, isReady } = useAuth();

  // Wait for auth to be ready
  if (!isReady) {
    return null;
  }

  // Redirect based on authentication status
  if (isAuthenticated) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/onboarding" />;
}
