$.fn.slides = function(options) {
    var $arts = this
    $arts.each(function() {
        var $art = $(this)
        var $pics = $art.children().wrapAll('<div class="slides-wrap"></div>')
        var $wrap = $art.children().css({
            width: ($pics.length + 2) * options.width,
            position: 'relative',
            left: -options.width
        }).wrap('<div class="viewpoint"></div>')
        var $pics_first = $pics.eq(0).clone().appendTo($wrap)
        var $pics_last = $pics.eq($pics.length - 1).clone().prependTo($wrap)
        var $new_pics = $wrap.children().css({
            float: 'left',
            width: options.width
        })
        var $viewpoint = $wrap.parent().css({
            overflow: 'hidden',
            width: options.width
        })
        var $pre = $('<button><</button>').appendTo($art).css({
            'border-radius': '50%',
            'border': 'none',
            'color': '#fff',
            'background': 'rgba(51,110,136,1)',
            'padding': '2px',
            width: 20,
            height: 20
        })
        var $next = $('<button>></button>').appendTo($art).css({
            'border-radius': '50%',
            'border': 'none',
            'color': '#fff',
            'background': 'rgba(51,110,136,1)',
            'padding': '2px',
            width: 20,
            height: 20
        })
        var timer
        var current = 0
        var onOff = false
        var hover=false
        $next.on('click', function() {
            go(current + 1)
        })
        $pre.on('click', function() {
            go(current - 1)
        })

        function go(idx) {
            if (options.auto) {
                window.clearInterval(timer)
            }
            if (!onOff) {
                var left = (idx + 1) * (-options.width);
                onOff = true
                $wrap.animate({
                    left: left
                }, options.duration, function() {
                    current = idx
                    if (current == -1) {
                        current = $pics.length - 1
                        $wrap.css({
                            left: ($pics.length) * (-options.width)
                        })
                    }
                    if (current == $pics.length) {
                        current = 0
                        $wrap.css({
                            left: -options.width
                        })
                    }
                    if (options.auto&&!hover) {
                        autoPlay()
                    }
                    onOff = false
                })
            }
        }

        function autoPlay() {
            timer = setInterval(function() {
                go(current + 1)
            }, options.auto)
        }
        if (options.auto) {
            autoPlay()
        }
        $viewpoint.on('mouseenter', function() {
          hover=true;

            window.clearInterval(timer)

        }).on('mouseleave', function() {
            hover=false
            if(options.auto)
            autoPlay()
        })
    })

}
$('div').slides({
    width: 400,
    height: 300,
    auto: 4000,
    duration: 800
})
