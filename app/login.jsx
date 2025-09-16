import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/(tabs)");
    } catch (err) {
      Alert.alert("Login Failed", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Login</Text>
      <View style={styles.card}>
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
        <TouchableOpacity style={styles.button} onPress={handleLogin}><Text style={styles.buttonText}>Login</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/signup")}><Text style={styles.link}>Don’t have an account? Sign up</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:"center",alignItems:"center",padding:20,backgroundColor:"#fff"},
  logo:{width:120,height:120,marginBottom:20},
  title:{fontSize:28,fontWeight:"bold",marginBottom:20},
  card:{width:"100%",backgroundColor:"#f9f9f9",borderRadius:10,padding:20},
  input:{borderWidth:1,borderColor:"#ccc",borderRadius:8,padding:12,marginBottom:15,backgroundColor:"#fff"},
  button:{backgroundColor:"#007AFF",padding:15,borderRadius:8,alignItems:"center"},
  buttonText:{color:"#fff",fontSize:16,fontWeight:"bold"},
  link:{color:"#007AFF",textAlign:"center",marginTop:10}
});
