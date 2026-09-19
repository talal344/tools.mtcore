import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { tools } from '@/config/tools';
import styles from '../tools/page.module.css';
import Card from '@/components/shared/Card';

export default function AiToolsPage() {
  const aiTools = tools.filter(tool => tool.isAi);

  return (
    <main className={styles.main}>
      <Navbar />
      
      <header className={styles.header}>
        <div className="container">
          <h1 className={`${styles.title} animate-fade-in`}>Exclusive <span className="text-gradient">AI Tools</span></h1>
          <p className={`${styles.subtitle} animate-fade-in`}>
            Unlock the power of Artificial Intelligence to automate your workflows. 
            High-intelligence solutions for complex data tasks.
          </p>
        </div>
      </header>
      
      <section className={styles.gridSection}>
        <div className="container">
          <div className={styles.grid}>
            {aiTools.map((tool) => (
              <div key={tool.id} className="animate-fade-in">
                <Card
                  title={tool.name}
                  description={tool.description}
                  icon={tool.icon}
                  href={`/tools/${tool.slug}`}
                  category={tool.category}
                  popular={tool.popular}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
