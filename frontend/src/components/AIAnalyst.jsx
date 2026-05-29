import { useState, useRef, useEffect } from "react";
import { Brain, Send, Shield, AlertTriangle } from "lucide-react";

const suggestions = [
  "Analyze latest threats",
  "Which country attacks most?",
  "How to block DDoS?",
  "Top vulnerabilities today",
];

const autoReplies = {
  "analyze latest threats": "🔴 Critical alerts: DDoS from Russia (103.21.x.x), SQL Injection from China (180.x.x.x). Recommend enabling rate limiting immediately!",
  "which country attacks most?": "📊 Top attackers:\n1. Russia — 34%\n2. China — 28%\n3. Iran — 15%\n4. Brazil — 12%\n5. Romania — 11%",
  "how to block ddos?": "🛡️ DDoS Protection steps:\n1. Enable CloudFlare\n2. Rate limit requests\n3. Block suspicious IPs\n4. Use load balancer\n5. Enable geo-blocking",
  "top vulnerabilities today": "⚠️ Today's CVEs:\n• CVE-2026-1234 (Critical)\n• CVE-2026-5678 (High)\n• CVE-2026-9012 (Critical)\nPatch immediately!",
};

function AIAnalyst() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello! I'm SentinelAI Analyst 🤖 Ask me anything about cybersecurity threats!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setMessages(prev => [...prev, { role: "user", text: msg }]);
    setLoading(true);
    setInput("");
    setTimeout(() => {
      const reply = autoReplies[msg.toLowerCase()] ||
        "🔍 Based on current threat intelligence, I recommend enabling MFA and updating all system patches immediately. Stay vigilant!";
      setMessages(prev => [...prev, { role: "bot", text: reply }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Brain className="text-cyan-400" size={36} />
        <div>
          <h1 className="text-3xl font-extrabold text-cyan-400 tracking-widest">AI ANALYST</h1>
          <p className="text-gray-500 text-sm">Powered by SentinelAI Intelligence Engine</p>
        </div>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"2fr 1fr", gap:"24px"}}>

        {/* Chat Box */}
        <div style={{backgroundColor:"#0a0f1f", border:"1px solid #164e63", borderRadius:"16px", padding:"24px", display:"flex", flexDirection:"column", gap:"16px"}}>

          {/* Messages Area */}
          <div style={{backgroundColor:"#020617", borderRadius:"12px", padding:"16px", height:"380px", overflowY:"auto", display:"flex", flexDirection:"column", gap:"12px"}}>
            {messages.map((msg, i) => (
              <div key={i} style={{display:"flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start"}}>
                <div style={{
                  maxWidth:"75%",
                  padding:"10px 16px",
                  borderRadius:"16px",
                  fontSize:"14px",
                  whiteSpace:"pre-wrap",
                  backgroundColor: msg.role === "user" ? "#22d3ee" : "#0a0f1f",
                  color: msg.role === "user" ? "#000" : "#d1d5db",
                  border: msg.role === "bot" ? "1px solid #164e63" : "none",
                  fontWeight: msg.role === "user" ? "bold" : "normal",
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{display:"flex", gap:"6px", padding:"10px"}}>
                {[0,1,2].map(i => (
                  <div key={i} style={{width:"8px", height:"8px", borderRadius:"50%", backgroundColor:"#22d3ee", animation:"bounce 0.8s infinite", animationDelay:`${i*0.15}s`}}></div>
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          <div style={{display:"flex", gap:"8px", flexWrap:"wrap"}}>
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => sendMessage(s)}
                style={{fontSize:"12px", border:"1px solid #164e63", color:"#22d3ee", padding:"4px 12px", borderRadius:"999px", backgroundColor:"transparent", cursor:"pointer"}}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{display:"flex", gap:"12px"}}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === "Enter" && sendMessage()}
              placeholder="Ask about threats, attacks, vulnerabilities..."
              style={{flex:1, backgroundColor:"#020617", border:"1px solid #164e63", borderRadius:"12px", padding:"12px 16px", color:"white", fontSize:"14px", outline:"none"}}
            />
            <button
              onClick={() => sendMessage()}
              style={{backgroundColor:"#22d3ee", color:"black", padding:"12px 20px", borderRadius:"12px", fontWeight:"bold", cursor:"pointer", border:"none"}}
            >
              <Send size={18} />
            </button>
          </div>
        </div>

        {/* Side Panel */}
        <div style={{display:"flex", flexDirection:"column", gap:"16px"}}>

          {/* AI Status */}
          <div style={{backgroundColor:"#0a0f1f", border:"1px solid #164e63", borderRadius:"16px", padding:"20px"}}>
            <h3 style={{color:"#22d3ee", fontWeight:"bold", marginBottom:"16px", letterSpacing:"2px"}}>🧠 AI STATUS</h3>
            {[
              { label: "Model Accuracy", value: "98.7%", color: "#22c55e" },
              { label: "Threats Analyzed", value: "12,847", color: "#22d3ee" },
              { label: "Response Time", value: "0.3ms", color: "#eab308" },
            ].map((s, i) => (
              <div key={i} style={{display:"flex", justifyContent:"space-between", marginBottom:"12px"}}>
                <span style={{color:"#9ca3af", fontSize:"14px"}}>{s.label}</span>
                <span style={{color:s.color, fontWeight:"bold", fontSize:"14px"}}>{s.value}</span>
              </div>
            ))}
          </div>

          {/* AI Alerts */}
          <div style={{backgroundColor:"#0a0f1f", border:"1px solid #7f1d1d", borderRadius:"16px", padding:"20px"}}>
            <h3 style={{color:"#f87171", fontWeight:"bold", marginBottom:"16px", letterSpacing:"2px"}}>⚠️ AI ALERTS</h3>
            {[
              "Unusual traffic spike detected",
              "3 new CVEs published today",
              "Brute force attempt blocked",
            ].map((alert, i) => (
              <div key={i} style={{display:"flex", alignItems:"flex-start", gap:"8px", marginBottom:"10px"}}>
                <AlertTriangle size={14} color="#f87171" style={{marginTop:"2px", flexShrink:0}} />
                <p style={{color:"#9ca3af", fontSize:"13px"}}>{alert}</p>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div style={{backgroundColor:"#0a0f1f", border:"1px solid #14532d", borderRadius:"16px", padding:"20px"}}>
            <h3 style={{color:"#4ade80", fontWeight:"bold", marginBottom:"16px", letterSpacing:"2px"}}>✅ RECOMMENDATIONS</h3>
            {[
              "Enable 2FA immediately",
              "Patch CVE-2026-1234",
              "Block IP range 103.x.x.x",
            ].map((rec, i) => (
              <div key={i} style={{display:"flex", alignItems:"flex-start", gap:"8px", marginBottom:"10px"}}>
                <Shield size={14} color="#4ade80" style={{marginTop:"2px", flexShrink:0}} />
                <p style={{color:"#9ca3af", fontSize:"13px"}}>{rec}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}

export default AIAnalyst;