document.addEventListener('DOMContentLoaded',function(){
  var fxEls=document.querySelectorAll('.fx-fade-up-var');
  if(!fxEls.length)return;
  function fxIndexGroup(el){
    var parent=el.parentNode;
    if(!parent||parent.__fxIndexed)return;
    parent.__fxIndexed=true;
    var kids=parent.querySelectorAll('.fx-fade-up-var');
    for(var i=0;i<kids.length;i++){
      kids[i].style.setProperty('--fx-i',i);
    }
  }
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    for(var k=0;k<fxEls.length;k++)fxEls[k].classList.add('fx-run');
    return;
  }
  var fxIO=new IntersectionObserver(function(entries,observer){
    for(var i=0;i<entries.length;i++){
      var entry=entries[i];
      if(!entry.isIntersecting)continue;
      fxIndexGroup(entry.target);
      entry.target.classList.add('fx-run');
      observer.unobserve(entry.target);
    }
  },{threshold:0,rootMargin:'0px 0px -15% 0px'});
  for(var j=0;j<fxEls.length;j++)fxIO.observe(fxEls[j]);
});