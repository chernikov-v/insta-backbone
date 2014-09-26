'use strict';
/* Directives */
/*==================================================блок поиска==============================================================*/

taskApp.directive('searchPanel', function () {
    return {
        restrict: 'E',
        priority: '0',
        replace: true,
        templateUrl: './partials/search-panel.html'
    };
});
/*======================================================корректировка вводимых символов в поле ввода поискового запроса==============================================================*/
taskApp.directive('checkInput', function () {
    return {
        require: 'ngModel',
        priority: '1',
        link: function ($scope, element, attrs, modelCtrl) {
            var replaceInput = function (inputValue) {

                if (typeof inputValue == "undefined") {
                    return;
                }
                var correctedString = inputValue.replace(/[^$A-Za-zА-Яа-я0-9_]/g, '');

                if (correctedString !== inputValue) {
                    modelCtrl.$setViewValue(correctedString);
                    modelCtrl.$render();
                }
                return correctedString;
            };

            modelCtrl.$parsers.push(replaceInput);
            replaceInput($scope[attrs.ngModel]);
        }
    };
});

/*======================================================блок аватара пользователя==============================================================*/
taskApp.directive('photoUser', function () {
    return {
        restrict: 'E',
        templateUrl: './partials/photo-user.html'
    };

});

/*======================================================блок изображения==============================================================*/
taskApp.directive('photoItem', function () {
    return{
        restrict: 'E',
        templateUrl: './partials/photo-item.html'
    }
});
/*======================================================панель лайков==============================================================*/

taskApp.directive('likePanel', function () {
    return{
        restrict: 'E',
        replace: true,
        templateUrl: './partials/like-panel.html',
        controller: 'LikesController'
        }
});
/*======================================================панель комментариев==============================================================*/

taskApp.directive('commentsPanel', function () {
    return{
        restrict: 'E',
        replace: true,
        templateUrl: './partials/comments-panel.html',
        controller: 'commentsPanelCtrl'
    }
});
/*======================================================панель описания==============================================================*/
taskApp.directive('caption', function () {
    return{
        restrict: 'A',
        replace: true,
        templateUrl: './partials/caption.html'
    };
});


/*======================================================парсер тэгов==============================================================*/
taskApp.directive('captionTags', ['$compile', '$interpolate', function ($compile, $interpolate) {
    return{
        restrict: 'E',
        replace: true,
        templateUrl: './partials/caption-tags.html',
        link: function ($scope, $element, $attrs) {
            if ($attrs.text) {
                var exp = $interpolate($attrs.text);
                $scope.$watch(exp, function (newValue) {
                    var newHtml = newValue.
                        replace(/'/g,'').
                        replace(/<(.*?)>/gm, '&lt;$1&gt;').
                        replace(/#([^@][\d\D][^\t\s:#]*)/g,
                        "<span onclick = \"goTop()\" ng-click=\"searchFunc('$1')\">#$1</span>").
                        replace(/@([^#][\d\D][^\t\s:@]*)/g,
                        "<span onclick=\"focusToInput(this)\" ng-click = \"image.tempText = '@$1: '\">@$1</span>");


                        var e = $compile('<div>' + newHtml + '</div>')($scope);
                    $element.html(e);

                });
            }
        }
    };
}]);


