var FriendRouter = Backbone.Router.extend({
    initialize: function initialize(argument) {
        var self = this;
        self.FriendCollection = new FriendCollection();
        DataLayer.getAllFriends().done(function (friends) {
            self.FriendCollection.add(friends, {
                validate: true
            });
        });
    },
    routes: {
        friends: "onFriend"
    },
    onFriend: function onFriend(argument) {
        if (window.TR && TR.TV) {
            TR.TV.$el.addClass("hide");
        }
        if (!this.FV) {
            this.FV = new ViewFriends({
                parentDiv: "Dynamic",
                collection: this.FriendCollection
            }).render();
        } else {
            this.FV.$el.removeClass("hide");
        }
    }
});