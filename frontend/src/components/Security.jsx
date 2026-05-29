import { useState } from "react";
import { Shield, Lock, Eye, Wifi, Server, AlertTriangle } from "lucide-react";

const systems = [
  { name: "Firewall", status: "ACTIVE", pct: 100, color: "green", icon: Shield },
  { name: "Encryption", status: "ENABLED", pct: 100, color: "cyan", icon: Lock },
  { name: "Threat Scanner", status: "SCANNING", pct: 87, color: "yellow", icon: Eye },
  { name: "Network Monitor", status: "ONLINE", pct: 95, color: "green", icon: Wifi },
  { name: "Database Security", status: "SECURED", pct: 98, color: "cyan", icon: Server },
  { name: "Intrusion Detection", status: "ACTIVE", pct: 92, color: "green", icon: AlertTriangle },
];

const rules = [
  { id: "RULE-001", action: "BLOCK", ip: "103.21.244.0/24", reason: "DDoS Source", status: true },
  { id: "RULE-002", action: "ALLOW", ip: "192.168.1.0/24", reason: "Internal Network", status: true },
  { id: "RULE-003", action: "BLOCK", ip: "185.220.101.0/24", reason: "Tor Exit Node", status: true },
  { id: "RULE-004", action: "MONITOR", ip: "45.33.32.0/24", reason: "Suspicious Activity", status: false },
];

function Security() {
  const [ruleStates, setRuleStates] = useState(rules);

  const toggleRule = (id) => {
    setRuleStates(prev =>
      prev.map(r => r.id === id ? { ...r, status: !r.status } : r)
    );
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Shield className="text-cyan-400" size={36} />
        <div>
          <h1 className="text-3xl font-extrabold text-cyan-400 tracking-widest">
            SECURITY CONTROL
          </h1>
          <p className="text-gray-500 text-sm">Enterprise security management center</p>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-[#0a0f1f] border border-cyan-900 rounded-2xl p-6 mb-8">
        <h2 className="text-cyan-400 font-bold mb-6 tracking-wider">⚡ SYSTEM STATUS</h2>
        <div className="grid grid-cols-2 gap-4">
          {systems.map((sys, i) => {
            const Icon = sys.icon;
            return (
              <div key={i} className="border border-cyan-900 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <Icon className={`text-${sys.color}-400`} size={16} />
                    <span className="text-white font-bold text-sm">{sys.name}</span>
                  </div>
                  <span className={`text-${sys.color}-400 text-xs font-bold`}>{sys.status}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className={`bg-${sys.color}-400 h-2 rounded-full transition-all`}
                    style={{ width: `${sys.pct}%` }}
                  ></div>
                </div>
                <p className={`text-${sys.color}-400 text-xs mt-1 text-right`}>{sys.pct}%</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Firewall Rules */}
      <div className="bg-[#0a0f1f] border border-cyan-900 rounded-2xl p-6">
        <h2 className="text-cyan-400 font-bold mb-6 tracking-wider">🔒 FIREWALL RULES</h2>
        <div className="space-y-3">
          {ruleStates.map((rule) => (
            <div key={rule.id} className="flex justify-between items-center border border-cyan-900 rounded-xl p-4 hover:border-cyan-400 transition-all">
              <div className="flex items-center gap-4">
                <span className="text-gray-500 text-xs font-mono">{rule.id}</span>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  rule.action === "BLOCK" ? "bg-red-500 text-white" :
                  rule.action === "ALLOW" ? "bg-green-500 text-white" :
                  "bg-yellow-500 text-black"
                }`}>
                  {rule.action}
                </span>
                <span className="text-white text-sm font-mono">{rule.ip}</span>
                <span className="text-gray-500 text-xs">{rule.reason}</span>
              </div>
              <button
                onClick={() => toggleRule(rule.id)}
                className={`w-12 h-6 rounded-full transition-all relative ${
                  rule.status ? "bg-cyan-400" : "bg-gray-700"
                }`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${
                  rule.status ? "left-7" : "left-1"
                }`}></div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Security;