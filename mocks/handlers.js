require('cross-fetch/polyfill');
const { http, HttpResponse } = require('msw');

const aboutus = require('./data/aboutUs.json');
const stats = require('./data/InterstellarStats.json');
const handlers = [
  http.get(`/api/interstellarStats`, () => {
    console.log('stats', stats);
    return HttpResponse.json(stats);
  }),

  http.get(`/api/aboutusData`, () => {
    console.log('aboutus', aboutus);
    return HttpResponse.json(aboutus);
  }),
];

module.exports = { handlers };
