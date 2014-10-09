require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery-1.10.2',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
        text: 'text',

        collectionsImages: 'collections/images',

        modelsImage: 'models/image',

        viewsList: 'views/list',
        viewsOne: 'views/one',
        viewsSearch: 'views/search',
        viewsImage: 'views/viewImage',
        viewsImages: 'views/viewImages'
    }
});

require([
    'app'
], function ( App ) {

    App.initialize();

});