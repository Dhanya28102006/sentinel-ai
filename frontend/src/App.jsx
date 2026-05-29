import { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import ThreatFeed from "./components/ThreatFeed";
import AttackMap from "./components/AttackMap";
import AIAnalyst from "./components/AIAnalyst";
import AnomalyDetector from "./components/AnomalyDetector";
import Security from "./components/Security";

function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="max-w-7xl mx-auto">
        {activeTab === "Dashboard" && <Dashboard />}
        {activeTab === "Threat Feed" && <ThreatFeed />}
        {activeTab === "Attack Map" && <AttackMap />}
        {activeTab === "AI Analyst" && <AIAnalyst />}
        {activeTab === "Anomaly" && <AnomalyDetector />}
        {activeTab === "Security" && <Security />}
      </div>
    </div>
  );
}

export default App;