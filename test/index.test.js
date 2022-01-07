var assert = require('assert');
var TestClass = require('../src/index')

describe('Array', function() {
  describe('#indexOf()', function(done) {
    it('should return -1 when the value is not present', function() {
      let test = new TestClass() 

      assert.equal(test.name, "asdss");  
    });
  });
});