FW.World = class World
  constructor : (data)->
    FW.clock = new THREE.Clock()
    @SCREEN_WIDTH = window.innerWidth
    @SCREEN_HEIGHT = window.innerHeight
    FW.width = 100000
    @camFar = FW.width * 2
    @time = Date.now()
    @rippleFactor = 90
    debugger

    # CAMERA
    FW.camera = new THREE.PerspectiveCamera(75.0, @SCREEN_WIDTH / @SCREEN_HEIGHT, 1, @camFar)

    #SCENE
    FW.scene = new THREE.Scene()

    #CONTROL
    @controls = new FW.Controls(FW.camera)
    FW.scene.add FW.controls.getObject()
    FW.controls.fly = true

    #RENDERER
    FW.Renderer = new THREE.WebGLRenderer()
    FW.Renderer.setSize @SCREEN_WIDTH, @SCREEN_HEIGHT
    document.body.appendChild FW.Renderer.domElement

    # LIGHTING
    light1 = new THREE.DirectionalLight( 0xffffff, 1.0 );
    light1.position.set( 1, 1, 1 );
    FW.scene.add( light1 );

    light2 = new THREE.DirectionalLight( 0xffffff, 1.0 );
    light2.position.set( 0, -1, -1);
    FW.scene.add( light2 );

    #SPELLS
    FW.spells = new FW.Spells()

    # WATER
    waterNormals = new THREE.ImageUtils.loadTexture './public/assets/waternormals.jpg'
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

    
    # EVENTS
    window.addEventListener "resize", (=>
      @onWindowResize()
    ), false

  
  onWindowResize : (event) ->
    @SCREEN_WIDTH = window.innerWidth
    @SCREEN_HEIGHT = window.innerHeight
    FW.Renderer.setSize @SCREEN_WIDTH, @SCREEN_HEIGHT
    FW.camera.aspect = @SCREEN_WIDTH / @SCREEN_HEIGHT
    FW.camera.updateProjectionMatrix()


  animate : =>
    requestAnimationFrame @animate
    @water.material.uniforms.time.value += 1.0 / @rippleFactor
    FW.controls.update(Date.now() - @time)
    FW.spells.update()
    @time = Date.now()
    @render()
  render : ->
    @water.render()
    FW.Renderer.render(FW.scene, FW.camera)
