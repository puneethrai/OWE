var ViewTransaction = Backbone.View.extend({
    initialize: function initilization (options) {
        this.options = options;
        this.template = templates.get('transaction','Transaction');
        this.model.on("destroy", this.onDestroy, this);
    },
    render : function render () {
        var self = this;
        this.$el.html(this.template(this.model.toJSON()));
        setTimeout(function () {
            var friendModel = window.FR.FriendCollection.findWhere({
                id:parseInt(self.model.get("userid"))
            });
            if(friendModel){
                self.$el.find(".dummyFriendName").html(friendModel.get("name"))
            } else {
                DataLayer.getFriendByID(parseInt(self.model.get("userid"))).done(function(friend) {
                    //interested only in success case
                    self.$el.find(".dummyFriendName").html(friend.name);
                });
            }
        },0);
        return this;
    },
    events: {
        "tap .dummyDelete"                : "onRemoveTransaction",
    },
    onRemoveTransaction : function onRemoveTransaction () {
        this.model.destroy();
        return false;
    },
    onDestroy: function onDestroy (model) {
        this.model.off(null,null,this);
        this.remove();
    }

});