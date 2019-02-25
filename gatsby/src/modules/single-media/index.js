import React, { Component } from 'react';
import { graphql } from 'gatsby';
import get from 'lodash.get';
import sliderVideo, { parseVideoEmbed } from '../../utils/video';
import closeImg from '../_global/images/hamburger-close.svg';
import './main.scss';

class SingleMedia extends Component {
  constructor(props) {
    super(props);
    this.sliderWrapper = React.createRef();
  }
  componentDidMount() {
    if (typeof window === 'undefined') return;

    if (this.sliderWrapper.current) {
      sliderVideo(this.sliderWrapper.current);
    }
  }
  noop = e => e.preventDefault();
  render() {
    const { video__image, image } = this.props;
    const video_embed_code = get(this.props, 'video.video_embed_code') || '';

    const mediaType = !video__image ? 'slider__img' : video_embed_code.indexOf('vimeo') ? 'slider__vimeo' : video_embed_code.search(/youtu\.?be/) ? 'slider__youtube' : '';
    return (
      <section className="media slider-full" ref={this.sliderWrapper}>
        <div className="container">
          <div className="media-carousel single-slide slick-current">
            <div className={`slider__item ${mediaType} media-carousel__item media-item`} data-media-type={mediaType}>
              {
                video__image ? (
                  <>
                    <img src={get(this.props, 'video.video_thumbnail.localFile.childImageSharp.original.src') || ''} alt={get(this.props, 'video.video_thumbnail.alt_text') || ''} className="cover" />
                    {/* eslint-disable-next-line */}
                    <a href="#play-video" title="Play" className="play" onClick={this.noop} />
                    {parseVideoEmbed(video_embed_code, mediaType)}
                    <span className="stop"><img src={closeImg} alt="stop" /></span>
                  </>
                ) : (
                  <>
                    <img src={get(image, 'localFile.childImageSharp.original.src')} alt={image && image.alt_text} className="cover" />
                  </>
                )
              }
            </div>
          </div>
        </div>
    </section>
    );
  }
}

export default SingleMedia;

export const singleMediaFragment = graphql`
  fragment SingleMediaFragment on singleMedia_5 {
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
`;
