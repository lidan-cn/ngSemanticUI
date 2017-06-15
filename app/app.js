define(['angular','ui.router', 'view1/view1', 'view2/view2'],
    function (angular, view1, view2) {
        'use strict';

// Declare app level module which depends on views, and components
        return angular.module('myApp', [
            'ngRoute',
            'myApp.view1',
            'myApp.view2'
        ]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider.otherwise({redirectTo: '/view1'});
        }]);

    });