import flightDateGenerator from './date.generator';
import should from 'should';

function generateDateTest() {
  it('Date String convert to be new Date object', () => {
    const result = flightDateGenerator('2021-10-15');
    result.should.be.instanceof(Date);
  });
}

export default generateDateTest;
