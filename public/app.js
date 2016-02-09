'use strict';

// Declare app level module which depends on views, and components
angular.module('MyApp', [
  'ngRoute',
  'MyApp.LogIn',
  'MyApp.NewForm',
  'MyApp.Dashboard',
  'MyApp.FormView'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/LogIn'});
}]);
