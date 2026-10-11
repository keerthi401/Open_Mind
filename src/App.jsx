import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { LearnView } from './components/LearnView';
import { AIAssistantView } from './components/AIAssistantView';
import { QuizzesView } from './components/QuizzesView';
import { RoadmapView } from './components/RoadmapView';
import { ProgressView } from './components/ProgressView';
import { UploadModal } from './components/UploadModal';
import { ApiSettingsModal } from './components/ApiSettingsModal';
import { initialTopics, learningRoadmaps, userProfileStats } from './data/mockData';

export function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Topics & Roadmaps State
  const [topics, setTopics] = useState(initialTopics);
  const [currentTopic, setCurrentTopic] = useState(initialTopics[0]);
  const [roadmaps, setRoadmaps] = useState(learningRoadmaps);
  const [userStats, setUserStats] = useState(userProfileStats);

  // Modals state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // AI Assistant cross-link prompt
  const [assistantPrompt, setAssistantPrompt] = useState('');

  // API Mode
  const [apiMode, setApiMode] = useState(() => localStorage.getItem('optimind_api_mode') || 'demo');
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('optimind_api_key') || '');

  const handleSelectTopic = (topic) => {
    setCurrentTopic(topic);
    setActiveTab('learn');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTopicById = (topicId) => {
    const found = topics.find((t) => t.id === topicId);
    if (found) {
      setCurrentTopic(found);
      setActiveTab('learn');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStartQuiz = (topic) => {
    setCurrentTopic(topic);
    setActiveTab('quizzes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAskAI = (promptText) => {
    setAssistantPrompt(promptText);
    setActiveTab('ai-assistant');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUploadComplete = (newTopic) => {
    setTopics((prev) => [newTopic, ...prev]);
    setCurrentTopic(newTopic);
    setUserStats((prev) => ({
      ...prev,
      visualCardsMastered: prev.visualCardsMastered + (newTopic.visualCards?.length || 2),
      recentActivities: [
        {
          id: `act-${Date.now()}`,
          title: `Uploaded Content: ${newTopic.title}`,
          time: 'Just now',
          type: 'upload',
          score: 'Processed',
          topic: newTopic.title
        },
        ...prev.recentActivities
      ]
    }));
    setActiveTab('learn');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        onOpenUpload={() => setIsUploadOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <Header
          onToggleMobileMenu={() => setIsMobileOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          topics={topics}
          onSelectTopic={handleSelectTopic}
          apiMode={apiMode}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenUpload={() => setIsUploadOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardView
              userStats={userStats}
              topics={topics}
              onSelectTopic={handleSelectTopic}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenUpload={() => setIsUploadOpen(true)}
            />
          )}

          {activeTab === 'learn' && (
            <LearnView
              currentTopic={currentTopic}
              allTopics={topics}
              onSelectTopic={setCurrentTopic}
              onStartQuiz={handleStartQuiz}
              onAskAI={handleAskAI}
            />
          )}

          {activeTab === 'ai-assistant' && (
            <AIAssistantView
              apiMode={apiMode}
              apiKey={apiKey}
              onOpenSettings={() => setIsSettingsOpen(true)}
              currentTopic={currentTopic}
              initialQuery={assistantPrompt}
            />
          )}

          {activeTab === 'quizzes' && (
            <QuizzesView
              topics={topics}
              currentTopic={currentTopic}
              onSelectTopic={setCurrentTopic}
              onNavigateLearn={handleSelectTopic}
            />
          )}

          {activeTab === 'roadmap' && (
            <RoadmapView
              roadmaps={roadmaps}
              onSelectTopicById={handleSelectTopicById}
              onNavigateLearn={handleSelectTopic}
            />
          )}

          {activeTab === 'progress' && (
            <ProgressView userStats={userStats} />
          )}
        </main>
      </div>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadComplete={handleUploadComplete}
      />

      {/* Engine & API Settings Modal */}
      <ApiSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiMode={apiMode}
        setApiMode={setApiMode}
        apiKey={apiKey}
        setApiKey={setApiKey}
      />
    </div>
  );
}

export default App;
