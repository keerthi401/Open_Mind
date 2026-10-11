import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  Settings2, 
  Sparkles, 
  Key, 
  GraduationCap, 
  Check, 
  X,
  ExternalLink
} from 'lucide-react';

export const Header = ({ 
  onToggleMobileMenu, 
  searchQuery, 
  setSearchQuery, 
  topics, 
  onSelectTopic,
  apiMode,
  onOpenSettings,
  onOpenUpload
}) => {
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const filteredTopics = topics.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.overview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
      {/* Left: Mobile hamburger & search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search bar */}
        <div className="relative w-full">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search concepts, topics (e.g. Backprop, Qubit, Calvin Cycle)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              className="w-full pl-10 pr-9 py-2 bg-slate-100/90 hover:bg-slate-100 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowSearchResults(false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {showSearchResults && searchQuery.trim().length > 0 && (
            <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150 max-h-72 overflow-y-auto">
              <div className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1">
                Matching Visual Topics ({filteredTopics.length})
              </div>
              {filteredTopics.length > 0 ? (
                filteredTopics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => {
                      onSelectTopic(topic);
                      setShowSearchResults(false);
                      setSearchQuery('');
                    }}
                    className="w-full text-left p-2 hover:bg-blue-50 rounded-lg flex items-center justify-between transition-colors group"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-800 group-hover:text-blue-700">
                        {topic.title}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">
                        {topic.overview}
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-700 whitespace-nowrap ml-2">
                      {topic.category}
                    </span>
                  </button>
                ))
              ) : (
                <div className="p-3 text-center text-xs text-slate-500">
                  No direct matches found. Try searching by keyword or upload your custom notes!
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right controls: Engine badge, notifications, profile */}
      <div className="flex items-center gap-3">
        {/* Engine mode pill */}
        <button
          onClick={onOpenSettings}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-blue-200/80 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 hover:border-blue-300 transition-all shadow-sm"
          title="Configure AI Engine & API Keys"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span className="font-semibold">
            {apiMode === 'live' ? 'Live Gemini Engine' : 'OptiMind Engine (Demo)'}
          </span>
          <Settings2 className="w-3 h-3 text-blue-500 ml-0.5" />
        </button>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
          </button>

          {/* Notifications Panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800">Notifications</span>
                <span className="text-[10px] text-blue-600 font-semibold cursor-pointer hover:underline">
                  Mark all read
                </span>
              </div>
              <div className="py-2 space-y-2 text-xs">
                <div className="p-2 bg-blue-50/70 rounded-xl">
                  <p className="font-semibold text-blue-900 text-[11px]">Quiz Perfect Score! 🏆</p>
                  <p className="text-[10px] text-blue-700">You scored 100% on Neural Networks & Backpropagation.</p>
                  <span className="text-[9px] text-slate-400">2 hours ago</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl">
                  <p className="font-semibold text-slate-800 text-[11px]">New Visual Topic Available</p>
                  <p className="text-[10px] text-slate-600">Explore Quantum Superposition & Qubits with 3D Bloch sphere.</p>
                  <span className="text-[9px] text-slate-400">1 day ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Student Profile avatar */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full ring-2 ring-blue-600/30 overflow-hidden bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
            AR
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-bold text-slate-800 leading-tight">Alex Rivera</div>
            <div className="text-[10px] text-slate-500 font-medium">CS & AI Honors</div>
          </div>
        </div>
      </div>
    </header>
  );
};
