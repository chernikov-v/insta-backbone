'use strict';


/* App Module */

var taskApp = angular.module('taskApp', [
    'ngRoute',
    'taskControllers',
    'ngResource'


]);
taskApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/photos', {
                templateUrl: 'partials/image-list.html',
                controller: 'ImageListCtrl'
            }).
            when('/photos/:imageId', {
                templateUrl: 'partials/image-details.html',
                controller: 'ImageDetailsCtrl'
            }).
            otherwise({
                redirectTo: '/photos'
            });
    }
]);


