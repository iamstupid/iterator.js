Number.iterator(function(){
	var up=this.valueOf();
	if(this.hasBlock()){
		for(var i=0;i<up;i++){
			this.yield({n:i});
		}
	}else{
		return new Iterator(function(){
			var up=this.pull("up");
			this.data.last++;
			if(this.data.last>up){
				this.end();
			}else{
				return this.data.last;
			}
		},{last:0,up:up});
	}
	return null;
},"times");
Number.iterator(function(upTo){
	var low=this.valueOf();
	for(var i=low;i<=upTo;i++){
		this.yield({n:i});
	}
	return null;
},"upto");
Number.iterator(function(downTo){
	var high=this.valueOf();
	for(var i=high;i>=downTo;i--){
		this.yield({n:i});
	}
	return null;
},"downto");
/**
 * Ruby-style times iterator for Number s.
 * */
