import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import { abortRequest, actionTypes, initStore } from '../store';
import Layout from '../components/layout';

class AppContainer extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps;
    ctx.store.dispatch({ type: actionTypes.SHOW_LOADING });

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    } else {
      pageProps = {};
    }

    ctx.store.dispatch({ type: actionTypes.HIDE_LOADING });

    return {
      pageProps
    }
  }

  render() {
    const { Component, pageProps, store, abortRequest } = this.props;
    return (
        <Container>
          <Provider store={store}>
            <Layout>
              <Component {...pageProps}/>
            </Layout>
          </Provider>
        </Container>
    )
  }
}

export default withRedux(initStore)(AppContainer);
