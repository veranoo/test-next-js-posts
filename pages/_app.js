import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import { actionTypes, initStore } from '../store';
import Layout from '../components/layout';

class AppContainer extends App {
  static async getInitialProps({ Component, ctx }) {
    ctx.store.dispatch({ type: actionTypes.SHOW_LOADING });
    const pageProps = (Component.getInitialProps) ? await Component.getInitialProps(ctx) : {}
    ctx.store.dispatch({ type: actionTypes.HIDE_LOADING });

    return { pageProps }
  }

  render() {
    const { Component, pageProps, store } = this.props;
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
