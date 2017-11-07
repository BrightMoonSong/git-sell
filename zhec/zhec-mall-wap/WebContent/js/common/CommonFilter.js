function priceFormatFilter() {
	return function(input) {
		// console.log('价格过滤器输入值');
		// console.log(input);
		input = Math.round(input * 100) / 100;
		var out = '';
		var temp = '';
		var strinput = input + '';
		out = strinput.split('.')[0];
		temp = strinput.split('.')[1];
		if (out == undefined || out == null || out == 'undefined' || out == NaN || out == 'NaN') {
			out = '';
		} else {
			out = '￥' + out;
			if (temp == undefined) {
				out = out + '.00';
			} else {
				if (temp.length !== 1) {
					out = out + '.' + temp;
				} else {
					out = out + '.' + temp + '0';
				}
			}
		}
		// console.log('价格过滤器输出值');
		// console.log(out);

		return out;
	};
}
