var World,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

FW.World = World = (function() {
  function World() {
    this.animate = __bind(this.animate, this);
    FW.clock = new THREE.Clock();
    this.SCREEN_WIDTH = window.innerWidth;
    this.SCREEN_HEIGHT = window.innerHeight;
    FW.Width = 100000;
    this.camFar = FW.width * 2;
    this.time = Date.now();
    FW.camera = new THREE.PerspectiveCamera(50.0, this.SCREEN_WIDTH / this.SCREEN_HEIGHT, 1, this.camFar);
    FW.scene = new THREE.Scene();
    FW.Renderer = new THREE.WebGLRenderer();
    FW.Renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
    FW.Renderer.setClearColor(0x06071a);
    document.body.appendChild(FW.Renderer.domElement);
  }

  World.prototype.animate = function() {
    var delta, time;
    requestAnimationFrame(this.animate);
    delta = FW.clock.getDelta();
    time = Date.now();
    return this.render();
  };

  World.prototype.render = function() {
    var delta;
    delta = FW.clock.getDelta();
    return FW.Renderer.render(FW.scene, FW.camera);
  };

  return World;

})();
