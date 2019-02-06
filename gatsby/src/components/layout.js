import React, { Component } from 'react';
import MainNav from "../modules/main-nav";
import Footer from './footer';
import "../modules/_global/scss/global.scss";
import SEO from './seo';

class Layout extends Component {
  render() {
    return (
      <>
        <SEO {...this.props.data.wordpressPage.yoast_meta} {...this.props.data.wordpressPage.cp_meta.yoast_social}/>
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