$(function () {
    App.init();
});

var App = (function ($) {
    function init() {
        bindNavigation();
    }

    function bindNavigation() {
        $('.nav-caller').on('click', function (e) {
            e.preventDefault();
            $('body').toggleClass('nav-open');
        });

        $('body').on('click', function (e) {
            if (!$(e.target).parents('#header__nav').length) {
                $('body').removeClass('nav-open');
            }
        });
    }

    return {
        init: init
    };
}(jQuery));