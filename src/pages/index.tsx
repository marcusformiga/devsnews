import Head from 'next/head'
import { SubscribeBtn } from './components/SubscribeBtn';
import styles from "./home.module.scss"
import { GetStaticProps } from "next"
import { stripe } from '../services/stripe';


interface HomeProps {
  product: {
    priceId: string
    amount: number
  }
}
export default function Home({product}: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | Ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>Olá, Bem vindo</span>
          <h2>Essa é uma newsletter sobre o mundo da tecnologia</h2>
          <p>Tenha acesso as noticias mais quentes pagando um valor de:</p><br />
          <span>R$ {product.amount} a cada trimestre</span>
          <SubscribeBtn priceId={product.priceId}/>
        </section>
        <img src="/images/avatar.svg" alt="garota codando" className={styles.logoGirl} />
        
      </main>
      
    </>
    
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price =  await stripe.prices.retrieve("price_1JnpYiAHtfowqU82iNqujlup", {
    expand: ["product"]
  });
  const product = {
    priceId: price.id,
    amount: (price.unit_amount / 100),
  }
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24 // 24 horas
  }
}