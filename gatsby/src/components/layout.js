import React, { Component } from 'react';
import MainNav from '../modules/main-nav';
import Footer from '../modules/footer';
import Helmet from 'react-helmet';
import CookieConsent from "react-cookie-consent";
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
        <CookieConsent
          location="bottom"
          buttonText="Agreed"
          buttonStyle={{ backgroundColor: "#B18925"}}
          cookieName="ConnellyPartners"
        >
          By continuing to use this site without changing your settings, you agree to the use of cookies in accordance with our <a href='/cookie-policy/'>Cookie Policy</a>.
        </CookieConsent>
      </>
    );
  }
}

export default Layout;
