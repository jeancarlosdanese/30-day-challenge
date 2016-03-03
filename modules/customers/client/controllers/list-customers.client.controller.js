/*(function () {
  'use strict';

  // Customers controller
  var customersApp = angular.module('customers');

  customersApp.controller('CustomersListController', CustomersListController);

  CustomersListController.$inject = ['$scope', '$state', 'Authentication', 'CustomersService', '$modal', '$log'];

  function CustomersListController($scope, $state, Authentication, CustomersService, $modal, $log) {
    var vm = this;

    vm.authentication = Authentication;
    vm.customers = CustomersService.query();

    // Open a modal window to update a simple customer record
    vm.animationsEnabled = true;

    vm.modalUpdate = function (size, selectedCustomer) {
    	console.log(selectedCustomer);
      var modalInstance = $modal.open({
        animation: vm.animationsEnabled,
        templateUrl: 'modules/customers/client/views/edit-customer.client.view.html',
        controller: function($scope, $modalInstance, customer) {
        	console.log(customer);
          $scope.customer = customer;
        },
        controllerAs: 'vm',
        size: size,
        resolve: {
          customer: function () {
            return selectedCustomer;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    vm.toggleAnimation = function () {
      vm.animationsEnabled = !vm.animationsEnabled;
    };

  }

})();*/


/*(function () {
  'use strict';

  angular
    .module('customers')
    .controller('CustomersListController', CustomersListController);

  CustomersListController.$inject = ['CustomersService'];

  function CustomersListController(CustomersService) {
    var vm = this;

    vm.customers = CustomersService.query();
  }
})();
*/