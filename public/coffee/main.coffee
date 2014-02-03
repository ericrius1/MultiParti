window.FW = {}
$(document).ready ->
  $.get("/artworks", (data)->
    FW.myWorld = new FW.World(data)
    FW.myWorld.animate()
  )

  $('.save').on 'click', ->
    emitters = FW.spells.spells[0].spellEmitters
    emitterPositions = _.pluck(emitters, 'position')
    req = $.ajax
      url: '/artworks'
      method: 'post'
      contentType: 'json'
      data: JSON.stringify emitterPositions



