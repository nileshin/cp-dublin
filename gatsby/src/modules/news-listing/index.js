import React, { Component } from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import { htmlentities, formatDate } from '../../utils';
import DefiantlyHumanCallOut from '../defiantly-human-call-out';
import './main.scss';
import load_more from '../_global/images/load-more.svg';
import { ReactComponent as NewTabIcon } from '../_global/images/icon-new-tab.svg';
import NewsletterCapture from '../newsletter-capture';
import { Transition } from 'react-transition-group';

const renderPost = ({ node: post }, i = 0, state = {}) => {
  const filterType = post.acf.internal_external;
  const colWidth = post.acf.featured ? 8 : filterType === 'external' ? 4 : 6;
  const postClassName = post.acf.featured ? 'featured' : '';
  const url =
    filterType === 'external' ? post.acf.external_link : `/news/${post.slug}`;
  const pageStartIndex = ((state.page - 1) * state.postsPerPage) - 4;
  const postStyle = {
    transitionDelay: `${i > pageStartIndex ? 0.03 * (i - pageStartIndex) : 0}s`,
  };
  return (
    <Transition
      in={!state.transitioning}
      timeout={ANIMATION_TIME}
      appear={true}
      key={post.id}
      onEnter={node => node.scrollTop}
    >
      {postState => {
        return (
          <div
            className={`col-md-${colWidth} news-post ${postState}`}
            style={postStyle}
          >
            <article className={postClassName}>
              <h4 className="eyebrow">News</h4>
              <h3>
                {filterType === 'external' ? (
                  <a
                    href={url}
                    title={htmlentities.decode(post.title)}
                    dangerouslySetInnerHTML={{ __html: post.title }}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                ) : (
                  <Link
                    to={url}
                    title={htmlentities.decode(post.title)}
                    dangerouslySetInnerHTML={{ __html: post.title }}
                  />
                )}
              </h3>
              <div className="news-link">
                {filterType === 'external' ? (
                  <a
                    href={url}
                    title=""
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <NewTabIcon className="icn" viewBox="0 0 18 18" />
                    <span>{post.acf.source}</span>
                  </a>
                ) : (
                  <p className="news-description">{post.acf.description}</p>
                )}
                <time dateTime={post.acf.date}>
                  {formatDate(post.acf.date)}
                </time>
              </div>
            </article>
          </div>
        );
      }}
    </Transition>
  );
};

const NEWS_FILTER = {
  ALL: 'all',
  NEWS: 'news',
  FEATURES: 'features',
};

const ANIMATION_TIME = 200;

class NewsListingDisplay extends Component {
  state = {
    featuredPost: null,
    postListing: [],
    currentFilter: NEWS_FILTER.ALL,
    page: 1,
    postsPerPage: 8,
    transitioning: false,
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
  changeFilter = e => {
    e.preventDefault();
    if (typeof window === 'undefined') return;

    const newFilter = e.target.dataset.filterName;

    if (Object.values(NEWS_FILTER).findIndex(f => f === newFilter) < 0) {
      console.warn(`Cannot switch to filter ${newFilter}`);
      return;
    }

    this.setState(
      state => ({
        ...state,
        transitioning: true,
      }),
      () => {
        setTimeout(() => {
          this.setState(
            state => ({
              ...state,
              currentFilter: newFilter,
              page: 1,
            }),
            () => {
              this.setState(state => ({
                ...state,
                transitioning: false,
              }));
            }
          );
        }, ANIMATION_TIME);
      }
    );
  };
  nextPage = e => {
    e.preventDefault();
    this.setState(state => ({
      ...state,
      page: state.page + 1,
    }));
  };
  render() {
    const {
      postListing: unfilteredPosts,
      featuredPost,
      currentFilter,
      postsPerPage,
      page,
      transitioning,
    } = this.state;
    const filteredPosts = unfilteredPosts.filter(({ node: post }) => {
      if (currentFilter === NEWS_FILTER.ALL) return true;
      if (
        currentFilter === NEWS_FILTER.NEWS &&
        post.acf.internal_external === 'external'
      )
        return true;
      if (
        currentFilter === NEWS_FILTER.FEATURES &&
        post.acf.internal_external === 'internal'
      )
        return true;
      return false;
    });
    const posts = filteredPosts.slice(0, page * postsPerPage);
    const hasNextPage = posts.length < filteredPosts.length;

    return (
      <section className="news">
        <div className="container">
          <ul className="filter">
            {Object.values(NEWS_FILTER).map(filterName => (
              <li key={filterName}>
                <a
                  href={`#${filterName}`}
                  title={filterName}
                  className={currentFilter === filterName ? 'active' : ''}
                  data-filter-name={filterName}
                  onClick={this.changeFilter}
                >
                  {filterName}
                </a>
              </li>
            ))}
          </ul>
          <div className="row news-row">
            {currentFilter === NEWS_FILTER.ALL &&
              featuredPost &&
              renderPost(featuredPost)}
            {posts
              .slice(0, currentFilter === NEWS_FILTER.ALL ? 3 : 4)
              .map((post, i) => renderPost(post, i, this.state))}
            <DefiantlyHumanCallOut {...this.props.defiantlyHumanCallout} />
            {posts
              .slice(currentFilter === NEWS_FILTER.ALL ? 3 : 4)
              .map((post, i) => renderPost(post, i, this.state))}
            {hasNextPage && (
              <div className="col-md-2 filter-load">
                <a
                  href="#load-more"
                  className="load-more"
                  onClick={this.nextPage}
                >
                  <span className="load-more-text">load more</span>
                  <img
                    src={load_more}
                    alt="load-more"
                    className="load-more-icon"
                  />
                </a>
              </div>
            )}
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
