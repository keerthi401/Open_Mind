import React, { useState } from 'react';
import { 
  Milestone, 
  CheckCircle2, 
  Lock, 
  PlayCircle, 
  Clock, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  Plus, 
  Layers, 
  Award,
  ChevronRight
} from 'lucide-react';

export const RoadmapView = ({ 
  roadmaps, 
  onSelectTopicById, 
  onNavigateLearn 
}) => {
  const [activeRoadmapId, setActiveRoadmapId] = useState(roadmaps[0]?.id);
  const [allRoadmaps, setAllRoadmaps] = useState(roadmaps);
  const [customGoal, setCustomGoal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [expandedMilestoneId, setExpandedMilestoneId] = useState(null);

  const activeRoadmap = allRoadmaps.find((r) => r.id === activeRoadmapId) || allRoadmaps[0];

  const handleGenerateCustomRoadmap = (e) => {
    e.preventDefault();
    if (!customGoal.trim()) return;

    setIsGenerating(true);

    setTimeout(() => {
      const newRoadmap = {
        id: `custom-road-${Date.now()}`,
        title: customGoal.trim(),
        description: `Personalized AI visual roadmap synthesized for mastery in ${customGoal.trim()}.`,
        totalModules: 5,
        completedModules: 1,
        estimatedTotalHours: 35,
        milestones: [
          {
            id: `cm-1`,
            title: `Foundations & Core Principles of ${customGoal.trim()}`,
            status: 'completed',
            level: 'Milestone 1',
            hours: '7 hrs',
            topicId: 'neural-networks',
            description: 'Understand the primary vocabulary, historical development, and theoretical framework.',
            skills: ['Core Concepts', 'System Architecture', 'Visual Diagnostics']
          },
          {
            id: `cm-2`,
            title: `Algorithmic Models & Mathematical Representations`,
            status: 'in-progress',
            level: 'Milestone 2',
            hours: '9 hrs',
            topicId: 'derivatives',
            description: 'Dive deep into formal optimization, rate of change, and quantitative modeling.',
            skills: ['Mathematical Formulations', 'Parameter Tuning']
          },
          {
            id: `cm-3`,
            title: `Practical System Design & Architecture`,
            status: 'locked',
            level: 'Milestone 3',
            hours: '10 hrs',
            topicId: null,
            description: 'Design end-to-end components and benchmark latency vs accuracy tradeoffs.',
            skills: ['High Throughput', 'Failure Recovery']
          },
          {
            id: `cm-4`,
            title: `Capstone Research & Visual Defense`,
            status: 'locked',
            level: 'Capstone',
            hours: '9 hrs',
            topicId: null,
            description: 'Synthesize learning into a comprehensive case study with visual interactive slides.',
            skills: ['Synthesis', 'Collegiate Defense']
          }
        ]
      };

      setAllRoadmaps((prev) => [newRoadmap, ...prev]);
      setActiveRoadmapId(newRoadmap.id);
      setIsGenerating(false);
      setCustomGoal('');
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Header & Roadmap Switcher */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Milestone className="w-3.5 h-3.5" />
            Curated Academic & Career Pathways
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-2">
            Personalized Learning Roadmaps
          </h1>
          <p className="text-xs text-slate-500">
            Structured step-by-step milestones with prerequisites, time budgets, and visual studio links.
          </p>
        </div>

        {/* Roadmap Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {allRoadmaps.map((r) => (
            <button
              key={r.id}
              onClick={() => setActiveRoadmapId(r.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                r.id === activeRoadmapId
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {r.title}
            </button>
          ))}
        </div>
      </div>

      {/* Active Roadmap Hero Overview */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-800/40 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-blue-300">
              Active Career Pathway
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1">
              {activeRoadmap.title}
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
              {activeRoadmap.description}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 shrink-0">
            <div>
              <div className="text-2xl font-extrabold text-white">
                {activeRoadmap.completedModules}/{activeRoadmap.totalModules}
              </div>
              <div className="text-[10px] text-blue-200 font-medium">Completed Milestones</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div>
              <div className="text-2xl font-extrabold text-amber-300">
                {activeRoadmap.estimatedTotalHours}h
              </div>
              <div className="text-[10px] text-blue-200 font-medium">Total Est. Hours</div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5 pt-2">
          <div className="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-400 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{
                width: `${(activeRoadmap.completedModules / activeRoadmap.totalModules) * 100}%`
              }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-300 font-medium">
            <span>Progress: {Math.round((activeRoadmap.completedModules / activeRoadmap.totalModules) * 100)}%</span>
            <span>{activeRoadmap.totalModules - activeRoadmap.completedModules} Milestones Remaining</span>
          </div>
        </div>
      </section>

      {/* Interactive Milestone Nodes Sequence */}
      <section className="space-y-4">
        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600" />
          Milestone Sequence ({activeRoadmap.milestones.length})
        </h3>

        <div className="space-y-4 relative before:absolute before:left-6 before:top-6 before:bottom-6 before:w-0.5 before:bg-slate-200">
          {activeRoadmap.milestones.map((m, idx) => {
            const isCompleted = m.status === 'completed';
            const isInProgress = m.status === 'in-progress';
            const isLocked = m.status === 'locked';
            const isExpanded = expandedMilestoneId === m.id;

            return (
              <div
                key={m.id}
                className={`relative pl-14 transition-all duration-200`}
              >
                {/* Node icon circle */}
                <div
                  className={`absolute left-3 top-4 -translate-x-1/2 w-7 h-7 rounded-full flex items-center justify-center ring-4 ring-white z-10 transition-transform ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isInProgress
                      ? 'bg-blue-600 text-white ring-blue-100 animate-pulse'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isInProgress ? (
                    <PlayCircle className="w-4 h-4" />
                  ) : (
                    <Lock className="w-3.5 h-3.5" />
                  )}
                </div>

                {/* Milestone Card */}
                <div
                  onClick={() => setExpandedMilestoneId(isExpanded ? null : m.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isInProgress
                      ? 'bg-blue-50/60 border-blue-300 shadow-sm ring-1 ring-blue-500/20'
                      : isCompleted
                      ? 'bg-white border-slate-200/90 hover:border-slate-300'
                      : 'bg-slate-50/80 border-slate-200 opacity-70'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {m.level}
                        </span>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {m.hours}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                        {m.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-800'
                            : isInProgress
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {isCompleted ? 'Completed' : isInProgress ? 'In Progress' : 'Locked'}
                      </span>
                      <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {m.description}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {m.skills?.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Expanded details & routing */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-200/80 flex items-center justify-between animate-in fade-in duration-150">
                      <span className="text-[11px] text-slate-500">
                        {m.topicId ? "Linked directly to an OptiMind Visual Studio unit." : "General syllabus module."}
                      </span>

                      {m.topicId ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectTopicById(m.topicId);
                          }}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Launch Visual Module</span>
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400 italic">
                          Prerequisites must be cleared
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* AI Custom Roadmap Generator Card */}
      <section className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border border-purple-200/80 rounded-3xl p-6 sm:p-7 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <h3 className="font-bold text-base text-slate-900">
            Generate an AI Personalized Roadmap
          </h3>
        </div>
        <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
          Type any academic ambition or role (e.g. <em>"Neuroscience & Brain-Computer Interfaces"</em>, <em>"Autonomous Robotics Navigation"</em>, or <em>"Quantum Cryptography"</em>) and OptiMind will construct an interactive milestone tree.
        </p>

        <form onSubmit={handleGenerateCustomRoadmap} className="flex flex-col sm:flex-row gap-2 max-w-2xl">
          <input
            type="text"
            placeholder="e.g. Neuroscience & Brain-Computer Interfaces..."
            value={customGoal}
            onChange={(e) => setCustomGoal(e.target.value)}
            disabled={isGenerating}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
          />
          <button
            type="submit"
            disabled={!customGoal.trim() || isGenerating}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white text-xs font-semibold shadow-md shadow-purple-500/20 transition-all active:scale-[0.98]"
          >
            {isGenerating ? (
              <span>Synthesizing Roadmap...</span>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Create Roadmap</span>
              </>
            )}
          </button>
        </form>
      </section>
    </div>
  );
};
