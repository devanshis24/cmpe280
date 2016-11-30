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
                templateUrl: '/ejs/patientHeader.ejs'


            },
            'content': {
                templateUrl: '/ejs/patientFitbit.ejs',
                controller: 'patientController'
            }

        }
    })
    .state('app.appointment', {

        url: '/appointment',
        views : {
            'header@' : {
                templateUrl: '/ejs/patientHeader.ejs',
            }
            ,
            'content@': {
                templateUrl: '/ejs/bookAppointment.ejs',
                controller: 'appointmentController'
            }
        }
    })
    .state('app.heartRate', {

        url: '/heartRate',
        views : {
            'header@' : {
                templateUrl: '/ejs/patientHeader.ejs',
            }
            ,
            'content@': {
                templateUrl: '/ejs/bookAppointment.ejs',
                controller: 'patientAppointmentController'
            }
        }
    })
    .state('app.doctorDirectory', {

        url: '/doctorDirectory',
        views : {
            'header@' : {
                templateUrl: '/ejs/patientHeader.ejs',
            }
            ,
            'content@': {
                templateUrl: '/ejs/bookAppointment.ejs',
                controller: 'patientAppointmentController'
            }
        }
    })
    .state('app.chat', {

        url: '/chat',
        views : {
            'header@' : {
                templateUrl: '/ejs/patientHeader.ejs',
            }
            ,
            'content@': {
                templateUrl: '/ejs/bookAppointment.ejs',
                controller: 'patientAppointmentController'
            }
        }
    })


});


patientDashApp.controller('patientController',['$scope','$http','$state',function($scope,$http,$state){
fetchFitbitData = function () {
        $http({
            method : "get",
            url : "/fb-profile",
        }).success(function (data) {
              console.log(data);
              $scope.hello = data;
            Highcharts.chart('container', {

                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },

                series: [{
                    data: data
                }]
            });
        }).error(function(error) {
            //handle error
        });
    }

    fetchFitbitData();
}]);



patientDashApp.controller('appointmentController',['$scope', '$http', '$state', '$window',function($scope, $http, $state, $window){
    $scope.bookAppointment = function() {
        $http({
            method : "POST",
            url : '/bookAppointment',
            data : {
                "name": $scope.name,
                "dob": $scope.dob,
                "gender": $scope.gender,
                "service": $scope.service,
                "appointmentDate": $scope.appointmentDate,
                "email":$scope.email,
                "phone":$scope.phone,
                "serviceDesc" : $scope.serviceDesc
            }
        }).success(function(data) {
            //checking the response data for statusCode
            if (data.statusCode == 200) {
                //registration success
                console.log(data);
                $state.transitionTo('app');
            }
            else {
                //handle error
            }
        }).error(function(error) {
            //handle error
        });
    };
}]);