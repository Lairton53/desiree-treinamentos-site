// Conta os cliques nos botões de conversa: página, botão e horário. Sem cookie e sem guardar quem clicou.
// Grava em site_cliques pela Edge Function site-clique (Supabase, projeto radar-maquina). Ver /privacidade/.
(function(){
  var URL_CLIQUE='https://ouebpvwpapyjrotaisgl.supabase.co/functions/v1/site-clique';
  function nome(a){
    var h=a.getAttribute('href')||'';
    if(a.getAttribute('data-clique'))return a.getAttribute('data-clique');
    if(a.classList.contains('ir'))return 'turma-inscricao';
    if(h.indexOf('https://wa.me/')===0)return 'whatsapp';
    if(h.indexOf('mailto:')===0)return 'email';
    return '';
  }
  document.addEventListener('click',function(e){
    var a=e.target.closest?e.target.closest('a'):null;
    if(!a||!navigator.sendBeacon)return;
    var b=nome(a);
    if(!b)return;
    try{navigator.sendBeacon(URL_CLIQUE,JSON.stringify({p:location.pathname,b:b}));}catch(err){}
  },true);
})();
