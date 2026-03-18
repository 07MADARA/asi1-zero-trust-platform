🛡️ ASI-1 Industrial Threat Shield (IIoT & Cloud Defense)

⚠️ Important Note for Judges (Local Setup)
To protect sensitive credentials, the ASI:One API key has been securely excluded from this repository. To run this project locally, please follow these exact steps:

Built | Tracks: Cybersecurity, IoT, Web

An advanced, AI-driven cybersecurity command center designed to protect critical enterprise infrastructure. By bridging Information Technology (IT) and Operational Technology (OT), this platform uses the agentic reasoning of ASI:One to detect, analyze, and remediate cyber-physical attacks on heavy industrial machinery before physical damage occurs.

💡 The Inspiration: Structural Integrity in the Cloud
Coming from an engineering background, I view complex systems through the lens of structural integrity, stress testing, and failure modes. Just as physical machines require rigorous fail-safes, modern enterprise cloud infrastructure requires a "zero-trust" architecture to survive cyber-physical attacks. I was inspired to bridge this gap by leveraging Fetch.ai's ASI:One—not just as a chatbot, but as an autonomous, agentic security analyst capable of actively defending structural vulnerabilities in the cloud.

🚀 The Solution: Cyber-Physical AI Defense
The ASI-1 Industrial Threat Shield acts as an autonomous CISO and lead engineer. Instead of just reading firewall logs, it ingests live mechanical telemetry and monitors cloud asset health.

Deep ASI:One Integration:

Agentic Reasoning: We deploy specialized AI agents (ThreatAnalystAgent, VulnScannerAgent) that handle distinct security domains autonomously.

Mechanical Telemetry Parsing: The ASI:One API is engineered to analyze vibration and modal frequencies across a 4-stage axial compressor. It detects when a network intrusion attempts to artificially manipulate mechanical limits.

Agentic Threat Analysis: When an anomaly is detected (e.g., Layer 7 DDoS or SQLi), the ASI:One agent analyzes the logs and outputs actionable remediation protocols.

✨ Core Features
1. ⚡ Live Cloud Asset Monitor
Real-time telemetry tracking of system health, including CPU load, active connections, and failed login attempts.

Powered by a WebSocket integration for instantaneous, full-duplex data streaming.

2. 🎯 Zero-Trust Incident Triage (Drag & Drop)
A dynamic, drag-and-drop Kanban board allows security teams to seamlessly move threats from "Detected" to "ASI:One Analyzing."

Bridging the gap between manual oversight and AI-driven automation.

3. 📜 Enterprise Audit Logging
Every remediation action taken by the ASI:One agent or the administrator is recorded in a persistent Audit Trail.

Provides a verifiable paper trail for compliance and forensic analysis.

4. 🌐 Live Network Topology & Threat Map
Interactive, real-time scatter chart visualization using Recharts.

Maps intrusion attempts across global API gateways to prioritize incident response.

🏗️ Architecture & Tech Stack
Frontend (The Command Center)

React.js: Component-based UI featuring a customized Glassmorphism UI.

tsparticles: Integrated for a dynamic, layered constellation background.

WebSockets: Native browser API for real-time telemetry ingestion.

Backend (The Intelligence Hub)

FastAPI (Python): Lightning-fast, asynchronous REST and WebSocket API.

Motor: Async Python driver for non-blocking MongoDB database operations.

AI & Orchestration

ASI:One API (Fetch.ai): Powers the core threat intelligence using agentic models to return structured, deterministic security intelligence.

📦 Setup & Installation
1. Backend Setup

Bash

cd backend

python -m venv venv

.\venv\Scripts\activate


# Install requirements

pip install fastapi uvicorn websockets pydantic openai python-dotenv motor


# Launch the FastAPI server

uvicorn main:app --reload

2. Frontend Setup

Bash

cd frontend

npm install axios recharts react-tsparticles tsparticles-slim

npm start

🔮 Future Scope

Automated Patch Deployment: Upgrading the ASI:One agent to not just suggest remediation steps, but to autonomously execute generated bash scripts in a secure sandbox.

Predictive Maintenance: Expanding ASI:One's role to predict natural mechanical wear-and-tear alongside cyber-threats.