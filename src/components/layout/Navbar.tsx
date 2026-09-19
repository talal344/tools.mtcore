import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';
import Button from '../shared/Button';
import ToolSearch from '../tools/ToolSearch';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={`${styles.container} container`}>
        <Link href="/" className={styles.logo}>
          <span className="futuristic">TOOLS</span>
          <span className={styles.logoDot}>.</span>
          <span>MTCORE</span>
        </Link>

        <div className={styles.searchWrapper}>
          <ToolSearch />
        </div>
        
        <div className={styles.links}>
          <Link href="/" className={styles.link}>Home</Link>
          <Link href="/tools" className={styles.link}>Tools</Link>
          <Link href="/ai-tools" className={styles.link}>AI Tools</Link>
          <Link href="/about" className={styles.link}>About</Link>
          <Link href="/contact" className={styles.link}>Contact</Link>
        </div>
        
        <div className={styles.actions}>
          <Link href="/tools">
            <Button variant="outline" size="sm">Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
