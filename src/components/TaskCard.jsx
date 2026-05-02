import React from 'react';
import { Calendar, User } from 'lucide-react';
import { format } from 'date-fns';
import { StatusBadge } from './StatusBadge';
import { useTasks } from '../hooks/useTasks';

export function TaskCard({ task }) {
  const { updateTaskStatus } = useTasks();

  const handleStatusChange = (newStatus) => {
    updateTaskStatus(task.id, newStatus);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-gray-800 text-lg leading-tight">{task.title}</h3>
        <StatusBadge status={task.status} onStatusChange={handleStatusChange} />
      </div>
      
      <div className="flex flex-col space-y-2 mt-4 text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <User size={16} className="text-gray-400" />
          <span>{task.owner}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Calendar size={16} className="text-gray-400" />
          <span>
            {formatDate(task.startDate)} - {formatDate(task.dueDate)}
          </span>
        </div>
      </div>
    </div>
  );
}
