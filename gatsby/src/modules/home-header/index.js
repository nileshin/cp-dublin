import React, { Component } from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import './main.scss';

class HomeHeader extends Component {
  render() {
    const { headline, headline_2, supportive_copy, cta, image } = this.props;
    return (
      <section className="home-banner page-sec">
        <div className="container">
          <div className="row">
            <div className="col-md-6 order-md-2">
              <div className="home-banner-img">
                <figure>
                  <Img
                    fluid={image.localFile.childImageSharp.fluid}
                    alt="home-banner"
                  />
                </figure>
              </div>
            </div>
            <div className="col-md-6">
              <div className="home-content">
                <h1>
                  <span>{headline}</span> {headline_2.replace(/\.$/, '')}
                  <span className="highlight">.</span>
                </h1>
                <p>{supportive_copy}</p>
                {cta &&
                  (cta.url.search(/https?:\/\//) >= 0 ? (
                    <a
                      href={cta.url}
                      target={cta.target}
                      title={cta.title}
                      clasName="cta"
                    >
                      {cta.title}
                    </a>
                  ) : (
                    <Link
                      to={cta.url}
                      title={cta.title}
                      className="cta"
                      target={cta.target}
                    >
                      {cta.title}
                    </Link>
                  ))}
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
      ...WpMediaFragmentFluid
    }
  }
`;
