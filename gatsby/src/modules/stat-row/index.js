import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { slugify } from '../../utils';
import './main.scss';

class StatRow extends Component {
  render() {
    const { stats, options:{blob, colors} = {} } = this.props;
    return (
      <section className={`stat stat-alt ${blob ? 'blob' : ''} ${colors ? 'colors' : ''}`}>
        <div className="container">
          <div className="row stat__head">
            {stats.map(({ stat_title }) => {
              return (
                <div className="col-6 col-md-4" key={slugify(stat_title)}>
                  <h3
                    className="stat__title"
                    dangerouslySetInnerHTML={{ __html: stat_title }}
                  />
                </div>
              );
            })}
          </div>

          <div className="row stat__content">
            {stats.map(({ stat_number }) => {
              return (
                <div className="col-6 col-md-4" key={slugify(stat_number)}>
                  <span className="lg-text">{stat_number}</span>
                </div>
              );
            })}
          </div>
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
