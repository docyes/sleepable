Backbone.SleepableView = Backbone.View.extend({
    awake: true,
    touch: false,
    initialize: function() {
        var render = this.render;
        this.children = {};
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
