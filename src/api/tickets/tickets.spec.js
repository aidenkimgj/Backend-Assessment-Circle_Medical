import app from '../../index';
import request from 'supertest';
import should from 'should';

export default function ticketAPI() {
  let flight = {
      ticketId: 1,
      flightDate: '2021-11-01',
      flightNumber: 'AC1',
      seatNumber: '1A',
      ticketCost: 100000,
    },
    flight2 = {
      ticketId: 2,
      flightDate: '2021-11-01',
      flightNumber: 'AC1',
      seatNumber: '1A',
      ticketCost: 100000,
    },
    body;
  describe('if successful', () => {
    before(done => {
      request(app)
        .post('/api/tickets')
        .send({ event: flight })
        .end((err, res) => {
          body = res.body;
          done();
        });
    });

    it('it will respond message', () => {
      body.should.have.property('status', 'success');
    });
  });

  describe('if failure', () => {
    it('Return 400 if the ticketId is duplicate', done => {
      request(app)
        .post('/api/tickets')
        .send({ event: flight })
        .expect(400)
        .end(done);
    });

    it('Return 400 if the seatNumber is duplicate', done => {
      request(app)
        .post('/api/tickets')
        .send({ event: flight2 })
        .expect(400)
        .end(done);
    });
  });
}
