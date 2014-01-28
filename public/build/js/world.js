var World,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

FW.World = World = (function() {
  function World() {
    this.animate = __bind(this.animate, this);
    var aMeshMirror, waterNormals;
    FW.clock = new THREE.Clock();
    this.SCREEN_WIDTH = window.innerWidth;
    this.SCREEN_HEIGHT = window.innerHeight;
    FW.Width = 100000;
    this.camFar = FW.width * 2;
    this.time = Date.now();
    this.rippleFactor = 90;
    FW.camera = new THREE.PerspectiveCamera(50.0, this.SCREEN_WIDTH / this.SCREEN_HEIGHT, 1, this.camFar);
    FW.scene = new THREE.Scene();
    FW.Renderer = new THREE.WebGLRenderer();
    FW.Renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
    FW.Renderer.setClearColor(0x06071a);
    document.body.appendChild(FW.Renderer.domElement);
    waterNormals = new THREE.ImageUtils.loadTexture('/assets/waternormals.jpg');
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
    this.water = new THREE.Water(FW.Renderer, FW.camera, FW.scene, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: waterNormals,
      alpha: 1.0,
      distortionScale: 20
    });
    aMeshMirror = new THREE.Mesh(new THREE.PlaneGeometry(FW.width, FW.width, 50, 50), this.water.material);
    aMeshMirror.add(this.water);
    aMeshMirror.rotation.x = -Math.PI * 0.5;
    FW.scene.add(aMeshMirror);
  }

  World.prototype.animate = function() {
    var delta, time;
    requestAnimationFrame(this.animate);
    delta = FW.clock.getDelta();
    time = Date.now();
    this.water.material.uniforms.time.value += 1.0 / this.rippleFactor;
    return this.render();
  };

  World.prototype.render = function() {
    var delta;
    delta = FW.clock.getDelta();
    this.water.render();
    return FW.Renderer.render(FW.scene, FW.camera);
  };

  return World;

})();
