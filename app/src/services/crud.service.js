(function() {

  angular
    .module('saalc')
    .service('crudService', ['$http', crudService]);

    function crudService($http) {
      this.create = function(data, URL_REQUEST) {
        const request = {
          url: URL_REQUEST,
          method: 'POST',
          data: data,
          withCredentials: true
        };
        return $http(request);
      };

      this.list = function(URL_REQUEST) {
        const request = {
          url: URL_REQUEST,
          method: 'GET',
          withCredentials: true
        };
        return $http(request);
      };

      this.search = function(data, URL_REQUEST) {
        const request = {
          url: URL_REQUEST + data,
          method: 'GET',
          withCredentials: true
        };
        return $http(request);
      };

      this.remove = function(data, URL_REQUEST) {
        const request = {
          url: URL_REQUEST + data,
          method: 'DELETE',
          withCredentials: true
        };
        return $http(request);
      };

      this.update = function (data, URL_REQUEST) {
        const request = {
          url: URL_REQUEST,
          method: 'PUT',
          data: data,
          withCredentials: true
        };
        return $http(request);
      };
    }
})();
