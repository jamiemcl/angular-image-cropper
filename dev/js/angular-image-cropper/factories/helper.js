(function(angular) {
    'use strict';

    angular
        .module('imageCropper')
        .factory('HelperFactoryFactory', factory);

    factory.$inject = [
        'defaultConfig'
    ];

    function factory(defaultConfig) {
        var touchRegExp = /touch/i;
        var hasTransform = null;
        var service = {
            'canTransform': canTransform,
            'getPointerPosition': getPointerPosition,
            'isTouch': isTouch,
            'validEvent': validEvent
        };

        return service;

        /**
         * METHODS
         */

        function isTouch(e) {
            return touchRegExp.test(e.type);
        }

        function validEvent(e) {
            if (isTouch(e)) {
                return e.originalEvent.changedTouches.length === 1;
            } else {
                return e.which === 1;
            }
        }

        function getPointerPosition(e) {
            if (isTouch(e)) {
                e = e.originalEvent.touches[0];
            }
            return {
                'x': e.pageX,
                'y': e.pageY
            };
        }


        function canTransform() {
            if(hasTransform !== null) { return hasTransform; }

            var HelperFactory, prefix, prefixes, prop, test, tests, value, _i, _len;

            prefixes = ['webkit', 'Moz', 'O', 'ms', 'Khtml'];
            tests = {
                'transform': 'transform'
            };

            for (_i = 0, _len = prefixes.length; _i < _len; _i++) {
                prefix = prefixes[_i];
                tests[prefix + 'Transform'] = '-' + prefix.toLowerCase() + '-transform';
            }

            HelperFactory = document.createElement('img');
            document.body.insertBefore(HelperFactory, null);
            for (test in tests) {
                prop = tests[test];

                if (HelperFactory.style[test] === void 0) {
                    continue;
                }

                HelperFactory.style[test] = 'rotate(90deg)';
                value = window.getComputedStyle(HelperFactory).getPropertyValue(prop);

                if ((value !== null) && value.length && value !== 'none') {
                    hasTransform = true;
                    break;
                }
            }

            document.body.removeChild(HelperFactory);

            return hasTransform;
        }

    }
})(angular);
