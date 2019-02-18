import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { slugify } from '../../utils';
import './main.scss';

class LeadershipDetailCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLeader: this.props.leadership_slides[0].name,
    };
  }
  changeSlide = e => {
    e.preventDefault();
    const newName = e.target.getAttribute('title');
    this.setState(state => ({
      ...state,
      activeLeader: newName,
    }));
  };
  render() {
    const { leadership_slides: slides } = this.props;
    const { activeLeader } = this.state;
    return (
      <section className="leaders">
        <div className="container">
          <div className="row">
            <div className="col-md-2 offset-md-1 leaders-name-column">
              <ul className="leaders-list">
                {slides.map(slide => {
                  return (
                    <li key={slide.name}>
                      <a
                        href={`#${slugify(slide.name)}`}
                        title={slide.name}
                        onClick={this.changeSlide}
                        className={activeLeader === slide.name ? 'active' : ''}
                      >
                        {slide.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col-md-8 offset-md-1 leader-details-column">
              <div className="slider-leader">
                {slides.map(slide => {
                  const image =
                    slide.image.localFile.childImageSharp.original.src;
                  return (
                    <div
                      className={`slider-leader__item ${
                        activeLeader === slide.name ? 'active' : ''
                      }`}
                      key={slide.name}
                    >
                      <figure className="leader-img bg-cover bg-dark">
                        <img src={image} alt={slide.name} className="cover" />
                        <figcaption>
                          <h2
                            dangerouslySetInnerHTML={{
                              __html: slide.name.trim().replace(/\s+/, '<br/>'),
                            }}
                          />
                        </figcaption>
                      </figure>
                      <div className="leader-details">
                        <small className="title">{slide.title}</small>
                        <blockquote>
                          <p>{slide.quote}</p>
                        </blockquote>
                        <div
                          dangerouslySetInnerHTML={{ __html: slide.body_copy }}
                        />
                        <small className="tenure">{slide.tenure}</small>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default LeadershipDetailCarousel;

export const leadershipDetailCarouselFragment = graphql`
  fragment LeadershipDetailCarouselFragment on leadershipDetailCarousel_8 {
    leadership_slides {
      name
      title
      quote
      body_copy
      tenure
      image {
        ...WpMediaFragment
      }
    }
  }
`;
