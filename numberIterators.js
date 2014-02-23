//this is a demo of iterator.js
//but the version iterator.js is now at cannot
//reach the goal
//so I am developing a better solution
Number.iterator(function(){
  var up=this.valueOf();
  for(var i=0;i<up;i++){
    this.yield({n:i});
  }
  return null;
},"times");
