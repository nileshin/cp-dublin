import React, { Component } from 'react';
import { graphql } from 'gatsby';

class CTATiles extends Component {
  render() {
    const { ctaTiles } = this.props;
    return (
      <div>
        CTA Tiles
        <pre>
          <code>{JSON.stringify(ctaTiles, null, 1)}</code>
        </pre>
      </div>
    );
  }
}

export default CTATiles;

export const ctaTileFragment = graphql`
  fragment CTATileFragment on ctaTiles_8 {
    left_cta {
      headline
      cta {
        title
        url
        target
      }
      image {
        ...WpMediaFragment
      }
    }
    right_cta {
      headline
      cta {
        title
        url
        target
      }
      image {
        ...WpMediaFragment
      }
    }
  }
`;
