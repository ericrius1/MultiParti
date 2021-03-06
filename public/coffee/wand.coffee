FW.Wand = class Wand
  constructor: ->
    @name = 'wand'
    @numEmitters = 1000
    @emitterActivateFraction = 1/ (@numEmitters)
    @spellEmitters = []
    @height = 220
    @distanceFromPlayer = 50
    @castingTimeoutInterval = 50
    @startingPos = new THREE.Vector3 0, 0, 0
    @fakeObject = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshBasicMaterial())


    texture = THREE.ImageUtils.loadTexture('/public/assets/smokeparticle.png')
    texture.minFilter = THREE.LinearMipMapLinearFilter;

    @spellGroup = new ShaderParticleGroup
      texture: texture
      maxAge: 5
      # blending: THREE.NormalBlending

    @initializeSpells()
    FW.scene.add(@spellGroup.mesh)
    @spellGroup.mesh.renderDepth = -1
  initializeSpells: ->
    for i in [0...@numEmitters]
      colorStart = new THREE.Color()
      colorStart.setRGB Math.random(), Math.random(), Math.random()
      colorEnd = new THREE.Color()
      colorEnd.setRGB Math.random(), Math.random(), Math.random()
      spellEmitter = new ShaderParticleEmitter
        size: 20
        sizeEnd: 10
        colorStart: colorStart
        colorEnd: colorEnd
        particlesPerSecond: 1
        opacityStart: 0.2
        opacityMiddle: 1
        opacityEnd: 0

      @spellGroup.addEmitter spellEmitter
      @spellEmitters.push spellEmitter
      spellEmitter.disable()

#velocity at start over accel at start is time of flight

  castSpell: ->
    @fakeObject.position.copy FW.controls.getPosition()
    direction = FW.controls.getDirection()
    @fakeObject.translateZ(direction.z * @distanceFromPlayer)
    @fakeObject.translateY(direction.y * @distanceFromPlayer)
    @fakeObject.translateX(direction.x * @distanceFromPlayer)
    for spellEmitter in @spellEmitters
      if Math.random() < @emitterActivateFraction
        spellEmitter.position.copy(@fakeObject.position)
        spellEmitter.position.y = Math.max 5, spellEmitter.position.y
        spellEmitter.enable()
        FW.spellsToUndo.push spellEmitter
    @castingTimeout = setTimeout(=>
      @castSpell()
    @castingTimeoutInterval)

  endSpell: ->
    window.clearTimeout @castingTimeout

  update: ->
    @spellGroup.tick()

