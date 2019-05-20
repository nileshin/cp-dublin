import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { slugify } from '../../utils';
import 'snapsvg';
import './main.scss';

class StatRow extends Component {
  componentDidMount() {
    const Snap = window.Snap;
    const mina = window.mina;
    if (Snap) {
      const blob = Snap.select('#blob');
      const blobPath = blob.node.getAttribute('d');
      const blobPhaseOne = function() {
        blob.animate({ d: blobPath }, 2000, mina.easeinout, blobPhaseTwo);
      }
      const blobPhaseTwo = function() {
        blob.animate({ 
          d: "M289.513424,1488.12278 C411.566054,1426.91973 550.5,1504.4 600.298197,1392.14433 C650.096394,1279.88867 582,1121.56429 445,1077 C308,1032.43571 77.7668765,1150.17142 24.2589746,1330.93539 C-29.2489273,1511.69936 167.460795,1549.32583 289.513424,1488.12278 Z"
        }, 2000, mina.easeinout, blobPhaseThree);
      }
      const blobPhaseThree = function() {
        blob.animate({ 
          d: "M263.344983,1470.09589 C366.575421,1386.67146 550.5,1528.25566 600.298197,1416 C650.096394,1303.74434 642.75,1155.03557 505.75,1110.47128 C368.75,1065.90698 77.7668765,1150.17142 24.2589746,1330.93539 C-29.2489273,1511.69936 160.114544,1553.52032 263.344983,1470.09589 Z" 
        }, 2000, mina.easeinout, blobPhaseOne);
      }

      blobPhaseOne();
    }
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
          <svg width="489px" height="591px" viewBox="0 0 489 591" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="FinalPages" stroke="none" stroke-width="1" fill="none" fillRule="evenodd">
                <g id="D.People" transform="translate(0.000000, -2153.000000)" fill="#393E46" fillRule="nonzero">
                    <g id="Leadership" transform="translate(-140.000000, 1157.000000)">
                        <path id="blob" d="M245.86719,1549.17838 C364.930362,1437.76606 628.938825,1452.1717 628.938825,1290.52576 C628.938825,1128.87982 542.205607,977.512689 370.535473,997.839895 C198.86534,1018.1671 63.6387013,1143.79503 10.1307994,1324.559 C-43.3771025,1505.32297 126.804018,1660.5907 245.86719,1549.17838 Z"></path>
                    </g>
                </g>
            </g>
          </svg>
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
