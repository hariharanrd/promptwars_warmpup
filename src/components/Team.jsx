import React from 'react';
import { Users } from 'lucide-react';

export function Team() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center h-64 flex flex-col items-center justify-center">
      <Users size={48} className="text-gray-300 mb-4" />
      <h3 className="text-xl font-medium text-gray-800">Team Directory</h3>
      <p className="text-gray-500 mt-2">Team management features coming soon!</p>
    </div>
  );
}
