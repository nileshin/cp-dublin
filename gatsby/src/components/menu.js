import React, { Component } from 'react';
import { StaticQuery, graphql } from 'gatsby';

export const defaultMenuRender = data => {
  const { menu } = data;
  return (
    <ul>
      {menu.map(nav_item => (
        <li className={nav_item.classes.join(' ')} key={nav_item.ID}>
          <a href={nav_item.url}>{nav_item.title}</a>
        </li>
      ))}
    </ul>
  );
}

class Menu extends Component {
  render() {
    const { menuName = 'main-menu', render, children } = this.props;
    const renderFunc = render || children;
    return (
      <StaticQuery
        query={graphql`
          query MenuQuery {
            allWordpressCpMenus {
              edges {
                node {
                  id
                  menu_name
                  menu {
                    title
                    url
                    classes
                  }
                }
              }
            }
          }
        `}
        render={data => {
          const {
            allWordpressCpMenus: { edges },
          } = data;
          const menu = edges.find(m => m.node.menu_name === menuName);
          return typeof renderFunc === 'function' ? renderFunc(menu.node) : defaultMenuRender(menu.node);
        }}
      />
    );
  }
}

export default Menu;
