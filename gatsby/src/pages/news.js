import React, { Component } from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/seo';
import Header from '../modules/header';
import NewsListing from '../modules/news-listing';

class News extends Component {
  render() {
    const { data: { wordpressPage:page, wordpressPage: { acf } } } = this.props;
    return (
      <>
        <SEO {...page.yoast_meta} {...page.yoast_social} />
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
      ...YoastMetadataFragment
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