(function() {
    'use strict';


    /**
     * @ngdoc overview
     * @name brandApp
     * @description
     * # brandApp
     *
     * Main module of the application.
     */
    var app = angular.module('brandApp', [
        'classy',
        'classy.computed',
        'classy-mixins',
        'classy-on',
        'classy-extends',
        'classy-initScope',
        'xeditable',
        'ui.bootstrap',
        'ngCookies',
        'ngMessages',
        'ngAnimate',
        'toaster',
        'ngResource',
        'ui.router',
        'ngSanitize',
        'ngTouch',
        'ui.select',
        'angularMoment',
        'angularFileUpload'

    ]);


    app.config(Config);
    app.directive('autofocus', AutoFocusDirective);
    app.controller('AppCtrl', AppCtrl);
    app.filter('htmlToPlaintext', HtmlToPlaintextFilter);


    AutoFocusDirective.$inject = ['$timeout'];

    function AutoFocusDirective($timeout) {
        return {
            restrict: 'A',
            link: function($scope, $element) {
                $timeout(function() {
                    $element[0].focus();
                });
            }
        };
    }


    function HtmlToPlaintextFilter() {
        return function(text) {
            return String(text).replace(/<[^>]+>/gm, '');
        };
    }



    Config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('timesheets', {
                url: "/",
                templateUrl: "views/timesheets.html",
                controller: 'TimesheetsCtrl'
            })
            .state('timesheets.week', {
                url: ":year/:weekNum",
                templateUrl: "views/timesheets.html",
                controller: 'TimesheetsCtrl'
            })
            .state('project', {
                url: "/project",
                templateUrl: "views/project.html",
                controller: 'ProjectCtrl'
            })
            .state('dashboard', {
                url: "/dashboard",
                templateUrl: "views/dashboard.html",
                controller: 'DashboardCtrl'
            })
            .state('login', {
                url: "/login",
                templateUrl: "views/login.html",
                controller: 'LoginCtrl'
            });
        $urlRouterProvider.otherwise('/');
    }




    AppCtrl.$inject = ['$location', '$rootScope', '$scope', '$state', '$cookies', 'DEVELOPMENT', 'serverRest', '$cookieStore', '$http', 'localData', 'toaster'];

    function AppCtrl($location, $rootScope, $, $state, $cookies, DEVELOPMENT, serverRest, $cookieStore, $http, localData, toaster) {
        $.requestsNum = 6;
        $.loading = false;
        $.loadingProgress = 0;
        $.initLoaded = false;

        $rootScope.$on('$stateChangeStart', onStateChangeStart);
        $rootScope.$on('error', onError);
        $rootScope.$on('notification', onNotification);
        $rootScope.$on('setWhoLoading', onSetWhoLoading);

        $rootScope.$on('runLoading', onRunLoading);
        $rootScope.$on('stopLoading', onStopLoading);
        $rootScope.$on('doProgress', onDoProgress);
        $rootScope.$on('plusOneLoader', onPlusOneLoader);
        $rootScope.$on('setRequstsNum', onSetRequstsNum);

        $.logout = logout;

        function logout() {
            $cookies.remove('token');
            $state.go('login');
        }



        function onStateChangeStart(event, next) {
            if (next.name === 'login') {
                return;
            }
            var token = $cookies.get('token');
            if (!token) {
                logout();
                return;
            }
            $http.defaults.headers.common['AuthToken'] = token;

        }

        function onNotification(e, array) {
            toaster.pop({
                type: array[0],
                title: array[0],
                body: array[1],
                showCloseButton: true
            });
        }

        function onError(e, error) {
            if (error.data.statusCode === 400) {
                $.$emit('notification', ['error', error.data.body.error_description]);
            }
            if (error.data.statusCode === 401) {
                $.logout();
            }
        }

        function onPlusOneLoader() {
            $.requestsNum++;
        }

        function onSetRequstsNum(e, num) {
            $.requestsNum = num;
        }

        function onRunLoading(e, inner) {
            if (inner) {
                $.loadingInner = true;
            } else {
                $.loading = true;
            }
            $.loadingProgress = 0;
        }

        function onStopLoading(e, inner) {
            if (inner) {
                $.loadingInner = false;
            } else {
                $.loading = false;
            }
            $.loading = false;
        }

        function onDoProgress() {
            var progress = Math.ceil($.loadingProgress + 100 / $.requestsNum);
            if (progress > 100) {
                progress = 100;
            }

            $.loadingProgress = progress;
        }

        function onSetWhoLoading(e, name) {
            $.whoLoading = name;
        }


    }
})();
