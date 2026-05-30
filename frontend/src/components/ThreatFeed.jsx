import { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";

const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];
const randomIP = () => `${randomBetween(1,255)}.${randomBetween(1,255)}.${randomBetween(1,255)}.${randomBetween(1,255)}`;

const threatTypes = ["SQL Injection","DDoS Attack","Phishing","Brute Force","Ransomware","XSS Attack","Zero Day","Port Scan"];
const countries = ["Russia","China","Iran","Brazil","Romania","USA","Nigeria","Germany"];
const risks = ["CRITICAL","CRITICAL","HIGH","HIGH","MEDIUM","LOW"];

const riskConfig = {
  CRITICAL: { color:"red", bg:"bg-red-500" },
  HIGH: { color:"orange", bg:"bg-orange-500" },
  MEDIUM: { color:"yellow", bg:"bg-yellow-500" },
  LOW: { color:"green", bg:"bg-green-500" },
};

const newThreat = (id) => ({
  id, type:randomItem(threatTypes), ip:randomIP(),
  country:randomItem(countries), risk:randomItem(risks),
  time: new Date().toLocaleTimeString()
});

function ThreatFeed() {
  const [threats, setThreats] = useState(() => Array.from({length:10}, (_,i) => newThreat(i)));
  const [filter, setFilter] = useState("ALL");
  const [counter, setCounter] = useState(11);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => {
        setThreats(t => [newThreat(prev), ...t.slice(0,19)]);
        return prev + 1;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const filtered = filter === "ALL" ? threats : threats.filter(t => t.risk === filter);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-cyan-400 tracking-widest">🔴 LIVE THREAT FEED</h1>
          <p className="text-gray-500 text-sm mt-1">Real-time cybersecurity threat intelligence</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-red-400 font-bold text-sm">LIVE</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          {label:"Critical", risk:"CRITICAL", color:"red"},
          {label:"High", risk:"HIGH", color:"orange"},
          {label:"Medium", risk:"MEDIUM", color:"yellow"},
          {label:"Low", risk:"LOW", color:"green"},
        ].map((s,i) => (
          <div key={i} className={`bg-[#0a0f1f] border border-${s.color}-500 rounded-2xl p-4 text-center`}>
            <p className={`text-3xl font-extrabold text-${s.color}-400`}>
              {threats.filter(t => t.risk === s.risk).length}
            </p>
            <p className="text-gray-400 text-sm">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-3 mb-6">
        {["ALL","CRITICAL","HIGH","MEDIUM","LOW"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-bold tracking-wider transition-all ${
              filter===f ? "bg-cyan-400 text-black" : "border border-cyan-900 text-cyan-400 hover:border-cyan-400"
            }`}>
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
        {filtered.map((threat,i) => {
          const config = riskConfig[threat.risk];
          return (
            <div key={threat.id} className={`bg-[#0a0f1f] border border-${config.color}-900 hover:border-${config.color}-400 rounded-2xl p-5 transition-all flex justify-between items-center`}>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-${config.color}-500/20`}>
                  <AlertTriangle className={`text-${config.color}-400`} size={20} />
                </div>
                <div>
                  <p className="text-white font-bold">{threat.type}</p>
                  <p className="text-gray-500 text-sm">IP: {threat.ip} • {threat.country}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-500 text-xs">{threat.time}</span>
                <span className={`${config.bg} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                  {threat.risk}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ThreatFeed;