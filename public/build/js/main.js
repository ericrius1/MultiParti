window.FW = {};

$(document).ready(function() {
  var Main;
  return FW.main = Main = (function() {
    function Main() {
      FW.myWorld = new FW.World();
      FW.myWorld.animate();
    }

    return Main;

  })();
});
