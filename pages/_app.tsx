import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Orders } from "../state/orders/Orders";
import { Products } from "../state/products/Products";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Orders>
    <Products>
      <Component {...pageProps} />
    </Products>
  </Orders>
);

export default MyApp;
