from flask import Flask, jsonify
from flask_cors import CORS
import random
from datetime import datetime

app = Flask(__name__)
CORS(app)

def generate_threat():
    types = ["SQL Injection", "DDoS Attack", "Phishing", "Brute Force", "Ransomware", "XSS Attack"]
    countries = ["Russia", "China", "Iran", "Brazil", "Romania", "USA"]
    risks = ["CRITICAL", "HIGH", "MEDIUM", "LOW"]
    return {
        "id": random.randint(1000, 9999),
        "type": random.choice(types),
        "ip": f"{random.randint(1,255)}.{random.randint(1,255)}.{random.randint(1,255)}.{random.randint(1,255)}",
        "country": random.choice(countries),
        "risk": random.choice(risks),
        "time": datetime.now().strftime("%H:%M:%S")
    }

@app.route('/api/threats')
def get_threats():
    return jsonify([generate_threat() for _ in range(10)])

@app.route('/api/stats')
def get_stats():
    return jsonify({
        "threats_detected": random.randint(1200, 1500),
        "attacks_blocked": random.randint(1100, 1400),
        "ai_accuracy": round(random.uniform(97, 99.9), 1),
        "active_monitors": random.randint(300, 400),
        "response_time": round(random.uniform(0.1, 0.5), 1),
        "systems_secure": round(random.uniform(98, 99.9), 1)
    })

@app.route('/api/anomalies')
def get_anomalies():
    anomaly_types = ["Traffic Spike", "Login Anomaly", "Data Exfiltration", "Port Scan", "DNS Tunneling"]
    severities = ["CRITICAL", "HIGH", "MEDIUM"]
    return jsonify([{
        "id": i,
        "type": random.choice(anomaly_types),
        "severity": random.choice(severities),
        "detail": "Automated ML detection triggered",
        "time": f"{random.randint(1,30)} min ago"
    } for i in range(5)])

if __name__ == '__main__':
    app.run(debug=True, port=5000)