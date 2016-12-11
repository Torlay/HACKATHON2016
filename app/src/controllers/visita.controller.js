(function () {
  angular
  .module('visita', [])
  .controller('VisitaController', [
    'crudService',
    'paginationService',
    'urls',
    VisitaController
  ]);
  function VisitaController(crudService, paginationService, urls) {
    var vm = this;

    vm.resposta ='';
    vm.init = 0;
    vm.tam = 0;
    vm.form = '';
    vm.respostaList = '';

    const ERROR_REQUEST = 'Ocorreu algo inesperado ao efetuar ação. Por favor, tente novamente.';

    vm.listRecords = listRecords;
    vm.create = create;
    vm.novo = novo;
    vm.getVistoriadores = getVistoriadores;
    vm.editar = editar;
    vm.search = search;

    vm.nextList = function() { vm.init = paginationService.pageNext(vm.init, vm.tam); };
    vm.prevList = function() { vm.init = paginationService.prevPage(vm.init, vm.tam); };

    //preenche a lista
    listRecords();

    function create() {
      vm.showResposta = false;
      crudService.create(vm.form, urls.visitas)
      .then(function successCallback(resposta) {
        console.log('sucesso');
        listRecords();
      }, function errorCallback() {
        console.log('erro');
      });
    }

    function getVistoriadores(filtro) {
      crudService.search(filtro, urls.vistoriadores + '?id=')
      .then(function successCallback(resposta){
        vm.vistoriadorList = angular.fromJson(resposta.data);
      }, function errorCallback() {
        vm.respostaList = ERROR_REQUEST;
      });
    }

    function getClientes() {
      crudService.list(urls.clientes)
      .then(function successCallback(resposta){
        vm.clienteList = angular.fromJson(resposta.data);
      }, function errorCallback() {
        vm.respostaList = ERROR_REQUEST;
      });
    }

    function listRecords() {
      crudService.list(urls.visitas)
      .then(function successCallback(resposta) {
        vm.list = angular.fromJson(resposta.data);
        vm.tam = vm.list.length;
        if (vm.tam === 0) {
          vm.respostaList = 'Não foram encontrados registros';
        }
      }, function errorCallback() {
        vm.respostaList = ERROR_REQUEST;
      });
    }

    function search(filtro) {
      crudService.search(filtro, urls.vistoriadores + '?filtro=')
      .then(function successCallback(resposta) {
        vm.list = angular.fromJson(resposta.data);
        vm.tam = vm.list.length;
        if (vm.tam === 0) {
          vm.respostaList = 'Não foram encontrados registros';
        }
      },
      function errorCallback() {
        vm.respostaList = ERROR_REQUEST;
      });
    }

    function editar(visita) {
      vm.form = angular.copy(visita);
      vm.form.id = visita.id;
      vm.form.idCliente = visita.idCliente;
      vm.form.idVistoriador = visita.idVistoriador;
    }

    function novo() {
      clear();
      getClientes();
    }

    function clear() {
      vm.form = '';
      vm.resposta = '';
    }
  }

})();
