import React, { Component } from 'react';
import { graphql } from 'gatsby';
import Header from '../modules/header';
import QuoteBlobVideoModule from '../modules/quote-blob-video-module';
import JobListings from '../modules/job-listings';

class Careers extends Component {
  render() {
    const {
      data: { wordpressPage: { acf } },
    } = this.props;
    return (
      <>
        Careers Page
        <Header {...acf.header.header} />
        <QuoteBlobVideoModule {...acf.quote_blob_video_module.quote_blob_video_module} />
        <JobListings />
      </>
    );
  }
}

export default Careers;

export const query = graphql`
  query {
    wordpressPage(slug: { eq: "careers" }) {
      id
      wordpress_id
      acf {
        header {
          header {
            ...HeaderFragment
          }
        }
        quote_blob_video_module {
          quote_blob_video_module {
            ...QuoteBlobVideoModuleFragment
          }
        }
      }
    }
  }
`;
