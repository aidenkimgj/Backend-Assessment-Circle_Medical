import generateDateTest from '../libs/date.generator.spec';
import dateFormatCheckTest from '../libs/date.format.check.spec';
import ticketAPI from '../api/tickets/tickets.spec';
import flightAPI from '../api/flights/flights.spec';

describe('application test', () => {
  describe(
    'unit test for flightDateGenerator function in date.generator.js module is',
    generateDateTest.bind(this)
  );

  describe(
    'unit test for dateFormatCheck function in date.format.check.js module is',
    dateFormatCheckTest.bind(this)
  );

  describe('integration test for POST /api/tickets is', ticketAPI.bind(this));

  describe('integration test for GET /api/flights is', flightAPI.bind(this));
});
