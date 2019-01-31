import React, { Component } from 'react';
import { graphql } from 'gatsby';

class LogoGrid extends Component {
  render() {
    return (
      <div>
        Logo Grid
        <pre><code>{JSON.stringify(this.props, null, 1)}</code></pre>
      </div>
    );
  }
}

export default LogoGrid;

// NB: need to also get publicURL because svg's aren't processed by ImageSharp. If we have an .svg in ext, just use that url
export const logoGridFragment = graphql`
  fragment LogoGridFragment on logoGrid_8 {
    logos {
      url {
        localFile {
          publicURL
          ext
        }
        ...WpMediaFragment
      }
    }
  }
`