import React, { Component } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import load_more from '../_global/images/load-more.svg';
import shuffle from 'lodash.shuffle';
import './main.scss';

const PEOPLE_FILTERS = {
  ALL: 'all',
  BOSTON: 'boston',
  DUBLIN: 'dublin'
}

const DUBLIN_DEPT = 'CP Dublin';

class PeopleGrid extends Component {
  state = {
    page: 1,
    postsPerPage: 20,
    filter: PEOPLE_FILTERS.ALL,
    fullPeopleList: []
  }
  componentDidMount() {
    this.setState(state => {
      const { data:{ allWordpressWpPeople: { edges } } } = this.props;
      return {
        ...state,
        fullPeopleList: shuffle(edges)
      }
    })
  }
  changeFilter = e => {
    e.preventDefault();
    const newFilter = e.currentTarget.getAttribute('title');
    if (Object.values(PEOPLE_FILTERS).indexOf(newFilter.toLowerCase()) >= 0) {
      this.setState(state => ({
        ...state,
        filter: newFilter,
        page: 1
      }))
    } else {
      console.warn(`Cannot apply filter: `, newFilter);
    }
  }
  applyFilter = person => {
    const { filter } = this.state;
    if (filter === PEOPLE_FILTERS.ALL) return true;
    const department = person.node.department && person.node.department.length ? person.node.department[0].name : "";
    console.log(filter, 'v.', department, person);
    if (filter === PEOPLE_FILTERS.BOSTON) {
      return department && department !== DUBLIN_DEPT;
    } else if (filter === PEOPLE_FILTERS.DUBLIN) {
      return department && department === DUBLIN_DEPT;
    }
    return false;
  }
  nextPage = e => {
    e.preventDefault();
    this.setState(state => ({
      ...state,
      page: state.page + 1
    }));
  }
  render() {
    const { page, postsPerPage, filter, fullPeopleList } = this.state;

    const filteredPeopleList = fullPeopleList.filter(this.applyFilter);
    const people = filteredPeopleList.slice(0, Math.min(filteredPeopleList.length, (page * postsPerPage) - 1));

    return (
      <section className="people filter-wrap">
        <div className="container">
          <ul className="filter">
            {
              Object.values(PEOPLE_FILTERS).map(filterName => (
                <li key={filterName}>
                  <a href={`#${filterName}`} title={filterName} className={filter === filterName ? 'active' : ''} onClick={this.changeFilter}>{filterName}</a>
                </li>
              ))
            }
          </ul>
          <div className="people-list">
            {people.map(personNode => {
              const person = personNode.node;
              return (
                <div className="people-list__item filter-item" key={person.acf.name}>
                  <figure>
                    <img src={person.featured_media.localFile.childImageSharp.original.src} alt={person.acf.name} />
                  </figure>
                  <div className="people-list__details">
                    <h5>{person.acf.name}</h5>
                    <small className="title">{person.acf.title}</small>
                  </div>
                </div>
              )
            })}
            <div className="people-list__item filter-load">
              <a href="#load-more" onClick={this.nextPage} className="load-more">
                <span className="load-more-text">load more</span>
                <img src={load_more} alt="" className="load-more-icon" />
              </a>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const PeopleGridWrapper = () => (
  <StaticQuery
    query={graphql`
      query {
        allWordpressWpPeople {
          edges {
            node {
              wordpress_id
              department {
                name
              }
              acf {
                name
                title
              }
              featured_media {
                ...WpMediaFragment
              }
            }
          }
        }
      }
    `}
    render={data => <PeopleGrid data={data} />}
  />
);

export default PeopleGridWrapper;
