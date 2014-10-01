var ViewFriends = Backbone.View.extend({
    initialize: function initialize (options) {
        this.options = options;
        this.template = templates.get('friend','Friends');
        this.collection.on({
            "add" : this.onNewFriend,
            "remove" : this.onDeleteFriend
        }, this);
        this.tAmount = 0;
        this.yAmount = 0
    },
    render : function render () {
        this.$el.html(this.template({
            friends: this.collection.models.length
        })); 
        $("#" + this.options.parentDiv).append(this.$el);
        for(var modelIndex = 0; modelIndex < this.collection.models.length; modelIndex++){
            this._createFriendsView(this.collection.models[modelIndex]);
        }
        return this;
    },
    events: {
        "tap .dummyAddFriends"                : "onAddFriend",
    },

    onNewFriend: function onNewFriend (model , collection) {
        this._createFriendsView(model);
        this.$el.find(".dummyFriendsCount").html(this.collection.models.length);
        if(model.isNew()){
            model.save();
        
        }

    },
    onAddFriend: function onAddCredit () {
        this._onAddToCollection(this.$el.find(".dummyFriendName").val());
    },
    _onAddToCollection : function _onAddToCollection (name) {
        this.collection.create({
            name: name
        },{ 
            validate: true,
            wait:true
        });
    },
    onDeleteFriend: function onDeleteTransaction (model) {
        this.$el.find(".dummyFriendsCount").html(this.collection.models.length);
    },
    _createFriendsView: function _createFriendsView (model) {
        var FriendView = new ViewFriend({
            model: model
        }).render();
        this.$el.find(".dummyFriendList").append(FriendView.el);
        app.scrollDown(FriendView.$el.offset().top - this.$el.find(".dummyFriendList").offset().top + this.$el.find(".dummyFriendList").scrollTop());
    }
});