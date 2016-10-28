/**
* SETUP
**/
var app = app || {};


/**
* MODELS
**/
app.Message = Backbone.Model.extend({
    defaults: {
        message: ''
    }
});

app.SubmitMessage = Backbone.Model.extend({
    // data source
    url: function() {
        return 'http://localhost:3000/posts?m=' + this.get('message');
    },
    defaults: {
        message: ''
    }
});

/**
* VIEWS
**/
app.MessageView = Backbone.View.extend({
    el: '#chat',
    // constructor
    initialize: function() {
        this.model = new app.Message();
        this.model.bind('change', this.render, this);       // ViewModel
        
        this.template = _.template($('#tmpl-message').html());

        this.createWebSocket();        
    },
    // Backbone delegation
    render: function() {
        var htmlCodes = this.template(this.model.attributes);
        this.$el.find('#message').append(htmlCodes);
    },
    createWebSocket: function() {
        var div = this.$el.find('#message');
        var self = this;
        
        function onWsMessage(message) {
            var obj = JSON.parse( message.data );
           self.model.set('message', obj.message);      // model state is changed
        }
        
         // Let us open a web socket
         ws = new WebSocket("ws://wot.city/object/jollen/viewer");
         ws.onopen = function()
         {
             div.append("<h2>Done</h2>");
         };

         ws.onmessage = onWsMessage;

         ws.onclose = function()
         { 
            div.append("<h2>Closed</h2>");
         };
         
         ws.onerror = function()
         { 
            div.html("<h1>error</h1>");
         };  
    }
});


app.ActionView = Backbone.View.extend({
    el: '#action',
    events: {
        'click #btn-message-save':  'save'
    },
    initialize: function() {
        this.model = new app.SubmitMessage();
    },
    save: function() {
        var text = this.$el.find('#text').val();
        
        this.model.set('message', text);
        this.model.save({
            success: function(model, response, options) {
                console.log('[success] ' + response)
            }
        });
    }    
});


// Source: https://github.com/jollen/nodejs-chat-stub
// 
// 等候 HTML 文件完成載入
$(document).ready(function(){
    app.messageView = new app.MessageView();
    app.actionView = new app.ActionView();
});
