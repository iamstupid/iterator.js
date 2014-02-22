(function() {
	function dup(pairs){
		var a=JSON.parse(JSON.stringify(pairs));
		return a;
	}

	function pullData() {
		this.data = {};
		this.pull = function(name) {
			return data[name];
		}
	}

	function iterator_former(fn) {
		this.fn = fn;
		this.data = new pullData();
		this.yield = function(pairs) {
			this.data.data = dup(pairs);
			return this.fn.call(this.data);
		}
	}

	function iterator(fn){
		return function(args,funct){
			var block=new iterator_former(funct);
			fn.call(block,args);
		}
	}

	window.iterator=function(fn){
		return iterator(fn);
	}
})();
