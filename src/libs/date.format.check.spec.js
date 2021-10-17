import dateFormatCheck from './date.format.check';
import should from 'should';

function dateFormatCheckTest() {
  it('Date String check fomatting', () => {
    const result = dateFormatCheck('2021-10-15');
    result.should.be.instanceof(Boolean);
  });
}

export default dateFormatCheckTest;
