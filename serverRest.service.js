(function(brandApp) {
    'use strict';
    brandApp.service('serverRest', function($resource) {
        return $resource('', {}, {
            getUser: {
                url: '/api/user',
                method: 'get'
            },
            getCouch: {
                url: '/api/couch',
                method: 'get'
            },
            getActivities: {
                url: '/api/activities/getAllActiveActivities',
                method: 'post',
                isArray: true
            },
            getReport: {
                url: '/api/report',
                method: 'get',
                isArray: true
            },
            getHiddenActivities: {
                url: '/api/activities/getHiddenActivities',
                method: 'get',
                isArray: true
            },
            getTimesheets: {
                url: '/api/timesheets/getAllTimesheets',
                method: 'post'
            },
            getTimesheetsByCouchesJours: {
                url: '/api/timesheets/getTimesheetsByCouchesJours',
                method: 'post'
            },
            addTimesheet: {
                url: '/api/timesheets',
                method: 'post'
            },
            setSubmitDateAndSemaineOfCouch: {
                url: '/api/couch/setSubmitDateAndSemaineOfCouch',
                method: 'put'
            },
            setUnsubmitDateOfCouch: {
                url: '/api/couch/setUnsubmitDateOfCouch',
                method: 'put'
            },
            editTimesheet: {
                url: '/api/timesheets',
                method: 'put'
            },
            deleteTimesheet: {
                url: '/api/timesheets',
                method: 'delete'
            },
            getJours: {
                url: '/api/timesheets/getJours',
                method: 'get',
                isArray: true
            },
            getJoursByCouches: {
                url: '/api/timesheets/getJoursByCouches',
                method: 'post'
            },
            getProjects: {
                url: '/api/projects/getProjects',
                method: 'get',
                isArray: true
            },
            getActivitiesByProject: {
                url: '/api/activities/getActivitiesByProject',
                method: 'get',
                isArray: true
            },
            activityVisibilityAndComplete: {
                url: '/api/activities/activityVisibilityAndComplete',
                method: 'put'
            },
            setSubmitToAllTimesheets: {
                url: '/api/timesheets/setSubmitToAllTimesheets',
                method: 'put'
            },
            signin: {
                method: 'post',
                url: '/api/user/signin',
            }
        });
    });
})(angular.module('brandApp'));
