import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { AlertTriangle, Activity } from "lucide-react";

const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];

const anomalyTypes = ["Traffic Spike","Login Anomaly","Data Exfiltration","Port Scan","DNS Tunneling","Brute Force Pattern"];
const severities = ["CRITICAL","CRITICAL","HIGH","HIGH","MEDIUM"];
const details = [
  "500% above normal traffic",
  "Multiple failed login attempts",
  "Large data transfer detected",
  "Sequential port scanning",
  "Unusual DNS query pattern",
  "Repeated auth failures",
];

const generateChart = () =>
  Array.from({length:12}, (_,i) => ({
    time: `${i*2}:00`,
    normal: randomBetween(150,300),
    anomaly: randomBetween(5,60),
  }));

const generateAnomalies = () =>
  Array.from({length:5}, (_,i) => ({
    id: i,
    type: randomItem(anomalyTypes),
    severity: randomItem(severities),
    detail: randomItem(details),
    time: `${randomBetween(1,30)} min ago`,
  }));

function AnomalyDetector() {
  const [chartData, setChartData] = useState(generateChart());
  const [anomalies, setAnomalies] = useState(generateAnomalies());
  const [stats, setStats] = useState({
    count: 47, accuracy: 97.3, response: 1.2, falsePositive: 2.1
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(generateChart());
      setAnomalies(generateAnomalies());
      setStats({
        count: randomBetween(40,60),
        accuracy: parseFloat((Math.random()*2+96).toFixed(1)),
        response: parseFloat((Math.random()*1+0.8).toFixed(1)),
        falsePositive: parseFloat((Math.random()*2+1).toFixed(1)),
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Activity className="text-cyan-400" size={36} />
        <div>
          <h1 className="text-3xl font-extrabold text-cyan-400 tracking-widest">
            ANOMALY DETECTOR
          </h1>
          <p className="text-gray-500 text-sm">ML-powered real-time anomaly detection</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-red-400 text-sm font-bold">LIVE ML</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          {label:"Anomalies Today", value:stats.count, color:"red"},
          {label:"ML Accuracy", value:`${stats.accuracy}%`, color:"green"},
          {label:"Avg Response", value:`${stats.response}s`, color:"cyan"},
          {label:"False Positives", value:`${stats.falsePositive}%`, color:"yellow"},
        ].map((s,i) => (
          <div key={i} className={`bg-[#0a0f1f] border border-${s.color}-500 rounded-2xl p-5 text-center`}>
            <p className={`text-3xl font-extrabold text-${s.color}-400`}>{s.value}</p>
            <p className="text-gray-400 text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-[#0a0f1f] border border-cyan-900 rounded-2xl p-6 mb-8">
        <h2 className="text-cyan-400 font-bold mb-4 tracking-wider">
          📈 LIVE TRAFFIC ANOMALY CHART
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a2035" />
            <XAxis dataKey="time" stroke="#4a5568" />
            <YAxis stroke="#4a5568" />
            <Tooltip contentStyle={{backgroundColor:"#0a0f1f", border:"1px solid #22d3ee"}} />
            <Area type="monotone" dataKey="normal" stroke="#22d3ee" fill="#22d3ee20" strokeWidth={2} name="Normal" />
            <Area type="monotone" dataKey="anomaly" stroke="#ef4444" fill="#ef444430" strokeWidth={2} name="Anomaly" />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex gap-6 mt-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
            <span className="text-gray-400 text-xs">Normal Traffic</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <span className="text-gray-400 text-xs">Anomaly</span>
          </div>
        </div>
      </div>

      {/* Anomaly List */}
      <div className="bg-[#0a0f1f] border border-red-900 rounded-2xl p-6">
        <h2 className="text-red-400 font-bold mb-4 tracking-wider">
          🚨 DETECTED ANOMALIES — LIVE
        </h2>
        <div className="space-y-3">
          {anomalies.map((a,i) => (
            <div key={i} className="flex justify-between items-center border border-red-900 hover:border-red-400 rounded-xl p-4 transition-all">
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-red-400" size={18} />
                <div>
                  <p className="text-white font-bold text-sm">{a.type}</p>
                  <p className="text-gray-500 text-xs">{a.detail}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-xs">{a.time}</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full text-white ${
                  a.severity==="CRITICAL"?"bg-red-500":
                  a.severity==="HIGH"?"bg-orange-500":"bg-yellow-500"
                }`}>
                  {a.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnomalyDetector;