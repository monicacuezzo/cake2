document.addEventListener('DOMContentLoaded',function(){
    var fxEls=document.querySelectorAll('.fx-fade-up-var');

    //no esperar al observer, no hacer la animación y que queden visibles directamente
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
        for(var k=0;k<fxEls.length;k++)fxEls[k].classList.add('fx-run');
        return;
    }

    function fxRestart(el){
      el.classList.remove('fx-run');
      el.style.animation='none';
      void el.offsetWidth; // reflow
      el.style.animation='';
      el.classList.add('fx-run');
    }

    function fxIndexGroup(el){
      var parent=el.parentNode;
      if(!parent)return;
      // Setea indices solo una vez por contenedor (para stagger)
      if(parent.__fxIndexed)return;
      parent.__fxIndexed=true;
      var kids=parent.querySelectorAll('.fx-fade-up-var');
      for(var i=0;i<kids.length;i++){
        kids[i].style.setProperty('--fx-i', i);
      }
    }

    // Animaciones textos e img
    if(fxEls&&fxEls.length){
      var fxIO=new IntersectionObserver(function(entries){
        for(var i=0;i<entries.length;i++){
          var e=entries[i];
          var el=e.target;
          if(e.isIntersecting){
            fxIndexGroup(el);   // arma stagger por bloque automáticamente
            fxRestart(el);      // re-anima siempre al entrar
          }else{
            el.classList.remove('fx-run'); // al re-entrar vuelve a arrancar
          }
        }
      },{
        threshold:0,
        rootMargin:'0px 0px -15% 0px' // dispara cuando está por entrar 
      });

      for(var j=0;j<fxEls.length;j++) fxIO.observe(fxEls[j]);
    }

});