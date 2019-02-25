import React, { Component } from 'react';
import { graphql } from 'gatsby';
import sliderVideo, { parseVideoEmebd } from '../../utils/video';
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
  render() {
    const { video__image, video, image } = this.props;
    const mediaType = !video__image ? 'slider__img' : video.video_embed_code.indexOf('vimeo') ? 'slider__vimeo' : video.video_embed_code.search(/youtu\.?be/) ? 'slider__youtube' : '';
    return (
      <section className="media slider-full" ref={this.sliderWrapper}>
        <div className="container">
          <div className="media-carousel single-slide slick-current">
            <div className={`slider__item ${mediaType} media-carousel__item media-item`} data-media-type={mediaType}>
              {
                video__image ? (
                  <>
                    <img src={video.video_thumbnail && video.video_thumbnail.localFile && video.video_thumbnail.localFile.childImageSharp.original.src} alt={image && image.alt_text} className="cover" />
                    <a href="javascript:void(0)" title="Play" className="play"></a>
                    <span dangerouslySetInnerHTML={{__html:video.video_embed_code}}></span>
                    <span className="stop"><img src={closeImg} alt="stop" /></span>
                  </>
                ) : (
                  <>
                    <img src={image && image.localFile && image.localFile.childImageSharp.original.src} alt={image && image.alt_text} className="cover" />
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
