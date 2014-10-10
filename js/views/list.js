/**
 * Created by vladimir on 09.10.14.
 */
define([
    'backbone',
    'viewsSearch',
    'text!../partials/image-list.html'
    ], function( Backbone, ViewsSearch, imagesList ){
        var ViewImages = Backbone.View.extend({
            el: '#main-block',
            template: _.template(imagesList),
            initialize: function () {
                this.list_view();
                var viewSearch = new ViewsSearch();
            },
            list_view: function () {
                this.$el.html(this.template);
            }
        });

    return ViewImages;
    });

/*


var setStorage = function () {
    return {
        View: {
            Image: {},
            Images: {},
            Search: {},
            Collection: {}
        },

        Model: {
            Image: {}
        },

        Colleсtion: {
            Images: {}
        },
        Storage: {
            collection: {
                length: 0
            }
        }
    }


};
if ( typeof app === 'undefined' ) {
    var app = setStorage();
    console.log( 'SET STORAGE' );
}
*/


/*********************************************************************************************************************************/
/*
 LIST PAGE VIEW
 */
/*********************************************************************************************************************************/
/*app.View.Images = Backbone.View.extend({
    el: '#main-block',
    template: _.template( imageList ),
    initialize: function () {
        this.list_view();
    },
    list_view: function () {
        this.$el.html(this.template);
    }
});*/
/*********************************************************************************************************************************/
/*
 IMAGES MODEL
 */
/*********************************************************************************************************************************/
/*
app.Model.Image = Backbone.Model.extend({
    liked: true,
    initialize: function () {
//            console.log(this.get('id'));
        // var view = new app.View.Image({model: this});
    },
    getTimeago: function () {

        var date = new Date();
        date.setMilliseconds(this.model.get('created_time'));
        return jQuery.timeago(date);
    }
});
*/



/*********************************************************************************************************************************/
/*
 IMAGES COLLECTION
 */
/*********************************************************************************************************************************/
/*app.Colleсtion.Images = Backbone.Collection.extend({
    model: app.Model.Image,
    initialize: function () {
        return this;
    }, getImages: function (props) {

        this.url = 'https://api.instagram.com/v1/tags/' + props.hashtag + '/media/recent?count=' + props.count + '&client_id=b75c2e8bdb2844b388a3752b920a7743';

        this.fetch(
            {
                dataType: 'jsonp',
                success: function (response) {

                    if(response){
                        console.log('!!!!!!!!!!!!!!!!!!!!',Backbone.trigger('megaEvent'));
                    }

                }
            }
        );

        return this;
    }, getNext: function () {
        this.fetch({dataType: 'jsonp', remove: false})

    }, parse: function (response) {
        return response.data;
    }
});*/


/*********************************************************************************************************************************/
/*
 COLLECTION VIEW
 */
/*********************************************************************************************************************************/
/*app.View.Collection = Backbone.View.extend({
    el: '#images-block',
    template: _.template(photoItem),
    initialize: function () {
        console.log('COLLECTION VIEW');
        Backbone.on('megaEvent', this.func(),this);
    },
    func: function () {
        console.log('COLLECTION EACH --- ', this.collection);
        this.collection.each(this.renderEach, this);
    },
    renderEach: function (md) {
        console.log(md);
        this.$el.append(this.template(md.attributes));
    }

});*/

/*********************************************************************************************************************************/
/*
 IMAGES VIEW
 */
/*********************************************************************************************************************************/
/*
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
*/

/*********************************************************************************************************************************/
/*app.View.ImageComments = Backbone.View.extend({
    el: '#images-block',
    events: {
        'submit .comment': function (evt) {
            evt.preventDefault();
            console.log($(evt.currentTarget)
                    .find('input')
                    .val()
            );
            $(evt.currentTarget)
                .find('input')
                .val('hello');

        }
    }
});*/
/*********************************************************************************************************************************/
/*
 View the SEARCH
 */
/*********************************************************************************************************************************/
/*app.View.Search = Backbone.View.extend({
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
        this.clear();
        app.Storage.collection = new app.Colleсtion.Images()
            .getImages( {
                hashtag: this.$el.find('input').val(), count: 5
            });
        var colview = new app.View.Collection({ collection: app.Storage.collection });
        var button = new app.View.Button({ collection: app.Storage.collection });

    },
    clear: function () {
        $('#images-block').html('');
    },
    render: function () {
        this.$el.append(this.template);

    }

});*/
/*********************************************************************************************************************************/
/*
 View the NEXT BUTTON
 */
/*********************************************************************************************************************************/

/*
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
var imagesComment = new app.View.ImageComments();*/
