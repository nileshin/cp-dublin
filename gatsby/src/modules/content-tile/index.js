import React, { Component } from 'react';
import { Link, graphql } from 'gatsby';
import './main.scss';

class ContentTile extends Component {
  render() {
    const {
      eyebrow,
      headline,
      supportive_text,
      cta,
      image: {
        localFile: {
          childImageSharp: {
            original: { src: contentTileImage },
          },
        },
      },
    } = this.props;
    return (
      <section
        className="latest bg-dark bg-img page-sec"
        style={{backgroundImage:`url(${contentTileImage})`}}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h4 className="eyebrow">{eyebrow}</h4>
              <h2>
                {headline.replace(/\.$/, '')}
                <span className="highlight">.</span>
              </h2>
              <p>
                {supportive_text}
              </p>
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

export default ContentTile;

export const contentTileFragment = graphql`
  fragment ContentTileFragment on contentTile_2 {
    eyebrow
    headline
    supportive_text
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
