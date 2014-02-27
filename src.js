(function() {
	function dup(pairs){
		var a=JSON.parse(JSON.stringify(pairs));
		return a;
	}

	function pullData() {
		this.data = {};
		this.pull = function(name) {
			return this.data[name];
		}
	}

	function iterator_former(fn,x) {
		x.fn = fn;
		x.data = new pullData();
		x.yield = function(pairs) {
			this.data.data = dup(pairs);
			return this.fn.call(this.data);
		}
		x.hasBlock = function(){
			return typeof this.fn !== "function";
		}
		return x;
	}

	function iterator(fn){
		return function(args,funct){
			var block=iterator_former.call(this,funct,this);
			return fn.call(block,args);
		}
	}

	window.iterator=function(fn){
		return iterator(fn);
	}

	Function.prototype.iterator=function(fn,name){
		this.prototype[name]=function(args,funct){
			var a=iterator(fn);
			return a.call(this,args,funct);
		}
	}
})();
