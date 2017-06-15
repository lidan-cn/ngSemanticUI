/**
 * Created by qzdd on 2017/6/15.
 */
require.config({
    "paths": {
        "jquery": "bower_components/jquery/dist/jquery.min",
        "lodash": "bower_components/lodash/dist/lodash.min",
        "angular": "bower_components/angular/angular.min",
        "ui.router": "bower_components/angular-route/angular-route.min",
        "semantic-ui": "bower_components/semantic-ui/dist/semantic.min"
    },
    "shim": {
        "angular": {"deps": ["jquery"], "exports": "angular"},
        "ui.router": {"deps": ["angular"]},
        //"semantic-ui": {"deps": ["jquery"]}
    }
});
define(['angular', 'app'], function (angular, app) {
    angular.bootstrap('html', [app.name]);
});