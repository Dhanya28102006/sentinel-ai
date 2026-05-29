import { useState, useEffect } from "react";
import { Shield, AlertTriangle, Activity, Zap, Eye, Lock } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateChartData = () =>
  ["00:00","04:00","08:00","12:00","16:00","20:00","24:00"].map(time => ({
    time,
    threats: randomBetween(10, 100),
    blocked: randomBetween(8, 90),
  }));

const randomIP = () => `${randomBetween(1,255)}.${randomBetween(1,255)}.${randomBetween(1,255)}.${randomBetween(1,255)}`;
const threatTypes = ["SQL Injection", "DDoS Attack", "Phishing", "Brute Force", "Ransomware", "XSS Attack"];
const countries = ["Russia", "China", "Iran", "Brazil", "Romania", "USA"];
const risks = ["CRITICAL", "HIGH", "MEDIUM"];
const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];

function Dashboard() {
  const [stats, setStats] = useState({
    threats_detected: 1247,
    attacks_blocked: 1198,
    ai_accuracy: 98.7,
    active_monitors: 342,
    response_time: 0.3,
    systems_secure: 99.1
  });

  const [threats, setThreats] = useState(
    Array.from({ length: 4 }, (_, i) => ({
      id: i,
      type: randomItem(threatTypes),
      ip: randomIP(),
      country: randomItem(countries),
      risk: randomItem(risks),
    }))
  );

  const [chartData, setChartData] = useState(generateChartData());

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        threats_detected: randomBetween(1200, 1500),
        attacks_blocked: randomBetween(1100, 1400),
        ai_accuracy: parseFloat((Math.random() * 2 + 97).toFixed(1)),
        active_monitors: randomBetween(300, 400),
        response_time: parseFloat((Math.random() * 0.4 + 0.1).toFixed(1)),
        systems_secure: parseFloat((Math.random() * 1 + 98.5).toFixed(1)),
      });
      setThreats(Array.from({ length: 4 }, (_, i) => ({
        id: i,
        type: randomItem(threatTypes),
        ip: randomIP(),
        country: randomItem(countries),
        risk: randomItem(risks),
      })));
      setChartData(generateChartData());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const statCards = [
    { label: "Threats Detected", value: stats.threats_detected.toLocaleString(), color: "red", icon: AlertTriangle },
    { label: "Attacks Blocked", value: stats.attacks_blocked.toLocaleString(), color: "cyan", icon: Shield },
    { label: "AI Accuracy", value: `${stats.ai_accuracy}%`, color: "green", icon: Activity },
    { label: "Active Monitors", value: stats.active_monitors.toString(), color: "purple", icon: Eye },
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
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a2035" />
            <XAxis dataKey="time" stroke="#4a5568" />
            <YAxis stroke="#4a5568" />
            <Tooltip contentStyle={{ backgroundColor: "#0a0f1f", border: "1px solid #22d3ee" }} />
            <Area type="monotone" dataKey="threats" stroke="#ef4444" fill="#ef444420" strokeWidth={2} name="Threats" />
            <Area type="monotone" dataKey="blocked" stroke="#22d3ee" fill="#22d3ee20" strokeWidth={2} name="Blocked" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#0a0f1f] border border-red-900 rounded-2xl p-6">
          <h2 className="text-red-400 font-bold text-lg mb-4 tracking-wider">
            🔴 LIVE THREATS
          </h2>
          <div className="space-y-3">
            {threats.map((threat, i) => (
              <div key={i} className="flex justify-between items-center border border-red-900 rounded-xl p-3">
                <div>
                  <p className="text-white font-bold text-sm">{threat.type}</p>
                  <p className="text-gray-500 text-xs">{threat.ip} • {threat.country}</p>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full text-white ${
                  threat.risk === "CRITICAL" ? "bg-red-500" :
                  threat.risk === "HIGH" ? "bg-orange-500" : "bg-yellow-500"
                }`}>
                  {threat.risk}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0a0f1f] border border-cyan-900 rounded-2xl p-6">
          <h2 className="text-cyan-400 font-bold text-lg mb-4 tracking-wider">
            ⚡ SYSTEM STATUS
          </h2>
          <div className="space-y-4">
            {[
              { name: "Firewall", status: "ACTIVE", pct: 100, color: "green" },
              { name: "AI Engine", status: "RUNNING", pct: Math.round(stats.ai_accuracy), color: "cyan" },
              { name: "Threat Scanner", status: "SCANNING", pct: randomBetween(80, 95), color: "yellow" },
              { name: "Encryption", status: "ENABLED", pct: 100, color: "purple" },
            ].map((sys, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300 text-sm">{sys.name}</span>
                  <span className={`text-${sys.color}-400 text-xs font-bold`}>{sys.status}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className={`bg-${sys.color}-400 h-2 rounded-full`} style={{ width: `${sys.pct}%` }}></div>
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