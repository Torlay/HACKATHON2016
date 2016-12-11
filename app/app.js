(function() {
  'use strict';

  angular
    .module('saalc', ['ngRoute', 'ngAnimate', 'cliente', 'vistoriador', 'visita', 'avaliacao'])
      .config(['$routeProvider', '$locationProvider', '$httpProvider',
        function($routeProvider, $locationProvider) {
          $locationProvider.html5Mode(true);
          $routeProvider
          .when('/cliente', {
            templateUrl: 'views/cliente.html',
            controller: 'ClienteController',
            controllerAs: 'Cliente'
          })
          .when('/vistoriador', {
            templateUrl: 'views/vistoriador.html',
            controller: 'VistoriadorController',
            controllerAs: 'Vistoriador'
          })
          .when('/', {
            templateUrl: 'views/visita.html',
            controller: 'VisitaController',
            controllerAs: 'Visita'
          })
          .when('/avaliacao', {
            templateUrl: 'views/avaliacao.html',
            controller: 'AvaliacaoController',
            controllerAs: 'Avaliacao'
          })
          .when('/mapa', {
            templateUrl: 'views/mapa.html',
          })
          .otherwise({
            redirectTo: '/'
          });
        }
      ]);
})();
