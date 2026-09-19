import React from 'react';
import styles from './Card.module.css';
import Link from 'next/link';

interface CardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  category?: string;
  popular?: boolean;
}

const Card: React.FC<CardProps> = ({ title, description, icon, href, category, popular }) => {
  return (
    <Link href={href} className={styles.card}>
      {popular && <div className={styles.badge}>Popular</div>}
      <div className={styles.iconContainer}>
        <span className={styles.icon}>{icon}</span>
      </div>
      <div className={styles.content}>
        {category && <span className={styles.category}>{category}</span>}
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.footer}>
          <span className={styles.action}>Open Tool</span>
          <svg className={styles.arrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </div>
      <div className={styles.glow} />
    </Link>
  );
};

export default Card;
