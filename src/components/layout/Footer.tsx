import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} container`}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span className="futuristic">TOOLS</span>
              <span className={styles.logoDot}>.</span>
              <span>MTCORE</span>
            </Link>
            <p className={styles.tagline}>
              Premium utility tools for modern professionals. fast, secure, and always free.
            </p>
          </div>
          
          <div className={styles.section}>
            <h4 className={styles.heading}>Tools</h4>
            <Link href="/tools" className={styles.link}>PDF to Image</Link>
            <Link href="/tools" className={styles.link}>PDF Merger</Link>
            <Link href="/tools" className={styles.link}>Excel to HCFA</Link>
            <Link href="/tools" className={styles.link}>EDI 835 to PDF</Link>
          </div>
          
          <div className={styles.section}>
            <h4 className={styles.heading}>Company</h4>
            <Link href="/about" className={styles.link}>About Us</Link>
            <Link href="/contact" className={styles.link}>Contact</Link>
            <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} Tools.MTCore. All rights reserved.</p>
          <div className={styles.socials}>
            {/* Social icons placeholders */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
