interface RecommendationsProps {
  weathercode: number;
  precipProb: number;
}

export function Recommendations({ weathercode, precipProb }: RecommendationsProps) {
  
  let statusText = "NOMINAL";
  let statusColor = "text-cyber-lime";
  let bgClass = "bg-cyber-cyan/5 border-cyber-cyan/20";
  let authBg = "bg-cyber-lime";
  let authText = "Cleared";
  
  let p1 = "ATMOSPHERIC CONDITIONS STABILIZING.";
  let p2 = "PROCEED WITH OUTDOOR DEPLOYMENT.";
  let p2Color = "text-cyber-cyan";
  let p3 = "VISIBILITY OPTIMAL FOR DRONE RECON.";

  // Simple deterministic logic based on requirements
  if (precipProb > 50 || (weathercode >= 51 && weathercode <= 67) || (weathercode >= 80 && weathercode <= 82) || weathercode >= 95) {
    statusText = "ATMOSPHERIC DISTURBANCE";
    statusColor = "text-cyber-magenta";
    bgClass = "bg-cyber-magenta/5 border-cyber-magenta/30";
    authBg = "bg-cyber-magenta";
    authText = "Warn";
    
    p1 = "HIGH PRECIPITATION PROBABILITY.";
    p2 = "BRING SHIELDING.";
    p2Color = "text-cyber-magenta";
    p3 = "AVOID DRONE DEPLOYMENT.";
  } else if (weathercode === 71 || weathercode === 73 || weathercode === 75 || weathercode === 77 || weathercode === 85 || weathercode === 86) {
    statusText = "CRITICAL LOW TEMPERATURE";
    statusColor = "text-cyber-red";
    bgClass = "bg-cyber-red/5 border-cyber-red/30";
    authBg = "bg-cyber-red";
    authText = "Alert";
    
    p1 = "THERMAL DROP DETECTED.";
    p2 = "ENSURE THERMAL PROTECTION.";
    p2Color = "text-cyber-red";
    p3 = "EQUIPMENT MAY MALFUNCTION.";
  }

  return (
    <div className={`h-full ${bgClass} border p-4 flex flex-col justify-center relative transition-colors`}>
      <div className="absolute top-2 right-2 flex gap-1">
        <div className={`w-1 h-1 ${authBg} animate-ping`}></div>
        <div className={`w-1 h-1 ${authBg}`}></div>
      </div>
      <div className={`text-[10px] ${statusColor} mb-2 font-bold tracking-widest`}>OPERATIONAL DIRECTIVE</div>
      <div className="text-xs leading-relaxed text-white">
        <p className="mb-2"><span className={`${statusColor} font-bold`}>STATUS: {statusText}.</span> {p1}</p>
        <p>RECOM: <span className={`${p2Color} font-bold`}>{p2}</span> {p3}</p>
      </div>
      <div className={`mt-auto border-t border-current pt-2 flex items-center gap-2 ${statusColor} opacity-80`}>
        <div className={`text-[10px] px-2 py-0.5 ${authBg} text-black font-bold uppercase`}>{authText}</div>
        <div className="text-[9px] uppercase tracking-widest opacity-50 text-white">Auth: CMD-01</div>
      </div>
    </div>
  );
}
