/**
 * Created by qzdd.net on 2017/5/19.
 * 提供延迟加载功能的接口，在模块定义时依赖此模块
 * 如果有files则resolve,无则普通state
 * 加载控制器，指令，服务文件
 * 服务，指令，控制器都用[function]，添加name属性注册时使用
 * 注册控制器
 * 注册指令
 * 注册服务
 */
define(['angular'], function () {
    return angular.module('li.lazyLoader', [], ['$provide', function ($provide) {
        $provide.provider('lazyLoader', ['$stateProvider', '$controllerProvider', '$compileProvider', '$provide',
            function ($stateProvider, $controllerProvider, $compileProvider, $provide) {
                return {
                    "state": function (stateRules) {
                        _.forEach(stateRules, function (rule) {
                            $stateProvider.state(rule.name, rule.files ? _.extend({
                                "resolve": {
                                    "deferRegister": ['$q', function ($q) {
                                        var defer = $q.defer();
                                        require(rule.files, function () {
                                            _.forEach(arguments, function (file) {
                                                switch (file.registerType) {
                                                    case 'service':
                                                        $provide.service(file.name, file);
                                                        break;
                                                    case 'directive':
                                                        $compileProvider.directive(file.name, file);
                                                        break;
                                                    case 'controller':
                                                    default:
                                                        $controllerProvider.register(file.name, file);
                                                        break;
                                                }
                                            });
                                            defer.resolve();
                                        });
                                        return defer.promise;
                                    }]
                                }
                            }, rule) : rule);
                        });
                    },
                    "$get": function () {
                        return {"p": "1"};
                    }
                };
            }]);
    }]);
});