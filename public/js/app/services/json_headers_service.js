(function() {
  "use strict";

  angular
    .module("app")
    .factory("jsonHeadersService", jsonHeadersService);

  jsonHeadersService.$inject = ["$log"];

  function jsonHeadersService($log) {
    return {
      request: addJsonHeaders
    };

    function addJsonHeaders(request) {
      // $log.info("Setting JSON headers.");
      request.headers['Content-Type'] = 'application/json';
      return request;
    }
  }

})();
