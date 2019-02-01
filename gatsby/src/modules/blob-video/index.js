import React, { Component } from 'react';
import { graphql } from 'gatsby';

class BlobVideo extends Component {
  render() {
    return (
      <div>
        BlobVideo
        <pre><code>{JSON.stringify(this.props, null, 1)}</code></pre>
      </div>
    );
  }
}

export default BlobVideo;

export const blobVideoFragment = graphql`
  fragment BlobVideoFragment on blobVideo_8 {
    video_embed_code
    eyebrow
    headline
    supportive_text
    video_thumbnail {
      ...WpMediaFragment
    }
  }
`;