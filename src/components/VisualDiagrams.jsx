import React, { useState } from 'react';
import { Play, RotateCcw, Zap, Sparkles } from 'lucide-react';

export const NeuronDiagram = ({ interactive = true }) => {
  const [weights, setWeights] = useState({ w1: 0.8, w2: -0.5, b: 0.2 });
  const [inputs, setInputs] = useState({ x1: 1.0, x2: 0.5 });
  const rawSum = (inputs.x1 * weights.w1 + inputs.x2 * weights.w2 + weights.b);
  const reluOutput = Math.max(0, rawSum).toFixed(2);

  return (
    <div className="w-full bg-slate-900 rounded-xl p-4 text-white font-mono text-xs shadow-inner select-none">
      <div className="flex justify-between items-center mb-3">
        <span className="text-blue-400 font-semibold tracking-wide flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
          Interactive Perceptron Computation
        </span>
        <span className="text-slate-400 text-[10px]">z = (w1·x1 + w2·x2) + b</span>
      </div>

      <svg viewBox="0 0 460 170" className="w-full h-auto">
        <defs>
          <linearGradient id="neonBlue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="glowPurple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>

        {/* Input nodes */}
        <g>
          <circle cx="50" cy="45" r="22" fill="#1e293b" stroke="#3b82f6" strokeWidth="2.5" />
          <text x="50" y="49" fill="#93c5fd" textAnchor="middle" fontSize="11" fontWeight="bold">x₁={inputs.x1}</text>

          <circle cx="50" cy="125" r="22" fill="#1e293b" stroke="#3b82f6" strokeWidth="2.5" />
          <text x="50" y="129" fill="#93c5fd" textAnchor="middle" fontSize="11" fontWeight="bold">x₂={inputs.x2}</text>
        </g>

        {/* Synaptic weight lines */}
        <line x1="72" y1="45" x2="200" y2="85" stroke="#60a5fa" strokeWidth="2.5" strokeDasharray="4 2" />
        <rect x="110" y="48" width="50" height="18" rx="4" fill="#0f172a" stroke="#3b82f6" strokeWidth="1" />
        <text x="135" y="61" fill="#67e8f9" textAnchor="middle" fontSize="10">w₁={weights.w1}</text>

        <line x1="72" y1="125" x2="200" y2="85" stroke="#c084fc" strokeWidth="2.5" strokeDasharray="4 2" />
        <rect x="110" y="102" width="50" height="18" rx="4" fill="#0f172a" stroke="#c084fc" strokeWidth="1" />
        <text x="135" y="115" fill="#f472b6" textAnchor="middle" fontSize="10">w₂={weights.w2}</text>

        {/* Summation Node */}
        <circle cx="225" cy="85" r="28" fill="#1e1b4b" stroke="url(#neonBlue)" strokeWidth="3" />
        <text x="225" y="80" fill="#ffffff" textAnchor="middle" fontSize="14" fontWeight="bold">Σ + b</text>
        <text x="225" y="96" fill="#a5b4fc" textAnchor="middle" fontSize="9">z={rawSum.toFixed(2)}</text>

        {/* Activation transfer */}
        <line x1="253" y1="85" x2="330" y2="85" stroke="#a855f7" strokeWidth="3" />
        <polygon points="325,80 335,85 325,90" fill="#a855f7" />

        {/* ReLU Activation Node */}
        <rect x="335" y="60" width="50" height="50" rx="8" fill="#1e293b" stroke="#ec4899" strokeWidth="2" />
        <text x="360" y="82" fill="#f472b6" textAnchor="middle" fontSize="10" fontWeight="bold">ReLU</text>
        <text x="360" y="98" fill="#cbd5e1" textAnchor="middle" fontSize="8">max(0, z)</text>

        {/* Output */}
        <line x1="385" y1="85" x2="435" y2="85" stroke="#ec4899" strokeWidth="3" />
        <polygon points="430,80 440,85 430,90" fill="#ec4899" />
        <circle cx="440" cy="85" r="14" fill="#059669" stroke="#34d399" strokeWidth="2" />
        <text x="440" y="89" fill="#ffffff" textAnchor="middle" fontSize="9" fontWeight="bold">{reluOutput}</text>
      </svg>

      {interactive && (
        <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-[11px]">
          <div>
            <label className="text-slate-400 block mb-0.5">Adjust Synaptic Weight w₁: ({weights.w1})</label>
            <input
              type="range"
              min="-2"
              max="2"
              step="0.1"
              value={weights.w1}
              onChange={(e) => setWeights({ ...weights, w1: parseFloat(e.target.value) })}
              className="w-full accent-blue-500 h-1 bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>
          <div>
            <label className="text-slate-400 block mb-0.5">Adjust Bias b: ({weights.b})</label>
            <input
              type="range"
              min="-1"
              max="1"
              step="0.1"
              value={weights.b}
              onChange={(e) => setWeights({ ...weights, b: parseFloat(e.target.value) })}
              className="w-full accent-purple-500 h-1 bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const ActivationDiagram = () => {
  const [activeFunc, setActiveFunc] = useState('relu');
  return (
    <div className="w-full bg-slate-900 rounded-xl p-4 text-white font-mono text-xs shadow-inner">
      <div className="flex justify-between items-center mb-2">
        <span className="text-purple-400 font-semibold">Activation Curves</span>
        <div className="flex gap-1.5">
          {['relu', 'sigmoid', 'tanh'].map((fn) => (
            <button
              key={fn}
              onClick={() => setActiveFunc(fn)}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                activeFunc === fn
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {fn.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 320 150" className="w-full h-auto bg-slate-950/60 rounded-lg border border-slate-800">
        {/* Axes */}
        <line x1="30" y1="75" x2="290" y2="75" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="160" y1="15" x2="160" y2="135" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
        <text x="295" y="79" fill="#94a3b8" fontSize="9">x</text>
        <text x="164" y="22" fill="#94a3b8" fontSize="9">y</text>

        {activeFunc === 'relu' && (
          <path
            d="M 30,75 L 160,75 L 280,15"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        )}

        {activeFunc === 'sigmoid' && (
          <path
            d="M 30,125 C 100,125 120,110 160,75 C 200,40 220,25 290,25"
            fill="none"
            stroke="#c084fc"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        )}

        {activeFunc === 'tanh' && (
          <path
            d="M 30,135 C 110,135 130,120 160,75 C 190,30 210,15 290,15"
            fill="none"
            stroke="#34d399"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        )}
      </svg>
      <div className="mt-2 text-[11px] text-slate-300">
        {activeFunc === 'relu' && "ReLU: max(0, x). High gradient throughput prevents vanishing gradients in deep models."}
        {activeFunc === 'sigmoid' && "Sigmoid: 1 / (1 + e^-x). Compresses values into (0, 1) probability range."}
        {activeFunc === 'tanh' && "Tanh: Zero-centered from -1 to +1, helpful for symmetric gradient descent."}
      </div>
    </div>
  );
};

export const LossLandscapeDiagram = () => {
  const [step, setStep] = useState(3);
  const stepsCoords = [
    { x: 50, y: 35, lr: "Start (High Loss: 2.84)" },
    { x: 100, y: 60, lr: "Step 1: Loss 1.95" },
    { x: 160, y: 90, lr: "Step 2: Loss 0.72" },
    { x: 215, y: 105, lr: "Step 3: Minimum Reached (Loss 0.08)" }
  ];

  return (
    <div className="w-full bg-slate-900 rounded-xl p-4 text-white font-mono text-xs shadow-inner">
      <div className="flex justify-between items-center mb-2">
        <span className="text-emerald-400 font-semibold">Loss Surface Gradient Descent</span>
        <button
          onClick={() => setStep((s) => (s < 3 ? s + 1 : 0))}
          className="flex items-center gap-1 text-[11px] bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded text-emerald-300"
        >
          <RotateCcw className="w-3 h-3" /> Step: {step + 1}/4
        </button>
      </div>

      <svg viewBox="0 0 280 140" className="w-full h-auto bg-slate-950/70 rounded-lg border border-slate-800">
        {/* Contours */}
        <ellipse cx="215" cy="105" rx="100" ry="50" fill="none" stroke="#334155" strokeWidth="1.5" />
        <ellipse cx="215" cy="105" rx="70" ry="35" fill="none" stroke="#475569" strokeWidth="1.5" />
        <ellipse cx="215" cy="105" rx="40" ry="20" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <ellipse cx="215" cy="105" rx="15" ry="8" fill="#047857" fillOpacity="0.4" stroke="#10b981" strokeWidth="1.5" />

        {/* Descent Path */}
        <polyline
          points={stepsCoords.slice(0, step + 1).map((p) => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2.5"
          strokeDasharray="4 2"
        />

        {stepsCoords.slice(0, step + 1).map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={i === step ? 5 : 3.5}
            fill={i === step ? "#ef4444" : "#f59e0b"}
            stroke="#ffffff"
            strokeWidth="1.5"
          />
        ))}

        <text x="215" y="108" fill="#a7f3d0" fontSize="8" textAnchor="middle" fontWeight="bold">Global Min</text>
      </svg>
      <div className="mt-2 text-slate-300 text-[11px]">
        {stepsCoords[step].lr}
      </div>
    </div>
  );
};

export const ChloroplastDiagram = () => {
  return (
    <div className="w-full bg-slate-900 rounded-xl p-4 text-white font-mono text-xs shadow-inner">
      <div className="flex justify-between items-center mb-2">
        <span className="text-emerald-400 font-semibold">Chloroplast Dual-Stage Reactor</span>
        <span className="text-slate-400 text-[10px]">Light Rxn → Calvin Cycle</span>
      </div>

      <svg viewBox="0 0 360 160" className="w-full h-auto bg-slate-950/70 rounded-lg border border-emerald-900/40">
        {/* Outer membrane */}
        <rect x="15" y="15" width="330" height="130" rx="40" fill="#064e3b" fillOpacity="0.3" stroke="#059669" strokeWidth="2" />
        <text x="180" y="32" fill="#6ee7b7" fontSize="10" textAnchor="middle" fontWeight="bold">Stroma (Dark Reaction Fluid)</text>

        {/* Thylakoid Grana Stack */}
        <g>
          <rect x="45" y="55" width="85" height="16" rx="6" fill="#10b981" stroke="#34d399" strokeWidth="1.5" />
          <rect x="45" y="75" width="85" height="16" rx="6" fill="#10b981" stroke="#34d399" strokeWidth="1.5" />
          <rect x="45" y="95" width="85" height="16" rx="6" fill="#10b981" stroke="#34d399" strokeWidth="1.5" />
          <text x="87" y="87" fill="#022c22" fontSize="9" textAnchor="middle" fontWeight="bold">Thylakoid Grana</text>
        </g>

        {/* Sun photon in */}
        <path d="M 10,40 L 40,65" stroke="#facc15" strokeWidth="3" markerEnd="url(#arrow)" />
        <text x="25" y="38" fill="#fde047" fontSize="9" fontWeight="bold">Photons</text>

        {/* H2O in -> O2 out */}
        <text x="45" y="128" fill="#67e8f9" fontSize="8">H₂O → O₂ ↑</text>

        {/* Energy Carriers to Calvin */}
        <path d="M 135,70 C 170,55 190,55 220,70" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
        <text x="175" y="60" fill="#fbbf24" fontSize="8" textAnchor="middle">ATP + NADPH</text>

        <path d="M 220,105 C 190,120 170,120 135,105" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="175" y="122" fill="#94a3b8" fontSize="8" textAnchor="middle">ADP + NADP⁺</text>

        {/* Calvin Cycle wheel */}
        <circle cx="265" cy="88" r="32" fill="#0f766e" fillOpacity="0.4" stroke="#14b8a6" strokeWidth="2" strokeDasharray="5 3" />
        <text x="265" y="86" fill="#ccfbf1" fontSize="9" textAnchor="middle" fontWeight="bold">Calvin</text>
        <text x="265" y="98" fill="#ccfbf1" fontSize="9" textAnchor="middle" fontWeight="bold">Cycle</text>

        {/* CO2 in -> Glucose out */}
        <text x="265" y="48" fill="#e2e8f0" fontSize="8" textAnchor="middle">CO₂ In</text>
        <text x="265" y="136" fill="#a7f3d0" fontSize="9" textAnchor="middle" fontWeight="bold">Glucose (C₆H₁₂O₆)</text>
      </svg>
      <div className="mt-2 text-slate-300 text-[11px]">
        Thylakoid captures photon flux to charge ATP/NADPH batteries; Stroma fixes CO₂ into glucose.
      </div>
    </div>
  );
};

export const BlochSphereDiagram = () => {
  const [theta, setTheta] = useState(45);
  const angleRad = (theta * Math.PI) / 180;
  const targetX = 140 + 75 * Math.sin(angleRad);
  const targetY = 80 - 65 * Math.cos(angleRad);

  return (
    <div className="w-full bg-slate-900 rounded-xl p-4 text-white font-mono text-xs shadow-inner">
      <div className="flex justify-between items-center mb-2">
        <span className="text-violet-400 font-semibold">Bloch Sphere Qubit State |ψ⟩</span>
        <span className="text-slate-400 text-[10px]">θ = {theta}°</span>
      </div>

      <svg viewBox="0 0 280 160" className="w-full h-auto bg-slate-950/70 rounded-lg border border-purple-900/40">
        {/* Sphere Wireframe */}
        <circle cx="140" cy="80" r="65" fill="#3b0764" fillOpacity="0.15" stroke="#a855f7" strokeWidth="1.5" />
        <ellipse cx="140" cy="80" rx="65" ry="22" fill="none" stroke="#6b21a8" strokeWidth="1" strokeDasharray="3 3" />

        {/* Z axis */}
        <line x1="140" y1="10" x2="140" y2="150" stroke="#94a3b8" strokeWidth="1" />
        <text x="140" y="8" fill="#e2e8f0" fontSize="10" textAnchor="middle" fontWeight="bold">|0⟩ (North)</text>
        <text x="140" y="158" fill="#e2e8f0" fontSize="10" textAnchor="middle" fontWeight="bold">|1⟩ (South)</text>

        {/* State vector |ψ> */}
        <line x1="140" y1="80" x2={targetX} y2={targetY} stroke="#38bdf8" strokeWidth="3" />
        <circle cx={targetX} cy={targetY} r="4.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
        <text x={targetX + 8} y={targetY - 4} fill="#7dd3fc" fontSize="9" fontWeight="bold">|ψ⟩</text>

        {/* Angle arc */}
        <path d="M 140,55 A 25 25 0 0 1 155,59" fill="none" stroke="#f472b6" strokeWidth="1.5" />
        <text x="150" y="50" fill="#f472b6" fontSize="8">θ</text>
      </svg>

      <div className="mt-3">
        <label className="text-slate-400 block mb-1 text-[11px]">
          Rotate State Vector (|0⟩ Superposition → |1⟩):
        </label>
        <input
          type="range"
          min="0"
          max="180"
          value={theta}
          onChange={(e) => setTheta(parseInt(e.target.value))}
          className="w-full accent-violet-500 h-1 bg-slate-700 rounded cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>Pure |0⟩ (0°)</span>
          <span className="text-cyan-300 font-bold">50/50 Superposition (90°)</span>
          <span>Pure |1⟩ (180°)</span>
        </div>
      </div>
    </div>
  );
};

export const DerivativesDiagram = () => {
  const [pointX, setPointX] = useState(2.0);
  const scale = 25;
  const offsetX = 50;
  const offsetY = 120;

  // f(x) = 0.2 * x^2
  // f'(x) = 0.4 * x
  const x = pointX;
  const y = 0.2 * x * x;
  const slope = 0.4 * x;

  const px = offsetX + x * scale;
  const py = offsetY - y * scale;

  // Tangent line segment
  const dx = 1.8;
  const x1 = x - dx;
  const y1 = y - slope * dx;
  const x2 = x + dx;
  const y2 = y + slope * dx;

  return (
    <div className="w-full bg-slate-900 rounded-xl p-4 text-white font-mono text-xs shadow-inner">
      <div className="flex justify-between items-center mb-2">
        <span className="text-indigo-400 font-semibold">Tangent Slope as Instantaneous Derivative</span>
        <span className="text-cyan-300 font-bold">Slope dy/dx = {slope.toFixed(2)}</span>
      </div>

      <svg viewBox="0 0 280 140" className="w-full h-auto bg-slate-950/70 rounded-lg border border-indigo-900/40">
        {/* Curve f(x) = 0.2*x^2 */}
        <path
          d="M 50,120 Q 150,110 240,30"
          fill="none"
          stroke="#818cf8"
          strokeWidth="3"
        />
        <text x="210" y="24" fill="#a5b4fc" fontSize="9">f(x) = 0.2x²</text>

        {/* Tangent line */}
        <line
          x1={offsetX + x1 * scale}
          y1={offsetY - y1 * scale}
          x2={offsetX + x2 * scale}
          y2={offsetY - y2 * scale}
          stroke="#f43f5e"
          strokeWidth="2.5"
        />

        {/* Tangent touch point */}
        <circle cx={px} cy={py} r="5" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
        <text x={px + 8} y={py - 6} fill="#fda4af" fontSize="9" fontWeight="bold">
          (x={x.toFixed(1)}, slope={slope.toFixed(2)})
        </text>
      </svg>

      <div className="mt-3">
        <label className="text-slate-400 block mb-1 text-[11px]">
          Slide Position Along the Curve:
        </label>
        <input
          type="range"
          min="0.5"
          max="4.0"
          step="0.1"
          value={pointX}
          onChange={(e) => setPointX(parseFloat(e.target.value))}
          className="w-full accent-pink-500 h-1 bg-slate-700 rounded cursor-pointer"
        />
      </div>
    </div>
  );
};

export const VisualDiagramRenderer = ({ type, interactive = true }) => {
  switch (type) {
    case 'neuron':
      return <NeuronDiagram interactive={interactive} />;
    case 'activation':
      return <ActivationDiagram />;
    case 'loss-landscape':
      return <LossLandscapeDiagram />;
    case 'chloroplast':
    case 'calvin-cycle':
    case 'atp-molecule':
    case 'comparison-organelles':
      return <ChloroplastDiagram />;
    case 'bloch-sphere':
    case 'entanglement':
    case 'interference':
    case 'decoherence':
      return <BlochSphereDiagram />;
    case 'secant-tangent':
    case 'power-rule':
    case 'peaks-valleys':
    case 'gradient-vector':
      return <DerivativesDiagram />;
    default:
      return <NeuronDiagram interactive={interactive} />;
  }
};
