/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Searchbar } from './components/Searchbar';
import { CurrentWeatherPanel } from './components/CurrentWeather';
import { ForecastGrid } from './components/ForecastGrid';
import { WeatherChart } from './components/WeatherChart';
import { Recommendations } from './components/Recommendations';
import { geocodeLocation, getWeatherData } from './api/OpenMeteo';
import { WeatherData, LocationData } from './types';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const loc = await geocodeLocation(city);
      if (!loc) {
        setError('LOCATION NOT RECOGNIZED');
        setWeatherData(null);
        setLocation(null);
        return;
      }
      setLocation(loc);
      
      const weather = await getWeatherData(loc.latitude, loc.longitude);
      setWeatherData(weather);
    } catch (err) {
      setError('COMMUNICATION FAILURE WITH METEO SATELLITE');
    } finally {
      setLoading(false);
    }
  };

  // Initial scan
  useEffect(() => {
    handleSearch('London');
  }, []);

  return (
    <div className="h-screen bg-cyber-bg text-cyber-gray p-4 font-mono flex flex-col gap-4 overflow-hidden selection:bg-cyber-cyan selection:text-black">
      {/* Grid overlay background */}
      <div className="fixed inset-0 pointer-events-none opacity-20" style={{
        backgroundImage: `linear-gradient(rgba(26, 26, 26, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(26, 26, 26, 0.5) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        zIndex: 0
      }} />

      <div className="relative z-10 flex flex-col gap-4 h-full max-w-[1400px] mx-auto w-full">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-cyber-border pb-2 gap-2">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-cyber-cyan animate-pulse rounded-full shadow-[0_0_8px_rgba(0,255,255,0.8)]"></div>
            <h1 className="text-white font-bold tracking-widest text-sm uppercase">Weather Intelligence // Terminal_v4.2</h1>
          </div>
          <div className="flex flex-wrap gap-4 md:gap-8 text-[10px] uppercase tracking-tighter">
            <div>System: <span className="text-cyber-lime">NOMINAL</span></div>
            <div>Uptime: <span className="text-cyber-lime">142:04:12</span></div>
            <div>Encryption: <span className="text-cyber-magenta">HIGH_SIG</span></div>
            <div className="text-cyber-cyan">{currentTime.toISOString().replace('T', ' ').substring(0, 19)} UTC</div>
          </div>
        </header>

        {/* Main Bento Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 grid-rows-none lg:grid-rows-6 gap-4 min-h-0 overflow-y-auto lg:overflow-hidden pb-4 lg:pb-0">
          
          {/* Zone A: Search */}
          <aside className="lg:col-span-3 lg:row-span-6 h-full flex flex-col">
            <Searchbar onSearch={handleSearch} error={error} loading={loading} />
          </aside>

          {weatherData && location ? (
            <>
              {/* Zone B: Current Condition */}
              <main className="lg:col-span-9 lg:row-span-2 h-full min-h-[200px]">
                <CurrentWeatherPanel data={weatherData.current_weather} locationName={location.name} />
              </main>

              {/* Zone C: 7-Day Grid */}
              <section className="lg:col-span-9 lg:row-span-2 h-full min-h-[150px]">
                <ForecastGrid data={weatherData.daily} />
              </section>

              {/* Zone D: Chart */}
              <div className="lg:col-span-6 lg:row-span-2 h-full min-h-[200px]">
                <WeatherChart data={weatherData.hourly} />
              </div>

              {/* Zone E: Recommendations */}
              <div className="lg:col-span-3 lg:row-span-2 h-full min-h-[150px]">
                <Recommendations 
                  weathercode={weatherData.current_weather.weathercode} 
                  precipProb={weatherData.daily.precipitation_probability_max[0] || 0} 
                />
              </div>
            </>
          ) : (
            <div className="lg:col-span-9 lg:row-span-6 border border-cyber-border bg-cyber-panel backdrop-blur-xl flex flex-col items-center justify-center h-full">
              <div className="w-12 h-12 border-t-2 border-r-2 border-cyber-cyan rounded-full animate-spin mb-4"></div>
              <span className="text-cyber-cyan animate-pulse tracking-widest uppercase text-sm">Awaiting Satellite Telemetry...</span>
            </div>
          )}

        </div>

        {/* Footer */}
        <footer className="grid grid-cols-1 md:grid-cols-3 border-t border-cyber-border pt-2 text-[9px] uppercase shrink-0 gap-2">
          <div className="flex items-center gap-4">
             <span>CPU LOAD: <span className="text-white">12%</span></span>
             <div className="w-24 h-1 bg-black">
                <div className="h-full bg-cyber-cyan w-1/4"></div>
             </div>
          </div>
          <div className="md:text-center">
             SATELLITE_LINK: <span className="text-cyber-lime animate-pulse">STABLE_00938-X</span>
          </div>
          <div className="md:text-right text-cyber-gray">
             UI_ARCH: SHADER-7 // REACT-VITE_FRAMEWORK
          </div>
        </footer>

      </div>
    </div>
  );
}
