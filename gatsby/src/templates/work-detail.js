import React, { Component } from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/seo';
import SingleMedia from '../modules/single-media';
import TraditionalCarousel from '../modules/traditional-carousel';
import WorkDetailIntro from '../modules/work-detail-intro';
import StatLongFactRow from '../modules/stat-long-fact-row';
import RichMediaHeader from '../modules/rich-media-header';
import StatRow from '../modules/stat-row';

class WorkDetail extends Component {
  render() {
    const {
      data: { wordpressWpWork: work },
    } = this.props;

    return (
      <>
        <SEO {...work.yoast_meta} {...work.yoast_social} />

        <section className={`work-detail ${work.slug}`}>
          <RichMediaHeader {...work.acf.rich_media_header.rich_media_header} />
          {work.acf.work_detail_content_work.map((module_content, i) => {
            switch (module_content.__typename) {
              case 'WordPressAcf_single_media': {
                return (
                  <SingleMedia
                    {...module_content.single_media}
                    key={module_content.id}
                  />
                );
              }
              case 'WordPressAcf_traditional_carousel': {
                return (
                  <TraditionalCarousel
                    {...module_content.traditional_carousel}
                    key={module_content.id}
                  />
                );
              }
              case 'WordPressAcf_work_detail_intro': {
                return (
                  <WorkDetailIntro
                    {...module_content.work_detail_intro}
                    key={module_content.id}
                  />
                );
              }
              case 'WordPressAcf_stat_long_fact_row': {
                return (
                  <StatLongFactRow
                    {...module_content.stat_long_fact_row}
                    key={module_content.id}
                  />
                );
              }
              case 'WordPressAcf_stat_row': {
                return (
                  <StatRow {...module_content.stat_row} key={module_content.id} />
                )
              }
              default: {
                return (
                  <pre key={i}>
                    <code>{JSON.stringify(module_content, null, 1)}</code>
                  </pre>
                );
              }
            }
          })}
        </section>
      </>
    );
  }
}

export default WorkDetail;

export const query = graphql`
  query($id: String!) {
    wordpressWpWork(id: { eq: $id }) {
      id
      title
      slug
      ...YoastMetadataFragmentWork
      acf {
        client_name
        rich_media_header {
          ...RichMediaHeaderFragment
        }
        work_detail_content_work {
          __typename
          ... on WordPressAcf_single_media {
            id
            single_media {
              ...SingleMediaFragment
            }
          }
          ... on WordPressAcf_traditional_carousel {
            id
            traditional_carousel {
              ...TraditionalCarouselFragment
            }
          }
          ... on WordPressAcf_work_detail_intro {
            id
            work_detail_intro {
              ...WorkDetailIntroFragment
            }
          }
          ... on WordPressAcf_stat_long_fact_row {
            id
            stat_long_fact_row {
              ...StatLongFactRowFragment
            }
          }
          ...on WordPressAcf_stat_row {
            id
            stat_row {
              ...StatRowFragmentWorkDetail
            }
          }
        }
      }
    }
  }
`;
