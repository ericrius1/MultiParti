window.FW = {}
$(document).ready ->


  FW.main = class Main
    constructor: ->
    	FW.myWorld = new FW.World()
    	FW.myWorld.animate()
