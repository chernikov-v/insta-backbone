'use strict';

/* Services */
/*====================================================================================================================================*/
/*Сервис для работы с Instagram Api с помощью $resource*/
/*====================================================================================================================================*/

taskApp.factory('InstagramDi', ['$resource', function ($resource) {

    var base = "https://api.instagram.com/v1";
    var clientId = 'b75c2e8bdb2844b388a3752b920a7743';
    /*642176ece1e7445e99244cec26f4de1f*/
    /*b75c2e8bdb2844b388a3752b920a7743*/
    return $resource(base + '/tags/:hashtag/media/recent?client_id=:client_id&count=:count', {
        callback: 'JSON_CALLBACK'
    }, {
        query: {
            method: 'JSONP',
            params: {
                'hashtag': '@hashtag' || '',
                'count': '@count' || '',
                'client_id': clientId,
                'max_tag_id': '@next_max_id' || ''
            }

        }
    });
}]);
/*====================================================================================================================================*/
/*Подключение библиотеки lodash*/
/*====================================================================================================================================*/

taskApp.factory('_', ['$window',
    function ($window) {
        return $window._;
    }
]);


/*====================================================================================================================================*/
/*Работа с комментариями*/
/*====================================================================================================================================*/
taskApp.factory('CommentService', function () {
        return{
            add: function (image, text) {
                image.tempText = text;

                if (text) {
                    if (!("myComments" in image)) {
                        image.myComments = [
                            {
                                user_name: 'my_user_name',
                                user_image: 'img/anonymous.png',
                                text: image.tempText,
                                show: '3'
                            }
                        ];
                        image.show = false;

                    } else {
                        image.myComments.push({user_name: 'my_user_name', user_image: 'img/anonymous.png', text: image.tempText});
                    }
                    image.tempText = null;
                }
            }
        }
    }
);

