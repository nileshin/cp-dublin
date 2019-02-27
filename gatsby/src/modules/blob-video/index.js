import React, { Component } from 'react';
import { graphql } from 'gatsby';
import YouTube from 'react-youtube';
import Vimeo from 'react-vimeo';
import { ReactComponent as Hamburger } from '../_global/images/hamburger-close.svg';

import './main.scss';
import './main.js';

class BlobVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false
    };
    this.stage = React.createRef();
    this.player = React.createRef();
  }; 

  render() {
    const { eyebrow, headline, supportive_text, video_thumbnail, video_embed_code} = this.props;
    const youtubeOpts = {
      playerVars: {
        autoplay: 1,
        enablejsapi:1,
        rel:0,
        mute:1,
      }
    };

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
            
            {video_embed_code.search(/youtu\.?be/)? (
              <YouTube
                videoId="2g811Eo7K8U"
                opts={youtubeOpts}
                onReady={this.YT_onReady}
                onStateChange={this.YT_onStateChange}
                ref={this.player}
              />
            
            ):(
              <Vimeo videoId="2g811Eo7e8U" ref={this.player}/>
            )}

            <div className="vid-thumb" onClick={this._beginPlaying}></div>
            <span className="stop" onClick={this._stopPlaying} ><Hamburger alt=""/></span>
          </div>
        </div>
      </section>
    );
  }
  _beginPlaying = event => {
    console.log("_beginPlaying");
    this.setState(state => ({
      ...state,
      playing: true
    }));
    this.player.current.internalPlayer.playVideo()
  }

  _stopPlaying = event => {
    console.log("_stopPlaying");
    this.setState(state => ({
      ...state,
      playing: false
    }));
    this.player.current.internalPlayer.pauseVideo()
  }

  YT_onReady = event => {
    console.log("_onReady");
    event.target.pauseVideo(); //works 
  }
  YT_onStateChange = event => {
    console.log("_onStateChange ", this.state);
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