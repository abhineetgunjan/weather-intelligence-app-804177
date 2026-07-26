import { useState } from 'react';
import { Search } from 'lucide-react';
import { Panel } from './Panel';
import { cn } from '../utils';

interface SearchbarProps {
  onSearch: (city: string) => void;
  error?: string | null;
  loading?: boolean;
}

export function Searchbar({ onSearch, error, loading }: SearchbarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [history, setHistory] = useState<string[]>(['LONDON.UK', 'TOKYO.JP', 'NEW_YORK.US']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setHistory(prev => [query.trim().toUpperCase(), ...prev.slice(0, 4)]);
      setQuery('');
    }
  };

  return (
    <Panel className="flex-1 flex flex-col gap-4 !p-4" active={isFocused}>
      <div className="space-y-1">
        <label className="text-[9px] uppercase text-cyber-cyan">Target Acquisition</label>
        <form onSubmit={handleSubmit} className="relative">
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="INPUT TARGET LOCATION..."
            className={cn(
              "w-full bg-black border border-cyber-border p-2 text-xs text-cyber-cyan",
              "focus:outline-none focus:border-cyber-cyan placeholder:text-[#333] transition-colors uppercase"
            )}
            disabled={loading}
          />
          <button type="submit" disabled={loading} className="absolute right-2 top-2 text-cyber-cyan hover:text-white transition-colors">
            <Search size={16} />
          </button>
        </form>
      </div>
      
      <div className="flex-1 flex flex-col min-h-0">
        <label className="text-[9px] uppercase mt-4 mb-2">Satellite Log</label>
        <div className="flex-1 bg-black border border-cyber-border p-2 text-[10px] overflow-y-auto space-y-1 font-mono">
          <p><span className="text-cyber-lime">[OK]</span> SENSOR_ARRAY_01 CONNECTED</p>
          <p><span className="text-cyber-lime">[OK]</span> GEO_COORDS: SYNCED</p>
          {error && <p><span className="text-cyber-red">[!]</span> {error}</p>}
          {!error && <p><span className="text-cyber-lime">[OK]</span> DATA_STREAM_UP</p>}
          {loading && <p><span className="text-cyber-cyan">&gt;&gt;</span> FETCHING_ENVIRONMENTAL_VECTORS...</p>}
          
          <div className="mt-4 border-t border-cyber-border pt-2">
            <p className="text-white uppercase font-bold">History</p>
            {history.map((h, i) => (
              <p key={i} className="opacity-50 cursor-pointer hover:opacity-100 transition-opacity" onClick={() => onSearch(h)}>{h}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="h-24 border border-cyber-border bg-black p-2 relative overflow-hidden mt-auto shrink-0">
         <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(57,255,20,0.05)_25%,rgba(57,255,20,0.05)_26%,transparent_27%,transparent_74%,rgba(57,255,20,0.05)_75%,rgba(57,255,20,0.05)_76%,transparent_77%,transparent)] bg-[length:100%_4px]"></div>
         <div className="text-[9px] mb-1 uppercase relative z-10">Signal Scan</div>
         <div className="flex items-end gap-1 h-12 relative z-10">
            {[20, 40, 80, 60, 90, 30, 50, 70, 100, 40].map((h, i) => (
              <div key={i} className="flex-1 bg-cyber-lime animate-pulse" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}></div>
            ))}
         </div>
      </div>
    </Panel>
  );
}
