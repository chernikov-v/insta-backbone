define([
    'jquery',
    'underscore',
    'backbone',
    'text!../partials/image-list.html',
    'text!../partials/search-panel.html',
    'text!../partials/photo-item.html'
], function ($,_,Backbone,imageList, searchPanel, photoItem) {

    var app = sessionStorage;
    console.log(app.length);
    var setStorage = function () {
        return {
            View: {
                Image: {},
                Images: {},
                Search: {}
            },

            Model: {
                Image: {}
            },

            Colleсtion: {
                Images: {}
            }
        }

    };
    if (app.length == 0) {
        app = setStorage();
    }
    /*********************************************************************************************************************************/
    /*
     LIST PAGE VIEW
     */
    /*********************************************************************************************************************************/
    app.View.Images = Backbone.View.extend({
        el: '#main-block',
        template: _.template(imageList),
        initialize: function () {
            this.list_view();
        },
        list_view: function () {
            this.$el.html(this.template);
        }
    });
    /*********************************************************************************************************************************/
    /*
     IMAGES MODEL
     */
    /*********************************************************************************************************************************/
    app.Model.Image = Backbone.Model.extend({
        initialize: function () {
            console.log('Initialize MODEL');
            var view = new app.View.Image({model: this});
        }
    });
    /*********************************************************************************************************************************/
    /*
     IMAGES COLLECTION
     */
    /*********************************************************************************************************************************/
    app.Colleсtion.Images = Backbone.Collection.extend({
        model: app.Model.Image,
        initialize: function () {
            return this;
        }, getImages: function (props) {

            this.url = 'https://api.instagram.com/v1/tags/' + props.hashtag + '/media/recent?count=' + props.count + '&client_id=b75c2e8bdb2844b388a3752b920a7743';

            this.fetch({dataType: 'jsonp'});

            return this;
        }, getNext: function (props) {

        }, parse: function (response) {
            console.log('initialize data from server  - ', response.data);
            return response.data;
        }
    });
    /*********************************************************************************************************************************/
    /*
     IMAGES VIEW
     */
    /*********************************************************************************************************************************/
    app.View.Image = Backbone.View.extend({
        el: '#images-block',
        template: _.template(photoItem),
        initialize: function () {
            console.log('Initialize IMAGE VIEW');
            console.log('модель --- ', this.model.get('id'));
            this.render();
        },
        events: {
            'submit .comment': function (e) {
                e.preventDefault();

                console.log(e);
            }
        },
        render: function () {
            this.$el.append(this.template(this.model.attributes));
            //this.$el.find('.timeago').timeago();
            //console.log(this.$el.find('.timeago').timeago());
            return this;
        }

    });
    /*********************************************************************************************************************************/
    /*
     View the SEARCH PANEL
     */
    /*********************************************************************************************************************************/
    app.View.Search = Backbone.View.extend({
        el: '#search-block',
        template: _.template(searchPanel),
        initialize: function () {
            this.render();

        },
        events: {
            'submit #search': function (e) {
                e.preventDefault();
                console.log('SUBMIT');
                var col = new app.Colleсtion.Images().getImages({hashtag: this.$el.find('input').val(), count: 5});
                var button = new app.View.Button({collection: col});

            }
        },
        render: function () {
            this.$el.append(this.template);
        }
    });

    app.View.Button = Backbone.View.extend({
        el: "#more-button",
        template: "<button  type='button' class='center-block btn btn-default'>Load more... </button>",
        initialize: function () {
            this.collection.on('fetch', this.render());
        },
        events: {
            'click button': function () {
                alert('HELLO!!!');
            }
        },
        render: function () {
            this.$el.html(this.template);
        }
    });
    var imgList = new app.View.Images();

    var searchView = new app.View.Search();

    return{
        initialize: function () {
            console.log('INIT MAIN');

        }
    }

});
/*642176ece1e7445e99244cec26f4de1f
 b75c2e8bdb2844b388a3752b920a7743*/