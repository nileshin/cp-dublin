import React, { Component } from 'react';
import { graphql } from 'gatsby';

import './main.scss';

class StatLongFactRow extends Component {
  render() {
    const { statistic, fact } = this.props;
    return (
      <section className="stat">
        <div style={{display: "none", border:"solid 1px #700bff"}}>
          Stat Long Fact Row
          <pre><code>{JSON.stringify(this.props, null, 1)}</code></pre>
        </div>
        <div className="container">
          <div className="row stat__head">
            <div className="col-5 col-md-4">
              <h3 className="stat__title" dangerouslySetInnerHTML={{
                __html: statistic.stat_title,
              }} />
            </div>
            <div className="col-7 col-md-8">
              <h3 className="stat__title" dangerouslySetInnerHTML={{
                __html: fact.fact_title,
              }} />
            </div>
          </div>
          <div className="row stat__content">
            <div className="col-5 col-md-4">
              <span className="lg-text">{statistic.stat_number_unit}</span>
            </div>
            <div className="col-7 col-md-8">

            {fact.fact_content.map((fact_row, index) => 
              <article className="fact">
                <h3 className="fact__title">
                  {fact_row.fact_text}
                </h3>
              </article>
            )} 
            </div>
          </div>
        </div>        
      </section>
    );
  }
}

export default StatLongFactRow;

export const statLongFactRowFragment = graphql`
  fragment StatLongFactRowFragment on statLongFactRow_5 {
    statistic {
      stat_title
      stat_number_unit
    }
    fact {
      fact_title
      fact_content {
        fact_text
      }
    }
  }
`