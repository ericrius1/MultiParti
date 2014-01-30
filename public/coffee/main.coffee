window.FW = {}
$(document).ready ->
  $.get("/world", (data)->
    FW.myWorld = new FW.World(data)
    FW.myWorld.animate()
  
  )


