var ViewTransactions = Backbone.View.extend({
    initialize: function initialize (options) {
        this.options = options;
        this.template = templates.get('transaction','Transactions');
        this.collection.on({
            "add" : this.onNewTransaction,
            "remove" : this.onDeleteTransaction
        }, this);
        this.options.friendCollection.on({
            "add" : this.onNewFriends,
            "remove" : this.onRemoveFriends
        },this)
        this.tAmount = 0;
        this.yAmount = 0
    },
    render : function render () {
        var self = this;
        this.$el.html(this.template()); 
        $("#" + this.options.parentDiv).append(this.$el);
        for(var modelIndex = 0; modelIndex < this.collection.models.length; modelIndex++){
            this._createTransactionView(this.collection.models[modelIndex]);
        }
        setTimeout(function(){
            for(var modelIndex = 0; modelIndex < self.options.friendCollection.models.length; modelIndex++){
                self.onNewFriends(self.options.friendCollection.models[modelIndex]);
            }
        }, 0);
        return this;
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
        this._onAddToCollection(this.$el.find(".dummyAmount").val(),"-",this.$el.find(".dummyFriends").val());
    },
    onAddCredit: function onAddCredit () {
        this._onAddToCollection(this.$el.find(".dummyAmount").val(),"+",this.$el.find(".dummyFriends").val());
    },
    _onAddToCollection : function _onAddToCollection (amount, type, userid) {
        
        this.collection.add({
            amount:parseInt(amount , 10),
            type : type,
            userid: userid
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
    onNewFriends: function(model, collection) {
        var self = this;
        self.$el.find(".dummyFriends").append($("<option>").attr("value",model.get("id")).html(model.get("name")));
    },
    onRemoveFriends: function(model, collection) {
        var self = this;
        self.$el.find(".dummyFriends option[value="+ model.get("id") + "]").remove();
    },
    _createTransactionView: function _createTransactionView (model) {
        var transactionView = new ViewTransaction({
            model: model
        }).render();
        this.$el.find(".dummyTransaction").append(transactionView.el);
        if(model.get("type") == model.TYPE.DEBT){
            this.tAmount += model.get("amount");
            this.$el.find(".dummyTCount").html(this.tAmount);
        } else {
            this.yAmount += model.get("amount");
            this.$el.find(".dummyYCount").html(this.yAmount);

        }
        app.scrollDown(transactionView.$el.offset().top - this.$el.find(".dummyTransaction").offset().top + this.$el.find(".dummyTransaction").scrollTop());
    }
});