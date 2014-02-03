window.FW = {};

$(document).ready(function() {
  $.get("/artworks", function(data) {
    FW.myWorld = new FW.World(data);
    return FW.myWorld.animate();
  });
  return $('.save').on('click', function() {
    var emitterPositions, emitters, req;
    emitters = FW.spells.spells[0].spellEmitters;
    emitterPositions = _.pluck(emitters, 'position');
    return req = $.ajax({
      url: '/artworks',
      method: 'post',
      contentType: 'json',
      data: JSON.stringify(emitterPositions)
    });
  });
});
