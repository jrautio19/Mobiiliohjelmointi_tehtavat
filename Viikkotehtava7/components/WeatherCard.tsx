import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { WeatherResponse } from "../src/api/weather";

interface Props {
  weather: WeatherResponse
}

export default function WeatherCard({ weather }: Props) {
  const w = weather.weather?.[0]
  const temp = weather.main.temp
  const feels = weather.main.feels_like
  const humidity = weather.main.humidity
  const wind = weather.wind.speed

  const locationName = `${weather.name ?? ""}${weather.sys?.country ? ", " + weather.sys.country : ""}`

  return (
    <View style={styles.card}>
      <Text style={styles.locationText}>{locationName}</Text>
      <Text style={styles.tempText}>{Math.round(temp)}°C</Text>
      <Text style={styles.descText}>{w?.description}</Text>

      <View style={styles.row}>
        <Text style={styles.small}>Feels like: {Math.round(feels)}°C</Text>
        <Text style={styles.small}>Humidity: {humidity}%</Text>
        <Text style={styles.small}>Wind: {wind} m/s</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    marginTop: 22,
    padding: 18,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  locationText: {
    fontSize: 18,
    fontWeight: "600",
  },
  tempText: {
    fontSize: 48,
    fontWeight: "700",
    marginTop: 6,
  },
  descText: {
    textTransform: "capitalize",
    marginTop: 6,
    color: "#555",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  small: {
    fontSize: 13,
    color: "#555",
  },
});
