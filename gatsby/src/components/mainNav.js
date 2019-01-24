import React, { Component } from 'react';
import Menu from './menu';

class MainNav extends Component {
  render() {
    return (
      <nav>
        <Menu menuName="main-menu" />
      </nav>
    );
  }
}

export default MainNav;
