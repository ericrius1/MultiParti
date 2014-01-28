FW.World = class World
  constructor : ->
    FW.clock = new THREE.Clock()
    @SCREEN_WIDTH = window.innerWidth
    @SCREEN_HEIGHT = window.innerHeight
    FW.Width = 100000
    @camFar = FW.width * 2
    @time = Date.now()
    @rippleFactor = 90

    # CAMERA
    FW.camera = new THREE.PerspectiveCamera(50.0, @SCREEN_WIDTH / @SCREEN_HEIGHT, 1, @camFar)

    #SCENE
    FW.scene = new THREE.Scene()

    #RENDERER
    FW.Renderer = new THREE.WebGLRenderer()
    FW.Renderer.setSize @SCREEN_WIDTH, @SCREEN_HEIGHT
    FW.Renderer.setClearColor 0x06071a
    document.body.appendChild FW.Renderer.domElement

    #WATER
    waterNormals = new THREE.ImageUtils.loadTexture '/assets/waternormals.jpg'
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
    @water = new THREE.Water FW.Renderer, FW.camera, FW.scene,
      textureWidth: 512
      textureHeight: 512
      waterNormals: waterNormals
      alpha: 1.0
      distortionScale: 20
    aMeshMirror = new THREE.Mesh(
      new THREE.PlaneGeometry FW.width, FW.width, 50, 50
      @water.material
    )
    aMeshMirror.add @water
    aMeshMirror.rotation.x = -Math.PI * 0.5
    FW.scene.add aMeshMirror

  animate : =>
    requestAnimationFrame @animate
    delta = FW.clock.getDelta()
    time = Date.now()
    @water.material.uniforms.time.value += 1.0 / @rippleFactor
    @render()

  render : ->
    delta = FW.clock.getDelta()
    @water.render()
    FW.Renderer.render(FW.scene, FW.camera)
