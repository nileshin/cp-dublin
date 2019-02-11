import fetch from "node-fetch";
require("dotenv").config();

const OWM_API_KEY = process.env.OWM_API_KEY;
const DUBLIN_ID = "2964574";
const BOSTON_ID = "4951305";

const BOSTON_API_URL = `http://api.openweathermap.org/data/2.5/weather?id=${BOSTON_ID}&APPID=${OWM_API_KEY}`;
const DUBLIN_API_URL = `http://api.openweathermap.org/data/2.5/weather?id=${DUBLIN_ID}&APPID=${OWM_API_KEY}`;

exports.handler = async (event, context) => {
  let bostonData, dublinData;
  return fetch(BOSTON_API_URL)
    .then(response => response.json())
    .then(data => {
      bostonData = data
    })
    .then(() => {
      return fetch(DUBLIN_API_URL)
        .then(response => response.json())
        .then(data => {
          dublinData = data
          return {
            statusCode: 200,
            body: JSON.stringify({
              bostonData,
              dublinData
            })
          }
        })
        .catch(error => ({ statusCode: 422, body: String(error) }));
    })
    .catch(error => ({ statusCode: 422, body: String(error) }));
};
