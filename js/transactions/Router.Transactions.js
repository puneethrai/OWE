var TransactionRouter = Backbone.Router.extend({
    initialize : function initialize (argument) {
        var self = this;
        self.TransactionCollection = new TransactionCollection();
        DataLayer.getAllTransaction().done(function(transactions){
            self.TransactionCollection.add(transactions,{ validate: true });
        });
    },
    routes: {
        transaction: "onTransaction"
    },
    onTransaction : function onTransaction (argument) {
        if(window.FR && FR.FV){
            FR.FV.$el.addClass("hide");
        }
        if(!this.TV) {
            this.TV = new ViewTransactions({
                parentDiv: "Dynamic",
                collection: this.TransactionCollection,
                friendCollection: window.FR.FriendCollection
            }).render();
        } else {
            this.TV.$el.removeClass("hide");
        }
    }
});
