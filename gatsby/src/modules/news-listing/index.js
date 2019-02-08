import React, { Component } from 'react';
import { StaticQuery, graphql } from 'gatsby';

const newsListingRender = props => {
  return (
    <div>
      News listing
      <pre>
        <code>{JSON.stringify(props, null, 1)}</code>
      </pre>
    </div>
  );
};

class NewsListing extends Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            allWordpressPost {
              edges {
                node {
                  id
                  wordpress_id
                  title
                  categories {
                    slug
                  }
                  acf {
                    external_link {
                      title
                      url
                      target
                    }
                    date
                    article_content_post {
                      __typename
                      ... on WordPressAcf_rte {
                        rte_copy
                      }
                      ... on WordPressAcf_traditional_carousel {
                        traditional_carousel {
                          ...TraditionalCarouselFragment
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `}
        render={data => newsListingRender({...data, ...this.props})}
      />
    );
  }
}

export default NewsListing;
