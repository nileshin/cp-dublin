import React, { Component } from 'react';
import { graphql } from 'gatsby';
import Header from '../modules/header';
import NewsListing from '../modules/news-listing';

class News extends Component {
  render() {
    const { data: { wordpressPage: { acf } } } = this.props;
    return (
      <>
        News Page
        <Header {...acf.header.header} />
        <NewsListing defiantlyHumanCallout={acf.defiantly_human_call_out.defiantly_human_call_out} />
      </>
    );
  }
}

export default News;

export const query = graphql`
  query {
    wordpressPage(slug: { eq:"news" }) {
      id
      wordpress_id
      acf {
        header {
          header {
            ...HeaderFragment
          }
        }
        defiantly_human_call_out {
          defiantly_human_call_out {
            ...DefiantlyHumanCallOutFragment
          }
        }
      }
    }
  }
`