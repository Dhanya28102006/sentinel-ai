import { useState, useEffect } from "react";
import { AlertTriangle, Shield, Wifi, Lock, Eye, Zap } from "lucide-react";

const riskConfig = {
  CRITICAL: { color: "red", bg: "bg-red-500" },
  HIGH: { color: "orange", bg: "bg-orange-500" },
  MEDIUM: { color: "yellow", bg: "bg-yellow-500" },
  LOW: { color: "green", bg: "bg-green-500" },
};

function ThreatFeed() {
  const [threats, setThreats] = useState([]);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    const fetchThreats = () => {
      fetch('http://localhost:5000/api/threats')
        .then(r => r.json())
        .then(data => setThreats(data))
        .catch(() => console.log('Backend offline'));
    };
    fetchThreats();
    const interval = setInterval(fetchThreats, 4000);
    return () => clearInterval(interval);
  }, []);

  const filtered = filter === "ALL" ? threats : threats.filter(t => t.risk === filter);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-cyan-400 tracking-widest">
            🔴 LIVE THREAT FEED
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Real-time cybersecurity threat intelligence
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-red-400 font-bold text-sm">LIVE</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Critical", count: threats.filter(t => t.risk === "CRITICAL").length, color: "red" },
          { label: "High", count: threats.filter(t => t.risk === "HIGH").length, color: "orange" },
          { label: "Medium", count: threats.filter(t => t.risk === "MEDIUM").length, color: "yellow" },
          { label: "Low", count: threats.filter(t => t.risk === "LOW").length, color: "green" },
        ].map((s, i) => (
          <div key={i} className={`bg-[#0a0f1f] border border-${s.color}-500 rounded-2xl p-4 text-center`}>
            <p className={`text-3xl font-extrabold text-${s.color}-400`}>{s.count}</p>
            <p className="text-gray-400 text-sm">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-6">
        {["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-bold tracking-wider transition-all ${
              filter === f
                ? "bg-cyan-400 text-black"
                : "border border-cyan-900 text-cyan-400 hover:border-cyan-400"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Threat List */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
        {filtered.map((threat, i) => {
          const config = riskConfig[threat.risk] || riskConfig["LOW"];
          return (
            <div
              key={i}
              className={`bg-[#0a0f1f] border border-${config.color}-900 hover:border-${config.color}-400 rounded-2xl p-5 transition-all flex justify-between items-center`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-${config.color}-500/20`}>
                  <AlertTriangle className={`text-${config.color}-400`} size={20} />
                </div>
                <div>
                  <p className="text-white font-bold">{threat.type}</p>
                  <p className="text-gray-500 text-sm">
                    IP: {threat.ip} • {threat.country}
                  </p>
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