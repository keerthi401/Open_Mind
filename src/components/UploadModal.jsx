import React, { useState } from 'react';
import { 
  X, 
  UploadCloud, 
  FileText, 
  Image as ImageIcon, 
  FileCheck, 
  Sparkles, 
  Loader2, 
  CheckCircle2, 
  ArrowRight,
  BookOpen,
  Info
} from 'lucide-react';

export const UploadModal = ({ isOpen, onClose, onUploadComplete }) => {
  const [activeTab, setActiveTab] = useState('pdf'); // 'pdf' | 'image' | 'text'
  const [file, setFile] = useState(null);
  const [textNotes, setTextNotes] = useState('');
  const [topicTitle, setTopicTitle] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    "Reading file & extracting raw document tokens...",
    "Segmenting core concepts & mathematical formulations...",
    "Synthesizing ELI5 analogies & multi-tiered explanations...",
    "Generating interactive visual cards & 5-question practice quiz..."
  ];

  const handleSimulatedUpload = () => {
    if (activeTab === 'text' && !textNotes.trim()) {
      alert("Please paste your educational notes or syllabus text.");
      return;
    }
    if ((activeTab === 'pdf' || activeTab === 'image') && !file && !topicTitle.trim()) {
      setTopicTitle(activeTab === 'pdf' ? "Machine Learning System Architecture.pdf" : "Cellular Signaling Pathway.png");
    }

    setIsProcessing(true);
    setProcessingStep(0);

    // Progressive simulated processing steps
    setTimeout(() => setProcessingStep(1), 700);
    setTimeout(() => setProcessingStep(2), 1500);
    setTimeout(() => setProcessingStep(3), 2200);

    setTimeout(() => {
      setIsProcessing(false);
      const generatedTitle = topicTitle.trim() || (activeTab === 'pdf' ? "Transformer Attention Mechanisms" : activeTab === 'image' ? "Mitochondrial Chemiosmosis Diagram" : "Custom Uploaded Study Unit");

      const newTopic = {
        id: `upload-${Date.now()}`,
        title: generatedTitle,
        tagline: "Custom AI-analyzed educational content from your uploaded material",
        category: "Uploaded Material",
        difficulty: "Customized",
        estimatedTime: "10 mins",
        badgeColor: "blue",
        icon: "BookOpen",
        overview: textNotes.trim() ? textNotes.slice(0, 240) + "..." : "Extracted and structured from uploaded educational resource. All concepts have been distilled into progressive visual explanations, key analogies, and self-test assessments.",
        simplifications: {
          eli5: {
            title: "Everyday Analogy",
            analogy: "Like a smart postal sorting hub where every package gets tagged with an exact delivery address.",
            explanation: "The core mechanism takes incoming raw information, strips out unnecessary noise, and directs attention only to the critical signals that influence the outcome.",
            keyTakeaway: "Break complex inputs into bite-sized tasks and tackle them sequentially."
          },
          highSchool: {
            title: "Structured Fundamentals",
            analogy: "A multi-stage chemical filter where each sieve catches smaller impurities.",
            explanation: "Features are mapped through successive representation layers. By computing comparative distances between features, the system detects primary patterns and verifies consistency.",
            keyTakeaway: "Systematic pattern extraction ensures robust classification."
          },
          collegePro: {
            title: "Rigorous Technical Architecture",
            analogy: "High-dimensional projection onto invariant sub-manifolds.",
            explanation: "Analyzed documents undergo tokenization, embedding generation, and attention scoring via dot-product affinities. Gradients are computed with respect to structural parameters to achieve minimal reconstruction error.",
            keyTakeaway: "Optimal latent representations maximize mutual information while minimizing transmission entropy."
          }
        },
        visualSteps: [
          {
            step: 1,
            title: "Ingestion & Tokenization",
            description: "The source document text, diagrams, and equations are parsed into high-dimensional semantic chunks.",
            formula: "Token_i = Embed(x_i) + Pos_i",
            tip: "Semantic chunking preserves conceptual boundaries rather than arbitrary line cuts."
          },
          {
            step: 2,
            title: "Concept Distillation",
            description: "Core themes and prerequisite relationships are mapped into a knowledge dependency graph.",
            formula: "G = (V, E) where E = Prerequisites",
            tip: "Highlights bottlenecks where students typically experience cognitive overload."
          },
          {
            step: 3,
            title: "Analogy Synthesis",
            description: "High-level abstractions are mapped onto concrete physical intuition (ELI5 mode).",
            formula: "Abstract Concept ↔ Physical Metaphor",
            tip: "Analogies bridge unfamiliar abstractions with familiar experiential memory."
          },
          {
            step: 4,
            title: "Assessment Calibration",
            description: "Generates targeted diagnostic questions targeting common misconceptions.",
            formula: "Diagnostic Coverage = 100%",
            tip: "Testing within 20 minutes boosts 14-day memory retention by 68%."
          }
        ],
        visualCards: [
          {
            id: `card-u1`,
            frontTitle: "Core Mechanism Architecture",
            frontSubtitle: "Synthesized from your uploaded document",
            diagramType: "neuron",
            backTitle: "Internal Operations",
            backContent: "Your document focuses heavily on how inputs transition through intermediate states before final realization.",
            analogy: "Like a conveyor belt with specialized inspection stations along the line.",
            keyMetric: "Document Ingestion Fidelity: 99.4%"
          },
          {
            id: `card-u2`,
            frontTitle: "Key Quantitative Formulation",
            frontSubtitle: "Mathematical balance equation",
            diagramType: "secant-tangent",
            backTitle: "Rate of Change & Sensitivity",
            backContent: "The key variables in this chapter exhibit proportional sensitivity under dynamic boundary conditions.",
            analogy: "Like feeling the stiffness of a guitar string as tension increases.",
            keyMetric: "Sensitivity Index: ΔY / ΔX"
          }
        ],
        quiz: [
          {
            id: "qu1",
            question: `What is the central concept emphasized in "${generatedTitle}"?`,
            options: [
              "Passive memorization of unstructured notes",
              "Breaking complex systems into modular visual interactions and feedback loops",
              "Ignoring the mathematical foundation entirely",
              "Storing documents without semantic analysis"
            ],
            correctIndex: 1,
            hint: "Consider how OptiMind AI transforms raw inputs into intuitive representations.",
            explanation: "The uploaded material emphasizes breaking down intricate topics into structured conceptual components and validating mastery through active recall."
          },
          {
            id: "qu2",
            question: "How does the ELI5 analogy improve retention according to cognitive learning science?",
            options: [
              "It replaces technical rigor permanently",
              "It anchors abstract ideas to existing cognitive schema in long-term memory",
              "It only works for elementary school students",
              "It doubles reading speed without comprehension"
            ],
            correctIndex: 1,
            hint: "Think about neural scaffolding and familiar real-world experiences.",
            explanation: "Analogies ground novel, abstract principles within already reinforced mental schemas, significantly decreasing initial cognitive load."
          }
        ]
      };

      onUploadComplete(newTopic);
      onClose();
    }, 2900);
  };

  const loadSampleNotes = () => {
    setTopicTitle("Transformer Architecture & Attention");
    setTextNotes(`Transformers rely entirely on self-attention mechanisms without recurrent sequential loops. 
Query, Key, and Value vectors are computed via learned projection matrices W_Q, W_K, W_V. 
Attention is computed as: Attention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V.
This allows arbitrary tokens across long sentences to communicate in parallel with O(1) sequential operation length.`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <h2 className="text-lg font-bold">Upload Educational Content</h2>
            </div>
            <p className="text-xs text-blue-100 mt-1">
              Convert PDFs, lecture slides, diagrams, or raw notes into interactive visual cards & quizzes.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-100 px-6 pt-4 gap-3 bg-slate-50/50">
          <button
            onClick={() => setActiveTab('pdf')}
            className={`flex items-center gap-2 pb-3 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'pdf'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            PDF Document
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={`flex items-center gap-2 pb-3 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'image'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Diagram / Image
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={`flex items-center gap-2 pb-3 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'text'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Paste Text / Notes
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          {/* Optional Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Topic or Chapter Title <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Transformer Architecture & Attention"
              value={topicTitle}
              onChange={(e) => setTopicTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {activeTab === 'pdf' && (
            <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-6 text-center bg-slate-50/70 hover:bg-blue-50/30 transition-all cursor-pointer group">
              <input
                type="file"
                accept=".pdf"
                id="pdf-upload"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFile(e.target.files[0]);
                    if (!topicTitle) setTopicTitle(e.target.files[0].name.replace('.pdf', ''));
                  }
                }}
              />
              <label htmlFor="pdf-upload" className="cursor-pointer">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-slate-700">
                  {file ? file.name : "Click to select or drag & drop PDF"}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Supports lecture slides, textbook chapters, or research papers (up to 50MB)
                </p>
                {file && (
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-semibold">
                    <FileCheck className="w-3.5 h-3.5" /> Ready for AI processing
                  </div>
                )}
              </label>
            </div>
          )}

          {activeTab === 'image' && (
            <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-6 text-center bg-slate-50/70 hover:bg-blue-50/30 transition-all cursor-pointer group">
              <input
                type="file"
                accept="image/*"
                id="img-upload"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFile(e.target.files[0]);
                    if (!topicTitle) setTopicTitle(e.target.files[0].name.replace(/\.[^/.]+$/, ''));
                  }
                }}
              />
              <label htmlFor="img-upload" className="cursor-pointer">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-slate-700">
                  {file ? file.name : "Upload whiteboard photo, schematic, or diagram"}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  PNG, JPG, SVG, WebP with diagrams, flowcharts, or equations
                </p>
                {file && (
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-semibold">
                    <FileCheck className="w-3.5 h-3.5" /> Diagram ready for OCR & Vision AI
                  </div>
                )}
              </label>
            </div>
          )}

          {activeTab === 'text' && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-700">Lecture Notes / Syllabus</label>
                <button
                  type="button"
                  onClick={loadSampleNotes}
                  className="text-[11px] text-blue-600 font-semibold hover:underline"
                >
                  Load Sample AI Notes
                </button>
              </div>
              <textarea
                rows={5}
                placeholder="Paste chapter excerpts, professor notes, mathematical theorems, or formula summaries..."
                value={textNotes}
                onChange={(e) => setTextNotes(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          )}

          {/* Processing Indicator */}
          {isProcessing && (
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-800">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                <span>OptiMind Processing Pipeline Active</span>
              </div>
              <div className="space-y-1.5">
                {steps.map((text, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[11px]">
                    {idx < processingStep ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    ) : idx === processingStep ? (
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-600 border-t-transparent animate-spin shrink-0" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />
                    )}
                    <span className={idx <= processingStep ? "text-slate-800 font-medium" : "text-slate-400"}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer note */}
          <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 text-[11px] text-slate-500">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <span>
              OptiMind AI extracts conceptual nodes, builds ELI5 and technical explanations, and crafts interactive visual cards for your personalized learning studio.
            </span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSimulatedUpload}
            disabled={isProcessing}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 disabled:opacity-50 transition-all active:scale-[0.98]"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing Document...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Visual Learning Unit
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
