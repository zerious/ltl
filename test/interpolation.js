var ltl = require('../lib/ltl');
var assert = require('assert');

describe('Interpolation', function () {
	describe('Math', function () {
		it('should not be contextified', function () {
			var template = ltl.compile('for n in list\n . sqrt(#{n}): #{Math.sqrt(n).toFixed(4)}');
			var result = template({list:[1, 2, 3]});
			assert.equal(result, '<div>sqrt(1): 1.0000</div><div>sqrt(2): 1.4142</div><div>sqrt(3): 1.7321</div>');
		});
	});
});