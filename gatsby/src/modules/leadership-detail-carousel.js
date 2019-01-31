import React, { Component } from 'react';
import { graphql } from 'gatsby';

class LeadershipDetailCarousel extends Component {
  render() {
    return (
      <div>
        LeadershipDetailCarousel
        <pre><code>{JSON.stringify(this.props, null, 1)}</code></pre>
      </div>
    );
  }
}

export default LeadershipDetailCarousel;

export const leadershipDetailCarouselFragment = graphql`
  fragment LeadershipDetailCarouselFragment on leadershipDetailCarousel_8 {
    leadership_slides {
      name
      title
      quote
      body_copy
      tenure
      image {
        ...WpMediaFragment
      }
    }
  }
`