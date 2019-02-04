import React, { Component } from 'react';
import MainNav from "../modules/main-nav";
import Footer from './footer';
import "../modules/_global/scss/global.scss";

class Layout extends Component {
  render() {
    return (
      <>
        <header>
          <MainNav />
        </header>
        <main>
          {this.props.children}
        </main>
        <Footer />
      </>
    );
  }
}

export default Layout;