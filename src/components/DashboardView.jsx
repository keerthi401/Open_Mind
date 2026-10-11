import React, { useState } from 'react';
import { 
  Sparkles, 
  UploadCloud, 
  BookOpen, 
  HelpCircle, 
  Milestone, 
  Flame, 
  TrendingUp, 
  ArrowRight, 
  BrainCircuit, 
  Atom, 
  Leaf, 
  CheckCircle2, 
  Clock, 
  Award,
  Zap,
  Layers,
  ChevronRight,
  Search
} from 'lucide-react';
import { VisualDiagramRenderer } from './VisualDiagrams';

export const DashboardView = ({ 
  userStats, 
  topics, 
  onSelectTopic, 
  onNavigateTab, 
  onOpenUpload 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Computer Science', 'Physics & Computing', 'Biology', 'Mathematics'];

  const filteredTopics = selectedCategory === 'All'
    ? topics
    : topics.filter(t => t.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const getTopicIcon = (iconName) => {
    switch (iconName) {
      case 'BrainCircuit':
        return <BrainCircuit className="w-5 h-5 text-blue-600" />;
      case 'Atom':
        return <Atom className="w-5 h-5 text-purple-600" />;
      case 'Leaf':
        return <Leaf className="w-5 h-5 text-emerald-600" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-indigo-600" />;
      default:
        return <BookOpen className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Hero Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 text-white p-6 sm:p-8 lg:p-10 shadow-xl shadow-blue-900/10">
        <div className="absolute -right-12 -bottom-12 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute right-20 top-6 w-40 h-40 rounded-full bg-purple-500/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-blue-100 text-xs font-semibold border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>OptiMind AI Platform • Visual Pedagogical Engine</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
            Welcome back, {userStats.name.split(' ')[0]}!
            <br />
            <span className="bg-gradient-to-r from-blue-200 via-white to-purple-200 bg-clip-text text-transparent">
              "See It, Understand It, Master It."
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed max-w-2xl">
            Transform heavy textbooks and lecture notes into interactive visual cards, multi-tier analogies (ELI5), and auto-generated diagnostic quizzes. Where would you like to dive in today?
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onSelectTopic(topics[0])}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-blue-800 font-bold text-xs shadow-md hover:bg-blue-50 transition-all active:scale-[0.98]"
            >
              <Zap className="w-4 h-4 text-blue-600" />
              Resume Neural Networks
              <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
            </button>

            <button
              onClick={onOpenUpload}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 text-white font-medium text-xs backdrop-blur-md transition-all active:scale-[0.98]"
            >
              <UploadCloud className="w-4 h-4" />
              Upload New Content (PDF / Image / Text)
            </button>
          </div>
        </div>
      </section>

      {/* Progress Statistics Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Cards Mastered */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Visual Cards</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {userStats.visualCardsMastered}
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <span className="font-bold">+18</span> this week
          </p>
        </div>

        {/* Stat 2: Average Quiz Accuracy */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Quiz Accuracy</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {userStats.quizAccuracyAvg}%
          </div>
          <p className="text-[11px] text-purple-600 font-medium mt-1">
            Top 5% among students
          </p>
        </div>

        {/* Stat 3: Study Streak */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Study Streak</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Flame className="w-4 h-4 fill-amber-500" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight flex items-baseline gap-1">
            {userStats.currentStreakDays} <span className="text-xs font-semibold text-slate-500">Days</span>
          </div>
          <p className="text-[11px] text-amber-600 font-medium mt-1">
            Personal best streak! 🔥
          </p>
        </div>

        {/* Stat 4: Hours Logged */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Total Hours</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight flex items-baseline gap-1">
            {userStats.totalHoursStudied} <span className="text-xs font-semibold text-slate-500">hrs</span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            Weekly Goal: 78% achieved
          </p>
        </div>
      </section>

      {/* Upload Dropzone Hero Card */}
      <section className="bg-gradient-to-r from-blue-50/70 via-indigo-50/70 to-purple-50/70 border border-blue-200/60 rounded-3xl p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100/80 text-blue-700 text-[11px] font-bold">
            <UploadCloud className="w-3.5 h-3.5" />
            Instant AI Synthesizer
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Have your own course syllabus, lecture slides, or diagrams?
          </h2>
          <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
            Upload any PDF or photo. OptiMind AI extracts foundational concepts, writes multi-tiered simplifications (ELI5 through College Pro), and renders custom visual flashcards in seconds.
          </p>
        </div>
        <button
          onClick={onOpenUpload}
          className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all active:scale-[0.98]"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload File or Notes</span>
        </button>
      </section>

      {/* Recommended Visual Topics Section */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Recommended Visual Learning Units
            </h2>
            <p className="text-xs text-slate-500">
              Interactive models with multi-level explanations, interactive formulas, and quizzes.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTopics.map((topic) => (
            <div
              key={topic.id}
              className="bg-white rounded-2xl border border-slate-200/80 hover:border-blue-300 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden group"
            >
              {/* Card visual preview banner */}
              <div className="h-32 bg-slate-900 p-3 relative overflow-hidden flex items-center justify-center">
                <div className="w-full scale-90 opacity-90 group-hover:scale-95 group-hover:opacity-100 transition-all pointer-events-none">
                  <VisualDiagramRenderer type={topic.visualCards[0]?.diagramType || 'neuron'} interactive={false} />
                </div>
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-bold text-white border border-slate-700">
                  {topic.category}
                </div>
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-blue-500/80 backdrop-blur-md text-[10px] font-semibold text-white">
                  {topic.difficulty}
                </div>
              </div>

              {/* Card content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-start gap-2.5">
                    <div className="p-2 rounded-xl bg-slate-100 group-hover:bg-blue-50 transition-colors shrink-0">
                      {getTopicIcon(topic.icon)}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                        {topic.title}
                      </h3>
                      <p className="text-[11px] text-blue-600 font-medium line-clamp-1 mt-0.5">
                        {topic.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                    {topic.overview}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {topic.estimatedTime}
                  </span>

                  <button
                    onClick={() => onSelectTopic(topic)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-semibold text-xs transition-all"
                  >
                    <span>Visualize</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Two Column Section: Recent Activities & Subject Mastery */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Recent Activities (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              Recent Learning Activities
            </h3>
            <button
              onClick={() => onNavigateTab('progress')}
              className="text-xs text-blue-600 hover:underline font-semibold"
            >
              View Full History
            </button>
          </div>

          <div className="space-y-3">
            {userStats.recentActivities.map((act) => (
              <div
                key={act.id}
                className="p-3.5 rounded-2xl bg-slate-50/80 hover:bg-blue-50/50 border border-slate-100 transition-all flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white shadow-sm border border-slate-200/70 flex items-center justify-center shrink-0">
                    {act.type === 'quiz' && <HelpCircle className="w-4 h-4 text-purple-600" />}
                    {act.type === 'visual' && <BookOpen className="w-4 h-4 text-blue-600" />}
                    {act.type === 'roadmap' && <Milestone className="w-4 h-4 text-emerald-600" />}
                    {act.type === 'upload' && <UploadCloud className="w-4 h-4 text-indigo-600" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{act.title}</h4>
                    <p className="text-[11px] text-slate-500">{act.topic}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-slate-700 px-2 py-0.5 rounded-md bg-white border border-slate-200">
                    {act.score}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-0.5">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Subject Mastery Progress (1 col) */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              Subject Mastery
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
              Avg 89%
            </span>
          </div>

          <div className="space-y-3.5">
            {userStats.subjectMastery.map((sub, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700">{sub.subject}</span>
                  <span className="font-bold text-slate-900">{sub.score}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${sub.score}%`,
                      backgroundColor:
                        sub.color === 'blue'
                          ? '#2563eb'
                          : sub.color === 'purple'
                          ? '#7c3aed'
                          : sub.color === 'emerald'
                          ? '#059669'
                          : sub.color === 'indigo'
                          ? '#4f46e5'
                          : '#0891b2'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-2xl bg-blue-50/60 border border-blue-100 text-[11px] text-blue-900 space-y-1">
            <span className="font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" /> AI Recommendation:
            </span>
            <p className="text-blue-700 leading-relaxed">
              Review Quantum Computing Bloch Sphere cards to bump your score from 76% to &gt;85%.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
