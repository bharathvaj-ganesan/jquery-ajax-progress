'use strict';
/* eslint no-console : 0 */
var jQuery = require('jquery');
describe('Detect jquery ajax progress', function() {
	jQuery.ajax({
		method: 'GET',
		url: 'https://www.metaweather.com/api/location/search/?query=chennai',
		dataType: 'json',
		success: function(response) {
			it('must call success callback', function() {
				expect(response).not.toBeUndefined();
			});
		},
		error: function() {},
		progress: function(e) {
			var pct = null;
			//make sure we can compute the length
			if (e.lengthComputable) {
				//calculate the percentage loaded
				pct = e.loaded / e.total * 100;

				it('must call progress callback', function() {
					expect(pct).not.toBeUndefined();
				});
			} else {
				//this usually happens when Content-Length isn't set
				console.warn('Content Length not reported!');
			}
		}
	});
});
