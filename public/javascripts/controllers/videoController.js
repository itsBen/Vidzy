module.exports.showVideos = function ($scope, $resource, $http, authentication) {
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
}
module.exports.addVideo = function ($scope, $resource, $location) {
    $scope.save = function () {
        var Videos = $resource('/api/videos');
        Videos.save($scope.video, function () {
            $location.path('/');
        });
    };
}
module.exports.editVideo = function ($scope, $resource, $location, $routeParams) {
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

}
module.exports.deleteVideo = function ($scope, $resource, $location, $routeParams) {
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