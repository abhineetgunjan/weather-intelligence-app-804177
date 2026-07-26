import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';
import { Panel } from './Panel';
import { HourlyForecast } from '../types';

interface WeatherChartProps {
  data: HourlyForecast;
}

export function WeatherChart({ data }: WeatherChartProps) {
  // Take next 24 hours
  const now = new Date();
  let startIndex = data.time.findIndex(t => new Date(t) >= now);
  if (startIndex === -1) startIndex = 0;
  
  const next24 = Array.from({ length: 24 }, (_, i) => startIndex + i)
    .filter(i => i < data.time.length)
    .map(i => ({
      time: format(parseISO(data.time[i]), 'HH:mm'),
      temp: data.temperature_2m[i]
    }));

  return (
    <Panel className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] uppercase text-cyber-magenta tracking-widest font-bold">Thermal Vector Projections // 24H</span>
        <span className="text-[9px] text-cyber-gray tracking-widest">INTERVAL: 1HR</span>
      </div>
      <div className="flex-1 w-full min-h-0 relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={next24} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-cyber-magenta)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-cyber-magenta)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-cyber-border)" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="var(--color-cyber-gray)" 
              fontSize={10} 
              tickMargin={10} 
              axisLine={false} 
              tickLine={false}
              interval="preserveStartEnd"
              tickFormatter={(value, index) => index % 6 === 0 ? value : ''}
            />
            <YAxis 
              stroke="var(--color-cyber-gray)" 
              fontSize={10} 
              axisLine={false} 
              tickLine={false}
              tickFormatter={(value) => `${value}°`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(5, 5, 5, 0.9)', 
                borderColor: 'var(--color-cyber-magenta)',
                borderRadius: 0,
                color: '#fff',
                fontFamily: 'monospace',
                fontSize: '12px'
              }}
              itemStyle={{ color: 'var(--color-cyber-magenta)', fontWeight: 'bold' }}
            />
            <Area 
              type="monotone" 
              dataKey="temp" 
              stroke="var(--color-cyber-magenta)" 
              fillOpacity={1} 
              fill="url(#colorTemp)" 
              strokeWidth={2}
              activeDot={{ r: 4, fill: "var(--color-cyber-cyan)", stroke: "var(--color-cyber-cyan)" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}
