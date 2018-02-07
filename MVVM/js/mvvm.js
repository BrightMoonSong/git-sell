function Zhufeng(options = {}) {
	this.$options = options; // 将所有属性挂载在了$options
	// this._data
	var data = this._data = this.$options.data;
	observe(data);
	// this 代理了this._data;
	for(let key in data) {
		Object.defineProperty(this, key, {
			enumerable: true,
			get() {
				return this._data[key]; // this.a = {a:1}
			},
			set(newVal) {
				this._data[key] = newVal;
			}
		})
	}
}
// 类
// 观察对象给对象增加ObjectDefineProperty
function Observe(data) { // 这里写我们的主要逻辑 
	for(let key in data) { // 把data属性通过object
		let val = data[key];
		observe(val);
		// .defineProperty的方式  定义属性
		Object.defineProperty(data, key, {
			enumerable: true, // 可枚举
			get() {
				return val;
			},
			set(newVal) { // 更改值得时候
				if(newVal === val) { // 设置的值和以前的是一样的东西，不做处理
					return;
				}
				val = newVal; // 后续获取值得时候将刚才设置的值再丢回去
			}
		});
	}
}

function observe(data) {
	return new Observe(data);
}
// vue特点不能新增不存在的属性  不能存在的属性没有get和set
// 深度响应  因为每次赋予一个新对象时会给这个新对象增加数据劫持