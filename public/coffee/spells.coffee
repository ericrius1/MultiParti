FW.Spells = class Spells
  constructor: ->
    @spells = []
    @activeSpellIndex = 0
    #LIGHT WAND
    @spells.push new FW.Wand()

    FW.spellsToUndo = []
    FW.spellsToRedo = []

    $('body').on 'mousedown', (event)=>
      @spells[@activeSpellIndex].castSpell()
    $('body').on 'mouseup', =>
      @spells[@activeSpellIndex].endSpell()
    $('body').on 'keydown', @handleHistory
  


  handleHistory: (event)->

    if event.keyCode is 90 #z - undo
      if FW.spellsToUndo.length > 0
        spellEmitter = FW.spellsToUndo.pop()
        spellEmitter.disable()
        FW.spellsToRedo.push spellEmitter
    if event.keyCode is 88 #x - redo
      if FW.spellsToRedo.length > 0
        spellEmitter = FW.spellsToRedo.pop()
        spellEmitter.enable()
        FW.spellsToUndo.push spellEmitter


  update:->
    # @spells[@activeSpellIndex].update()
    for spell in @spells
      spell.update()


  nextSpell: ->
    #make sure we end spell if user had been holding mouse down when he switched to a new one
    @spells[@activeSpellIndex].endSpell()


    @activeSpellIndex++
    if @activeSpellIndex is @spells.length
      @activeSpellIndex = 0

    elements = document.getElementsByClassName('spell')
    for element in elements
      if element.id is @spells[@activeSpellIndex].name
        element.className = 'spell show-class'
      else
        element.className = 'spell hide-class'




