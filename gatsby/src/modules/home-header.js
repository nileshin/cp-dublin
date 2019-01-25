import React, { Component } from 'react';
import { graphql } from 'gatsby';

class HomeHeader extends Component {
  render() {
    const { headline, headline_2, supportive_copy, cta, image } = this.props;
    return (
      <div>
        <h3>{headline}</h3>
        <h4>{headline_2}</h4>
        <p dangerouslySetInnerHTML={{__html:supportive_copy}}></p>
        <a href={cta.url} target={cta.target}>{cta.title}</a>
        <img src={image.localFile.childImageSharp.original.src} alt={image.alt_text} />
      </div>
    );
  }
}

export default HomeHeader;

// this fragment works within the `acf` object on a post
export const homeHeaderFragment = graphql`
  fragment HomeHeaderFragment on homeHeader_8 {
    headline
    headline_2
    supportive_copy
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
`;