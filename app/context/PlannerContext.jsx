import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../../firebaseConfig"; // <-- FIXED path
import { useAuth } from "./AuthContext";

const PlannerContext = createContext();

export function PlannerProvider({ children }) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  // Load tasks in real-time
  useEffect(() => {
    if (!user) {
      setTasks([]);
      return;
    }

    const unsub = onSnapshot(
      collection(db, "users", user.uid, "tasks"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(data);
      }
    );

    return unsub;
  }, [user]);

  // Add task
  const addTask = async (task) => {
    if (!user || task.trim().length === 0) return;

    await addDoc(collection(db, "users", user.uid, "tasks"), {
      text: task,
      done: false,
      createdAt: Date.now(),
    });
  };

  // Toggle task done/undone
  const toggleTask = async (id, done) => {
    if (!user) return;
    const ref = doc(db, "users", user.uid, "tasks", id);
    await updateDoc(ref, { done: !done });
  };

  // Remove task
  const removeTask = async (id) => {
    if (!user) return;
    const ref = doc(db, "users", user.uid, "tasks", id);
    await deleteDoc(ref);
  };

  return (
    <PlannerContext.Provider value={{ tasks, addTask, toggleTask, removeTask }}>
      {children}
    </PlannerContext.Provider>
  );
}

export const usePlanner = () => {
  const context = useContext(PlannerContext);
  if (!context) {
    throw new Error("usePlanner must be used inside PlannerProvider");
  }
  return context;
};

// ✅ Default export to fix Expo Router warning
export default PlannerProvider;
