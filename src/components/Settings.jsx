import React, { useState } from 'react';
import { Settings as SettingsIcon, Plus, Trash2, GripVertical } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export function Settings() {
  const { statuses, updateStatuses, loading } = useSettings();
  const [newStatus, setNewStatus] = useState('');

  const handleAddStatus = async (e) => {
    e.preventDefault();
    if (!newStatus.trim()) return;
    if (statuses.includes(newStatus.trim())) {
      setNewStatus('');
      return;
    }
    
    const updatedStatuses = [...statuses, newStatus.trim()];
    await updateStatuses(updatedStatuses);
    setNewStatus('');
  };

  const handleRemoveStatus = async (statusToRemove) => {
    const updatedStatuses = statuses.filter(s => s !== statusToRemove);
    await updateStatuses(updatedStatuses);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center h-64 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center space-x-3 mb-6">
          <SettingsIcon size={24} className="text-indigo-600" />
          <h3 className="text-xl font-bold text-gray-800">Task Statuses</h3>
        </div>
        
        <p className="text-gray-500 mb-6 text-sm">
          Customize the status options available for your tasks. Changes are reflected instantly across the workspace.
        </p>

        <div className="space-y-3">
          {statuses.map((status) => (
            <div 
              key={status}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 group"
            >
              <div className="flex items-center space-x-3">
                <GripVertical size={16} className="text-gray-300" />
                <span className="text-sm font-medium text-gray-700">{status}</span>
              </div>
              <button 
                onClick={() => handleRemoveStatus(status)}
                className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                title="Remove status"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <form onSubmit={handleAddStatus} className="mt-6 flex space-x-2">
          <input
            type="text"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            placeholder="Add new status..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
          />
          <button
            type="submit"
            disabled={!newStatus.trim()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 text-sm font-medium"
          >
            <Plus size={16} />
            <span>Add</span>
          </button>
        </form>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-6">
        <h4 className="text-sm font-semibold text-amber-800 mb-1">Important Note</h4>
        <p className="text-xs text-amber-700 leading-relaxed">
          Removing a status will not delete tasks currently in that state. Those tasks will still show their old status until you manually update them to one of the currently available options.
        </p>
      </div>
    </div>
  );
}
