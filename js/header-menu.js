document.addEventListener('DOMContentLoaded',function(){
    var viewportWidth=document.documentElement.clientWidth||0;
    var headerEl=document.querySelector('.header');
    var mobileSubmenuEnabled=false;
    var onHeaderSubmenuClick=null;
    //Menu mobile 
    if(headerEl){
      var toggleEls=headerEl.getElementsByClassName('header__toggle');
      var toggle=(toggleEls&&toggleEls.length)?toggleEls[0]:null;
      var overlay=headerEl.querySelector('[data-header-overlay]');
      var panelEls=headerEl.getElementsByClassName('header__bottom');
      var panel=(panelEls&&panelEls.length)?panelEls[0]:null;

      function openMenu(){
        headerEl.classList.add('header--menu-open');
        if(toggle)toggle.setAttribute('aria-expanded','true');
        document.documentElement.classList.add('no-scroll');
        if(overlay)overlay.classList.add('is-visible');
      }

      function closeMenu(){
        headerEl.classList.remove('header--menu-open');
        if(toggle)toggle.setAttribute('aria-expanded','false');
        document.documentElement.classList.remove('no-scroll');
        if(overlay)overlay.classList.remove('is-visible');

        var openItems=headerEl.querySelectorAll('.header__item--has-submenu.header__item--open');
        for(var i=0;i<openItems.length;i++){
          openItems[i].classList.remove('header__item--open');
          var b=openItems[i].querySelector('.header__link--button');
          if(b)b.setAttribute('aria-expanded','false');
        }
        if(document.activeElement&&document.activeElement!==document.body)document.activeElement.blur();
      }

      function toggleMenu(){
        if(headerEl.classList.contains('header--menu-open'))closeMenu();
        else openMenu();
      }

      if(toggle){
        toggle.addEventListener('click',function(e){
          e.preventDefault();
          toggleMenu();
        });
      }

      if(overlay)overlay.addEventListener('click',closeMenu);

      if(panel){
        panel.addEventListener('click',function(e){
          //console.log('panel')
          var a=e.target&&e.target.closest?e.target.closest('a'):null;
          if(a)closeMenu();
        });
      }

      document.addEventListener('keydown',function(e){
        if(e.key==='Escape')closeMenu();
      });
    }
    // Fin menu mobile

    //submenus del header
    // estado para poder activar/desactivar listener y clases en submenus mobile
    function enableMobileSubmenus(){
      if(mobileSubmenuEnabled||!headerEl)return;
      mobileSubmenuEnabled=true;

      onHeaderSubmenuClick=function(e){
        var btn=e.target&&e.target.closest?e.target.closest('.header__link--button'):null;
        if(!btn||!headerEl.contains(btn))return;

        var li=btn.closest('.header__item--has-submenu');
        if(!li)return;

        var open=!li.classList.contains('header__item--open');

        var openLis=headerEl.querySelectorAll('.header__item--has-submenu.header__item--open');
        for(var i=0;i<openLis.length;i++){
          openLis[i].classList.remove('header__item--open');
          var b=openLis[i].querySelector('.header__link--button');
          if(b)b.setAttribute('aria-expanded','false');
        }

        li.classList.toggle('header__item--open',open);
        btn.setAttribute('aria-expanded',open?'true':'false');
      };

      headerEl.addEventListener('click',onHeaderSubmenuClick);
    }

    function disableMobileSubmenus(){
      if(!mobileSubmenuEnabled||!headerEl)return;
      mobileSubmenuEnabled=false;

      if(onHeaderSubmenuClick){
        headerEl.removeEventListener('click',onHeaderSubmenuClick);
        onHeaderSubmenuClick=null;
      }

      var openLis=headerEl.querySelectorAll('.header__item--has-submenu.header__item--open');
      for(var i=0;i<openLis.length;i++){
        openLis[i].classList.remove('header__item--open');
        var b=openLis[i].querySelector('.header__link--button');
        if(b)b.setAttribute('aria-expanded','false');
      }
    }

    // helper  submenu mobile
    function updateSubmenuMode(){
      viewportWidth=document.documentElement.clientWidth||0;
      if(viewportWidth<992)enableMobileSubmenus();
      else{
        disableMobileSubmenus();
        if(headerEl&&headerEl.classList.contains('header--menu-open'))closeMenu();
      }
    }

    updateSubmenuMode();
    window.addEventListener('resize',function(){
      viewportWidth=document.documentElement.clientWidth;
      updateSubmenuMode(); //activa/desactiva listener click submenús
    },{passive:true});
});
