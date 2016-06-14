(function() {
    'use strict';
    var brandApp = angular.module('brandApp');
    brandApp.directive('weekPagination', WeekPagination);
    brandApp.controller('WeekPaginationCtrl', WeekPaginationCtrl);

    WeekPaginationCtrl.$inject = ['$scope', '$window'];

    function WeekPaginationCtrl($, $window) {
        var moment = $window.moment;
        $.tmpWeek = $.currentWeekNum;
        $.tmpYear = $.currentYear;
        $.nextWeekDisabled = false;
        var now = moment();
        $.currentYear = now.weekYear($.currentYear).isoWeekYear();
        var currentWeek = now.week($.currentWeekNum);
        $.nextWeekDisabled = currentWeek.isSame(now, 'week');


        $.nextWeek = nextWeek;
        $.prevWeek = prevWeek;



        function nextWeek() {
            var now = moment();
            var currentWeek = moment().isoWeekYear($.currentYear).isoWeek($.currentWeekNum);
            var nextWeek = currentWeek.add(1, 'week');
            var isAfterWeek = nextWeek.isAfter(now, 'week');
            var isSameYear = nextWeek.isSame(now, 'year');

            if (isAfterWeek && isSameYear) {
                $.nextWeekDisabled = true;
            } else {
                $.currentWeekNum = nextWeek.isoWeek();
                $.currentYear = nextWeek.isoWeekYear();
                $.nextWeekDisabled = now.isSame(nextWeek, 'week');

            }
        }

        function prevWeek() {
            var currentWeek = moment().isoWeekYear($.currentYear).isoWeek($.currentWeekNum);
            var prevWeek = currentWeek.subtract(1, 'week');
            $.currentWeekNum = prevWeek.isoWeek();
            $.currentYear = prevWeek.isoWeekYear();
            $.nextWeekDisabled = false;
        }
    }



    function WeekPagination() {
        return {
            scope: {
                currentWeekNum: '=',
                currentYear: '='
            },
            templateUrl: 'scripts/directives/weekPagination/weekPagination.html',
            controller: WeekPaginationCtrl
        };
    }
})();
