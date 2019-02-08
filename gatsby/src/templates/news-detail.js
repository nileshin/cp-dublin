import React, { Component } from 'react';
import { graphql } from 'gatsby';

class NewsDetail extends Component {
  render() {
    return (
      <>
        News Detail
        <pre><code>{JSON.stringify(this.props.data, null, 1)}</code></pre>
      </>
    );
  }
}

export default NewsDetail;

export const query = graphql`
  query($id: String!) {
    wordpressPost(id: { eq: $id }) {
      id
      wordpress_id
      slug
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
`;
