/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-document-import-in-page */
import { GetServerSideProps } from 'next'
import type { NextPage } from 'next'
import { SubscribeButton } from '../components/SubscribeButton'

import styles from './home.module.scss'
import { stripe } from '../services/stripe'

const Home: NextPage = () => {
  return (
    <>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span>World</h1>
          <p>
            Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros.<br />
            <span>for $9.90 month</span>
          </p>
          <SubscribeButton />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}
export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1JcqYFFpaRpHBQOUkAMNRD3v', {
    expand: ['product']
  })
  return {
    props: {
      name: 'Luciano',
    }
  }
}