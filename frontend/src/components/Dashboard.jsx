import { useState, useEffect } from "react";
import { Shield, AlertTriangle, Activity, Zap, Eye, Lock } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const threatData = [
  { time: "00:00", threats: 12, blocked: 10 },
  { time: "04:00", threats: 28, blocked: 25 },
  { time: "08:00", threats: 45, blocked: 40 },
  { time: "12:00", threats: 78, blocked: 70 },
  { time: "16:00", threats: 56, blocked: 52 },
  { time: "20:00", threats: 89, blocked: 85 },
  { time: "24:00", threats: 34, blocked: 30 },
];

function Dashboard() {
  const [stats, setStats] = useState({
    threats_detected: 1247,
    attacks_blocked: 1198,
    ai_accuracy: 98.7,
    active_monitors: 342,
    response_time: 0.3,
    systems_secure: 99.1
  });

  const [threats, setThreats] = useState([
    { type: "SQL Injection", ip: "192.168.1.45", risk: "HIGH" },
    { type: "DDoS Attack", ip: "103.21.244.0", risk: "CRITICAL" },
    { type: "Phishing Attempt", ip: "185.220.101.5", risk: "MEDIUM" },
    { type: "Brute Force", ip: "45.33.32.156", risk: "HIGH" },
  ]);

  useEffect(() => {
    const fetchStats = () => {
      fetch('http://localhost:5000/api/stats')
        .then(r => r.json())
        .then(data => setStats(data))
        .catch(() => console.log('Backend offline'));
    };

    const fetchThreats = () => {
      fetch('http://localhost:5000/api/threats')
        .then(r => r.json())
        .then(data => setThreats(data.slice(0, 4)))
        .catch(() => console.log('Backend offline'));
    };

    fetchStats();
    fetchThreats();

    const interval = setInterval(() => {
      fetchStats();
      fetchThreats();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const statCards = [
    { label: "Threats Detected", value: stats.threats_detected?.toLocaleString(), color: "red", icon: AlertTriangle },
    { label: "Attacks Blocked", value: stats.attacks_blocked?.toLocaleString(), color: "cyan", icon: Shield },
    { label: "AI Accuracy", value: `${stats.ai_accuracy}%`, color: "green", icon: Activity },
    { label: "Active Monitors", value: stats.active_monitors?.toString(), color: "purple", icon: Eye },
    { label: "Response Time", value: `${stats.response_time}ms`, color: "yellow", icon: Zap },
    { label: "Systems Secure", value: `${stats.systems_secure}%`, color: "cyan", icon: Lock },
  ];

  return (
    <div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className={`bg-[#0a0f1f] border border-${stat.color}-500 rounded-2xl p-6 shadow-lg`}>
              <div className="flex justify-between items-center mb-3">
                <p className="text-gray-400 text-sm tracking-wider">{stat.label}</p>
                <Icon className={`text-${stat.color}-400`} size={20} />
              </div>
              <p className={`text-4xl font-extrabold text-${stat.color}-400`}>
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div className="bg-[#0a0f1f] border border-cyan-900 rounded-2xl p-6 mb-8">
        <h2 className="text-cyan-400 font-bold text-xl mb-6 tracking-wider">
          📊 LIVE THREAT ACTIVITY — LAST 24 HOURS
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={threatData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a2035" />
            <XAxis dataKey="time" stroke="#4a5568" />
            <YAxis stroke="#4a5568" />
            <Tooltip contentStyle={{ backgroundColor: "#0a0f1f", border: "1px solid #22d3ee" }} />
            <Area type="monotone" dataKey="threats" stroke="#ef4444" fill="#ef444420" strokeWidth={2} />
            <Area type="monotone" dataKey="blocked" stroke="#22d3ee" fill="#22d3ee20" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom */}
      <div className="grid grid-cols-2 gap-6">

        {/* Live Threats */}
        <div className="bg-[#0a0f1f] border border-red-900 rounded-2xl p-6">
          <h2 className="text-red-400 font-bold text-lg mb-4 tracking-wider">
            🔴 LIVE THREATS
          </h2>
          <div className="space-y-3">
            {threats.map((threat, i) => (
              <div key={i} className="flex justify-between items-center border border-red-900 rounded-xl p-3">
                <div>
                  <p className="text-white font-bold text-sm">{threat.type}</p>
                  <p className="text-gray-500 text-xs">{threat.ip} • {threat.country || "Unknown"}</p>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full text-white ${
                  threat.risk === "CRITICAL" ? "bg-red-500" :
                  threat.risk === "HIGH" ? "bg-orange-500" :
                  "bg-yellow-500"
                }`}>
                  {threat.risk}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-[#0a0f1f] border border-cyan-900 rounded-2xl p-6">
          <h2 className="text-cyan-400 font-bold text-lg mb-4 tracking-wider">
            ⚡ SYSTEM STATUS
          </h2>
          <div className="space-y-4">
            {[
              { name: "Firewall", status: "ACTIVE", pct: 100, color: "green" },
              { name: "AI Engine", status: "RUNNING", pct: Math.round(stats.ai_accuracy || 98), color: "cyan" },
              { name: "Threat Scanner", status: "SCANNING", pct: 87, color: "yellow" },
              { name: "Encryption", status: "ENABLED", pct: 100, color: "purple" },
            ].map((sys, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300 text-sm">{sys.name}</span>
                  <span className={`text-${sys.color}-400 text-xs font-bold`}>{sys.status}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className={`bg-${sys.color}-400 h-2 rounded-full transition-all`}
                    style={{ width: `${sys.pct}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;