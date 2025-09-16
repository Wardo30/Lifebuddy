import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export default function Profile() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/login"); // Go back to login screen
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name="person-circle" size={100} color="#007AFF" />

      <Text style={styles.title}>My Profile</Text>
      <Text style={styles.email}>
        {auth.currentUser ? auth.currentUser.email : "Guest"}
      </Text>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Ionicons name="book-outline" size={28} color="#007AFF" />
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Notes</Text>
        </View>

        <View style={styles.statBox}>
          <Ionicons name="alarm-outline" size={28} color="#FF9500" />
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Reminders</Text>
        </View>

        <View style={styles.statBox}>
          <Ionicons name="time-outline" size={28} color="#34C759" />
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Pomodoros</Text>
        </View>

        <View style={styles.statBox}>
          <Ionicons name="sparkles-outline" size={28} color="#AF52DE" />
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Motivations</Text>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", marginTop: 10 },
  email: { fontSize: 16, color: "#555", marginTop: 5, marginBottom: 30 },

  // Stats
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 40,
  },
  statBox: {
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 100,
    margin: 10,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: { fontSize: 22, fontWeight: "bold", marginTop: 5 },
  statLabel: { fontSize: 14, color: "#555" },

  // Logout Button
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d9534f",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
