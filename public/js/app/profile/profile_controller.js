(function() {
  "use strict";

  angular
    .module('app')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ["$log", "authService", "userService", "$state", "tokenService"];

  function ProfileController($log, authService, userService, $state, tokenService) {
    $log.info('profile controller is in da house');
    var vm = this;
    vm.formData = {
      email: authService.currentUser().email, // This just copies the
      name:  authService.currentUser().name,
      picture_url: authService.currentUser().picture_url   // string values, instead
    };                                        // of binding some object.
    $log.info(vm.formData)
    vm.authService = authService;
    vm.submitUpdate = submitUpdate;
    vm.deleteUser = deleteUser;

    function submitUpdate() {
      $log.info("submitting")
      userService
        .update(vm.formData)
        .then(function(res) {
          $log.info('Updated!', res);

          // Clear the password fields in the view (if they were used).
          vm.formData.password = '';
          vm.formData.passwordConfirmation = '';
        })
        .then(function() {
          return authService.refreshToken();
        })
        .then(
          function(newDecodedToken) {
            $log.info('User updated and token refreshed:', newDecodedToken);
          })
        .catch(function(err) {
          $log.info('Error:', err);
        });
    }

    function deleteUser(id) {
      $log.info("deleting user")
      userService
        .destroy(id)
        .then(function() {
          $log.info("deleted!");
          $state.go("home");
          tokenService.destroy();
        }, function(err) {
          $log.info(err);
        });
    }

  }

})();
