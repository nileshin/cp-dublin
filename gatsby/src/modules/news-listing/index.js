import React, { Component } from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

const newsListingRender = props => {
  const { allWordpressPost: { edges: posts } } = props;
  return (
    <div>
      News listing
      <ul>
        {posts.map(post => {
          const filter_type =
            post.node.categories && post.node.categories[0].slug;

          if (filter_type === 'article') {
            return (
              <li key={post.node.id}>
                <Link to={`/news/${post.node.slug}`} dangerouslySetInnerHTML={{__html:post.node.title}}/>
              </li>
            );
          } else if (filter_type === 'external') {
            return (
              <li key={post.node.id}>
                <a
                  href={post.node.acf.external_link.url}
                  target={post.node.acf.external_link.target}
                  dangerouslySetInnerHTML={{__html:post.node.title}}
                />
              </li>
            );
          }
          return null;
        })}
      </ul>
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
                  slug
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
                  }
                }
              }
            }
          }
        `}
        render={data => newsListingRender({ ...data, ...this.props })}
      />
    );
  }
}

export default NewsListing;
