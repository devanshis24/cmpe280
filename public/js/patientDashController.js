/**
 * Created by devanshis24 on 11/26/2016.
 */
var patientDashApp = angular.module('patientDashApp', ['ui.router', 'ngStorage']);
patientDashApp.config(function($stateProvider, $urlRouterProvider) {
$urlRouterProvider.otherwise('/');

$stateProvider

// route for the home page
    .state('app', {
        url: '/',
        views: {
            'header':{
                templateUrl: '/ejs/header.ejs',

            },
            'content': {
                templateUrl: '/ejs/patientFitbit.ejs',
                controller: 'patientController'
            }

        }
    })

});


patientDashApp.controller('patientController',['$scope','$http','$state',function($scope,$http,$state){

    fetchFitbitData = function () {
        $http({
            method : "get",
            url : "/fb-profile"
        }).success(function (data) {
            if (data.statusCode == 200) {
                console.log("Successfully Logged In  hiiis" + JSON.stringify(data)); }
        }).error(function(error) {
            //handle error
        });
    }

    fetchFitbitData();

}]);
