import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { TaskGrid } from './components/TaskGrid';
import { TaskForm } from './components/TaskForm';
import { Auth } from './components/Auth';
import { Team } from './components/Team';
import { Settings } from './components/Settings';
import { PlaceholderView } from './components/PlaceholderView';
import { Video, FileText, Phone } from 'lucide-react';
import { useTasks } from './hooks/useTasks';
import { useAuth } from './hooks/useAuth';
import { SettingsProvider } from './context/SettingsContext';
import { ChatWindow } from './components/ChatWindow';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { tasks, loading: tasksLoading } = useTasks();
  const { currentUser, loading: authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <Auth />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'team':
        return <Team />;
      case 'meetings':
        return <PlaceholderView title="Meetings" icon={Video} description="Host high-quality video conferences and team huddles directly within SyncFlow." />;
      case 'docs':
        return <PlaceholderView title="Document Store" icon={FileText} description="Collaborate on documents, spreadsheets, and presentations in real-time." />;
      case 'calls':
        return <PlaceholderView title="Calls" icon={Phone} description="Secure audio and video calling for instant team communication." />;
      case 'settings':
        return <Settings />;
      case 'dashboard':
      default:
        return (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Team Execution</h2>
              <p className="text-slate-500 mt-2 text-sm max-w-2xl">
                Real-time dashboard reflecting every task state change instantly across all screens.
              </p>
            </div>
            <TaskGrid tasks={tasks} loading={tasksLoading} />
          </>
        );
    }
  };

  return (
    <SettingsProvider>
      <div className="min-h-screen bg-[#F8FAFC] font-sans">
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
        
        <div className="flex-1 flex flex-col">
          <TopBar onNewTask={() => setIsFormOpen(true)} />
          
          <main className="flex-1 p-8 ml-64">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </main>
        </div>

        <TaskForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
        <ChatWindow />
      </div>
    </SettingsProvider>
  );
}

export default App;
