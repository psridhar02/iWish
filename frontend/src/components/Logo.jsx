import React from 'react';

export default function Logo({ compact=false, className = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#df9b85" />
        <path d="M7 12c1.5-3 4.5-3 6 0" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      {!compact && <span className="text-lg font-medium tracking-wide">iWish</span>}
    </div>
  );
}
