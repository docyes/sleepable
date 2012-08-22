Backbone.SleepableView
=========

A simplistic Backbone View extension enabling the toggling of render as an op (awake) or no-op (sleeping) routine.
<pre>
           __..--''``\--....___   _..,_
       _.-'    .-/";  `        ``&lt;._  ``-+'~=.
   _.-' _..--.'_    \                    `(^) )
  ((..-'    (&lt; _     ;_..__               ; `'   fL
             `-._,_)'      ``--...____..-'
</pre>

Sleepable View
--------------

``` js
var View = Backbone.SleepableView.extend({
    initialize: function() {
        Backbone.SleepableView.prototype.initialize.apply(this, arguments);
        this.model.on('change:n', this.render, this);
    },
    fib: function(n){
        if (n<=1) {
            return n;
        } else {
            return fib(n-1) + fib(n-2);
        }
    },
    render: function() {
        this.$el.html(this.fib(this.model.get('n')));
    }

});

var model = new Backbone.Model,
    view = new View({model: model});
view.sleep();
for (var i=0; i<100000; i++) {
    model.set('n', i); //phew, no ember heat!
}
model.set('n', 10);
view.wake();
console.log(view.$el.html());
```
