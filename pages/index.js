import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Search from '@/components/Search'
import AllNews from '../components/AllNews'
import Earnings from '@/components/Earnings'

export default function Home() {
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    setHasError(true)
    window.alert('Too many requests, please wait a minute and try again.')
  }

  return (
    <>
      <Head>
        <title>Investadoodle</title>
        <meta name='description' content='Investadoodle' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/chart-line-up.svg' />
      </Head>
      <main>
        <div>
          <Search onError={handleError} />
          <Earnings />
          <AllNews />
        </div>
      </main>
    </>
  )
}
