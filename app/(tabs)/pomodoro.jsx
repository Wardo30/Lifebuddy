import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Pomodoro() {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => setTime(t => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(25 * 60);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pomodoro Timer</Text>
      <Text style={styles.timer}>{formatTime(time)}</Text>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.btn} onPress={() => setIsRunning(!isRunning)}>
          <Text style={styles.btnText}>{isRunning ? "Pause" : "Start"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.reset]} onPress={resetTimer}>
          <Text style={styles.btnText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  timer: { fontSize: 48, fontWeight: "bold", marginBottom: 20 },
  buttons: { flexDirection: "row", gap: 10 },
  btn: { backgroundColor: "#007AFF", padding: 15, borderRadius: 8, marginHorizontal: 10 },
  btnText: { color: "#fff", fontSize: 18 },
  reset: { backgroundColor: "#d9534f" },
});
