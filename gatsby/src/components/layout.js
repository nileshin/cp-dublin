import React, { Component } from 'react';
import MainNav from '../modules/main-nav';
import Footer from '../modules/footer';
import Helmet from 'react-helmet';
import objectFitImages from 'object-fit-images';
import '../modules/_global/scss/global.scss';

class Layout extends Component {
  componentDidMount() {
    if (typeof window === 'undefined') return;

    if (typeof objectFitImages === 'function') {
      objectFitImages();
    } else {
      console.log('objectFitImages is not a function', objectFitImages);
    }
  }
  render() {
    return (
      <>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="https://cloud.typography.com/6014912/7241012/css/fonts.css" />
          <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.22.0/polyfill.js"></script>
        </Helmet>
        <MainNav />
        <main>{this.props.children}</main>
        <Footer />
      </>
    );
  }
}

export default Layout;
