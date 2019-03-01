import React, { Component } from 'react';
import MainNav from '../modules/main-nav';
import Footer from '../modules/footer';
import Helmet from 'react-helmet';
import '../modules/_global/scss/global.scss';

class Layout extends Component {
  render() {
    return (
      <>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="https://cloud.typography.com/6014912/7241012/css/fonts.css" />
        </Helmet>
        <MainNav />
        <main>{this.props.children}</main>
        <Footer />
      </>
    );
  }
}

export default Layout;
