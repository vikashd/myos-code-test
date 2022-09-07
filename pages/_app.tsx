import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Orders } from "../state/orders/Orders";
import { Products } from "../state/products/Products";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Orders>
      <Products>
        <Component {...pageProps} />
      </Products>
    </Orders>
  </>
);

export default MyApp;
