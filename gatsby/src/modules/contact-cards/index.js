import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { stripTags } from '../../utils';
import axios from 'axios';
import './main.scss';

import { ReactComponent as NewTabIcon } from '../_global/images/icon-new-tab.svg';
import { ReactComponent as DownloadIcon } from '../_global/images/icon-dwnld.svg';
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
              dublin: response.data.dublinData,
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
      const time = (() => {
        const parts = city.time.split(' ');
        return (
          <>
            {parts[0]}
            <small>{parts[1]}</small>
          </>
        );
      })();

      return (
        <>
          <li className="contact__time">{time}</li>
          <li className="contact__weather">
            {Icon && (
              <Icon
                className="icn"
                alt={city.condition.condition || 'weather'}
                viewBox="0 0 24 24"
              />
            )}
            {Math.floor(city.temp)}
            <span dangerouslySetInnerHTML={{ __html: '&deg;' }} />
          </li>
        </>
      );
    }

    return null;
  };
  render() {
    const { contact_cards_repeater: cards } = this.props;
    return (
      <>
        <section className="contact">
          <div className="container">
            <div className="row">
              {cards.map(card => {
                return (
                  <div className="col-lg-6" key={card.location}>
                    <div className="contact__card">
                      <div className="contact__details">
                        <span className="eyebrow">{card.eyebrow}</span>
                        <h2>{card.location}</h2>
                        <address>
                          <span
                            dangerouslySetInnerHTML={{ __html: card.address }}
                          />
                          <a
                            href={`tel:${card.phone.replace(/[^0-9+]/g, '')}`}
                            title="Call us"
                          >
                            {card.phone}
                          </a>
                        </address>
                        <a
                          href={card.google_maps_link || `https://www.google.com/maps/place/${stripTags(card.address)}`}
                          title="Get Directions"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="map-link"
                        >
                          Get Directions{' '}
                          <NewTabIcon
                            className="icn"
                            alt="open map in a new tab"
                            viewBox="0 0 18 18"
                          />
                        </a>
                      </div>
                      <ul className="contact__card-info">
                        {this.renderCityData(card.location.toLowerCase())}
                        <li className="contact__download">
                          <a
                            href={card.capabilities_pdf.url.localFile.publicURL}
                            title="Download factsheet"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Download Factsheet{' '}
                            <DownloadIcon alt="download" className="icn" />
                          </a>
                        </li>
                      </ul>
                      <div className="contact-brief">
                        <div className="contact-brief__text">
                          <h3 className="alt">Want to brief us?</h3>
                        </div>
                        <div className="contact-brief__img">
                          <img
                            src={
                              card.contact_info.image &&
                              card.contact_info.image.localFile &&
                              card.contact_info.image.localFile.childImageSharp
                                .original.src
                            }
                            alt={card.contact_info.name}
                          />
                        </div>
                        <div className="contact-brief__info">
                          <ul>
                            <li>
                              <strong>{card.contact_info.name}</strong>
                            </li>
                            <li>{card.contact_info.title}</li>
                          </ul>
                          <a
                            href={`mailto:${card.contact_info.email}`}
                            title="Mail us"
                          >
                            {card.contact_info.email}
                          </a>
                        </div>
                      </div>
                      <div className="contact__download resp">
                        <a
                          href={card.capabilities_pdf.url.localFile.publicURL}
                          title="Download factsheet"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download factsheet.{' '}
                          <DownloadIcon className="icn" alt="download" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </>
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
      google_maps_link
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
