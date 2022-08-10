import { GetStaticProps } from "next";
import { SubscribeButton } from "../components/SubscribeButton";

import styles from "./home.module.scss";
import { stripe } from "../services/stripe";
import { Container } from "../components/Container";

interface GetProductProps {
  priceId: string;
  amount: number;
}

interface ProductsProps {
  product: GetProductProps;
}

export default function Home({ product }: ProductsProps) {
  return (
    <>
      <Container>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about the <span>React</span>World
          </h1>
          <p>
            Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros.
            <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1JcqYFFpaRpHBQOUkAMNRD3v");
  const product = {
    priceId: price.id,
    amount:
      price.unit_amount &&
      Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 10, //10s
  };
};

/* export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve("price_1JcqYFFpaRpHBQOUkAMNRD3v");

     const price = await stripe.prices.retrieve("price_1JcqYFFpaRpHBQOUkAMNRD3v", {
    expand: ["product"],
  }); 

  const product = {
    //name: price.product,
    priceId: price.id,
    amount:
      price.unit_amount &&
      Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
  };
}; */
