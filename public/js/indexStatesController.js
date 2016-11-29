var routerApp = angular.module('routerApp', ['ui.router', 'ngStorage', 'ui.calendar', 'ui.bootstrap']);
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
        .state('app.bookAppointment',{
            url:'bookAppointment',
            views: {
                'content@':{
                    templateUrl: '/ejs/bookAppointment.ejs',
                    controller: 'appointmentController'
                }
            }
        })
        .state('app.doctorSchedule',{
            url:'doctorSchedule',
            views: {
                'content@':{
                    templateUrl: '/ejs/doctorSchedule.ejs',
                    controller: 'doctorScheduleController'
                }
            }
        })
});

routerApp.controller('loginController',['$scope', '$http', '$state',function($scope, $http, $state){
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

                window.location.assign('/fitbitAuth');
            }
            else {
                //handle error
            }
        }).error(function(error) {
            //handle error
        });

    }
}]);
routerApp.controller('signupController',['$scope', '$http', '$state', '$window',function($scope, $http, $state, $window){
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

routerApp.controller('appointmentController',['$scope', '$http', '$state', '$window',function($scope, $http, $state, $window){
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

routerApp.controller('doctorScheduleController', function($scope, $compile, $timeout, uiCalendarConfig) {
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