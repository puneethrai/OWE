/*globals Backbone, DataLayer*/
var TransactionModel = Backbone.Model.extend({
    initialize: function initialize (argument) {
    },
    TYPE: {
        DEBT : "+",
        CREDIT : "-"
    },
    ERROR: {
        "-1" : "Not valid amount"
    },
    defaults : function defaults () {
        return {
            amount: 0,
            name  : 0,
            type  : this.TYPE.DEBT
        };
    },
    validate: function(attrs, options) {
        if (typeof attrs.amount !== "number" || isNaN(attrs.amount)) {
          return -1;
        }
    },
    save : function save () {
        var self = this;
        DataLayer.addTransaction(this.toJSON()).done(function(transaction){
            self.id = transaction.id || transaction;
        }).fail(function(){
            self.destroy();
        });
    },
    destroy: function () {
        var self = this;
        if(!this.isNew()){
            DataLayer.removeTransaction(this.get("id")).done(function(transaction){
                self.trigger("destroy", self);
            });
        } else {
            self.trigger("destroy", self);
        }
    }
});