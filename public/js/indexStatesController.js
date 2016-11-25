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
                    templateUrl: '/ejs/loginpage.ejs',
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
        .state('app.signupDoctor',{
                url:'signupDoctor',
            views: {
                    'content@':{
                        templateUrl: '/ejs/signupDoctor.ejs',
                        controller: 'signupController'
                    }
            }
        })
        .state('app.loginDoctor',{
            url:'loginDoctor',
            views: {
                'content@':{
                    templateUrl: '/ejs/loginDoctor.ejs',
                    controller: 'loginController'
                }
            }
        })
        .state('app.loginpage',{
            url:'loginpage',
            views: {
                'content@':{
                    templateUrl: '/ejs/loginpage.ejs',
                    controller: 'loginController'
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
                console.log("Successfully Logged In")
                //login success
                window.location.assign('/patientDashboard');
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


    console.log($scope.userid+' '+$scope.email+' '+$scope.password);
    $scope.signup = function() {
        $http({
            method : "POST",
            url : '/signup',
            data : {
                "fullname":$scope.fullname,
                "userid": $scope.userid,
                "email":$scope.email,
                "password" : $scope.password,
                "confirmpassword" : $scope.confirmpassword,
                "mobile" : $scope.mobile,
                "birthdate" : $scope.birthdate
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
    // Sign Up function for doctor
    $scope.signupDoctor = function() {
        $http({
            method : "POST",
            url : '/signupDoctor',
            data : {
                "fullname":$scope.fullname,
                "userid": $scope.userid,
                "email":$scope.email,
                "password" : $scope.password,
                "confirmpassword" : $scope.confirmpassword,
                "mobile" : $scope.mobile,
                "birthdate" : $scope.birthdate
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