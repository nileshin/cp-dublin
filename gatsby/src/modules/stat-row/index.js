import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { slugify } from '../../utils';
import blob from '../_global/images/bg-blob.svg';
import blob2 from '../_global/images/load-more.svg';
// import Snap from 'snapsvg';
import './main.scss';

class StatRow extends Component {
  componentDidMount() {
    // const svg = document.getElementById('blob');
    // const s = Snap(svg);
  }

  render() {
    const { stats, options: { hasBlob, hasColors } = {} } = this.props;
    return (
      <section
        className={`stat stat-alt ${hasBlob ? 'has-blob' : ''} ${
          hasColors ? 'has-colors' : ''
        }`}
      >
        <div className="container stat-row-container">
          <img src={blob} alt={"blob"} />
          <img src={blob2} />
          {stats.map(({ stat_title }, i) => {
            return (
              <div className="row stat__head" data-stat-index={i} key={stat_title}>
                <div className="col-6 col-md-4" key={slugify(stat_title)}>
                  <h3
                    className="stat__title"
                    dangerouslySetInnerHTML={{ __html: stat_title }}
                  />
                </div>
              </div>
            );
          })}

          {stats.map(({ stat_number }, i) => {
            return (
              <div className="row stat__content" data-stat-index={i} key={stat_number}>
                <div className="col-6 col-md-4" key={slugify(stat_number)}>
                  <span className="lg-text">{stat_number}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
}

export default StatRow;

export const statRow = graphql`
  fragment StatRowFragmentWorkDetail on statRow_11 {
    stats {
      stat_title
      stat_number
    }
  }

  fragment StatRowFragment on statRow_13 {
    stats {
      stat_title
      stat_number
    }
  }
`;
