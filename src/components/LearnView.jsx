import React, { useState } from 'react';
import { 
  Sparkles, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  HelpCircle, 
  Bot, 
  Lightbulb, 
  BookOpen, 
  Layers, 
  Zap, 
  CheckCircle2, 
  GraduationCap, 
  Volume2, 
  VolumeX,
  Share2,
  Bookmark,
  BookmarkCheck,
  Eye,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { VisualDiagramRenderer } from './VisualDiagrams';

export const LearnView = ({ 
  currentTopic, 
  allTopics, 
  onSelectTopic, 
  onStartQuiz, 
  onAskAI 
}) => {
  const [level, setLevel] = useState('eli5'); // 'eli5' | 'highSchool' | 'collegePro'
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showTopicDropdown, setShowTopicDropdown] = useState(false);

  const topic = currentTopic || allTopics[0];
  const simplification = topic.simplifications?.[level] || topic.simplifications?.eli5;
  const currentStep = topic.visualSteps?.[activeStepIndex] || topic.visualSteps?.[0];
  const currentCard = topic.visualCards?.[activeCardIndex] || topic.visualCards?.[0];

  const handleSpeechToggle = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const textToRead = `${simplification.title}. ${simplification.explanation}. ${simplification.analogy}`;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = 1.0;
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }
    } else {
      alert("Text-to-speech narration is simulated or not supported in this browser.");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Header Bar: Topic Switcher, Metadata, Level Selector */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          {/* Topic Switcher Dropdown */}
          <div className="relative inline-block">
            <button
              onClick={() => setShowTopicDropdown(!showTopicDropdown)}
              className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 transition-colors"
            >
              <span>Current Topic: <strong className="text-blue-700">{topic.title}</strong></span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {showTopicDropdown && (
              <div className="absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50">
                <div className="text-[10px] uppercase font-bold text-slate-400 px-3 py-1">
                  Select Visual Learning Unit
                </div>
                {allTopics.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      onSelectTopic(t);
                      setActiveStepIndex(0);
                      setActiveCardIndex(0);
                      setIsFlipped(false);
                      setShowTopicDropdown(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                      t.id === topic.id ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>{t.title}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                      {t.category}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {topic.title}
          </h1>
          <p className="text-xs text-blue-700 font-medium max-w-xl">
            {topic.tagline}
          </p>
        </div>

        {/* Level Selector Pills */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            Simplification Level:
          </div>

          <div className="p-1 rounded-2xl bg-slate-100 flex items-center gap-1 border border-slate-200/60 shadow-inner">
            <button
              onClick={() => setLevel('eli5')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                level === 'eli5'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ELI5 (Analogy)
            </button>
            <button
              onClick={() => setLevel('highSchool')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                level === 'highSchool'
                  ? 'bg-white text-purple-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              High School
            </button>
            <button
              onClick={() => setLevel('collegePro')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                level === 'collegePro'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              College Pro
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSpeechToggle}
              className={`p-2.5 rounded-xl border transition-all ${
                isSpeaking 
                  ? 'bg-blue-600 text-white border-blue-600 animate-pulse' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border-slate-200'
              }`}
              title={isSpeaking ? "Pause Narration" : "Listen to Explanation"}
            >
              {isSpeaking ? <Volume2 className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition-colors"
              title="Bookmark Topic"
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-4 h-4 text-blue-600 fill-blue-600" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Simplification & Analogy Card */}
      <section className="bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-purple-50/80 rounded-3xl border border-blue-200/80 p-6 sm:p-7 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-800">
            <Lightbulb className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>
              {level === 'eli5' && "Intuitive Real-World Analogy Mode"}
              {level === 'highSchool' && "Structured Core Principles Mode"}
              {level === 'collegePro' && "Rigorous Mathematical Architecture Mode"}
            </span>
          </div>

          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-blue-200/70 text-blue-900 font-bold">
            {level === 'eli5' ? 'Simplicity Score: 10/10' : level === 'highSchool' ? 'Balance Score: 9/10' : 'Technical Depth: 10/10'}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900">
          {simplification.title}
        </h3>

        <div className="p-4 rounded-2xl bg-white/90 border border-blue-100 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block mb-1">
            Core Intuition / Analogy
          </span>
          <p className="text-xs sm:text-sm text-slate-800 italic leading-relaxed">
            "{simplification.analogy}"
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {simplification.explanation}
          </p>
          <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-emerald-800 bg-emerald-50/80 p-3 rounded-xl border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Key Takeaway: {simplification.keyTakeaway}</span>
          </div>
        </div>
      </section>

      {/* Two Column Interactive Studio: Visual Cards (Left) & Step-by-Step Interactive Flow (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* COLUMN 1: Visual Learning Cards (3D Interactive Flashcards) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-slate-900">Visual Learning Cards</h2>
            </div>
            <span className="text-xs text-slate-500 font-semibold">
              Card {activeCardIndex + 1} of {topic.visualCards?.length || 1}
            </span>
          </div>

          {/* 3D Flip Card Container */}
          <div className="perspective-1000 w-full min-h-[380px]">
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className={`relative w-full h-full min-h-[380px] rounded-3xl transition-transform duration-500 transform-style-preserve-3d cursor-pointer shadow-lg hover:shadow-xl ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* CARD FRONT */}
              <div className="absolute inset-0 backface-hidden bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span className="font-bold uppercase tracking-wider text-blue-600 text-[10px]">
                      Interactive Visual Card
                    </span>
                    <span className="text-[11px] flex items-center gap-1 text-slate-500">
                      <RotateCw className="w-3.5 h-3.5 text-blue-500" /> Click anywhere to flip
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    {currentCard.frontTitle}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {currentCard.frontSubtitle}
                  </p>
                </div>

                {/* Diagram embedded inside card */}
                <div className="my-3 py-2 bg-slate-900 rounded-2xl overflow-hidden shadow-inner">
                  <VisualDiagramRenderer type={currentCard.diagramType} interactive={true} />
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-600">
                    Metric: <strong className="text-blue-700">{currentCard.keyMetric}</strong>
                  </span>
                  <span className="text-blue-600 font-bold flex items-center gap-1 text-[11px]">
                    Flip for details <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* CARD BACK */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 flex flex-col justify-between border border-indigo-900/60 overflow-y-auto">
                <div>
                  <div className="flex items-center justify-between text-xs text-indigo-300 mb-3">
                    <span className="font-bold uppercase tracking-wider text-[10px]">
                      Deep Dive Concept Breakdown
                    </span>
                    <span className="text-[11px] flex items-center gap-1 text-slate-400">
                      <RotateCw className="w-3.5 h-3.5 text-indigo-400" /> Click to flip back
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {currentCard.backTitle}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {currentCard.backContent}
                  </p>

                  <div className="mt-4 p-3.5 rounded-2xl bg-indigo-900/40 border border-indigo-700/40 text-xs">
                    <span className="text-amber-400 font-bold block mb-1">
                      💡 Mental Model & Analogy:
                    </span>
                    <p className="text-indigo-100 text-[11px] leading-relaxed italic">
                      "{currentCard.analogy}"
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-indigo-800/60 flex items-center justify-between text-[11px]">
                  <span className="text-indigo-300 font-mono">
                    {currentCard.keyMetric}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAskAI(`Can you give me a deeper explanation of "${currentCard.frontTitle}" with practical code or examples?`);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors"
                  >
                    <Bot className="w-3.5 h-3.5" /> Ask Assistant
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card Carousel Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setActiveCardIndex((prev) => (prev > 0 ? prev - 1 : (topic.visualCards?.length || 1) - 1));
                setIsFlipped(false);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" /> Previous Card
            </button>

            <div className="flex gap-1.5">
              {topic.visualCards?.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveCardIndex(idx);
                    setIsFlipped(false);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeCardIndex === idx ? 'bg-blue-600 w-6' : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => {
                setActiveCardIndex((prev) => (prev < (topic.visualCards?.length || 1) - 1 ? prev + 1 : 0));
                setIsFlipped(false);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors shadow-sm"
            >
              Next Card <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* COLUMN 2: Step-by-Step Visual Explanation Flow */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-600" />
              <h2 className="text-base font-bold text-slate-900">Step-by-Step Walkthrough</h2>
            </div>
            <span className="text-xs text-purple-700 font-bold bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
              Step {activeStepIndex + 1} of {topic.visualSteps?.length || 1}
            </span>
          </div>

          {/* Stepper Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5">
            {/* Step Progress indicators */}
            <div className="flex items-center gap-2">
              {topic.visualSteps?.map((s, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`flex-1 h-2 rounded-full cursor-pointer transition-all ${
                    idx === activeStepIndex
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                      : idx < activeStepIndex
                      ? 'bg-blue-400'
                      : 'bg-slate-100'
                  }`}
                  title={`Step ${idx + 1}: ${s.title}`}
                />
              ))}
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">
                Phase {currentStep.step} / {topic.visualSteps?.length}
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                {currentStep.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {currentStep.description}
              </p>
            </div>

            {/* Formula & Rule Box */}
            {currentStep.formula && (
              <div className="p-3.5 rounded-2xl bg-slate-900 text-white font-mono text-xs flex items-center justify-between border border-slate-800">
                <span className="text-slate-400 text-[10px]">Formula:</span>
                <span className="text-cyan-300 font-bold">{currentStep.formula}</span>
              </div>
            )}

            {/* Pro Tip note */}
            {currentStep.tip && (
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Mental Shortcut:</span>
                  <p className="mt-0.5 text-amber-800 leading-relaxed text-[11px]">{currentStep.tip}</p>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                disabled={activeStepIndex === 0}
                onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors"
              >
                Previous Step
              </button>

              <button
                disabled={activeStepIndex === (topic.visualSteps?.length || 1) - 1}
                onClick={() => setActiveStepIndex((prev) => Math.min((topic.visualSteps?.length || 1) - 1, prev + 1))}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-md shadow-purple-500/20 disabled:opacity-40 transition-all active:scale-[0.98]"
              >
                Next Step <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Action CTAs: Quiz & AI Assistant */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => onStartQuiz(topic)}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all active:scale-[0.98]"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Test Knowledge (Quiz)</span>
            </button>

            <button
              onClick={() => onAskAI(`Explain step ${activeStepIndex + 1} of ${topic.title} in greater depth.`)}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-xs shadow-sm transition-all active:scale-[0.98]"
            >
              <Bot className="w-4 h-4 text-blue-600" />
              <span>Ask AI Tutor</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
