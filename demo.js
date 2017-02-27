modules.open('./test/test.xm', true); // false if no autoplay

setInterval(function() {
    $('.js-title').text(modules.title());
    $('.js-subtitle').text(modules.subtitle());
    $('.js-time-current').text(modules.time().current.human);
    $('.js-time-total').text(modules.time().total.human);
    $('.js-position').css('left', modules.time().position)
}, 200);