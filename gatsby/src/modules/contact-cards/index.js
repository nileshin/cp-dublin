import React, { Component } from 'react';
import { graphql } from 'gatsby';
import axios from 'axios';

class ContactCards extends Component {
  state = {
    weather: {
      boston: null,
      dublin: null,
    },
  };
  componentDidMount() {
    axios
      .get('/.netlify/functions/getWeather')
      .then(response => {
        console.log(response);
        this.setState(state => ({
          ...state,
          weather: {
            boston: response.data.bostonData,
            dublin: response.data.dublinData,
          },
        }));
      })
      .catch(error => {
        console.error(error);
      });
  }
  renderWeather = cityName => {
    if (this.state.weather[cityName]) {
      const city = this.state.weather[cityName];
      return (
        <pre><code>
          {cityName} - {city.temp} {city.condition.condition}({city.condition.icon})
          </code></pre>
      )
    }

    return null;
  }
  render() {
    return (
      <div>
        Contact Cards
        <pre>
          <code>{JSON.stringify(this.props, null, 1)}</code>
        </pre>
        {this.renderWeather('boston')}
        {this.renderWeather('dublin')}
      </div>
    );
  }
}

export default ContactCards;

export const contactCardsFragment = graphql`
  fragment ContactCardsFragment on contactCards_8 {
    contact_cards_repeater {
      eyebrow
      location
      address
      phone
      capabilities_pdf {
        url {
          localFile {
            publicURL
          }
        }
      }
      contact_info {
        name
        title
        email
        image {
          ...WpMediaFragment
        }
      }
    }
  }
`;
