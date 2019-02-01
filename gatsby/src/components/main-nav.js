import React, { Component } from 'react';
import { Link } from 'gatsby';
import Menu from './menu';
import cp_logo from '../modules/_global/images/logo.svg';
import '../modules/_global/js/vendor/menu';
import '../modules/_global/js/global';

const mainNavRender = data => {
  const { menu } = data;
  return (
    <header className="site-header">
      <div className="logo">
        <Link to="/" title="Connelly Partners">
          <img src={cp_logo} alt="Connelly Partners" />
        </Link>
      </div>
      <nav className="main-navigation">
        <ul className="primary-menu">
          {menu.map(nav_item => (
            <li
              className={nav_item.classes.join(' ')}
              key={nav_item.wordpress_id}
            >
              {nav_item.post_object && nav_item.type !== 'custom' ? (
                <Link to={nav_item.url}>{nav_item.title}</Link>
              ) : (
                <a href={nav_item.url} title={nav_item.title}>
                  {nav_item.title}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

class MainNav extends Component {
  render() {
    return (
      <nav>
        <Menu menuName="main-menu" render={mainNavRender} />
      </nav>
    );
  }
}

export default MainNav;
