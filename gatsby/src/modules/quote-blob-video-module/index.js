import React, { Component } from 'react';
import { graphql } from 'gatsby';

import ReactPlayer from 'react-player'

import { ReactComponent as Hamburger } from '../_global/images/hamburger-close.svg';
import $ from 'jquery';

class QuoteBlobVideoModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      videoReady: false,
      volume: 0
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
    // eslint-disable-next-line
    this.MediaObj = embed.match(/https:\/\/[A-Za-z0-9\.\/]*/g)[0];   
  }

  render() {
    const { video_embed_code, eyebrow, quote,  author, author_title, supportive_copy} = this.props;
    const youtubeOpts = {
      playerVars: {
        autoplay: 1,
        controls: 0,
        enablejsapi:1,
        modestbranding: 1,
        rel:0,
        showinfo:0
      },
      embedOptions:{
        wmode: 'transparent',
        showinfo:0
      }
    };
    const vimeoOpts = {
      playerOptions:{
        background: 1
      }
    };
    this.extractVideoSRC(video_embed_code);
    return (  
    <section className="content-blob">
      {/* <div>
        Quote Blob Video Module
        <pre><code>{JSON.stringify(this.props, null, 1)}</code></pre>
      </div> */}
      <div className="container">
        <div className="col-md-6">
          <h4 className="eyebrow">{eyebrow}</h4>
          <blockquote>
            <p>{quote}</p>
            <cite>{author} <small>{author_title}</small></cite>
          </blockquote>
          <div
                dangerouslySetInnerHTML={{
                  __html: supportive_copy,
                }}
              />
        </div>
        <div className={ this.state.playing ? "blob yt-v vid-active" : "blob yt-v" } ref={this.stage}>
            
          <ReactPlayer
              url={this.MediaObj}
              className='react-player'
              config={{
                youtube: youtubeOpts,
                vimeo: vimeoOpts
              }}
              volume={this.state.volume}
              onPlay={this._onPlay}
              onEnded={this._onEnded}
              onReady={this._onReady}
              ref={this.player}
              loop='true'
            />

          <div className="vid-thumb" onClick={this._beginPlaying}></div>
          <span className="stop" onClick={this._stopPlaying} ><Hamburger alt=""/></span>
        </div>
      </div>
    </section>
    );
  }
  _beginPlaying = event => {
    this.setState(state => ({
      ...state,
      playing: true,
      volume: 1
    }));   
  }

  _stopPlaying = event => {
    this.setState(state => ({
      ...state,
      playing: false,
      volume: 0
    }));
  }
  _onReady= event => {
    this.calcAspectRatio();
    this.setState(state => ({
      ...state,
      videoReady: true
    }));
    console.log("playing")
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


export default QuoteBlobVideoModule;

export const quoteBlobVideoModuleFragment = graphql`
  fragment QuoteBlobVideoModuleFragment on quoteBlobVideoModule_8 {
    video_embed_code
    eyebrow
    quote
    author
    author_title
    supportive_copy
  }
`