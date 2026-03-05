document.addEventListener('DOMContentLoaded',function(){
  var form=document.querySelector('.newsletter');
  if(!form)return;

  var nameEl=form.querySelector('#nl-name');
  var emailEl=form.querySelector('#nl-email');
  var btn=form.querySelector('.newsletter__submit');
  var statusEl=form.querySelector('.newsletter__status');

  var hp=form.querySelector('input[name="company"]');
  if(!hp){
    hp=document.createElement('input');
    hp.type='text';
    hp.name='company';
    hp.autocomplete='off';
    hp.tabIndex=-1;
    hp.className='hp';
    hp.setAttribute('aria-hidden','true');
    form.appendChild(hp);
  }

  var bornAt=Date.now();
  var locked=false;

  function setStatus(msg,type){
    if(!statusEl)return;
    statusEl.textContent=msg||'';
    statusEl.classList.remove('newsletter__status--ok','newsletter__status--err');
    if(type==='ok')statusEl.classList.add('newsletter__status--ok');
    if(type==='err')statusEl.classList.add('newsletter__status--err');
  }

  function setLoading(on){
    if(!btn)return;
    btn.disabled=!!on;
    btn.classList.toggle('is-loading',!!on);
    if(!on)setStatus('');
  }

  function trimField(el){
    if(!el||typeof el.value!=='string')return;
    el.value=el.value.trim();
  }

  function normalizeName(){
    if(!nameEl||typeof nameEl.value!=='string')return;
    var v=nameEl.value;
    v=v.replace(/\s+/g,' ').trim();          // colapsa espacios
    v=v.replace(/[\u0000-\u001F\u007F]/g,''); // quita control chars
    v=v.replace(/[<>[\]{}]/g,'');            // quita “spammy chars” comunes
    nameEl.value=v;
  }

  function normalizeEmail(){
    if(!emailEl||typeof emailEl.value!=='string')return;
    emailEl.value=emailEl.value.trim();
  }

  if(nameEl){
    nameEl.addEventListener('blur',function(){normalizeName();});
  }
  if(emailEl){
    emailEl.addEventListener('blur',function(){normalizeEmail();});
  }

  function isProbablyBot(){
    if(hp&&hp.value)return true;
    if(Date.now()-bornAt<2500)return true;
    return false;
  }

  form.addEventListener('submit',function(e){
    if(locked){e.preventDefault();return;}

    trimField(nameEl);
    trimField(emailEl);
    normalizeName();
    normalizeEmail();

    if(isProbablyBot()){
      e.preventDefault();
      return;
    }

    setStatus('Sending your subscription…');
setLoading(true);
locked=true;

// TODO backend: acá va el fetch()
// Cuando esté el backend: en .then/.catch vas a hacer setLoading(false), locked=false y setStatus(...) según respuesta.
e.preventDefault();
return;

    
  },{passive:false});
});
