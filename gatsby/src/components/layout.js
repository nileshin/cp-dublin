import React, { Component } from 'react';
import MainNav from '../modules/main-nav';
import Footer from '../modules/footer';
import '../modules/_global/scss/global.scss';

class Layout extends Component {
  render() {
    return (
      <>
        <MainNav />
        <main>{this.props.children}</main>
        <Footer />
      </>
    );
  }
}

export default Layout;
