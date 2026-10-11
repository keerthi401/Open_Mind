# OptiMind AI 🧠✨
> **Tagline:** *"See It, Understand It, Master It."*

OptiMind AI is a modern, responsive, AI-powered visual learning platform built for students and hackathon demonstrations. It transforms dense textbooks, lecture notes, complex equations, and research papers into intuitive mental models, interactive visual cards, multi-level explanations, personalized roadmaps, and diagnostic quizzes.

---

## 🚀 Live Demo & Quick Start

The application is built with **React 18**, **Vite**, and **Tailwind CSS**.

### Running Locally
```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit **`http://localhost:5173`** in your browser.

---

## 🌟 Core Features Implemented

1. **Upload Educational Content**:
   - Ingest PDF files, whiteboard photos/diagrams, or raw lecture text notes.
   - Interactive 4-step AI synthesis simulator (Token extraction → Concept chunking → Analogy synthesis → Visual card & quiz generation).
   - Ingested topics immediately become interactive visual study units.

2. **Explain Complex Topics in Simple Language**:
   - **ELI5 (Analogy Mode)**: Everyday real-world metaphors (e.g. Archery coaches, spinning coins, water dams) to anchor concepts in intuition.
   - **High School Mode**: Structured core definitions, formulas, and balance principles.
   - **College Pro Mode**: Rigorous mathematical derivations, tensor gradients, Hilbert spaces, and loss landscapes.
   - Built-in text-to-speech audio narration simulation.

3. **Interactive Visual Learning Cards & Step-by-Step Studio**:
   - **3D Card Flip**: Front view with interactive SVG diagrams and key metrics; back view with deep-dive breakdowns and mental models.
   - **Interactive Diagrams**:
     - *Neuron/Perceptron*: Interactive synaptic weights slider $(w_1, w_2, b)$ with real-time activation output calculation.
     - *Activation Functions*: Curve viewer comparing ReLU, Sigmoid, and Tanh.
     - *Loss Surface*: Contour gradient descent step simulator.
     - *Bloch Sphere*: Interactive qubit state vector rotation slider $(\theta = 0^\circ \text{ to } 180^\circ)$.
     - *Calculus Tangents*: Dynamic polynomial tangent line with instantaneous derivative slope calculator.
     - *Chloroplast / ATP Synthase*: Solar photon flux and rotary chemiosmosis reactor.
   - **Step-by-Step Walkthrough**: Phase-by-phase visual stepper with key takeaways and formulas.

4. **AI Learning Assistant Interface**:
   - Conversational pedagogical assistant with Socratic guidance.
   - Quick prompt suggestion chips for fast demonstration.
   - Dual-engine architecture:
     - **OptiMind Pedagogical Demo Engine**: High-fidelity, offline, zero-latency pre-computed intelligence.
     - **Live Google Gemini 1.5 API Mode**: Transparent optional client-side API key configuration stored securely in browser `localStorage`.

5. **Diagnostic Interactive Quizzes**:
   - 5-question targeted conceptual assessments for each topic.
   - Instant visual answer validation (green check / red cross).
   - Pedagogical hints accordion.
   - Detailed conceptual explanation breakdown for every question.
   - Score summary screen with celebratory confetti animation (`canvas-confetti`) and retake options.

6. **Personalized Learning Roadmaps**:
   - Visual milestone trees (e.g. *Full-Stack AI & Machine Learning*, *Quantum Computing*, *Cellular Bioenergetics*).
   - Status tracking (`Completed`, `In Progress`, `Locked`), estimated hours, and skills tags.
   - Deep links directly into OptiMind Visual Studio modules.
   - Custom AI roadmap generator: type any academic ambition to synthesize an interactive path.

7. **Progress & Analytics Dashboard**:
   - Visual cards mastered tracker (148+ cards).
   - Daily study streak flame counter (7-Day streak).
   - Weekly study hours activity bar chart.
   - Core disciplines mastery radar/bars (AI, Quantum, Bio, Math).
   - Unlocked student achievements & badges.

---

## 🎨 Design & Aesthetics
- **Color Palette**: Brand Royal Blue (`#135bec`), Vibrant Violet (`#7c3aed`), Slate neutral backgrounds, and high-contrast dark text (`#0f172a`).
- **Typography**: Clean Plus Jakarta Sans / Inter font hierarchy with JetBrains Mono for mathematical formulas.
- **Micro-Interactions**: Smooth 3D card flips, subtle glowing pulses, responsive sidebar with mobile drawer support.
