import React, { Component } from 'react';
import { graphql } from 'gatsby';

import ReactPlayer from 'react-player'

import { ReactComponent as Hamburger } from '../_global/images/hamburger-close.svg';
import $ from 'jquery';
import './main.scss';

class BlobVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false
    };
    this.MediaObj = {};
    this.stage = React.createRef();
    this.player = React.createRef();
  }; 
  componentDidMount() {
    this.calcAspectRatio();
    window.addEventListener('resize', this.onResize);
  }
  onResize = () => {
    this.calcAspectRatio();
    clearTimeout(this.resizeFinished);
    this.resizeFinished = setTimeout(() => this.calcAspectRatio(), 950);
  };
  calcAspectRatio() {
    const getHeight = (window.innerWidth * 1080) / 1920;
    const getWidth = (1920 * window.innerHeight) / 1080;
    if (getHeight < window.innerHeight) {
      $(".blob iframe, .blob .react-player").width(getWidth);
      $(".blob iframe, .blob .react-player").height(window.innerHeight);
    } else {
      $(".blob iframe, .blob .react-player").width(window.innerWidth);
      $(".blob iframe, .blob .react-player").height(getHeight);
    }
    
  }
  extractVideoSRC(embed){
    this.MediaObj = embed.match(/https:\/\/[A-Za-z0-9\.\/]*/g)[0];   
  }

  render() {
    const { eyebrow, headline, supportive_text, video_thumbnail, video_embed_code} = this.props;
    const youtubeOpts = {
      playerVars: {
        autoplay: 0,
        enablejsapi:1,
        rel:0,
        mute:0,
      }
    };
    const vimeoOpts = {};
    this.extractVideoSRC(video_embed_code);
    return (
      <section className="content-blob">
        <div style={{display: "none"}}>
          BlobVideo
          <pre><code>{JSON.stringify(this.props, null, 1)}</code></pre>
        </div>
        <div className="container">
          <div className="col-md-6">
            <h4 className="eyebrow">{eyebrow}</h4>
            <h2
                dangerouslySetInnerHTML={{
                  __html: headline,
                }}
              />
            <div
              dangerouslySetInnerHTML={{
                __html: supportive_text,
              }}
            />
          </div>
          <div className={ this.state.playing ? "blob yt-v vid-active" : "blob yt-v" } ref={this.stage}>
            
            <img src={video_thumbnail.localFile.childImageSharp.fluid.src} alt="video thumb" className="cover" />
            
            <ReactPlayer
              url={this.MediaObj}
              playing={this.state.playing}
              className='react-player'
              config={{
                youtube: youtubeOpts,
                vimeo: vimeoOpts
              }}
              onPlay={this._onPlay}
              onEnded={this._onEnded}
            />

            <div className="vid-thumb" onClick={this._beginPlaying}></div>
            <span className="stop" onClick={this._stopPlaying} ><Hamburger alt=""/></span>
          </div>
        </div>
      </section>
    );
  }
  _beginPlaying = event => {
    this.calcAspectRatio();
    this.setState(state => ({
      ...state,
      playing: true
    }));   
  }

  _stopPlaying = event => {
    this.setState(state => ({
      ...state,
      playing: false
    }));
  }
  _onPlay = event => {
    console.log("playing")
  }
  _onEnded = event => {
    this.setState(state => ({
      ...state,
      playing: false
    }));
  }
}

export default BlobVideo;

export const blobVideoFragment = graphql`
  fragment BlobVideoFragment on blobVideo_8 {
    video_embed_code
    eyebrow
    headline
    supportive_text
    video_thumbnail {
      ...WpMediaFragmentFluid1440
    }
  }
`;