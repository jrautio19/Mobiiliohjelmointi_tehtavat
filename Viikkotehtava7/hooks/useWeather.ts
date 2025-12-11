import { useState } from "react";
import * as Location from "expo-location";
import { fetchWeatherByCoords, fetchWeatherByCity, WeatherResponse } from "../src/api/weather";

export default function useWeather() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function getWeatherByLocation() {
    setError(null)
    setLoading(true)
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        throw new Error("Location permission denied.")
      }
      const loc = await Location.getCurrentPositionAsync({})
      const data = await fetchWeatherByCoords(loc.coords.latitude, loc.coords.longitude)
      setWeather(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function getWeatherByCityName(city: string) {
    setError(null)
    setLoading(true)
    try {
      const data = await fetchWeatherByCity(city)
      setWeather(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    weather,
    loading,
    error,
    getWeatherByLocation,
    getWeatherByCityName,
    setError,
  }
}
