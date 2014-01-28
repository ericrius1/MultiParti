FW.World = class World
  constructor : ->
    FW.clock = new THREE.Clock()
    @SCREEN_WIDTH = window.innerWidth
    @SCREEN_HEIGHT = window.innerHeight
    FW.Width = 100000
    @camFar = FW.width * 2
    @time = Date.now()

    # CAMERA
    FW.camera = new THREE.PerspectiveCamera(50.0, @SCREEN_WIDTH / @SCREEN_HEIGHT, 1, @camFar)

    #SCENE
    FW.scene = new THREE.Scene()

    #RENDERER
    FW.Renderer = new THREE.WebGLRenderer()
    FW.Renderer.setSize @SCREEN_WIDTH, @SCREEN_HEIGHT
    FW.Renderer.setClearColor 0x06071a
    document.body.appendChild FW.Renderer.domElement

  animate : =>
    requestAnimationFrame @animate
    delta = FW.clock.getDelta()
    time = Date.now()
    @render()

  render : ->
    delta = FW.clock.getDelta()
    FW.Renderer.render(FW.scene, FW.camera)
