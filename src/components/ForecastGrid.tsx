import { format, parseISO } from 'date-fns';
import { DailyForecast } from '../types';

interface ForecastGridProps {
  data: DailyForecast;
}

export function ForecastGrid({ data }: ForecastGridProps) {
  
  const renderWeatherIcon = (code: number) => {
    if (code <= 1) return "☀️";
    if (code <= 3) return "⛅";
    if (code <= 48) return "☁️";
    if (code <= 67 || (code >= 80 && code <= 82)) return "🌦️";
    if (code <= 77 || (code >= 85 && code <= 86)) return "❄️";
    if (code >= 95) return "⛈️";
    return "☀️";
  };

  // Limit to next 7 days
  const indices = Array.from({ length: 7 }, (_, i) => i);

  return (
    <div className="grid grid-cols-7 gap-2 h-full">
      {indices.map(i => {
        const time = data.time[i];
        if (!time) return null;
        const max = Math.round(data.temperature_2m_max[i]);
        const min = Math.round(data.temperature_2m_min[i]);
        const code = data.weathercode[i];
        const precip = data.precipitation_probability_max[i] || 0;
        
        const date = parseISO(time);
        const day = format(date, 'EEE').toUpperCase();

        const isToday = i === 0;

        return (
          <div 
            key={time} 
            className={`bg-cyber-panel border p-3 flex flex-col justify-between transition-colors
              ${isToday 
                ? 'border-cyber-cyan/50 shadow-[0_0_10px_rgba(0,255,255,0.1)]' 
                : 'border-cyber-border hover:border-cyber-cyan/30'}`}
          >
            <div className={`text-[10px] text-center ${isToday ? 'text-cyber-cyan font-bold' : 'text-cyber-gray'}`}>{day}</div>
            <div className="text-center text-2xl my-auto py-2 drop-shadow-md">{renderWeatherIcon(code)}</div>
            <div className="text-xs text-center text-white font-bold tracking-wide">{max}° <span className="text-cyber-gray font-normal">/ {min}°</span></div>
            <div className="h-1 bg-black mt-2 overflow-hidden w-full relative">
              <div 
                className="absolute left-0 top-0 h-full bg-cyber-cyan transition-all duration-1000 shadow-[0_0_5px_rgba(0,255,255,0.8)]" 
                style={{ width: `${precip}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
