import React, { Component } from 'react';
import { graphql } from 'gatsby';
import parse from 'html-react-parser';
import domToReact from 'html-react-parser/lib/dom-to-react';
import sliderVideo from './video';

import $ from 'jquery';
import '../_global/js/vendor/slick';
import { ReactComponent as HamburgerClose } from '../_global/images/hamburger-close.svg';

import './main.scss';

const parseVideoEmbed = (video_embed_code, slideClass) => {
  return parse(video_embed_code, {
    replace: domNode => {
      if (!domNode.attribs.class) domNode.attribs.class = '';
      domNode.attribs.class = (
        domNode.attribs.class + ' embed-player slide-media'
      ).trim();
      if (domNode.attribs.src) {
        const joiner = domNode.attribs.src.indexOf('?') ? '&' : '?';
        if (slideClass === 'slider__youtube') {
          domNode.attribs.src += `${joiner}enablejsapi=1&controls=0showinfo=0`;
        } else if (slideClass === 'slider_vimeo') {
          domNode.attribs.src += `${joiner}api=1&byline=0&portrait=0&title=0&autoplay=0`;
        }
      }
      return domToReact(domNode);
    },
  });
};

class TraditionalCarousel extends Component {
  constructor(props) {
    super(props);
    this.slider = React.createRef();
  }
  componentDidMount() {
    sliderVideo($('.slider-full'));
    $('.slider').slick({
      centerMode: true,
      centerPadding: '14%',
      slidesToShow: 1,
      dots: false,
      slidesToScroll: 1,
      draggable: false,
      swipe: false,
    });
    this.calcSlideHeight();
    window.addEventListener('resize', this.onResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }
  onResize = () => {
    this.calcSlideHeight();
    clearTimeout(this.resizeFinished);
    this.resizeFinished = setTimeout(() => this.calcSlideHeight(), 950);
  };
  calcSlideHeight() {
    const currentSlide = this.slider.current.querySelector(
      '.slick-current .slider__item'
    );
    if (currentSlide) {
      const slideHeight = currentSlide.offsetHeight;
      const track = this.slider.current.querySelector('.slick-track');
      if (track) {
        track.style.height = `${slideHeight}px`;
      }
    }
  }
  shouldComponentUpdate(nextProps) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps);
  }
  noop = e => e.preventDefault();
  render() {
    const { slides } = this.props;
    return (
      <section className="slider-full">
        <div className="slider" ref={this.slider}>
          {slides.map((slide, i) => {
            let slideClass = 'slider__img';
            if (slide.video__image) {
              slideClass = slide.video.video_embed_code.search(/youtu\.?be/)
                ? 'slider__youtube'
                : slide.video.video_embed_code.indexOf('vimeo')
                ? 'slider__vimeo'
                : '';
            }
            return (
              <div className={`slider__item ${slideClass}`} key={i}>
                {slide.video__image ? (
                  <>
                    <img
                      src={
                        slide.video.video_thumbnail.localFile.childImageSharp
                          .fluid.src
                      }
                      alt={slide.video.video_thumbnail.alt_text}
                      data-critical={true}
                      className="cover"
                    />
                    {/* eslint-disable-next-line */}
                    <a
                      href="#"
                      title="Play"
                      className="play"
                      onClick={this.noop}
                    />
                    {parseVideoEmbed(slide.video.video_embed_code, slideClass)}
                    <span className="stop">
                      <HamburgerClose />
                    </span>
                  </>
                ) : (
                  <img
                    src={slide.image.localFile.childImageSharp.fluid.src}
                    alt={slide.image.alt_text}
                    data-critical={true}
                    className="cover"
                  />
                )}
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
