# MULTIPATH — Adaptive Educational Platform

> *"Learn differently. Think independently."*

MULTIPATH is an AI-powered educational platform engineered to help students understand complex concepts through genuinely different learning approaches, develop independent critical thinking, and diagnose and resolve gaps in their knowledge.

Rather than acting as a standard conversational chatbot that immediately reveals answers or produces wall-of-text explanations, MULTIPATH guides students through **Socratic inquiry**, **Feynman peer-teaching**, **multi-modal interactive simulations**, and **gap-targeted adaptive media generation**.

---

## 🌟 Core Pedagogical Pillars

```
                     ┌─────────────────────────────────────────┐
                     │          MULTIPATH LEARNING HUB         │
                     └────────────────────┬────────────────────┘
                                          │
       ┌──────────────────┬───────────────┴───────────────┬──────────────────┐
       │                  │                               │                  │
┌──────▼──────┐    ┌──────▼──────┐                 ┌──────▼──────┐    ┌──────▼──────┐
│  MULTIPLE   │    │   GUIDED    │                 │   FEYNMAN   │    │  ADAPTIVE   │
│  LEARNING   │    │  DISCOVERY  │                 │    MODE     │    │    MEDIA    │
│    PATHS    │    │   ENGINE    │                 │  (SOCRATIC) │    │ GENERATION  │
└──────┬──────┘    └──────┬──────┘                 └──────┬──────┘    └──────┬──────┘
       │                  │                               │                  │
       │                  │                               │                  │
       ▼                  ▼                               ▼                  ▼
• Structured       • 1 Question / Turn             • Peer-Teaching    • Student-Chosen
• Visual Lab       • 4-Level Hints                 • Curious Persona  • Mind Maps (SVG)
• Applications     • Honest Demo Fallback          • 6-D Rubric       • Audio Podcasts
• Interactive Sim  • Step Derivations              • Verbatim Quotes  • Video Boards
       │                  │                               │                  │
       └──────────────────┴───────────────┬───────────────┴──────────────────┘
                                          │
                               ┌──────────▼──────────┐
                               │  LEARNING PROGRESS  │
                               │  & RESOURCE LIBRARY │
                               └─────────────────────┘
                               • Grounded Evidence (No Fake XP/Streaks)
                               • Side-by-Side Reassessment Comparisons
                               • 100% On-Device IndexedDB + LocalStorage
                               • One-Click JSON Backup & Full Privacy
```

### 1. Multiple Learning Paths (Subject-Independent Modalities)
Every topic is structured across four genuinely distinct pedagogical perspectives:
- **Structured Explanation**: Clear, hierarchical breakdown with core axioms, formulas, and real-world intuition.
- **Visual Learning**: Labeled diagrams, anatomical components, process flows, and interactive layer inspectors.
- **Examples & Applications**: Step-by-step worked solutions and non-academic real-world case studies.
- **Explore & Experiment**: Interactive laboratory widgets where students manipulate variables (slopes, photon intensity, feudal tax exemptions, metaphorical tenor/vehicle domains) to observe consequences in real time.

### 2. Guided Discovery Engine (Socratic Tutoring)
- **Principle**: *"Don't give the student the answer. Help them discover it."*
- **Socratic Loop**: Asks exactly one targeted guiding question at a time. Evaluates student reasoning before taking the next step.
- **4-Level Progressive Hints**: Level 1 (Conceptual Nudge) $\rightarrow$ Level 2 (Specific Hint) $\rightarrow$ Level 3 (Next Step) $\rightarrow$ Level 4 (Detailed Walkthrough).
- **On-Demand Solution**: Reveals complete pedagogical derivations when explicitly requested.
- **Dual-Engine Architecture**: Seamlessly switches between live Gemini 1.5 Flash AI and deterministic domain evaluators with transparent mode indicators.

### 3. Feynman Mode (Peer-Teaching Diagnosis)
- **Principle**: Students solidify their understanding by teaching a concept to an inquisitive AI persona learner ("Alex").
- **Multi-Modal Input**: Supports both standard text input and **Web Speech API** voice input with live status indicators.
- **Inquisitive Learner Persona**: Acknowledges correct logic, challenges ambiguous statements politely, and asks relevant follow-up questions without superficial agreement.
- **6-Dimension Rubric**: Evaluates *Accuracy*, *Completeness*, *Conceptual Understanding*, *Relationships Between Concepts*, *Use of Terminology*, and *Quality of Reasoning*.
- **Verbatim Evidence**: Every evaluated concept is cited with verbatim quotes from the student's explanation. Distinguishes incorrect statements from partially understood concepts and unaddressed topics.

### 4. Adaptive Media Generation (Targeted Remediation)
- **Student Choice First**: The student explicitly selects which identified knowledge gap to remediate and chooses their preferred media format:
  - **Interactive Mind Maps**: Dynamic hierarchical concept maps with expandable nodes, remediation focus highlights, SVG vector export, and JSON export.
  - **Audio Lab Podcasts**: Engaging multi-speaker dialogues between lead educators and curious co-hosts, featuring Web Speech audio synthesis, playback rate controls, and synchronous transcript highlighting.
  - **Explainer Video Storyboards**: Animated multi-scene storyboards with synchronized SVG graphics, voiceover narration, key pedagogical takeaways, and scene progression controls.
- **Persistent Resource Management**: Generated resources are automatically cached in the student's library, preventing redundant regenerations.

### 5. Learning Progress & Personal Resource Library
- **Evidence-Based Dashboard**: Displays *Topics Explored*, *Topics Revisited*, *Concepts Demonstrated*, and *Concepts Needing Work*.
- **No Gamification Traps**: Avoids artificial streaks, arbitrary point scores, or meaningless levels. Progress is grounded entirely in verified understanding.
- **Side-by-Side Reassessment Comparisons**: Compares previous vs. latest Feynman sessions, displaying concept status transitions (*Partly Demonstrated* $\rightarrow$ *Demonstrated*) and verbatim quotes side-by-side.
- **Local Browser Architecture**: 100% on-device persistence using **IndexedDB** with **LocalStorage** fallback. Features complete JSON data export and one-click data reset controls.

---

## 📚 Curriculum Library Coverage

MULTIPATH includes rich, subject-independent curricula across 8 foundational domains:

| Subject | Topic | Interactive Simulation / Modality |
| :--- | :--- | :--- |
| **Mathematics** | *Linear Equations* | Interactive Cartesian slope-intercept explorer & balance beam scale |
| **Biology** | *Photosynthesis* | Photolysis & Calvin cycle solar flux simulator with wavelength controls |
| **History** | *Causes of the French Revolution* | Three Estates feudal tax burden & harvest failure crisis simulator |
| **English** | *Understanding Metaphors* | Cognitive domain projection & tenor/vehicle highlighting lens |
| **Computer Science** | *Binary Search* | Interactive logarithmic search space halving & boundary pointer tracer |
| **Physics** | *Newton's Laws of Motion* | Spacecraft thrust vector, inertia & dynamic equilibrium workbench |
| **Chemistry** | *Periodic Trends & Bonding* | Electronegativity gradient & ionic vs polar covalent character slider |
| **Geography** | *Plate Tectonics* | Mid-ocean divergent spreading & convergent subduction recycling lab |

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite 8.3, Tailwind CSS
- **Icons & UI**: Lucide React
- **Speech Synthesis & Recognition**: Web Speech API (`webkitSpeechRecognition`, `speechSynthesis`)
- **Persistence**: IndexedDB (`idb` architecture) + LocalStorage fallback
- **Server / API**: Express 5 (Node.js ESM), Vite API Middleware Plugin, Vercel Serverless Function
- **AI Inference**: Google Gemini 1.5 Flash (`@google/generative-ai` REST API) with deterministic offline fallback

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+ (tested on Node.js 20 & 24)
- npm 9+

### 1. Clone & Install
```bash
git clone https://github.com/your-username/multipath.git
cd multipath
npm install
```

### 2. Environment Configuration (Optional)
Copy the example environment template:
```bash
cp .env.example .env
```
Edit `.env` to configure your Gemini API key:
```env
# Optional: Live Gemini AI inference
GEMINI_API_KEY=your_gemini_api_key_here

# Server Port (Default: 3001)
PORT=3001
```
> **Note**: If `GEMINI_API_KEY` is not provided, MULTIPATH runs seamlessly in **Deterministic Educational Mode** with full functionality across all 8 subjects and all 5 learning capabilities.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Run Production Build & Preview
```bash
npm run build
npm run preview -- --port 4173
```
Open [http://localhost:4173](http://localhost:4173) to test the production bundle.

---

## 🌐 Deployment to Vercel

MULTIPATH is configured for zero-config deployment on Vercel:

1. **Connect Repository**: Import the repository into your Vercel Dashboard.
2. **Framework Preset**: Select **Vite** (Build Command: `npm run build`, Output Directory: `dist`).
3. **Serverless Functions**: Vercel automatically deploys `api/index.js` to handle `/api/discovery`, `/api/feynman`, and `/api/media`.
4. **Environment Variables**: Add `GEMINI_API_KEY` in the Vercel Project Settings if using live Gemini inference.

Alternatively, deploy using the Vercel CLI:
```bash
npx vercel --prod
```

---

## 🎯 9-Step Hackathon Demonstration Sequence

For live presentations and hackathon judging, follow this reliable 3-minute sequence:

1. **Landing Page & Philosophy**:
   - Open MULTIPATH. Highlight the tagline: *"Learn differently. Think independently."*
   - Showcase the 4 distinct modalities (Structured, Visual, Applications, Experiment).

2. **Curriculum Selection**:
   - Click **Explore Topics** or **Library**.
   - Select **Mathematics: Linear Equations** (or another subject like Biology or Physics).

3. **Multi-Path Exploration**:
   - Click **Explore & Experiment**.
   - Move the slope and y-intercept sliders to demonstrate real-time visual coordinate changes.

4. **Guided Discovery (Socratic Engine)**:
   - Click **Guided Discovery** in the header.
   - Enter a question or select a core inquiry: *"How do inverse operations isolate x?"*
   - Experience the 1-question-at-a-time Socratic dialogue.
   - Click **Request Progressive Hint** to show graduated scaffolding.

5. **Feynman Mode (Peer-Teaching)**:
   - Switch to **Feynman Mode**.
   - Introduce "Alex", the curious AI persona learner.
   - Click **Load Sample Explanation** (or use voice input).
   - Submit the explanation and observe Alex's thoughtful inquiry.

6. **Diagnostic Knowledge Gap Rubric**:
   - Click **Request Diagnostic Assessment**.
   - Inspect the 6-dimension evaluation breakdown and verbatim student quote citations.
   - Point out identified knowledge gaps (e.g. *Slope as Invariant Rate of Change*).

7. **Adaptive Media Generation (Student Choice)**:
   - Click **Prepare Phase 5 Media**.
   - Choose the identified weakness and select **Interactive Mind Map**.
   - Click **Generate Selected Media** to display the rendered interactive SVG diagram.

8. **Alternative Media Format (Audio Lab Podcast)**:
   - Close the Mind Map and select **Audio Lab Podcast**.
   - Generate and play the podcast with Web Speech narration and synchronous transcript tracking.

9. **Learning Progress & Evidence Reassessment**:
   - Navigate to **My Learning**.
   - In **Resource Library**, show the saved Mind Map and Podcast ready for instant re-opening.
   - In **Reassessment & Gaps**, show the side-by-side session comparison showing conceptual transitions with verbatim evidence.
   - Click **Export All Data (JSON)** to demonstrate student privacy and data portability.

---

## 🔒 Security & Privacy Guarantees

- **Zero Tracking**: No Google Analytics, telemetry beacons, or commercial advertising cookies.
- **Local-First Storage**: 100% of student learning activities, notes, and assessment records stay in browser storage.
- **No Password Barriers**: Students start immediately without mandatory account registration.
- **Server Security**: Backend endpoints strictly validate inputs and sanitize error outputs, ensuring API keys and stack traces are never exposed to the client.

---

## 📄 License

MIT License. Built with passion for autonomous, independent student thinking.
