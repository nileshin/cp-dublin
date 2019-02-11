const fetch = require('node-fetch');
const moment = require('moment-timezone');
require('dotenv').config();

const OWM_API_KEY = process.env.OWM_API_KEY;
const DUBLIN_ID = '2964574';
const BOSTON_ID = '4951305';

const BOSTON_API_URL = `http://api.openweathermap.org/data/2.5/weather?id=${BOSTON_ID}&APPID=${OWM_API_KEY}&units=imperial`;
const DUBLIN_API_URL = `http://api.openweathermap.org/data/2.5/weather?id=${DUBLIN_ID}&APPID=${OWM_API_KEY}&units=metric`;

const BOSTON_TIME = 'http://worldclockapi.com/api/json/est/now';
const DUBLIN_TIME = 'http://worldclockapi.com/api/json/gmt/now';

const getWeather = data => {
  const temp = data.main.temp;
  const condition = (() => {
    if (!data.weather.length) return null;
    return {
      condition: data.weather[0].main,
      condition_detail: data.weather[0].description,
      icon: data.weather[0].icon.replace(/[a-z]+$/, ''),
    };
  })();

  return {
    temp,
    condition,
  };
};

exports.handler = async (event, context) => {
  let bostonData, dublinData;
  return fetch(BOSTON_API_URL)
    .then(response => response.json())
    .then(data => {
      bostonData = getWeather(data);
    })
    .then(() => {
      return fetch(DUBLIN_API_URL);
    })
    .then(response => response.json())
    .then(data => {
      dublinData = getWeather(data);
    })
    .then(() => fetch(BOSTON_TIME))
    .then(response => response.json())
    .then(data => {
      const time = moment(data.currentDateTime).tz('America/New_York').format('hh:mm a');
      bostonData.time = time
    })
    .then(() => fetch(DUBLIN_TIME))
    .then(response => response.json())
    .then(data => {
      const time = moment(data.currentDateTime).tz('Europe/Dublin').format('hh:mm a');
      dublinData.time = time
      return {
        statusCode: 200,
        body: JSON.stringify({
          bostonData,
          dublinData,
        }),
      };
    })
    .catch(error => ({ statusCode: 422, body: String(error) }));
};
