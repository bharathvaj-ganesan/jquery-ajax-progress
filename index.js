(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else if (typeof module === 'object' && module.exports) {
		// Node/CommonJS
		module.exports = function(root, jQuery) {
			if (jQuery === undefined) {
				if (typeof window !== 'undefined') {
					jQuery = require('jquery');
				} else {
					jQuery = require('jquery')(root);
				}
				//is onprogress supported by browser?
				var hasOnProgress = 'onprogress' in jQuery.ajaxSettings.xhr();

				//If not supported, do nothing
				if (!hasOnProgress) {
					return;
				}

				//patch ajax settings to call a progress callback
				var oldXHR = jQuery.ajaxSettings.xhr;
				jQuery.ajaxSettings.xhr = function() {
					var xhr = oldXHR.apply(this, arguments);
					if (xhr instanceof window.XMLHttpRequest) {
						xhr.addEventListener('progress', this.progress, false);
					}

					if (xhr.upload) {
						xhr.upload.addEventListener('progress', this.progress, false);
					}

					return xhr;
				};
			}
			factory(jQuery);
			return jQuery;
		};
	} else {
		// Browser globals
		factory(jQuery);
	}
})(function($) {
	$.fn.jqueryPlugin = function() {
		return true;
	};
});
