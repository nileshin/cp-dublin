import React, { Component } from 'react';
import { graphql } from 'gatsby';

class StatLongFactRow extends Component {
  render() {
    return (
      <div style={{border:"solid 1px #700bff"}}>
        Stat Long Fact Row
        <pre><code>{JSON.stringify(this.props, null, 1)}</code></pre>
      </div>
    );
  }
}

export default StatLongFactRow;

export const statLongFactRowFragment = graphql`
  fragment StatLongFactRowFragment on statLongFactRow_5 {
    statistic {
      stat_title
      stat_number_unit
    }
    fact {
      fact_title
      fact_content {
        fact_text
      }
    }
  }
`