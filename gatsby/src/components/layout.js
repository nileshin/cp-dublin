import React, { Component } from 'react';
import MainNav from "./main-nav";
import Footer from './footer';

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