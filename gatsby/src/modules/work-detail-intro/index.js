import React, { Component } from 'react';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
// import { nominalTypeHack } from 'prop-types';

import './main.scss'

class WorkDetailIntro extends Component {
  render() {
    const { title, body_copy, image } = this.props;

    return (
      <section className="intro-work">
        <div style={{ display: 'none', border: 'solid 1px #bada55' }}>
          Work Detail Intro
          <pre>
            <code>{JSON.stringify(this.props, null, 1)}</code>
          </pre>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="intro-work__content">
                <h1 dangerouslySetInnerHTML={{
                  __html: title,
                }}/>
                <div dangerouslySetInnerHTML={{
                  __html: body_copy,
                }}/>
              </div>
            </div>
            <div className="col-md-6 intro-work__img">
              <figure>
                <Img
                  fluid={image.localFile.childImageSharp.fluid}
                  alt={image.alt_text}
                  className="cover"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default WorkDetailIntro;

export const workDetailIntroFragment = graphql`
  fragment WorkDetailIntroFragment on workDetailIntro_5 {
    title
    body_copy
    image {
      ...WpMediaFragmentFluid1440
    }
  }
`;
