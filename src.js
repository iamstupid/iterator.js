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

	function iter(fn,dt){
		this.data=new pullData();
		this.data.data=dup(dt);
		this.data.end=function(){
			throw("end");
		}
		this.fn=fn;
		this.next=function(){
			try{
				return this.fn.call(this.data);
			}catch(e){
				if(e=="end"){
					throw(new ReferenceError("try to call next on a iterator that is out-of-range"));
				}else{
					throw(e);
				}
			}
		}
		this.restart=function(){
			this.data.data=dt;
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

	window.Iterator=iter;
})();
