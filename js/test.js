
var imagesModel = Backbone.Model.extend({
    initialize: function(){
        console.log('Initialize MODEL');
    },
    default: {
        images: null,
        nextId: null,
        searchText: null
    }
});


var imagesCollection = Backbone.Collection.extend({

    model: imagesModel,
    url: '',
    base: "https://api.instagram.com/v1/tags/",
    clientId: 'b75c2e8bdb2844b388a3752b920a7743',
    /*642176ece1e7445e99244cec26f4de1f
    b75c2e8bdb2844b388a3752b920a7743*/
    hashtag: '',
    count: '',
    initialize: function(props){
        console.log('Initialize Collection');
        this.url = this.base + props.hashtag + '/media/recent?client_id=' + this.clientId + '&count=' + props.count;
        console.log(this.url);
    }/*,
    parse: function(response){
        var test = response;
        console.log(response);
        return test;
    }*/

});


var mod = new imagesModel();
var col = new imagesCollection({hashtag: 'hello', count: 5});
/*
col.fetch(
    {

        dataType: 'jsonp',
        then: function (response){
        console.log(response);
        }
    }
);
*/
col.fetch({dataType: 'jsonp'}).success(function(promise){
    console.log(promise);
});




MyModel = Backbone.Model.extend({
    url: function() {
        return '/yourJsonpUrlhere';
    },

    // override backbone synch to force a jsonp call
    sync: function(method, model, options) {
        // Default JSON-request options.
        var params = _.extend({
            type:         'GET',
            dataType:     'jsonp',
            url:			model.url(),
            jsonp: 		"jsonpCallback",   // the api requires the jsonp callback name to be this exact name
            processData:  false
        }, options);

        // Make the request.
        return $.ajax(params);
    },

    parse: function(response) {
        // parse can be invoked for fetch and save, in case of save it can be undefined so check before using
        if (response) {
            if (response.success ) {
                // here you write code to parse the model data returned and return it as a js object
                // of attributeName: attributeValue

                return {name: response.name};      // just an example,
            }
        }
    }
});
