FW.ArtDirector = class ArtiDirector
  constructor: (data) ->
    console.log 'SHNUUUURP'
    #Now we need to take this data and reconstitute it into epicness
    emitterPositions = data[0].artwork
    console.log "emitter settings!", emitterSettings 

    texture = THREE.ImageUtils.loadTexture('/public/assets/smokeparticle.png')
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    @brushGroup = new ShaderParticleGroup
      texture: texture
      maxAge: 5

    @reconstituteArt()
    FW.scene.add @brushGroup


  reconstituteArt: (emitterSettings = {})->
    for emitterPosition in emitterPositions
      generateEmitter(emitterPosition)


  #start simple, with one type of brush
  generateEmitter: (position)->
    brushEmitter = new ShaderParticleEmitter
      position: position

    @brushGroup.addEmitter brushEmitter


  update: ->
    @brushGroup.tick()




