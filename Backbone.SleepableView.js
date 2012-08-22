Backbone.SleepableView = Backbone.View.extend({
    touch: false,
    initialize: function(options) {
        var options = options || {},
            render = this.render;
        this.children = options.children || {};
        this.awake = _.has(options, 'awake') ? options.awake : true;
        this.render = _.bind(function() {
            if (this.awake) {
                render.apply(this);
            } else {
                this.touch = true;
            }
            return this;
        }, this);
    },
    sleep: function() {
        this.awake = false;
        _.each(this.children, function(child) {
            if (_.isFunction(child.sleep)) {
                child.sleep();
            }
        });
        return this;
    },
    wake: function() {
        this.awake = true;
        if (this.touch) {
            this.touch = false;
            this.render();
        }
        _.each(this.children, function(child) {
            if (_.isFunction(child)) {
                child.wake();
            }
        });
    }
});
