import React, { Component } from 'react';
import { graphql } from 'gatsby';

class WorkDetail extends Component {
  render() {
    const { data } = this.props
    return (
      <div>
        Work Detail
        <pre><code>{JSON.stringify(data, null, 1)}</code></pre>
      </div>
    );
  }
}

export default WorkDetail;

export const query = graphql`
  query($id: String!) {
    wordpressWpWork(id: {eq: $id}) {
      title
      acf {
        client_name
        rich_media_header {
          rich_media_header {
            lightdark_mode
            project_title
            image {
              ...WpMediaFragment
            }
          }
        }
        work_detail_content_work {
          __typename
          ...on WordPressAcf_single_media {
            single_media {
              video__image
              video {
                video_embed_code
                video_thumbnail {
                  ...WpMediaFragment
                }
              }
              image {
                ...WpMediaFragment
              }
            }
          }
          ...on WordPressAcf_traditional_carousel {
            traditional_carousel {
              slides {
                video__image
                video {
                  video_embed_code
                  video_thumbnail {
                    ...WpMediaFragment
                  }
                }
                image {
                  ...WpMediaFragment
                }
              }
            }
          }
          ...on WordPressAcf_work_detail_intro {
            work_detail_intro {
              title
              body_copy
              image {
                ...WpMediaFragment
              }
            }
          }
          ...on WordPressAcf_stat_long_fact_row {
            stat_long_fact_row {
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
          }
        }
      }
    }
  }
`