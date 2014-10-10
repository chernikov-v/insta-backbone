/**
 * Created by vladimir on 15.09.14.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'viewsList',
    'viewsOne'

], function ($, _, Backbone, ViewsList, One) {

    var Router = Backbone.Router.extend({

            routes: {

                'images': 'viewList',

                'images/:id': 'viewOne',

                '*other': 'defaultAction'
            },
        viewList: function () {
               var list = new ViewsList();
                console.log('IMAGES PAGE OPENED')
            },
        viewOne: function (id) {
               // var one = new One();
                console.log('ITEM PAGE OPENED', id);
            },
        defaultAction: function () {
                this.navigate('images', {trigger: true})
            console.log('default action');
            }
        });

    var initialize = function () {
        var router = new Router();
/*
        router.on('viewList', function () {
            var list = new List();
            console.log('IMAGES PAGE OPENED')
        });

        router.on('viewOne', function (id) {
            var one = new One();
            console.log('ITEM PAGE OPENED', id);
        });

        router.on('defaultAction', function () {
            this.navigate('#/images/', {trigger: true})
        });*/

        Backbone.history.start();
    };

    return {
        initialize: initialize
    }
});