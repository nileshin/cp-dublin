import React, { Component } from 'react';
import { graphql } from 'gatsby';
import './main.scss';

class NewsletterCapture extends Component {
  render() {
    const { title, placeholder_copy, cta_copy, copy, image } = this.props;
    return (
      <section className="newsletter bg-dark row full-bleed-parent">
        <div className="col-12 full-width">
        <div className="container">
          <div className="row">
            <div className="col-md-5 col-lg-8">
              <div className="newsletter__detail">
                <h2>{title}</h2>
                <p>{copy}</p>
              </div>
            </div>
            <div className="col-md-7 col-lg-4">
              <form id="newsletter-form" className="newsletter-form">
                <label for="newsletter_email" className="sr-only">
                  {placeholder_copy}
                </label>
                <input type="email" name="newsletter_email" id="newsletter_email" placeholder={placeholder_copy} />
                <input type="submit" value={cta_copy} title="submit" />
              </form>
            </div>
          </div>
        </div>
        </div>
      </section>
    );
  }
}

export default NewsletterCapture;

export const newsletterCaptureFragment = graphql`
  fragment NewsletterCaptureFragment on newsletterCapture_8 {
    title
    placeholder_copy
    cta_copy
    copy
    image {
      ...WpMediaFragmentFluid
    }
  }
`