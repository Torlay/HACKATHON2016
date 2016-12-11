(function() {
  angular
    .module('saalc')
    .constant('urls', {
      vistoriadores: 'http://localhost:52621/api/vistoriador',
      vistoriadorFiltro: 'http://localhost:52621/api/vistoriador/',
      clientes: 'http://localhost:52621/api/cliente',
      avaliacoes: 'http://localhost:52621/api/avaliacao',
      visitas: 'http://localhost:52621/api/visita'
    });
})();
