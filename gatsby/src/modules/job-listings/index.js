import React, { Component } from 'react';
import { StaticQuery, graphql } from 'gatsby';

const jobListingRender = (props) => (
  <div>
    Job Listings
    <pre>
      <code>{JSON.stringify(props, null, 1)}</code>
    </pre>
  </div>
);

class JobListings extends Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            allWordpressWpJobs {
              edges {
                node {
                  id
                  wordpress_id
                  job_location {
                    wordpress_id
                    slug
                  }
                  acf {
                    job_posting {
                      job_posting {
                        position_title
                        posting_description
                        applicant_stack_link {
                          title
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `}
        render={jobListingRender}
      />
    );
  }
}

export default JobListings;
