var templates = {
    templateHTMLs : {},
    compiledTemplates : {},

    load : function(settings,callback) {
        var that = this;
        if(typeof(callback) !== "function"){
            throw new Error("Callback not Defined");
        }
        that.compiledTemplates[settings.moduleName] = {};
        that.templateHTMLs[settings.moduleName] = {};
        var loadTemplate = function(index) {
            var name = settings.names[index],
                url = settings.modulePath+ '/' +settings.templatePath + '/' + name + '.html';
            $.get(url, function(data) {
                that.templateHTMLs[settings.moduleName][name] = data;
                index++;
                if (index < settings.names.length) {
                    loadTemplate(index);
                } else {
                    callback();
                }
            });
        };
        if (settings.names.length > 0) {
            loadTemplate(0);
        } else {
            callback();
        }
        
    },

    get : function(moduleName, name) {
        var self = this;
        var moduleCompiledTemplates = self.compiledTemplates[moduleName];
        if (!moduleCompiledTemplates[name]) {
            moduleCompiledTemplates[name] = _.template(self.templateHTMLs[moduleName][name]);
            delete self.templateHTMLs[moduleName][name];
        }
        return moduleCompiledTemplates[name];
    }
};
