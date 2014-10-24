/*globals Backbone, DataLayer*/
var TransactionModel = Backbone.Model.extend({
    initialize: function initialize(argument) {
        /*jslint unparam:true*/
        return this;
    },
    TYPE: {
        DEBT: "+",
        CREDIT: "-"
    },
    ERROR: {
        "-1": "Not valid amount"
    },
    defaults: function defaults() {
        return {
            amount: 0,
            userid: 0,
            type: this.TYPE.DEBT
        };
    },
    validate: function (attrs, options) {
        /*jslint unparam:true*/
        if (typeof attrs.amount !== "number" || isNaN(attrs.amount)) {
            return -1;
        }
    },
    save: function save() {
        var self = this,
            defer = $.Deferred();
        DataLayer.addTransaction(this.toJSON()).done(function (transaction) {
            self.set("id", transaction.id || transaction);
        }).fail(function () {
            self.destroy();
        });
        return defer.promise();
    },
    destroy: function () {
        var self = this;
        if (!this.isNew()) {
            DataLayer.removeTransaction(this.get("id")).done(function (transaction) {
                /*jslint unparam:true*/
                self.trigger("destroy", self);
            });
        } else {
            self.trigger("destroy", self);
        }
    }
});