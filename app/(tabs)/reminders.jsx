import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Reminders() {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState("");

  const addReminder = () => {
    if (newReminder.trim().length === 0) return;
    setReminders([...reminders, { id: Date.now().toString(), text: newReminder }]);
    setNewReminder("");
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter(rem => rem.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reminders</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a reminder..."
          value={newReminder}
          onChangeText={setNewReminder}
        />
        <TouchableOpacity style={styles.addButton} onPress={addReminder}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reminderItem}>
            <Text style={styles.reminderText}>{item.text}</Text>
            <TouchableOpacity onPress={() => deleteReminder(item.id)}>
              <Ionicons name="trash" size={20} color="#d9534f" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No reminders yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  inputContainer: { flexDirection: "row", marginBottom: 15 },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, paddingHorizontal: 12 },
  addButton: { marginLeft: 10, backgroundColor: "#007AFF", padding: 12, borderRadius: 8 },
  reminderItem: {
    flexDirection: "row", justifyContent: "space-between", padding: 12,
    backgroundColor: "#f1f1f1", borderRadius: 8, marginBottom: 10
  },
  reminderText: { fontSize: 16 },
  emptyText: { textAlign: "center", color: "#aaa", marginTop: 20 },
});
