var ArtDirector;

FW.ArtDirector = ArtDirector = (function() {
  function ArtDirector(artworkData) {
    var texture;
    this.artworkData = artworkData;
    texture = THREE.ImageUtils.loadTexture('/public/assets/smokeparticle.png');
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    this.brushGroup = new ShaderParticleGroup({
      texture: texture,
      maxAge: 5
    });
    this.reconstituteArt();
    this.brushGroup.mesh.renderDepth = -1;
    FW.scene.add(this.brushGroup.mesh);
  }

  ArtDirector.prototype.reconstituteArt = function() {
    var emitterPosition, emitterPositions, _i, _len, _ref, _results;
    emitterPositions = (_ref = this.artworkData[0]) != null ? _ref.artwork : void 0;
    if (emitterPositions != null) {
      _results = [];
      for (_i = 0, _len = emitterPositions.length; _i < _len; _i++) {
        emitterPosition = emitterPositions[_i];
        if (emitterPosition.x !== 0 && emitterPosition.y !== 0 && emitterPosition.z !== 0) {
          _results.push(this.generateEmitter(emitterPosition));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  };

  ArtDirector.prototype.generateEmitter = function(position) {
    var brushEmitter, colorEnd, colorStart;
    colorStart = new THREE.Color();
    colorStart.setRGB(Math.random(), Math.random(), Math.random());
    colorEnd = new THREE.Color();
    colorEnd.setRGB(Math.random(), Math.random(), Math.random());
    brushEmitter = new ShaderParticleEmitter({
      position: new THREE.Vector3(position.x, position.y, position.z),
      size: 20,
      sizeEnd: 10,
      colorStart: colorStart,
      colorEnd: colorEnd,
      particlesPerSecond: 1,
      opacityStart: 0.2,
      opacityMiddle: 1,
      opacityEnd: 0
    });
    console.log(brushEmitter);
    return this.brushGroup.addEmitter(brushEmitter);
  };

  ArtDirector.prototype.update = function() {
    return this.brushGroup.tick();
  };

  return ArtDirector;

})();
