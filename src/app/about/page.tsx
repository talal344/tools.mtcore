import React from 'react';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <Navbar />
      
      <header className={styles.header}>
        <div className="container">
          <h1 className={`${styles.title} animate-fade-in`}>About <span className="text-gradient">Tools.MTCore</span></h1>
          <p className={`${styles.subtitle} animate-fade-in`}>
            Empowering professionals with precision-engineered utility tools and a seamless user experience.
          </p>
        </div>
      </header>
      
      <section className={styles.contentSection}>
        <div className={`${styles.grid} container`}>
          <div className={`${styles.glassCard} animate-fade-in`}>
            <h2 className="futuristic">Our Mission</h2>
            <p>
              At Tools.MTCore, we believe that powerful software should be accessible and easy to use. 
              Our mission is to build the most comprehensive, secure, and user-friendly utility platform 
              on the web, allowing you to focus on what matters most—your work.
            </p>
          </div>
          
          <div className={`${styles.glassCard} animate-fade-in`}>
            <h2 className="futuristic">Credits</h2>
            <p>
              This platform is developed and maintained by <strong>Talal Ahmad</strong>. 
              Visit his official website for more information and projects.
            </p>
            <div style={{ marginTop: '24px' }}>
              <Link href="https://tools.mtcore.xyz" target="_blank" rel="noopener noreferrer">
                <Button variant="outline">Visit Talal Ahmad</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
