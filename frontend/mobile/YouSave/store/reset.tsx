import React from "react";
import { Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ResetButton() {
  const handleReset = async () => {
    try {
      await AsyncStorage.clear(); // Clears everything
      alert("AsyncStorage reset successfully!");
    } catch (error) {
      alert("Failed to reset AsyncStorage!");
      console.error("Error clearing AsyncStorage:", error);
    }
  };

  return <Button title="Reset AsyncStorage" onPress={handleReset} />;
}