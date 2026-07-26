import { Panel } from './Panel';
import { CurrentWeather as CurrentWeatherType } from '../types';
import { getWeatherDescription } from '../api/OpenMeteo';

interface CurrentWeatherProps {
  data: CurrentWeatherType;
  locationName: string;
}

export function CurrentWeatherPanel({ data, locationName }: CurrentWeatherProps) {
  return (
    <Panel className="h-full flex flex-col md:flex-row justify-between items-start md:items-center relative group p-6 border-cyber-border">
      {/* Corner borders */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyber-cyan"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyber-cyan"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyber-cyan"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyber-cyan"></div>
      
      <div className="flex flex-col z-10 w-full md:w-auto">
        <h2 className="text-xs text-cyber-cyan mb-1 tracking-widest uppercase">PRIMARY CONDITION MATRIX // {locationName}</h2>
        <div className="flex items-baseline">
          <p className="text-6xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            {Math.round(data.temperature)}
          </p>
          <span className="text-3xl text-cyber-cyan ml-1">°C</span>
        </div>
        <p className="text-xl text-cyber-magenta font-black uppercase tracking-widest mt-2 drop-shadow-[0_0_8px_rgba(255,0,255,0.3)]">
          {getWeatherDescription(data.weathercode)} / Tactical Clear
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-8 mt-6 md:mt-0 border-t md:border-t-0 md:border-l border-cyber-border pt-4 md:pt-0 md:pl-10 w-full md:w-auto z-10">
        <div>
          <div className="text-[10px] uppercase mb-1 text-cyber-gray">Wind Velocity</div>
          <div className="text-2xl text-white font-bold">{data.windspeed} <span className="text-xs text-cyber-gray font-normal">km/h</span></div>
        </div>
        <div>
          <div className="text-[10px] uppercase mb-1 text-cyber-gray">Wind Direction</div>
          <div className="text-2xl text-white font-bold">{data.winddirection}° <span className="text-xs text-cyber-gray font-normal">deg</span></div>
        </div>
        <div>
          <div className="text-[10px] uppercase mb-1 text-cyber-gray">System Time</div>
          <div className="text-xl text-white font-bold">{new Date(data.time).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })} <span className="text-xs text-cyber-gray font-normal">LCL</span></div>
        </div>
        <div>
          <div className="text-[10px] uppercase mb-1 text-cyber-gray">UV Exposure</div>
          <div className="text-2xl text-cyber-lime font-bold tracking-widest drop-shadow-[0_0_5px_rgba(57,255,20,0.5)]">LOW</div>
        </div>
      </div>
    </Panel>
  );
}
