import React, { Component } from 'react';
import { Link } from 'gatsby';
import Menu from '../../components/menu';

import './main.scss';
import $ from 'jquery';
import '../_global/js/vendor/menu';

import ConnellyLogo from '../_global/images/logo.svg';
import { ReactComponent as LinkedinLogo } from '../_global/images/social-linkedin.svg';
import { ReactComponent as InstaLogo } from '../_global/images/social-ig.svg';
import { ReactComponent as TwitterLogo } from '../_global/images/social-twitter.svg';
import { ReactComponent as FacebookLogo } from '../_global/images/social-fb.svg';

const SOCIAL_LOGOS = {
  instagram: InstaLogo,
  twitter: TwitterLogo,
  facebook: FacebookLogo,
  linkedin: LinkedinLogo
}

const mainNavRender = (menuData, optionsData) => {
  const { menu } = menuData;
  const [ node ] = optionsData;
  const { node:{options} } = node;
  
  return (
    <header className="site-header">
      <div className="logo">
        <Link to="/" title="Connelly Partners">
          <img src={ConnellyLogo} alt="Connelly Partners" />
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
          {
            options.social_menu.map(({social_media_network:network, link}) => {
              const NetworkLogo = SOCIAL_LOGOS[network]
              return (
                <li key={network}>
                  <a href={link.url} title={network} target={link.target || "_blank"} rel="noopener noreferrer">
                    {NetworkLogo ? <NetworkLogo /> : network}
                  </a>
                </li>
              )
            }) 
          }
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
    return <Menu menuName="main-menu" render={mainNavRender} />;
  }
}

export default MainNav;
