window.FW = {}
$(document).ready ->
  $('.hi').css('color', 'red')  
  FW.main = class Main
    constructor: ->
    	FW.myWorld = new FW.World()
    	FW.myWorld.animate()
