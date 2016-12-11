(function () {
  angular
  .module('vistoriador', [])
  .controller('VistoriadorController', [
    'crudService',
    'paginationService',
    'urls',
    VistoriadorController
  ]);

  function VistoriadorController(crudService, paginationService, urls) {
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
    vm.search = search;

    vm.nextList = function() { vm.init = paginationService.pageNext(vm.init, vm.tam); };
    vm.prevList = function() { vm.init = paginationService.prevPage(vm.init, vm.tam); };

    //preenche a lista
    listRecords();

    function create() {
      crudService.create(vm.form, urls.vistoriadores)
      .then(function successCallback(resposta) {
        console.log('sucesso');
        listRecords();
      }, function errorCallback() {
        console.log('erro');
      });
    }

    function listRecords() {
      vm.respostaList = '';
      crudService.list(urls.vistoriadores)
      .then(function successCallback(resposta) {
        vm.list = angular.fromJson(resposta.data);
        vm.tam = vm.list.length;
        if (vm.tam === 0) {
          vm.respostaList = 'Não foram encontrados registros';
          vm.list = '';
        }
      }, function errorCallback() {
        vm.respostaList = ERROR_REQUEST;
      });
    }

    function search(filtro) {
      vm.respostaList = '';
      crudService.search(filtro, urls.vistoriadorFiltro + '?filtro=')
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

    function editar(vistoriador) {
      vm.form = angular.copy(vistoriador);
      vm.form.id = vistoriador.id;
      vm.form.area = vistoriador.area + " " + "km";
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
