import React from 'react';
import { CheckSquare, Users, Settings, LayoutDashboard, LogOut, Video, FileText, Phone } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function Sidebar({ currentView, setCurrentView }) {
  const { currentUser, logOut } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const getInitials = (email) => {
    if (!email) return 'U';
    return email.charAt(0).toUpperCase();
  };

  const navItemClass = (viewName) => {
    const isActive = currentView === viewName;
    return `flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-colors cursor-pointer ${
      isActive 
        ? 'bg-indigo-50 text-indigo-700' 
        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
    }`;
  };

  return (
    <div className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen fixed left-0 top-0 pt-6">
      <div className="px-6 mb-8 flex items-center space-x-3">
        <div className="bg-indigo-600 p-2 rounded-lg">
          <CheckSquare size={24} className="text-white" />
        </div>
        <h1 className="text-xl font-bold text-gray-800 tracking-tight">SyncFlow</h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        <div onClick={() => setCurrentView('dashboard')} className={navItemClass('dashboard')}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </div>
        <div onClick={() => setCurrentView('team')} className={navItemClass('team')}>
          <Users size={20} />
          <span>Team</span>
        </div>
        
        <div className="pt-4 pb-2 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Workspace</div>
        <div onClick={() => setCurrentView('meetings')} className={navItemClass('meetings')}>
          <Video size={20} />
          <span>Meetings</span>
        </div>
        <div onClick={() => setCurrentView('docs')} className={navItemClass('docs')}>
          <FileText size={20} />
          <span>Documents</span>
        </div>
        <div onClick={() => setCurrentView('calls')} className={navItemClass('calls')}>
          <Phone size={20} />
          <span>Calls</span>
        </div>

        <div className="pt-4 pb-2 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">System</div>
        <div onClick={() => setCurrentView('settings')} className={navItemClass('settings')}>
          <Settings size={20} />
          <span>Settings</span>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-100 m-4 rounded-xl bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 truncate">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold flex-shrink-0">
              {getInitials(currentUser?.email)}
            </div>
            <div className="truncate">
              <p className="text-sm font-medium text-gray-800 truncate" title={currentUser?.email}>
                {currentUser?.email?.split('@')[0] || 'User'}
              </p>
              <p className="text-xs text-gray-500 truncate">{currentUser?.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="text-gray-400 hover:text-red-500 transition-colors p-2"
            title="Log out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
