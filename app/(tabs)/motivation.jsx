import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const quotes = [
  "Stay consistent, success will follow.",
  "Small progress is still progress.",
  "Believe in yourself and keep going.",
  "Discipline beats motivation.",
  "One step at a time, one day at a time.",
];

export default function Motivation() {
  const [quote, setQuote] = useState(quotes[0]);

  const getNewQuote = () => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(random);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Motivation Boost</Text>
      <Text style={styles.quote}>{quote}</Text>
      <TouchableOpacity style={styles.btn} onPress={getNewQuote}>
        <Text style={styles.btnText}>Get New Quote</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  quote: { fontSize: 18, fontStyle: "italic", textAlign: "center", marginBottom: 20 },
  btn: { backgroundColor: "#007AFF", padding: 12, borderRadius: 8 },
  btnText: { color: "#fff", fontSize: 16 },
});
