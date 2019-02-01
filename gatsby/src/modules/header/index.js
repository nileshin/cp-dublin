import React, { Component } from 'react';
import { graphql } from 'gatsby';

class Header extends Component {
  render() {
    return (
      <div>
        Header
        <pre><code>{JSON.stringify(this.props, null, 1)}</code></pre>
      </div>
    );
  }
}

export default Header;

export const headerFragment = graphql`
  fragment HeaderFragment on header_8 {
    page_name
    image {
      ...WpMediaFragment
    }
  }
`