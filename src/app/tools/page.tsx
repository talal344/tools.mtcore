import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { tools } from '@/config/tools';
import styles from './page.module.css';
import ToolLibrary from '@/components/tools/ToolLibrary';

export default function ToolsPage() {
  return (
    <main className={styles.main}>
      <Navbar />
      
      <header className={styles.header}>
        <div className="container">
          <h1 className={`${styles.title} animate-fade-in`}>All <span className="text-gradient">Power Tools</span></h1>
          <p className={`${styles.subtitle} animate-fade-in`}>
            Our complete suite of professional PDF and data processing utilities. 
            High-performance, secure, and fast.
          </p>
        </div>
      </header>
      
      <section className={styles.gridSection}>
        <div className="container">
          <ToolLibrary tools={tools.filter(t => !t.isAi)} />
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
