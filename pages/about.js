import React from 'react';
import App, { Container } from 'next/app'

export default class extends Container {
  static async getInitialProps() {

  }
  render() {
    return (
        <div>
          About
        </div>
    )
  }
}
