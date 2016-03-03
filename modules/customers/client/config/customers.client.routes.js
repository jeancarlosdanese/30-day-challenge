(function () {
  'use strict';

  angular
    .module('customers')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('customers', {
        abstract: true,
        url: '/customers',
        template: '<ui-view/>'
      })
      .state('customers.list', {
        url: '',
        templateUrl: 'modules/customers/client/views/list-customers.client.view.html',
        // controller: 'CustomersListController',
        // controllerAs: 'vmCustomersListController',
        data: {
          pageTitle: 'Customers List'
        }
      });
  }

  getCustomer.$inject = ['$stateParams', 'CustomersService'];

  function getCustomer($stateParams, CustomersService) {
    return CustomersService.get({
      customerId: $stateParams.customerId
    }).$promise;
  }

  newCustomer.$inject = ['CustomersService'];

  function newCustomer(CustomersService) {
    return new CustomersService();
  }
})();
