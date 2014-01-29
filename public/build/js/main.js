window.FW = {};

$(document).ready(function() {
  var Main;
  $('.hi').css('color', 'red');
  return FW.main = Main = (function() {
    function Main() {
      FW.myWorld = new FW.World();
      FW.myWorld.animate();
    }

    return Main;

  })();
});
