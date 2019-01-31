import React, { Component } from 'react';
import { graphql } from 'gatsby';

class ImageTextPairing extends Component {
  render() {
    return (
      <div>
        Image Text Pairing
        <pre><code>{JSON.stringify(this.props, null, 1)}</code></pre>
      </div>
    );
  }
}

export default ImageTextPairing;

export const imageTextPairingFragment = graphql`
  fragment ImageTextPairingBostonFragment on imageTextPairing_11 {
    headline
    flag
    supportive_text
    image {
      ...WpMediaFragment
    }
  }
  fragment ImageTextPairingDublinFragment on imageTextPairing_12 {
    headline
    flag
    supportive_text
    image {
      ...WpMediaFragment
    }
  }
`;