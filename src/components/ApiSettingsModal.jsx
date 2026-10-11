import React, { useState } from 'react';
import { 
  X, 
  Key, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle, 
  HelpCircle,
  ExternalLink,
  Cpu,
  AlertCircle
} from 'lucide-react';

export const ApiSettingsModal = ({ 
  isOpen, 
  onClose, 
  apiMode, 
  setApiMode, 
  apiKey, 
  setApiKey 
}) => {
  const [tempKey, setTempKey] = useState(apiKey || '');
  const [selectedEngine, setSelectedEngine] = useState(apiMode);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setApiMode(selectedEngine);
    setApiKey(tempKey.trim());
    localStorage.setItem('optimind_api_mode', selectedEngine);
    localStorage.setItem('optimind_api_key', tempKey.trim());
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600/30 text-blue-400 border border-blue-500/30">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">OptiMind Engine Configuration</h3>
              <p className="text-xs text-slate-400">Manage demo engine vs live LLM API keys</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Engine Choice Cards */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Select Inference Mode
            </label>

            {/* Mode 1: Built-in Demo Engine */}
            <div
              onClick={() => setSelectedEngine('demo')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                selectedEngine === 'demo'
                  ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full border-2 border-blue-600 flex items-center justify-center mt-0.5">
                    {selectedEngine === 'demo' && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      OptiMind Pedagogical Demo Engine
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Default / Ready
                      </span>
                    </span>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                      Instantaneous visual models, rich pre-synthesized multi-level explanations (ELI5, High School, College Pro), interactive math & science diagrams, and 5-question quizzes without requiring API keys.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mode 2: Live API Key */}
            <div
              onClick={() => setSelectedEngine('live')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                selectedEngine === 'live'
                  ? 'border-purple-600 bg-purple-50/60 ring-2 ring-purple-500/20 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full border-2 border-purple-600 flex items-center justify-center mt-0.5">
                    {selectedEngine === 'live' && <div className="w-2 h-2 rounded-full bg-purple-600" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      Live AI API (Google Gemini / OpenAI)
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                        Optional
                      </span>
                    </span>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                      Enter your personal API key to stream dynamic live answers in the AI Assistant. Stored purely locally in your browser memory.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Input if Live selected */}
          {selectedEngine === 'live' && (
            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200/80 space-y-2 animate-in fade-in duration-150">
              <label className="text-xs font-bold text-purple-950 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-purple-600" />
                Gemini API Key
              </label>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={tempKey}
                onChange={(e) => setTempKey(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-purple-200 bg-white text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              />
              <p className="text-[10px] text-purple-700 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                Key stays strictly inside client browser local storage. No server transmission.
              </p>
            </div>
          )}

          {/* Hackathon transparency banner */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-[11px] text-slate-600">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-800">Hackathon Demonstration Note:</span>
              <p className="mt-0.5 leading-relaxed">
                For collegiate judging and zero-latency presentations, the built-in demo engine is recommended because it runs 100% offline with zero rate limits.
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all active:scale-[0.98]"
          >
            {saveSuccess ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Saved!
              </>
            ) : (
              'Apply Settings'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
