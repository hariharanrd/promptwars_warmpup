import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { TaskGrid } from './components/TaskGrid';
import { TaskForm } from './components/TaskForm';
import { useTasks } from './hooks/useTasks';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { tasks, loading } = useTasks();

  // Filter tasks if needed, or group them.
  // For now, simple real-time list.
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <TopBar onNewTask={() => setIsFormOpen(true)} />
        
        {/* Adjusted left margin for sidebar, and top padding since TopBar is fixed/sticky */}
        <main className="flex-1 p-8 ml-64">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Team Execution</h2>
              <p className="text-slate-500 mt-2 text-sm max-w-2xl">
                Real-time dashboard reflecting every task state change instantly across all screens.
              </p>
            </div>
            
            <TaskGrid tasks={tasks} loading={loading} />
          </div>
        </main>
      </div>

      <TaskForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
}

export default App;
