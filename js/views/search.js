/**
 * Created by vladimir on 09.10.14.
 */
define([
    'collectionsImages',
    'viewsImages',
    'viewsMoreButton',
    'text!../partials/search-panel.html'
], function (CollectionsImages, ViewImages, ViewMoreButton, searchPanelTpl) {

    var Search = Backbone.View.extend({
        el: '#search-block',
        template: _.template(searchPanelTpl),
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
            var collectionsImages = new CollectionsImages()
                .getImages({
                    hashtag: this.$el.find('input').val(), count: 5
                });
            var viewImages = new ViewImages({ collection: collectionsImages });
            var viewMoreButton = new ViewMoreButton({ collection: collectionsImages });

        },
        clear: function () {
            $('#images-block').html('');
        },
        render: function () {
            this.$el.append(this.template);
        }
    });

    return Search;

});