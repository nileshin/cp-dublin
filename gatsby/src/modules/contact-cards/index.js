import React, { Component } from 'react';
import { graphql } from 'gatsby';
import axios from 'axios';

import { ReactComponent as BrokenClouds } from '../_global/images/weather_icons/BrokenClouds.svg';
import { ReactComponent as ClearSky } from '../_global/images/weather_icons/ClearSky.svg';
import { ReactComponent as FewClouds } from '../_global/images/weather_icons/FewClouds.svg';
import { ReactComponent as Mist } from '../_global/images/weather_icons/Mist.svg';
import { ReactComponent as Rain } from '../_global/images/weather_icons/Rain.svg';
import { ReactComponent as ScatteredClouds } from '../_global/images/weather_icons/ScattredClouds.svg';
import { ReactComponent as ShowerRain } from '../_global/images/weather_icons/ShowerRain.svg';
import { ReactComponent as Snow } from '../_global/images/weather_icons/Snow.svg';
import { ReactComponent as Thunderstorm } from '../_global/images/weather_icons/Thunderstorm.svg';

const WEATHER_ICONS = {
  '04': BrokenClouds,
  '01': ClearSky,
  '02': FewClouds,
  '50': Mist,
  '10': Rain,
  '03': ScatteredClouds,
  '09': ShowerRain,
  '13': Snow,
  '11': Thunderstorm,
};

class ContactCards extends Component {
  state = {
    cityData: {
      boston: null,
      dublin: null,
    },
  };
  componentDidMount() {
    axios
      .get('/.netlify/functions/getCityData')
      .then(response => {
        this.setState(state => {
          return {
            ...state,
            cityData: {
              boston: response.data.bostonData,
              dublin: response.data.dublinData
            },
          };
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  renderCityData = cityName => {
    if (this.state.cityData[cityName]) {
      const city = this.state.cityData[cityName];
      const Icon = WEATHER_ICONS[city.condition.icon];
      return (
        <pre>
          <code>
            {cityName} - {city.temp} {city.condition.condition}(
            {Icon && <Icon />}) - ({city.time})
          </code>
        </pre>
      );
    }

    return null;
  };
  render() {
    return (
      <div>
        Contact Cards
        <pre>
          <code>{JSON.stringify(this.props, null, 1)}</code>
        </pre>
        {this.renderCityData('boston')}
        {this.renderCityData('dublin')}
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
