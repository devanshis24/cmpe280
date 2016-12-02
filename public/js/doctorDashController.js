/**
 * Created by devanshis24 on 11/29/2016.
 */
/**
 * Created by devanshis24 on 11/26/2016.
 */
var doctorDashApp = angular.module('doctorDashApp', ['ui.router', 'ngStorage', 'ui.calendar', 'ui.bootstrap']);
doctorDashApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider

    // route for the home page
        .state('app', {
            url: '/',
            views: {
                'header':{
                    templateUrl: '/ejs/doctorHeader.ejs',
                    controller: 'headerController'

                },
                'content': {
                    templateUrl: '/ejs/doctorSchedule.ejs',
                    controller: 'doctorScheduleController'
                }

            }
        })
        .state('app.appointment', {

            url: '/appointment',
            views : {
                'header@' : {
                    templateUrl: '/ejs/doctorHeader.ejs',
                    controller: 'headerController'
                }
                ,
                'content@': {
                    templateUrl: '/ejs/chatDoctor.ejs',
                    controller: 'doctorController'
                }
            }
        })
        .state('app.dashboard', {

            url: '/dashboard',
            views : {
                'header@' : {
                    templateUrl: '/ejs/doctorHeader.ejs',
                    controller: 'headerController'
                }
                ,
                'content@': {
                    templateUrl: '/ejs/doctorDash.ejs',
                    controller: 'doctorDashController'
                }
            }
        })
        .state('app.patientDirectory', {

            url: '/patientDirectory',
            views : {
                'header@' : {
                    templateUrl: '/ejs/doctorHeader.ejs',
                    controller: 'headerController'
                }
                ,
                'content@': {
                    templateUrl: '/ejs/patientDirectory.ejs',
                    controller: 'directoryController'
                }
            }
        })
        .state('app.chatDoctor', {

            url: '/chatDoctor',
            views : {
                'header@' : {
                    templateUrl: '/ejs/doctorHeader.ejs',
                    controller: 'headerController'
                }
                ,
                'content@': {
                    templateUrl: '/ejs/chatDoctor.ejs',
                    controller: 'chatDoctorController'
                }
            }
        })


});





doctorDashApp.controller('doctorScheduleController', function($scope, $compile, $timeout, uiCalendarConfig) {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.changeTo = 'Hungarian';
    /* event source that pulls from google.com */
    $scope.eventSource = {
        url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
        className: 'gcal-event',           // an option!
        currentTimezone: 'America/Chicago' // an option!
    };
    /* event source that contains custom events on the scope */
    $scope.events = [
        {title: 'All Day Event',start: new Date(y, m, 1)},
        {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
        {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
        {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
        {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
        {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
    ];
    /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, timezone, callback) {
        var s = new Date(start).getTime() / 1000;
        var e = new Date(end).getTime() / 1000;
        var m = new Date(start).getMonth();
        var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
        callback(events);
    };

    $scope.calEventsExt = {
        color: '#f00',
        textColor: 'yellow',
        events: [
            {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
            {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
            {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        ]
    };
    /* alert on eventClick */
    $scope.alertOnEventClick = function( date, jsEvent, view){
        $scope.alertMessage = (date.title + ' was clicked ');
    };
    /* alert on Drop */
    $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
        $scope.alertMessage = ('Event Dropped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
        $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };
    /* add custom event*/
    $scope.addEvent = function() {
        $scope.events.push({
            title: 'New Event',
            start: new Date(y, m, d),
            end: new Date(y, m, d+1),
            className: ['newEvent']
        });
    };
    /* remove event */
    $scope.remove = function(index) {
        $scope.events.splice(index,1);
    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
        uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalendar = function(calendar) {
        $timeout(function() {
            if(uiCalendarConfig.calendars[calendar]){
                uiCalendarConfig.calendars[calendar].fullCalendar('render');
            }
        });
    };
    /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) {
        element.attr({'tooltip': event.title,
            'tooltip-append-to-body': true});
        $compile(element)($scope);
    };
    /* config object */
    $scope.uiConfig = {
        calendar:{
            height: 450,
            editable: true,
            header:{
                left: 'title',
                center: '',
                right: 'today prev,next'
            },
            eventClick: $scope.alertOnEventClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize,
            eventRender: $scope.eventRender
        }
    };

    $scope.changeLang = function() {
        if($scope.changeTo === 'Hungarian'){
            $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
            $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
            $scope.changeTo= 'English';
        } else {
            $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            $scope.changeTo = 'Hungarian';
        }
    };
    /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
    $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];

});
doctorDashApp.controller('chatDoctorController',['$scope','$http','$state',function($scope,$http,$state){
    $scope.getMessages=function(){
        $http({
            method: "get",
            url: '/getMessages',

        }).success(function (data) {
            //checking the response data for statusCode
            if (data.statusCode == 200) {
                $scope.messages=data.result;
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
    $scope.getPatients=function () {
        $scope.patientNames = [];
        $http({
            method : "GET",
            url : '/findPatients'
        }).success(function(data) {
            //checking the response data for statusCode
            console.log(data+'in the result');
            if (data.statusCode == 200) {
                var patients = data.result;
                console.log('result'+patients);
                for (i = 0; i < patients.length; i++) {
                    $scope.patientNames.push(patients[i].name);
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

                "patientName": $scope.patientName,
                "message": $scope.message
            }
        }).success(function (data) {
            //checking the response data for statusCode
            if (data.statusCode == 200) {
                //console.log("Successfully Logged In")
                //login success

                //window.location.assign('/fitbitAuth');
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
}]);


doctorDashApp.controller('headerController',['$scope', '$http', '$state','$localStorage','$window',function($scope, $http, $state,$localStorage, $window) {

    getSessionValues = function () {
        $http({
            method : 'get',
            url : '/sessionValues'
        }).success(function(data1) {
            //checking the response data for statusCode
            console.log("SESSION NAME " +data1.name);
            $scope.userName = data1.name;
            getPatientCounts = function () {
                alert("innnnnn" + data1.name);
                $http({
                    method: 'post',
                    url: '/patientDirectory',
                    data: {doctorName: data1.name}

                }).success(function (data) {
                    //checking the response data for statusCode
                    if(data.statusCode == "200") {
                        console.log("success patient counts : " + data.aging);
                        $localStorage.doctorName = data1.name;
                        $localStorage.aging = data.aging;
                        $localStorage.dental = data.dental;
                        $localStorage.eye = data.eye;
                        $localStorage.physio = data.physio;
                        //$localStorage.fitness = data.fitness;
                    }
                    else if(data.statusCode == "500") {
                        console.log("500 error");
                    }
                    else {
                        console.log("404 error");
                    }
                }).error(function (error) {
                    //handle error
                });
            }
            getPatientCounts();
        }).error(function(error) {
            //handle error
        });
    };



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

doctorDashApp.controller('directoryController',['$scope','$http','$state','$localStorage',function($scope,$http,$state,$localStorage){


}]);

doctorDashApp.controller('doctorDashController',['$scope', '$http', '$state','$localStorage','$window',function($scope, $http, $state,$localStorage, $window) {

    getPatientData = function () {
        alert("innnnnn Pataint Data " + $localStorage.doctorName);
        $http({
            method: 'post',
            url: '/patientData',
            data: {"doctorName": $localStorage.doctorName}

        }).success(function (data) {
            //checking the response data for statusCode
            if(data.statusCode == "200") {
                console.log("success patient Data : " + JSON.stringify(data));

                $scope.appointments = data.result;
            }
            else if(data.statusCode == "500") {
                console.log("500 error");
            }
            else {
                console.log("404 error");
            }
        }).error(function (error) {
            //handle error
        });
    }
    getPatientData();

    $scope.getPatient = function(person){

        $http({
            method: 'post',
            url: '/acceptAppointment',
            data: {"name": person.name,"service":person.service,
            "doctorName" : $localStorage.doctorName}

        }).success(function (data) {
            //checking the response data for statusCode
            if(data.statusCode == "200") {
                //alert("success patient Data : " + JSON.stringify(data));
                //$scope.appointments = data.result1;

            }
            else if(data.statusCode == "500") {
                console.log("500 error");
            }
            else {
                console.log("404 error");
            }
        }).error(function (error) {
            //handle error
        });

    }

    //ng-class='{selected: isSelected(person)}'
}]);

