import React, { Component } from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import $ from 'jquery';
import '../_global/js/vendor/slick';
import { ReactComponent as PlayButton } from '../_global/images/play_btn.svg';

import './main.scss';

class TraditionalCarousel extends Component {
  componentDidMount() {
    $('.slider').slick({
      centerMode: true,
      centerPadding: '14%',
      slidesToShow: 1,
      dots: false,
      //useTransform: false,
      slidesToScroll: 1,
      draggable: false,
      swipe: false
    });
  }
  shouldComponentUpdate(nextProps) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps);
  }
  toggleVideo = e => {
    $(e.currentTarget).parent().find('.video-container').toggleClass('video-active');
  }
  render() {
    const { slides } = this.props;
    return (
      <section className="slider-full">
        <div className="slider">
          {slides.map((slide, i) => {
            return (
              <div className="slider__item slider__img" key={i}>
                <figure className="bg-img">
                  {slide.video__image ? (
                    <>
                      <Img
                        fluid={
                          slide.video.video_thumbnail.localFile.childImageSharp
                            .fluid
                        }
                        alt={slide.video.video_thumbnail.alt_text}
                        critical={true}
                      />
                      <button className="play-button" onClick={this.toggleVideo}><PlayButton /></button>
                      <div className="video-container" onClick={this.toggleVideo} dangerouslySetInnerHTML={{__html:slide.video.video_embed_code}}/>
                    </>
                  ) : (
                    <Img
                      fluid={slide.image.localFile.childImageSharp.fluid}
                      alt={slide.image.alt_text}
                      critical={true}
                    />
                  )}
                </figure>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
}

export default TraditionalCarousel;

export const traditionalCarouselFragment = graphql`
  fragment TraditionalCarouselFragment on traditionalCarousel_4 {
    slides {
      video__image
      video {
        video_embed_code
        video_thumbnail {
          ...WpMediaFragmentFluid
        }
      }
      image {
        ...WpMediaFragmentFluid
      }
    }
  }
`;
