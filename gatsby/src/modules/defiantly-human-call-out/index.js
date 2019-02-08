import React, { Component } from 'react';
import { graphql } from 'gatsby';

class DefiantlyHumanCallOut extends Component {
  render() {
    return (
      <div>
        Defiantly Human Call Out
        <pre><code>{JSON.stringify(this.props, null, 1)}</code></pre>
      </div>
    );
  }
}

export default DefiantlyHumanCallOut;

export const defiantlyHumanCallOutFragment = graphql`
  fragment DefiantlyHumanCallOutFragment on defiantlyHumanCallOut_8 {
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
`