require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery-1.10.2',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
        text: 'text'
    }/*,packages: [{
        name: '',
        location: '',
        main: 'text.js'
    }
    ]*/
});

require([
    'app'
], function(App){
    
    App.initialize();

});