import React, { Component } from 'react';
import { Link, graphql } from 'gatsby';
import { Transition } from 'react-transition-group';
import Img from 'gatsby-image';
import './main.scss';

const ANIMATION_TIME = 200;

class HomeHeader extends Component {
  state = {
    headerActivated: false,
  };
  componentDidMount() {
    if (typeof window === 'undefined') return;

    setTimeout(() => {
      this.setState(state => ({
        ...state,
        headerActivated: true,
      }));
    }, 300);
  }
  render() {
    const { headline, headline_2, supportive_copy, cta, image } = this.props;
    const { headerActivated } = this.state;
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
              <Transition
                in={headerActivated}
                timeout={ANIMATION_TIME}
              >
                {headerState => (
                  <div className={`home-content ${headerState}`}>
                    <h1>
                      <span>{headline}</span>{' '}
                      <span className="headline-2">
                        {headline_2.replace(/\.$/, '')}
                        <span className="highlight">.</span>
                      </span>
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
                )}
              </Transition>
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
