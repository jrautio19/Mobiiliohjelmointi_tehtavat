import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useState } from 'react'

export default function App() {
  const [age, setAge] = useState<string>("")
  const [lowerLimit, setLowerLimit] = useState<number>(0)
  const [upperLimit, setUpperLimit] = useState<number>(0)

  const handleAgeChange = (value: string) => {
    setAge(value)

  const normalized = value.replace(",", ".").trim()
  const parsed = parseFloat(normalized)

  if (!isNaN(parsed) && /\d/.test(normalized)) {
    const lower = (220 - parsed) * 0.65
    const upper = (220 - parsed) * 0.85
    setLowerLimit(lower)
    setUpperLimit(upper)
  } else {
    setLowerLimit(0)
    setUpperLimit(0)
   }
}

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Heart Rate Limits Calculator</Text>

      <Text style={styles.label}>Enter your age:</Text>

      <TextInput
        placeholder=''
        keyboardType='number-pad'
        style={styles.field}
        value={age}
        onChangeText={handleAgeChange}
        />
        <Text style={styles.resultText}>Lower limit: {lowerLimit.toFixed(2)} bpm</Text>
        <Text style={styles.resultText}>Upper limit: {upperLimit.toFixed(2)} bpm</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  field: {
    width: 115,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    fontSize: 20,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  resultText: {
    fontSize: 16,
  }
});
