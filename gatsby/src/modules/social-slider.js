import React, { Component } from 'react';
import { StaticQuery, graphql } from 'gatsby';

class SocialSlider extends Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            wordpressCpInstagramWidget(
              sidebar_name: { eq: "cp-instagram-widget" }
            ) {
              html
            }
          }
        `}
        render={data => {
          return (
            <div
              dangerouslySetInnerHTML={{
                __html: data.wordpressCpInstagramWidget.html,
              }}
            />
          );
        }}
      />
    );
  }
}

export default SocialSlider;
