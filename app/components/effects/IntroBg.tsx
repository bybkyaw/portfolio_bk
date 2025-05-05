'use client';

import React from 'react';
import '../../styles/introBg.css';

const IntroBg: React.FC = () => {
  return (
    <div className="intro-bg">
      {/* Optional animated noise overlay */}
      <div className="intro-noise" />
    </div>
  );
};

export default IntroBg;
