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
                templateUrl: '/ejs/newPatientHeader.ejs',
                controller: 'headerController'


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
                templateUrl: '/ejs/newPatientHeader.ejs',
                controller: 'headerController'
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
                templateUrl: '/ejs/newPatientHeader.ejs',
                controller: 'headerController'
            }
            ,
            'content@': {
                templateUrl: '/ejs/heartRate.ejs',
                controller: 'heartRateController'
            }
        }
    })
    .state('app.doctorDirectory', {

        url: '/doctorDirectory',
        views : {
            'header@' : {
                templateUrl: '/ejs/newPatientHeader.ejs',
                controller: 'headerController'
            }
            ,
            'content@': {
                templateUrl: '/ejs/doctorDirectory.ejs',
                controller: 'doctorDirectoryController'
            }
        }
    })
    .state('app.chat', {

        url: '/chat',
        views : {
            'header@' : {
                templateUrl: '/ejs/newPatientHeader.ejs',
                controller: 'headerController'
            }
            ,
            'content@': {
                templateUrl: '/ejs/chatPatient.ejs',
                controller: 'chatPatientController'
            }
        }
    })


});


patientDashApp.controller('patientController',['$scope','$http','$state',function($scope,$http,$state){

    fetchFitbitData = function () {

        $http({

            method : "get",

            url : "/heart-daily"

        }).success(function (data) {

            if(data.statusCode == 200) {

                console.log(data);

                $scope.hello = data;

                Highcharts.chart('heartContainer', {

                    title: {
                        text: 'Daily Heart Rate'
                    },


                    xAxis: {

                        categories: data.time

                    },



                    series: [{
                        name: "Heart Rate",
                        data: data.heart

                    },

                        {

                            data: data.heart2

                        }]

                });

            }

            else

            {

                console.log("eror")

            }

        }).error(function(error) {

            //handle error

        });

    }



    fetchFitbitData();



    fetchFitbitData1 = function () {

        $http({

            method : "get",

            url : "/calorie-daily"

        }).success(function (data) {

            if(data.statusCode == 200) {

                console.log(data);

                $scope.hello = data;

                Highcharts.chart('calorieContainer', {

                    title: {
                        text: 'Daily Calories'
                    },

                    xAxis: {

                        categories: data.time

                    },



                    series: [{
                        name: "calories",
                        data: data.value

                    }],

                    series: [{
                        name: "calories",
                        data: data.value

                    }]

                });

            }

            else

            {

                console.log("eror")

            }

        }).error(function(error) {

            //handle error

        });

    }



    fetchFitbitData1();



    fetchFitbitData2 = function () {

        $http({

            method : "get",

            url : "/steps-daily"

        }).success(function (data) {

            console.log(data);

            if(data.statusCode == 200) {

                console.log(data);

                $scope.hello = data;

                Highcharts.chart('stepsCointainer', {

                    title: {
                        text: 'Daily Steps'
                    },

                    xAxis: {

                        categories: data.time

                    },



                    series: [{
                        name: "Steps",
                        data: data.value

                    }],

                    series: [{
                        name: "Steps",
                        data: data.value

                    }]

                });

            }

            else

            {

                console.log("eror")

            }

        }).error(function(error) {

            //handle error

        });

    }



    fetchFitbitData2();





//dynamic date code

    fetchCaloriesDynamically = function () {



        $http({

            method : "post",

            url : "/calorie-dynamic",

            data : {

                "dateA": $scope.start

            }



        }).success(function (data) {


            console.log(data);

            if(data.statusCode == 200) {

                console.log(data);

                $scope.hello = data;

                Highcharts.chart('calorieContainerDynamic', {

                    title: {
                        text: 'Dynamic Calorie Count'
                    },

                    xAxis: {

                        categories: data.time

                    },



                    series: [{
                        name: "Calories",
                        data: data.value

                    }],

                    series: [{
                        name: "Calories",
                        data: data.value

                    }]

                });

            }

            else

            {

                console.log("eror")

            }

        }).error(function(error) {

            //handle error

        });

    }

    fetchHeartDynamically = function () {



        $http({

            method : "post",

            url : "/heart-dynamic",

            data : {

                "dateA": $scope.start

            }



        }).success(function (data) {



            console.log(data);

            if(data.statusCode == 200) {

                console.log(data);

                $scope.hello = data;

                Highcharts.chart('heartContainerDynamic', {

                    title: {
                        text: 'Dynamic Heart Rate'
                    },


                    xAxis: {

                        categories: data.time

                    },



                    series: [{
                        name: "Heart Rate",
                        data: data.value

                    }],

                    series: [{
                        name: "Heart Rate",
                        data: data.value

                    }]

                });

            }

            else

            {

                console.log("eror")

            }

        }).error(function(error) {

            //handle error

        });

    }


    fetchStepsDynamically = function () {



        $http({

            method : "post",

            url : "/steps-dynamic",

            data : {

                "dateA": $scope.start

            }



        }).success(function (data) {

            console.log(data);

            if(data.statusCode == 200) {

                console.log(data);

                $scope.hello = data;

                Highcharts.chart('stepsContainerDynamic', {

                    title: {
                        text: 'Dynamic Step Count'
                    },


                    xAxis: {

                        categories: data.time

                    },



                    series: [{
                        name: "Steps",
                        data: data.value

                    }],

                    series: [{
                        name: "Steps",
                        data: data.value

                    }]

                });

            }

            else

            {

                console.log("eror")

            }

            return data.value;

        }).error(function(error) {

            //handle error

        });

    }





    $scope.fetchDynamicDate = function(){

        fetchCaloriesDynamically();

        fetchStepsDynamically();

        fetchHeartDynamically();



    }



}]);


patientDashApp.controller('heartRateController',['$scope','$http','$state','$window',function($scope,$http,$state,$window){
    $scope.getData=function(){
        //console.log('inside test');
        var socket = new WebSocket('ws://localhost:3000', 'echo-protocol');
        $scope.socket=socket;


        $scope.createSocket=function(){

            //$scope.score=0;
            //$scope.socket.disconnect();
        }
        //
        var flag=0;
        $scope.waitForConnection=function() {
            if (socket.readyState == 1) {
                flag=1;
                $scope.readingArr = [];
                $scope.socket.addEventListener("message", function(e) {
                    // The data is simply the message that we're sending back
                    // Create the chart
                    console.log(e.data);
                    $scope.readingArr.push(e.data);
                    //$scope.requestData(e.data);
                });
                function  closeIt() {
                    $scope.socket.close();
                }
                //setTimeout(closeIt,10000);

                var chart;
                console.log("inside create soccet");

                console.log(socket.readyState);
                $scope.socket.send('hello-  test');


                $scope.chart = Highcharts.chart({
                    chart: {
                        renderTo: 'graphDiv',
                        defaultSeriesType: 'spline',
                        events: {
                            load: function () {

                                var series = this.series[0];
                                setInterval(function () {
                                    var shift = series.data.length > 20,
                                        point = 0,
                                        x = new Date().getTime();
                                    if (typeof $scope.readingArr !== 'undefined' && $scope.readingArr.length > 0) {
                                        // the array is defined and has at least one element
                                        point = parseInt($scope.readingArr.shift());
                                        console.log("New point is : "+point);
                                    }
                                    console.log("Adding point : "+point);

                                    series.addPoint([x, point], true, shift);
                                    console.log(series);
                                },1000);
                            }
                        }
                    },
                    title: {
                        text: 'Live data feed'
                    },

                    xAxis: {
                        type: 'datetime',
                        tickPixelInterval: 150,
                        maxZoom: 20 * 1000
                    },
                    yAxis: {
                        minPadding: 0.2,
                        maxPadding: 0.2,
                        title: {
                            text: 'Value',
                            margin: 80
                        }
                    },

                    series: [{
                        name: 'Time',
                        data: []
                    }]
                });
            }
            else{
                setTimeout($scope.waitForConnection,1000);
            }
        }
        if(flag==0){
            $scope.waitForConnection();
        }


    }
}]);
patientDashApp.controller('appointmentController',['$scope', '$http', '$state', '$window',function($scope, $http, $state, $window){
    $scope.doctorNames = [];
    $http({
        method : "GET",
        url : '/findDoctors'
    }).success(function(data) {
        //checking the response data for statusCode
        if (data.statusCode == 200) {
            var doctors = data.result;
            for (i = 0; i < doctors.length; i++) {
                $scope.doctorNames.push(doctors[i].name);
            }
        }
        else {
            //handle error
        }
    }).error(function(error) {
        //handle error
    });

    $scope.bookAppointment = function() {
        $http({
            method : "POST",
            url : '/bookAppointment',
            data : {
                "name": $scope.name,
                "dob": $scope.dob,
                "gender": $scope.gender,
                "service": $scope.service,
                "doctorName": $scope.doctorName,
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




patientDashApp.controller('doctorDirectoryController',['$scope', '$http', '$state', '$window',function($scope, $http, $state, $window){
    $scope.doctors = [];
    $http({
        method : "GET",
        url : '/findDoctors'
    }).success(function(data) {
        //checking the response data for statusCode
        if (data.statusCode == 200) {
            var maleNum = 1;
            var femaleNum = 1;
            $scope.doctors = data.result;
            for (var i=0; i<$scope.doctors.length; i++) {
                $scope.doctors[i].num = $scope.doctors[i].gender == 'male' ? maleNum++ : femaleNum++;
            }
        }
        else {
            //handle error
        }
    }).error(function(error) {
        //handle error
    });


}]);

patientDashApp.controller('headerController',['$scope', '$http', '$state','$localStorage', '$window',function($scope, $http, $state,$localStorage, $window) {

    getSessionValues = function () {
        $http({
            method: 'get',
            url: '/sessionValues'
        }).success(function (data) {
            //checking the response data for statusCode
            console.log("SESSION NAME " + data.name);
            $scope.userName = data.name;
        }).error(function (error) {
            //handle error
        });
    }
    getSessionValues();

    $scope.logout = function() {

        alert("Logout");
        $localStorage.$reset();
        $http({
            method: 'get',
            url: '/logout'
        }).success(function (data) {
            //checking the response data for statusCode
            if (data.statusCode == 200) {
                window.location.assign('/');
            }

        }).error(function (error) {
            //window.location.href("error?message=Error");
        });

    }
}]);

patientDashApp.controller('chatPatientController',['$scope', '$http', '$state', '$timeout', function($scope, $http, $state, $timeout){
    $scope.getDoctors=function () {
        $scope.doctorNames = [];
        $http({
            method : "GET",
            url : '/findDoctors'
        }).success(function(data) {
            //checking the response data for statusCode
            if (data.statusCode == 200) {
                var doctors = data.result;
                console.log('result'+doctors);
                for (i = 0; i < doctors.length; i++) {
                    $scope.doctorNames.push(doctors[i].name);
                }
            }
            else {
                //handle error
            }
        }).error(function(error) {
            //handle error
        });
    }
    $scope.sendMessage=function() {
        console.log('inside send message');
        $http({
            method: "post",
            url: '/addMessage',
            data: {

                "doctorName": $scope.doctorName,
                "message": $scope.message
            }
        }).success(function (data) {
            //checking the response data for statusCode
            if (data.statusCode == 200) {
                $scope.showMessage = true;
                $timeout(function () {
                    $scope.showMessage = false;
                }, 5000);
            }
            else if (data.statusCode == 404) {
                //alert(" User doesnot exists ! Pleasecheck you email or password. ");
                //$scope.email = "";
                //$scope.password = "";
                //focus('exampleInputEmail1');
            }
            else if (data.statusCode == 500) {
                //window.location.href("error?message=Error");
            }
        }).error(function (error) {
            window.location.href("error?message=Error");
        });
    }
    $scope.getMessages=function(){
        $http({
            method: "get",
            url: '/getMessages',

        }).success(function (data) {
            //checking the response data for statusCode
            if (data.statusCode == 200) {
                $scope.messages=data.result;
                console.log(data.result+'success');
            }
            else if (data.statusCode == 404) {
                console.log("no data found");
                //alert(" User doesnot exists ! Pleasecheck you email or password. ");
                //$scope.email = "";
                //$scope.password = "";
                //focus('exampleInputEmail1');
            }
            else if (data.statusCode == 500) {
                //window.location.href("error?message=Error");
            }
        }).error(function (error) {
            window.location.href("error?message=Error");
        });
    }
}]);
