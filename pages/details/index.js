import Head from 'next/head'
import styles from '../../styles/Home.module.css'

export default function Details() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Used Cars for</title>
        <meta name="description" content="Used car for sale" />
        <link rel="icon" href="/favicon_io.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          cars
        </h1>
      </main>

      <footer className={styles.footer}>
        
      </footer>
    </div>
  )
}
