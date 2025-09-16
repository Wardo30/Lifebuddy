import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
} from "react-native-reanimated";
import { useRouter } from "expo-router";

export default function Splash() {
  const router = useRouter();
  const scale = useSharedValue(0.5);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Animate logo + text
    scale.value = withSequence(
      withTiming(1.2, { duration: 1000 }),
      withTiming(1, { duration: 500 })
    );
    opacity.value = withTiming(1, { duration: 1000 });

    // Navigate to login after 2.5s
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/logo.png")}
        style={[styles.logo, animatedStyle]}
      />
      <Animated.Text style={[styles.slogan, animatedStyle]}>
        Your study & life buddy 💡
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  logo: { width: 180, height: 180, resizeMode: "contain", marginBottom: 20 },
  slogan: { fontSize: 18, fontWeight: "600", color: "#555" },
});
