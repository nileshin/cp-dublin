import React, { Component } from 'react';
import { graphql } from 'gatsby';

class QuoteBlobVideoModule extends Component {
  render() {
    return (
      <div>
        Quote Blob Video Module
        <pre><code>{JSON.stringify(this.props, null, 1)}</code></pre>
      </div>
    );
  }
}

export default QuoteBlobVideoModule;

export const quoteBlobVideoModuleFragment = graphql`
  fragment QuoteBlobVideoModuleFragment on quoteBlobVideoModule_8 {
    video_embed_code
    eyebrow
    quote
    author
    author_title
    supportive_copy
    thumbnail {
      ...WpMediaFragment
    }
  }
`