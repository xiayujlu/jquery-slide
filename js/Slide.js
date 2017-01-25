(function($) {
    function Slide($element, options) {
        this.$element = $element
        this.options = options
        this.timer = null
        this.current = 0
        this.onOff = false
        this.hover = false
        this.init();

    }
    // 准备好HTML
    Slide.prototype.init = function() {
        this.prepareHTML();
        this.bindEvent();
        if (this.options.auto) {
            this.autoPlay()
        }
    }
    Slide.prototype.prepareHTML = function() {
        var $art = this.$element
        var options = this.options
        var $pics = this.$pics = $art.children().wrapAll('<div class="slides-wrap"></div>')
        var $wrap = this.$wrap = $art.children().css({
            width: ($pics.length + 2) * options.width,
            position: 'relative',
            left: -options.width
        }).wrap('<div class="viewpoint"></div>')
        var $pics_first = $pics.eq(0).clone().appendTo($wrap)
        var $pics_last = $pics.eq($pics.length - 1).clone().prependTo($wrap)
        var $new_pics = this.$new_pics = $wrap.children().css({
            float: 'left',
            width: options.width
        })
        var $viewpoint = $wrap.parent().css({
            overflow: 'hidden',
            width: options.width
        })
        this.$viewpoint = $viewpoint
        var $pre = this.$pre = $('<button><</button>').appendTo($art).css({
            'border-radius': '50%',
            'border': 'none',
            'color': '#fff',
            'background': 'rgba(51,110,136,1)',
            'padding': '2px',
            'width': 20,
            'height': 20
        })
        var $next = this.$next = $('<button>></button>').appendTo($art).css({
            'border-radius': '50%',
            'border': 'none',
            'color': '#fff',
            'background': 'rgba(51,110,136,1)',
            'padding': '2px',
            'width': 20,
            'height': 20
        })

    }
    Slide.prototype.bindEvent = function() {
        var _this = this
        this.$pre.on('click', function() {
            _this.go(_this.current - 1)
        })
        this.$next.on('click', function() {
            _this.go(_this.current + 1)
        })
        this.$viewpoint.on('mouseenter', function() {
            _this.hover = true
            window.clearInterval(_this.timer)
        }).on('mouseleave', function() {
            _this.hover = false
            _this.autoPlay()
        })
    }
    Slide.prototype.go = function(idx) {
        var _this = this
        if (this.timer) {
            clearInterval(this.timer)
        }
        if (!this.onOff) {
            var left = (idx + 1) * (-this.options.width);
            this.onOff = true
            this.$wrap.animate({
                'left': left
            }, this.options.duration, function() {
                _this.current = idx
                if (_this.current == -1) {
                    _this.current = _this.$pics.length - 1
                    _this.$wrap.css({
                        left: (_this.$pics.length) * (-_this.options.width)
                    })
                }
                if (_this.current == _this.$pics.length) {
                    _this.current = 0
                    _this.$wrap.css({
                        left: -_this.options.width
                    })
                }
                if (_this.options.auto && !_this.hover) {
                    _this.autoPlay()
                }
                _this.onOff = false
            })
        }
    }
    Slide.prototype.autoPlay = function() {
        var _this = this
        this.timer = setInterval(function() {
            _this.go(_this.current + 1)
        }, _this.options.auto)
    }

    $.fn.slides = function(options) {
        this.each(function() {
            var element = this
            var sildes = new Slide($(element), options)
        })

    }
})(jQuery)
