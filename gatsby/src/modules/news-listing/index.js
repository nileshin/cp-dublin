import React, { Component } from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import { htmlentities, formatDate } from '../../utils';
import DefiantlyHumanCallOut from '../defiantly-human-call-out';
import './main.scss';

import { ReactComponent as NewTabIcon } from '../_global/images/icon-new-tab.svg';
import NewsletterCapture from '../newsletter-capture';

const renderPost = ({ node: post }) => {
  const filterType = post.acf.internal_external;
  const colWidth = post.acf.featured ? 8 : filterType === 'external' ? 4 : 6;
  const postClassName = post.acf.featured ? 'featured' : '';
  const url = filterType === 'external' ? post.acf.external_link : `/news/${post.slug}`
  return (
    <div className={`col-md-${colWidth}`} key={post.id}>
      <article className={postClassName}>
        <h4 className="eyebrow">News</h4>
        <h3>
          {
            filterType === 'external' ? (
              <a
                href={url}
                title={htmlentities.decode(post.title)}
                dangerouslySetInnerHTML={{ __html: post.title }}
                target="_blank"
                rel="noopener noreferrer"
              />
            ) : (
              <Link to={url} title={htmlentities.decode(post.title)} dangerouslySetInnerHTML={{__html:post.title}} />
            )
          }
        </h3>
        <div className="news-link">
          {
            filterType === 'external' ? (
              <a href={url} title="" target="_blank" rel="noopener noreferrer">
                <NewTabIcon className="icn" viewBox="0 0 18 18" />
                <span>{post.acf.source}</span>
              </a>
            ) : (
              <p className="news-description">{post.acf.description}</p>
            )
          }
          <time dateTime={post.acf.date}>{formatDate(post.acf.date)}</time>
        </div>
      </article>
    </div>
  );
};

class NewsListingDisplay extends Component {
  state = {
    featuredPost: null,
    postListing: [],
  };
  componentDidMount() {
    const {
      allWordpressPost: { edges: posts },
    } = this.props;
    const sortedPosts = posts.sort(({ node: postA }, { node: postB }) => {
      return new Date(postA.acf.date) < new Date(postB.acf.date);
    });
    const featuredIndex = sortedPosts.findIndex(
      ({ node: post }) => post.acf.featured
    );
    this.setState(state => ({
      ...state,
      featuredPost: sortedPosts[featuredIndex],
      postListing: sortedPosts.filter((p, i) => i !== featuredIndex),
    }));
  }
  render() {
    const { postListing: posts, featuredPost } = this.state;
    return (
      <section className="news">
        <div className="container">
          <ul className="filter">
            <li>
              <a href="#all" title="all" className="active">
                all
              </a>
            </li>
            <li>
              <a href="#news" title="news">
                news
              </a>
            </li>
            <li>
              <a href="#features" title="features">
                features
              </a>
            </li>
          </ul>
          <div className="row news-row">
            {featuredPost && renderPost(featuredPost)}
            {posts.map((post, i) => {
              return renderPost(post);
            })}
            {posts.length < 4 && <DefiantlyHumanCallOut {...this.props.defiantlyHumanCallout} />}
            <NewsletterCapture {...this.props.newsletterCapture} />
          </div>
        </div>
      </section>
    );
  }
}

const newsListingRender = props => <NewsListingDisplay {...props} />;

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
                  type
                  excerpt
                  categories {
                    slug
                  }
                  acf {
                    internal_external
                    external_link
                    date
                    source
                    featured
                    description
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