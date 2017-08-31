var app       = angular.module('Vidzy', ['ngResource', 'ngRoute']);
//var authCtrl  = require('./controllers/authenticationController.js');
//var videoCtrl = require('./controllers/videoController.js');

app.config([
    '$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/home.html',
                controller: 'HomeCtrl',
            })
            .when('/add-video', {
                templateUrl: 'partials/video-form.html',
                controller: 'AddVideoCtrl',
            })
            .when('/video/:id', {
                templateUrl: 'partials/video-form.html',
                controller: 'EditVideoCtrl',
            })
            .when('/video/delete/:id', {
                templateUrl: 'partials/video-delete.html',
                controller: 'DeleteVideoCtrl',
            })
            .when('/register', {
                templateUrl: 'partials/register-form.html',
                controller: 'RegisterCtrl',
                controllerAs: 'vm',
            })
            .when('/login', {
                templateUrl: 'partials/login-form.html',
                controller: 'LoginCtrl',
                controllerAs: 'vm',
            })
            .otherwise({
                redirectTo: '/',
            });
    },
]);

// TODO: source that out to other files if possible
var authCtrl = {
    register: function($location, authentication) {
        var vm = this;
        vm.credentials = {
            name: '',
            email: '',
            password: '',
        };
        vm.returnPage = $location.search().page || '/';
    
        vm.onSubmit = function () {
            vm.formError = '';
            if (!vm.credentials.name ||
                !vm.credentials.email ||
                !vm.credentials.password
            ) {
                vm.formError = 'All fields required, please try again';
                return false;
            } else {
                vm.doRegister();
            }
        };
    
        vm.doRegister = function () {
            vm.formError = '';
            authentication
                .register(vm.credentials)
                .error(function (err) {
                    vm.formError = err;
                })
                .then(function () {
                    $location.search('page', null);
                    $location.path(vm.returnPage);
                });
        };
    },    
    login: function($location, authentication) {
        var vm = this;
    
        vm.pageHeader = {
            title: 'Sign in to Vidzy',
        };
    
        vm.credentials = {
            email: '',
            password: '',
        };
    
        vm.returnPage = $location.search().page || '/';
    
        vm.onSubmit = function () {
            vm.formError = '';
            if (!vm.credentials.email || !vm.credentials.password) {
                vm.formError = 'All fields required, please try again';
                return false;
            } else {
                vm.doLogin();
            }
        };
    
        vm.doLogin = function () {
            vm.formError = '';
            authentication
                .login(vm.credentials)
                .error(function (err) {
                    vm.formError = err;
                })
                .then(function () {
                    $location.search('page', null);
                    $location.path(vm.returnPage);
                });
        };
    }
};

var videoCtrl = {
	showVideos: function ($scope, $resource, $http, authentication) {
        $http
            .get('/api/videos', {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                },
            })
            .then(
                function successCallback(response) {
                    console.log(response);
                    $scope.videos = response.data;
                },
                function errorCallback(response) {
                    console.error(response);
                }
            );
    },
    addVideo: function ($scope, $resource, $location) {
        $scope.save = function () {
            var Videos = $resource('/api/videos');
            Videos.save($scope.video, function () {
                $location.path('/');
            });
        };
    },
    editVideo: function ($scope, $resource, $location, $routeParams) {
        var Videos = $resource(
            '/api/videos/:id', {
                id: '@_id'
            }, {
                update: {
                    method: 'PUT'
                },
            }
        );
    
        Videos.get({
            id: $routeParams.id
        }, function (video) {
            $scope.video = video;
        });
    
        $scope.save = function () {
            Videos.update($scope.video, function () {
                $location.path('/');
            });
        };
    
    },
    deleteVideo: function ($scope, $resource, $location, $routeParams) {
        console.log("delete video 2");
        var Videos = $resource('/api/videos/:id');
    
        Videos.get({
            id: $routeParams.id
        }, function (video) {
            $scope.video = video;
        });
    
        $scope.delete = function () {
            Videos.delete({
                id: $routeParams.id
            }, function (video) {
                $location.path('/');
            });
        };
    }
};

// HOME
app.controller('HomeCtrl', ['$scope', '$resource', '$http', 'authentication', videoCtrl.showVideos]);

// ADD VIDEOS
app.controller('AddVideoCtrl', ['$scope', '$resource', '$location', videoCtrl.addVideo]);

// EDIT VIDEOS
app.controller('EditVideoCtrl', ['$scope', '$resource', '$location', '$routeParams', videoCtrl.editVideo]);

// DELETE VIDEOS
app.controller('DeleteVideoCtrl', ['$scope', '$resource', '$location', '$routeParams', videoCtrl.deleteVideo]);

// REGISTER
app.controller('RegisterCtrl', ['$location', 'authentication', authCtrl.register]);

// LOGIN
app.controller('LoginCtrl', ['$location', 'authentication', authCtrl.login]);