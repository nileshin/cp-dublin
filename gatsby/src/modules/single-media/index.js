import React, { Component } from 'react';
import { graphql } from 'gatsby';

class SingleMedia extends Component {
  render() {
    return (
      <div style={{border:"solid 1px red"}}>
        Single Media
        <pre><code>{JSON.stringify(this.props, null, 1)}</code></pre>
      </div>
    );
  }
}

export default SingleMedia;

export const singleMediaFragment = graphql`
  fragment SingleMediaFragment on singleMedia_5 {
    video__image
    video {
      video_embed_code
      video_thumbnail {
        ...WpMediaFragment
      }
    }
    image {
      ...WpMediaFragment
    }
  }
`;
