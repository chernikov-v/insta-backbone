/**
 * Created by vladimir on 10.10.14.
 */
define([
    'backbone'
],function(Backbone){
    var ViewMoreButton = Backbone.View.extend({
        el: "#more-button",
        template: "<button  type='button' class='center-block btn btn-default'>Load more... </button>",
        initialize: function () {

        },
        events: {
            'click button': function () {
                this.collection.getNext();
                console.log(this.collection)
            }
        },
        render: function () {
            this.$el.html(this.template);
        }
    });
    return ViewMoreButton;
});

