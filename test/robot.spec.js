let chai = require('chai'),
  path = require('path');

chai.should();

let Robot = require(path.join(__dirname, '..', 'robot'));

describe('Robot', () => {
  describe('#constructor()', () => {
    it('requires no arguments', () => {
      () => {
        new Rectangle();
      }.should.throw(Error);
    });
  });

});
