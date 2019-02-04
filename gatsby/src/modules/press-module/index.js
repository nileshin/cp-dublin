import React, { Component } from 'react';
import { Link, graphql } from 'gatsby';
import './main.scss';

class PressModule extends Component {
  render() {
    const {
      eyebrow,
      title,
      cta,
      image: {
        localFile: {
          childImageSharp: {
            original: { src: pressModuleImage },
          },
        },
      },
    } = this.props;
    return (
      <section
        className="press bg-img page-sec"
        style={{backgroundImage:`url(${pressModuleImage})`}}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-10">
              <h4 className="eyebrow">{eyebrow}</h4>
              <h2>
                {title.replace(/\.$/, '')}<span className="highlight">.</span>
              </h2>
              <Link to={cta.url} title={cta.title} className="cta">
                {cta.title}
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default PressModule;

export const pressModuleFragment = graphql`
  fragment PressModuleFragment on pressModule_2 {
    eyebrow
    title
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
