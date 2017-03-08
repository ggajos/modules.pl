<head>
 <title>:: modules.pl :: Module Player</title>
 <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
 <meta http-equiv="cache-control" content="no-cache, must-revalidate">
 <meta http-equic="pragma" content="no-cache">
 <link rel="shortcut icon" href="gfx/favicon.ico">
 <link href="player.css" type="text/css" rel="stylesheet">

 <script type="text/javascript" src="lib/flod-compiled.js"></script>
 <script type="text/javascript" src="lib/flectrum-compiled.js"></script>
 <script type="text/javascript" src="lib/jquery-3.1.1.min.js"></script>
 <script type="text/javascript" src="lib/modules.js"></script>
 <script>
   setInterval(function() {
      $('.js-subtitle').text(modules.subtitle());
      $('.js-time-current').text(modules.time().current.human);
      $('.js-time-total').text(modules.time().total.human);
      $('.js-position').css('width', modules.time().position);
   }, 200);
 </script>
</head>

<body>
 <div id="playerwrap">
  <div id="player">

   <table id="playertable" cellspacing="0" cellpadding="0" border=0>
    <tr>
     <td width="45"><img class="js-play" src="./gfx/play.png" title="Play"><img class="js-pause" src="./gfx/pause.png" title="Pause" style="display: none;"></td>
     <td width="45"><img class="js-stop" src="./gfx/stop.png" title="Stop"></td>
     <td style="padding-left: 8px;"><div><strong class="js-title"></strong></div><div class="js-subtitle"></div></td>
     <td width="25" align="center">
      <img class="js-loop-off" src="./gfx/repeat-on.png" title="Repeat On/Off">
      <img class="js-loop-on" src="./gfx/repeat-off.png" title="Repeat On/Off" style="display: none;">
     </td>
    </tr>
    <tr>
     <td colspan="4" align="right"><span class="js-time-current">00:00</span> <span class="js-time-slash">/</span> <span class="js-time-total">00:00</span></td>
    </tr>
    <tr>
     <td colspan="4">
 
      <div class="js-progressbar">
       <div class="js-position">&nbsp;</div>
      </div>

     </td>
    </tr>
   </table>

  </div>
 </div>

 <div id="footwrap">
  <div id="city"></div>
  <div id="footer">
   <div id="flectrum">
   </div>
   <br>
   <span class="footer">modules.pl module player<br>by Grzegorz "Mouster" Gajos & Jakub "AceMan" Szeląg<br>based on <a class="footer" href="http://neoartcr.com">FLOD</a> by Christian Corti</span>
  </div>
 </div>
</body>
