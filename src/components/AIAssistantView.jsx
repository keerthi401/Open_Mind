import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  Lightbulb, 
  BookOpen, 
  HelpCircle, 
  Key, 
  RotateCcw, 
  Copy, 
  Check, 
  Compass,
  ArrowRight
} from 'lucide-react';

export const AIAssistantView = ({ 
  apiMode, 
  apiKey, 
  onOpenSettings, 
  currentTopic,
  initialQuery 
}) => {
  const [messages, setMessages] = useState([
    {
      id: "m-1",
      sender: "ai",
      time: "Just now",
      content: `Hello! I'm your **OptiMind AI Visual Learning Assistant**. 

I specialize in translating dense textbooks, formulas, and diagrams into **intuitive mental models**, real-world analogies, and step-by-step visual breakdowns.

Ask me anything about your current study material or try one of the prompt suggestions below!`,
      analogy: "Think of me as a personalized Socratic tutor who draws on the whiteboard as we speak.",
      suggestions: [
        "Explain backpropagation using a sports analogy",
        "Why does a qubit collapse upon measurement?",
        "How does ATP Synthase work like a water turbine?",
        "What's the intuitive connection between derivatives and gradient descent?"
      ]
    }
  ]);

  const [input, setInput] = useState(initialQuery || '');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (initialQuery) {
      handleSend(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const generatePedagogicalResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes("backprop") || q.includes("neural") || q.includes("weight") || q.includes("gradient descent")) {
      return {
        content: `### 🧠 Understanding Neural Backpropagation Visually

Backpropagation is essentially **multivariate blame assignment** via the calculus chain rule.

#### 1. The Forward Pass (Prediction)
1. Inputs enter the network ($x_1, x_2, \dots$).
2. Synapses multiply inputs by weights ($w \cdot x + b$).
3. The neuron fires through an activation function ($\sigma(z)$).
4. The final prediction is compared against reality via the **Loss Function**:
   $$L = \\frac{1}{2}(y_{\\text{pred}} - y_{\\text{true}})^2$$

#### 2. The Backward Pass (Error Gradient)
Instead of guessing which weight caused a bad prediction, the algorithm walks backward from the output layer to the input layer using the **Chain Rule**:
$$\\frac{\\partial L}{\\partial w_i} = \\frac{\\partial L}{\\partial y} \\cdot \\frac{\\partial y}{\\partial z} \\cdot \\frac{\\partial z}{\\partial w_i}$$

Every neuron computes: *"How much did my specific weight contribute to the final error?"* Then, weights take a step downhill:
$$W_{\\text{new}} = W_{\\text{old}} - \\eta \\nabla L$$`,
        analogy: "Like a basketball team reviewing game film: the coach traces a missed shot back through the shooter's release, the pass, and the screen, coaching each player on their specific 5% adjustment.",
        suggestions: [
          "Why do we need non-linear activations like ReLU?",
          "What is the vanishing gradient problem in deep networks?",
          "Show me Python code for a simple single-neuron update"
        ]
      };
    } else if (q.includes("qubit") || q.includes("quantum") || q.includes("bloch") || q.includes("superposition")) {
      return {
        content: `### ⚛️ Quantum Superposition & Measurement Collapse

In classical computing, a bit is a light switch: strictly **0** (off) or **1** (on). In quantum computing, a **qubit** is a continuous sphere of probabilities.

#### 1. The Bloch Sphere Coordinates
A pure single qubit state is represented mathematically as:
$$|\\psi\\rangle = \\alpha |0\\rangle + \\beta |1\\rangle$$
Where $\\alpha$ and $\\beta$ are complex probability amplitudes such that:
$$|\\alpha|^2 + |\\beta|^2 = 1$$

#### 2. Why Does Superposition Collapse?
Before measurement, the qubit evolves deterministically under **unitary transformations** ($U^{\\dagger}U = I$). But the moment an observer or macroscopic environment interacts with it, the state vector collapses probabilistically to either $|0\\rangle$ (with probability $|\\alpha|^2$) or $|1\\rangle$ (with probability $|\\beta|^2$).`,
        analogy: "A spinning coin on a table is neither heads nor tails while in motion—it occupies a dynamic blur of both. Slapping your hand on the coin forces it into a single deterministic reality.",
        suggestions: [
          "What makes quantum entanglement 'spooky'?",
          "How does a Hadamard gate create superposition?",
          "Can quantum computers break all encryption?"
        ]
      };
    } else if (q.includes("atp") || q.includes("photosynthesis") || q.includes("respiration") || q.includes("plant") || q.includes("chloroplast")) {
      return {
        content: `### 🌿 Photosynthesis: The Planetary Solar Battery

Photosynthesis converts solar electromagnetic photons into the chemical bond energy of carbohydrates.

#### 1. Light Reactions (Thylakoid Membrane)
- Photons strike Photosystem II, exciting chlorophyll electrons.
- Water is split to replenish electrons:
  $$2\\text{H}_2\\text{O} + 4\\text{ photons} \\rightarrow \\text{O}_2 + 4\\text{H}^+ + 4e^-$$
- High-energy electrons flow down the electron transport chain, pumping protons into the thylakoid lumen.

#### 2. ATP Synthase: The Molecular Rotary Motor
The high concentration of protons flows back out through **ATP Synthase**. This mechanical rotation attaches an inorganic phosphate ($P_i$) to ADP, manufacturing high-energy **ATP**.

#### 3. Calvin Cycle (Stroma)
The enzyme **RuBisCO** fixes atmospheric $\\text{CO}_2$ using the chemical energy stored in ATP and NADPH to synthesize glucose.`,
        analogy: "Like a hydroelectric dam: sunlight pumps water (protons) uphill into a reservoir; as the water rushes down through turbines (ATP Synthase), it generates electricity (ATP) to bake bread in the factory (Calvin Cycle).",
        suggestions: [
          "Why is RuBisCO called the most abundant enzyme on Earth?",
          "How does cellular respiration reverse this process?",
          "Explain chemiosmosis and proton-motive force"
        ]
      };
    } else if (q.includes("derivative") || q.includes("calculus") || q.includes("slope") || q.includes("tangent")) {
      return {
        content: `### 📈 Derivatives: The Science of 'Right Now'

Calculus is not about static numbers—it is the language of continuous motion and instantaneous change.

#### 1. The Secant-to-Tangent Limit
An average rate of change between two points $(x, f(x))$ and $(x+h, f(x+h))$ is:
$$\\text{Average Slope} = \\frac{f(x+h) - f(x)}{h}$$

As the time gap $h$ shrinks infinitely close to zero, the secant line morphs into the **Tangent Line**:
$$f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$$

#### 2. Optimization Connection
In Machine Learning, we want to find the lowest point on the error curve. At the minimum of any smooth function, the tangent line is completely flat:
$$f'(x^*) = 0$$`,
        analogy: "If you take 2 hours to drive 100 miles, your average speed is 50 mph. But if you glance at the speedometer at mile 42, it might say 68 mph. That instantaneous 68 mph is the derivative.",
        suggestions: [
          "How does the power rule d/dx(x^n) work geometrically?",
          "What is the difference between derivative and gradient?",
          "Show how critical points determine maximums and minimums"
        ]
      };
    } else {
      return {
        content: `### 💡 Concept Breakdown: "${query}"

Here is how OptiMind AI decomposes this topic into core intuitive components:

1. **Foundational Principle**: Every complex idea is built from atomic relationships. Identify the input, the transformational mechanism, and the output observable state.
2. **Key Structural Dynamic**: Notice how equilibrium is preserved when variables shift. Systems tend toward lowest potential energy or highest informational fidelity.
3. **Common Trap**: Don't confuse the mathematical notation for the underlying physical or logical behavior. Always anchor yourself to the visual model first.`,
        analogy: "Like learning to ride a bicycle: reading physics equations about angular momentum helps less than feeling the balance point with your own senses.",
        suggestions: [
          "Can you explain this with a real-world analogy?",
          "Show me step-by-step visual milestones for this",
          "Generate 3 practice quiz questions on this"
        ]
      };
    }
  };

  const handleSend = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: "user",
      time: "Just now",
      content: query
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    if (apiMode === 'live' && apiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `You are OptiMind AI, an elite visual tutor for university students. 
Explain this concept with great clarity, simple real-world analogies, step-by-step explanations, and key takeaways.
Student Question: "${query}"`
                }]
              }]
            })
          }
        );

        if (!response.ok) {
          throw new Error(`API returned status ${response.status}`);
        }

        const data = await response.json();
        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Unable to extract response from Gemini API.";

        const aiMsg = {
          id: `ai-${Date.now()}`,
          sender: "ai",
          time: "Just now",
          content: aiText,
          analogy: "Generated via live Google Gemini 1.5 Flash connection.",
          suggestions: [
            "Break this down further",
            "Give me a visual diagram description",
            "Create a quick quiz on this"
          ]
        };
        setMessages((prev) => [...prev, aiMsg]);
      } catch (err) {
        // Graceful fallback to demo engine
        const fallback = generatePedagogicalResponse(query);
        const aiMsg = {
          id: `ai-${Date.now()}`,
          sender: "ai",
          time: "Just now",
          content: `${fallback.content}\n\n*(Note: Live API encountered a network issue; served instantly via OptiMind Demo Engine)*`,
          analogy: fallback.analogy,
          suggestions: fallback.suggestions
        };
        setMessages((prev) => [...prev, aiMsg]);
      } finally {
        setIsLoading(false);
      }
    } else {
      // OptiMind Simulated Demo Engine
      setTimeout(() => {
        const res = generatePedagogicalResponse(query);
        const aiMsg = {
          id: `ai-${Date.now()}`,
          sender: "ai",
          time: "Just now",
          content: res.content,
          analogy: res.analogy,
          suggestions: res.suggestions
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsLoading(false);
      }, 750);
    }
  };

  return (
    <div className="h-[calc(100vh-130px)] flex flex-col bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden animate-in fade-in duration-200">
      {/* Top Assistant Header */}
      <div className="p-4 px-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Bot className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">OptiMind Learning Assistant</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                {apiMode === 'live' ? 'Live Gemini 1.5' : 'Pedagogical Engine (Demo)'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Visual Socratic tutoring • Analogies • Formula walkthroughs
            </p>
          </div>
        </div>

        <button
          onClick={onOpenSettings}
          className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 bg-white border border-slate-200 hover:border-blue-300 px-3 py-1.5 rounded-xl font-medium shadow-sm transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Engine Settings</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.map((msg) => {
          const isAi = msg.sender === 'ai';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 sm:gap-4 ${isAi ? 'justify-start' : 'justify-end'}`}
            >
              {isAi && (
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-2xl space-y-3 ${isAi ? 'text-slate-800' : 'text-white'}`}>
                <div
                  className={`p-4 sm:p-5 rounded-3xl text-xs sm:text-sm leading-relaxed ${
                    isAi
                      ? 'bg-slate-50 border border-slate-200/90 shadow-sm'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-500/20'
                  }`}
                >
                  <div className="prose prose-xs sm:prose-sm max-w-none whitespace-pre-line">
                    {msg.content}
                  </div>

                  {/* Analogy Highlight Card */}
                  {msg.analogy && (
                    <div className="mt-3.5 p-3 rounded-2xl bg-amber-50/90 border border-amber-200/80 text-amber-950 flex items-start gap-2 text-xs">
                      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block text-[11px] uppercase tracking-wider text-amber-800">
                          Mental Model / Analogy:
                        </span>
                        <p className="mt-0.5 italic text-amber-900 leading-relaxed">
                          "{msg.analogy}"
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Message footer */}
                  {isAi && (
                    <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-400">
                      <span>OptiMind Pedagogical Visualizer</span>
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="flex items-center gap-1 hover:text-slate-700"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> Copy
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Follow-up Suggestions Chips */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="space-y-1.5 pl-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Follow-up Questions:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestions.map((sug, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(sug)}
                          className="text-left text-xs bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 py-1.5 px-3 rounded-xl transition-all shadow-2xs"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {!isAi && (
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm font-bold text-xs">
                  AR
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 items-center text-slate-400 text-xs">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-100 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce delay-100" />
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce delay-200" />
              <span className="text-slate-600 text-[11px] font-medium ml-1">
                OptiMind is crafting your visual explanation...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box Area */}
      <div className="p-4 bg-slate-50 border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex items-center gap-2 max-w-4xl mx-auto"
        >
          <input
            type="text"
            placeholder="Ask a question or type a concept (e.g. 'Explain the chain rule in backprop', 'Why does H2O split?')..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm"
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white shadow-md shadow-blue-500/20 transition-all active:scale-95"
            aria-label="Send query"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
