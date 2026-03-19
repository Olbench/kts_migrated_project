import type { Metadata } from 'next'

import styles from './page.module.scss'

export const metadata: Metadata = {
  title: 'About us | Lalasia',
}

export default function AboutUsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.kicker}>About us</p>
          <h1 className={styles.title}>Lalasia — your everyday e‑commerce store for quality essentials</h1>
          <p className={styles.subtitle}>
            We curate products for daily life — from home and lifestyle to tech accessories and
            personal care. Thoughtful picks, fair prices, and fast delivery.
          </p>
        </div>
        <div className={styles.heroLogo} aria-hidden="true">
          <img className={styles.logoImage} src="/icons/logo.svg" alt="" />
        </div>
      </section>

      <section className={styles.stats}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>2017</span>
          <span className={styles.statLabel}>year founded</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>12 000+</span>
          <span className={styles.statLabel}>orders delivered</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>48 h</span>
          <span className={styles.statLabel}>dispatch window</span>
        </div>
      </section>

      <section className={styles.location}>
        <h2 className={styles.sectionTitle}>Based in Berlin</h2>
        <p className={styles.text}>
          Our team works from Berlin and ships across Europe. Visit us at:\n          <strong>Alexandinenstraße 27, 10969 Berlin, Germany</strong>
        </p>
        <div className={styles.map}>
          <iframe
            title="Lalasia Berlin office"
            src="https://www.google.com/maps?q=Alexandinenstraße%2027,%2010969%20Berlin&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>
    </div>
  )
}
