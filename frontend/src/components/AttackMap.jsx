import { useState, useEffect } from "react";
import { MapPin, Wifi, AlertTriangle } from "lucide-react";

const attacks = [
  { id: 1, from: "Moscow, Russia", to: "New York, USA", type: "DDoS", risk: "CRITICAL", x1: 58, y1: 35, x2: 18, y2: 38 },
  { id: 2, from: "Beijing, China", to: "London, UK", type: "APT", risk: "HIGH", x1: 80, y1: 37, x2: 47, y2: 32 },
  { id: 3, from: "Tehran, Iran", to: "Berlin, Germany", type: "Ransomware", risk: "CRITICAL", x1: 63, y1: 40, x2: 50, y2: 30 },
  { id: 4, from: "Pyongyang, NK", to: "Seoul, Korea", type: "Malware", risk: "HIGH", x1: 83, y1: 36, x2: 84, y2: 37 },
  { id: 5, from: "Lagos, Nigeria", to: "Paris, France", type: "Phishing", risk: "MEDIUM", x1: 50, y1: 55, x2: 48, y2: 31 },
  { id: 6, from: "São Paulo, Brazil", to: "Miami, USA", type: "Botnet", risk: "HIGH", x1: 27, y1: 65, x2: 20, y2: 40 },
];

const riskColor = {
  CRITICAL: "#ef4444",
  HIGH: "#f97316",
  MEDIUM: "#eab308",
  LOW: "#22c55e",
};

function AttackMap() {
  const [activeAttack, setActiveAttack] = useState(null);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => (prev + 1) % attacks.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-cyan-400 tracking-widest">
            🗺️ GLOBAL ATTACK MAP
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Real-time global cyber attack visualization
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
          <span className="text-red-400 font-bold text-sm">
            {attacks.length} ACTIVE ATTACKS
          </span>
        </div>
      </div>

      {/* Map */}
      <div className="bg-[#0a0f1f] border border-cyan-900 rounded-2xl p-4 mb-8 relative overflow-hidden">
        
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)",
            backgroundSize: "50px 50px"
          }}
        ></div>

        {/* SVG Map */}
        <svg viewBox="0 0 100 70" className="w-full h-80">
          
          {/* Attack Lines */}
          {attacks.map((attack, i) => (
            <g key={attack.id}>
              <line
                x1={attack.x1} y1={attack.y1}
                x2={attack.x2} y2={attack.y2}
                stroke={riskColor[attack.risk]}
                strokeWidth="0.3"
                strokeDasharray="2,1"
                opacity={pulse === i ? 1 : 0.3}
              />
              {/* Origin point */}
              <circle
                cx={attack.x1} cy={attack.y1} r="1"
                fill={riskColor[attack.risk]}
                opacity={pulse === i ? 1 : 0.5}
              >
                {pulse === i && (
                  <animate attributeName="r" values="1;3;1" dur="1s" repeatCount="indefinite" />
                )}
              </circle>
              {/* Target point */}
              <circle
                cx={attack.x2} cy={attack.y2} r="0.8"
                fill="#22d3ee"
                opacity={pulse === i ? 1 : 0.5}
              />
            </g>
          ))}

          {/* World map outline (simplified) */}
          <text x="15" y="42" fontSize="3" fill="#4a5568">Americas</text>
          <text x="46" y="33" fontSize="3" fill="#4a5568">Europe</text>
          <text x="62" y="38" fontSize="3" fill="#4a5568">Asia</text>
          <text x="49" y="57" fontSize="3" fill="#4a5568">Africa</text>
        </svg>

        {/* Legend */}
        <div className="flex gap-6 justify-center mt-2">
          {Object.entries(riskColor).map(([risk, color]) => (
            <div key={risk} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
              <span className="text-gray-400 text-xs">{risk}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Attack List */}
      <div className="grid grid-cols-2 gap-4">
        {attacks.map((attack, i) => (
          <div
            key={attack.id}
            onClick={() => setActiveAttack(attack)}
            className={`bg-[#0a0f1f] border rounded-2xl p-5 cursor-pointer transition-all ${
              pulse === i ? "border-red-400 shadow-lg shadow-red-500/20" : "border-cyan-900 hover:border-cyan-400"
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-bold text-sm">{attack.type}</span>
              <span
                className="text-xs font-bold px-2 py-1 rounded-full text-white"
                style={{ backgroundColor: riskColor[attack.risk] }}
              >
                {attack.risk}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <MapPin size={12} className="text-red-400" />
              <span>{attack.from}</span>
              <span>→</span>
              <MapPin size={12} className="text-cyan-400" />
              <span>{attack.to}</span>
            </div>
            {pulse === i && (
              <div className="mt-2 flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                <span className="text-red-400 text-xs">ACTIVE NOW</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AttackMap;