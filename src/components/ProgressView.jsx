import React from 'react';
import { 
  TrendingUp, 
  Flame, 
  Award, 
  Clock, 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  Eye, 
  BookOpen, 
  Milestone,
  HelpCircle,
  BarChart3
} from 'lucide-react';

export const ProgressView = ({ userStats }) => {
  const getAchievementIcon = (iconName) => {
    switch (iconName) {
      case 'Eye':
        return <Eye className="w-5 h-5 text-blue-600" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />;
      case 'Award':
        return <Award className="w-5 h-5 text-purple-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-yellow-500" />;
      case 'Milestone':
        return <Milestone className="w-5 h-5 text-emerald-600" />;
      default:
        return <Award className="w-5 h-5 text-blue-600" />;
    }
  };

  const maxHours = Math.max(...userStats.activityHistory.map(a => a.hours));

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
            <TrendingUp className="w-3.5 h-3.5" />
            Student Mastery Analytics
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-2">
            Learning Progress & Analytics
          </h1>
          <p className="text-xs text-slate-500">
            Continuous tracking of visual retention, quiz performance, and concept comprehension.
          </p>
        </div>

        {/* Top Summary Badge */}
        <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200/70">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-md">
            <Flame className="w-5 h-5 fill-white" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">{userStats.currentStreakDays} Days Streak</div>
            <div className="text-[10px] text-slate-500 font-medium">Top 5% Consistency</div>
          </div>
        </div>
      </div>

      {/* Primary KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
          <span className="text-xs font-semibold text-slate-400">Total Visual Cards Mastered</span>
          <div className="text-3xl font-black text-slate-900 mt-2">
            {userStats.visualCardsMastered}
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">
            +24 cards this week
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
          <span className="text-xs font-semibold text-slate-400">Quiz Accuracy Average</span>
          <div className="text-3xl font-black text-slate-900 mt-2">
            {userStats.quizAccuracyAvg}%
          </div>
          <p className="text-[11px] text-purple-600 font-semibold mt-1">
            Across 18 evaluations
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
          <span className="text-xs font-semibold text-slate-400">Total Visual Studio Hours</span>
          <div className="text-3xl font-black text-slate-900 mt-2">
            {userStats.totalHoursStudied}h
          </div>
          <p className="text-[11px] text-blue-600 font-semibold mt-1">
            +4.2 hrs from last week
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
          <span className="text-xs font-semibold text-slate-400">Weekly Goal Progress</span>
          <div className="text-3xl font-black text-slate-900 mt-2">
            {Math.round((userStats.weeklyHoursLogged / userStats.weeklyGoalHours) * 100)}%
          </div>
          <p className="text-[11px] text-slate-500 font-semibold mt-1">
            {userStats.weeklyHoursLogged} of {userStats.weeklyGoalHours} hrs
          </p>
        </div>
      </div>

      {/* Two Column: Activity Bar Chart & Subject Mastery Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Study Time Activity Bar Chart */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              Weekly Study Activity (Hours Logged)
            </h3>
            <span className="text-[11px] font-bold text-slate-500">Last 7 Days</span>
          </div>

          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2">
            {userStats.activityHistory.map((item, idx) => {
              const heightPercent = Math.round((item.hours / maxHours) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[10px] font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.hours}h
                  </span>
                  <div className="w-full bg-slate-100 rounded-t-xl h-full flex items-end overflow-hidden">
                    <div
                      className="w-full bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-xl group-hover:from-blue-500 group-hover:to-indigo-400 transition-all duration-300"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-600">{item.day}</span>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Peak study day: <strong>Saturday (2.4 hrs)</strong></span>
            <span>Total: <strong>11.4 hrs</strong></span>
          </div>
        </div>

        {/* Subject Mastery Radar / Progress List */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              Core Disciplines Mastery
            </h3>
            <span className="text-xs text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded-full">
              Real-time
            </span>
          </div>

          <div className="space-y-4 pt-1">
            {userStats.subjectMastery.map((sub, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-800">{sub.subject}</span>
                  <span className="text-blue-700">{sub.score}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
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

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600">
            💡 <strong>Next Milestone:</strong> Spend 15 minutes reviewing <em>Quantum Computing Qubit Gates</em> to reach 80% mastery across all 5 disciplines.
          </div>
        </div>
      </div>

      {/* Achievements & Badges Grid */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            Learning Badges & Milestones ({userStats.achievements.length})
          </h3>
          <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full">
            4 / 5 Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {userStats.achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                ach.unlocked
                  ? 'bg-white border-slate-200 shadow-sm hover:border-blue-300'
                  : 'bg-slate-50/60 border-slate-200 opacity-60'
              }`}
            >
              <div
                className={`p-2.5 rounded-2xl shrink-0 ${
                  ach.unlocked ? 'bg-blue-50' : 'bg-slate-100 text-slate-400'
                }`}
              >
                {getAchievementIcon(ach.icon)}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900">{ach.title}</h4>
                  {ach.unlocked && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  {ach.description}
                </p>
                <div className="mt-2 text-[10px] font-semibold text-slate-400">
                  {ach.unlocked ? `Unlocked • ${ach.date}` : "In Progress"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
