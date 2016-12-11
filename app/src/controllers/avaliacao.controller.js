(function () {
  angular
  .module('avaliacao', [])
  .controller('AvaliacaoController', [
    'crudService',
    'paginationService',
    'urls',
    AvaliacaoController
  ]);
  function AvaliacaoController(crudService, paginationService, urls) {
    var vm = this;

    vm.resposta ='';
    vm.init = 0;
    vm.tam = 0;
    vm.form = '';
    vm.respostaList = '';

    const ERROR_REQUEST = 'Ocorreu algo inesperado ao efetuar ação. Por favor, tente novamente.';

    vm.novo = novo;
    vm.editar = editar;
    vm.search = search;
    vm.listRecords = listRecords;
    vm.update = update;

    vm.nextList = function() { vm.init = paginationService.pageNext(vm.init, vm.tam); };
    vm.prevList = function() { vm.init = paginationService.prevPage(vm.init, vm.tam); };

    //preenche a lista
    listRecords();

    function listRecords() {
      crudService.list(urls.avaliacoes)
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

    function update() {
      vm.showResposta = false;
      crudService.update(vm.form, urls.avaliacoes + '/' + vm.form.id)
      .then(function successCallback(resposta) {
        console.log('sucesso');
        listRecords();
      }, function errorCallback() {
        console.log('errou feio, errou rude');
      });
    }

    function editar(avaliacao) {
      vm.showResposta = false;
      vm.form = angular.copy(avaliacao);
      vm.form.id = avaliacao.id;
    }

    function listRecords() {
      crudService.list(urls.avaliacoes)
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

    function novo() {
      clear();
    }

    function search(filtro) {
      crudService.search(filtro, urls.avaliacoes + '?filtro=')
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

    function clear() {
      vm.form = '';
      vm.resposta = '';
    }
  }

})();
