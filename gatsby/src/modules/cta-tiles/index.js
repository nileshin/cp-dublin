import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import './main.scss';

const renderTile = tile => (
  <div className="col-md-6">
    <div className="cta-tile">
      <h3>{tile.headline}</h3>
      {tile.cta.url.indexOf('http') === 0 ? (
        <a href={tile.cta.url} title={tile.cta.title} className="cta">
          {tile.cta.title}
        </a>
      ) : (
        <Link to={tile.cta.url} title={tile.cta.title} className="cta">
          {tile.cta.title}
        </Link>
      )}
      {/* <figure class="cta-tile__img bg-img" style={{backgroundImage:`url(${tile.image.localFile.publicURL})`}}></figure> */}
      <Img
        fluid={tile.image.localFile.childImageSharp.fluid}
        className="cta-tile__img bg-img"
        style={{position:"absolute"}}
      />
    </div>
  </div>
);

class CTATiles extends Component {
  render() {
    const { left_cta, right_cta } = this.props;

    return (
      <section className="cta-tiles bg-dark">
        <div className="container-fluid">
          <div className="row">
            {renderTile(left_cta)}
            {renderTile(right_cta)}
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
