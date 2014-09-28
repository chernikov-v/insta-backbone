require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery-1.10.2',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap'
    }
});

require([
    'app'
], function(App){
    
    App.initialize();

});