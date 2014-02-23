Number.iterator(function(){
  var up=this.valueOf();
  for(var i=0;i<up;i++){
    this.yield({n:i});
  }
  return null;
},"times");
/**
 * Ruby-style times iterator for Number s.
 * */
