import { Fragment } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import '../node_modules/bootstrap/scss/bootstrap.scss';
import "./global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <title>FooWiki</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
