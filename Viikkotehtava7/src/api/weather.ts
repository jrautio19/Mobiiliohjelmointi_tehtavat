import { OPENWEATHER_API_KEY } from "@env"

const API_KEY = OPENWEATHER_API_KEY

export type WeatherResponse = {
  weather: { id: number; main: string; description: string; icon: string }[]
  main: { temp: number; feels_like: number; temp_min: number; temp_max: number; humidity: number }
  wind: { speed: number; deg: number }
  sys?: { country?: string; sunrise?: number; sunset?: number }
  name?: string
}

async function fetchWeather(url: string): Promise<WeatherResponse> {
  if (!API_KEY) {
    throw new Error("Missing OpenWeather API key.")
  }

  const res = await fetch(url)
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`API error ${res.status}: ${txt}`)
  }
  return res.json()
}

export async function fetchWeatherByCoords(lat: number, lon: number) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  return fetchWeather(url)
}

export async function fetchWeatherByCity(city: string) {
  const q = encodeURIComponent(city.trim())
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&appid=${API_KEY}`
  return fetchWeather(url)
}
