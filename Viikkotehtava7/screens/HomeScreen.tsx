import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useWeather from "../hooks/useWeather";
import WeatherCard from "../components/WeatherCard";
import ErrorBox from "../components/ErrorBox";

export default function HomeScreen() {
  const [city, setCity] = useState("")
  const { weather, loading, error, getWeatherByLocation, getWeatherByCityName, setError } = useWeather()

  function handleSearch() {
    if (!city.trim()) {
      setError("Please enter a city.")
      return
    }
    getWeatherByCityName(city)
    setCity("")
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Weather</Text>

        <TouchableOpacity
          style={styles.locationButton}
          onPress={() =>
            Alert.alert("Use device location?", "", [
              { text: "Cancel", style: "cancel" },
              { text: "OK", onPress: getWeatherByLocation },
            ])
          }
        >
          <Ionicons name="location-outline" size={20} />
          <Text style={{ marginLeft: 6 }}>GPS</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <TextInput
          placeholder="Enter city name"
          value={city}
          onChangeText={setCity}
          style={styles.input}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator size="large" />
        </View>
      )}

      {!loading && error && <ErrorBox message={error} />}

      {!loading && weather && <WeatherCard weather={weather} />}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Data by OpenWeatherMap</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  searchRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  searchButton: {
    marginLeft: 8,
    backgroundColor: "#0a84ff",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    marginTop: 22,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#888",
  },
});
