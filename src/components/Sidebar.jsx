import React from 'react';
import { CheckSquare, Users, Settings, LayoutDashboard } from 'lucide-react';

export function Sidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen fixed left-0 top-0 pt-6">
      <div className="px-6 mb-8 flex items-center space-x-3">
        <div className="bg-indigo-600 p-2 rounded-lg">
          <CheckSquare size={24} className="text-white" />
        </div>
        <h1 className="text-xl font-bold text-gray-800 tracking-tight">SyncFlow</h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        <a href="#" className="flex items-center space-x-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-medium transition-colors">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </a>
        <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-700 rounded-xl font-medium transition-colors">
          <Users size={20} />
          <span>Team</span>
        </a>
        <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-700 rounded-xl font-medium transition-colors">
          <Settings size={20} />
          <span>Settings</span>
        </a>
      </nav>

      <div className="p-4 border-t border-gray-100 m-4 rounded-xl bg-gray-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold">
            JD
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">John Doe</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
