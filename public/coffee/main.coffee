window.FW = {}
$(document).ready ->
  $.get("/artworks", (data)->
    FW.myWorld = new FW.World(data)
    FW.myWorld.animate()
  )

  $('.save').on 'click', ->
    req = $.ajax
      url: '/artworks'
      method: 'post'
      contentType: 'json'
      data: JSON.stringify
        emitters: [{'x': 20, 'y': 20, 'z', 20}]



