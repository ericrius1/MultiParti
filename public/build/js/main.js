window.FW = {};

$(document).ready(function() {
  return $.get("/world", function(data) {
    FW.myWorld = new FW.World(data);
    return FW.myWorld.animate();
  });
});
