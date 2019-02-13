import React, { Component } from 'react';
import { graphql } from 'gatsby';
import './main.scss';

class LogoGrid extends Component {
  render() {
    const { logos } = this.props;
    return (
      <div>
        <section className="logo-grid">
          <div className="container">
            <h2 className="alt">Client<br/>Roster</h2>
            <ul className="clients">
              {
                logos.map((logo, i) => (
                  <li className="client" key={i}>
                    <figure>
                      <img src={logo.url.localFile.publicURL} alt={logo.alt} />
                    </figure>
                  </li>
                ))
              }
            </ul>
          </div>
        </section>
      </div>
    );
  }
}

export default LogoGrid;

// NB: need to get publicURL because svg's aren't processed by ImageSharp.
export const logoGridFragment = graphql`
  fragment LogoGridFragment on logoGrid_8 {
    logos {
      alt
      url {
        localFile {
          publicURL
        }
      }
    }
  }
`