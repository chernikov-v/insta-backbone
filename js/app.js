define([
    'text!../partials/image-list.html',
    'text!../partials/search-panel.html',
    'text!../partials/photo-item.html'
], function (imageList, searchPanel, photoItem) {

    var app = sessionStorage;
    var setStorage = function () {
        return {
            View: {
                Image: {},
                Images: {},
                Search: {},
                Collection:{}
            },

            Model: {
                Image: {}
            },

            Colleсtion: {
                Images: {}
            },
            Storage:{
                collection:{
                    length: 0
                }
            }
        }

    };

    if (app.length == 0) {
        app = setStorage();
        console.log('SET STORAGE')
    }
    if(app.Storage.collection.length != 0)
    {

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
        liked: true,
        initialize: function () {
//            console.log(this.get('id'));
           //var view = new app.View.Image({model: this});
        },
        getTimeago : function(){
            var date = new Date();
            date.setMilliseconds(this.model.get('created_time'));
            return jQuery.timeago(date);
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
        }, getNext: function () {
           this.fetch({dataType: 'jsonp',remove: false})

        }, parse: function (response) {
            console.log('initialize data from server  - ', response.data);
            console.log(response);
            this.url = response.pagination.next_url;
           // Backbone.trigger('parse');
            return response.data;
        }
    });

    /*********************************************************************************************************************************/
    /*
     COLLECTION VIEW
     */
    /*********************************************************************************************************************************/
    app.View.Collection = Backbone.View.extend({
        el: '#images-block',
        template: _.template(photoItem),
        initialize: function(){
            console.log('COLLECTION VIEW');
            //Backbone.on('parse',this.collection.each(this.renderEach, this),this);
        },
        renderEach: function(md){
            //console.log(model);
            //this.$el.append(this.template(model.attributes));
            var modelView = new app.View.Image({model: md});
            //return this;
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

            this.render();
        },
        render: function () {

            this.$el.append(this.template(this.model.toJSON()));

            return this;
        }
    });

    /*********************************************************************************************************************************/
    app.View.ImageComments = Backbone.View.extend({
        el:'#images-block',
        events: {
            'submit .comment':function (evt) {
                evt.preventDefault();
                console.log($(evt.currentTarget).find('input').val());
                $(evt.currentTarget).find('input').val('hello');

            }
        }
    });
    /*********************************************************************************************************************************/
    /*
     View the SEARCH
     */
    /*********************************************************************************************************************************/
    app.View.Search = Backbone.View.extend({
        el: '#search-block',
        template: _.template(searchPanel),
        initialize: function () {
            this.render();
            console.log('init SEARCH VIEW');
        },
        events: {
            'submit #search': 'search'
        },
        search: function (e) {
            e.preventDefault();
            console.log('SUBMIT');
            app.Storage.collection = new app.Colleсtion.Images().getImages({hashtag: this.$el.find('input').val(), count: 5});
            var colview = new app.View.Collection({collection: app.Storage.collection});
            var button = new app.View.Button({collection: app.Storage.collection});

        },
        render: function () {
            this.$el.append(this.template);
        }
    });
    /*********************************************************************************************************************************/
    /*
     View the NEXT BUTTON
     */
    /*********************************************************************************************************************************/

    app.View.Button = Backbone.View.extend({
        el: "#more-button",
        template: "<button  type='button' class='center-block btn btn-default'>Load more... </button>",
        initialize: function () {
            this.collection.on('fetch', this.render());
        },
        events: {
            'click button': function () {
             app.Storage.collection.getNext();
                console.log(app.Storage.collection)
            }
        },
        render: function () {
            this.$el.html(this.template);
        }
    });

    var imgList = new app.View.Images();
    var searchView = new app.View.Search();
    var imagesComment = new app.View.ImageComments();

    return{
        initialize: function () {
            console.log('INIT MAIN');

        }
    }

});
/*642176ece1e7445e99244cec26f4de1f
 b75c2e8bdb2844b388a3752b920a7743*/