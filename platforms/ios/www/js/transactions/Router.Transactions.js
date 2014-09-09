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
        new ViewTransactions({
            parentDiv: "Dynamic",
            collection: this.TransactionCollection
        }).render();
    }
});
