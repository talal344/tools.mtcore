import React from 'react';
import styles from './Hero.module.css';
import Button from '../shared/Button';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.orbs}>
        <div className={styles.orb1}></div>
        <div className={styles.orb2}></div>
      </div>
      
      <div className={`${styles.container} container`}>
        <div className={styles.content}>
          <h1 className={`${styles.title} animate-fade-in`}>
            Unlock the Power of <br />
            <span className="text-gradient">Professional Tools</span>
          </h1>
          <p className={`${styles.subtitle} animate-fade-in`}>
            A high-end, scalable platform for all your utility needs. 
            Process PDFs, data, and complex files with enterprise-grade precision.
          </p>
          
          <div className={`${styles.actions} animate-fade-in`}>
            <Link href="/tools">
              <Button size="lg">Explore All Tools</Button>
            </Link>
            <Link href="/about">
              <Button variant="secondary" size="lg">Learn More</Button>
            </Link>
          </div>
          
          <div className={`${styles.stats} animate-fade-in`}>
            <div className={styles.stat}>
              <span className={styles.statValue}>100%</span>
              <span className={styles.statLabel}>Secure</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statValue}>Fast</span>
              <span className={styles.statLabel}>Processing</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statValue}>Free</span>
              <span className={styles.statLabel}>Always</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
