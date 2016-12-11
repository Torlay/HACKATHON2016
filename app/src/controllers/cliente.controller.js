(function () {
  angular
  .module('cliente', [])
  .controller('ClienteController', [
    'crudService',
    'paginationService',
    'urls',
    ClienteController
  ]);
  function ClienteController(crudService, paginationService, urls) {
    var vm = this;

    vm.init = 0;
    vm.tam = 0;
    vm.form = '';
    vm.respostaList = '';

    const ERROR_REQUEST = 'Ocorreu algo inesperado ao efetuar ação. Por favor, tente novamente.';

    vm.listRecords = listRecords;
    vm.create = create;
    vm.novo = novo;
    vm.editar = editar;

    vm.nextList = function() { vm.init = paginationService.pageNext(vm.init, vm.tam); };
    vm.prevList = function() { vm.init = paginationService.prevPage(vm.init, vm.tam); };

    //preenche a lista
    listRecords();

    function create() {
      vm.showResposta = false;
      crudService.create(vm.form, urls.clientes)
      .then(function successCallback(resposta) {
        console.log('sucesso');
        listRecords();
      }, function errorCallback() {
        console.log('Erro');//trato depois se der tempo
      });
    }

    function listRecords() {
      crudService.list(urls.clientes)
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

    function editar(cliente) {
      vm.form = angular.copy(cliente);
      vm.form.id = cliente.id;
    }

    function novo() {
      clear();
    }

    function clear() {
      vm.form = '';
      vm.resposta = '';
    }
  }
})();
