import React from 'react';
import { Sparkles } from 'lucide-react';

export function PlaceholderView({ title, description, icon: Icon }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
      <div className="bg-indigo-50 p-6 rounded-3xl mb-6 animate-pulse">
        {Icon ? <Icon size={48} className="text-indigo-600" /> : <Sparkles size={48} className="text-indigo-600" />}
      </div>
      <h2 className="text-3xl font-bold text-slate-800 tracking-tight mb-3">{title}</h2>
      <p className="text-slate-500 max-w-md text-lg">
        {description || "We're working hard to bring this feature to your workspace. Stay tuned for updates!"}
      </p>
      <div className="mt-10 flex items-center space-x-2 text-indigo-600 font-medium bg-indigo-50 px-4 py-2 rounded-full text-sm">
        <Sparkles size={16} />
        <span>Coming Soon</span>
      </div>
    </div>
  );
}
