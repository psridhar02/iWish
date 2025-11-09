import React from 'react';

export default function Logo({ compact = false, className = '' }) {
  // Pastel gift box theme 🎁
  const COLOR_BOX_MAIN = '#EADCF8';   // Soft lavender box
  const COLOR_RIBBON = '#E5001A';     // Bright red ribbon + bow
  const COLOR_ACCENT = '#C9B6E4';     // Subtle shadow tone

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Cute SVG Gift Box with Ribbon */}
      <svg
        width="44"
        height="44"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Box Shadow */}
        <rect
          x="10"
          y="18"
          width="28"
          height="22"
          rx="4"
          fill={COLOR_ACCENT}
        />

        {/* Box Body */}
        <rect
          x="9"
          y="16"
          width="30"
          height="22"
          rx="5"
          fill={COLOR_BOX_MAIN}
        />

        {/* Horizontal Ribbon */}
        <rect
          x="9"
          y="24"
          width="30"
          height="4"
          fill={COLOR_RIBBON}
        />

        {/* Vertical Ribbon */}
        <rect
          x="22"
          y="16"
          width="4"
          height="22"
          fill={COLOR_RIBBON}
        />

        {/* 🎀 Bow Loops */}
        <path
          d="M24 8C23 5 19 4 16 7C14 9 14.5 12 17 13.5C19.5 15 22 13 23 11.5C23.5 11 24.5 11 25 11.5C26 13 28.5 15 31 13.5C33.5 12 34 9 32 7C29 4 25 5 24 8Z"
          fill={COLOR_RIBBON}
        />

        {/* 🎀 Bow Center */}
        <circle cx="24" cy="12" r="2.5" fill="#FF6B81" />

        {/* Tiny sparkle accent (optional sparkle vibe ✨) */}
        <circle cx="34" cy="10" r="1.2" fill="white" opacity="0.7" />
      </svg>

      {/* Text next to the box */}
      {!compact && (
        <span
          className="font-semibold tracking-wide"
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '2rem',
            lineHeight: '1',
          }}
        >
          <span style={{ color: COLOR_RIBBON }}>i</span>
          <span style={{ color: '#333' }}>Wish</span>
        </span>
      )}
    </div>
  );
}
