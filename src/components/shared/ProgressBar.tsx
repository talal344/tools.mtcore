'use client';

import React from 'react';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  progress: number;
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, label }) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={styles.wrapper}>
      <div className={styles.labelSection}>
        <span className={styles.label}>{label || 'Processing...'}</span>
        <span className={styles.percentage}>{Math.round(clampedProgress)}%</span>
      </div>
      <div className={styles.track}>
        <div 
          className={styles.pbar} 
          style={{ width: `${clampedProgress}%` }}
        >
          <div className={styles.glow} />
          <div className={styles.shimmer} />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
