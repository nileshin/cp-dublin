import React, { Component } from 'react';
import { Link, graphql } from 'gatsby';
import { Transition } from 'react-transition-group';
import Img from 'gatsby-image';
import './main.scss';
import get from 'lodash.get';

const ANIMATION_TIME = 200;

class HomeHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      headerActivated: props.suppress_animations,
      offset: 0,
    };

    this.homeImg = React.createRef();
    this.headline = React.createRef();
  }
  componentDidMount() {
    if (typeof window === 'undefined') return;

    this.setState(state => ({
      ...state,
      offset: (() => {
        if (!this.homeImg.current || !this.headline.current)
          return state.offset;
        return (
          this.homeImg.current.clientHeight / 2 -
          this.headline.current.clientHeight / 2
        );
      })(),
    }));

    this.loadinTimeout = setTimeout(() => {
      this.setState(state => ({
        ...state,
        headerActivated: true,
      }));
    }, 4000);
  }
  componentWillUnmount() {
    if (typeof window !== 'undefined' && this.loadinTimeout) {
      clearTimeout(this.loadinTimeout);
    }
  }
  render() {
    const {
      headline,
      headline_2,
      supportive_copy,
      cta,
      image,
      center_content,
      suppress_animations,
    } = this.props;
    const { headerActivated, offset } = this.state;
    const headlineStyle =
      headerActivated || suppress_animations
        ? {}
        : {
            transform: `translate3d(0, ${offset}px, 0)`,
            transition: 'transform 0s linear',
          };
    return (
      
      <section className="home-banner page-sec">
        <div className="container">

          <div className="row">
            <div className="col-md-6 order-md-2 image">
              <div className="home-banner-img" ref={this.homeImg}>
                
                <figure>
                  <Img
                    fluid={get(image, 'localFile.childImageSharp.fluid')}
                    alt="home-banner"
                    style={{ maxWidth: image.media_details.width}}
                  />
                </figure>
              </div>
            </div>
            <div
              className="col-md-6 text"
              style={{ alignSelf: center_content ? 'center' : 'inherit' }}
            >
              <Transition in={headerActivated} timeout={ANIMATION_TIME}>
                {headerState => (
                  <div className={`home-content ${headerState}`}>
                    <h1
                      className={suppress_animations ? 'no-anim' : ''}
                      style={headlineStyle}
                      ref={this.headline}
                    >
                      {headline && <span>{headline}</span>}{' '}
                      {headline_2 && (
                        <span className="headline-2">
                          {headline_2.replace(/\.$/, '')}
                          <span className="highlight">.</span>
                        </span>
                      )}
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
  fragment HomeHeaderFragment on homeHeader_10 {
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
      media_details {
        width
        height
      }
      localFile {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  }
  fragment HomeHeaderFragmentNotFound on homeHeader_12 {
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
      media_details {
        width
        height
      }
      localFile {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  }
`;
