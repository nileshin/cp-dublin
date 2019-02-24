import React, { Component } from 'react';
import { graphql } from 'gatsby';

import { ReactComponent as Hamburger } from '../_global/images/hamburger-close.svg';


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
          <div>
            {supportive_copy}
          </div>
        </div>
        <div className="blob yt-v">
          <img src={thumbnail.localFile.childImageSharp.fluid.src} alt="video image" className="cover" />
          <iframe width="460" height="315" data-src={video_embed_code} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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