var TransactionCollection = Backbone.Collection.extend({
    model: function (attrs, options) {
        return new TransactionModel(attrs, options);
    }
});