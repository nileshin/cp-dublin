import React, { Component } from 'react';
import { graphql } from 'gatsby';

class ContentTile extends Component {
  render() {
    return (
      <div>
        Content Tile Module
        <pre><code>{JSON.stringify(this.props, null, 1)}</code></pre>
      </div>
    );
  }
}

export default ContentTile;

export const contentTileFragment = graphql`
  fragment ContentTileFragment on contentTile_2 {
    eyebrow
    headline
    supportive_text
    cta {
      title
      url
      target
    }
    image {
      ...WpMediaFragment
    }
  }
`;