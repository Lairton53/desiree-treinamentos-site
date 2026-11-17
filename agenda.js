// Inscrição na agenda de cursos: manda e-mail, página e a caixa marcada para a Edge Function
// site-agenda (Supabase, projeto radar-maquina), que grava em contato_consentimentos.
// Sem a caixa marcada nada é enviado. Sem cookie e sem chave do Supabase no site. Ver /privacidade/.
(function(){
  var URL_AGENDA='https://ouebpvwpapyjrotaisgl.supabase.co/functions/v1/site-agenda';
  var form=document.getElementById('agendaForm');
  if(!form||!window.fetch)return;
  var email=document.getElementById('agendaEmail');
  var aceite=document.getElementById('agendaAceite');
  var botao=document.getElementById('agendaBotao');
  var aviso=document.getElementById('agendaAviso');
  function dizer(texto,erro){aviso.textContent=texto;aviso.className='agenda-aviso'+(erro?' erro':' ok');}
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var endereco=(email.value||'').trim().toLowerCase();
    if(!/^[a-z0-9._%+-]{1,64}@[a-z0-9.-]{1,180}\.[a-z]{2,24}$/.test(endereco)){
      dizer('Confira o e-mail: ele parece incompleto.',true);email.focus();return;
    }
    if(!aceite.checked){
      dizer('Marque a caixa para confirmar que quer receber a agenda.',true);aceite.focus();return;
    }
    botao.disabled=true;dizer('Enviando...',false);
    fetch(URL_AGENDA,{method:'POST',headers:{'content-type':'text/plain'},
      body:JSON.stringify({e:endereco,a:true,p:location.pathname})})
    .then(function(r){
      if(r.status===204){
        form.reset();
        dizer('Pronto. Você vai receber a agenda de cursos em '+endereco+'.',false);
      }else if(r.status===429){
        dizer('Muitos pedidos agora. Tente de novo em um minuto.',true);
      }else{
        dizer('Não foi possível registrar agora. Escreva para desiree@desireetreinamentos.com.br.',true);
      }
    })
    .catch(function(){
      dizer('Sem conexão agora. Tente de novo ou escreva para desiree@desireetreinamentos.com.br.',true);
    })
    .then(function(){botao.disabled=false;});
  });
})();
