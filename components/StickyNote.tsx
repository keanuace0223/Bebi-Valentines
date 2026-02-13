
import React from 'react';

interface StickyNoteProps {
  content: string;
  icon: string;
  color: string;
  rotation?: string;
}

const StickyNote: React.FC<StickyNoteProps> = ({ content, icon, color, rotation = 'rotate-0' }) => {
  return (
    <div className={`${color} p-6 rounded-sm ${rotation} flex flex-col gap-3 min-h-[200px] shadow-md hover:shadow-lg transition-shadow`}>
      <span className="material-symbols-outlined text-primary text-xl">{icon}</span>
      <p className="font-display italic text-lg text-gray-800 leading-relaxed">
        "{content}"
      </p>
    </div>
  );
};

export default StickyNote;
