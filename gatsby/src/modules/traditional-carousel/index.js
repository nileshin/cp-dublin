import React, { Component } from 'react';
import { graphql } from 'gatsby';

class TraditionalCarousel extends Component {
  render() {
    return (
      <div style={{border:"solid 1px #ffb700"}}>
        Traditional Carousel
        <pre><code>{JSON.stringify(this.props, null, 1)}</code></pre>
      </div>
    );
  }
}

export default TraditionalCarousel;

export const traditionalCarouselFragment = graphql`
  fragment TraditionalCarouselFragment on traditionalCarousel_4 {
    slides {
      video__image
      video {
        video_embed_code
        video_thumbnail {
          ...WpMediaFragment
        }
      }
      image {
        ...WpMediaFragment
      }
    }
  }
`