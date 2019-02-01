import React, { Component } from 'react';
import { graphql } from 'gatsby';
import './main.scss';

class HomeHeader extends Component {
  render() {
    const { headline, headline_2, supportive_copy, cta, image } = this.props;
    return (
      // <div>
      //   <h3>{headline}</h3>
      //   <h4>{headline_2}</h4>
      //   <p dangerouslySetInnerHTML={{__html:supportive_copy}}></p>
      //   <a href={cta.url} target={cta.target}>{cta.title}</a>
      //   <img src={image.localFile.childImageSharp.original.src} alt={image.alt_text} />
      // </div>
      <section class="home-banner page-sec">
        <div class="container">
          <div class="row">
            <div class="col-md-6 order-md-2">
              <div class="home-banner-img">
                <figure>
                  <img
                    src={image.localFile.childImageSharp.original.src}
                    alt="home-banner"
                  />
                </figure>
              </div>
            </div>
            <div class="col-md-6">
              <div class="home-content">
                <h1>
                  <span>{headline}</span> {headline_2}
                  <span class="highlight">.</span>
                </h1>
                <p>{supportive_copy}</p>
                <a
                  href={cta.url}
                  title={cta.title}
                  class="cta"
                  target={cta.target}
                >
                  {cta.title}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
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
      ...WpMediaFragment
    }
  }
`;
