import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { usePlanner } from "../context/PlannerContext";

export default function Planner() {
  const { tasks, addTask, toggleTask, removeTask } = usePlanner();
  const [input, setInput] = useState("");

  const handleAdd = () => {
    addTask(input);
    setInput("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 My Plans</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new plan..."
          value={input}
          onChangeText={setInput}
        />
        <Button title="Add" onPress={handleAdd} />
      </View>

      {tasks.length === 0 ? (
        <Text style={styles.empty}>No plans yet. Add one above!</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.task}
              onPress={() => toggleTask(item.id, item.done)}
              onLongPress={() => removeTask(item.id)}
            >
              <Text style={[styles.taskText, item.done && styles.done]}>
                {item.text}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  inputRow: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", padding: 10, marginRight: 10, borderRadius: 8 },
  empty: { textAlign: "center", marginTop: 20, color: "gray" },
  task: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#eee" },
  taskText: { fontSize: 16 },
  done: { textDecorationLine: "line-through", color: "gray" },
});
