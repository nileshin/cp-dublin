import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

const peopleGridRender = data => (
  <div>
    PeopleGrid
    <pre>
      <code>{JSON.stringify(data, null, 1)}</code>
    </pre>
  </div>
);

const PeopleGrid = () => (
  <StaticQuery
    query={graphql`
      query {
        allWordpressWpPeople {
          edges {
            node {
              wordpress_id
              acf {
                name
                title
              }
              featured_media {
                ...WpMediaFragment
              }
            }
          }
        }
      }
    `}
    render={peopleGridRender}
  />
);

export default PeopleGrid;
