import { useState } from "react";
import { Shield, Activity, Brain, Map, Lock, Bot } from "lucide-react";

const tabs = [
  { name: "Dashboard", icon: Activity },
  { name: "Threat Feed", icon: Shield },
  { name: "Attack Map", icon: Map },
  { name: "AI Analyst", icon: Brain },
  { name: "Anomaly", icon: Activity },
  { name: "Security", icon: Lock },
];

function Navbar({ activeTab, setActiveTab }) {
  return (
    <div className="border-b border-cyan-900 mb-8">
      
      {/* Logo */}
      <div className="flex items-center gap-3 mb-6">
        <Shield className="text-cyan-400" size={36} />
        <div>
          <h1 className="text-2xl font-bold text-cyan-400 tracking-widest">
            SENTINEL AI
          </h1>
          <p className="text-gray-500 text-xs tracking-widest">
            CYBERSECURITY THREAT INTELLIGENCE
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-xs">SYSTEM ONLINE</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm font-bold tracking-wider whitespace-nowrap transition-all ${
                activeTab === tab.name
                  ? "bg-cyan-400 text-black"
                  : "text-cyan-400 border border-cyan-900 hover:border-cyan-400"
              }`}
            >
              <Icon size={14} />
              {tab.name}
            </button>
          );
        })}
      </div>

    </div>
  );
}

export default Navbar;