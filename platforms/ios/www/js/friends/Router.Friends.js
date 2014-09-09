var FriendRouter = Backbone.Router.extend({
	routes: {
		friend: "onFriend"
	},
	onFriend : function onTransaction (argument) {
		alert("Render transaction")
	}
});