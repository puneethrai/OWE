/*global Backbone,templates,$,ViewTransaction,app*/
var ViewTransactions = Backbone.View.extend({
    id: "Transaction",
    initialize: function initialize(options) {
        this.options = options;
        this.template = templates.get('transaction', 'Transactions');
        this.collection.on({
            "add": this.onNewTransaction,
            "remove": this.onDeleteTransaction
        }, this);
        this.options.friendCollection.on({
            "add": this.onNewFriends,
            "remove": this.onRemoveFriends
        }, this);
        this.tAmount = 0;
        this.yAmount = 0;
        this.newFriend = "";
        this.waitingForNewFriend = null;
    },
    render: function render() {
        var self = this,
            modelIndex = 0;
        this.$el.html(this.template());
        this.$el.find(".dummyFriends").selectpicker('render');
        $("#" + this.options.parentDiv).append(this.$el);
        for (modelIndex = 0; modelIndex < this.collection.models.length; modelIndex++) {
            this._createTransactionView(this.collection.models[modelIndex]);
        }
        setTimeout(function () {
            for (modelIndex = 0; modelIndex < self.options.friendCollection.models.length; modelIndex++) {
                self.onNewFriends(self.options.friendCollection.models[modelIndex]);
            }
        }, 0);
        return this;
    },
    events: {
        "tap .dummyDebt": "onAddDebt",
        "tap .dummyCredit": "onAddCredit",
        "NoResult": "onNoResult",
        "ResultFound": "onResultFound"
    },

    onNewTransaction: function onNewTransaction(model, collection) {
        /*jslint unparam:true*/
        var transactionView = this._createTransactionView(model);
        if (model.isNew()) {
            model.save();
            app.scrollDown(transactionView.$el.offset().top - this.$el.find(".dummyTransaction").offset().top + this.$el.find(".dummyTransaction").scrollTop());
        }

    },
    onNoResult: function (event, name) {
        /*jslint unparam:true*/
        this.newFriend = name;
    },
    onResultFound: function (event, name) {
        /*jslint unparam:true*/
        this.newFriend = "";
    },
    onAddDebt: function onAddDebt() {
        this._onAddToCollection(this.$el.find(".dummyAmount").val(), "-", this.$el.find(".dummyFriends").val());
    },
    onAddCredit: function onAddCredit() {
        this._onAddToCollection(this.$el.find(".dummyAmount").val(), "+", this.$el.find(".dummyFriends").val());
    },
    _onAddToCollection: function _onAddToCollection(amount, type, userid) {
        var tempModel = null;
        app.scrollStop();
        if (this.newFriend) {
            this.waitingForNewFriend = {
                amount: parseInt(amount, 10),
                type: type
            };
            tempModel = new this.collection.model(this.waitingForNewFriend);
            if (tempModel.isValid()) {
                this.options.friendCollection.create({
                    name: this.newFriend
                }, {
                    wait: true
                });
            } else {
                this.waitingForNewFriend = null;
            }
            this.newFriend = "";
        } else {
            this.collection.add(this.waitingForNewFriend || {
                amount: parseInt(amount, 10),
                type: type,
                userid: parseInt(userid, 10)
            }, {
                validate: true
            });
        }
    },
    onDeleteTransaction: function onDeleteTransaction(model) {
        if (model.get("type") === model.TYPE.DEBT) {
            this.tAmount -= model.get("amount");
            this.$el.find(".dummyTCount").html(this.tAmount);
        } else {
            this.yAmount -= model.get("amount");
            this.$el.find(".dummyYCount").html(this.yAmount);
        }
    },
    onNewFriends: function (model, collection) {
        /*jslint unparam:true*/
        var self = this;
        self.$el.find("select.dummyFriends").append($("<option>").attr("value", model.get("id")).html(model.get("name")));
        if (self.waitingForNewFriend) {
            self.waitingForNewFriend.userid = model.get("id");
            self._onAddToCollection();
            self.waitingForNewFriend = null;
        }
        self.$el.find(".dummyFriends").selectpicker('refresh');

    },
    onRemoveFriends: function (model, collection) {
        /*jslint unparam:true*/
        var self = this;
        self.$el.find(".dummyFriends option[value=" + model.get("id") + "]").remove();
        this.$el.find(".dummyFriends").selectpicker('refresh');
    },
    _createTransactionView: function _createTransactionView(model) {
        var transactionView = new ViewTransaction({
            model: model,
            friendCollection: this.options.friendCollection
        }).render();
        this.$el.find(".dummyTransaction").append(transactionView.el);
        this._updateOWEValue(model);
        return transactionView;
    },
    _updateOWEValue: function (model) {
        if (model.get("type") === model.TYPE.DEBT) {
            this.tAmount += model.get("amount");
            this.$el.find(".dummyTCount").html(this.tAmount);
        } else {
            this.yAmount += model.get("amount");
            this.$el.find(".dummyYCount").html(this.yAmount);

        }
    }
});