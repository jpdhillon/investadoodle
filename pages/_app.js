import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import styles from '@/styles/Layout.module.css'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.mainContent}>
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  )
}
