import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ErrorBox({ message }: { message: string }) {
  return (
    <View style={styles.errorBox}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  errorBox: {
    marginTop: 20,
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#ffeeee",
    borderWidth: 1,
    borderColor: "#ffcccc",
  },
  errorText: {
    color: "#990000",
  },
});
