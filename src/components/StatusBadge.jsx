import React from 'react';

const statuses = ['To Do', 'In Progress', 'Done'];

export function StatusBadge({ status, onStatusChange }) {
  const getStatusColor = (currentStatus) => {
    switch (currentStatus) {
      case 'To Do':
        return 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200';
      case 'In Progress':
        return 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200';
      case 'Done':
        return 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const cycleStatus = (e) => {
    e.stopPropagation();
    const currentIndex = statuses.indexOf(status);
    const nextIndex = (currentIndex + 1) % statuses.length;
    onStatusChange(statuses[nextIndex]);
  };

  return (
    <button
      onClick={cycleStatus}
      className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-200 ${getStatusColor(status)}`}
    >
      {status || 'To Do'}
    </button>
  );
}
