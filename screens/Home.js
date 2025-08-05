import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerInput, setTimerInput] = useState("");

  // Clock update
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Timer countdown
  useEffect(() => {
    let countdown;
    if (timerRunning && timer > 0) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0 && timerRunning) {
      alert("Timer Finished!");
      setTimerRunning(false);
    }
    return () => clearInterval(countdown);
  }, [timerRunning, timer]);

  const startTimer = () => {
    const timeInSeconds = parseInt(timerInput);
    if (!isNaN(timeInSeconds) && timeInSeconds > 0) {
      setTimer(timeInSeconds);
      setTimerRunning(true);
      setModalVisible(false);
    } else {
      alert("Please enter a valid number of seconds.");
    }
  };

  return (
    <View style={[styles.container, darkMode ? styles.dark : styles.light]}>
      <Text style={[styles.clockText, darkMode ? styles.darkText : styles.lightText]}>
        {currentTime}
      </Text>

      <View style={styles.switchContainer}>
        <Text style={darkMode ? styles.darkText : styles.lightText}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={() => setDarkMode(!darkMode)} />
      </View>

      <Text style={[styles.timerText, darkMode ? styles.darkText : styles.lightText]}>
        Timer: {timer > 0 ? timer + "s" : "Not Running"}
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Set Timer</Text>
      </TouchableOpacity>

      {/* Popup Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, darkMode ? styles.dark : styles.light]}>
            <Text style={darkMode ? styles.darkText : styles.lightText}>
              Enter Timer (seconds)
            </Text>
            <TextInput
              style={[
                styles.input,
                darkMode ? styles.darkInput : styles.lightInput,
              ]}
              keyboardType="numeric"
              value={timerInput}
              onChangeText={setTimerInput}
              placeholder="e.g., 10"
              placeholderTextColor={darkMode ? "#aaa" : "#555"}
            />
            <TouchableOpacity style={styles.button} onPress={startTimer}>
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#888" }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  light: { backgroundColor: "#fff" },
  dark: { backgroundColor: "#121212" },
  clockText: { fontSize: 48, fontWeight: "bold" },
  lightText: { color: "#000" },
  darkText: { color: "#fff" },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  timerText: { fontSize: 24, marginVertical: 10 },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    marginTop: 15,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 10,
    width: "100%",
    borderRadius: 5,
    textAlign: "center",
  },
  lightInput: { borderColor: "#000", color: "#000" },
  darkInput: { borderColor: "#fff", color: "#fff" },
});
