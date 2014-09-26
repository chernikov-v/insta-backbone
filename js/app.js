define([
    'text!../partials/image-list.html',
    'text!../partials/search-panel.html',
    'text!../partials/photo-item.html'
], function (imageList, searchPanel, photoItem) {

    var app = sessionStorage;
       setLocalStorage = function(){
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
    app = setLocalStorage();


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
            var test = new app.View.Image({model: this});

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
            console.log('THIS IS PARSE FUNCTION  - ', response.data);
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
        event: {
            'submit': function (e) {
                e.preventDefault();
                console.log(e);
            }
        },
        render: function () {

            this.$el.append(this.template(this.model.attributes));
            this.$el.find('.timeago').timeago();
            console.log(this.$el.find('.timeago').timeago());
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
            }

        },
        render: function () {
            this.$el.append(this.template);
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