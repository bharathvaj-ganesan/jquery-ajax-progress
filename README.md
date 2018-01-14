# JQUERY AJAX PROGRESS PLUGIN

> A simple patch to jQuery that will call a 'progress' callback, using the XHR.onProgress event

### Getting started

```html
<script src="/jquery.ajax.progress.min"></script>
```

### Usuage

```js
$.ajax({
	method: 'GET',
	url: 'data/bird.json',
	dataType: 'json',
	success: () => {
		console.log('Success');
	},
	error: () => {},
	progress:event=> {
		//make sure we can compute the length
		if event.lengthComputable) {
			//calculate the percentage loaded
			const pct = event.loaded / event.total * 100;

			// You can display or make use of the percentage loaded
			console.log(pct);
		} else {
			//this usually happens when Content-Length isn't set
			console.warn('Content Length not reported!');
		}
	}
});
```

## License

MIT © [Bharathvaj Ganesan](https://github.com/bharathvaj1995)
