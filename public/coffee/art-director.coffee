FW.ArtDirector = class ArtDirector
  constructor: (@artworkData) ->
    #Now we need to take this data and reconstitute it into epicness

    texture = THREE.ImageUtils.loadTexture('/public/assets/smokeparticle.png')
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    @brushGroup = new ShaderParticleGroup
      texture: texture
      maxAge: 5
    @reconstituteArt()
    @brushGroup.mesh.renderDepth = -1
    FW.scene.add @brushGroup.mesh


  reconstituteArt: ()->
    emitterPositions = @artworkData[0]?.artwork
    if emitterPositions?
      for emitterPosition in emitterPositions
        if emitterPosition.x isnt 0 and emitterPosition.y isnt 0 and emitterPosition.z isnt 0
          @generateEmitter(emitterPosition)


  #start simple, with one type of brush
  generateEmitter: (position)->
    colorStart = new THREE.Color()
    colorStart.setRGB Math.random(), Math.random(), Math.random()
    colorEnd = new THREE.Color()
    colorEnd.setRGB Math.random(), Math.random(), Math.random()
    brushEmitter = new ShaderParticleEmitter
      position: new THREE.Vector3(position.x, position.y, position.z)
      size: 20
      sizeEnd: 10
      colorStart: colorStart
      colorEnd: colorEnd
      particlesPerSecond: 1
      opacityStart: 0.2
      opacityMiddle: 1
      opacityEnd: 0
    console.log brushEmitter
    @brushGroup.addEmitter brushEmitter


  update: ->
    @brushGroup.tick()




