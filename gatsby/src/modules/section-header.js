import React, { Component } from 'react';
import { graphql } from 'gatsby';

class SectionHeader extends Component {
  render() {
    return (
      <div>
        SectionHeader
        <pre><code>{JSON.stringify(this.props, null, 1)}</code></pre>
      </div>
    );
  }
}

export default SectionHeader;

export const sectionHeaderFragment = graphql`
  fragment SectionHeaderLeadershipFragment on sectionHeader_7 {
    title
    subtitle
    body_copy
  }
  fragment SectionHeaderGridFragment on sectionHeader_8 {
    title
    subtitle
    body_copy
  }
`