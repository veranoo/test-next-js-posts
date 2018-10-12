// ./pages/_document.js
import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet, injectGlobal } from 'styled-components'

injectGlobal`
  html {
    font-size: 12px;
  }
  body {
    font-family: "Merriweather", serif;
    font-size: 1.6em;
    line-height: 1.6;
  }
`;

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const sheet = new ServerStyleSheet();
    const page = ctx.renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return { ...initialProps, ...page, styleTags }
  }

  render() {
    const { title } = this.props.__NEXT_DATA__.props.initialState;
    return (
        <html>
        <Head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
          {this.props.styleTags}
          <title>{title}</title>
        </Head>
        <body style={{ margin: 0, fontFamily: 'Roboto' }}>
        <Main/>
        <NextScript/>
        </body>
        </html>
    )
  }
}

export default MyDocument;
