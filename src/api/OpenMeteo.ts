import { LocationData, WeatherData } from '../types';

export async function geocodeLocation(city: string): Promise<LocationData | null> {
  try {
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
    if (!res.ok) throw new Error('Geocoding failed');
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      return data.results[0];
    }
    return null;
  } catch (error) {
    console.error("Geocoding Error:", error);
    throw error;
  }
}

export async function getWeatherData(lat: number, lon: number): Promise<WeatherData> {
  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max&hourly=temperature_2m&timezone=auto`);
    if (!res.ok) throw new Error('Weather forecast failed');
    return await res.json();
  } catch (error) {
    console.error("Weather API Error:", error);
    throw error;
  }
}

// Helper to map weather codes to text (WMO Weather interpretation codes)
export function getWeatherDescription(code: number): string {
  const weatherCodes: Record<number, string> = {
    0: 'CLEAR SKY',
    1: 'MAINLY CLEAR',
    2: 'PARTLY CLOUDY',
    3: 'OVERCAST',
    45: 'FOG',
    48: 'DEPOSITING RIME FOG',
    51: 'LIGHT DRIZZLE',
    53: 'MODERATE DRIZZLE',
    55: 'DENSE DRIZZLE',
    56: 'LIGHT FREEZING DRIZZLE',
    57: 'DENSE FREEZING DRIZZLE',
    61: 'SLIGHT RAIN',
    63: 'MODERATE RAIN',
    65: 'HEAVY RAIN',
    66: 'LIGHT FREEZING RAIN',
    67: 'HEAVY FREEZING RAIN',
    71: 'SLIGHT SNOW FALL',
    73: 'MODERATE SNOW FALL',
    75: 'HEAVY SNOW FALL',
    77: 'SNOW GRAINS',
    80: 'SLIGHT RAIN SHOWERS',
    81: 'MODERATE RAIN SHOWERS',
    82: 'VIOLENT RAIN SHOWERS',
    85: 'SLIGHT SNOW SHOWERS',
    86: 'HEAVY SNOW SHOWERS',
    95: 'THUNDERSTORM',
    96: 'THUNDERSTORM WITH HAIL',
    99: 'THUNDERSTORM WITH HEAVY HAIL'
  };
  return weatherCodes[code] || 'UNKNOWN CONDITIONS';
}
