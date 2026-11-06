// Agenda das turmas abertas: único lugar a atualizar.
// Para incluir uma turma, acrescente um item. A turma some sozinha depois de "fim" (AAAA-MM-DD).
// "inicio", "horario", "organizador", "cidade" e "endereco" também alimentam os dados de evento para o Google.
window.TURMAS = [
  {
    inicio: '2026-11-12',
    fim: '2026-11-12',
    quando: '12 de novembro',
    data: '12 nov',
    curso: 'Workshop Prospecção Ativa e Conversão em Vendas',
    onde: 'AEMFLO CDL-SJ, São José',
    horario: '19h às 22h30',
    organizador: 'AEMFLO CDL-SJ',
    cidade: 'São José',
    endereco: 'Rua Vidal Procópio Lohn, 91',
    link: 'https://aemflo-cdlsj.org.br/eventos/workshop-prospeccao-ativa-e-conversao-em-vendas/',
    acao: 'Ver detalhes e inscrição'
  },
  {
    inicio: '2026-11-17',
    fim: '2026-11-18',
    quando: '17 de novembro',
    data: '17 e 18 nov',
    curso: 'Gestão de Conflitos e Alinhamento de Equipes Multigeracionais',
    onde: 'CDL Florianópolis',
    horario: '19h às 22h',
    organizador: 'CDL Florianópolis',
    cidade: 'Florianópolis',
    link: 'https://wa.me/5548991855554?text=Ol%C3%A1!%20Quero%20me%20inscrever%20no%20curso%20Gest%C3%A3o%20de%20Conflitos%20e%20Alinhamento%20de%20Equipes%20Multigeracionais%2C%20dias%2017%20e%2018%2F11.',
    acao: 'Inscrição pelo WhatsApp da CDL'
  },
  {
    inicio: '2026-11-24',
    fim: '2026-11-25',
    quando: '24 de novembro',
    data: '24 e 25 nov',
    curso: 'Curso Liderança e Gerenciamento de Equipes',
    onde: 'AEMFLO CDL-SJ, São José',
    horario: '19h às 22h30',
    organizador: 'AEMFLO CDL-SJ',
    cidade: 'São José',
    endereco: 'Rua Vidal Procópio Lohn, 91',
    link: 'https://aemflo-cdlsj.org.br/eventos/curso-lideranca-e-gerenciamento-de-equipes/',
    acao: 'Ver detalhes e inscrição'
  }
];

window.turmasFuturas = function () {
  var d = new Date();
  var hoje = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  return window.TURMAS.filter(function (t) { return t.fim >= hoje; });
};

// Dados de evento (schema.org) das turmas futuras; horário de Brasília, sem horário de verão
window.eventosTurmas = function () {
  function hora(txt) {
    var m = /(\d{1,2})h(\d{2})?/.exec(txt || '');
    return m ? ('0' + m[1]).slice(-2) + ':' + (m[2] || '00') + ':00-03:00' : '';
  }
  return window.turmasFuturas().map(function (t) {
    var partes = (t.horario || '').split(' às ');
    var endereco = { '@type': 'PostalAddress', addressLocality: t.cidade, addressRegion: 'SC', addressCountry: 'BR' };
    if (t.endereco) endereco.streetAddress = t.endereco;
    return {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: t.curso,
      startDate: t.inicio + 'T' + hora(partes[0]),
      endDate: t.fim + 'T' + hora(partes[1]),
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
      location: { '@type': 'Place', name: t.organizador, address: endereco },
      organizer: { '@type': 'Organization', name: t.organizador },
      performer: { '@type': 'Person', name: 'Desirée de Souza Freccia' },
      url: 'https://desireetreinamentos.com.br/turmas/'
    };
  });
};
