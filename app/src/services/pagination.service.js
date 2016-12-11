(function() {
  'use strict';

  angular
    .module('saalc')
    .service('paginationService', paginationService);

    function paginationService() {
      this.pageNext = function(init, tam) {
        if (tam > 14 && (tam - init) >= 14) {
          return init += 15;
        } else {
          return init;
        }
      };

      this.prevPage = function(init, tam) {
        if (init > 14) {
          return init -= 15;
        } else {
          return init;
        }
      };
    }
})();
