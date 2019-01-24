import React, { Component } from 'react';
import { graphql } from 'gatsby';

class PressModule extends Component {
  render() {
    return (
      <div>
        Press Module 
        <pre><code>{JSON.stringify(this.props, null, 1)}</code></pre>
      </div>
    );
  }
}

export default PressModule;

export const pressModuleFragment = graphql`
  fragment PressModuleFragment on pressModule_2 {
    eyebrow
    title
    cta {
      title
      url
      target
    }
    image {
      alt_text
      localFile {
        childImageSharp {
          original {
            src
          }
        }
      }
    }
  }
`