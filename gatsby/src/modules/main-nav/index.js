import React, { Component } from 'react';
import { Link } from 'gatsby';
import Menu from '../../components/menu';

import './main.scss';
import $ from 'jquery';
import '../_global/js/vendor/menu';

import { ReactComponent as ConnellyLogo} from '../_global/images/logo.svg';
import { ReactComponent as LinkedinLogo } from '../_global/images/social-linkedin.svg';
import { ReactComponent as InstaLogo } from '../_global/images/social-ig.svg';
import { ReactComponent as TwitterLogo } from '../_global/images/social-twitter.svg';
import { ReactComponent as FacebookLogo } from '../_global/images/social-fb.svg';

const mainNavRender = data => {
  const { menu } = data;
  return (
    <header className="site-header">
      <div className="logo">
        <Link to="/" title="Connelly Partners">
          <ConnellyLogo />
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
      <div className="social">
        <span className="follow">Follow us</span>
        <ul>
          <li>
            <a href="http://linkedin.com" title="Linkedin" target="_blank" rel="noopener noreferrer">
              <LinkedinLogo />
            </a>
          </li>
          <li>
            <a href="http://instagram.com" title="Instagram" target="_blank" rel="noopener noreferrer">
              <InstaLogo />
            </a>
          </li>
          <li>
            <a href="http://twitter.com" title="Twitter" target="_blank" rel="noopener noreferrer">
              <TwitterLogo />
            </a>
          </li>
          <li>
            <a href="http://facebook.com" title="Facebook" target="_blank" rel="noopener noreferrer">
              <FacebookLogo />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

class MainNav extends Component {
  componentDidMount() {
    $('.main-navigation').responsiveMenu({
      menuslide_overlap: true,
    });
  }
  render() {
    return (
      <nav>
        <Menu menuName="main-menu" render={mainNavRender} />
      </nav>
    );
  }
}

export default MainNav;
