import React, { Component } from 'react';
import { graphql } from 'gatsby';

import { ReactComponent as Hamburger } from '../_global/images/hamburger-close.svg';
//import './main.js';

class QuoteBlobVideoModule extends Component {
  render() {
    const { video_embed_code, eyebrow, quote,  author, author_title, supportive_copy, thumbnail} = this.props;
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
        <div className="blob yt-v">
          <img src={thumbnail.localFile.childImageSharp.fluid.src} alt="video thumb" className="cover" />
          <div
            dangerouslySetInnerHTML={{
              __html: video_embed_code ,
            }}
          />          
          <div className="vid-thumb"></div>
          <span className="stop">
            <Hamburger alt="stop" />
          </span>
        </div>
      </div>
    </section>
    );
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
    thumbnail {
      ...WpMediaFragmentFluid1440
    }
  }
`