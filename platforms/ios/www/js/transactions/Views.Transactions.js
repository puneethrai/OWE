var ViewTransactions = Backbone.View.extend({
    initialize: function initialize (options) {
        this.options = options;
        this.template = templates.get('transaction','Transactions');
        this.collection.on({
            "add" : this.onNewTransaction,
            "remove" : this.onDeleteTransaction
        }, this);
        this.tAmount = 0;
        this.yAmount = 0
    },
    render : function render () {
        this.$el.html(this.template()); 
        $("#" + this.options.parentDiv).html(this.$el);
        for(var modelIndex = 0; modelIndex < this.collection.models.length; models++){
            this._createTransactionView(this.collection.models[modelIndex]);
        }
    },
    events: {
        "tap .dummyDebt"                : "onAddDebt",
        "tap .dummyCredit"              : "onAddCredit"
    },

    onNewTransaction: function onNewTransaction (model , collection) {
        this._createTransactionView(model);
        if(isNaN(parseInt(model.get("id")))){
            model.save();
        }

    },
    onAddDebt: function onAddDebt () {
        this._onAddToCollection(this.$el.find(".dummyAmount").val(),"-","");
    },
    onAddCredit: function onAddCredit () {
        this._onAddToCollection(this.$el.find(".dummyAmount").val(),"+","");
    },
    _onAddToCollection : function _onAddToCollection (amount, type, name) {
        
        this.collection.add({
            amount:parseInt(amount , 10),
            type : type,
            name: name
        },{ validate: true });
    },
    onDeleteTransaction: function onDeleteTransaction (model) {
        if(model.get("type") == model.TYPE.DEBT){
            this.tAmount -= model.get("amount");
            this.$el.find(".dummyTCount").html(this.tAmount);
        } else {
            this.yAmount -= model.get("amount");
            this.$el.find(".dummyYCount").html(this.yAmount);
        }
    },
    _createTransactionView: function _createTransactionView (model) {
        this.$el.find(".dummyTransaction").append(new ViewTransaction({
            model: model
        }).render().el);
        if(model.get("type") == model.TYPE.DEBT){
            this.tAmount += model.get("amount");
            this.$el.find(".dummyTCount").html(this.tAmount);
        } else {
            this.yAmount += model.get("amount");
            this.$el.find(".dummyYCount").html(this.yAmount);

        }
    }
});