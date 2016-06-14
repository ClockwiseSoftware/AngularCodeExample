(function(brandApp) {
    'use strict';

    brandApp.controller('ProjectCtrl', ProjectCtrl);

    ProjectCtrl.$inject = ['$scope', 'serverRest', 'loaders'];

    function ProjectCtrl($, serverRest, loaders) {
        $.hoursTypes = ['hoursPlanned', 'hoursBilled', 'overflow'];
        $.projects = [];

        $.$emit('setRequstsNum', 4);

        loaders.runLoading();
        loaders.setWhoLoading('Profile');



        loaders.loadProfile()
            .then(onProfileLoaded)
            .then(onCouchLoaded)
            .then(onProjetsLoaded)

        .then(function() {
            loaders.doProgress();
            loaders.stopLoading();

            $.totalHoursPlanned = _getTotalHoursPlanned();
            $.totalHoursBilled = _getTotalHoursBilled();
            $.totalHoursOverflow = _getTotalHoursOverflow();
        })

        .catch(function(error) {
            $.$emit('error', error);
        });

        function onProfileLoaded(profile) {
            $.profile = profile;


            loaders.setWhoLoading('Couch');
            loaders.doProgress();
            return loaders.loadCouch(profile);
        }

        function onCouchLoaded(couch) {
            $.couch = couch;


            loaders.setWhoLoading('Projects');
            loaders.doProgress();
            return loaders.loadProjects(couch);
        }

        function onProjetsLoaded(projects) {
            $.projects = filterUniq($.projects, projects, 'itemId');


            loaders.setWhoLoading('Jours');
            loaders.doProgress();
            return loaders.loadJours($.couch, $.currentWeekNum, $.currentYear);
        }

        function filterUniq(oldArray, newArray, name) {
            var uniq = [];
            var array = oldArray.concat(newArray);
            return array.filter(function(el) {
                var hasnt = !_.includes(uniq, _.get(el, name));
                if (hasnt) {
                    uniq.push(_.get(el, name));
                    return el;
                }
            });
        }



        function _calculateHours(type) {
            if (!_.includes($.hoursTypes, type)) {
                console.error('Type of hour not found!');
                return;
            }
            var hours = 0;
            ($.projects || []).forEach(function(el) {
                hours += +el[type];
            });
            return hours;
        }

        function _getTotalHoursPlanned() {
            return _calculateHours('hoursPlanned');
        }


        function _getTotalHoursBilled() {
            return _calculateHours('hoursBilled');
        }


        function _getTotalHoursOverflow() {
            return _calculateHours('overflow');
        }

    }
})(angular.module('brandApp'));
