import React, { Component } from 'react';
import Menu from './menu';

class Footer extends Component {
  render() {
    return (
      <footer>
        <h2>Footer</h2>
        <Menu menuName="footer-menu" />
      </footer>
    );
  }
}

export default Footer;
