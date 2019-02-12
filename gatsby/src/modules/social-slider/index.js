import React, { Component } from 'react';
import JuicerFeed from 'react-juicer-feed';
import './main.scss'


class SocialSlider extends Component {
  render() {
    return (
      <>
      <JuicerFeed feedId="cpinsta" />
      <div className="home-banner" />
      </>
    );
  }
}

export default SocialSlider;
