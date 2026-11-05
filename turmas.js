// Agenda das turmas abertas: único lugar a atualizar.
// Para incluir uma turma, acrescente um item. A turma some sozinha depois de "fim" (AAAA-MM-DD).
window.TURMAS = [
  {
    fim: '2026-11-12',
    quando: '12 de novembro',
    data: '12 nov',
    curso: 'Workshop Prospecção Ativa e Conversão em Vendas',
    onde: 'AEMFLO CDL-SJ, São José',
    horario: '19h às 22h30',
    link: 'https://aemflo-cdlsj.org.br/eventos/workshop-prospeccao-ativa-e-conversao-em-vendas/',
    acao: 'Ver detalhes e inscrição'
  },
  {
    fim: '2026-11-18',
    quando: '17 de novembro',
    data: '17 e 18 nov',
    curso: 'Gestão de Conflitos e Alinhamento de Equipes Multigeracionais',
    onde: 'CDL Florianópolis',
    horario: '19h às 22h',
    link: 'https://wa.me/5548991855554?text=Ol%C3%A1!%20Quero%20me%20inscrever%20no%20curso%20Gest%C3%A3o%20de%20Conflitos%20e%20Alinhamento%20de%20Equipes%20Multigeracionais%2C%20dias%2017%20e%2018%2F11.',
    acao: 'Inscrição pelo WhatsApp da CDL'
  },
  {
    fim: '2026-11-25',
    quando: '24 de novembro',
    data: '24 e 25 nov',
    curso: 'Curso Liderança e Gerenciamento de Equipes',
    onde: 'AEMFLO CDL-SJ, São José',
    horario: '19h às 22h30',
    link: 'https://aemflo-cdlsj.org.br/eventos/curso-lideranca-e-gerenciamento-de-equipes/',
    acao: 'Ver detalhes e inscrição'
  }
];

window.turmasFuturas = function () {
  var d = new Date();
  var hoje = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  return window.TURMAS.filter(function (t) { return t.fim >= hoje; });
};
