import React, { Component } from 'react';
import { graphql } from 'gatsby';

class WorkDetailIntro extends Component {
  render() {
    return (
      <div style={{ border: 'solid 1px #bada55' }}>
        Work Detail Intro
        <pre>
          <code>{JSON.stringify(this.props, null, 1)}</code>
        </pre>
      </div>
    );
  }
}

export default WorkDetailIntro;

export const workDetailIntroFragment = graphql`
  fragment WorkDetailIntroFragment on workDetailIntro_5 {
    title
    body_copy
    image {
      ...WpMediaFragment
    }
  }
`;
