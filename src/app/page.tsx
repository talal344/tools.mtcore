import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedTools from '@/components/home/FeaturedTools';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      
      <Hero />
      
      <FeaturedTools />
      
      {/* Benefits Section */}
      <section className={styles.benefits}>
        <div className="container">
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <h3 className="futuristic">Ultra Fast</h3>
              <p>Process your files in seconds with our optimized cloud infrastructure.</p>
            </div>
            <div className={styles.benefitCard}>
              <h3 className="futuristic">Secure</h3>
              <p>Your data is encrypted and deleted immediately after processing.</p>
            </div>
            <div className={styles.benefitCard}>
              <h3 className="futuristic">Scalable</h3>
              <p>Built on a platform that grows with your business needs.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Placeholder */}
      <section className={styles.testimonials}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Trusted by <span className="text-gradient">Industry Experts</span></h2>
          <div className={styles.testimonialContainer}>
            <p className={styles.placeholderText}>&quot;UltraTools has transformed our EDI workflow. The speed and precision are unmatched.&quot;</p>
            <span className={styles.author}>— Placeholder Client</span>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
