import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import './main.scss';

const renderTile = (tile, htmlTitles) => (
  <div className="col-md-6">
    <div className="cta-tile">
      {htmlTitles ? (
        <h3 dangerouslySetInnerHTML={{ __html: tile.headline }} />
      ) : (
        <h3>{tile.headline}</h3>
      )}
      {tile.cta.url.indexOf('http') === 0 ? (
        <a href={tile.cta.url} title={tile.cta.title} className="cta">
          {tile.cta.title}
        </a>
      ) : (
        <Link to={tile.cta.url} title={tile.cta.title} className="cta">
          {tile.cta.title}
        </Link>
      )}
      {tile.image && tile.image.localFile ? (
        <Img
          fluid={tile.image && tile.image.localFile.childImageSharp.fluid}
          className="cta-tile__img bg-img"
          style={{ position: 'absolute' }}
        />
      ) : (
        <img
          src={tile.image}
          className="cta-tile__img bg-img"
          style={{ position: 'absolute' }}
          alt=""
        />
      )}
    </div>
  </div>
);

class CTATiles extends Component {
  render() {
    const { left_cta, right_cta, htmlTitles } = this.props;

    return (
      <section className="cta-tiles bg-dark">
        <div className="container-fluid">
          <div className="row">
            {renderTile(left_cta, htmlTitles)}
            {renderTile(right_cta, htmlTitles)}
          </div>
        </div>
      </section>
    );
  }
}

export default CTATiles;

export const ctaTileFragment = graphql`
  fragment CTATileFragment on ctaTiles_8 {
    left_cta {
      headline
      cta {
        title
        url
        target
      }
      image {
        localFile {
          publicURL
        }
        ...WpMediaFragmentFluid1440
      }
    }
    right_cta {
      headline
      cta {
        title
        url
        target
      }
      image {
        localFile {
          publicURL
        }
        ...WpMediaFragmentFluid1440
      }
    }
  }
`;
