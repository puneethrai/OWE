var ViewTransaction = Backbone.View.extend({
    initialize: function initilization (options) {
        this.options = options;
        this.template = templates.get('transaction','Transaction');
        this.model.on("destroy", this.onDestroy, this);
    },
    render : function render () {
        this.$el.html(this.template(this.model.toJSON())); 
        return this;
    },
    events: {
        "tap .dummyDelete"                : "onRemoveTransaction",
    },
    onRemoveTransaction : function onRemoveTransaction () {
        this.model.destroy();
        return false;
    },
    onDestroy: function onDestroy (model) {
        this.model.off(null,null,this);
        this.remove();
    }

});