/**
 * Created by devanshis24 on 11/29/2016.
 */
/**
 * Created by devanshis24 on 11/26/2016.
 */
var doctorDashApp = angular.module('doctorDashApp', ['ui.router', 'ngStorage']);
doctorDashApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider

    // route for the home page
        .state('app', {
            url: '/',
            views: {
                'header':{
                    templateUrl: '/ejs/doctorHeader.ejs'


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
                }
                ,
                'content@': {
                    templateUrl: '/ejs/doctorDashboard.ejs',
                    controller: 'doctorController'
                }
            }
        })
        .state('app.patientDirectory', {

            url: '/patientDirectory',
            views : {
                'header@' : {
                    templateUrl: '/ejs/doctorHeader.ejs',
                }
                ,
                'content@': {
                    templateUrl: '/ejs/bookAppointment.ejs',
                    controller: 'doctorController'
                }
            }
        })
        .state('app.chatDoctor', {

            url: '/chatDoctor',
            views : {
                'header@' : {
                    templateUrl: '/ejs/doctorHeader.ejs',
                }
                ,
                'content@': {
                    templateUrl: '/ejs/chatDoctor.ejs',
                    controller: 'doctorController'
                }
            }
        })


});


doctorDashApp.controller('patientController',['$scope','$http','$state',function($scope,$http,$state){

    fetchFitbitData = function () {
        $http({
            method : "get",
            url : "/fb-profile"
        }).success(function (data) {
            if (data.statusCode == 200) {
                $scope.a = JSON.stringify(data);
                console.log("Successfully Logged In  hiiis" ); }
        }).error(function(error) {
            //handle error
        });
    }

    fetchFitbitData();
//console.log(x);
}]);



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