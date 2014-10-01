var FriendCollection = Backbone.Collection.extend({
    model: function(attrs, options) {
        return new FriendModel(attrs, options);
    },
    create: function(attrs, options) {
    	var friendModel = null,
    	    self = this;
    	if(options && options.wait) {
    		friendModel = new this.model(attrs, options);
    		if(friendModel){
    			friendModel.save().done(function(){
    				self.add(friendModel);
    			})
    		}
    	} else {
    		return Backbone.Collection.prototype.create.call(this,attrs.options);
    	}
    }
});