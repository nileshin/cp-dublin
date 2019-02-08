import React, { Component } from 'react';
import { graphql } from 'gatsby';

class StatRow extends Component {
  render() {
    return (
      <div>
        StatRow
        <pre><code>{JSON.stringify(this.props, null, 1)}</code></pre>
      </div>
    );
  }
}

export default StatRow;

export const statRow = graphql`
  fragment StatRowFragment on statRow_8 {
    stats {
      stat_title
      stat_number
    }
  }
`