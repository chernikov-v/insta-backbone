'use strict';


/* Controllers */


var taskControllers = angular.module('taskControllers', [
    'ngStorage', 'timeago']);


taskControllers.controller('ImageListCtrl', [
    '$scope', '$sessionStorage', 'InstagramDi',
    function ($scope, $sessionStorage, InstagramDi) {
/*==============================================================================================================================*/
/*Инициализация внутреннего хранилища*/
/*==============================================================================================================================*/

        $scope.data = $sessionStorage.$default({
            images: null,
            nextId: null,
            searchText: null
        });

        /*==============================================================================================================================*/
        /*Запрос изображений с помощью $resource*/
        /*==============================================================================================================================*/

        $scope.searchFunc = function (text) {
            $scope.data.searchText = text;
            $scope.response = InstagramDi.query({hashtag: $scope.data.searchText, count: 5}, function (response) {
                    $scope.data.images = response.data;
                    $scope.data.nextId = response.pagination.next_max_id;
                }
            );
        };

    }]);


/*==============================================================================================================================*/
/*контроллер для кнопки добавить еще изображений*/
/*==============================================================================================================================*/

taskControllers.controller('addMoreController', ['$scope', 'InstagramDi', function ($scope, InstagramDi) {


    $scope.addMore = function () {
        if ($scope.data.nextId) {
            $scope.response = InstagramDi.query({hashtag: $scope.data.searchText, max_tag_id: $scope.data.nextId, count: 5}, function (response) {
                $scope.data.images = $scope.data.images.concat(response.data);
                $scope.data.nextId = response.pagination.next_max_id;
                console.log($scope.data.nextId);

            });
        } else {
            alert('Изображения закончились');
        }
    };

}]);

/*==============================================================================================================================*/
/*Контроллер для страницы image-details.html*/
/*==============================================================================================================================*/


taskControllers.controller('ImageDetailsCtrl', ['$sessionStorage', '$scope', '$routeParams', '_',
    function ($sessionStorage, $scope, $routeParams, _) {

        $scope.data = $sessionStorage.$default();
        $scope.image = $scope.data.images[_.findIndex($sessionStorage.images, {id: $routeParams.imageId})];

        }
    ]);

/*==============================================================================================================================*/
/*Контроллер для Like-ов*/
/*==============================================================================================================================*/
taskControllers.controller('LikesController', ['$scope', function ($scope) {

    $scope.likeInit = function (likes) {

        likes.likeStyles = ['like', 'like-press', 'liked'];
        likes.counter = 0;
        if (("liked" in likes) == false || likes.liked == false) {
            likes.counter = 0;
        } else {
            likes.counter = 2;
        }
    };
    $scope.likeStyleSet = function (likes) {
        return likes.likeStyles[likes.counter];
    };
    $scope.likePress = function (likes) {
        likes.counter = 1;
    };
    $scope.addLike = function (likes) {
        if (("liked" in likes) == false) {
            likes.liked = false;
        }

        if (likes.liked == false) {
            likes.liked = true;
            likes.counter = 2;
            likes.count++;
        } else if (likes.liked == true) {
            likes.liked = false;
            likes.counter = 0;
            likes.count--;
        }
    };
}]);


taskControllers.controller('commentsPanelCtrl',['$scope',function($scope){
/*==============================================================================================================================*/
/*Показывать панель комментариев если они есть*/
/*==============================================================================================================================*/
$scope.showComment = function (image) {

    if (!('myComments' in image)) {
        return false;
    }
    else {
        return true;
    }
};
/*==============================================================================================================================*/
/*Показать все комментарии*/
/*==============================================================================================================================*/

$scope.moreComments = function (image) {
    image.show = !image.show;
};
$scope.moreCommentsShow = function (image) {
    if ('show' in image == false || image.show == false) {
        return 3;
    } else {
        return image.myComments.length;
    }
};
/*==============================================================================================================================*/
/*Функция добавления комментария*/
/*==============================================================================================================================*/

}]);
taskControllers.controller('addCommentCtrl',['$scope','CommentService',function($scope,CommentService){
    $scope.addComment = function (image, text) {
        CommentService.add(image, text);

    };
}]);

/*==============================================================================================================================*/
/*контроллер очистки хранилища по кнопке clear*/
/*==============================================================================================================================*/
taskControllers.controller('resetStorage', ['$scope', '$sessionStorage', function ($scope, $sessionStorage) {
    $scope.resetStorage = function () {
        console.log('Before clearing \n', $sessionStorage);
        $sessionStorage.$reset();
        console.log('After clearing \n', $sessionStorage);
    };
}
]);
