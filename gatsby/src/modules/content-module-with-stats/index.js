import React, { Component } from 'react';
import { graphql } from 'gatsby';

class ContentModuleWithStats extends Component {
  render() {
    return (
      <div>
        ContentModuleWithStats
        <pre><code>{JSON.stringify(this.props, null, 1)}</code></pre>
      </div>
    );
  }
}

export default ContentModuleWithStats;

export const contentModuleWithStatsFragment = graphql`
  fragment ContentModuleWithStatsFragment on contentModuleWithStats_8 {
    eyebrow
    title
    description
    statistics {
      stat_title
      stat_number
    }
  }
`