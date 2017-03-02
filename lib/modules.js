function modPlay(file, title, format) {
  popek.withPlayer(function(it) {
      window.playerWindow.modules.open(file, title, true);
  })
}

popek = (function() {
    var windowname = "modules.pl";
    var waitDelay = 100;
    var windowOptions = 'directories=0,location=0,menubar=0,resizable=0,scrollbars=0,titlebar=0,toolbar=0,width=600,height=600';
    var windowHtml = "player.php";

    function withPlayer(callback) {
        if(!window.playerWindow) {
            window.playerWindow = getPlayerWindow()
        }
        if(!window.playerWindow.ModPL) {
            window.playerWindow = createPlayerWindow()
        }
        waitForPlayer(function() {
            callback(window.playerWindow.ModPL)
        })
    }

    function getPlayerWindow() {
        return window.open("", windowname, windowOptions, true)
    }

    function createPlayerWindow() {
        return window.open(windowHtml, windowname, windowOptions, true)
    }

    function waitForPlayer(callback) {
        setTimeout(function() {
            if(window.playerWindow.modules && window.playerWindow.modules.open) {
                callback(window.playerWindow.modules)
            } else {
                waitForPlayer(callback)
            }
        }, waitDelay)
    }

    return {
        withPlayer: withPlayer
    }
})();

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

    function open(url, title, autoplay) {
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
                    $('.js-title').text(title);
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

    function loopOn() {
      player.loop = !player.loop;
      $('.js-loop-on').hide();
      $('.js-loop-off').show();
    }

    function loopOff() {
      player.loop = !player.loop;
      $('.js-loop-on').show();
      $('.js-loop-off').hide();
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
        loopOn: loopOn,
        loopOff: loopOff,
        init: init,
        time: time
    }
}());
window.modules = modules;

$(function() {
    modules.init();
    $('.js-play').click(modules.play);
    $('.js-stop').click(modules.stop);
    $('.js-pause').click(modules.pause);
    $('.js-loop-off').click(modules.loopOff);
    $('.js-loop-on').click(modules.loopOn);
});