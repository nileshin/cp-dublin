import React, { Component } from 'react';
import { graphql } from 'gatsby';

class CapabilitiesTiles extends Component {
  render() {
    return (
      <div>
        Capabilities Tiles
        <pre><code>{JSON.stringify(this.props, null, 1)}</code></pre>
      </div>
    );
  }
}

export default CapabilitiesTiles;

export const capabilitiesTilesFragment = graphql`
  fragment CapabilitiesTilesFragment on capabilitiesTiles_8 {
    title
    services_and_capabilities_pdf {
      url {
        localFile {
          publicURL
        }
      }
    }
    capabilities {
      name
      sub_capabilities
      leadership_quote
      leadership_title
      leadership_name
      image {
        ...WpMediaFragment
      }
    }
  }
`