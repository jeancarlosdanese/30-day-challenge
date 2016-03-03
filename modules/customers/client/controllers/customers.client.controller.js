(function () {
  'use strict';

  // Customers controller
  var customersApp = angular.module('customers');

  customersApp.controller('CustomersListController', CustomersListController);

  CustomersListController.$inject = ['$scope', '$state', 'Authentication', 'CustomersService', '$modal', '$log'];

  function CustomersListController($scope, $state, Authentication, CustomersService, $modal, $log) {
    var vm = this;

    vm.authentication = Authentication;
    vm.customers = CustomersService.query();

    vm.animationsEnabled = true;

    // Open a modal window to create a simple customer record
    vm.modalCreate = function (size) {
      
      var modalInstance = $modal.open({
        animation: vm.animationsEnabled,
        templateUrl: 'modules/customers/client/views/create-customer.client.view.html',
        controller: function($scope, $modalInstance) {
          
          $scope.ok = function () {
            // if(customer.updateCustomerForm.$valid) {
            $modalInstance.close();  
            // }
          };

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };

        },
        controllerAs: 'vm',
        size: size
      });

      modalInstance.result.then(function (selectedItem) {
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    // Open a modal window to update a simple customer record
    vm.modalUpdate = function (size, selectedCustomer) {
      
      var modalInstance = $modal.open({
        animation: vm.animationsEnabled,
        templateUrl: 'modules/customers/client/views/edit-customer.client.view.html',
        controller: function($scope, $modalInstance, customer) {
          $scope.customer = customer;

          $scope.ok = function () {
            // if(updateCustomerForm.$valid) {
            $modalInstance.close($scope.customer);  
            // }
          };

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };

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

    vm.remove = function(customer) {
      if(customer) {
        customer.$remove();

        for(var i in vm.customers) {
          if(vm.customers[i] === customer) {
            vm.customers.splice(i, 1);
          }
        }
      } else {
        vm.customer.$remove(function() {
        });
      }
    };

  }

  customersApp.controller('CustomersCreateController', CustomersCreateController);

  CustomersCreateController.$inject = ['$scope', 'CustomersService', 'Notify'];

  function CustomersCreateController ($scope, CustomersService, Notify) {

    var vm = this;

    vm.create = function() {
      
      var customer = new CustomersService({
        firstName: vm.firstName,
        lastName: vm.lastName,
        city: vm.city,
        country: vm.country,
        industry: vm.industry,
        email: vm.email,
        phone: vm.phone,
        referred: vm.referred,
        channel: vm.channel
      });

      // Redirect after save
      customer.$save(function(response) {
        
        // Clear form fields
        /*$scope.firstName = '';
        $scope.lastName = '';
        $scope.city = '';
        $scope.country = '';
        $scope.industry = '';
        $scope.email = '';
        $scope.phone = '';
        $scope.referred = '';
        $scope.channel = '';*/

        Notify.sendMsg('NewCustomer', { 'id': response._id });

      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });

    };

  }


  customersApp.controller('CustomersUpdateController', CustomersUpdateController);

  CustomersUpdateController.$inject = ['$scope', 'CustomersService'];

  function CustomersUpdateController ($scope, CustomersService) {
    var vm = this;

    vm.channelOptions = [
      { id: 1, item: 'Facebook' },
      { id: 2, item: 'Twitter' },
      { id: 3, item: 'Email' }
    ];

    vm.update = function(updatedCustomer) {
      var customer = updatedCustomer;

      customer.$update(function() {

      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

  }

  customersApp.directive('customersList', ['CustomersService', 'Notify', function(CustomersService, Notify) {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'modules/customers/client/views/customers-list-template.html',
      link: function(scope, element, attrs) {

        // when a new customer is added, update the customer list
        Notify.getMsg('NewCustomer', function(event, data) {
          scope.vmCustomersListController.customers = CustomersService.query();
        });

      }
    };
  }]);

})();