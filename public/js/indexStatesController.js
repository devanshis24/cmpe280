var routerApp = angular.module('routerApp', ['ui.router', 'ngStorage']);
routerApp.config(function($stateProvider, $urlRouterProvider) {

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
                    templateUrl: '/ejs/signup.ejs',
                    controller: 'loginController'
                }

            }
        })
        .state('app.signup',{
            url:'signup',
            views: {

                'content@':{
                    templateUrl: '/ejs/signup.ejs',
                    controller: 'signupController'
                }
            }
        })
});
routerApp.controller('loginController',['$scope','$http','$state',function($scope,$http,$state){
    $scope.login=function(){
        console.log($scope.email+' '+$scope.password);
        $http({
            method : "post",
            url : '/login',
            data : {

                "email":$scope.email,
                "password" : $scope.password
            }
        }).success(function(data) {
            //checking the response data for statusCode
            if (data.statusCode == 200) {
                //login success
               // window.location.assign('/usermainpage');
            }
            else {
                //handle error
            }
        }).error(function(error) {
            //handle error
        });

    }
}]);
routerApp.controller('signupController',['$scope','$http','$state','$window',function($scope,$http,$state,$window){


    console.log($scope.username+' '+$scope.email+' '+$scope.password);
    $scope.signup = function() {
        $http({
            method : "POST",
            url : '/signup',
            data : {
                "username" : $scope.username,
                "email":$scope.email,
                "password" : $scope.password
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