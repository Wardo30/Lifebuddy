import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  const addNote = () => {
    if (newNote.trim().length === 0) return;
    setNotes([...notes, { id: Date.now().toString(), text: newNote }]);
    setNewNote("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Notes</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a note..."
          value={newNote}
          onChangeText={setNewNote}
        />
        <TouchableOpacity style={styles.addButton} onPress={addNote}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteItem}>
            <Text style={styles.noteText}>{item.text}</Text>
            <TouchableOpacity onPress={() => deleteNote(item.id)}>
              <Ionicons name="trash" size={20} color="#d9534f" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No notes yet.</Text>}
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
  noteItem: {
    flexDirection: "row", justifyContent: "space-between", padding: 12,
    backgroundColor: "#f1f1f1", borderRadius: 8, marginBottom: 10
  },
  noteText: { fontSize: 16 },
  emptyText: { textAlign: "center", color: "#aaa", marginTop: 20 },
});
