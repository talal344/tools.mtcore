import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/shared/Button';
import styles from './page.module.css';

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <Navbar />
      
      <header className={styles.header}>
        <div className="container">
          <h1 className={`${styles.title} animate-fade-in`}>Get in <span className="text-gradient">Touch</span></h1>
          <p className={`${styles.subtitle} animate-fade-in`}>
            Have questions or feedback? We&apos;d love to hear from you. 
            Our team is dedicated to providing the best utility tools on the market.
          </p>
        </div>
      </header>
      
      <section className={styles.contactSection}>
        <div className={`${styles.grid} container`}>
          <div className={`${styles.formCard} animate-fade-in`}>
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" placeholder="John Doe" className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="john@example.com" className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea id="message" rows={5} placeholder="How can we help you?" className={styles.textarea}></textarea>
              </div>
              <Button size="lg" className={styles.submitBtn}>Send Message</Button>
            </form>
          </div>
          
          <div className={styles.infoCol}>
            <div className={`${styles.infoCard} animate-fade-in`}>
              <h3 className="futuristic">Support</h3>
              <p>support@ultratools.com</p>
            </div>
            <div className={`${styles.infoCard} animate-fade-in`}>
              <h3 className="futuristic">Partnerships</h3>
              <p>partners@ultratools.com</p>
            </div>
            <div className={`${styles.infoCard} animate-fade-in`}>
              <h2 className="futuristic">Business Hours</h2>
              <p className={styles.muted}>Monday - Friday: 9am - 5pm EST</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
