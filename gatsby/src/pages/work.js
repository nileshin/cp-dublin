import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';
import { stripTags } from '../utils';
import Layout from '../components/layout';

class Work extends Component {
  render() {
    const { data: { allWordpressWpWork: { edges:work }, wordpressPage:page } } = this.props;

    return (
      <Layout>
        <section className={`work ${page.slug}`}>
          Work Page
          <ul>
            {work.map(w => (
              <li key={w.node.id}>
                <Link to={`/work/${w.node.slug}`}>{w.node.acf.client_name} - {stripTags(w.node.acf.rich_media_header.rich_media_header.project_title)}</Link>
              </li>
            ))}
          </ul>
        </section>
      </Layout>
    );
  }
}

export default Work;

export const query = graphql`
  query {
    wordpressPage(slug: { eq: "work" }) {
      id
      wordpress_id
      slug
    }
    allWordpressWpWork {
      edges {
        node {
          id
          wordpress_id
          slug
          acf {
            client_name
            rich_media_header {
              rich_media_header {
                project_title
              }
            }
          }
        }
      }
    }
  }
`;