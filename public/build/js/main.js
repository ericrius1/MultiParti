var Main;

window.FW = {};

FW.main = Main = (function() {
  function Main() {
    FW.myWorld = new FW.World();
    FW.myWorld.animate();
  }

  return Main;

})();
