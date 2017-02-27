modules = (function() {
    var loader;
    var player;
    var loaded = false;

    function init() {
        loader = window.neoart.FileLoader();
        player = loader.player;
        player.skipDuration = false;
        $('.js-pause').hide();
    }

    function open(url, autoplay) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onload = function() {
            if (this.status == 200) {
                var blob = new Blob([this.response]);
                var reader = new FileReader();
                reader.onload = function(e) {
                    loader.load(e.target.result);
                    loaded = true;
                    if(autoplay) {
                        modules.play();
                    }
                };
                reader.readAsArrayBuffer(blob);
            }
        };
        xhr.send();
    }

    function play() {
        if(loaded) {
            player.play();
            $('.js-pause').show();
            $('.js-play').hide();
        }
    }

    function stop() {
        player.stop();
        $('.js-pause').hide();
        $('.js-play').show();
    }

    function pause() {
        player.pause();
        $('.js-play').show();
        $('.js-pause').hide();
    }

    function title() {
        return player.title;
    }

    function subtitle() {
        return player.format();
    }

    function time() {
        function convert(time) {
            var sec = Math.round(time / 1000);
            var min = Math.floor(sec / 60);
            sec -= (min * 60);
            var m = min.toString();
            var s = sec.toString();
            if (min < 10) { m = "0"+ m; }
            if (sec < 10) { s = "0"+ s; }
            return {
                raw: time,
                human: m +":"+ s
            };
        }
        return {
            position: ((player.position / player.duration) * 100) + '%',
            current: convert(player.position),
            total: convert(player.duration)
        }
    }

    return {
        title: title,
        subtitle: subtitle,
        open: open,
        play: play,
        stop: stop,
        pause: pause,
        init: init,
        time: time
    }
}());

$(function() {
    modules.init();
    $('.js-play').click(modules.play);
    $('.js-stop').click(modules.stop);
    $('.js-pause').click(modules.pause);
});