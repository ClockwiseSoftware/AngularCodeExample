(function (app) {
    'use strict';

    app.factory('loaders', loaders);


    loaders.$inject = ['$rootScope', 'serverRest'];

    function loaders($rootScope, serverRest) {

        function onError(error) {
            $rootScope.$emit('error', error);
        }

        function loadProfile() {
            return serverRest
                .getUser()
                .$promise;
        }

        function loadReport() {
            return serverRest
                .getReport()
                .$promise;
        }


        function buildCouch(couch) {
            if (!couch.item_id) {
                $rootScope.$emit('notification', ['error', 'Couch id not defined!']);
                return;
            }

            return couch;
        }

        function loadCouch(profile) {
            return serverRest
                .getCouch({
                    username: profile.name
                })
                .$promise
                .then(buildCouch);
        }




        function loadProjects(couch) {
            return serverRest
                .getProjects({
                    couchId: couch.item_id
                })
                .$promise;
        }


        function loadJours(couch, weekNum, currentYear) {
            return serverRest
                .getJours({
                    couchId: couch.item_id,
                    weekNum: weekNum,
                    year: currentYear
                })
                .$promise;
        }

        function loadJoursByCouches(couchesAndAdmins) {
            return serverRest
                .getJoursByCouches({
                    couchesAndAdmins: couchesAndAdmins
                })
                .$promise;
        }


        function loadTimesheets(jours) {
            return serverRest
                .getTimesheets({
                    jourIds: _.map(jours, 'value')
                })
                .$promise
                .then(function (response) {
                    return response.timesheets;
                });
        }

        function loadTimesheetsByCouchesJours(couchesAndAdmins) {
            return serverRest
                .getTimesheetsByCouchesJours({
                    couchesAndAdmins: couchesAndAdmins
                })
                .$promise;
        }



        function loadActivities(timesheets) {
            return serverRest
                .getActivities({
                    actIds: _.map(timesheets, 'activiteId')
                })
                .$promise;
        }

        function setWhoLoading(name) {
            $rootScope.$emit('setWhoLoading', name);
        }

        function stopLoading(inner) {
            $rootScope.$emit('stopLoading', inner);
        }

        function runLoading(inner) {
            $rootScope.$emit('runLoading', inner);
        }

        function doProgress() {
            $rootScope.$emit('doProgress');
        }

        return {
            loadActivities: loadActivities,
            loadTimesheets: loadTimesheets,
            loadTimesheetsByCouchesJours: loadTimesheetsByCouchesJours,
            loadProjects: loadProjects,
            loadJours: loadJours,
            loadJoursByCouches: loadJoursByCouches,
            loadProfile: loadProfile,
            loadCouch: loadCouch,
            runLoading: runLoading,
            stopLoading: stopLoading,
            setWhoLoading: setWhoLoading,
            doProgress: doProgress,
            loadReport:loadReport
        };

    }

})(angular.module('brandApp'));
