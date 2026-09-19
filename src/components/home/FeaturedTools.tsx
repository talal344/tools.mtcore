import React from 'react';
import styles from './FeaturedTools.module.css';
import Card from '../shared/Card';
import { tools } from '@/config/tools';

const FeaturedTools = () => {
  const featured = tools.filter(tool => tool.popular).slice(0, 3);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Featured <span className="text-gradient">Power Tools</span></h2>
          <p className={styles.subtitle}>Our most popular tools, designed for maximum efficiency and speed.</p>
        </div>
        
        <div className={styles.grid}>
          {featured.map((tool) => (
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
  );
};

export default FeaturedTools;
