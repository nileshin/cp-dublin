import React, { Component } from 'react';
import { graphql } from 'gatsby';

class ContentTileWithSideImage extends Component {
  render() {
    return (
      <div>
        Content Tile With Side Image
        <pre><code>{JSON.stringify(this.props, null, 1)}</code></pre>
      </div>
    );
  }
}

export default ContentTileWithSideImage;

export const contentTileWithSideImageFragment = graphql`
  fragment ContentTileWithSideImageFragment on contentTileWSideImage_8 {
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
`