var ArtiDirector;

FW.ArtDirector = ArtiDirector = (function() {
  function ArtiDirector(data) {
    var emitterPositions, texture;
    console.log('SHNUUUURP');
    emitterPositions = data[0].artwork;
    console.log("emitter settings!", emitterSettings);
    texture = THREE.ImageUtils.loadTexture('/public/assets/smokeparticle.png');
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    this.brushGroup = new ShaderParticleGroup({
      texture: texture,
      maxAge: 5
    });
    this.reconstituteArt();
    FW.scene.add(this.brushGroup);
  }

  ArtiDirector.prototype.reconstituteArt = function(emitterSettings) {
    var emitterPosition, _i, _len, _results;
    if (emitterSettings == null) {
      emitterSettings = {};
    }
    _results = [];
    for (_i = 0, _len = emitterPositions.length; _i < _len; _i++) {
      emitterPosition = emitterPositions[_i];
      _results.push(generateEmitter(emitterPosition));
    }
    return _results;
  };

  ArtiDirector.prototype.generateEmitter = function(position) {
    var brushEmitter;
    brushEmitter = new ShaderParticleEmitter({
      position: position
    });
    return this.brushGroup.addEmitter(brushEmitter);
  };

  ArtiDirector.prototype.update = function() {
    return this.brushGroup.tick();
  };

  return ArtiDirector;

})();
