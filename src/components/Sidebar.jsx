import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Bot, 
  HelpCircle, 
  Milestone, 
  TrendingUp, 
  Flame, 
  Sparkles, 
  BrainCircuit, 
  CheckCircle2,
  ChevronRight,
  UploadCloud,
  X
} from 'lucide-react';

export const Sidebar = ({ 
  activeTab, 
  setActiveTab, 
  isMobileOpen, 
  setIsMobileOpen,
  onOpenUpload
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'learn', label: 'Learn & Studio', icon: BookOpen, badge: 'Visual' },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot, badge: 'Smart' },
    { id: 'quizzes', label: 'Quizzes', icon: HelpCircle, badge: '5 Ready' },
    { id: 'roadmap', label: 'My Roadmap', icon: Milestone, badge: 'Active' },
    { id: 'progress', label: 'Progress', icon: TrendingUp, badge: null },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 w-64 bg-white border-r border-slate-200 z-50 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <BrainCircuit className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
                  OptiMind
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium">See It, Understand It, Master It</p>
            </div>
          </div>
          
          <button 
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Action Button */}
        <div className="p-4">
          <button
            onClick={() => {
              onOpenUpload();
              if (isMobileOpen) setIsMobileOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium text-xs shadow-md shadow-blue-600/20 transition-all active:scale-[0.98]"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Content / Notes</span>
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Platform Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (isMobileOpen) setIsMobileOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'text-slate-500 group-hover:text-blue-600 group-hover:bg-blue-50'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                      isActive 
                        ? 'bg-blue-200/80 text-blue-800' 
                        : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-600" />}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Student Streak & Stats Card */}
        <div className="p-4 mx-3 mb-3 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-lg border border-indigo-900/40">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-indigo-200 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-bounce" />
              Daily Study Streak
            </span>
            <span className="text-xs font-bold text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded-full">
              7 Days
            </span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
            You've visualized 148 concepts this month. Keep up the momentum!
          </p>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-full w-[78%] rounded-full" />
          </div>
          <div className="flex justify-between text-[9px] text-slate-400 mt-1">
            <span>Weekly Goal: 10 hrs</span>
            <span>7.8 hrs logged</span>
          </div>
        </div>

        {/* Hackathon Prototype Tag */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-medium text-slate-700">Prototype v1.0</span>
          </div>
          <span className="text-[10px] bg-slate-200/80 text-slate-600 px-1.5 py-0.5 rounded font-mono">
            College Hackathon
          </span>
        </div>
      </aside>
    </>
  );
};
