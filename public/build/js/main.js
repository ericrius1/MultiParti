window.FW = {};

$(document).ready(function() {
  $.get("/artworks", function(data) {
    FW.myWorld = new FW.World(data);
    return FW.myWorld.animate();
  });
  return $('.save').on('click', function() {
    var req;
    return req = $.ajax({
      url: '/artworks',
      method: 'post',
      contentType: 'json',
      data: JSON.stringify({
        emitters: [
          {
            'x': 20,
            'y': 20,
            'z': 'z',
            20: 20
          }
        ]
      })
    });
  });
});
