(function($) {
    $.fn.stop_kantan_scroll = function() {
        return this.each(function() {
            var obj = $(this);
            obj.find(".moving_box li").stop(true, false);
        });
    }

    $.fn.continue_kantan_scroll = function() {
        return this.each(function() {
            var obj = $(this);
            kantan_loop_me(obj, obj.data("current_width"), obj.data("current_duration"));
        });
    }

    $.fn.kantan_scroll = function(options) {

        var defaults = {
            duration: 3000,
            ideal_width: 160,
            ideal_height: 160,
            hover_stop: 'true'
        };
        var options = $.extend(defaults, options);

        return this.each(function() {
            var obj = $(this);
            obj.css("overflow", "hidden");

            obj.data("current_duration", options.duration);
            obj.data("current_width", options.ideal_width);

            // get a ul out of it
            var list = obj.find("ul");

            // add a class or style or whatever
            list.addClass("moving_box");

            // style the container
            var cssObj = {
                'left': -options.ideal_width,
                'height': options.ideal_height,
                'width': 3000,
                'position': 'relative',
                'display': 'inline-block',
                'overflow': 'hidden',
            }
            list.css(cssObj);

            // style the inner boxes
            var inner_boxes = list.find("li");
            var inner_box_css = {
                'width': options.ideal_width,
                'height': options.ideal_height,
                'display': 'inline-block',
                'overflow': 'hidden',
                'float': 'left',
                'margin': 0,
                'padding': 0,
                'text-align': 'center',
            }
            inner_boxes.css(inner_box_css);

            // start it up
            kantan_loop_me(obj, options.ideal_width, options.duration);

            // make it stop and start
            if (options.hover_stop) {
                obj.hover(

                function() {
                    obj.find(".moving_box li").stop(true, false);
                }, function() {
                    kantan_loop_me(obj, options.ideal_width, options.duration);
                });
            }
        });
    };
})(jQuery);

function kantan_loop_me(obj, ideal_width, duration) {

    var last = obj.data("currently_animating");
    if (obj.find(".growing").length == 0) {
        last = obj.find(".moving_box li").last();
        obj.data("currently_animating", last);
        last.addClass("growing");
        last.css("width", 0);
        last.detach();
        last.prependTo(obj.find(".moving_box"));
    }

    var period = (ideal_width - last.width()) / ideal_width * duration;

    last.animate({
        width: ideal_width
    }, period, 'linear', function() {
        $(this).removeClass("growing");
        kantan_loop_me(obj, ideal_width, duration);
    });
}


$(function() {
    $("#slideshow_box").kantan_scroll({
        duration: 3000,
        ideal_width: 200,
        ideal_height: 190,
        hover_stop: true
    });

    $("#stop").click(function() {
        $("#slideshow_box").stop_kantan_scroll();
    });

    $("#go").click(function() {
        $("#slideshow_box").continue_kantan_scroll();
    });

});