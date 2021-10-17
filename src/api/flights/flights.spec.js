import app from '../../index';
import request from 'supertest';
import should from 'should';

export default function flightAPI() {
  describe('if successful', () => {
    it('it will respond dates object', done => {
      request(app)
        .get('/api/flights?startDate=2021-11-01&endDate=2021-11-03')
        .end((err, res) => {
          res.body.should.be.instanceof(Object);
          done();
        });
    });
  });

  describe('if failure', () => {
    it('if startDate or endDate are not given by the request, return a status code of 400', done => {
      request(app)
        .get('/api/flights?startDate=&endDate=2021-11-03')
        .expect(400)
        .end(done);
    });

    it('if startDate or endDate are not properly formatted, return a status code of 400', done => {
      request(app)
        .get('/api/flights?startDate=2021-1111&endDate=2021-11-03')
        .expect(400)
        .end(done);
    });

    it('if the endDate is before the startDate, return a status code of 400', done => {
      request(app)
        .get('/api/flights?startDate=2021-11-11&endDate=2021-11-03')
        .expect(400)
        .end(done);
    });
  });
}
