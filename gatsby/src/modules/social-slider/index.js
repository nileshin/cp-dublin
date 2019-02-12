import React, { Component } from 'react';
import JuicerFeed from 'react-juicer-feed';
import './main.scss';

class SocialSlider extends Component {
  render() {
    return (
      <div className="juicer-container container">
        <JuicerFeed feedId="cpinsta" />
        <div className="home-banner" />
      </div>
    );
  }
}

export default SocialSlider;
