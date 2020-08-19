(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.eightysPoster = function() {
	this.initialize(img.eightysPoster);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,768,1024);


(lib.tiny_sub = function() {
	this.initialize(img.tiny_sub);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1930,1063);


(lib.patch_color = function() {
	this.initialize(img.patch_color);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2048,2048);


(lib.patch_BW = function() {
	this.initialize(img.patch_BW);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2048,2048);


(lib.TV = function() {
	this.initialize(img.TV);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1302,1380);


(lib.patch_em = function() {
	this.initialize(img.patch_em);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2048,2048);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.yellow_stretch = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFB24B").s().p("EgMVBUYIgKAAIAAg8IAA7+IAA7+IAA79IAA7+IAA7+IAA7+IAKAAIY1AAIAAb+IAAb+IAAb+IAAb9IAAb+IAAb+IAAA8I41AAg");
	this.shape.setTransform(80,540);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.yellow_stretch, new cjs.Rectangle(0,0,160,1080), null);


(lib.teal_stretch = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#84B8AB").s().p("EgMVBUYIgKAAIAAg8IAA7+IAA7+IAA79IAA7+IAA7+IAA7+IAKAAIY1AAIAAb+IAAb+IAAb+IAAb9IAAb+IAAb+IAAA8I41AAg");
	this.shape.setTransform(80,540);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.teal_stretch, new cjs.Rectangle(0,0,160,1080), null);


(lib.sub = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.tiny_sub();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sub, new cjs.Rectangle(0,0,1930,1063), null);


(lib.red_stretch = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#B93564").s().p("EgMVBUYIgKAAIAAg8IAA7+IAA7+IAA79IAA7+IAA7+IAA7+IAKAAIY1AAIAAb+IAAb+IAAb+IAAb9IAAb+IAAb+IAAA8I41AAg");
	this.shape.setTransform(80,540);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.red_stretch, new cjs.Rectangle(0,0,160,1080), null);


(lib.poster = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.eightysPoster();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.poster, new cjs.Rectangle(0,0,768,1024), null);


(lib.patch = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.patch_em();
	this.instance.setTransform(648,0,0.291,0.291);

	this.instance_1 = new lib.patch_color();
	this.instance_1.setTransform(323,0,0.291,0.291);

	this.instance_2 = new lib.patch_BW();
	this.instance_2.setTransform(0,0,0.291,0.291);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.patch, new cjs.Rectangle(0,0,1244,596), null);


(lib.orange_stretch = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF6A5B").s().p("EAMWBUYI41AAIAAg8IAA7+IAA7+IAA79IAA7+IAA7+IAA7+IY1AAIAKAAIAAb+IAAb+IAAb+IAAb9IAAb+IAAb+IAAA8IgKAAg");
	this.shape.setTransform(80,540);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.orange_stretch, new cjs.Rectangle(0,0,160,1080), null);


(lib.mail1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCD4FF").s().p("AgYBFQgNgEgJgJQgIgJgFgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJANgGQAMgFAPAAQAQAAAMAFQALAFAIAJQAHAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQABAJACAHQACAGADAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAFgBIADAAIABACIABAEIAAAGIAAAGIAAADIgBADIgCACIgFADIgLAEIgPACQgIACgKAAQgQAAgOgFgAgKgsQgFADgDAEQgDAFgCAGQgCAGgBAHIA3AAQAAgQgGgJQgIgJgNAAQgGAAgGADg");
	this.shape.setTransform(219.95,30.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CCD4FF").s().p("AAABWQgIgCgGgGQgFgFgDgJQgCgKAAgLIAAhCIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgdIABgDIADgCIAGgBIAIAAIAIAAIAGABIADACIABADIAAAdIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgCIACAAIACAAIABADIABAEIAAAGIgBALIgCAEIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_1.setTransform(207.375,29.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CCD4FF").s().p("AgfBFQgNgFgJgJQgHgKgFgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKANgFQANgGASAAQASAAAMAFQANAFAIAJQAJAJAEAOQAEANAAASQAAAPgEAOQgFAOgJAKQgIAKgOAFQgNAGgSAAQgRAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQADAGAHADQAFADAJAAQAIAAAGgDQAGgDAEgGQAEgFACgIQACgJAAgKQAAgJgBgIQgCgIgEgGQgDgGgHgDQgFgEgKAAQgHAAgGADg");
	this.shape_2.setTransform(194.3,30.725);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#CCD4FF").s().p("AgkBEQgJgEgGgIQgFgIgDgJQgCgKgBgPIAAhPIABgDIADgCIAGgBIAJgBIAJABIAGABIACACIABADIAABIQABAKABAGQABAGADADQACAEAFACQAEACAGABQAGgBAGgFQAIgFAIgKIAAhVIABgDIACgCIAGgBIAJgBIAJABIAFABIAEACIABADIAACBIgBADIgDACIgFAAIgIABIgHgBIgFAAIgDgCIAAgDIAAgPQgLALgLAHQgKAFgNAAQgNABgJgFg");
	this.shape_3.setTransform(178.15,30.85);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#CCD4FF").s().p("ABQBvQgIgDgJgFIgSgMQgKgHgIgJQgHADgJACQgKADgKAAQgXAAgQgGQgRgGgLgMQgLgLgFgTQgGgSAAgYQAAgXAGgTQAGgSAMgNQALgNARgHQARgHAXAAQAUAAARAGQAQAGALAMQALALAGASQAGASAAAZQAAANgCAKQgBALgEAKQgDAJgFAIQgEAIgGAGIAQAMIAMAGIAHADIAFADIACAFIABAKIgBAJIgBAFQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAAAAAIgCABQgFAAgIgDgAgfhMQgKAGgFAIQgGAJgDAMQgCAMAAANQAAAQACAMQADAMAFAJQAGAJAJAEQAJAFAPAAQANAAAJgFQAKgGAGgJQAGgJACgMQACgLAAgOQAAgPgCgMQgCgMgGgJQgFgJgKgEQgJgFgNAAQgPAAgJAFg");
	this.shape_4.setTransform(160.575,29.825);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#CCD4FF").s().p("AgeBHQgJgDgGgFQgHgFgDgIQgEgIAAgLQAAgLAFgJQAEgIAJgFQAJgFANgDQANgCARAAIAMAAIAAgIIgBgLQgBgFgDgDQgDgDgFgBQgEgCgGAAQgKAAgHACIgNAFIgJAEIgGACIgDgBIgCgDIgBgEIgBgGIABgIQABgCACgCIAHgFQAFgDAHgCIAPgDQAIgCAIAAQAPAAALADQALADAHAHQAHAGADAKQAEAJAAAOIAABXQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAgBAAQgBABAAAAIgKAAIgJAAQgBAAgBgBQAAAAgBAAQAAAAgBgBQAAAAgBAAIgBgDIAAgLQgIAJgKAFQgLAFgLAAQgLAAgIgDgAgFALQgGABgEADQgEADgCADQgCAEAAAFQAAAIAFAFQAGAFAJAAQAHAAAGgEQAHgEAGgIIAAgWIgOAAQgJAAgFABg");
	this.shape_5.setTransform(134.975,30.725);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#CCD4FF").s().p("AAABWQgIgCgGgGQgFgFgDgJQgCgKAAgLIAAhCIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgdIABgDIADgCIAGgBIAIAAIAIAAIAGABIADACIABADIAAAdIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgCIACAAIACAAIABADIABAEIAAAGIgBALIgCAEIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_6.setTransform(115.725,29.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#CCD4FF").s().p("AgUBJIgLgDIgJgEIgGgDIgCgFIgBgKIABgGIAAgEQABgBAAAAQAAgBAAAAQAAAAABAAQAAAAAAAAIACgBIAFACIAIAEIAKAEQAHACAIAAIAIgBIAGgDIAFgFQABgDAAgEQAAgEgCgDIgIgGIgJgEIgMgFIgLgFIgKgHQgFgFgDgHQgCgGAAgJQAAgKADgIQAFgHAGgGQAHgGAKgDQAKgDALAAIAMABIAKACIAIADIAFADIACACIABADIAAAEIAAAFIAAAHIgBAEIAAACIgDAAIgEgBIgHgEIgKgDQgFgCgHAAIgIABQgEABgCACIgDAFQgCACABADQAAAFACADQADADAFACIAJAFIAMAEIAMAGQAFADAFAEQAFAEACAHQADAGAAAJQAAALgEAJQgEAIgIAGQgIAGgKADQgKADgLAAIgPgBg");
	this.shape_7.setTransform(105.2,30.725);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#CCD4FF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgJANgGQAMgFAOAAQARAAALAFQAMAFAHAJQAIAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJABAHQACAGAFAFQAEAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAHgBIACAAIABACIABAEIAAAGIAAAGIgBADIgBADIgBACIgFADIgLAEIgPACQgJACgKAAQgQAAgNgFgAgJgsQgGADgDAEQgDAFgDAGQgBAGAAAHIA2AAQAAgQgHgJQgGgJgOAAQgHAAgEADg");
	this.shape_8.setTransform(91.55,30.725);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#CCD4FF").s().p("AgkBEQgJgEgFgIQgHgIgCgJQgDgKAAgPIAAhPIACgDIADgCIAFgBIAJgBIAJABIAFABIADACIACADIAABIQAAAKABAGQABAGADADQADAEAEACQAEACAFABQAHgBAHgFQAGgFAJgKIAAhVIAAgDIAEgCIAFgBIAJgBIAJABIAGABIACACIABADIAACBIgBADIgCACIgFAAIgHABIgIgBIgFAAIgCgCIgBgDIAAgPQgLALgLAHQgKAFgMAAQgOABgJgFg");
	this.shape_9.setTransform(75.95,30.85);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#CCD4FF").s().p("AAmBiIgFgBIgDgCIgBgCIAAg+IgKAIIgKAFIgJAEIgMABQgOAAgKgGQgKgGgGgKQgHgJgDgNQgDgNAAgOQAAgSAEgOQAEgOAHgJQAIgKAKgFQALgGAOAAIAJACQAFABAFADIALAHIALAKIAAgOIABgDIADgBIAFgBIAHgBIAIABIAEABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAAAIABADIAAC2IgBACIgDACIgGABIgJAAIgJAAgAgNg/QgFAEgDAGQgDAGgCAIQgBAGAAAJIABAPQABAIADAGQADAFAFAEQAFAEAIgBIAGgBIAIgDIAHgHIAJgJIAAgrQgIgKgHgFQgHgFgHAAQgHAAgGADg");
	this.shape_10.setTransform(59.525,33.2);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#CCD4FF").s().p("AgYBFQgNgEgJgJQgJgJgEgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJAMgGQANgFAOAAQARAAAMAFQALAFAIAJQAHAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJACAHQADAGADAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAGgBIACAAIACACIABAEIAAAGIAAAGIAAADIgCADIgBACIgFADIgLAEIgPACQgIACgKAAQgQAAgOgFgAgJgsQgGADgDAEQgDAFgDAGQgCAGAAAHIA2AAQABgQgGgJQgIgJgOAAQgGAAgEADg");
	this.shape_11.setTransform(44.25,30.725);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#CCD4FF").s().p("AAnBfIgFgBIgDgCIgCgDIgRgrIgGgMIgGgKQgDgDgFgCQgFgCgGAAIgMAAIAABIIAAADIgEACIgGABIgJAAIgKAAIgFgBIgEgCIgBgDIAAirQAAgHAEgCQADgDAFAAIAxAAIALAAIAJABQAMABAJAEQAJAEAGAHQAHAGADAJQADAIABAMQgBAJgCAIQgCAIgFAGQgFAGgGAFQgIADgIADIAIAFIAHAHIAGAKIAGAMIAQAlIADAIIABAEIgBADIgDACIgGABIgMAAIgKAAgAgfgLIAUAAQAIAAAFgCQAGgCAFgEQADgDACgFQACgFAAgGQAAgKgEgGQgEgHgKgCIgFgBIgKgBIgSAAg");
	this.shape_12.setTransform(29.4,28.325);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#CCD4FF").ss(4,1,1).p("AzSkIMAmlAAAQA8AAAAA8IAAGZQAAA8g8AAMgmlAAAQg8AAAAg8IAAmZQAAg8A8AAg");
	this.shape_13.setTransform(129.525,27.5);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#272D4D").s().p("AzSEJQg8AAAAg8IAAmZQAAg8A8AAMAmlAAAQA8AAAAA8IAAGZQAAA8g8AAg");
	this.shape_14.setTransform(129.525,27.5);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgJgJQgIgJgFgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJANgGQAMgFAPAAQAQAAAMAFQALAFAIAJQAHAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQABAJACAHQACAGADAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAFgBIADAAIABACIABAEIAAAGIAAAGIAAADIgBADIgCACIgFADIgLAEIgPACQgIACgKAAQgQAAgOgFgAgKgsQgFADgDAEQgDAFgCAGQgCAGgBAHIA3AAQAAgQgGgJQgIgJgNAAQgGAAgGADg");
	this.shape_15.setTransform(219.95,30.725);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAABWQgIgCgGgGQgFgFgDgJQgCgKAAgLIAAhCIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgdIABgDIADgCIAGgBIAIAAIAIAAIAGABIADACIABADIAAAdIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgCIACAAIACAAIABADIABAEIAAAGIgBALIgCAEIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_16.setTransform(207.375,29.1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgJgJQgHgKgFgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKANgFQANgGASAAQASAAAMAFQANAFAIAJQAJAJAEAOQAEANAAASQAAAPgEAOQgFAOgJAKQgIAKgOAFQgNAGgSAAQgRAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQADAGAHADQAFADAJAAQAIAAAGgDQAGgDAEgGQAEgFACgIQACgJAAgKQAAgJgBgIQgCgIgEgGQgDgGgHgDQgFgEgKAAQgHAAgGADg");
	this.shape_17.setTransform(194.3,30.725);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgkBEQgJgEgGgIQgFgIgDgJQgCgKgBgPIAAhPIABgDIADgCIAGgBIAJgBIAJABIAGABIACACIABADIAABIQABAKABAGQABAGADADQACAEAFACQAEACAGABQAGgBAGgFQAIgFAIgKIAAhVIABgDIACgCIAGgBIAJgBIAJABIAFABIAEACIABADIAACBIgBADIgDACIgFAAIgIABIgHgBIgFAAIgDgCIAAgDIAAgPQgLALgLAHQgKAFgNAAQgNABgJgFg");
	this.shape_18.setTransform(178.15,30.85);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("ABQBvQgIgDgJgFIgSgMQgKgHgIgJQgHADgJACQgKADgKAAQgXAAgQgGQgRgGgLgMQgLgLgFgTQgGgSAAgYQAAgXAGgTQAGgSAMgNQALgNARgHQARgHAXAAQAUAAARAGQAQAGALAMQALALAGASQAGASAAAZQAAANgCAKQgBALgEAKQgDAJgFAIQgEAIgGAGIAQAMIAMAGIAHADIAFADIACAFIABAKIgBAJIgBAFQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAAAAAIgCABQgFAAgIgDgAgfhMQgKAGgFAIQgGAJgDAMQgCAMAAANQAAAQACAMQADAMAFAJQAGAJAJAEQAJAFAPAAQANAAAJgFQAKgGAGgJQAGgJACgMQACgLAAgOQAAgPgCgMQgCgMgGgJQgFgJgKgEQgJgFgNAAQgPAAgJAFg");
	this.shape_19.setTransform(160.575,29.825);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgeBHQgJgDgGgFQgHgFgDgIQgEgIAAgLQAAgLAFgJQAEgIAJgFQAJgFANgDQANgCARAAIAMAAIAAgIIgBgLQgBgFgDgDQgDgDgFgBQgEgCgGAAQgKAAgHACIgNAFIgJAEIgGACIgDgBIgCgDIgBgEIgBgGIABgIQABgCACgCIAHgFQAFgDAHgCIAPgDQAIgCAIAAQAPAAALADQALADAHAHQAHAGADAKQAEAJAAAOIAABXQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAgBAAQgBABAAAAIgKAAIgJAAQgBAAgBgBQAAAAgBAAQAAAAgBgBQAAAAgBAAIgBgDIAAgLQgIAJgKAFQgLAFgLAAQgLAAgIgDgAgFALQgGABgEADQgEADgCADQgCAEAAAFQAAAIAFAFQAGAFAJAAQAHAAAGgEQAHgEAGgIIAAgWIgOAAQgJAAgFABg");
	this.shape_20.setTransform(134.975,30.725);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAABWQgIgCgGgGQgFgFgDgJQgCgKAAgLIAAhCIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgdIABgDIADgCIAGgBIAIAAIAIAAIAGABIADACIABADIAAAdIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgCIACAAIACAAIABADIABAEIAAAGIgBALIgCAEIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_21.setTransform(115.725,29.1);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgUBJIgLgDIgJgEIgGgDIgCgFIgBgKIABgGIAAgEQABgBAAAAQAAgBAAAAQAAAAABAAQAAAAAAAAIACgBIAFACIAIAEIAKAEQAHACAIAAIAIgBIAGgDIAFgFQABgDAAgEQAAgEgCgDIgIgGIgJgEIgMgFIgLgFIgKgHQgFgFgDgHQgCgGAAgJQAAgKADgIQAFgHAGgGQAHgGAKgDQAKgDALAAIAMABIAKACIAIADIAFADIACACIABADIAAAEIAAAFIAAAHIgBAEIAAACIgDAAIgEgBIgHgEIgKgDQgFgCgHAAIgIABQgEABgCACIgDAFQgCACABADQAAAFACADQADADAFACIAJAFIAMAEIAMAGQAFADAFAEQAFAEACAHQADAGAAAJQAAALgEAJQgEAIgIAGQgIAGgKADQgKADgLAAIgPgBg");
	this.shape_22.setTransform(105.2,30.725);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgJANgGQAMgFAOAAQARAAALAFQAMAFAHAJQAIAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJABAHQACAGAFAFQAEAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAHgBIACAAIABACIABAEIAAAGIAAAGIgBADIgBADIgBACIgFADIgLAEIgPACQgJACgKAAQgQAAgNgFgAgJgsQgGADgDAEQgDAFgDAGQgBAGAAAHIA2AAQAAgQgHgJQgGgJgOAAQgHAAgEADg");
	this.shape_23.setTransform(91.55,30.725);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgkBEQgJgEgFgIQgHgIgCgJQgDgKAAgPIAAhPIACgDIADgCIAFgBIAJgBIAJABIAFABIADACIACADIAABIQAAAKABAGQABAGADADQADAEAEACQAEACAFABQAHgBAHgFQAGgFAJgKIAAhVIAAgDIAEgCIAFgBIAJgBIAJABIAGABIACACIABADIAACBIgBADIgCACIgFAAIgHABIgIgBIgFAAIgCgCIgBgDIAAgPQgLALgLAHQgKAFgMAAQgOABgJgFg");
	this.shape_24.setTransform(75.95,30.85);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AAmBiIgFgBIgDgCIgBgCIAAg+IgKAIIgKAFIgJAEIgMABQgOAAgKgGQgKgGgGgKQgHgJgDgNQgDgNAAgOQAAgSAEgOQAEgOAHgJQAIgKAKgFQALgGAOAAIAJACQAFABAFADIALAHIALAKIAAgOIABgDIADgBIAFgBIAHgBIAIABIAEABQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAAAIABADIAAC2IgBACIgDACIgGABIgJAAIgJAAgAgNg/QgFAEgDAGQgDAGgCAIQgBAGAAAJIABAPQABAIADAGQADAFAFAEQAFAEAIgBIAGgBIAIgDIAHgHIAJgJIAAgrQgIgKgHgFQgHgFgHAAQgHAAgGADg");
	this.shape_25.setTransform(59.525,33.2);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgJgJQgJgJgEgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJAMgGQANgFAOAAQARAAAMAFQALAFAIAJQAHAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJACAHQADAGADAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAGgBIACAAIACACIABAEIAAAGIAAAGIAAADIgCADIgBACIgFADIgLAEIgPACQgIACgKAAQgQAAgOgFgAgJgsQgGADgDAEQgDAFgDAGQgCAGAAAHIA2AAQABgQgGgJQgIgJgOAAQgGAAgEADg");
	this.shape_26.setTransform(44.25,30.725);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AAnBfIgFgBIgDgCIgCgDIgRgrIgGgMIgGgKQgDgDgFgCQgFgCgGAAIgMAAIAABIIAAADIgEACIgGABIgJAAIgKAAIgFgBIgEgCIgBgDIAAirQAAgHAEgCQADgDAFAAIAxAAIALAAIAJABQAMABAJAEQAJAEAGAHQAHAGADAJQADAIABAMQgBAJgCAIQgCAIgFAGQgFAGgGAFQgIADgIADIAIAFIAHAHIAGAKIAGAMIAQAlIADAIIABAEIgBADIgDACIgGABIgMAAIgKAAgAgfgLIAUAAQAIAAAFgCQAGgCAFgEQADgDACgFQACgFAAgGQAAgKgEgGQgEgHgKgCIgFgBIgKgBIgSAAg");
	this.shape_27.setTransform(29.4,28.325);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#FFFFFF").ss(4,1,1).p("AzSkIMAmlAAAQA8AAAAA8IAAGZQAAA8g8AAMgmlAAAQg8AAAAg8IAAmZQAAg8A8AAg");
	this.shape_28.setTransform(129.525,27.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_14},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-1,263.1,57);


(lib.log_blurb = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgQASQgFgFAAgMQAAgNAFgFQAFgFALAAQAMAAAFAFQAFAFAAAMQAAANgFAFQgFAFgMAAQgMAAgEgFg");
	this.shape.setTransform(743.625,67.075);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgfBgQgMgDgHgEQgIgFgEgHQgDgGAAgIQAAgFABgEQACgFACgDIAGgIIAIgIQgGgCgEgHQgDgFAAgHQAAgJAEgGQADgHAHgFQgFgGgEgHQgCgHAAgLQAAgLADgKQAFgJAHgGQAHgGAKgDQAKgDAMAAIALAAIAKACIAqAAQACAAACAEIABALQAAAGgCAEQgBADgCAAIgQAAQAEAEABAEQABAFAAAEQABAMgEAJQgFAJgHAGQgGAGgLADQgJADgMAAIgMgCIgIgDIgEAEQgBADgBACQAAAEAFAEQADACAHAAIAeABQAMABAIADQAKACAFAGQAGAEADAHQADAHAAAJQABAJgFAJQgEAIgIAHQgJAGgNAEQgMADgRABQgQgBgMgCgAgXAtIgEAEIgCAFIAAAEQAAAHAHAFQAIADANAAQAHAAAGgBQAGgCADgDQADgCACgEQABgDAAgEQAAgHgEgDQgGgEgJgBIgaAAIgFAGgAgMhGQgEACgDADQgDADgBAEIgBAJQAAAKAFAGQAHAGAKAAQAFAAADgDQAFgBADgDIADgHIACgJQAAgKgGgGQgGgGgJAAQgGAAgEACg");
	this.shape_1.setTransform(732.4,64.65);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAjBIIgFgBIgDgCIgCgCIAAhKQAAgJgBgGQgCgFgCgEQgDgEgEgCQgEgDgFABQgHAAgHAEQgHAGgHAJIAABXIgBACIgEACIgFABIgJAAIgJAAIgGgBIgCgCIgBgCIAAiCIAAgDIADgBIAFgBIAHgBIAIABIAFABIACABIABADIAAAPQALgMALgGQAKgFAMgBQAOAAAJAFQAJAFAFAHQAHAHACAKQADALAAAOIAABQIgCACIgDACIgFABIgJAAIgJAAg");
	this.shape_2.setTransform(717.4,62);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgIBkIgFgBIgDgCIgBgDIAAiBIABgDIADgCIAFgBIAIgBIAJABIAGABIADACIABADIAACBIgBADIgDACIgGABIgJAAIgIAAgAgQhAQgEgFAAgKQAAgLAEgFQAFgEALAAQANAAAEAEQAEAFAAAKQAAALgEAFQgFAEgMgBQgLABgFgEg");
	this.shape_3.setTransform(705.625,59.25);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAjBmIgGgBIgDgCIAAgCIAAhLQgBgJgBgGQgCgFgCgDQgCgEgEgCQgFgDgGABQgGAAgGAEQgIAFgIAJIAABYIgBACIgCACIgGABIgJAAIgJAAIgFgBIgEgCIgBgCIAAjAIABgDQABAAAAAAQAAgBAAAAQABAAAAAAQABAAABAAIAFgCIAJAAIAJAAIAGACIACABIABADIAABIQAKgJAKgFQAJgFALAAQANAAAJAFQAJAFAGAHQAFAHADALQACAJABAPIAABQIgBACIgDACIgGABIgJAAIgJAAg");
	this.shape_4.setTransform(693.95,59);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgRBFQgMgFgHgIQgJgKgEgNQgDgNAAgRQAAgTAEgOQAGgPAIgJQAJgJAMgFQAMgFANAAIAMABIALAEQAFABADACIAFAEIADADIABADIABAEIAAAGIgCANQAAAAAAABQgBAAAAABQgBAAAAAAQgBAAAAAAQgDAAgDgBIgGgFIgJgEQgGgCgHAAQgOAAgHALQgHAKgBAVQABALABAIQACAHAEAGQADAGAGADQAFACAHAAQAIAAAGgCIAJgGIAHgEQABgBAAAAQABgBAAAAQABAAAAAAQABAAAAAAIADAAIACADIAAAFIABAHIgBAHIAAAFIgCACIgCADIgFAEIgLAEIgLAEIgNABQgPAAgLgFg");
	this.shape_5.setTransform(679.7,62.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAABWQgIgCgGgGQgFgGgDgIQgCgKAAgMIAAhBIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgeIABgCIADgCIAGgBIAIAAIAIAAIAGABIADACIABACIAAAeIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgBIACgBIACABIABACIABAEIAAAGIgBAKIgCAFIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_6.setTransform(668.275,60.5);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgeBHQgJgDgGgFQgHgFgDgIQgEgIAAgLQAAgLAFgJQAEgIAJgFQAJgFANgDQANgCARAAIAMAAIAAgIIgBgLQgBgFgDgDQgDgDgFgBQgEgCgGAAQgKAAgHACIgNAFIgJAEIgGACIgDgBIgCgDIgBgEIgBgGIABgIQABgCACgCIAHgFQAFgDAHgCIAPgDQAIgCAIAAQAPAAALADQALADAHAHQAHAGADAKQAEAJAAAOIAABXQAAAAAAABQAAAAgBAAQAAABAAAAQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAgBAAQAAABgBAAIgKAAIgJAAQgBAAgBgBQAAAAgBAAQAAAAgBgBQAAAAgBAAIgBgDIAAgLQgIAJgKAFQgLAFgLAAQgLAAgIgDgAgFALQgGABgEADQgEADgCADQgCAEAAAFQAAAIAFAFQAGAFAJAAQAHAAAGgEQAHgEAGgIIAAgWIgOAAQgJAAgFABg");
	this.shape_7.setTransform(655.825,62.125);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgRBFQgLgFgJgIQgIgKgDgNQgFgNAAgRQABgTAFgOQAEgPAJgJQAJgJAMgFQAMgFAOAAIALABIAKAEQAFABAEACIAGAEIACADIABADIAAAEIAAAGIgBANQAAAAAAABQgBAAAAABQgBAAAAAAQgBAAAAAAQgDAAgDgBIgHgFIgJgEQgEgCgIAAQgOAAgHALQgIAKABAVQAAALABAIQACAHAEAGQADAGAFADQAGACAIAAQAHAAAFgCIAKgGIAHgEQABgBAAAAQABgBAAAAQABAAAAAAQABAAABAAIACAAIABADIABAFIAAAHIAAAHIgBAFIgBACIgBADIgHAEIgJAEIgMAEIgNABQgOAAgMgFg");
	this.shape_8.setTransform(642.85,62.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgJgJQgJgJgEgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJAMgGQANgFAOAAQARAAAMAFQALAFAIAJQAHAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJACAHQADAGADAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAGgBIACAAIACACIABAEIAAAGIAAAGIAAADIgCADIgBACIgFADIgLAEIgPACQgJACgJAAQgQAAgOgFgAgJgsQgGADgDAEQgDAFgDAGQgCAGAAAHIA2AAQABgQgGgJQgIgJgOAAQgGAAgEADg");
	this.shape_9.setTransform(622.05,62.125);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgZBhIgGgCQAAAAAAAAQgBgBAAAAQAAAAAAgBQgBAAAAgBIABgEIASgsIgDgCIgDgEIgth3IgCgIQAAgBAAgBQAAAAABgBQAAAAAAgBQABAAAAAAQABgCAFgBIALAAIAKAAIAFABQABAAAAABQABAAAAAAQABAAAAABQAAAAAAABIADAFIAdBXIABAAIAchZQABgEACgBQAAAAAAAAQABgBAAAAQABAAABAAQAAgBABAAIALAAIALAAQAEABACACQABAAAAABQAAAAABABQAAAAAAABQAAAAAAABIgCAGIgrB/IgPAvQgCADgGACQgEABgMAAIgJAAg");
	this.shape_10.setTransform(607.8,64.725);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgJAMgGQANgFAOAAQARAAALAFQAMAFAHAJQAIAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJABAHQACAGAFAFQAEAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAHgBIACAAIABACIABAEIAAAGIAAAGIgBADIgBADIgBACIgFADIgLAEIgPACQgJACgKAAQgPAAgOgFgAgJgsQgGADgDAEQgEAFgCAGQgBAGAAAHIA2AAQAAgQgHgJQgGgJgPAAQgGAAgEADg");
	this.shape_11.setTransform(593.4,62.125);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgjBiQgLgGgGgKQgHgKgDgNQgDgNAAgPQAAgRAEgOQAEgNAHgKQAHgKALgFQAKgFAOAAQAKAAAJAEQAJAFAJAJIAAhHIABgDIADgCIAFgBIAJgBIAJABIAGABIADACIABADIAAC/IgBADIgDACIgEABIgIAAIgHAAIgFgBIgDgCIgBgDIAAgOQgKAKgLAHQgLAFgMAAQgPAAgKgFgAgNgIQgFADgDAGQgDAFgCAIQgBAHAAAIIABAQQABAHADAHQADAGAFADQAFAEAIAAIAGgBIAIgEIAHgGIAJgKIAAgrQgIgJgHgFQgHgGgHAAQgHAAgGAEg");
	this.shape_12.setTransform(570.675,59.15);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAjBIIgGgBIgDgCIgBgCIAAhKQAAgJgBgGQgCgFgCgEQgCgEgEgCQgFgDgFABQgGAAgHAEQgIAGgIAJIAABXIgBACIgCACIgGABIgJAAIgJAAIgFgBIgEgCIgBgCIAAiCIABgDIADgBIAFgBIAHgBIAIABIAFABIACABIABADIAAAPQALgMALgGQAKgFANgBQANAAAJAFQAJAFAGAHQAFAHADAKQADALgBAOIAABQIgBACIgCACIgGABIgJAAIgJAAg");
	this.shape_13.setTransform(555,62);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgeBHQgJgDgGgFQgHgFgDgIQgEgIAAgLQAAgLAFgJQAEgIAJgFQAJgFANgDQANgCARAAIAMAAIAAgIIgBgLQgBgFgDgDQgDgDgFgBQgEgCgGAAQgKAAgHACIgNAFIgJAEIgGACIgDgBIgCgDIgBgEIgBgGIABgIQABgCACgCIAHgFQAFgDAHgCIAPgDQAIgCAIAAQAPAAALADQALADAHAHQAHAGADAKQAEAJAAAOIAABXQAAAAAAABQAAAAgBAAQAAABAAAAQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAgBAAQgBABAAAAIgKAAIgJAAQgBAAgBgBQAAAAgBAAQAAAAgBgBQAAAAgBAAIgBgDIAAgLQgIAJgKAFQgLAFgLAAQgLAAgIgDgAgFALQgGABgEADQgEADgCADQgCAEAAAFQAAAIAFAFQAGAFAJAAQAHAAAGgEQAHgEAGgIIAAgWIgOAAQgJAAgFABg");
	this.shape_14.setTransform(539.125,62.125);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgJANgGQAMgFAPAAQAQAAALAFQAMAFAHAJQAIAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJABAHQACAGAFAFQAEAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAGgBIACAAIABACIABAEIAAAGIAAAGIgBADIgBADIgBACIgFADIgLAEIgPACQgJACgKAAQgQAAgNgFgAgJgsQgGADgDAEQgEAFgCAGQgBAGAAAHIA2AAQAAgQgHgJQgGgJgOAAQgHAAgEADg");
	this.shape_15.setTransform(517.7,62.125);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgLBHIgIgBIgEgDIgCgEIgnh1IgCgFIAAgEIgBgCIABgCIADgCIAGgBIAJAAIAJAAIAGABIADACIACADIAcBfIABAEIABgEIAdhfIACgDIADgCIAFgBIAJAAIAJAAIAGABIACACIABACIAAACIAAADIgBACIgBAEIgnB1IgCAEIgEADIgIABIgNAAIgLAAg");
	this.shape_16.setTransform(503.375,62.125);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgIBkIgFgBIgDgCIgBgDIAAiBIABgDIADgCIAFgBIAIgBIAJABIAGABIADACIABADIAACBIgBADIgDACIgGABIgJAAIgIAAgAgQhAQgEgFAAgKQAAgLAEgFQAFgEALAAQANAAAEAEQAEAFAAAKQAAALgEAFQgFAEgMgBQgLABgFgEg");
	this.shape_17.setTransform(492.625,59.25);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAABWQgIgCgGgGQgFgGgDgIQgCgKAAgMIAAhBIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgeIABgCIADgCIAGgBIAIAAIAIAAIAGABIADACIABACIAAAeIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgBIACgBIACABIABACIABAEIAAAGIgBAKIgCAFIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_18.setTransform(483.525,60.5);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgeBHQgJgDgGgFQgHgFgDgIQgEgIAAgLQAAgLAFgJQAEgIAJgFQAJgFANgDQANgCARAAIAMAAIAAgIIgBgLQgBgFgDgDQgDgDgFgBQgEgCgGAAQgKAAgHACIgNAFIgJAEIgGACIgDgBIgCgDIgBgEIgBgGIABgIQABgCACgCIAHgFQAFgDAHgCIAPgDQAIgCAIAAQAPAAALADQALADAHAHQAHAGADAKQAEAJAAAOIAABXQAAAAAAABQAAAAgBAAQAAABAAAAQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAgBAAQAAABgBAAIgKAAIgJAAQgBAAgBgBQAAAAgBAAQAAAAgBgBQAAAAgBAAIgBgDIAAgLQgIAJgKAFQgLAFgLAAQgLAAgIgDgAgFALQgGABgEADQgEADgCADQgCAEAAAFQAAAIAFAFQAGAFAJAAQAHAAAGgEQAHgEAGgIIAAgWIgOAAQgJAAgFABg");
	this.shape_19.setTransform(471.075,62.125);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgJgJQgJgJgEgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJAMgGQANgFAOAAQARAAAMAFQALAFAIAJQAHAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJACAHQADAGADAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAGgBIACAAIACACIABAEIAAAGIAAAGIAAADIgCADIgBACIgFADIgLAEIgPACQgJACgJAAQgQAAgOgFgAgKgsQgFADgDAEQgDAFgDAGQgCAGAAAHIA2AAQABgQgGgJQgIgJgOAAQgGAAgFADg");
	this.shape_20.setTransform(456.45,62.125);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AggBIIgFgBIgDgCIgBgCIAAiCIAAgDIADgBIAGgBIAHgBIAIABIAEABIACABIABADIAAAQIAKgMIAIgHQAEgDAEgCIAIgBIAFABIAEAAIAEACIACABIABACIABACIAAAFIABAIIgBAJIgBAFIgBACIgCACIgDgBIgDgCIgEgBIgFAAIgGABQgDABgDADIgHAHIgHALIAABRIgBACIgDACIgFABIgJAAIgKAAg");
	this.shape_21.setTransform(444.7,62);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgRBFQgMgFgHgIQgJgKgDgNQgFgNAAgRQAAgTAGgOQAEgPAJgJQAJgJAMgFQAMgFANAAIAMABIALAEQAEABAEACIAFAEIADADIABADIABAEIAAAGIgBANQgCACgDAAQgCAAgDgBIgHgFIgJgEQgEgCgIAAQgOAAgHALQgIAKAAAVQAAALACAIQACAHAEAGQAEAGAEADQAGACAIAAQAHAAAFgCIAKgGIAHgEQABgBAAAAQABgBAAAAQABAAAAAAQABAAAAAAIADAAIACADIAAAFIABAHIgBAHIAAAFIgBACIgCADIgGAEIgKAEIgMAEIgNABQgPAAgLgFg");
	this.shape_22.setTransform(432.5,62.1);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgTBJIgNgDIgJgEIgEgDIgDgFIgBgKIAAgGIABgEQABgBAAAAQAAgBAAAAQAAAAABAAQAAAAAAAAIACgBIAFACIAHAEIALAEQAHACAHAAIAIgBIAIgDIADgFQACgDAAgEQAAgEgDgDIgHgGIgJgEIgLgFIgMgFIgKgHQgEgFgDgHQgDgGAAgJQAAgKAEgIQAEgHAGgGQAHgGAKgDQAKgDALAAIAMABIALACIAIADIAEADIACACIABADIABAEIAAAFIAAAHIgCAEIgBACIgCAAIgEgBIgHgEIgJgDQgGgCgHAAIgIABQgDABgCACQgDACgBADQgBACgBADQAAAFAEADQACADAFACIAJAFIAMAEIALAGQAGADAFAEQAEAEADAHQADAGAAAJQAAALgEAJQgEAIgIAGQgHAGgLADQgLADgLAAIgNgBg");
	this.shape_23.setTransform(413.4,62.125);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgIBkIgFgBIgDgCIgBgDIAAiBIABgDIADgCIAFgBIAIgBIAJABIAGABIADACIABADIAACBIgBADIgDACIgGABIgJAAIgIAAgAgQhAQgEgFAAgKQAAgLAEgFQAFgEALAAQANAAAEAEQAEAFAAAKQAAALgEAFQgFAEgMgBQgLABgFgEg");
	this.shape_24.setTransform(403.675,59.25);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgJgJQgHgKgFgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKANgFQANgGASAAQASAAAMAFQANAFAIAJQAJAJAEAOQAEANAAASQAAAPgEAOQgFAOgJAKQgIAKgOAFQgNAGgSAAQgRAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQADAGAHADQAFADAJAAQAIAAAGgDQAGgDAEgGQAEgFACgIQACgJAAgKQAAgJgBgIQgCgIgEgGQgDgGgHgDQgFgEgKAAQgHAAgGADg");
	this.shape_25.setTransform(385.1,62.125);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgfBgQgMgDgHgEQgIgFgEgHQgDgGAAgIQAAgFABgEQACgFACgDIAGgIIAIgIQgGgCgEgHQgDgFAAgHQAAgJAEgGQADgHAHgFQgFgGgEgHQgCgHAAgLQAAgLADgKQAFgJAHgGQAHgGAKgDQAKgDAMAAIALAAIAKACIApAAQADAAACAEIABALQAAAGgCAEQgBADgDAAIgPAAQAEAEABAEQABAFAAAEQABAMgEAJQgFAJgHAGQgGAGgLADQgJADgMAAIgMgCIgIgDIgEAEQgBADgBACQAAAEAFAEQADACAHAAIAeABQAMABAIADQAKACAFAGQAGAEADAHQADAHAAAJQABAJgFAJQgEAIgIAHQgJAGgNAEQgMADgRABQgRgBgLgCgAgXAtIgEAEIgCAFIAAAEQAAAHAHAFQAIADANAAQAHAAAGgBQAGgCADgDQADgCACgEQABgDAAgEQAAgHgEgDQgGgEgJgBIgaAAIgFAGgAgMhGQgEACgDADQgDADgBAEIgBAJQAAAKAFAGQAHAGAKAAQAFAAADgDQAFgBADgDIADgHIACgJQAAgKgGgGQgGgGgJAAQgGAAgEACg");
	this.shape_26.setTransform(370.15,64.65);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgIgJQgJgKgEgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKANgFQANgGASAAQASAAAMAFQANAFAIAJQAJAJAEAOQAEANAAASQAAAPgEAOQgFAOgJAKQgIAKgOAFQgNAGgSAAQgRAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQADAGAHADQAFADAJAAQAIAAAGgDQAHgDADgGQAFgFABgIQACgJAAgKQAAgJgBgIQgCgIgEgGQgDgGgHgDQgGgEgIAAQgIAAgGADg");
	this.shape_27.setTransform(355.05,62.125);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgIBmIgFgBIgDgCIgCgCIAAjAIACgDQAAAAAAAAQAAgBABAAQAAAAAAAAQABAAABAAIAFgCIAIAAIAJAAIAFACIADABIACADIAADAIgCACIgDACIgFABIgJAAIgIAAg");
	this.shape_28.setTransform(343.35,59);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AAiBHIgHgBIgEgDIgCgEIgVhOIAAgBIAAABIgUBOIgCAEIgEADIgHABIgMAAIgLAAIgHgBIgEgDIgCgEIgjh1IgBgHIgBgEIABgCIADgCIAGgBIAJAAIAJAAIAGABQABAAAAABQABAAAAAAQAAAAAAABQABAAAAAAIABADIAaBfIAAACIABgCIAYhfIABgDIADgCIAGgBIAHAAIAJAAIAGABIACACIACACIAaBgIAAACIAAgCIAZhfIACgDQAAAAAAAAQAAgBABAAQAAAAAAAAQABgBAAAAIAGgBIAJAAIAJAAIAFABIADACIABACIgBAEIgBAHIgjB1IgCAEIgEADIgHABIgLAAIgMAAg");
	this.shape_29.setTransform(321.675,62.125);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgJANgGQAMgFAOAAQARAAALAFQAMAFAHAJQAIAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJACAHQABAGAFAFQAEAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAHgBIACAAIABACIABAEIAAAGIAAAGIgBADIgBADIgBACIgFADIgLAEIgPACQgJACgKAAQgQAAgNgFgAgJgsQgGADgDAEQgEAFgBAGQgCAGAAAHIA2AAQAAgQgHgJQgGgJgOAAQgHAAgEADg");
	this.shape_30.setTransform(303.05,62.125);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AAjBIIgFgBIgEgCIgBgCIAAhKQAAgJgBgGQgCgFgCgEQgDgEgEgCQgEgDgFABQgHAAgHAEQgHAGgHAJIAABXIgBACIgEACIgFABIgJAAIgJAAIgGgBIgCgCIgBgCIAAiCIAAgDIADgBIAFgBIAHgBIAIABIAFABIACABIABADIAAAPQALgMALgGQAKgFAMgBQANAAAKAFQAJAFAFAHQAGAHADAKQACALAAAOIAABQIgBACIgDACIgFABIgJAAIgJAAg");
	this.shape_31.setTransform(287.55,62);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AggBIIgFgBIgDgCIgBgCIAAiCIAAgDIAEgBIAEgBIAIgBIAIABIAEABIADABIABADIAAAQIAJgMIAIgHQAEgDAEgCIAIgBIAEABIAFAAIAEACIACABIABACIABACIAAAFIABAIIgBAJIgBAFIgBACIgCACIgDgBIgDgCIgEgBIgFAAIgGABQgDABgDADIgIAHIgGALIAABRIgBACIgDACIgGABIgJAAIgJAAg");
	this.shape_32.setTransform(268.05,62);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgkBEQgJgFgFgHQgGgIgDgKQgCgJAAgPIAAhPIABgDIACgCIAGgBIAJgBIAJABIAFABIAEACIABADIAABIQgBALACAFQABAGADADQACAEAFACQAEADAFAAQAGAAAIgGQAGgFAJgKIAAhVIABgDIADgCIAFgBIAJgBIAJABIAFABIADACIACADIAACBIgCADIgCACIgEABIgIAAIgIAAIgFgBIgDgCIAAgDIAAgPQgLALgLAHQgLAFgMAAQgNABgJgFg");
	this.shape_33.setTransform(253.9,62.25);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgIgJQgJgKgEgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKANgFQAOgGARAAQARAAANAFQANAFAJAJQAIAJAEAOQAEANAAASQAAAPgFAOQgEAOgIAKQgJAKgOAFQgNAGgRAAQgSAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQAEAGAFADQAHADAIAAQAIAAAGgDQAHgDADgGQAEgFACgIQACgJAAgKQAAgJgCgIQgBgIgDgGQgFgGgGgDQgGgEgIAAQgIAAgGADg");
	this.shape_34.setTransform(237.8,62.125);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgZBhIgGgCQAAAAAAAAQgBgBAAAAQAAAAAAgBQgBAAAAgBIABgEIASgsIgDgCIgDgEIgth3IgCgIQAAgBAAgBQAAAAABgBQAAAAAAgBQABAAAAAAQABgCAFgBIALAAIAKAAIAFABQABAAAAABQABAAAAAAQABAAAAABQAAAAAAABIADAFIAdBXIABAAIAchZQABgEABgBQABAAAAAAQABgBAAAAQABAAABAAQAAgBABAAIALAAIALAAQAEABACACQABAAAAABQAAAAABABQAAAAAAABQAAAAAAABIgCAGIgrB/IgPAvQgCADgGACQgEABgMAAIgJAAg");
	this.shape_35.setTransform(222.95,64.725);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AAABWQgIgCgGgGQgFgGgDgIQgCgKAAgMIAAhBIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgeIABgCIADgCIAGgBIAIAAIAIAAIAGABIADACIABACIAAAeIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgBIACgBIACABIABACIABAEIAAAGIgBAKIgCAFIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_36.setTransform(203.625,60.5);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgeBHQgJgDgGgFQgHgFgDgIQgEgIAAgLQAAgLAFgJQAEgIAJgFQAJgFANgDQANgCARAAIAMAAIAAgIIgBgLQgBgFgDgDQgDgDgFgBQgEgCgGAAQgKAAgHACIgNAFIgJAEIgGACIgDgBIgCgDIgBgEIgBgGIABgIQABgCACgCIAHgFQAFgDAHgCIAPgDQAIgCAIAAQAPAAALADQALADAHAHQAHAGADAKQAEAJAAAOIAABXQAAAAAAABQAAAAgBAAQAAABAAAAQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAgBAAQAAABgBAAIgKAAIgJAAQgBAAgBgBQAAAAgBAAQAAAAgBgBQAAAAgBAAIgBgDIAAgLQgIAJgKAFQgLAFgLAAQgLAAgIgDgAgFALQgGABgEADQgEADgCADQgCAEAAAFQAAAIAFAFQAGAFAJAAQAHAAAGgEQAHgEAGgIIAAgWIgOAAQgJAAgFABg");
	this.shape_37.setTransform(191.175,62.125);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AAjBmIgGgBIgCgCIgBgCIAAhLQAAgJgCgGQgBgFgDgDQgCgEgFgCQgEgDgGABQgFAAgHAEQgIAFgHAJIAABYIgBACIgEACIgFABIgJAAIgJAAIgGgBIgCgCIgBgCIAAjAIABgDQAAAAAAAAQAAgBAAAAQABAAAAAAQABAAAAAAIAGgCIAJAAIAJAAIAFACIAEABIABADIAABIQAJgJAKgFQAJgFAKAAQAOAAAJAFQAJAFAFAHQAHAHACALQADAJAAAPIAABQIgBACIgEACIgFABIgJAAIgJAAg");
	this.shape_38.setTransform(176.15,59);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AAABWQgIgCgGgGQgFgGgDgIQgCgKAAgMIAAhBIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgeIABgCIADgCIAGgBIAIAAIAIAAIAGABIADACIABACIAAAeIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgBIACgBIACABIABACIABAEIAAAGIgBAKIgCAFIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_39.setTransform(162.625,60.5);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgJgJQgJgJgEgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJAMgGQANgFAOAAQARAAAMAFQALAFAIAJQAHAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJACAHQADAGADAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAGgBIACAAIACACIABAEIAAAGIAAAGIAAADIgCADIgBACIgFADIgLAEIgPACQgIACgKAAQgQAAgOgFgAgKgsQgFADgDAEQgDAFgDAGQgCAGAAAHIA2AAQABgQgGgJQgIgJgOAAQgGAAgFADg");
	this.shape_40.setTransform(143.25,62.125);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AggBIIgFgBIgDgCIgBgCIAAiCIAAgDIADgBIAGgBIAHgBIAIABIAEABIACABIABADIAAAQIAKgMIAIgHQAEgDAEgCIAIgBIAFABIAEAAIAEACIACABIABACIABACIAAAFIABAIIgBAJIgBAFIgBACIgCACIgDgBIgDgCIgEgBIgFAAIgGABQgDABgDADIgHAHIgHALIAABRIgBACIgDACIgFABIgKAAIgJAAg");
	this.shape_41.setTransform(131.5,62);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgkBEQgJgFgFgHQgHgIgCgKQgDgJAAgPIAAhPIACgDIADgCIAFgBIAJgBIAJABIAFABIADACIACADIAABIQAAALABAFQABAGADADQADAEAEACQAEADAGAAQAGAAAHgGQAGgFAJgKIAAhVIAAgDIAEgCIAFgBIAJgBIAJABIAGABIACACIABADIAACBIgBADIgCACIgFABIgHAAIgIAAIgFgBIgCgCIgBgDIAAgPQgLALgLAHQgKAFgMAAQgOABgJgFg");
	this.shape_42.setTransform(117.35,62.25);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgTBJIgNgDIgJgEIgEgDIgDgFIgBgKIAAgGIACgEQAAgBAAAAQAAgBAAAAQAAAAABAAQAAAAAAAAIACgBIAFACIAHAEIAMAEQAGACAHAAIAIgBIAIgDIADgFQACgDAAgEQAAgEgDgDIgHgGIgJgEIgMgFIgLgFIgKgHQgEgFgDgHQgDgGAAgJQAAgKAEgIQADgHAHgGQAHgGAKgDQAKgDALAAIAMABIALACIAIADIAEADIACACIABADIABAEIAAAFIAAAHIgBAEIgCACIgCAAIgEgBIgHgEIgJgDQgGgCgHAAIgHABQgFABgBACQgDACgBADQgCACAAADQAAAFAEADQACADAFACIAJAFIAMAEIALAGQAHADAEAEQAEAEADAHQADAGAAAJQAAALgEAJQgFAIgHAGQgHAGgLADQgLADgLAAIgNgBg");
	this.shape_43.setTransform(103.45,62.125);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AAjBIIgGgBIgCgCIgBgCIAAhKQAAgJgCgGQgBgFgDgEQgDgEgEgCQgEgDgGABQgFAAgHAEQgIAGgIAJIAABXIAAACIgDACIgGABIgJAAIgJAAIgGgBIgDgCIAAgCIAAiCIAAgDIADgBIAFgBIAIgBIAHABIAFABIACABIABADIAAAPQALgMALgGQAKgFAMgBQAOAAAJAFQAJAFAGAHQAGAHACAKQACALABAOIAABQIgBACIgEACIgFABIgJAAIgJAAg");
	this.shape_44.setTransform(89.4,62);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgIBkIgFgBIgDgCIgBgDIAAiBIABgDIADgCIAFgBIAIgBIAJABIAGABIADACIABADIAACBIgBADIgDACIgGABIgJAAIgIAAgAgQhAQgEgFAAgKQAAgLAEgFQAFgEALAAQANAAAEAEQAEAFAAAKQAAALgEAFQgFAEgMgBQgLABgFgEg");
	this.shape_45.setTransform(77.625,59.25);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgIBmIgGgBIgDgCIgBgCIAAjAIABgDQABAAAAAAQAAgBAAAAQABAAAAAAQABAAAAAAIAGgCIAIAAIAJAAIAGACIADABIAAADIAADAIAAACIgDACIgGABIgJAAIgIAAg");
	this.shape_46.setTransform(63.5,59);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgIBmIgFgBIgEgCIgBgCIAAjAIABgDQABAAAAAAQAAgBAAAAQABAAAAAAQABAAABAAIAFgCIAIAAIAJAAIAFACIADABIABADIAADAIgBACIgDACIgFABIgJAAIgIAAg");
	this.shape_47.setTransform(56.15,59);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgXAqIgEgBIgBgBIAAgEIASgnIAAgXIABgIIAEgFIAFgCIAKAAIAIAAIAHACIADAFIABAIIgBAKIgBAJIgEAIIgFAIIgTAcIgCADIgDACIgEAAIgGAAIgHAAg");
	this.shape_48.setTransform(47.975,52.9);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgJANgGQAMgFAOAAQARAAALAFQAMAFAHAJQAIAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJABAHQACAGAFAFQAEAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAHgBIACAAIABACIABAEIAAAGIAAAGIgBADIgBADIgBACIgFADIgLAEIgPACQgJACgKAAQgQAAgNgFgAgJgsQgGADgDAEQgDAFgDAGQgBAGAAAHIA2AAQAAgQgHgJQgGgJgOAAQgHAAgEADg");
	this.shape_49.setTransform(37.1,62.125);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AAiBHIgHgBIgEgDIgCgEIgVhOIAAgBIAAABIgUBOIgCAEIgEADIgHABIgMAAIgLAAIgHgBIgEgDIgCgEIgjh1IgBgHIgBgEIABgCIADgCIAGgBIAJAAIAJAAIAGABQABAAAAABQABAAAAAAQAAAAAAABQABAAAAAAIABADIAaBfIAAACIABgCIAYhfIABgDIADgCIAGgBIAHAAIAJAAIAGABIACACIACACIAaBgIAAACIAAgCIAZhfIACgDQAAAAAAAAQAAgBABAAQAAAAAAAAQABgBAAAAIAGgBIAJAAIAJAAIAFABIADACIABACIgBAEIgBAHIgjB1IgCAEIgEADIgHABIgLAAIgMAAg");
	this.shape_50.setTransform(18.675,62.125);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgXAqIgEgBIgBgCIAAgDIASgnIAAgXIABgIQACgDACgCQADgCACAAIAKgBIAIABQAEAAADACIADAFIABAIIgBAKIgBAJIgEAIIgFAIIgTAcIgCADIgDABIgEABIgGABIgHgBg");
	this.shape_51.setTransform(722.475,30.575);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgjBiQgLgGgGgKQgHgKgDgNQgDgNAAgPQAAgRAEgOQAEgNAHgKQAHgKALgEQAKgGAOAAQAKAAAJAEQAJAFAJAJIAAhHIABgDIADgBIAFgCIAJgBIAJABIAGACIADABIABADIAAC/IgBADIgDACIgEABIgIAAIgHAAIgFgBIgDgCIgBgDIAAgOQgKAKgLAHQgLAFgMAAQgPAAgKgFgAgNgIQgFAEgDAFQgDAFgCAIQgBAHAAAIIABAQQABAHADAHQADAGAFADQAFAEAIAAIAGgBIAIgEIAHgGIAJgKIAAgrQgIgJgHgGQgHgFgHAAQgHAAgGAEg");
	this.shape_52.setTransform(710.775,20.55);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgIBmIgFgBIgEgCIgBgCIAAjAIABgDQABAAAAAAQAAgBAAAAQABAAAAAAQABAAABgBIAFgBIAIAAIAJAAIAGABIACACIABADIAADAIgBACIgCACIgGABIgJABIgIgBg");
	this.shape_53.setTransform(699.45,20.4);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AggBIIgFgBIgDgCIgBgCIAAiCIAAgDIAEgBIAEgBIAIgBIAIABIAEABIADABIABADIAAAQIAJgMIAIgIQAEgCAEgBIAIgCIAEABIAFABIAEABIACABIABABIACADIAAAFIAAAIIAAAJIgCAFIgBADIgCABIgDgBIgDgCIgEgBIgFAAIgGABQgEACgDACIgHAHIgGALIAABRIgBACIgDACIgGABIgJABIgJgBg");
	this.shape_54.setTransform(691.15,23.4);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgIgJQgJgKgEgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKANgFQAOgGARAAQARAAANAFQANAFAJAJQAIAJAEAOQAEANAAASQAAAPgFAOQgEAOgIAKQgJAKgOAFQgNAGgRAAQgSAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQAEAGAGADQAFADAJAAQAIAAAGgDQAHgDADgGQAEgFACgIQACgJAAgKQAAgJgCgIQgBgIgDgGQgFgGgGgDQgGgEgIAAQgIAAgGADg");
	this.shape_55.setTransform(677,23.525);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AAiBHIgHgBIgEgDIgCgEIgVhOIAAgBIAAABIgUBOIgCAEIgEADIgHABIgMAAIgLAAIgHgBIgEgDIgCgEIgjh1IgBgHIgBgEIABgCIADgCIAGgBIAJAAIAJAAIAGABQABAAAAABQABAAAAAAQAAAAAAABQABAAAAAAIABADIAaBfIAAACIABgCIAYhfIABgDIADgCIAGgBIAHAAIAJAAIAGABIACACIACACIAaBgIAAACIAAgCIAZhfIACgDQAAAAAAAAQAAgBABAAQAAAAAAAAQABgBAAAAIAGgBIAJAAIAJAAIAFABIADACIABACIgBAEIgBAHIgjB1IgCAEIgEADIgHABIgLAAIgMAAg");
	this.shape_56.setTransform(658.025,23.525);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgUBJIgMgDIgIgEIgGgDIgCgFIgBgKIAAgGIABgEQABgBAAAAQAAgBAAAAQAAAAABAAQAAAAAAAAIACgBIAFACIAHAEIALAEQAHACAIAAIAIgBIAHgDIADgFQACgDAAgEQAAgEgCgDIgIgGIgJgEIgLgFIgMgFIgKgHQgFgFgDgHQgCgGAAgJQAAgKAEgIQAEgHAGgGQAHgGAKgDQAKgDALAAIAMABIALACIAHADIAFADIACACIABADIAAAEIAAAFIAAAHIgBAEIgBACIgCAAIgEgBIgHgEIgJgDQgGgCgHAAIgIABQgDABgCACQgDACgBADQgBACAAADQgBAFADADQADADAFACIAJAFIAMAEIAMAGQAFADAFAEQAEAEADAHQADAGAAAJQAAALgEAJQgFAIgHAGQgIAGgKADQgLADgKAAIgPgBg");
	this.shape_57.setTransform(634.15,23.525);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AgIBkIgFgBIgDgCIgBgDIAAiBIABgDIADgCIAFgBIAIgBIAJABIAGABIADACIABADIAACBIgBADIgDACIgGABIgJAAIgIAAgAgQhAQgEgFAAgKQAAgLAEgFQAFgEALAAQANAAAEAEQAEAFAAAKQAAALgEAFQgFADgMAAQgLAAgFgDg");
	this.shape_58.setTransform(624.425,20.65);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AAjBmIgGgBIgCgCIgBgCIAAhLQAAgKgCgFQgBgFgDgDQgCgEgFgCQgEgCgGAAQgFgBgHAGQgIAEgHAJIAABYIgBACIgDACIgGABIgJABIgJgBIgGgBIgDgCIAAgCIAAjAIAAgDQABAAAAAAQAAgBAAAAQABAAAAAAQABAAAAgBIAGgBIAJAAIAJAAIAGABIADACIABADIAABIQAJgJAKgFQAIgFALAAQAOAAAJAFQAJAFAGAHQAGAHACALQACAJABAOIAABRIgBACIgEACIgFABIgJABIgJgBg");
	this.shape_59.setTransform(612.75,20.4);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AAABWQgIgCgGgGQgFgFgDgJQgCgKAAgLIAAhCIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgdIABgDIADgCIAGgBIAIAAIAIAAIAGABIADACIABADIAAAdIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgCIACAAIACAAIABADIABAEIAAAGIgBALIgCAEIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_60.setTransform(599.225,21.9);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgOBnIgGgBIgDgCIgBgDIAAhoIgQAAQgDAAgCgEQgBgDAAgJIAAgHIABgEIACgDIADgBIAQAAIAAgLQAAgNADgKQADgKAFgGQAGgIAHgCQAJgEAMAAIALABIAIACIAEACIABADIABAFIABAGIgBAHIgBAFIgBACIgBAAIgCAAIgEgCIgEgBIgGgBQgEAAgCACQgEABgCADQgCADAAAEIgBALIAAALIAYAAIADABIABADIABAEIABAHQgBAJgBADQgCAEgCAAIgYAAIAABoIgBADIgDACIgFABIgIAAIgJAAg");
	this.shape_61.setTransform(583,20.35);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgJgJQgHgKgFgNQgEgNAAgSQAAgPAFgOQAEgOAJgKQAJgKAOgFQANgGAQAAQATAAAMAFQANAFAIAJQAJAJAEAOQAEANAAASQAAAPgFAOQgDAOgKAKQgJAKgNAFQgOAGgQAAQgSAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJACAJQABAIAEAGQADAGAGADQAHADAIAAQAIAAAHgDQAGgDAEgGQADgFACgIQACgJAAgKQAAgJgBgIQgCgIgEgGQgEgGgFgDQgHgEgJAAQgHAAgGADg");
	this.shape_62.setTransform(569.85,23.525);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AAABWQgIgCgGgGQgFgFgDgJQgCgKAAgLIAAhCIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgdIABgDIADgCIAGgBIAIAAIAIAAIAGABIADACIABADIAAAdIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgCIACAAIACAAIABADIABAEIAAAGIgBALIgCAEIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_63.setTransform(549.575,21.9);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgkBEQgJgEgFgIQgGgIgDgJQgCgKAAgPIAAhPIABgDIACgCIAGgBIAJgBIAJABIAFABIAEACIABADIAABIQgBAKACAGQABAGADADQACAEAFACQAEACAFABQAGgBAIgFQAGgFAJgKIAAhVIABgDIADgCIAFgBIAJgBIAJABIAFABIADACIACADIAACBIgCADIgCACIgEABIgIAAIgIAAIgFgBIgDgCIAAgDIAAgPQgLALgLAHQgLAFgMAAQgNABgJgFg");
	this.shape_64.setTransform(536.5,23.65);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgIgJQgJgKgEgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKANgFQAOgGARAAQARAAANAFQANAFAJAJQAIAJAEAOQAEANAAASQAAAPgEAOQgFAOgIAKQgJAKgOAFQgNAGgRAAQgSAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQAEAGAFADQAGADAJAAQAIAAAGgDQAHgDADgGQAEgFACgIQACgJAAgKQAAgJgCgIQgBgIgDgGQgFgGgGgDQgGgEgIAAQgIAAgGADg");
	this.shape_65.setTransform(520.4,23.525);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AggBIIgFgBIgDgCIgBgCIAAiCIAAgDIADgBIAGgBIAHgBIAIABIAEABIACABIABADIAAAQIAKgMIAIgIQAEgCAEgBIAIgCIAFABIAEABIAEABIACABIABABIABADIAAAFIABAIIgBAJIgBAFIgBADIgCABIgDgBIgDgCIgEgBIgFAAIgGABQgDACgDACIgHAHIgHALIAABRIgBACIgDACIgFABIgJABIgKgBg");
	this.shape_66.setTransform(500.95,23.4);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgJgJQgHgKgFgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKANgFQANgGASAAQARAAANAFQANAFAIAJQAJAJAEAOQAEANAAASQAAAPgEAOQgFAOgJAKQgIAKgOAFQgNAGgSAAQgRAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQADAGAHADQAFADAJAAQAIAAAGgDQAGgDAEgGQAEgFACgIQACgJAAgKQAAgJgBgIQgCgIgEgGQgDgGgHgDQgFgEgKAAQgHAAgGADg");
	this.shape_67.setTransform(486.8,23.525);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AAjBmIgFgBIgEgCIgBgCIAAhLQAAgKgBgFQgCgFgCgDQgDgEgEgCQgEgCgFAAQgHgBgHAGQgHAEgHAJIAABYIgBACIgEACIgFABIgJABIgJgBIgFgBIgDgCIgBgCIAAjAIABgDQAAAAAAAAQAAgBABAAQAAAAAAAAQABAAABgBIAFgBIAJAAIAJAAIAFABIAEACIABADIAABIQAJgJAKgFQAIgFALAAQANAAAKAFQAJAFAFAHQAGAHADALQACAJAAAOIAABRIgBACIgDACIgFABIgJABIgJgBg");
	this.shape_68.setTransform(463.95,20.4);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AAABWQgIgCgGgGQgFgFgDgJQgCgKAAgLIAAhCIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgdIABgDIADgCIAGgBIAIAAIAIAAIAGABIADACIABADIAAAdIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgCIACAAIACAAIABADIABAEIAAAGIgBALIgCAEIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_69.setTransform(450.425,21.9);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AggBIIgFgBIgDgCIgBgCIAAiCIAAgDIAEgBIAEgBIAIgBIAIABIAEABIADABIABADIAAAQIAJgMIAIgIQAEgCAEgBIAIgCIAEABIAFABIAEABIACABIABABIABADIAAAFIABAIIgBAJIgBAFIgBADIgCABIgDgBIgDgCIgEgBIgFAAIgGABQgDACgDACIgIAHIgGALIAABRIgBACIgDACIgGABIgJABIgJgBg");
	this.shape_70.setTransform(440.85,23.4);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgeBHQgJgDgGgFQgHgFgDgIQgEgIAAgLQAAgLAFgJQAEgIAJgFQAJgFANgDQANgCARAAIAMAAIAAgIIgBgLQgBgFgDgDQgDgDgFgBQgEgCgGAAQgKAAgHACIgNAFIgJAEIgGACIgDgBIgCgDIgBgEIgBgGIABgIQABgCACgCIAHgFQAFgDAHgCIAPgDQAIgCAIAAQAPAAALADQALADAHAHQAHAGADAKQAEAJAAAOIAABXQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAgBAAQgBABAAAAIgKAAIgJAAQgBAAgBgBQAAAAgBAAQAAAAgBgBQAAAAgBAAIgBgDIAAgLQgIAJgKAFQgLAFgLAAQgLAAgIgDgAgFALQgGABgEADQgEADgCADQgCAEAAAFQAAAIAFAFQAGAFAJAAQAHAAAGgEQAHgEAGgIIAAgWIgOAAQgJAAgFABg");
	this.shape_71.setTransform(427.025,23.525);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AgsBfQgFAAgDgDQgDgDAAgGIAAilQAAgGADgDQADgDAFAAIBeAAIACABIACADIABAEIABAHIgBAHIgBAFIgCADIgCAAIhDAAIAAAvIA5AAIACABIACACIABAFIAAAGIAAAGIgBAFIgCACIgCABIg5AAIAAA2IBEAAIACAAIACADIABAFIAAAHIAAAHIgBAEIgCADIgCABg");
	this.shape_72.setTransform(413.425,21.075);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgJgJQgHgKgFgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKANgFQAOgGAQAAQATAAAMAFQANAFAIAJQAJAJAEAOQAEANAAASQAAAPgEAOQgFAOgJAKQgJAKgNAFQgOAGgRAAQgRAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJACAJQABAIAEAGQADAGAHADQAFADAJAAQAIAAAHgDQAFgDAEgGQAEgFACgIQACgJAAgKQAAgJgBgIQgCgIgEgGQgEgGgGgDQgFgEgKAAQgHAAgGADg");
	this.shape_73.setTransform(390.85,23.525);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AAABWQgIgCgGgGQgFgFgDgJQgCgKAAgLIAAhCIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgdIABgDIADgCIAGgBIAIAAIAIAAIAGABIADACIABADIAAAdIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgCIACAAIACAAIABADIABAEIAAAGIgBALIgCAEIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_74.setTransform(377.675,21.9);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AAjBIIgGgBIgDgCIgBgCIAAhKQAAgKgBgFQgCgFgCgEQgCgEgEgCQgFgCgFAAQgGgBgHAGQgIAFgIAJIAABXIgBACIgCACIgGABIgJABIgJgBIgFgBIgEgCIgBgCIAAiCIABgDIADgBIAFgBIAIgBIAHABIAFABIACABIABADIAAAPQALgMALgGQAKgFANgBQANAAAJAFQAJAFAGAHQAFAHADAKQACAKAAAPIAABQIgBACIgCACIgGABIgJABIgJgBg");
	this.shape_75.setTransform(357.9,23.4);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AAiBHIgHgBIgEgDIgCgEIgVhOIAAgBIAAABIgUBOIgCAEIgEADIgHABIgMAAIgLAAIgHgBIgEgDIgCgEIgjh1IgBgHIgBgEIABgCIADgCIAGgBIAJAAIAJAAIAGABQABAAAAABQABAAAAAAQAAAAAAABQABAAAAAAIABADIAaBfIAAACIABgCIAYhfIABgDIADgCIAGgBIAHAAIAJAAIAGABIACACIACACIAaBgIAAACIAAgCIAZhfIACgDQAAAAAAAAQAAgBABAAQAAAAAAAAQABgBAAAAIAGgBIAJAAIAJAAIAFABIADACIABACIgBAEIgBAHIgjB1IgCAEIgEADIgHABIgLAAIgMAAg");
	this.shape_76.setTransform(338.625,23.525);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgJgJQgHgKgFgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKANgFQANgGASAAQASAAAMAFQANAFAIAJQAJAJAEAOQAEANAAASQAAAPgEAOQgFAOgJAKQgIAKgOAFQgNAGgSAAQgRAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJACAJQABAIAEAGQADAGAHADQAFADAJAAQAIAAAHgDQAFgDAEgGQAEgFACgIQACgJAAgKQAAgJgBgIQgCgIgEgGQgDgGgHgDQgFgEgKAAQgHAAgGADg");
	this.shape_77.setTransform(319.4,23.525);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgjBiQgLgGgGgKQgHgKgDgNQgDgNAAgPQAAgRAEgOQAEgNAHgKQAHgKALgEQAKgGAOAAQAKAAAJAEQAJAFAJAJIAAhHIABgDIADgBIAFgCIAJgBIAJABIAGACIADABIABADIAAC/IgBADIgDACIgEABIgIAAIgHAAIgFgBIgDgCIgBgDIAAgOQgKAKgLAHQgLAFgMAAQgPAAgKgFgAgNgIQgFAEgDAFQgDAFgCAIQgBAHAAAIIABAQQABAHADAHQADAGAFADQAFAEAIAAIAGgBIAIgEIAHgGIAJgKIAAgrQgIgJgHgGQgHgFgHAAQgHAAgGAEg");
	this.shape_78.setTransform(302.925,20.55);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AgTBJIgNgDIgJgEIgEgDIgDgFIgBgKIAAgGIACgEQAAgBAAAAQAAgBAAAAQAAAAABAAQAAAAAAAAIACgBIAFACIAHAEIAMAEQAGACAHAAIAIgBIAIgDIADgFQACgDAAgEQAAgEgDgDIgHgGIgJgEIgMgFIgLgFIgKgHQgEgFgDgHQgDgGAAgJQAAgKAEgIQADgHAHgGQAHgGAKgDQAKgDALAAIAMABIALACIAIADIAEADIACACIABADIABAEIAAAFIAAAHIgBAEIgCACIgCAAIgEgBIgHgEIgJgDQgGgCgHAAIgHABQgFABgBACIgEAFQgCACAAADQAAAFAEADQACADAFACIAJAFIAMAEIALAGQAHADAEAEQAEAEADAHQADAGAAAJQAAALgEAJQgFAIgHAGQgHAGgLADQgLADgLAAIgNgBg");
	this.shape_79.setTransform(282.55,23.525);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AgIBkIgFgBIgDgCIgBgDIAAiBIABgDIADgCIAFgBIAIgBIAJABIAGABIADACIABADIAACBIgBADIgDACIgGABIgJAAIgIAAgAgQhAQgEgFAAgKQAAgLAEgFQAFgEALAAQANAAAEAEQAEAFAAAKQAAALgEAFQgFADgMAAQgLAAgFgDg");
	this.shape_80.setTransform(272.825,20.65);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AgeBHQgJgDgGgFQgHgFgDgIQgEgIAAgLQAAgLAFgJQAEgIAJgFQAJgFANgDQANgCARAAIAMAAIAAgIIgBgLQgBgFgDgDQgDgDgFgBQgEgCgGAAQgKAAgHACIgNAFIgJAEIgGACIgDgBIgCgDIgBgEIgBgGIABgIQABgCACgCIAHgFQAFgDAHgCIAPgDQAIgCAIAAQAPAAALADQALADAHAHQAHAGADAKQAEAJAAAOIAABXQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAgBAAQgBABAAAAIgKAAIgJAAQgBAAgBgBQAAAAgBAAQAAAAgBgBQAAAAgBAAIgBgDIAAgLQgIAJgKAFQgLAFgLAAQgLAAgIgDgAgFALQgGABgEADQgEADgCADQgCAEAAAFQAAAIAFAFQAGAFAJAAQAHAAAGgEQAHgEAGgIIAAgWIgOAAQgJAAgFABg");
	this.shape_81.setTransform(254.575,23.525);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgJgJQgIgJgFgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJANgGQAMgFAPAAQAQAAAMAFQALAFAHAJQAIAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJACAHQABAGAFAFQAEAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAGgBIACAAIABACIABAEIAAAGIAAAGIgBADIAAADIgCACIgFADIgLAEIgPACQgJACgKAAQgQAAgNgFgAgKgsQgFADgDAEQgDAFgCAGQgCAGAAAHIA2AAQAAgQgHgJQgGgJgOAAQgGAAgGADg");
	this.shape_82.setTransform(239.95,23.525);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AgjBiQgLgGgGgKQgHgKgDgNQgDgNAAgPQAAgRAEgOQAEgNAHgKQAHgKALgEQAKgGAOAAQAKAAAJAEQAJAFAJAJIAAhHIABgDIADgBIAFgCIAJgBIAJABIAGACIADABIABADIAAC/IgBADIgDACIgEABIgIAAIgHAAIgFgBIgDgCIgBgDIAAgOQgKAKgLAHQgLAFgMAAQgPAAgKgFgAgNgIQgFAEgDAFQgDAFgCAIQgBAHAAAIIABAQQABAHADAHQADAGAFADQAFAEAIAAIAGgBIAIgEIAHgGIAJgKIAAgrQgIgJgHgGQgHgFgHAAQgHAAgGAEg");
	this.shape_83.setTransform(224.025,20.55);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AgIBkIgFgBIgDgCIgBgDIAAiBIABgDIADgCIAFgBIAIgBIAJABIAGABIADACIABADIAACBIgBADIgDACIgGABIgJAAIgIAAgAgQhAQgEgFAAgKQAAgLAEgFQAFgEALAAQANAAAEAEQAEAFAAAKQAAALgEAFQgFADgMAAQgLAAgFgDg");
	this.shape_84.setTransform(212.675,20.65);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AggBIIgFgBIgDgCIgBgCIAAiCIAAgDIAEgBIAEgBIAIgBIAHABIAGABIACABIABADIAAAQIAJgMIAIgIQAEgCAEgBIAIgCIAEABIAFABIAEABIACABIACABIABADIAAAFIAAAIIAAAJIgBAFIgCADIgCABIgDgBIgDgCIgEgBIgFAAIgGABQgEACgDACIgHAHIgGALIAABRIgBACIgDACIgGABIgJABIgJgBg");
	this.shape_85.setTransform(197.6,23.4);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AgkBEQgJgEgGgIQgFgIgDgJQgDgKABgPIAAhPIABgDIACgCIAGgBIAJgBIAJABIAGABIADACIAAADIAABIQABAKABAGQABAGADADQADAEAEACQAEACAFABQAGgBAIgFQAHgFAIgKIAAhVIABgDIACgCIAGgBIAJgBIAJABIAFABIAEACIABADIAACBIgBADIgDACIgEABIgJAAIgHAAIgFgBIgDgCIAAgDIAAgPQgLALgLAHQgLAFgMAAQgNABgJgFg");
	this.shape_86.setTransform(183.45,23.65);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgIgJQgJgKgEgNQgEgNAAgSQAAgPAFgOQAEgOAJgKQAJgKAOgFQANgGAQAAQASAAANAFQANAFAJAJQAIAJAEAOQAEANAAASQAAAPgFAOQgEAOgIAKQgKAKgNAFQgOAGgQAAQgSAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJACAJQABAIAEAGQAEAGAFADQAHADAIAAQAIAAAHgDQAFgDAFgGQAEgFABgIQACgJAAgKQAAgJgCgIQgBgIgDgGQgFgGgFgDQgHgEgJAAQgHAAgGADg");
	this.shape_87.setTransform(167.35,23.525);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AgaBhIgFgCQAAAAAAAAQgBgBAAAAQAAAAAAgBQgBAAAAgBIABgEIASgsIgDgCIgDgEIgth3IgCgIQAAgBAAgBQAAAAABgBQAAAAAAgBQAAAAABAAQABgCAFgBIALAAIAKAAIAFABQABAAAAABQABAAAAAAQABAAAAABQAAAAABABIACAFIAdBXIABAAIAchZQABgEACgBQAAAAAAAAQABgBAAAAQABAAABAAQAAgBABAAIALAAIALAAQAEABACACQABAAAAABQAAAAABABQAAAAAAABQAAAAAAABIgCAGIgrB/IgPAvQgCADgGACQgFABgLAAIgKAAg");
	this.shape_88.setTransform(152.5,26.125);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AgfBIIgGgBIgDgCIgBgCIAAiCIABgDIACgBIAGgBIAHgBIAHABIAGABIABABIABADIAAAQIAKgMIAIgIQAEgCAEgBIAIgCIAFABIAEABIAEABIADABIABABIAAADIAAAFIABAIIgBAJIAAAFIgBADIgDABIgDgBIgDgCIgEgBIgFAAIgGABQgEACgDACIgGAHIgHALIAABRIgBACIgDACIgFABIgJABIgJgBg");
	this.shape_89.setTransform(134,23.4);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgJANgGQAMgFAOAAQARAAALAFQAMAFAHAJQAIAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJACAHQABAGAFAFQAEAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAHgBIACAAIABACIABAEIAAAGIAAAGIgBADIAAADIgCACIgFADIgLAEIgPACQgJACgKAAQgQAAgNgFgAgJgsQgGADgDAEQgDAFgCAGQgCAGAAAHIA2AAQAAgQgHgJQgGgJgOAAQgHAAgEADg");
	this.shape_90.setTransform(120.35,23.525);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AAjBmIgFgBIgEgCIgBgCIAAhLQAAgKgBgFQgCgFgCgDQgDgEgEgCQgEgCgFAAQgHgBgHAGQgHAEgHAJIAABYIgBACIgEACIgFABIgJABIgJgBIgFgBIgDgCIgBgCIAAjAIABgDQAAAAAAAAQAAgBABAAQAAAAAAAAQABAAABgBIAFgBIAJAAIAJAAIAFABIAEACIABADIAABIQAJgJAKgFQAIgFALAAQANAAAKAFQAJAFAFAHQAGAHADALQACAJAAAOIAABRIgBACIgDACIgFABIgJABIgJgBg");
	this.shape_91.setTransform(104.85,20.4);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AAABWQgIgCgGgGQgFgFgDgJQgCgKAAgLIAAhCIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgdIABgDIADgCIAGgBIAIAAIAIAAIAGABIADACIABADIAAAdIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgCIACAAIACAAIABADIABAEIAAAGIgBALIgCAEIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_92.setTransform(91.325,21.9);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgJANgGQAMgFAOAAQARAAALAFQAMAFAHAJQAIAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJACAHQABAGAFAFQAEAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAHgBIACAAIABACIABAEIAAAGIAAAGIgBADIgBADIgBACIgFADIgLAEIgPACQgJACgKAAQgQAAgNgFgAgJgsQgGADgDAEQgDAFgCAGQgCAGAAAHIA2AAQAAgQgHgJQgGgJgOAAQgHAAgEADg");
	this.shape_93.setTransform(78.95,23.525);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AAjBmIgFgBIgEgCIgBgCIAAhLQAAgKgBgFQgCgFgCgDQgDgEgEgCQgEgCgFAAQgHgBgHAGQgHAEgHAJIAABYIgBACIgEACIgFABIgJABIgJgBIgGgBIgCgCIgBgCIAAjAIABgDQAAAAAAAAQAAgBABAAQAAAAAAAAQABAAAAgBIAGgBIAJAAIAJAAIAFABIAEACIABADIAABIQAJgJAKgFQAIgFALAAQANAAAKAFQAJAFAFAHQAGAHADALQACAJAAAOIAABRIgBACIgDACIgFABIgJABIgJgBg");
	this.shape_94.setTransform(63.45,20.4);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AArBfIgIgBQAAgBgBAAQgBAAAAgBQgBAAAAAAQAAgBAAAAIgDgGIgdh3IgBAAIgcB3IgCAGIgEADIgIABIgNABIgNgBIgIgBQgEgBgBgCIgCgGIgrikIgCgJQABAAAAgBQAAgBAAAAQAAgBAAAAQABgBAAAAQACgCAEAAIAMgBIALABIAGABQABAAAAAAQAAAAABAAQAAABAAAAQAAAAAAABIABAEIAiCQIAiiPIACgEQABgBAAAAQAAgBAAAAQABAAAAAAQABgBABAAIAFgBIAKgBIAMABIAGABIADADIACAEIAkCPIAAAAIAhiPIABgEQAAgBABAAQAAgBAAAAQABAAAAAAQABgBAAAAIAGgBIALgBIAKABIAFACQAAAAABABQAAAAAAABQAAAAAAABQABABAAAAIgCAJIgsCkIgCAGIgFADIgIABIgMABIgOgBg");
	this.shape_95.setTransform(41.75,21.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.log_blurb, new cjs.Rectangle(5.4,0,744.3000000000001,79.2), null);


(lib.graphic_blurb = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgQASQgFgFAAgMQAAgNAFgFQAFgFALAAQAMAAAFAFQAFAFAAAMQAAANgFAFQgFAFgMAAQgMAAgEgFg");
	this.shape.setTransform(623.725,67.075);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgJgJQgIgJgFgOQgEgNAAgTQAAgQAEgOQAFgOAIgKQAJgJANgGQAMgFAPAAQAQAAALAFQAMAFAHAJQAIAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJACAHQABAGAFAFQAEAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAGgBIACAAIABACIABAEIAAAGIAAAGIgBADIAAADIgCACIgFADIgLAEIgPACQgJACgKAAQgQAAgNgFgAgKgsQgFADgDAEQgDAFgCAGQgCAGAAAHIA2AAQAAgQgHgJQgGgJgOAAQgHAAgFADg");
	this.shape_1.setTransform(612.1,62.125);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgCBmQgGgBgFgDQgFgCgFgFQgFgEgFgGIAAAOIgBADIgDACIgFABIgHAAIgIAAIgEgBIgDgCIgBgDIAAi/IABgDQAAAAABAAQAAgBAAAAQABAAAAAAQABgBAAAAIAGgBIAJgBIAJABIAFABIADACIABADIAABIIAKgJIAKgFIAJgEIALgBQAPAAAKAGQAKAGAHAKQAGAJADANQADANAAAOQAAASgEAOQgEANgHAKQgHAKgLAFQgKAGgNAAQgHAAgFgCgAgFgKIgHADIgIAHIgIAJIAAArQAIAKAHAFQAHAFAHAAQAHAAAFgDQAFgEADgGQAEgGABgHIACgPQAAgJgCgHQgBgIgDgGQgDgFgFgEQgFgDgHAAIgHABg");
	this.shape_2.setTransform(596.925,59.125);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgIBkIgFgBIgDgCIgBgDIAAiBIABgDIADgCIAFgBIAIgBIAJABIAGABIADACIABADIAACBIgBADIgDACIgGABIgJAAIgIAAgAgQhAQgEgFAAgKQAAgLAEgFQAFgEALAAQANAAAEAEQAEAFAAAKQAAALgEAFQgFAEgMgBQgLABgFgEg");
	this.shape_3.setTransform(584.825,59.25);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgLBHIgIgBIgEgDIgCgEIgnh1IgCgFIAAgEIgBgCIABgCIADgCIAGgBIAJAAIAJAAIAGABIADACIACADIAcBfIABAEIABgEIAdhfIACgDIADgCIAFgBIAJAAIAJAAIAGABIACACIABACIAAACIAAADIgBACIgBAEIgnB1IgCAEIgEADIgIABIgNAAIgLAAg");
	this.shape_4.setTransform(574.025,62.125);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgfBIIgGgBIgDgCIgBgCIAAiCIABgDIADgBIAFgBIAHgBIAHABIAGABIABABIABADIAAAQIAKgMIAIgHQAEgDAEgCIAIgBIAEABIAFAAIAEACIADABIABACIABACIAAAFIAAAIIAAAJIgBAFIgBACIgDACIgDgBIgDgCIgEgBIgFAAIgGABQgDABgEADIgGAHIgHALIAABRIgBACIgDACIgFABIgJAAIgJAAg");
	this.shape_5.setTransform(555.55,62);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgkBEQgJgFgGgHQgFgIgDgKQgCgJgBgPIAAhPIABgDIAEgCIAFgBIAJgBIAJABIAGABIACACIABADIAABIQABALABAFQABAGADADQACAEAFACQAEADAGAAQAGAAAGgGQAIgFAIgKIAAhVIAAgDIADgCIAGgBIAJgBIAJABIAGABIADACIAAADIAACBIAAADIgDACIgFABIgIAAIgHAAIgFgBIgCgCIgBgDIAAgPQgLALgLAHQgLAFgMAAQgNABgJgFg");
	this.shape_6.setTransform(541.4,62.25);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgJgJQgHgKgFgNQgEgNAAgSQAAgPAFgOQAEgOAJgKQAJgKAOgFQANgGAQAAQATAAAMAFQANAFAIAJQAJAJAEAOQAEANAAASQAAAPgFAOQgDAOgKAKQgJAKgNAFQgOAGgRAAQgRAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJACAJQABAIAEAGQADAGAGADQAHADAIAAQAIAAAHgDQAGgDAEgGQADgFACgIQACgJAAgKQAAgJgBgIQgCgIgEgGQgEgGgFgDQgHgEgJAAQgHAAgGADg");
	this.shape_7.setTransform(525.3,62.125);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgaBhIgEgCQgBAAAAAAQgBgBAAAAQAAAAAAgBQgBAAAAgBIACgEIARgsIgEgCIgCgEIgth3IgCgIQAAgBAAgBQAAAAAAgBQABAAAAgBQAAAAABAAQABgCAFgBIALAAIAKAAIAFABQABAAAAABQABAAAAAAQABAAAAABQAAAAABABIACAFIAdBXIABAAIAchZQABgEACgBQAAAAAAAAQABgBAAAAQABAAABAAQAAgBABAAIAMAAIAKAAQAEABACACQAAAAABABQAAAAAAABQABAAAAABQAAAAAAABIgBAGIgsB/IgPAvQgCADgGACQgFABgLAAIgKAAg");
	this.shape_8.setTransform(510.45,64.725);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAjBmIgGgBIgCgCIgBgCIAAhLQAAgJgCgGQgBgFgDgDQgDgEgEgCQgEgDgGABQgFAAgHAEQgIAFgIAJIAABYIAAACIgDACIgGABIgJAAIgJAAIgGgBIgDgCIAAgCIAAjAIAAgDQABAAAAAAQAAgBAAAAQABAAAAAAQABAAAAAAIAGgCIAJAAIAJAAIAGACIADABIAAADIAABIQAKgJAKgFQAJgFAKAAQAOAAAJAFQAJAFAGAHQAGAHACALQACAJABAPIAABQIgBACIgEACIgFABIgJAAIgJAAg");
	this.shape_9.setTransform(488.55,59);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgRBFQgLgFgJgIQgHgKgEgNQgEgNAAgRQAAgTAEgOQAFgPAJgJQAJgJAMgFQAMgFAOAAIALABIAKAEQAGABADACIAGAEIACADIABADIAAAEIAAAGIgBANQAAAAAAABQgBAAAAABQgBAAAAAAQgBAAAAAAQgDAAgDgBIgHgFIgJgEQgFgCgHAAQgOAAgHALQgHAKAAAVQgBALACAIQACAHAEAGQADAGAGADQAFACAHAAQAIAAAGgCIAJgGIAHgEQABgBAAAAQABgBAAAAQABAAAAAAQABAAABAAIACAAIABADIABAFIAAAHIAAAHIgBAFIgBACIgBADIgHAEIgKAEIgLAEIgNABQgOAAgMgFg");
	this.shape_10.setTransform(474.3,62.1);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAABWQgIgCgGgGQgFgGgDgIQgCgKAAgMIAAhBIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgeIABgCIADgCIAGgBIAIAAIAIAAIAGABIADACIABACIAAAeIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgBIACgBIACABIABACIABAEIAAAGIgBAKIgCAFIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_11.setTransform(462.875,60.5);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgeBHQgJgDgGgFQgHgFgDgIQgEgIAAgLQAAgLAFgJQAEgIAJgFQAJgFANgDQANgCARAAIAMAAIAAgIIgBgLQgBgFgDgDQgDgDgFgBQgEgCgGAAQgKAAgHACIgNAFIgJAEIgGACIgDgBIgCgDIgBgEIgBgGIABgIQABgCACgCIAHgFQAFgDAHgCIAPgDQAIgCAIAAQAPAAALADQALADAHAHQAHAGADAKQAEAJAAAOIAABXQAAAAAAABQAAAAgBAAQAAABAAAAQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAgBAAQgBABAAAAIgKAAIgJAAQgBAAgBgBQAAAAgBAAQAAAAgBgBQAAAAgBAAIgBgDIAAgLQgIAJgKAFQgLAFgLAAQgLAAgIgDgAgFALQgGABgEADQgEADgCADQgCAEAAAFQAAAIAFAFQAGAFAJAAQAHAAAGgEQAHgEAGgIIAAgWIgOAAQgJAAgFABg");
	this.shape_12.setTransform(450.425,62.125);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("ABNBIIgGgBIgDgCIgBgCIAAhNIgBgMQgBgFgDgEQgDgEgEgCQgDgDgGABQgGAAgHAEQgHAGgIAJIAABXIgBACIgCACIgGABIgJAAIgIAAIgFgBIgEgCIgBgCIAAhNIgBgMQgBgFgCgEQgDgEgEgCQgEgDgFABQgHAAgHAEQgGAGgIAJIAABXIgBACIgDACIgFABIgJAAIgJAAIgGgBIgDgCIgBgCIAAiCIABgDIACgBIAGgBIAHgBIAHABIAGABIABABIABADIAAAPQALgMALgGQALgFALgBQAJAAAGADQAGABAGADQAEADAEAFIAGAJIALgKIALgIIALgEIALgCQAOAAAIAFQAJAFAGAHQAFAHACAKQADALAAALIAABTIgBACIgDACIgFABIgJAAIgJAAg");
	this.shape_13.setTransform(431.25,62);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgTBJIgNgDIgJgEIgEgDIgDgFIgBgKIAAgGIACgEQAAgBAAAAQAAgBAAAAQAAAAABAAQAAAAAAAAIACgBIAFACIAHAEIAMAEQAGACAHAAIAIgBIAIgDIADgFQACgDAAgEQAAgEgDgDIgHgGIgJgEIgMgFIgLgFIgKgHQgEgFgDgHQgDgGAAgJQAAgKAEgIQADgHAHgGQAHgGAKgDQAKgDALAAIAMABIALACIAIADIAEADIACACIABADIABAEIAAAFIAAAHIgBAEIgCACIgCAAIgEgBIgHgEIgJgDQgGgCgHAAIgHABQgFABgBACQgDACgBADQgCACAAADQAAAFAEADQACADAFACIAJAFIAMAEIALAGQAHADAEAEQAEAEADAHQADAGAAAJQAAALgEAJQgFAIgHAGQgHAGgLADQgLADgLAAIgNgBg");
	this.shape_14.setTransform(406.3,62.125);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgaBhIgEgCQgBAAAAAAQgBgBAAAAQAAAAAAgBQgBAAAAgBIABgEIASgsIgEgCIgCgEIgth3IgCgIQAAgBAAgBQAAAAAAgBQABAAAAgBQAAAAABAAQACgCAEgBIALAAIAKAAIAFABQABAAAAABQABAAAAAAQABAAAAABQAAAAABABIACAFIAdBXIABAAIAchZQABgEACgBQAAAAAAAAQABgBAAAAQABAAABAAQAAgBABAAIAMAAIAKAAQAEABACACQABAAAAABQAAAAAAABQABAAAAABQAAAAAAABIgCAGIgrB/IgPAvQgCADgGACQgFABgLAAIgKAAg");
	this.shape_15.setTransform(393.35,64.725);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgeBHQgJgDgGgFQgHgFgDgIQgEgIAAgLQAAgLAFgJQAEgIAJgFQAJgFANgDQANgCARAAIAMAAIAAgIIgBgLQgBgFgDgDQgDgDgFgBQgEgCgGAAQgKAAgHACIgNAFIgJAEIgGACIgDgBIgCgDIgBgEIgBgGIABgIQABgCACgCIAHgFQAFgDAHgCIAPgDQAIgCAIAAQAPAAALADQALADAHAHQAHAGADAKQAEAJAAAOIAABXQAAAAAAABQAAAAgBAAQAAABAAAAQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAgBAAQgBABAAAAIgKAAIgJAAQgBAAgBgBQAAAAgBAAQAAAAgBgBQAAAAgBAAIgBgDIAAgLQgIAJgKAFQgLAFgLAAQgLAAgIgDgAgFALQgGABgEADQgEADgCADQgCAEAAAFQAAAIAFAFQAGAFAJAAQAHAAAGgEQAHgEAGgIIAAgWIgOAAQgJAAgFABg");
	this.shape_16.setTransform(379.025,62.125);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AAiBHIgHgBIgEgDIgCgEIgVhOIAAgBIAAABIgUBOIgCAEIgEADIgHABIgMAAIgLAAIgHgBIgEgDIgCgEIgjh1IgBgHIgBgEIABgCIADgCIAGgBIAJAAIAJAAIAGABQABAAAAABQABAAAAAAQAAAAAAABQABAAAAAAIABADIAaBfIAAACIABgCIAYhfIABgDIADgCIAGgBIAHAAIAJAAIAGABIACACIACACIAaBgIAAACIAAgCIAZhfIACgDQAAAAAAAAQAAgBABAAQAAAAAAAAQABgBAAAAIAGgBIAJAAIAJAAIAFABIADACIABACIgBAEIgBAHIgjB1IgCAEIgEADIgHABIgLAAIgMAAg");
	this.shape_17.setTransform(361.125,62.125);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgIBmIgFgBIgEgCIgBgCIAAjAIABgDQABAAAAAAQAAgBAAAAQABAAAAAAQABAAABAAIAFgCIAIAAIAJAAIAGACIACABIABADIAADAIgBACIgCACIgGABIgJAAIgIAAg");
	this.shape_18.setTransform(346.3,59);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgeBHQgJgDgGgFQgHgFgDgIQgEgIAAgLQAAgLAFgJQAEgIAJgFQAJgFANgDQANgCARAAIAMAAIAAgIIgBgLQgBgFgDgDQgDgDgFgBQgEgCgGAAQgKAAgHACIgNAFIgJAEIgGACIgDgBIgCgDIgBgEIgBgGIABgIQABgCACgCIAHgFQAFgDAHgCIAPgDQAIgCAIAAQAPAAALADQALADAHAHQAHAGADAKQAEAJAAAOIAABXQAAAAAAABQAAAAgBAAQAAABAAAAQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAgBAAQgBABAAAAIgKAAIgJAAQgBAAgBgBQAAAAgBAAQAAAAgBgBQAAAAgBAAIgBgDIAAgLQgIAJgKAFQgLAFgLAAQgLAAgIgDgAgFALQgGABgEADQgEADgCADQgCAEAAAFQAAAIAFAFQAGAFAJAAQAHAAAGgEQAHgEAGgIIAAgWIgOAAQgJAAgFABg");
	this.shape_19.setTransform(334.825,62.125);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgIBmIgGgBIgCgCIgBgCIAAjAIABgDQAAAAAAAAQAAgBABAAQAAAAAAAAQABAAAAAAIAGgCIAIAAIAJAAIAFACIAEABIABADIAADAIgBACIgEACIgFABIgJAAIgIAAg");
	this.shape_20.setTransform(317.35,59);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgIBmIgGgBIgDgCIAAgCIAAjAIAAgDQABAAAAAAQAAgBAAAAQABAAAAAAQABAAAAAAIAGgCIAIAAIAJAAIAGACIADABIABADIAADAIgBACIgDACIgGABIgJAAIgIAAg");
	this.shape_21.setTransform(310,59);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgIBkIgFgBIgDgCIgBgDIAAiBIABgDIADgCIAFgBIAIgBIAJABIAGABIADACIABADIAACBIgBADIgDACIgGABIgJAAIgIAAgAgQhAQgEgFAAgKQAAgLAEgFQAFgEALAAQANAAAEAEQAEAFAAAKQAAALgEAFQgFAEgMgBQgLABgFgEg");
	this.shape_22.setTransform(302.625,59.25);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AAiBHIgHgBIgEgDIgCgEIgVhOIAAgBIAAABIgUBOIgCAEIgEADIgHABIgMAAIgLAAIgHgBIgEgDIgCgEIgjh1IgBgHIgBgEIABgCIADgCIAGgBIAJAAIAJAAIAGABQABAAAAABQABAAAAAAQAAAAAAABQABAAAAAAIABADIAaBfIAAACIABgCIAYhfIABgDIADgCIAGgBIAHAAIAJAAIAGABIACACIACACIAaBgIAAACIAAgCIAZhfIACgDQAAAAAAAAQAAgBABAAQAAAAAAAAQABgBAAAAIAGgBIAJAAIAJAAIAFABIADACIABACIgBAEIgBAHIgjB1IgCAEIgEADIgHABIgLAAIgMAAg");
	this.shape_23.setTransform(287.775,62.125);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgUBJIgMgDIgJgEIgEgDIgDgFIgBgKIAAgGIABgEQABgBAAAAQAAgBAAAAQAAAAABAAQAAAAAAAAIACgBIAFACIAHAEIALAEQAHACAIAAIAIgBIAHgDIADgFQACgDAAgEQAAgEgDgDIgHgGIgJgEIgLgFIgMgFIgKgHQgEgFgDgHQgDgGAAgJQAAgKAEgIQAEgHAGgGQAHgGAKgDQAKgDALAAIAMABIALACIAIADIAEADIACACIABADIAAAEIAAAFIAAAHIgBAEIgBACIgCAAIgEgBIgHgEIgJgDQgGgCgHAAIgIABQgDABgCACQgDACgBADQgBACgBADQAAAFADADQADADAFACIAJAFIAMAEIAMAGQAFADAFAEQAEAEADAHQADAGAAAJQAAALgEAJQgEAIgIAGQgIAGgKADQgLADgKAAIgPgBg");
	this.shape_24.setTransform(263.9,62.125);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AAjBIIgFgBIgDgCIgCgCIAAhKQAAgJgBgGQgBgFgDgEQgDgEgEgCQgEgDgGABQgGAAgHAEQgHAGgHAJIAABXIgBACIgEACIgFABIgJAAIgJAAIgGgBIgCgCIgBgCIAAiCIAAgDIADgBIAFgBIAHgBIAIABIAFABIACABIABADIAAAPQALgMALgGQAKgFAMgBQAOAAAJAFQAJAFAFAHQAHAHACAKQADALAAAOIAABQIgCACIgDACIgFABIgJAAIgJAAg");
	this.shape_25.setTransform(249.85,62);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgfBgQgMgDgHgEQgIgFgDgHQgEgGAAgIQAAgFABgEQACgFACgDIAGgIIAIgIQgHgCgDgHQgDgFAAgHQAAgJADgGQAFgHAGgFQgFgGgDgHQgEgHAAgLQAAgLAFgKQAEgJAHgGQAHgGAKgDQAKgDAMAAIALAAIAKACIApAAQADAAACAEIABALQAAAGgBAEQgCADgDAAIgOAAQADAEABAEQABAFAAAEQAAAMgDAJQgEAJgHAGQgHAGgKADQgKADgMAAIgMgCIgJgDIgDAEQgCADAAACQABAEAEAEQADACAHAAIAfABQALABAJADQAIACAGAGQAGAEADAHQAEAHAAAJQgBAJgEAJQgEAIgIAHQgJAGgNAEQgNADgQABQgRgBgLgCgAgXAtIgEAEIgCAFIgBAEQAAAHAIAFQAHADAOAAQAHAAAGgBQAGgCADgDQAEgCABgEQACgDAAgEQgBgHgFgDQgFgEgJgBIgZAAIgGAGgAgMhGQgEACgDADQgCADgCAEIgBAJQAAAKAFAGQAHAGAKAAQAEAAAEgDQAFgBACgDIAFgHIABgJQAAgKgGgGQgGgGgKAAQgFAAgEACg");
	this.shape_26.setTransform(234.55,64.65);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgIBkIgFgBIgDgCIgBgDIAAiBIABgDIADgCIAFgBIAIgBIAJABIAGABIADACIABADIAACBIgBADIgDACIgGABIgJAAIgIAAgAgQhAQgEgFAAgKQAAgLAEgFQAFgEALAAQANAAAEAEQAEAFAAAKQAAALgEAFQgFAEgMgBQgLABgFgEg");
	this.shape_27.setTransform(223.875,59.25);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgUBJIgLgDIgKgEIgFgDIgCgFIgBgKIAAgGIABgEQABgBAAAAQAAgBAAAAQAAAAABAAQAAAAAAAAIACgBIAFACIAIAEIAKAEQAHACAIAAIAIgBIAHgDIAEgFQABgDAAgEQAAgEgCgDIgIgGIgJgEIgLgFIgMgFIgKgHQgFgFgDgHQgCgGAAgJQAAgKAEgIQAEgHAGgGQAHgGAKgDQAKgDALAAIAMABIALACIAHADIAFADIACACIABADIAAAEIAAAFIAAAHIgBAEIgBACIgCAAIgEgBIgHgEIgJgDQgGgCgHAAIgIABQgDABgCACQgDACgBADQgBACgBADQAAAFADADQADADAFACIAJAFIAMAEIAMAGQAFADAFAEQAEAEADAHQADAGAAAJQAAALgEAJQgFAIgHAGQgIAGgKADQgKADgLAAIgPgBg");
	this.shape_28.setTransform(214.3,62.125);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgJAMgGQANgFAOAAQARAAALAFQAMAFAHAJQAIAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQABAJABAHQADAGAEAFQAEAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAHgBIABAAIACACIABAEIAAAGIAAAGIgBADIgBADIgBACIgFADIgLAEIgPACQgJACgJAAQgRAAgNgFgAgJgsQgGADgDAEQgEAFgCAGQgBAGgBAHIA2AAQABgQgHgJQgGgJgPAAQgFAAgFADg");
	this.shape_29.setTransform(200.65,62.125);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgjBiQgLgGgGgKQgHgKgDgNQgDgNAAgPQAAgRAEgOQAEgNAHgKQAHgKALgFQAKgFAOAAQAKAAAJAEQAJAFAJAJIAAhHIABgDIADgCIAFgBIAJgBIAJABIAGABIADACIABADIAAC/IgBADIgDACIgEABIgIAAIgHAAIgFgBIgDgCIgBgDIAAgOQgKAKgLAHQgLAFgMAAQgPAAgKgFgAgNgIQgFADgDAGQgDAFgCAIQgBAHAAAIIABAQQABAHADAHQADAGAFADQAFAEAIAAIAGgBIAIgEIAHgGIAJgKIAAgrQgIgJgHgFQgHgGgHAAQgHAAgGAEg");
	this.shape_30.setTransform(184.725,59.15);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AggBIIgFgBIgDgCIgBgCIAAiCIAAgDIAEgBIAEgBIAIgBIAIABIAFABIACABIABADIAAAQIAJgMIAIgHQAEgDAEgCIAIgBIAEABIAFAAIAEACIACABIACACIABACIAAAFIAAAIIAAAJIgBAFIgCACIgCACIgDgBIgDgCIgEgBIgFAAIgGABQgEABgDADIgHAHIgGALIAABRIgBACIgDACIgGABIgJAAIgJAAg");
	this.shape_31.setTransform(165.65,62);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgkBEQgJgFgGgHQgFgIgDgKQgDgJABgPIAAhPIAAgDIADgCIAGgBIAJgBIAJABIAGABIADACIAAADIAABIQABALABAFQABAGADADQADAEAEACQAEADAFAAQAGAAAIgGQAHgFAIgKIAAhVIABgDIACgCIAGgBIAJgBIAJABIAFABIAEACIABADIAACBIgBADIgDACIgEABIgJAAIgHAAIgFgBIgDgCIAAgDIAAgPQgLALgLAHQgLAFgMAAQgNABgJgFg");
	this.shape_32.setTransform(151.5,62.25);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgIgJQgJgKgEgNQgEgNAAgSQAAgPAFgOQAEgOAJgKQAJgKAOgFQANgGAQAAQASAAANAFQANAFAJAJQAIAJAEAOQAEANAAASQAAAPgFAOQgEAOgIAKQgKAKgNAFQgOAGgQAAQgSAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJACAJQABAIAEAGQAEAGAFADQAHADAIAAQAIAAAHgDQAFgDAFgGQAEgFABgIQACgJAAgKQAAgJgCgIQgBgIgDgGQgFgGgFgDQgHgEgJAAQgHAAgGADg");
	this.shape_33.setTransform(135.4,62.125);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgXAqIgEgBIgBgCIAAgDIASgnIAAgXIABgIQACgDACgCQADgCACAAIAKgBIAIABQAEAAADACIADAFIABAIIgBAKIgBAJIgEAIIgFAIIgTAcIgCADIgDABIgEABIgGABIgHgBg");
	this.shape_34.setTransform(727.725,30.575);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgJgJQgIgJgFgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJANgGQAMgFAPAAQAQAAAMAFQALAFAHAJQAIAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJACAHQACAGADAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAFgBIADAAIABACIABAEIAAAGIAAAGIAAADIgBADIgCACIgFADIgLAEIgPACQgJACgKAAQgPAAgOgFgAgKgsQgFADgDAEQgDAFgCAGQgCAGAAAHIA2AAQAAgQgHgJQgHgJgNAAQgGAAgGADg");
	this.shape_35.setTransform(716.85,23.525);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AggBIIgFgBIgDgCIgBgCIAAiCIAAgDIAEgBIAEgBIAIgBIAIABIAEABIADABIABADIAAAQIAJgMIAIgIQAEgCAEgBIAIgCIAEABIAFABIAEABIACABIABABIACADIAAAFIAAAIIAAAJIgCAFIgBADIgCABIgDgBIgDgCIgEgBIgFAAIgGABQgEACgDACIgHAHIgGALIAABRIgBACIgDACIgGABIgJABIgJgBg");
	this.shape_36.setTransform(705.1,23.4);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgkBEQgJgEgGgIQgFgIgDgJQgDgKABgPIAAhPIABgDIACgCIAGgBIAJgBIAJABIAFABIAEACIABADIAABIQgBAKACAGQABAGADADQACAEAFACQAEACAFABQAGgBAIgFQAGgFAJgKIAAhVIABgDIACgCIAGgBIAJgBIAJABIAFABIAEACIABADIAACBIgBADIgDACIgEABIgIAAIgIAAIgFgBIgDgCIAAgDIAAgPQgLALgLAHQgLAFgMAAQgNABgJgFg");
	this.shape_37.setTransform(690.95,23.65);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AAABWQgIgCgGgGQgFgFgDgJQgCgKAAgLIAAhCIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgdIABgDIADgCIAGgBIAIAAIAIAAIAGABIADACIABADIAAAdIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgCIACAAIACAAIABADIABAEIAAAGIgBALIgCAEIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_38.setTransform(677.525,21.9);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgkBEQgJgEgFgIQgHgIgCgJQgDgKAAgPIAAhPIABgDIAEgCIAFgBIAJgBIAJABIAFABIADACIABADIAABIQAAAKACAGQABAGADADQADAEAEACQAEACAGABQAFgBAHgFQAHgFAJgKIAAhVIAAgDIAEgCIAFgBIAJgBIAJABIAGABIACACIABADIAACBIgBADIgCACIgFABIgIAAIgHAAIgFgBIgCgCIgBgDIAAgPQgLALgLAHQgKAFgMAAQgOABgJgFg");
	this.shape_39.setTransform(664.45,23.65);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgPBnIgFgBIgDgCIgBgDIAAhoIgRAAQgCAAgBgEQgCgDAAgJIABgHIABgEIABgDIADgBIAQAAIAAgLQAAgNADgKQACgKAGgGQAFgIAIgCQAJgEAMAAIALABIAIACIAEACIABADIABAFIABAGIgBAHIgBAFIAAACIgCAAIgDAAIgDgCIgEgBIgGgBQgEAAgDACQgCABgCADQgCADgBAEIgBALIAAALIAYAAIACABIACADIABAEIABAHQAAAJgCADQgBAEgDAAIgYAAIAABoIgBADIgDACIgGABIgIAAIgJAAg");
	this.shape_40.setTransform(652,20.35);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgJANgGQAMgFAOAAQARAAALAFQAMAFAHAJQAIAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJABAHQACAGAFAFQAEAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAHgBIABAAIACACIABAEIAAAGIAAAGIgBADIgBADIgBACIgFADIgLAEIgPACQgJACgKAAQgPAAgOgFgAgJgsQgGADgDAEQgEAFgCAGQgBAGAAAHIA1AAQABgQgHgJQgGgJgOAAQgHAAgEADg");
	this.shape_41.setTransform(632.55,23.525);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AAjBmIgFgBIgDgCIgCgCIAAhLQAAgKgBgFQgBgFgDgDQgDgEgEgCQgEgCgGAAQgGgBgHAGQgHAEgHAJIAABYIgBACIgEACIgFABIgJABIgJgBIgGgBIgCgCIgBgCIAAjAIABgDQAAAAAAAAQAAgBABAAQAAAAAAAAQABAAAAgBIAGgBIAJAAIAJAAIAFABIAEACIABADIAABIQAJgJAKgFQAIgFALAAQANAAAKAFQAJAFAFAHQAHAHACALQADAJAAAOIAABRIgCACIgDACIgFABIgJABIgJgBg");
	this.shape_42.setTransform(617.05,20.4);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AAABWQgIgCgGgGQgFgFgDgJQgCgKAAgLIAAhCIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgdIABgDIADgCIAGgBIAIAAIAIAAIAGABIADACIABADIAAAdIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgCIACAAIACAAIABADIABAEIAAAGIgBALIgCAEIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_43.setTransform(603.525,21.9);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgIgJQgJgKgEgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKANgFQANgGASAAQASAAAMAFQANAFAIAJQAJAJAEAOQAEANAAASQAAAPgEAOQgFAOgJAKQgIAKgOAFQgNAGgSAAQgRAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQADAGAHADQAFADAJAAQAIAAAGgDQAHgDADgGQAEgFACgIQACgJAAgKQAAgJgBgIQgCgIgEgGQgDgGgHgDQgGgEgIAAQgIAAgGADg");
	this.shape_44.setTransform(583.65,23.525);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AAABWQgIgCgGgGQgFgFgDgJQgCgKAAgLIAAhCIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgdIABgDIADgCIAGgBIAIAAIAIAAIAGABIADACIABADIAAAdIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgCIACAAIACAAIABADIABAEIAAAGIgBALIgCAEIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_45.setTransform(570.475,21.9);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgfBgQgMgDgHgEQgIgFgEgGQgDgHAAgIQAAgFABgEQABgFADgDIAGgJIAIgHQgGgCgEgHQgDgFAAgHQAAgJADgGQAEgHAHgFQgFgGgEgHQgCgHAAgLQAAgLADgKQAFgJAHgGQAHgGAKgDQAKgDAMgBIALABIAKACIApAAQADAAACAEIABALQAAAGgCAEQAAABAAAAQgBABAAAAQgBABAAAAQgBAAgBAAIgPAAQAEADABAFQABAFAAAEQAAAMgDAJQgFAIgHAHQgGAGgLADQgJADgMAAQgGAAgGgCIgIgDIgEAFQgBACgBACQAAAFAFADQADACAHAAIAeABQAMABAIADQAKACAFAGQAGAEADAHQADAHAAAJQABAJgFAJQgEAIgIAHQgJAGgNAEQgMADgRABQgRgBgLgCgAgXAtIgEAEIgCAFIAAAEQAAAHAHAFQAIADANAAQAHAAAGgBQAFgCAEgDQADgDACgDQABgEAAgDQAAgHgEgDQgGgEgJgBIgaAAIgFAGgAgMhGQgEACgDADQgDADgBAEIgBAJQAAAKAFAGQAHAFAKABQAFAAADgCQAFgCADgDIADgHIACgJQAAgKgGgGQgGgGgJAAQgGAAgEACg");
	this.shape_46.setTransform(551.5,26.05);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AAjBIIgFgBIgDgCIgCgCIAAhKQAAgKgBgFQgBgFgDgEQgDgEgEgCQgEgCgGAAQgGgBgHAGQgHAFgHAJIAABXIgBACIgEACIgFABIgJABIgJgBIgGgBIgCgCIgBgCIAAiCIAAgDIADgBIAFgBIAHgBIAIABIAFABIACABIABADIAAAPQALgMALgGQAKgFAMgBQANAAAKAFQAJAFAFAHQAHAHACAKQADAKAAAPIAABQIgCACIgDACIgFABIgJABIgJgBg");
	this.shape_47.setTransform(536.5,23.4);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgIBkIgFgBIgDgCIgBgDIAAiBIABgDIADgCIAFgBIAIgBIAJABIAGABIADACIABADIAACBIgBADIgDACIgGABIgJAAIgIAAgAgQhAQgEgFAAgKQAAgLAEgFQAFgEALAAQANAAAEAEQAEAFAAAKQAAALgEAFQgFADgMAAQgLAAgFgDg");
	this.shape_48.setTransform(524.725,20.65);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AAgBmIgGgBIgEgCIgCgDIgrhFIAABGIgBACIgDACIgFABIgJABIgJgBIgGgBIgDgCIgBgCIAAjAIABgDQAAAAABAAQAAgBAAAAQABAAAAAAQABAAAAgBIAGgBIAJAAIAJAAIAFABIADACIABADIAABxIAmgzIACgDIAEgBIAGgBIAJgBIAKABIAGABIADABIABADIgBAFIgEAFIgmAqIAsBFIADAFIABAEIgBACIgDACIgGABIgJABIgKgBg");
	this.shape_49.setTransform(514.575,20.4);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgJgJQgIgKgEgNQgEgNAAgSQAAgPAFgOQAEgOAJgKQAJgKAOgFQANgGAQAAQASAAANAFQANAFAJAJQAIAJAEAOQAEANAAASQAAAPgFAOQgEAOgIAKQgKAKgNAFQgOAGgQAAQgSAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJACAJQABAIAEAGQAEAGAFADQAHADAIAAQAIAAAHgDQAFgDAFgGQAEgFABgIQACgJAAgKQAAgJgCgIQgBgIgDgGQgFgGgFgDQgHgEgIAAQgIAAgGADg");
	this.shape_50.setTransform(498.55,23.525);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgIgJQgJgKgEgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKANgFQANgGASAAQASAAAMAFQANAFAIAJQAJAJAEAOQAEANAAASQAAAPgEAOQgFAOgJAKQgIAKgOAFQgNAGgSAAQgRAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQADAGAHADQAFADAJAAQAIAAAGgDQAHgDADgGQAFgFABgIQACgJAAgKQAAgJgBgIQgCgIgEgGQgDgGgHgDQgGgEgIAAQgIAAgGADg");
	this.shape_51.setTransform(482.4,23.525);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgIBmIgFgBIgDgCIgCgCIAAjAIACgDQAAAAAAAAQAAgBABAAQAAAAAAAAQABAAABgBIAFgBIAIAAIAJAAIAFABIADACIACADIAADAIgCACIgDACIgFABIgJABIgIgBg");
	this.shape_52.setTransform(470.7,20.4);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AggBIIgFgBIgDgCIgBgCIAAiCIAAgDIADgBIAFgBIAIgBIAIABIAEABIACABIACADIAAAQIAJgMIAIgIQAEgCAEgBIAIgCIAFABIAEABIAEABIACABIABABIABADIAAAFIABAIIgBAJIgBAFIgBADIgCABIgDgBIgDgCIgEgBIgFAAIgGABQgDACgDACIgHAHIgHALIAABRIgBACIgDACIgGABIgJABIgJgBg");
	this.shape_53.setTransform(455.6,23.4);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgIgJQgJgKgEgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKANgFQANgGASAAQASAAAMAFQANAFAIAJQAJAJAEAOQAEANAAASQAAAPgEAOQgFAOgJAKQgIAKgOAFQgNAGgSAAQgRAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQADAGAHADQAFADAJAAQAIAAAGgDQAHgDADgGQAEgFACgIQACgJAAgKQAAgJgBgIQgCgIgEgGQgDgGgHgDQgGgEgIAAQgIAAgGADg");
	this.shape_54.setTransform(441.45,23.525);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgRBFQgLgFgJgIQgIgKgDgNQgFgOAAgQQAAgTAGgOQAEgOAJgKQAJgJAMgFQAMgFAOAAIALACIAKADQAFABAEACIAGAEIACADIABADIAAAEIAAAHIAAAMQgCACgDAAQgCAAgDgCIgHgEIgJgEQgEgCgIAAQgOgBgHALQgIAMAAAUQAAAKACAJQACAHAEAGQAEAFAEADQAGADAIAAQAHAAAFgCIAKgFIAHgGQABAAAAAAQABgBAAAAQABAAAAAAQABAAABAAIACAAIABADIABAFIAAAIIAAAGIgBAFIAAACIgCADIgHAEIgJAEIgMAEIgNABQgPgBgLgEg");
	this.shape_55.setTransform(420.45,23.5);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgIBkIgFgBIgDgCIgBgDIAAiBIABgDIADgCIAFgBIAIgBIAJABIAGABIADACIABADIAACBIgBADIgDACIgGABIgJAAIgIAAgAgQhAQgEgFAAgKQAAgLAEgFQAFgEALAAQANAAAEAEQAEAFAAAKQAAALgEAFQgFADgMAAQgLAAgFgDg");
	this.shape_56.setTransform(410.375,20.65);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgfBgQgMgDgHgEQgIgFgEgGQgDgHAAgIQAAgFABgEQABgFADgDIAGgJIAIgHQgHgCgDgHQgEgFABgHQAAgJADgGQAEgHAHgFQgFgGgEgHQgDgHAAgLQABgLADgKQAFgJAHgGQAHgGAKgDQAKgDAMgBIALABIAKACIApAAQADAAACAEIABALQAAAGgBAEQgCADgDAAIgPAAQAEADABAFQACAFgBAEQAAAMgDAJQgFAIgHAHQgHAGgJADQgLADgLAAQgGAAgGgCIgIgDIgEAFQgBACgBACQAAAFAFADQADACAHAAIAeABQAMABAJADQAIACAGAGQAGAEADAHQADAHABAJQAAAJgFAJQgEAIgIAHQgJAGgNAEQgMADgRABQgRgBgLgCgAgXAtIgEAEIgCAFIgBAEQABAHAHAFQAIADANAAQAHAAAGgBQAGgCADgDQADgDACgDQABgEAAgDQAAgHgEgDQgGgEgJgBIgaAAIgFAGgAgMhGQgEACgDADQgDADgBAEIgBAJQAAAKAFAGQAHAFAKABQAFAAADgCQAEgCAEgDIADgHIACgJQAAgKgGgGQgGgGgKAAQgFAAgEACg");
	this.shape_57.setTransform(399.5,26.05);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AgIBmIgGgBIgDgCIgBgCIAAjAIABgDQABAAAAAAQAAgBAAAAQABAAAAAAQABAAAAgBIAGgBIAIAAIAJAAIAGABIADACIAAADIAADAIAAACIgDACIgGABIgJABIgIgBg");
	this.shape_58.setTransform(388.85,20.4);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgeBHQgJgDgGgFQgHgFgDgIQgEgIAAgLQAAgLAFgJQAEgIAJgFQAJgFANgDQANgCARAAIAMAAIAAgIIgBgLQgBgFgDgDQgDgDgFgBQgEgCgGAAQgKAAgHACIgNAFIgJAEIgGACIgDgBIgCgDIgBgEIgBgGIABgIQABgCACgCIAHgFQAFgDAHgCIAPgDQAIgCAIAAQAPAAALADQALADAHAHQAHAGADAKQAEAJAAAOIAABXQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAgBAAQAAABgBAAIgKAAIgJAAQgBAAgBgBQAAAAgBAAQAAAAgBgBQAAAAgBAAIgBgDIAAgLQgIAJgKAFQgLAFgLAAQgLAAgIgDgAgFALQgGABgEADQgEADgCADQgCAEAAAFQAAAIAFAFQAGAFAJAAQAHAAAGgEQAHgEAGgIIAAgWIgOAAQgJAAgFABg");
	this.shape_59.setTransform(377.375,23.525);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AAABWQgIgCgGgGQgFgFgDgJQgCgKAAgLIAAhCIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgdIABgDIADgCIAGgBIAIAAIAIAAIAGABIADACIABADIAAAdIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgCIACAAIACAAIABADIABAEIAAAGIgBALIgCAEIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_60.setTransform(365.225,21.9);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgUBJIgMgDIgJgEIgFgDIgCgFIgBgKIAAgGIABgEQABgBAAAAQAAgBAAAAQAAAAABAAQAAAAAAAAIACgBIAFACIAHAEIALAEQAHACAIAAIAIgBIAHgDIADgFQACgDAAgEQAAgEgCgDIgIgGIgJgEIgLgFIgMgFIgKgHQgFgFgDgHQgCgGAAgJQAAgKAEgIQAEgHAGgGQAHgGAKgDQAKgDALAAIAMABIALACIAHADIAFADIACACIABADIAAAEIAAAFIAAAHIgBAEIgBACIgCAAIgEgBIgHgEIgJgDQgGgCgHAAIgIABQgDABgCACQgDACgBADQgBACAAADQgBAFADADQADADAFACIAJAFIAMAEIAMAGQAFADAFAEQAEAEADAHQADAGAAAJQAAALgEAJQgFAIgHAGQgIAGgKADQgKADgLAAIgPgBg");
	this.shape_61.setTransform(354.7,23.525);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgJgJQgHgKgFgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKANgFQANgGASAAQARAAANAFQANAFAIAJQAJAJAEAOQAEANAAASQAAAPgEAOQgFAOgJAKQgIAKgOAFQgNAGgSAAQgRAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQADAGAHADQAFADAJAAQAIAAAGgDQAGgDAEgGQAEgFACgIQACgJAAgKQAAgJgBgIQgCgIgEgGQgDgGgHgDQgFgEgKAAQgHAAgGADg");
	this.shape_62.setTransform(340.55,23.525);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AAjBIIgGgBIgDgCIAAgCIAAhKQgBgKgBgFQgCgFgCgEQgCgEgEgCQgFgCgGAAQgGgBgGAGQgIAFgIAJIAABXIgBACIgCACIgGABIgJABIgJgBIgFgBIgEgCIgBgCIAAiCIABgDIADgBIAFgBIAIgBIAHABIAFABIACABIABADIAAAPQALgMALgGQAKgFANgBQANAAAJAFQAJAFAGAHQAFAHADAKQACAKABAPIAABQIgBACIgDACIgGABIgJABIgJgBg");
	this.shape_63.setTransform(324.5,23.4);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgfBgQgMgDgHgEQgIgFgDgGQgEgHAAgIQAAgFABgEQABgFADgDIAGgJIAIgHQgHgCgDgHQgEgFABgHQAAgJADgGQAFgHAGgFQgFgGgEgHQgDgHAAgLQAAgLAFgKQAEgJAHgGQAHgGAKgDQAKgDAMgBIALABIAKACIApAAQADAAACAEIABALQAAAGgBAEQgCADgDAAIgOAAQACADACAFQACAFgBAEQAAAMgDAJQgFAIgGAHQgIAGgJADQgKADgMAAQgGAAgGgCIgIgDIgEAFQgCACAAACQAAAFAFADQADACAHAAIAeABQAMABAJADQAIACAGAGQAGAEADAHQAEAHAAAJQAAAJgFAJQgEAIgIAHQgJAGgNAEQgNADgQABQgRgBgLgCgAgXAtIgEAEIgCAFIgBAEQABAHAHAFQAIADANAAQAHAAAGgBQAGgCADgDQAEgDABgDQACgEAAgDQgBgHgFgDQgFgEgJgBIgaAAIgFAGgAgMhGQgEACgDADQgDADgBAEIgBAJQAAAKAFAGQAHAFAKABQAEAAAEgCQAEgCAEgDIADgHIACgJQAAgKgGgGQgGgGgKAAQgFAAgEACg");
	this.shape_64.setTransform(302.4,26.05);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AAjBIIgGgBIgCgCIgBgCIAAhKQAAgKgCgFQgBgFgDgEQgDgEgEgCQgEgCgGAAQgFgBgHAGQgIAFgHAJIAABXIgBACIgDACIgGABIgJABIgJgBIgGgBIgCgCIgBgCIAAiCIAAgDIADgBIAFgBIAIgBIAHABIAFABIACABIABADIAAAPQALgMALgGQAKgFAMgBQAOAAAJAFQAJAFAGAHQAGAHACAKQACAKABAPIAABQIgBACIgEACIgFABIgJABIgJgBg");
	this.shape_65.setTransform(287.4,23.4);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AgIBkIgFgBIgDgCIgBgDIAAiBIABgDIADgCIAFgBIAIgBIAJABIAGABIADACIABADIAACBIgBADIgDACIgGABIgJAAIgIAAgAgQhAQgEgFAAgKQAAgLAEgFQAFgEALAAQANAAAEAEQAEAFAAAKQAAALgEAFQgFADgMAAQgLAAgFgDg");
	this.shape_66.setTransform(275.625,20.65);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgIBmIgFgBIgDgCIgBgCIAAjAIABgDQAAAAAAAAQAAgBABAAQAAAAAAAAQABAAABgBIAFgBIAIAAIAJAAIAFABIAEACIABADIAADAIgBACIgEACIgFABIgJABIgIgBg");
	this.shape_67.setTransform(268.3,20.4);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgJAMgGQANgFAOAAQARAAALAFQAMAFAIAJQAHAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJACAHQACAGAEAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAHgBIABAAIACACIABAEIAAAGIAAAGIgBADIgBADIgBACIgFADIgLAEIgPACQgJACgJAAQgRAAgNgFgAgJgsQgGADgDAEQgEAFgCAGQgCAGAAAHIA2AAQABgQgGgJQgIgJgOAAQgFAAgFADg");
	this.shape_68.setTransform(257,23.525);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgJgJQgJgJgEgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJAMgGQANgFAPAAQAQAAAMAFQALAFAIAJQAHAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJADAHQACAGADAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAFgBIACAAIACACIABAEIAAAGIAAAGIAAADIgBADIgCACIgFADIgLAEIgPACQgIACgKAAQgQAAgOgFgAgKgsQgFADgDAEQgEAFgBAGQgDAGAAAHIA2AAQABgQgGgJQgIgJgOAAQgGAAgFADg");
	this.shape_69.setTransform(241.9,23.525);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AgOBnIgGgBIgDgCIgBgDIAAhoIgRAAQgCAAgBgEQgCgDAAgJIAAgHIACgEIACgDIACgBIAQAAIAAgLQAAgNADgKQACgKAGgGQAFgIAJgCQAIgEAMAAIALABIAIACIAEACIACADIABAFIAAAGIAAAHIgBAFIgBACIgDAAIgCAAIgCgCIgFgBIgGgBQgEAAgCACQgEABgCADQgBADgBAEIgBALIAAALIAYAAIADABIABADIABAEIAAAHQABAJgCADQgCAEgCAAIgYAAIAABoIgBADIgDACIgFABIgIAAIgJAAg");
	this.shape_70.setTransform(230.5,20.35);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgJgJQgIgJgFgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJANgGQAMgFAPAAQAQAAAMAFQALAFAHAJQAIAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJACAHQABAGAEAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAFgBIADAAIABACIABAEIAAAGIAAAGIAAADIgBADIgCACIgFADIgLAEIgPACQgIACgLAAQgPAAgOgFgAgKgsQgFADgDAEQgDAFgCAGQgCAGAAAHIA2AAQAAgQgGgJQgIgJgNAAQgGAAgGADg");
	this.shape_71.setTransform(211.05,23.525);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AggBIIgFgBIgDgCIgBgCIAAiCIAAgDIAEgBIAEgBIAIgBIAIABIAEABIADABIABADIAAAQIAJgMIAIgIQAEgCAEgBIAIgCIAEABIAFABIAEABIACABIABABIACADIAAAFIAAAIIAAAJIgCAFIgBADIgCABIgDgBIgDgCIgEgBIgFAAIgGABQgEACgDACIgHAHIgGALIAABRIgBACIgDACIgGABIgJABIgJgBg");
	this.shape_72.setTransform(199.3,23.4);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgFAnIgEgCIgDgCIgBgDIgDhAQAAAAAAgBQAAAAAAAAQAAAAAAgBQABAAAAAAIADgDIAFgBIAHAAIAIAAIAGABIADADIAAACIgDBAIgBADIgCADIgEABIgHAAIgFAAg");
	this.shape_73.setTransform(189.7438,13.95);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgkBEQgJgEgGgIQgFgIgDgJQgCgKgBgPIAAhPIABgDIADgCIAGgBIAJgBIAJABIAGABIACACIABADIAABIQABAKABAGQABAGADADQACAEAFACQAEACAGABQAGgBAGgFQAIgFAIgKIAAhVIABgDIACgCIAGgBIAJgBIAJABIAFABIAEACIABADIAACBIgBADIgDACIgFABIgIAAIgHAAIgFgBIgDgCIAAgDIAAgPQgLALgLAHQgKAFgNAAQgNABgJgFg");
	this.shape_74.setTransform(178.15,23.65);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgJgJQgHgKgFgNQgEgNAAgSQAAgPAFgOQAEgOAJgKQAJgKAOgFQANgGAQAAQATAAAMAFQANAFAIAJQAJAJAEAOQAEANAAASQAAAPgFAOQgDAOgJAKQgKAKgNAFQgOAGgQAAQgSAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJACAJQABAIAEAGQAEAGAFADQAHADAIAAQAIAAAHgDQAFgDAFgGQAEgFABgIQACgJAAgKQAAgJgCgIQgBgIgDgGQgEgGgGgDQgHgEgJAAQgHAAgGADg");
	this.shape_75.setTransform(162.05,23.525);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AgaBhIgEgCQgBAAAAAAQgBgBAAAAQAAAAAAgBQgBAAAAgBIABgEIASgsIgEgCIgCgEIgth3IgCgIQAAgBAAgBQAAAAAAgBQABAAAAgBQAAAAABAAQACgCAEgBIALAAIAKAAIAFABQABAAAAABQABAAAAAAQABAAAAABQAAAAABABIACAFIAdBXIABAAIAchZQABgEACgBQAAAAAAAAQABgBAAAAQABAAABAAQAAgBABAAIAMAAIAKAAQAEABACACQABAAAAABQAAAAAAABQABAAAAABQAAAAAAABIgCAGIgrB/IgPAvQgCADgGACQgEABgMAAIgKAAg");
	this.shape_76.setTransform(147.2,26.125);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgfBIIgGgBIgDgCIgBgCIAAiCIABgDIACgBIAGgBIAHgBIAHABIAFABIACABIABADIAAAQIAKgMIAIgIQAEgCAEgBIAIgCIAFABIAEABIAEABIADABIABABIAAADIAAAFIABAIIgBAJIAAAFIgBADIgDABIgDgBIgDgCIgEgBIgFAAIgGABQgDACgDACIgHAHIgHALIAABRIgBACIgDACIgFABIgJABIgJgBg");
	this.shape_77.setTransform(128.7,23.4);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgJAMgGQANgFAOAAQARAAALAFQAMAFAHAJQAIAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJABAHQACAGAFAFQAEAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAHgBIABAAIACACIABAEIAAAGIAAAGIgBADIgBADIgBACIgFADIgLAEIgPACQgJACgKAAQgPAAgOgFgAgJgsQgGADgDAEQgEAFgCAGQgBAGAAAHIA2AAQAAgQgHgJQgGgJgPAAQgGAAgEADg");
	this.shape_78.setTransform(115.05,23.525);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AAjBmIgFgBIgDgCIgCgCIAAhLQAAgKgBgFQgBgFgDgDQgDgEgEgCQgEgCgFAAQgHgBgHAGQgHAEgHAJIAABYIgBACIgEACIgFABIgJABIgJgBIgGgBIgCgCIgBgCIAAjAIABgDQAAAAAAAAQAAgBABAAQAAAAAAAAQABAAAAgBIAGgBIAJAAIAJAAIAFABIAEACIABADIAABIQAJgJAKgFQAIgFALAAQAOAAAJAFQAJAFAFAHQAHAHACALQADAJAAAOIAABRIgCACIgDACIgFABIgJABIgJgBg");
	this.shape_79.setTransform(99.55,20.4);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AAABWQgIgCgGgGQgFgFgDgJQgCgKAAgLIAAhCIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgdIABgDIADgCIAGgBIAIAAIAIAAIAGABIADACIABADIAAAdIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgCIACAAIACAAIABADIABAEIAAAGIgBALIgCAEIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_80.setTransform(86.025,21.9);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgJAMgGQANgFAOAAQARAAALAFQAMAFAHAJQAIAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJABAHQACAGAFAFQAEAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAHgBIABAAIACACIABAEIAAAGIAAAGIgBADIgBADIgBACIgFADIgLAEIgPACQgJACgKAAQgPAAgOgFgAgJgsQgGADgDAEQgEAFgCAGQgBAGAAAHIA1AAQABgQgHgJQgGgJgPAAQgGAAgEADg");
	this.shape_81.setTransform(73.65,23.525);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AAjBmIgFgBIgDgCIgCgCIAAhLQAAgKgBgFQgBgFgDgDQgDgEgEgCQgEgCgGAAQgGgBgHAGQgHAEgHAJIAABYIgBACIgEACIgFABIgJABIgJgBIgGgBIgCgCIgBgCIAAjAIABgDQAAAAAAAAQAAgBABAAQAAAAAAAAQABAAAAgBIAGgBIAJAAIAJAAIAFABIAEACIABADIAABIQAJgJAKgFQAIgFALAAQAOAAAJAFQAJAFAFAHQAHAHACALQADAJAAAOIAABRIgCACIgDACIgFABIgJABIgJgBg");
	this.shape_82.setTransform(58.15,20.4);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AArBfIgIgBQAAgBgBAAQgBAAAAgBQgBAAAAAAQAAgBgBAAIgCgGIgdh3IgBAAIgcB3IgCAGIgEADIgIABIgNABIgNgBIgIgBQgDgBgCgCIgCgGIgrikIgCgJQAAAAABgBQAAgBAAAAQAAgBAAAAQABgBAAAAQACgCAEAAIAMgBIALABIAGABQABAAAAAAQAAAAABAAQAAABAAAAQAAAAAAABIACAEIAhCQIAiiPIACgEQABgBAAAAQAAgBAAAAQABAAAAAAQABgBABAAIAFgBIAKgBIAMABIAGABIADADIACAEIAjCPIABAAIAhiPIABgEQAAgBABAAQAAgBAAAAQABAAAAAAQABgBAAAAIAGgBIALgBIAJABIAGACQAAAAABABQAAAAAAABQAAAAAAABQABABAAAAIgCAJIgsCkIgCAGIgFADIgIABIgMABIgOgBg");
	this.shape_83.setTransform(36.45,21.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.graphic_blurb, new cjs.Rectangle(20.8,0,713.5,79.2), null);


(lib.games_blurb = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgPCCIgJAAIgFgCQAAAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAAAIABgEQAMgdAHgeQAGgeAAggQAAgggGgeQgGgegNgdIAAgDQAAgBAAAAQAAgBAAAAQABAAAAAAQAAgBABAAIAFgCIAJAAIAHAAIAFABIACABIABABQAPAfAIAfQAIAgAAAgQAAAQgCAQQgCAQgEAQQgEAQgFAPQgGAPgIAQIgBACIgDABIgFABIgHAAg");
	this.shape.setTransform(488.925,99.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgCBmQgGgBgFgDQgFgCgFgFQgFgEgFgGIAAAOIgBADIgDACIgFABIgHAAIgIAAIgEgBIgDgCIgBgDIAAi/IABgDQAAAAABAAQAAgBAAAAQABAAAAAAQABgBAAAAIAGgBIAJgBIAJABIAFABIADACIABADIAABIIAKgJIAKgFIAJgEIALgBQAPAAAKAGQAKAGAHAKQAGAJADANQADANAAAOQAAASgEAOQgEANgHAKQgHAKgLAFQgKAGgNAAQgHAAgFgCgAgFgKIgHADIgIAHIgIAJIAAArQAIAKAHAFQAHAFAHAAQAHAAAFgDQAFgEADgGQAEgGABgHIACgPQAAgJgCgHQgBgIgDgGQgDgFgFgEQgFgDgHAAIgHABg");
	this.shape_1.setTransform(476.675,97.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgeBHQgJgDgGgFQgHgFgDgIQgEgIAAgLQAAgLAFgJQAEgIAJgFQAJgFANgDQANgCARAAIAMAAIAAgIIgBgLQgBgFgDgDQgDgDgFgBQgEgCgGAAQgKAAgHACIgNAFIgJAEIgGACIgDgBIgCgDIgBgEIgBgGIABgIQABgCACgCIAHgFQAFgDAHgCIAPgDQAIgCAIAAQAPAAALADQALADAHAHQAHAGADAKQAEAJAAAOIAABXQAAAAAAABQAAAAgBAAQAAABAAAAQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAgBAAQgBABAAAAIgKAAIgJAAQgBAAgBgBQAAAAgBAAQAAAAgBgBQAAAAgBAAIgBgDIAAgLQgIAJgKAFQgLAFgLAAQgLAAgIgDgAgFALQgGABgEADQgEADgCADQgCAEAAAFQAAAIAFAFQAGAFAJAAQAHAAAGgEQAHgEAGgIIAAgWIgOAAQgJAAgFABg");
	this.shape_2.setTransform(460.475,100.725);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAABWQgIgCgGgGQgFgGgDgIQgCgKAAgMIAAhBIgQAAQgCAAgCgDQgBgEAAgIIAAgIIABgEIACgCIACgBIAQAAIAAgeIABgCIADgCIAGgBIAIAAIAIAAIAGABIADACIABACIAAAeIAcAAIADABIACACIABAEIAAAIQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAFAIAAIAFAAIAFgBIADgBIACgBIACABIABACIABAEIAAAGIgBAKIgCAGIgEACIgGACIgHABIgIABQgLgBgHgDg");
	this.shape_3.setTransform(448.325,99.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAiBHIgHgBIgEgDIgCgEIgVhOIAAgBIAAABIgUBOIgCAEIgEADIgHABIgMAAIgLAAIgHgBIgEgDIgCgEIgjh1IgBgHIgBgEIABgCIADgCIAGgBIAJAAIAJAAIAGABQABAAAAABQABAAAAAAQAAAAAAABQABAAAAAAIABADIAaBfIAAACIABgCIAYhfIABgDIADgCIAGgBIAHAAIAJAAIAGABIACACIACACIAaBgIAAACIAAgCIAZhfIACgDQAAAAAAAAQAAgBABAAQAAAAAAAAQABgBAAAAIAGgBIAJAAIAJAAIAFABIADACIABACIgBAEIgBAHIgjB1IgCAEIgEADIgHABIgLAAIgMAAg");
	this.shape_4.setTransform(425.375,100.725);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgJAMgGQANgFAOAAQARAAALAFQAMAFAHAJQAIAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQgBAJACAHQADAGAEAFQAEAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAHgBIABAAIACACIABAEIAAAGIAAAGIgBADIgBADIgBACIgFADIgLAEIgPACQgJACgJAAQgRAAgNgFgAgJgsQgGADgDAEQgEAFgCAGQgCAGABAHIA1AAQABgQgHgJQgGgJgPAAQgFAAgFADg");
	this.shape_5.setTransform(406.75,100.725);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAjBIIgGgBIgCgCIgBgCIAAhKQAAgJgCgGQgBgGgDgDQgCgEgFgCQgEgDgGABQgFAAgHAEQgIAGgHAJIAABXIgBACIgEACIgFABIgJAAIgJAAIgGgBIgCgCIgBgCIAAiCIAAgCIADgCIAFgBIAIgBIAHABIAFABIACACIABACIAAAPQALgMALgFQAKgHAMAAQAOABAJAEQAJAFAFAHQAHAHACALQADAKAAAOIAABQIgBACIgEACIgFABIgJAAIgJAAg");
	this.shape_6.setTransform(391.25,100.6);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAjBIIgFgBIgEgCIgBgCIAAhKQABgJgCgGQgCgGgCgDQgCgEgEgCQgFgDgFABQgGAAgIAEQgHAGgIAJIAABXIgBACIgDACIgFABIgJAAIgJAAIgFgBIgEgCIgBgCIAAiCIABgCIADgCIAFgBIAHgBIAIABIAFABIACACIABACIAAAPQALgMALgFQAKgHANAAQAMABAKAEQAJAFAFAHQAGAHADALQADAKgBAOIAABQIgBACIgCACIgGABIgJAAIgJAAg");
	this.shape_7.setTransform(368.35,100.6);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgIBkIgFgBIgDgDIgBgCIAAiBIABgDIADgCIAFgBIAIgBIAJABIAGABIADACIABADIAACBIgBACIgDADIgGABIgJAAIgIAAgAgQhBQgEgEAAgKQAAgMAEgEQAFgEALAAQANAAAEAEQAEAEAAALQAAALgEAEQgFAFgMAAQgLAAgFgFg");
	this.shape_8.setTransform(356.575,97.85);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgUBJIgLgDIgJgEIgGgDIgCgFIgBgKIABgGIAAgEQABgBAAAAQAAAAAAgBQAAAAABAAQAAAAAAAAIACgBIAFACIAIAEIAKAEQAHACAIAAIAIgBIAGgDIAFgFQABgDAAgEQAAgEgCgDIgIgGIgJgEIgLgFIgMgFIgKgHQgEgFgEgHQgCgGAAgJQAAgKADgIQAFgHAGgGQAHgGAKgDQAKgDALAAIAMABIAKACIAIADIAFADIACACIABADIAAAEIAAAFIAAAHIgBAEIAAACIgDAAIgEgBIgHgEIgKgDQgFgCgHAAIgIABQgDABgDACQgCACgBADQgCACABADQAAAFACADQADADAFACIAJAFIAMAEIAMAGQAFADAFAEQAFAEACAHQADAGAAAJQAAALgEAJQgFAIgHAGQgHAGgLADQgKADgLAAIgPgBg");
	this.shape_9.setTransform(340.2,100.725);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAjBIIgFgBIgEgCIgBgCIAAhKQABgJgCgGQgCgGgCgDQgDgEgDgCQgFgDgFABQgHAAgHAEQgHAGgHAJIAABXIgCACIgDACIgFABIgJAAIgJAAIgFgBIgDgCIgCgCIAAiCIABgCIADgCIAFgBIAHgBIAIABIAFABIACACIABACIAAAPQALgMALgFQAKgHANAAQAMABAKAEQAJAFAFAHQAGAHADALQACAKAAAOIAABQIgBACIgCACIgGABIgJAAIgJAAg");
	this.shape_10.setTransform(326.15,100.6);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgJAMgGQANgFAOAAQARAAALAFQAMAFAHAJQAIAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJACAHQADAGAEAFQAEAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAHgBIABAAIACACIABAEIAAAGIAAAGIgBADIgBADIgBACIgFADIgLAEIgPACQgJACgJAAQgRAAgNgFgAgJgsQgGADgDAEQgEAFgCAGQgCAGAAAHIA2AAQABgQgHgJQgGgJgPAAQgFAAgFADg");
	this.shape_11.setTransform(310.45,100.725);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("Ag3BiIgGgBIgDgCIgBgDIAAi1IABgCIADgCIAEgBIAIgBIAHABIAFABIADACIAAACIAAAPIAMgKIALgHIALgFQAGgBAHgBQAOABAKAFQAKAGAHAKQAGAJADANQADANAAAPQAAARgEAOQgEAOgHAJQgHALgLAEQgKAGgOAAIgKgBIgJgEIgJgFIgJgIIAAA9IgBADIgDACIgFABIgJAAIgJAAgAgEhBQgEABgEACIgIAHIgIAKIAAArQAIAJAHAFQAHAFAHAAQAHAAAFgDQAFgEADgFQADgGACgHQABgHAAgIIgBgQQgBgIgDgGQgDgGgFgEQgFgDgHAAIgGABg");
	this.shape_12.setTransform(295.275,103.2);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgIgJQgJgKgEgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKANgFQAOgGARAAQARAAANAFQANAFAJAJQAIAJAEAOQAEANAAASQAAAPgFAOQgEAOgIAKQgJAKgOAFQgNAGgRAAQgSAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQAEAGAFADQAHADAIAAQAIAAAGgDQAHgDADgGQAEgFACgIQACgJAAgKQAAgJgCgIQgBgIgDgGQgFgGgGgDQgGgEgIAAQgIAAgGADg");
	this.shape_13.setTransform(278.75,100.725);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAJCCIgFgBIgDgBIgBgCQgHgQgGgPQgGgPgEgQQgEgQgCgQQgCgQAAgQQAAgQACgPQACgRAEgQQAEgQAGgPQAGgPAHgQIABgBIACgBIAFgBIAIAAIAJAAIAFACIACADIgBADQgMAdgGAeQgHAeAAAgQAAAgAHAeQAGAeAMAdIABAEIgCADIgFACIgJAAIgHAAg");
	this.shape_14.setTransform(266.075,99.9);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgQASQgFgFAAgMQAAgNAFgFQAFgFALAAQAMAAAFAFQAFAFAAAMQAAANgFAFQgFAFgMAAQgMAAgEgFg");
	this.shape_15.setTransform(636.275,67.075);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgTBJIgNgDIgJgEIgEgDIgDgFIgBgKIAAgGIACgEQAAgBAAAAQAAgBAAAAQAAAAABAAQAAAAAAAAIACgBIAFACIAHAEIAMAEQAGACAHAAIAIgBIAIgDIADgFQACgDAAgEQAAgEgDgDIgHgGIgJgEIgMgFIgLgFIgKgHQgEgFgDgHQgDgGAAgJQAAgKAEgIQADgHAHgGQAHgGAKgDQAKgDALAAIAMABIALACIAIADIAEADIACACIABADIABAEIAAAFIAAAHIgBAEIgCACIgCAAIgEgBIgHgEIgJgDQgGgCgHAAIgHABQgFABgBACQgDACgBADQgCACAAADQAAAFAEADQACADAFACIAJAFIAMAEIALAGQAHADAEAEQAEAEADAHQADAGAAAJQAAALgEAJQgFAIgHAGQgHAGgLADQgLADgLAAIgNgBg");
	this.shape_16.setTransform(626.35,62.125);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgJgJQgJgJgEgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJAMgGQANgFAPAAQAQAAAMAFQALAFAIAJQAHAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJADAHQACAGADAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAFgBIACAAIACACIABAEIAAAGIAAAGIAAADIgBADIgCACIgFADIgLAEIgPACQgIACgKAAQgQAAgOgFgAgKgsQgFADgDAEQgEAFgBAGQgDAGAAAHIA2AAQABgQgGgJQgIgJgOAAQgGAAgFADg");
	this.shape_17.setTransform(612.7,62.125);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("ABMBIIgFgBIgDgCIgBgCIAAhNIgBgMQgBgFgDgEQgDgEgEgCQgEgDgFABQgGAAgHAEQgHAGgIAJIAABXIAAACIgDACIgGABIgJAAIgIAAIgGgBIgDgCIAAgCIAAhNIgBgMQgCgFgDgEQgCgEgEgCQgEgDgFABQgHAAgHAEQgGAGgIAJIAABXIgBACIgDACIgGABIgJAAIgJAAIgFgBIgDgCIgBgCIAAiCIAAgDIAEgBIAEgBIAIgBIAIABIAFABIACABIABADIAAAPQALgMAKgGQALgFAMgBQAHAAAHADQAGABAGADQADADAFAFIAFAJIAMgKIALgIIALgEIALgCQAOAAAIAFQAJAFAFAHQAGAHACAKQADALAAALIAABTIgBACIgDACIgGABIgJAAIgJAAg");
	this.shape_18.setTransform(593.05,62);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgeBHQgJgDgGgFQgHgFgDgIQgEgIAAgLQAAgLAFgJQAEgIAJgFQAJgFANgDQANgCARAAIAMAAIAAgIIgBgLQgBgFgDgDQgDgDgFgBQgEgCgGAAQgKAAgHACIgNAFIgJAEIgGACIgDgBIgCgDIgBgEIgBgGIABgIQABgCACgCIAHgFQAFgDAHgCIAPgDQAIgCAIAAQAPAAALADQALADAHAHQAHAGADAKQAEAJAAAOIAABXQAAAAAAABQAAAAgBAAQAAABAAAAQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAgBAAQAAABgBAAIgKAAIgJAAQgBAAgBgBQAAAAgBAAQAAAAgBgBQAAAAgBAAIgBgDIAAgLQgIAJgKAFQgLAFgLAAQgLAAgIgDgAgFALQgGABgEADQgEADgCADQgCAEAAAFQAAAIAFAFQAGAFAJAAQAHAAAGgEQAHgEAGgIIAAgWIgOAAQgJAAgFABg");
	this.shape_19.setTransform(573.025,62.125);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgfBgQgMgDgIgEQgHgFgEgHQgDgGAAgIQAAgFACgEQAAgFADgDIAGgIIAIgIQgHgCgDgHQgEgFAAgHQAAgJAFgGQAEgHAGgFQgFgGgDgHQgDgHAAgLQAAgLAEgKQADgJAIgGQAHgGAKgDQAKgDAMAAIALAAIAKACIAqAAQACAAACAEIABALQAAAGgCAEQgBADgCAAIgQAAQADAEACAEQACAFAAAEQgBAMgEAJQgDAJgHAGQgIAGgKADQgKADgLAAIgMgCIgJgDIgDAEQgCADABACQAAAEADAEQAEACAHAAIAfABQALABAIADQAJACAHAGQAFAEAEAHQACAHAAAJQAAAJgEAJQgEAIgJAHQgIAGgNAEQgNADgQABQgQgBgMgCgAgYAtIgDAEIgCAFIAAAEQgBAHAIAFQAHADAOAAQAHAAAGgBQAGgCADgDQADgCACgEQABgDAAgEQABgHgGgDQgFgEgJgBIgZAAIgHAGgAgMhGQgEACgDADQgCADgCAEIgBAJQAAAKAGAGQAFAGALAAQAEAAAFgDQADgBADgDIAFgHIABgJQAAgKgGgGQgGgGgJAAQgGAAgEACg");
	this.shape_20.setTransform(559.3,64.65);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgIgJQgJgKgEgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKANgFQANgGASAAQARAAANAFQANAFAJAJQAIAJAEAOQAEANAAASQAAAPgEAOQgEAOgKAKQgIAKgOAFQgNAGgSAAQgRAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQAEAGAGADQAFADAJAAQAIAAAGgDQAHgDADgGQAFgFABgIQACgJAAgKQAAgJgBgIQgCgIgEgGQgDgGgHgDQgGgEgIAAQgIAAgGADg");
	this.shape_21.setTransform(537.4,62.125);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgJANgGQAMgFAPAAQAQAAALAFQAMAFAHAJQAIAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJABAHQACAGAFAFQAEAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAGgBIACAAIABACIABAEIAAAGIAAAGIgBADIgBADIgBACIgFADIgLAEIgPACQgJACgKAAQgQAAgNgFgAgJgsQgGADgDAEQgEAFgCAGQgBAGAAAHIA2AAQAAgQgHgJQgGgJgOAAQgHAAgEADg");
	this.shape_22.setTransform(521.75,62.125);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgjBiQgLgGgGgKQgHgKgDgNQgDgNAAgPQAAgRAEgOQAEgNAHgKQAHgKALgFQAKgFAOAAQAKAAAJAEQAJAFAJAJIAAhHIABgDIADgCIAFgBIAJgBIAJABIAGABIADACIABADIAAC/IgBADIgDACIgEABIgIAAIgHAAIgFgBIgDgCIgBgDIAAgOQgKAKgLAHQgLAFgMAAQgPAAgKgFgAgNgIQgFADgDAGQgDAFgCAIQgBAHAAAIQAAAIABAIQABAHADAHQADAGAFADQAFAEAIAAIAGgBIAIgEIAHgGIAJgKIAAgrQgIgJgHgFQgHgGgHAAQgHAAgGAEg");
	this.shape_23.setTransform(505.825,59.15);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgIBkIgFgBIgDgCIgBgDIAAiBIABgDIADgCIAFgBIAIgBIAJABIAGABIADACIABADIAACBIgBADIgDACIgGABIgJAAIgIAAgAgQhAQgEgFAAgKQAAgLAEgFQAFgEALAAQANAAAEAEQAEAFAAAKQAAALgEAFQgFAEgMgBQgLABgFgEg");
	this.shape_24.setTransform(494.475,59.25);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgLBHIgIgBIgEgDIgCgEIgnh1IgCgFIAAgEIgBgCIABgCIADgCIAGgBIAJAAIAJAAIAGABIADACIACADIAcBfIABAEIABgEIAdhfIACgDIADgCIAFgBIAJAAIAJAAIAGABIACACIABACIAAACIAAADIgBACIgBAEIgnB1IgCAEIgEADIgIABIgNAAIgLAAg");
	this.shape_25.setTransform(483.675,62.125);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgfBIIgGgBIgDgCIgBgCIAAiCIABgDIACgBIAGgBIAHgBIAHABIAGABIABABIABADIAAAQIAKgMIAIgHQAEgDAEgCIAIgBIAFABIAEAAIAEACIADABIABACIABACIAAAFIAAAIIAAAJIgBAFIgBACIgDACIgDgBIgDgCIgEgBIgFAAIgGABQgEABgDADIgGAHIgHALIAABRIgBACIgDACIgFABIgJAAIgJAAg");
	this.shape_26.setTransform(465.2,62);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgkBEQgJgFgGgHQgGgIgCgKQgCgJgBgPIAAhPIABgDIAEgCIAFgBIAJgBIAJABIAGABIACACIABADIAABIQAAALACAFQABAGADADQADAEAEACQAEADAGAAQAFAAAHgGQAIgFAIgKIAAhVIAAgDIADgCIAGgBIAJgBIAJABIAGABIACACIABADIAACBIgBADIgCACIgFABIgIAAIgHAAIgFgBIgCgCIgBgDIAAgPQgLALgLAHQgLAFgLAAQgOABgJgFg");
	this.shape_27.setTransform(451.05,62.25);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgJgJQgHgKgFgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKAOgFQANgGAQAAQATAAAMAFQANAFAIAJQAJAJAEAOQAEANAAASQAAAPgEAOQgFAOgJAKQgJAKgNAFQgOAGgRAAQgRAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJACAJQABAIAEAGQADAGAHADQAFADAJAAQAIAAAHgDQAFgDAEgGQAEgFACgIQACgJAAgKQAAgJgBgIQgCgIgEgGQgEgGgFgDQgGgEgKAAQgHAAgGADg");
	this.shape_28.setTransform(434.95,62.125);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AAABWQgIgCgGgGQgFgGgDgIQgCgKAAgMIAAhBIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgeIABgCIADgCIAGgBIAIAAIAIAAIAGABIADACIABACIAAAeIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgBIACgBIACABIABACIABAEIAAAGIgBAKIgCAFIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_29.setTransform(414.675,60.5);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgkBEQgJgFgGgHQgFgIgDgKQgDgJABgPIAAhPIABgDIACgCIAGgBIAJgBIAJABIAFABIAEACIABADIAABIQgBALACAFQABAGADADQACAEAFACQAEADAFAAQAGAAAIgGQAGgFAJgKIAAhVIABgDIACgCIAGgBIAJgBIAJABIAFABIAEACIABADIAACBIgBADIgDACIgEABIgIAAIgIAAIgFgBIgDgCIAAgDIAAgPQgLALgLAHQgLAFgMAAQgNABgJgFg");
	this.shape_30.setTransform(401.6,62.25);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgIgJQgJgKgEgNQgEgNAAgSQAAgPAFgOQAEgOAJgKQAJgKAOgFQAMgGARAAQASAAANAFQANAFAJAJQAIAJAEAOQAEANAAASQAAAPgFAOQgEAOgIAKQgJAKgOAFQgNAGgRAAQgSAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQAEAGAFADQAHADAIAAQAIAAAGgDQAGgDAFgGQAEgFABgIQACgJAAgKQAAgJgCgIQgBgIgDgGQgFgGgFgDQgGgEgJAAQgIAAgGADg");
	this.shape_31.setTransform(385.5,62.125);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AAgBmIgGgBIgEgCIgCgDIgrhFIAABGIgBACIgDACIgFABIgJAAIgJAAIgGgBIgDgCIgBgCIAAjAIABgDQAAAAABAAQAAgBAAAAQABAAAAAAQABAAAAAAIAGgCIAJAAIAJAAIAFACIADABIABADIAABxIAmgzIACgDIAEgBIAGgBIAJgBIAKABIAGABIADABIABADIgBAFIgEAFIgmAqIAsBFIADAFIABAEIgBACIgDACIgGABIgJAAIgKAAg");
	this.shape_32.setTransform(364.175,59);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgRBFQgLgFgJgIQgHgKgFgNQgDgNAAgRQAAgTAEgOQAFgPAJgJQAJgJAMgFQAMgFAOAAIALABIAKAEQAFABAEACIAGAEIACADIABADIAAAEIAAAGIgBANQAAAAAAABQgBAAAAABQgBAAAAAAQgBAAAAAAQgDAAgDgBIgHgFIgJgEQgFgCgHAAQgOAAgHALQgHAKAAAVQgBALACAIQACAHAEAGQADAGAGADQAFACAHAAQAIAAAGgCIAJgGIAHgEQABgBAAAAQABgBAAAAQABAAAAAAQABAAABAAIACAAIABADIABAFIAAAHIAAAHIgBAFIgBACIgCADIgGAEIgKAEIgLAEIgNABQgOAAgMgFg");
	this.shape_33.setTransform(350.1,62.1);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgJAMgGQANgFAOAAQARAAALAFQAMAFAHAJQAIAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJACAHQADAGAEAFQAEAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAHgBIABAAIACACIABAEIAAAGIAAAGIgBADIgBADIgBACIgFADIgLAEIgPACQgJACgJAAQgRAAgNgFgAgJgsQgGADgDAEQgEAFgCAGQgCAGAAAHIA2AAQABgQgHgJQgGgJgPAAQgFAAgFADg");
	this.shape_34.setTransform(336.1,62.125);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AAjBmIgGgBIgCgCIgBgCIAAhLQAAgJgCgGQgBgFgDgDQgCgEgFgCQgEgDgGABQgFAAgHAEQgIAFgHAJIAABYIgBACIgEACIgFABIgJAAIgJAAIgGgBIgCgCIgBgCIAAjAIABgDQAAAAAAAAQAAgBAAAAQABAAAAAAQABAAAAAAIAGgCIAJAAIAJAAIAFACIAEABIABADIAABIQAJgJAKgFQAJgFAKAAQAOAAAJAFQAJAFAFAHQAHAHACALQADAJAAAPIAABQIgBACIgEACIgFABIgJAAIgJAAg");
	this.shape_35.setTransform(320.6,59);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgRBFQgLgFgJgIQgHgKgEgNQgEgNgBgRQABgTAEgOQAFgPAJgJQAJgJAMgFQAMgFAOAAIALABIAKAEQAFABAEACIAGAEIACADIABADIAAAEIAAAGIgBANQAAAAAAABQgBAAAAABQgBAAAAAAQgBAAAAAAQgDAAgDgBIgHgFIgJgEQgEgCgIAAQgOAAgHALQgIAKABAVQAAALABAIQACAHAEAGQADAGAGADQAFACAHAAQAIAAAFgCIAKgGIAHgEQABgBAAAAQABgBAAAAQABAAAAAAQABAAABAAIACAAIABADIABAFIAAAHIAAAHIgBAFIgBACIgBADIgHAEIgKAEIgLAEIgNABQgOAAgMgFg");
	this.shape_36.setTransform(306.35,62.1);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgIgJQgJgKgEgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKANgFQAOgGARAAQARAAANAFQANAFAJAJQAIAJAEAOQAEANAAASQAAAPgEAOQgFAOgIAKQgJAKgOAFQgNAGgRAAQgSAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQAEAGAFADQAGADAJAAQAIAAAGgDQAHgDADgGQAEgFACgIQACgJAAgKQAAgJgCgIQgBgIgDgGQgFgGgGgDQgGgEgIAAQgIAAgGADg");
	this.shape_37.setTransform(285.05,62.125);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AAABWQgIgCgGgGQgFgGgDgIQgCgKAAgMIAAhBIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgeIABgCIADgCIAGgBIAIAAIAIAAIAGABIADACIABACIAAAeIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgBIACgBIACABIABACIABAEIAAAGIgBAKIgCAFIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_38.setTransform(271.875,60.5);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgHBgIgIgBIgEgBIgDgBIgCgCIgCgDIg4inIgCgJQAAgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQACgCAFAAIAMgBIAKABIAGABIADACIACADIAtCSIAtiRIACgEIADgCIAGgBIALgBIAKABQAEAAABACQACACgBADIgCAIIg5CnIgCAEQAAABAAAAQgBAAAAABQgBAAAAAAQgBAAAAAAIgIABIgMABIgIAAg");
	this.shape_39.setTransform(251.2763,59.675);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgIBfIgGgBIgDgCIgCgDIAAiYIgvAAIgCgBIgCgCIgBgFIAAgHIAAgIIABgFIACgCIACgBICEAAIADABIACACIABAFIABAIIgBAHIgBAFIgCACIgDABIgvAAIAACYIgBADIgDACIgGABIgJAAIgIAAg");
	this.shape_40.setTransform(235,59.725);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgJAMgGQANgFAOAAQARAAALAFQAMAFAHAJQAIAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJABAHQACAGAFAFQAEAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAHgBIABAAIACACIABAEIAAAGIAAAGIgBADIgBADIgBACIgFADIgLAEIgPACQgJACgKAAQgPAAgOgFgAgJgsQgGADgDAEQgEAFgCAGQgBAGAAAHIA1AAQABgQgHgJQgGgJgOAAQgHAAgEADg");
	this.shape_41.setTransform(213.15,62.125);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AAjBmIgFgBIgDgCIgCgCIAAhLQAAgJgBgGQgBgFgDgDQgDgEgEgCQgEgDgGABQgGAAgHAEQgHAFgHAJIAABYIgBACIgEACIgFABIgJAAIgJAAIgGgBIgCgCIgBgCIAAjAIABgDQAAAAAAAAQAAgBABAAQAAAAAAAAQABAAAAAAIAGgCIAJAAIAJAAIAFACIAEABIABADIAABIQAJgJAKgFQAIgFALAAQAOAAAJAFQAJAFAFAHQAHAHACALQADAJAAAPIAABQIgCACIgDACIgFABIgJAAIgJAAg");
	this.shape_42.setTransform(197.65,59);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AAABWQgIgCgGgGQgFgGgDgIQgCgKAAgMIAAhBIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgeIABgCIADgCIAGgBIAIAAIAIAAIAGABIADACIABACIAAAeIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgBIACgBIACABIABACIABAEIAAAGIgBAKIgCAFIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_43.setTransform(184.125,60.5);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AAgBmIgGgBIgEgCIgCgDIgrhFIAABGIgBACIgDACIgFABIgJAAIgJAAIgGgBIgDgCIgBgCIAAjAIABgDQAAAAABAAQAAgBAAAAQABAAAAAAQABAAAAAAIAGgCIAJAAIAJAAIAFACIADABIABADIAABxIAmgzIACgDIAEgBIAGgBIAJgBIAKABIAGABIADABIABADIgBAFIgEAFIgmAqIAsBFIADAFIABAEIgBACIgDACIgGABIgJAAIgKAAg");
	this.shape_44.setTransform(165.875,59);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgRBFQgLgFgIgIQgJgKgDgNQgFgNAAgRQAAgTAGgOQAEgPAJgJQAJgJAMgFQAMgFAOAAIALABIAKAEQAFABAEACIAGAEIACADIABADIABAEIAAAGIgBANQgCACgDAAQgCAAgDgBIgHgFIgJgEQgEgCgIAAQgOAAgHALQgIAKAAAVQAAALACAIQACAHAEAGQAEAGAEADQAGACAIAAQAHAAAFgCIAKgGIAHgEQABgBAAAAQABgBAAAAQABAAAAAAQABAAABAAIACAAIACADIAAAFIAAAHIAAAHIAAAFIgBACIgCADIgHAEIgJAEIgMAEIgNABQgOAAgMgFg");
	this.shape_45.setTransform(151.8,62.1);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgIBkIgFgBIgDgCIgBgDIAAiBIABgDIADgCIAFgBIAIgBIAJABIAGABIADACIABADIAACBIgBADIgDACIgGABIgJAAIgIAAgAgQhAQgEgFAAgKQAAgLAEgFQAFgEALAAQANAAAEAEQAEAFAAAKQAAALgEAFQgFAEgMgBQgLABgFgEg");
	this.shape_46.setTransform(141.725,59.25);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgIBmIgGgBIgCgCIgBgCIAAjAIABgDQAAAAAAAAQAAgBAAAAQABAAAAAAQABAAAAAAIAGgCIAIAAIAJAAIAFACIAEABIABADIAADAIgBACIgEACIgFABIgJAAIgIAAg");
	this.shape_47.setTransform(134.4,59);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgUBcQgPgGgLgMQgLgMgGgSQgGgSAAgYQAAgXAGgSQAHgTALgNQAMgNAQgGQAQgHATAAIAPABIAOAEIALAFIAHAFIACADIACADIAAAFIAAAHIAAAHIgBAFIgCADIgCABQgCAAgEgCIgIgGIgNgGQgHgDgLAAQgLAAgIAFQgJAFgGAIQgGAJgDAMQgEAMAAAOQAAARAEAMQADANAHAHQAGAIAIAEQAJAEALAAQALAAAHgCIANgGIAJgFQADgCACAAIACAAIACADIABAFIAAAIIAAAGIgBAFIgBADIgCADIgHAEIgLAFIgPAEQgJACgKAAQgSAAgQgGg");
	this.shape_48.setTransform(123.025,59.675);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgQASQgFgFAAgMQAAgNAFgFQAFgFALAAQAMAAAFAFQAFAFAAAMQAAANgFAFQgFAFgMAAQgMAAgEgFg");
	this.shape_49.setTransform(765.975,28.475);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAFgOQAEgOAJgKQAIgJAMgGQANgFAOAAQARAAAMAFQALAFAIAJQAHAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJACAHQADAGADAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAGgBIACAAIACACIABAEIAAAGIAAAGIAAADIgCADIgBACIgFADIgLAEIgPACQgJACgJAAQgRAAgNgFgAgKgsQgFADgDAEQgDAFgDAGQgCAGAAAHIA2AAQABgQgGgJQgIgJgOAAQgGAAgFADg");
	this.shape_50.setTransform(754.35,23.525);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AAgBmIgGgBIgEgCIgCgDIgrhFIAABGIgBACIgDACIgFABIgJABIgJgBIgGgBIgDgCIgBgCIAAjAIABgDQAAAAABAAQAAgBAAAAQABAAAAAAQABAAAAgBIAGgBIAJAAIAJAAIAFABIADACIABADIAABxIAmgzIACgDIAEgBIAGgBIAJgBIAKABIAGABIADABIABADIgBAFIgEAFIgmAqIAsBFIADAFIABAEIgBACIgDACIgGABIgJABIgKgBg");
	this.shape_51.setTransform(741.175,20.4);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgeBHQgJgDgGgFQgHgFgDgIQgEgIAAgLQAAgLAFgJQAEgIAJgFQAJgFANgDQANgCARAAIAMAAIAAgIIgBgLQgBgFgDgDQgDgDgFgBQgEgCgGAAQgKAAgHACIgNAFIgJAEIgGACIgDgBIgCgDIgBgEIgBgGIABgIQABgCACgCIAHgFQAFgDAHgCIAPgDQAIgCAIAAQAPAAALADQALADAHAHQAHAGADAKQAEAJAAAOIAABXQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAgBAAQAAABgBAAIgKAAIgJAAQgBAAgBgBQAAAAgBAAQAAAAgBgBQAAAAgBAAIgBgDIAAgLQgIAJgKAFQgLAFgLAAQgLAAgIgDgAgFALQgGABgEADQgEADgCADQgCAEAAAFQAAAIAFAFQAGAFAJAAQAHAAAGgEQAHgEAGgIIAAgWIgOAAQgJAAgFABg");
	this.shape_52.setTransform(725.475,23.525);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("ABNBIIgGgBIgDgCIgBgCIAAhNIgBgMQgBgFgDgEQgDgEgEgCQgDgCgGAAQgGgBgHAGQgHAFgIAJIAABXIgBACIgCACIgGABIgJABIgIgBIgFgBIgEgCIgBgCIAAhNIgBgMQgBgFgCgEQgDgEgEgCQgEgCgFAAQgHgBgHAGQgGAFgIAJIAABXIgBACIgDACIgFABIgJABIgJgBIgGgBIgDgCIgBgCIAAiCIABgDIACgBIAGgBIAHgBIAHABIAGABIABABIABADIAAAPQALgMALgGQALgFALgBQAJABAGACQAHABAEADQAEADAFAEIAGAKIALgKIALgIIALgEIALgCQANAAAJAFQAJAFAGAHQAFAHADAKQACAKAAAMIAABTIgBACIgDACIgFABIgJABIgJgBg");
	this.shape_53.setTransform(706.3,23.4);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAFgOQAEgOAJgKQAIgJAMgGQANgFAOAAQARAAAMAFQALAFAIAJQAHAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJACAHQADAGADAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAGgBIACAAIACACIABAEIAAAGIAAAGIAAADIgCADIgBACIgFADIgLAEIgPACQgJACgJAAQgRAAgNgFgAgKgsQgFADgDAEQgDAFgDAGQgCAGAAAHIA2AAQABgQgGgJQgIgJgOAAQgGAAgFADg");
	this.shape_54.setTransform(679.65,23.525);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AAiBHIgHgBIgEgDIgCgEIgVhOIAAgBIAAABIgUBOIgCAEIgEADIgHABIgMAAIgLAAIgHgBIgEgDIgCgEIgjh1IgBgHIgBgEIABgCIADgCIAGgBIAJAAIAJAAIAGABQABAAAAABQABAAAAAAQAAAAAAABQABAAAAAAIABADIAaBfIAAACIABgCIAYhfIABgDIADgCIAGgBIAHAAIAJAAIAGABIACACIACACIAaBgIAAACIAAgCIAZhfIACgDQAAAAAAAAQAAgBABAAQAAAAAAAAQABgBAAAAIAGgBIAJAAIAJAAIAFABIADACIABACIgBAEIgBAHIgjB1IgCAEIgEADIgHABIgLAAIgMAAg");
	this.shape_55.setTransform(661.225,23.525);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgTBJIgMgDIgJgEIgFgDIgDgFIgBgKIABgGIABgEQAAgBAAAAQAAgBAAAAQAAAAABAAQAAAAAAAAIACgBIAFACIAIAEIALAEQAGACAHAAIAIgBIAHgDIAFgFQABgDAAgEQAAgEgDgDIgHgGIgJgEIgMgFIgLgFIgKgHQgFgFgCgHQgDgGAAgJQAAgKADgIQAEgHAHgGQAHgGAKgDQAKgDALAAIAMABIAKACIAIADIAFADIACACIABADIABAEIAAAFIAAAHIgBAEIgBACIgDAAIgEgBIgHgEIgKgDQgFgCgHAAIgHABQgFABgCACIgDAFQgBACAAADQAAAFADADQACADAFACIAJAFIAMAEIALAGQAHADAEAEQAEAEADAHQADAGAAAJQAAALgEAJQgFAIgHAGQgHAGgLADQgKADgMAAIgNgBg");
	this.shape_56.setTransform(637.35,23.525);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgfBgQgMgDgIgEQgHgFgEgGQgDgHAAgIQAAgFACgEQAAgFADgDIAGgJIAIgHQgHgCgDgHQgDgFgBgHQAAgJAFgGQAEgHAGgFQgFgGgDgHQgDgHAAgLQAAgLADgKQAEgJAIgGQAHgGAKgDQAKgDAMgBIALABIAKACIAqAAQACAAACAEIABALQAAAGgCAEQAAABAAAAQgBABAAAAQgBABAAAAQgBAAAAAAIgQAAQADADACAFQACAFAAAEQgBAMgEAJQgDAIgIAHQgHAGgKADQgKADgLAAQgGAAgGgCIgJgDIgDAFQgCACABACQAAAFADADQAEACAHAAIAfABQALABAIADQAJACAHAGQAFAEAEAHQACAHAAAJQAAAJgEAJQgEAIgJAHQgIAGgNAEQgNADgQABQgQgBgMgCgAgYAtIgDAEIgCAFIAAAEQgBAHAIAFQAHADAOAAQAHAAAGgBQAGgCADgDQADgDACgDQABgEAAgDQABgHgGgDQgFgEgJgBIgZAAIgHAGgAgMhGQgEACgDADQgCADgCAEIgBAJQAAAKAGAGQAFAFALABQAFAAAEgCQADgCADgDIAFgHIABgJQAAgKgGgGQgGgGgJAAQgGAAgEACg");
	this.shape_57.setTransform(624.1,26.05);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AAjBIIgFgBIgEgCIgBgCIAAhKQABgKgCgFQgCgFgCgEQgCgEgEgCQgFgCgFAAQgGgBgIAGQgHAFgIAJIAABXIgBACIgDACIgFABIgJABIgJgBIgFgBIgEgCIgBgCIAAiCIABgDIADgBIAFgBIAHgBIAIABIAFABIACABIABADIAAAPQALgMALgGQAKgFANgBQAMAAAKAFQAJAFAFAHQAGAHADAKQADAKgBAPIAABQIgBACIgCACIgGABIgJABIgJgBg");
	this.shape_58.setTransform(609.1,23.4);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgIBkIgFgBIgDgCIgBgDIAAiBIABgDIADgCIAFgBIAIgBIAJABIAGABIADACIABADIAACBIgBADIgDACIgGABIgJAAIgIAAgAgQhAQgEgFAAgKQAAgLAEgFQAFgEALAAQANAAAEAEQAEAFAAAKQAAALgEAFQgFADgMAAQgLAAgFgDg");
	this.shape_59.setTransform(597.325,20.65);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AAjBmIgGgBIgCgCIgBgCIAAhLQAAgKgCgFQgBgFgDgDQgDgEgEgCQgEgCgGAAQgFgBgHAGQgIAEgHAJIAABYIgBACIgEACIgFABIgJABIgJgBIgGgBIgCgCIgBgCIAAjAIABgDQAAAAAAAAQAAgBAAAAQABAAAAAAQABAAAAgBIAGgBIAJAAIAJAAIAFABIAEACIABADIAABIQAJgJAKgFQAIgFALAAQAOAAAJAFQAJAFAFAHQAHAHACALQADAJAAAOIAABRIgBACIgEACIgFABIgJABIgJgBg");
	this.shape_60.setTransform(585.65,20.4);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AAABWQgIgCgGgGQgFgFgDgJQgCgKAAgLIAAhCIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgdIABgDIADgCIAGgBIAIAAIAIAAIAGABIADACIABADIAAAdIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgCIACAAIACAAIABADIABAEIAAAGIgBALIgCAEIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_61.setTransform(572.125,21.9);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgJgJQgJgJgEgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJAMgGQANgFAOAAQARAAAMAFQALAFAIAJQAHAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJACAHQADAGADAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAGgBIACAAIACACIABAEIAAAGIAAAGIAAADIgCADIgBACIgFADIgLAEIgPACQgIACgKAAQgQAAgOgFgAgJgsQgGADgDAEQgDAFgDAGQgCAGAAAHIA2AAQABgQgGgJQgIgJgOAAQgGAAgEADg");
	this.shape_62.setTransform(552.75,23.525);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("ABMBIIgFgBIgDgCIgBgCIAAhNIgBgMQgBgFgDgEQgDgEgEgCQgEgCgFAAQgHgBgGAGQgHAFgHAJIAABXIgBACIgEACIgFABIgJABIgIgBIgGgBIgCgCIgBgCIAAhNIgBgMQgCgFgDgEQgCgEgEgCQgEgCgFAAQgHgBgHAGQgHAFgHAJIAABXIgBACIgDACIgGABIgJABIgJgBIgFgBIgDgCIgBgCIAAiCIAAgDIAEgBIAEgBIAIgBIAIABIAEABIADABIABADIAAAPQALgMAKgGQALgFAMgBQAHABAHACQAGABAGADQADADAFAEIAFAKIAMgKIALgIIALgEIALgCQANAAAJAFQAJAFAFAHQAGAHACAKQADAKAAAMIAABTIgBACIgDACIgGABIgJABIgJgBg");
	this.shape_63.setTransform(533.1,23.4);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgIgJQgJgKgEgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKANgFQAOgGARAAQARAAANAFQANAFAJAJQAIAJAEAOQAEANAAASQAAAPgFAOQgEAOgIAKQgJAKgOAFQgNAGgRAAQgSAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQAEAGAGADQAFADAJAAQAIAAAGgDQAHgDADgGQAEgFACgIQACgJAAgKQAAgJgCgIQgBgIgDgGQgFgGgGgDQgGgEgIAAQgIAAgGADg");
	this.shape_64.setTransform(512.75,23.525);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgUBJIgMgDIgJgEIgEgDIgDgFIgBgKIAAgGIABgEQABgBAAAAQAAgBAAAAQAAAAABAAQAAAAAAAAIACgBIAFACIAHAEIALAEQAHACAIAAIAIgBIAHgDIADgFQACgDAAgEQAAgEgDgDIgHgGIgJgEIgLgFIgMgFIgKgHQgEgFgDgHQgDgGAAgJQAAgKAEgIQAEgHAGgGQAHgGAKgDQAKgDALAAIAMABIALACIAIADIAEADIACACIABADIAAAEIAAAFIAAAHIgBAEIgBACIgCAAIgEgBIgHgEIgJgDQgGgCgHAAIgIABQgDABgCACQgDACgBADQgBACgBADQAAAFADADQADADAFACIAJAFIAMAEIALAGQAGADAFAEQAEAEADAHQADAGAAAJQAAALgEAJQgEAIgIAGQgIAGgKADQgLADgLAAIgOgBg");
	this.shape_65.setTransform(498.8,23.525);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgJAMgGQANgFAOAAQARAAALAFQAMAFAIAJQAHAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJACAHQACAGAEAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAHgBIABAAIACACIABAEIAAAGIAAAGIgBADIgBADIgBACIgFADIgLAEIgPACQgJACgJAAQgRAAgNgFgAgJgsQgGADgDAEQgEAFgCAGQgCAGAAAHIA2AAQABgQgGgJQgIgJgOAAQgFAAgFADg");
	this.shape_66.setTransform(485.15,23.525);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AAiBHIgHgBIgEgDIgCgEIgVhOIAAgBIAAABIgUBOIgCAEIgEADIgHABIgMAAIgLAAIgHgBIgEgDIgCgEIgjh1IgBgHIgBgEIABgCIADgCIAGgBIAJAAIAJAAIAGABQABAAAAABQABAAAAAAQAAAAAAABQABAAAAAAIABADIAaBfIAAACIABgCIAYhfIABgDIADgCIAGgBIAHAAIAJAAIAGABIACACIACACIAaBgIAAACIAAgCIAZhfIACgDQAAAAAAAAQAAgBABAAQAAAAAAAAQABgBAAAAIAGgBIAJAAIAJAAIAFABIADACIABACIgBAEIgBAHIgjB1IgCAEIgEADIgHABIgLAAIgMAAg");
	this.shape_67.setTransform(466.725,23.525);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgeBHQgJgDgGgFQgHgFgDgIQgEgIAAgLQAAgLAFgJQAEgIAJgFQAJgFANgDQANgCARAAIAMAAIAAgIIgBgLQgBgFgDgDQgDgDgFgBQgEgCgGAAQgKAAgHACIgNAFIgJAEIgGACIgDgBIgCgDIgBgEIgBgGIABgIQABgCACgCIAHgFQAFgDAHgCIAPgDQAIgCAIAAQAPAAALADQALADAHAHQAHAGADAKQAEAJAAAOIAABXQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAgBAAQAAABgBAAIgKAAIgJAAQgBAAgBgBQAAAAgBAAQAAAAgBgBQAAAAgBAAIgBgDIAAgLQgIAJgKAFQgLAFgLAAQgLAAgIgDgAgFALQgGABgEADQgEADgCADQgCAEAAAFQAAAIAFAFQAGAFAJAAQAHAAAGgEQAHgEAGgIIAAgWIgOAAQgJAAgFABg");
	this.shape_68.setTransform(448.025,23.525);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgaBhIgEgCQgBAAAAAAQgBgBAAAAQAAAAAAgBQgBAAAAgBIABgEIASgsIgEgCIgCgEIgth3IgCgIQAAgBAAgBQAAAAAAgBQABAAAAgBQAAAAABAAQACgCAEgBIALAAIAKAAIAFABQABAAAAABQABAAAAAAQABAAAAABQAAAAABABIACAFIAdBXIABAAIAchZQABgEACgBQAAAAAAAAQABgBAAAAQABAAABAAQAAgBABAAIAMAAIAKAAQAEABACACQABAAAAABQAAAAAAABQABAAAAABQAAAAAAABIgCAGIgrB/IgPAvQgCADgGACQgFABgLAAIgKAAg");
	this.shape_69.setTransform(427.1,26.125);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AgIBmIgGgBIgCgCIgBgCIAAjAIABgDQAAAAAAAAQAAgBABAAQAAAAAAAAQABAAAAgBIAGgBIAIAAIAJAAIAFABIAEACIABADIAADAIgBACIgEACIgFABIgJABIgIgBg");
	this.shape_70.setTransform(416.35,20.4);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AAjBIIgFgBIgDgCIgCgCIAAhKQAAgKgBgFQgBgFgDgEQgDgEgEgCQgEgCgFAAQgHgBgHAGQgHAFgHAJIAABXIgBACIgEACIgFABIgJABIgJgBIgGgBIgCgCIgBgCIAAiCIAAgDIADgBIAFgBIAHgBIAIABIAFABIACABIABADIAAAPQALgMALgGQAKgFAMgBQAOAAAJAFQAJAFAFAHQAHAHACAKQADAKAAAPIAABQIgCACIgDACIgFABIgJABIgJgBg");
	this.shape_71.setTransform(404.65,23.4);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgIgJQgJgKgEgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKANgFQANgGASAAQARAAANAFQANAFAJAJQAIAJAEAOQAEANAAASQAAAPgEAOQgEAOgKAKQgIAKgOAFQgNAGgSAAQgRAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQAEAGAGADQAFADAJAAQAIAAAGgDQAHgDADgGQAFgFABgIQACgJAAgKQAAgJgBgIQgCgIgEgGQgDgGgHgDQgGgEgIAAQgIAAgGADg");
	this.shape_72.setTransform(388.45,23.525);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAFgOQAEgOAJgKQAIgJAMgGQANgFAOAAQARAAAMAFQALAFAIAJQAHAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJACAHQADAGADAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAGgBIACAAIACACIABAEIAAAGIAAAGIAAADIgCADIgBACIgFADIgLAEIgPACQgIACgKAAQgRAAgNgFgAgKgsQgFADgDAEQgDAFgDAGQgCAGAAAHIA2AAQABgQgGgJQgIgJgOAAQgGAAgFADg");
	this.shape_73.setTransform(366,23.525);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AAjBmIgGgBIgCgCIgBgCIAAhLQgBgKgBgFQgBgFgDgDQgDgEgEgCQgEgCgGAAQgGgBgGAGQgIAEgIAJIAABYIAAACIgDACIgGABIgJABIgJgBIgGgBIgDgCIgBgCIAAjAIABgDQABAAAAAAQAAgBAAAAQABAAAAAAQABAAAAgBIAGgBIAJAAIAJAAIAGABIADACIAAADIAABIQAKgJAKgFQAIgFAMAAQANAAAJAFQAJAFAGAHQAFAHADALQACAJABAOIAABRIgBACIgEACIgFABIgJABIgJgBg");
	this.shape_74.setTransform(350.5,20.4);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AAABWQgIgCgGgGQgFgFgDgJQgCgKAAgLIAAhCIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgdIABgDIADgCIAGgBIAIAAIAIAAIAGABIADACIABADIAAAdIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgCIACAAIACAAIABADIABAEIAAAGIgBALIgCAEIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_75.setTransform(336.975,21.9);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AAABWQgIgCgGgGQgFgFgDgJQgCgKAAgLIAAhCIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgdIABgDIADgCIAGgBIAIAAIAIAAIAGABIADACIABADIAAAdIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgCIACAAIACAAIABADIABAEIAAAGIgBALIgCAEIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_76.setTransform(319.775,21.9);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgFAnIgEgCIgDgCIgBgDIgDhAQAAAAAAgBQAAAAAAAAQAAAAAAgBQABAAAAAAIADgDIAFgBIAHAAIAIAAIAGABIADADIAAACIgDBAIgBADIgCADIgEABIgHAAIgFAAg");
	this.shape_77.setTransform(311.2938,13.95);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AAjBIIgFgBIgDgCIgCgCIAAhKQAAgKgBgFQgBgFgDgEQgDgEgEgCQgEgCgGAAQgGgBgHAGQgHAFgHAJIAABXIgBACIgEACIgFABIgJABIgJgBIgGgBIgCgCIgBgCIAAiCIAAgDIADgBIAFgBIAHgBIAIABIAFABIACABIABADIAAAPQALgMALgGQAKgFAMgBQAOAAAJAFQAJAFAFAHQAHAHACAKQADAKAAAPIAABQIgCACIgDACIgFABIgJABIgJgBg");
	this.shape_78.setTransform(299.8,23.4);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgJgJQgJgJgEgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJAMgGQANgFAOAAQARAAAMAFQALAFAIAJQAHAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJACAHQADAGADAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAGgBIACAAIACACIABAEIAAAGIAAAGIAAADIgCADIgBACIgFADIgLAEIgPACQgIACgKAAQgQAAgOgFgAgKgsQgFADgDAEQgDAFgDAGQgCAGAAAHIA2AAQABgQgGgJQgIgJgOAAQgGAAgFADg");
	this.shape_79.setTransform(284.1,23.525);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AgfBIIgGgBIgDgCIgBgCIAAiCIAAgDIADgBIAGgBIAHgBIAIABIAEABIACABIABADIAAAQIAKgMIAIgIQAEgCAEgBIAIgCIAFABIAEABIAEABIACABIABABIABADIAAAFIABAIIgBAJIgBAFIgBADIgCABIgDgBIgDgCIgEgBIgFAAIgGABQgDACgDACIgHAHIgHALIAABRIgBACIgDACIgGABIgJABIgIgBg");
	this.shape_80.setTransform(272.35,23.4);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AgeBHQgJgDgGgFQgHgFgDgIQgEgIAAgLQAAgLAFgJQAEgIAJgFQAJgFANgDQANgCARAAIAMAAIAAgIIgBgLQgBgFgDgDQgDgDgFgBQgEgCgGAAQgKAAgHACIgNAFIgJAEIgGACIgDgBIgCgDIgBgEIgBgGIABgIQABgCACgCIAHgFQAFgDAHgCIAPgDQAIgCAIAAQAPAAALADQALADAHAHQAHAGADAKQAEAJAAAOIAABXQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAgBAAQgBABAAAAIgKAAIgJAAQgBAAgBgBQAAAAgBAAQAAAAgBgBQAAAAgBAAIgBgDIAAgLQgIAJgKAFQgLAFgLAAQgLAAgIgDgAgFALQgGABgEADQgEADgCADQgCAEAAAFQAAAIAFAFQAGAFAJAAQAHAAAGgEQAHgEAGgIIAAgWIgOAAQgJAAgFABg");
	this.shape_81.setTransform(258.525,23.525);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgTBJIgNgDIgJgEIgEgDIgDgFIgBgKIAAgGIABgEQABgBAAAAQAAgBAAAAQAAAAABAAQAAAAAAAAIACgBIAFACIAHAEIALAEQAHACAIAAIAHgBIAIgDIADgFQACgDAAgEQAAgEgDgDIgHgGIgJgEIgLgFIgMgFIgKgHQgEgFgDgHQgDgGAAgJQAAgKAEgIQAEgHAGgGQAHgGAKgDQAKgDALAAIAMABIALACIAIADIAEADIACACIABADIABAEIAAAFIAAAHIgCAEIgBACIgCAAIgEgBIgHgEIgJgDQgGgCgHAAIgIABQgEABgBACIgEAFQgBACgBADQAAAFAEADQACADAFACIAJAFIAMAEIALAGQAGADAFAEQAEAEADAHQADAGAAAJQAAALgEAJQgEAIgIAGQgHAGgLADQgLADgLAAIgNgBg");
	this.shape_82.setTransform(238.8,23.525);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AgIBmIgGgBIgDgCIAAgCIAAjAIAAgDQABAAAAAAQAAgBAAAAQABAAAAAAQABAAAAgBIAGgBIAIAAIAJAAIAGABIACACIABADIAADAIgBACIgCACIgGABIgJABIgIgBg");
	this.shape_83.setTransform(229.1,20.4);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgJgJQgIgJgFgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJANgGQAMgFAPAAQAQAAAMAFQALAFAHAJQAIAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJACAHQABAGAEAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAFgBIADAAIABACIABAEIAAAGIAAAGIAAADIgBADIgCACIgFADIgLAEIgPACQgIACgLAAQgPAAgOgFgAgKgsQgFADgDAEQgDAFgCAGQgCAGAAAHIA2AAQAAgQgGgJQgIgJgNAAQgGAAgGADg");
	this.shape_84.setTransform(217.8,23.525);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AgjBiQgLgGgGgKQgHgKgDgNQgDgNAAgPQAAgRAEgOQAEgNAHgKQAHgKALgEQAKgGAOAAQAKAAAJAEQAJAFAJAJIAAhHIABgDIADgBIAFgCIAJgBIAJABIAGACIADABIABADIAAC/IgBADIgDACIgEABIgIAAIgHAAIgFgBIgDgCIgBgDIAAgOQgKAKgLAHQgLAFgMAAQgPAAgKgFgAgNgIQgFAEgDAFQgDAFgCAIQgBAHAAAIIABAQQABAHADAHQADAGAFADQAFAEAIAAIAGgBIAIgEIAHgGIAJgKIAAgrQgIgJgHgGQgHgFgHAAQgHAAgGAEg");
	this.shape_85.setTransform(201.875,20.55);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgJgJQgHgKgFgNQgEgNAAgSQAAgPAFgOQAEgOAJgKQAJgKANgFQAOgGAQAAQATAAAMAFQANAFAIAJQAJAJAEAOQAEANAAASQAAAPgEAOQgFAOgJAKQgJAKgNAFQgOAGgRAAQgRAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJACAJQABAIAEAGQADAGAHADQAFADAJAAQAIAAAHgDQAFgDAFgGQADgFACgIQACgJAAgKQAAgJgBgIQgCgIgEgGQgEgGgGgDQgFgEgKAAQgHAAgGADg");
	this.shape_86.setTransform(186.1,23.525);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("ABMBIIgFgBIgDgCIgBgCIAAhNIgBgMQgCgFgCgEQgDgEgEgCQgEgCgEAAQgIgBgGAGQgHAFgHAJIAABXIgBACIgEACIgFABIgJABIgIgBIgGgBIgCgCIgBgCIAAhNIgBgMQgCgFgDgEQgCgEgEgCQgEgCgFAAQgHgBgHAGQgHAFgHAJIAABXIgBACIgDACIgGABIgJABIgJgBIgFgBIgDgCIgBgCIAAiCIAAgDIAEgBIAEgBIAIgBIAIABIAEABIADABIABADIAAAPQALgMAKgGQALgFAMgBQAHABAHACQAGABAGADQADADAFAEIAFAKIAMgKIALgIIALgEIALgCQANAAAJAFQAJAFAFAHQAGAHACAKQADAKAAAMIAABTIgBACIgDACIgGABIgJABIgJgBg");
	this.shape_87.setTransform(165.9,23.4);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AgjBiQgLgGgGgKQgHgKgDgNQgDgNAAgPQAAgRAEgOQAEgNAHgKQAHgKALgEQAKgGAOAAQAKAAAJAEQAJAFAJAJIAAhHIABgDIADgBIAFgCIAJgBIAJABIAGACIADABIABADIAAC/IgBADIgDACIgEABIgIAAIgHAAIgFgBIgDgCIgBgDIAAgOQgKAKgLAHQgLAFgMAAQgPAAgKgFgAgNgIQgFAEgDAFQgDAFgCAIQgBAHAAAIIABAQQABAHADAHQADAGAFADQAFAEAIAAIAGgBIAIgEIAHgGIAJgKIAAgrQgIgJgHgGQgHgFgHAAQgHAAgGAEg");
	this.shape_88.setTransform(138.425,20.55);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AAjBIIgFgBIgEgCIgBgCIAAhKQABgKgCgFQgCgFgCgEQgDgEgDgCQgFgCgFAAQgGgBgIAGQgHAFgHAJIAABXIgCACIgDACIgFABIgJABIgJgBIgFgBIgDgCIgCgCIAAiCIABgDIADgBIAFgBIAHgBIAIABIAFABIACABIABADIAAAPQALgMALgGQAKgFAMgBQANAAAKAFQAJAFAFAHQAGAHADAKQACAKAAAPIAABQIgBACIgCACIgGABIgJABIgJgBg");
	this.shape_89.setTransform(122.75,23.4);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AgeBHQgJgDgGgFQgHgFgDgIQgEgIAAgLQAAgLAFgJQAEgIAJgFQAJgFANgDQANgCARAAIAMAAIAAgIIgBgLQgBgFgDgDQgDgDgFgBQgEgCgGAAQgKAAgHACIgNAFIgJAEIgGACIgDgBIgCgDIgBgEIgBgGIABgIQABgCACgCIAHgFQAFgDAHgCIAPgDQAIgCAIAAQAPAAALADQALADAHAHQAHAGADAKQAEAJAAAOIAABXQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAgBAAQgBABAAAAIgKAAIgJAAQgBAAgBgBQAAAAgBAAQAAAAgBgBQAAAAgBAAIgBgDIAAgLQgIAJgKAFQgLAFgLAAQgLAAgIgDgAgFALQgGABgEADQgEADgCADQgCAEAAAFQAAAIAFAFQAGAFAJAAQAHAAAGgEQAHgEAGgIIAAgWIgOAAQgJAAgFABg");
	this.shape_90.setTransform(106.875,23.525);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AgTBJIgNgDIgJgEIgEgDIgDgFIgBgKIAAgGIABgEQABgBAAAAQAAgBAAAAQAAAAABAAQAAAAAAAAIACgBIAFACIAHAEIALAEQAHACAIAAIAHgBIAIgDIADgFQACgDAAgEQAAgEgDgDIgHgGIgJgEIgLgFIgMgFIgKgHQgEgFgDgHQgDgGAAgJQAAgKAEgIQAEgHAGgGQAHgGAKgDQAKgDALAAIAMABIALACIAIADIAEADIACACIABADIABAEIAAAFIAAAHIgCAEIgBACIgCAAIgEgBIgHgEIgJgDQgGgCgHAAIgIABQgEABgBACIgEAFQgBACgBADQAAAFAEADQACADAFACIAJAFIAMAEIALAGQAGADAFAEQAEAEADAHQADAGAAAJQAAALgEAJQgEAIgIAGQgHAGgLADQgLADgLAAIgNgBg");
	this.shape_91.setTransform(87.15,23.525);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AgRBFQgLgFgJgIQgHgKgEgNQgFgOAAgQQABgTAFgOQAEgOAJgKQAJgJAMgFQAMgFAOAAIALACIAKADQAFABAEACIAGAEIACADIABADIAAAEIAAAHIgBAMQAAAAAAABQgBAAAAABQgBAAAAAAQgBAAAAAAQgDAAgDgCIgHgEIgJgEQgEgCgIAAQgOgBgHALQgIAMABAUQAAAKABAJQACAHAEAGQADAFAFADQAGADAIAAQAHAAAFgCIAKgFIAHgGQABAAAAAAQABgBAAAAQABAAAAAAQABAAABAAIACAAIABADIABAFIAAAIIAAAGIgBAFIgBACIgBADIgHAEIgKAEIgLAEIgNABQgOgBgMgEg");
	this.shape_92.setTransform(74.95,23.5);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AgIBkIgFgBIgDgCIgBgDIAAiBIABgDIADgCIAFgBIAIgBIAJABIAGABIADACIABADIAACBIgBADIgDACIgGABIgJAAIgIAAgAgQhAQgEgFAAgKQAAgLAEgFQAFgEALAAQANAAAEAEQAEAFAAAKQAAALgEAFQgFADgMAAQgLAAgFgDg");
	this.shape_93.setTransform(64.875,20.65);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AAjBmIgFgBIgDgCIgCgCIAAhLQAAgKgBgFQgBgFgDgDQgDgEgEgCQgEgCgGAAQgGgBgHAGQgHAEgHAJIAABYIgBACIgEACIgFABIgJABIgJgBIgGgBIgCgCIgBgCIAAjAIABgDQAAAAAAAAQAAgBABAAQAAAAAAAAQABAAAAgBIAGgBIAJAAIAJAAIAFABIAEACIABADIAABIQAJgJAKgFQAIgFALAAQAOAAAJAFQAJAFAFAHQAHAHACALQADAJAAAOIAABRIgCACIgDACIgFABIgJABIgJgBg");
	this.shape_94.setTransform(53.2,20.4);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("Ag3BiIgGgBIgDgCIgBgCIAAi2IABgDIADgBIAEgBIAIgBIAHABIAFABIADABIAAADIAAAPIAMgKIALgIIALgEQAGgCAHAAQAOAAAKAGQAKAGAHAKQAGAKADAMQADANAAAPQAAASgEANQgEANgHALQgHAJgLAFQgKAGgOAAIgKgBIgJgEIgJgFIgJgIIAAA+IgBACIgDACIgFABIgJAAIgJAAgAgEhBQgEABgEACIgIAHIgIAKIAAArQAIAJAHAFQAHAGAHgBQAHABAFgEQAFgEADgFQADgGACgHQABgIAAgHIgBgQQgBgIgDgGQgDgGgFgEQgFgDgHAAIgGABg");
	this.shape_95.setTransform(37.425,26);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AgeBHQgJgDgGgFQgHgFgDgIQgEgIAAgLQAAgLAFgJQAEgIAJgFQAJgFANgDQANgCARAAIAMAAIAAgIIgBgLQgBgFgDgDQgDgDgFgBQgEgCgGAAQgKAAgHACIgNAFIgJAEIgGACIgDgBIgCgDIgBgEIgBgGIABgIQABgCACgCIAHgFQAFgDAHgCIAPgDQAIgCAIAAQAPAAALADQALADAHAHQAHAGADAKQAEAJAAAOIAABXQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAgBAAQAAABgBAAIgKAAIgJAAQgBAAgBgBQAAAAgBAAQAAAAgBgBQAAAAgBAAIgBgDIAAgLQgIAJgKAFQgLAFgLAAQgLAAgIgDgAgFALQgGABgEADQgEADgCADQgCAEAAAFQAAAIAFAFQAGAFAJAAQAHAAAGgEQAHgEAGgIIAAgWIgOAAQgJAAgFABg");
	this.shape_96.setTransform(21.225,23.525);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AgfBIIgGgBIgDgCIgBgCIAAiCIABgDIACgBIAGgBIAHgBIAHABIAGABIABABIABADIAAAQIAKgMIAIgIQAEgCAEgBIAIgCIAFABIAEABIAEABIADABIABABIAAADIAAAFIABAIIgBAJIAAAFIgBADIgDABIgDgBIgDgCIgEgBIgFAAIgGABQgEACgDACIgGAHIgHALIAABRIgBACIgDACIgFABIgJABIgJgBg");
	this.shape_97.setTransform(10.25,23.4);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AgXBcQgSgHgNgMQgNgNgGgSQgHgRAAgWQAAgXAHgSQAHgTANgNQANgNASgHQASgHAWAAQAMAAAKACQALABAHADIAMAFIAHAFQACACACAEIAAALIAAAHIgBAFIgCADIgCABQgCgBgEgCIgMgGIgQgGQgKgDgNAAQgOAAgKAGQgLAEgIAJQgIAIgEANQgEAMgBAOQABAQAEANQAEAMAIAJQAIAHALAFQAJAEAOAAQAHAAAFgBIAMgFIAAgsIgkAAQgCABgBgEQgCgDAAgIIABgGIABgFIABgCIACgBIBAAAIAFABIADACIACAFIABAEIAABLQAAAFgCADQgBADgFACIgMAEIgOAEIgQABIgPABQgWAAgRgGg");
	this.shape_98.setTransform(-5.75,21.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.games_blurb, new cjs.Rectangle(-16.9,0,789,117.8), null);


(lib.dp = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAjP3IAA/tIPaAAQDYAAB4BJQB8BKAACBIAAF2QAADtiwB1QjBB+mxAAIjrAAIAAODgAG8hzIDrAAQDdAABVg3QBXg1AAiNIAAlrQAAg3heAAIoWAAgAv8P3QjYAAh4hJQh8hKAAiBIAAl2QAAjtCwh1QDBh+GxAAIDrAAIAAuDIGZAAIAAftgAvYCrQhXA1AACNIAAFrQAAA3BeAAIIWAAIAAqbIjrAAQjdAAhVA3g");
	this.shape.setTransform(148.125,101.475);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.dp, new cjs.Rectangle(0,0,296.3,203), null);


(lib.designCo = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhbBcIAAi3IC3AAIAAC3g");
	this.shape.setTransform(586.925,147.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhkKEQhSABgvgvQguguAAhSIAAuqQAAhSAugvQAvgvBSAAIDJAAQBSAAAvAvQAuAvAABSIAAOqQAABSguAuQgvAvhSgBgAh2nNIAAObQAAAkAjAAICoAAQAjAAAAgkIAAubQAAgjgjAAIioAAQgjAAAAAjg");
	this.shape_1.setTransform(536.85,91.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AhjKEQhSABgvgvQgvguAAhSIAAuqQAAhSAvgvQAvgvBSAAIDHAAQBSAAAvAvQAvAvAABSIAAD4IicAAIAAjxQAAgjgkAAIinAAQgjAAAAAjIAAObQAAAkAjAAICnAAQAkAAAAgkIAAjxICcAAIAAD5QAABSgvAuQgvAvhSgBg");
	this.shape_2.setTransform(464.075,91.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AB9KEIi9qEIhEkQIAKEQIAAKEIiWAAIAA0IICTAAIC+KEIBEESIgKkSIAAqEICWAAIAAUIg");
	this.shape_3.setTransform(353.775,91.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAeKEQikAAhKhRQhEhJAAiXIAAsnQAAhSAwgvQAugvBTAAIDHAAQBTAAAvAvQAuAvABBSIAAD4IidAAIAAjxQAAgjgkAAIimAAQgkAAAAAjIAAMgQAABZAgAjQAhAjBTAAIBaAAIAAmoIhvAAIAAiTIEMAAIAALNg");
	this.shape_4.setTransform(279.95,91.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AhOKEIAA0IICdAAIAAUIg");
	this.shape_5.setTransform(225.575,91.9);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AhjKEQhTABgvgvQgvguABhSIAAj5ICcAAIAADxQAAAkAjAAICoAAQAkAAAAgkIAAjUQAAhIg+gxQgXgSgngXIgkgSIglgUQhdgygrg0Qg9hNgBh4IAAjbQABhSAtgvQAwgvBSAAIDIAAQBSAAAvAvQAuAvAABSIAAD4IicAAIAAjxQAAgjgkAAIinAAQgjAAAAAjIAADUQAABPA9AzQAYATAnAWIAkATIAkASQBeAvArA0QA9BKAAB2IAADcQAABSguAuQgvAvhSgBg");
	this.shape_6.setTransform(171.2,91.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AjsKEIAA0IIHZAAIAACUIk7AAIAAGnIE7AAIAACTIk7AAIAAGoIE7AAIAACSg");
	this.shape_7.setTransform(109.025,91.9);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AkUKEIAA0IIF4AAQBSAAAwAvQAuAvABBSIAAMnQAACXhEBJQhJBRilAAgAh3HyIBaAAQBUAAAggjQAhgjAAhZIAAsgQAAgjglAAIjKAAg");
	this.shape_8.setTransform(38.85,91.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.designCo, new cjs.Rectangle(0,0,601.1,186.5), null);


(lib.circle = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFB24B").s().p("A0XUYQococAAr8QAAr6IcodQIdocL6AAQL8AAIcIcQIcIdAAL6QAAL8ocIcQocIcr8AAQr6AAodocgAzFzFQn5H7AALKQAALMH5H5QH7H6LKAAQLMAAH5n6QH6n5AArMQAArKn6n7Qn5n5rMAAQrKAAn7H5g");
	this.shape.setTransform(184.35,184.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AwjQkQm2m4gBpsQABprG2m4QG4m2JrgBQJsABG4G2QG2G4AAJrQAAJsm2G4Qm4G2psAAQprAAm4m2g");
	this.shape_1.setTransform(184.35,184.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AzFTFQn5n5AArMQAArKH5n7QH7n5LKAAQLMAAH5H5QH6H7AALKQAALMn6H5Qn5H6rMAAQrKAAn7n6gAwjwjQm2G4gBJrQABJsG2G4QG4G2JrAAQJsAAG4m2QG2m4AApsQAAprm2m4Qm4m2psgBQprABm4G2g");
	this.shape_2.setTransform(184.35,184.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.circle, new cjs.Rectangle(0,0,368.7,368.7), null);


(lib.button = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF6A5B").s().p("EAMWBUYI41AAIAAg8IAA7+IAA7+IAA79IAA7+IAA7+IAA7+IY1AAIAKAAIAAb+IAAb+IAAb+IAAb9IAAb+IAAb+IAAA8IgKAAg");
	this.shape.setTransform(80,540);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF8275").s().p("EAMWBUYI41AAIAAg8IAA7+IAA7+IAA79IAA7+IAA7+IAA7+IY1AAIAKAAIAAb+IAAb+IAAb+IAAb9IAAb+IAAb+IAAA8IgKAAg");
	this.shape_1.setTransform(80,540);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,160,1080);


(lib.btn_yellow = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFB24B").s().p("EAMWBUYI41AAIAAg8IAA7+IAA7+IAA79IAA7+IAA7+IAA7+IY1AAIAKAAIAAb+IAAb+IAAb+IAAb9IAAb+IAAb+IAAA8IgKAAg");
	this.shape.setTransform(80,540);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFBC63").s().p("EAMWBUYI41AAIAAg8IAA7+IAA7+IAA79IAA7+IAA7+IAA7+IY1AAIAKAAIAAb+IAAb+IAAb+IAAb9IAAb+IAAb+IAAA8IgKAAg");
	this.shape_1.setTransform(80,540);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,160,1080);


(lib.btn_tv = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.TV();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1302,1380);


(lib.btn_teal = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#84B8AB").s().p("EAMWBUYI41AAIAAg8IAA7+IAA7+IAA79IAA7+IAA7+IAA7+IY1AAIAKAAIAAb+IAAb+IAAb+IAAb9IAAb+IAAb+IAAA8IgKAAg");
	this.shape.setTransform(80,540);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#96D1C2").s().p("EAMWBUYI41AAIAAg8IAA7+IAA7+IAA79IAA7+IAA7+IAA7+IY1AAIAKAAIAAb+IAAb+IAAb+IAAb9IAAb+IAAb+IAAA8IgKAAg");
	this.shape_1.setTransform(80,540);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,160,1080);


(lib.btn_red = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#B93564").s().p("EAMWBUYI41AAIAAg8IAA7+IAA7+IAA79IAA7+IAA7+IAA7+IY1AAIAKAAIAAb+IAAb+IAAb+IAAb9IAAb+IAAb+IAAA8IgKAAg");
	this.shape.setTransform(80,540);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D43D72").s().p("EAMWBUYI41AAIAAg8IAA7+IAA7+IAA79IAA7+IAA7+IAA7+IY1AAIAKAAIAAb+IAAb+IAAb+IAAb9IAAb+IAAb+IAAA8IgKAAg");
	this.shape_1.setTransform(80,540);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,160,1080);


(lib.back = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ADAH/IAEACIgEADgAgyk7IiRAAIAAhzICRAAIAAhVIDyCOIAAAEIjyCMg");
	this.shape.setTransform(147.375,65.3125);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.back, new cjs.Rectangle(127.8,13.8,39.2,103.10000000000001), null);


(lib._3d_blurb = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgQASQgFgFAAgMQAAgNAFgFQAFgFALAAQAMAAAFAFQAFAFAAAMQAAANgFAFQgFAFgMAAQgMAAgEgFg");
	this.shape.setTransform(699.525,67.075);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAjBIIgFgBIgEgCIgBgCIAAhKQABgJgCgGQgCgFgCgEQgDgEgDgCQgFgDgFABQgHAAgHAEQgHAGgHAJIAABXIgCACIgDACIgFABIgJAAIgJAAIgFgBIgDgCIgCgCIAAiCIABgDIADgBIAFgBIAHgBIAIABIAFABIACABIABADIAAAPQALgMALgGQAKgFANgBQAMAAAKAFQAJAFAFAHQAHAHACAKQACALAAAOIAABQIgBACIgCACIgGABIgJAAIgJAAg");
	this.shape_1.setTransform(687.5,62);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgJgJQgHgKgFgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKANgFQANgGASAAQASAAAMAFQANAFAIAJQAJAJAEAOQAEANAAASQAAAPgEAOQgFAOgJAKQgIAKgOAFQgNAGgSAAQgRAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJACAJQABAIAEAGQADAGAHADQAFADAJAAQAIAAAHgDQAFgDAEgGQAEgFACgIQACgJAAgKQAAgJgBgIQgCgIgEgGQgDgGgHgDQgFgEgKAAQgHAAgGADg");
	this.shape_2.setTransform(671.3,62.125);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgIBkIgFgBIgDgCIgBgDIAAiBIABgDIADgCIAFgBIAIgBIAJABIAGABIADACIABADIAACBIgBADIgDACIgGABIgJAAIgIAAgAgQhAQgEgFAAgKQAAgLAEgFQAFgEALAAQANAAAEAEQAEAFAAAKQAAALgEAFQgFAEgMgBQgLABgFgEg");
	this.shape_3.setTransform(659.575,59.25);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgUBJIgMgDIgJgEIgEgDIgDgFIgBgKIAAgGIABgEQABgBAAAAQAAgBAAAAQAAAAABAAQAAAAAAAAIACgBIAFACIAHAEIALAEQAHACAIAAIAIgBIAHgDIADgFQACgDAAgEQAAgEgDgDIgHgGIgJgEIgLgFIgMgFIgKgHQgEgFgDgHQgDgGAAgJQAAgKAEgIQAEgHAGgGQAHgGAKgDQAKgDALAAIAMABIALACIAIADIAEADIACACIABADIAAAEIAAAFIAAAHIgBAEIgBACIgCAAIgEgBIgHgEIgJgDQgGgCgHAAIgIABQgDABgCACQgDACgBADQgBACgBADQAAAFADADQADADAFACIAJAFIAMAEIAMAGQAFADAFAEQAEAEADAHQADAGAAAJQAAALgEAJQgEAIgIAGQgIAGgKADQgLADgLAAIgOgBg");
	this.shape_4.setTransform(650,62.125);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAjBIIgFgBIgDgCIgCgCIAAhKQAAgJgBgGQgCgFgCgEQgDgEgEgCQgEgDgGABQgGAAgHAEQgHAGgHAJIAABXIgBACIgEACIgFABIgJAAIgJAAIgGgBIgCgCIgBgCIAAiCIAAgDIADgBIAFgBIAHgBIAIABIAFABIACABIABADIAAAPQALgMALgGQAKgFAMgBQANAAAKAFQAJAFAFAHQAHAHACAKQADALAAAOIAABQIgCACIgDACIgFABIgJAAIgJAAg");
	this.shape_5.setTransform(635.95,62);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgJgJQgJgJgEgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJAMgGQANgFAOAAQARAAAMAFQALAFAIAJQAHAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJACAHQADAGADAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAGgBIACAAIACACIABAEIAAAGIAAAGIAAADIgCADIgBACIgFADIgLAEIgPACQgIACgKAAQgQAAgOgFgAgJgsQgGADgDAEQgDAFgDAGQgCAGAAAHIA2AAQABgQgGgJQgIgJgOAAQgGAAgEADg");
	this.shape_6.setTransform(620.25,62.125);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("ABMBIIgFgBIgDgCIgBgCIAAhNIgBgMQgBgFgDgEQgDgEgEgCQgEgDgFABQgHAAgGAEQgHAGgHAJIAABXIgBACIgEACIgFABIgJAAIgIAAIgGgBIgCgCIgBgCIAAhNIgBgMQgCgFgDgEQgCgEgEgCQgEgDgFABQgHAAgHAEQgHAGgHAJIAABXIgBACIgDACIgGABIgJAAIgJAAIgFgBIgDgCIgBgCIAAiCIAAgDIAEgBIAEgBIAIgBIAIABIAEABIADABIABADIAAAPQALgMAKgGQALgFAMgBQAHAAAHADQAGABAGADQADADAFAFIAFAJIAMgKIALgIIALgEIALgCQANAAAJAFQAJAFAFAHQAGAHACAKQADALAAALIAABTIgBACIgDACIgGABIgJAAIgJAAg");
	this.shape_7.setTransform(600.6,62);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgIBkIgFgBIgDgCIgBgDIAAiBIABgDIADgCIAFgBIAIgBIAJABIAGABIADACIABADIAACBIgBADIgDACIgGABIgJAAIgIAAgAgQhAQgEgFAAgKQAAgLAEgFQAFgEALAAQANAAAEAEQAEAFAAAKQAAALgEAFQgFAEgMgBQgLABgFgEg");
	this.shape_8.setTransform(584.675,59.25);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgjBiQgLgGgGgKQgHgKgDgNQgDgNAAgPQAAgRAEgOQAEgNAHgKQAHgKALgFQAKgFAOAAQAKAAAJAEQAJAFAJAJIAAhHIABgDIADgCIAFgBIAJgBIAJABIAGABIADACIABADIAAC/IgBADIgDACIgEABIgIAAIgHAAIgFgBIgDgCIgBgDIAAgOQgKAKgLAHQgLAFgMAAQgPAAgKgFgAgNgIQgFADgDAGQgDAFgCAIQgBAHAAAIIABAQQABAHADAHQADAGAFADQAFAEAIAAIAGgBIAIgEIAHgGIAJgKIAAgrQgIgJgHgFQgHgGgHAAQgHAAgGAEg");
	this.shape_9.setTransform(572.575,59.15);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAABWQgIgCgGgGQgFgGgDgIQgCgKAAgMIAAhBIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgeIABgCIADgCIAGgBIAIAAIAIAAIAGABIADACIABACIAAAeIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgBIACgBIACABIABACIABAEIAAAGIgBAKIgCAFIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_10.setTransform(552.675,60.5);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAiBHIgGgBIgEgCIgBgCIgYguIgYAuIgBACIgDACIgGABIgKAAIgLAAIgFgCQgBAAAAAAQAAgBgBAAQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAIAkhAIghg8IgBgEQAAgBAAAAQAAgBAAAAQAAAAAAgBQABAAAAAAIAHgCIALAAIAKAAIAGABIAEABIABACIAXAsIAXgsIABgCIADgBIAFgBIAJAAIAKAAIAGABQAAABABAAQAAAAAAABQAAAAAAAAQABABAAAAIgCAFIghA7IAkBBIABAEQAAAAAAAAQAAABAAAAQgBAAAAABQAAAAgBAAIgGACIgLAAIgLAAg");
	this.shape_11.setTransform(540.7938,62.125);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgJgJQgJgJgEgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJAMgGQANgFAPAAQAQAAAMAFQALAFAIAJQAHAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJADAHQACAGADAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAFgBIACAAIACACIABAEIAAAGIAAAGIAAADIgBADIgCACIgFADIgLAEIgPACQgIACgKAAQgQAAgOgFgAgKgsQgFADgDAEQgEAFgBAGQgDAGAAAHIA2AAQABgQgGgJQgIgJgOAAQgGAAgFADg");
	this.shape_12.setTransform(526.75,62.125);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAjBIIgGgBIgDgCIAAgCIAAhKQgBgJgBgGQgCgFgCgEQgCgEgEgCQgFgDgGABQgGAAgGAEQgIAGgIAJIAABXIgBACIgCACIgGABIgJAAIgJAAIgFgBIgEgCIgBgCIAAiCIABgDIADgBIAFgBIAIgBIAHABIAFABIACABIABADIAAAPQALgMALgGQAKgFANgBQANAAAJAFQAJAFAGAHQAFAHADAKQACALABAOIAABQIgBACIgDACIgGABIgJAAIgJAAg");
	this.shape_13.setTransform(511.25,62);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgJAMgGQANgFAOAAQARAAALAFQAMAFAIAJQAHAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJACAHQACAGAEAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAHgBIABAAIACACIABAEIAAAGIAAAGIgBADIgBADIgBACIgFADIgLAEIgPACQgJACgJAAQgRAAgNgFgAgJgsQgGADgDAEQgEAFgCAGQgCAGAAAHIA2AAQABgQgGgJQgIgJgOAAQgFAAgFADg");
	this.shape_14.setTransform(488.75,62.125);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AAjBmIgGgBIgCgCIgBgCIAAhLQAAgJgCgGQgBgFgDgDQgDgEgEgCQgEgDgGABQgFAAgHAEQgIAFgIAJIAABYIAAACIgDACIgGABIgJAAIgJAAIgGgBIgCgCIgBgCIAAjAIABgDQAAAAAAAAQAAgBAAAAQABAAAAAAQABAAAAAAIAGgCIAJAAIAJAAIAGACIADABIAAADIAABIQAKgJAKgFQAJgFAKAAQAOAAAJAFQAJAFAGAHQAGAHACALQACAJABAPIAABQIgBACIgEACIgFABIgJAAIgJAAg");
	this.shape_15.setTransform(473.25,59);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAABWQgIgCgGgGQgFgGgDgIQgCgKAAgMIAAhBIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgeIABgCIADgCIAGgBIAIAAIAIAAIAGABIADACIABACIAAAeIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgBIACgBIACABIABACIABAEIAAAGIgBAKIgCAFIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_16.setTransform(459.725,60.5);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgIgJQgJgKgEgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKANgFQAOgGARAAQARAAANAFQANAFAJAJQAIAJAEAOQAEANAAASQAAAPgFAOQgEAOgIAKQgJAKgOAFQgNAGgRAAQgSAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQAEAGAFADQAHADAIAAQAIAAAGgDQAHgDADgGQAEgFACgIQACgJAAgKQAAgJgCgIQgBgIgDgGQgFgGgGgDQgGgEgIAAQgIAAgGADg");
	this.shape_17.setTransform(439.85,62.125);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAABWQgIgCgGgGQgFgGgDgIQgCgKAAgMIAAhBIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgeIABgCIADgCIAGgBIAIAAIAIAAIAGABIADACIABACIAAAeIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgBIACgBIACABIABACIABAEIAAAGIgBAKIgCAFIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_18.setTransform(426.675,60.5);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAjBIIgFgBIgDgCIgCgCIAAhKQAAgJgBgGQgBgFgDgEQgDgEgEgCQgEgDgFABQgHAAgHAEQgHAGgHAJIAABXIgBACIgEACIgFABIgJAAIgJAAIgGgBIgCgCIgBgCIAAiCIAAgDIADgBIAFgBIAHgBIAIABIAFABIACABIABADIAAAPQALgMALgGQAKgFAMgBQAOAAAJAFQAJAFAFAHQAHAHACAKQADALAAAOIAABQIgCACIgDACIgFABIgJAAIgJAAg");
	this.shape_19.setTransform(406.9,62);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgfBgQgMgDgHgEQgIgFgDgHQgEgGAAgIQAAgFABgEQACgFACgDIAGgIIAIgIQgHgCgDgHQgEgFABgHQAAgJADgGQAFgHAGgFQgFgGgDgHQgEgHAAgLQAAgLAFgKQAEgJAHgGQAHgGAKgDQAKgDAMAAIALAAIAKACIApAAQADAAACAEIABALQAAAGgBAEQgCADgDAAIgOAAQADAEABAEQABAFAAAEQAAAMgDAJQgEAJgHAGQgHAGgKADQgKADgMAAIgMgCIgJgDIgDAEQgCADAAACQABAEAEAEQADACAHAAIAfABQALABAJADQAIACAGAGQAGAEADAHQAEAHAAAJQgBAJgEAJQgEAIgIAHQgJAGgNAEQgNADgQABQgRgBgLgCgAgXAtIgEAEIgCAFIgBAEQAAAHAIAFQAHADAOAAQAHAAAGgBQAGgCADgDQAEgCABgEQACgDAAgEQgBgHgFgDQgFgEgJgBIgZAAIgGAGgAgMhGQgEACgDADQgCADgCAEIgBAJQAAAKAFAGQAHAGAKAAQAEAAAEgDQAFgBACgDIAFgHIABgJQAAgKgGgGQgGgGgKAAQgFAAgEACg");
	this.shape_20.setTransform(391.6,64.65);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgIBkIgFgBIgDgCIgBgDIAAiBIABgDIADgCIAFgBIAIgBIAJABIAGABIADACIABADIAACBIgBADIgDACIgGABIgJAAIgIAAgAgQhAQgEgFAAgKQAAgLAEgFQAFgEALAAQANAAAEAEQAEAFAAAKQAAALgEAFQgFAEgMgBQgLABgFgEg");
	this.shape_21.setTransform(380.925,59.25);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgUBJIgLgDIgKgEIgFgDIgCgFIgBgKIAAgGIABgEQABgBAAAAQAAgBAAAAQAAAAABAAQAAAAAAAAIACgBIAFACIAIAEIAKAEQAHACAIAAIAIgBIAHgDIAEgFQABgDAAgEQAAgEgCgDIgIgGIgJgEIgLgFIgMgFIgKgHQgFgFgDgHQgCgGAAgJQAAgKAEgIQAEgHAGgGQAHgGAKgDQAKgDALAAIAMABIALACIAHADIAFADIACACIABADIAAAEIAAAFIAAAHIgBAEIgBACIgCAAIgEgBIgHgEIgJgDQgGgCgHAAIgIABQgDABgCACQgDACgBADQgBACgBADQABAFACADQADADAFACIAJAFIAMAEIAMAGQAFADAFAEQAEAEADAHQADAGAAAJQAAALgEAJQgFAIgHAGQgIAGgKADQgKADgLAAIgPgBg");
	this.shape_22.setTransform(371.35,62.125);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgJAMgGQANgFAOAAQARAAALAFQAMAFAHAJQAIAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQABAJABAHQADAGAEAFQAEAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAHgBIABAAIACACIABAEIAAAGIAAAGIgBADIgBADIgBACIgFADIgLAEIgPACQgJACgJAAQgRAAgNgFgAgJgsQgGADgDAEQgEAFgCAGQgBAGgBAHIA2AAQABgQgHgJQgGgJgPAAQgFAAgFADg");
	this.shape_23.setTransform(357.7,62.125);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgjBiQgLgGgGgKQgHgKgDgNQgDgNAAgPQAAgRAEgOQAEgNAHgKQAHgKALgFQAKgFAOAAQAKAAAJAEQAJAFAJAJIAAhHIABgDIADgCIAFgBIAJgBIAJABIAGABIADACIABADIAAC/IgBADIgDACIgEABIgIAAIgHAAIgFgBIgDgCIgBgDIAAgOQgKAKgLAHQgLAFgMAAQgPAAgKgFgAgNgIQgFADgDAGQgDAFgCAIQgBAHAAAIIABAQQABAHADAHQADAGAFADQAFAEAIAAIAGgBIAIgEIAHgGIAJgKIAAgrQgIgJgHgFQgHgGgHAAQgHAAgGAEg");
	this.shape_24.setTransform(341.775,59.15);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AggBIIgFgBIgDgCIgBgCIAAiCIAAgDIAEgBIAEgBIAIgBIAIABIAFABIACABIABADIAAAQIAJgMIAIgHQAEgDAEgCIAIgBIAEABIAFAAIAEACIACABIACACIABACIAAAFIAAAIIAAAJIgBAFIgCACIgCACIgDgBIgDgCIgEgBIgFAAIgGABQgEABgDADIgHAHIgGALIAABRIgBACIgDACIgGABIgJAAIgJAAg");
	this.shape_25.setTransform(322.7,62);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgkBEQgJgFgGgHQgFgIgDgKQgDgJABgPIAAhPIAAgDIADgCIAGgBIAJgBIAJABIAGABIADACIAAADIAABIQABALABAFQABAGADADQADAEAEACQAEADAFAAQAGAAAIgGQAHgFAIgKIAAhVIABgDIACgCIAGgBIAJgBIAJABIAFABIAEACIABADIAACBIgBADIgDACIgEABIgJAAIgHAAIgFgBIgDgCIAAgDIAAgPQgLALgLAHQgLAFgMAAQgNABgJgFg");
	this.shape_26.setTransform(308.55,62.25);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgIgJQgJgKgEgNQgEgNAAgSQAAgPAFgOQAEgOAJgKQAJgKAOgFQANgGAQAAQASAAANAFQANAFAJAJQAIAJAEAOQAEANAAASQAAAPgFAOQgEAOgIAKQgKAKgNAFQgOAGgQAAQgSAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJACAJQABAIAEAGQAEAGAFADQAHADAIAAQAIAAAHgDQAFgDAFgGQAEgFABgIQACgJAAgKQAAgJgCgIQgBgIgDgGQgFgGgFgDQgHgEgIAAQgIAAgGADg");
	this.shape_27.setTransform(292.45,62.125);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgaBhIgFgCQAAAAAAAAQgBgBAAAAQAAAAAAgBQgBAAAAgBIABgEIASgsIgDgCIgDgEIgth3IgCgIQAAgBAAgBQAAAAABgBQAAAAAAgBQAAAAABAAQABgCAFgBIALAAIAKAAIAFABQABAAAAABQABAAAAAAQABAAAAABQAAAAABABIACAFIAdBXIABAAIAchZQABgEACgBQAAAAAAAAQABgBAAAAQABAAABAAQAAgBABAAIALAAIALAAQAEABACACQABAAAAABQAAAAABABQAAAAAAABQAAAAAAABIgCAGIgrB/IgPAvQgCADgGACQgFABgLAAIgKAAg");
	this.shape_28.setTransform(277.6,64.725);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgJAMgGQANgFAOAAQARAAALAFQAMAFAIAJQAHAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJACAHQACAGAEAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAGgBIACAAIACACIABAEIAAAGIAAAGIgBADIgBADIgBACIgFADIgLAEIgPACQgJACgJAAQgRAAgNgFgAgJgsQgGADgDAEQgEAFgCAGQgCAGAAAHIA2AAQABgQgGgJQgIgJgOAAQgFAAgFADg");
	this.shape_29.setTransform(256.1,62.125);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AAgBmIgGgBIgEgCIgCgDIgrhFIAABGIgBACIgDACIgFABIgJAAIgJAAIgGgBIgDgCIgBgCIAAjAIABgDQAAAAABAAQAAgBAAAAQABAAAAAAQABAAAAAAIAGgCIAJAAIAJAAIAFACIADABIABADIAABxIAmgzIACgDIAEgBIAGgBIAJgBIAKABIAGABIADABIABADIgBAFIgEAFIgmAqIAsBFIADAFIABAEIgBACIgDACIgGABIgJAAIgKAAg");
	this.shape_30.setTransform(242.925,59);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgeBHQgJgDgGgFQgHgFgDgIQgEgIAAgLQAAgLAFgJQAEgIAJgFQAJgFANgDQANgCARAAIAMAAIAAgIIgBgLQgBgFgDgDQgDgDgFgBQgEgCgGAAQgKAAgHACIgNAFIgJAEIgGACIgDgBIgCgDIgBgEIgBgGIABgIQABgCACgCIAHgFQAFgDAHgCIAPgDQAIgCAIAAQAPAAALADQALADAHAHQAHAGADAKQAEAJAAAOIAABXQAAAAAAABQAAAAgBAAQAAABAAAAQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAgBAAQgBABAAAAIgKAAIgJAAQgBAAgBgBQAAAAgBAAQAAAAgBgBQAAAAgBAAIgBgDIAAgLQgIAJgKAFQgLAFgLAAQgLAAgIgDgAgFALQgGABgEADQgEADgCADQgCAEAAAFQAAAIAFAFQAGAFAJAAQAHAAAGgEQAHgEAGgIIAAgWIgOAAQgJAAgFABg");
	this.shape_31.setTransform(227.225,62.125);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AAABWQgIgCgGgGQgFgGgDgIQgCgKAAgMIAAhBIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgeIABgCIADgCIAGgBIAIAAIAIAAIAGABIADACIABACIAAAeIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgBIACgBIACABIABACIABAEIAAAGIgBAKIgCAFIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_32.setTransform(215.075,60.5);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AAjBIIgFgBIgEgCIgBgCIAAhKQAAgJgBgGQgCgFgCgEQgDgEgEgCQgEgDgFABQgHAAgHAEQgHAGgHAJIAABXIgBACIgEACIgFABIgJAAIgJAAIgGgBIgCgCIgBgCIAAiCIAAgDIADgBIAFgBIAHgBIAIABIAFABIACABIABADIAAAPQALgMALgGQAKgFAMgBQANAAAKAFQAJAFAFAHQAGAHADAKQACALAAAOIAABQIgBACIgDACIgFABIgJAAIgJAAg");
	this.shape_33.setTransform(195.3,62);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgeBHQgJgDgGgFQgHgFgDgIQgEgIAAgLQAAgLAFgJQAEgIAJgFQAJgFANgDQANgCARAAIAMAAIAAgIIgBgLQgBgFgDgDQgDgDgFgBQgEgCgGAAQgKAAgHACIgNAFIgJAEIgGACIgDgBIgCgDIgBgEIgBgGIABgIQABgCACgCIAHgFQAFgDAHgCIAPgDQAIgCAIAAQAPAAALADQALADAHAHQAHAGADAKQAEAJAAAOIAABXQAAAAAAABQAAAAgBAAQAAABAAAAQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAgBAAQgBABAAAAIgKAAIgJAAQgBAAgBgBQAAAAgBAAQAAAAgBgBQAAAAgBAAIgBgDIAAgLQgIAJgKAFQgLAFgLAAQgLAAgIgDgAgFALQgGABgEADQgEADgCADQgCAEAAAFQAAAIAFAFQAGAFAJAAQAHAAAGgEQAHgEAGgIIAAgWIgOAAQgJAAgFABg");
	this.shape_34.setTransform(179.425,62.125);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgRBFQgLgFgIgIQgIgKgFgNQgEgNAAgRQAAgTAGgOQAEgPAJgJQAJgJAMgFQAMgFANAAIAMABIALAEQAEABAEACIAFAEIADADIABADIABAEIAAAGIgBANQgCACgDAAQgCAAgDgBIgGgFIgJgEQgFgCgIAAQgOAAgHALQgIAKAAAVQABALABAIQACAHAEAGQAEAGAEADQAGACAIAAQAHAAAFgCIAKgGIAHgEQABgBAAAAQABgBAAAAQABAAAAAAQABAAAAAAIADAAIACADIAAAFIABAHIgBAHIAAAFIgBACIgDADIgFAEIgKAEIgMAEIgNABQgPAAgLgFg");
	this.shape_35.setTransform(166.45,62.1);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgJAMgGQANgFAOAAQARAAALAFQAMAFAHAJQAIAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJABAHQACAGAFAFQAEAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAHgBIABAAIACACIABAEIAAAGIAAAGIgBADIgBADIgBACIgFADIgLAEIgPACQgJACgKAAQgPAAgOgFgAgJgsQgGADgDAEQgEAFgCAGQgBAGAAAHIA1AAQABgQgHgJQgGgJgOAAQgHAAgEADg");
	this.shape_36.setTransform(145.65,62.125);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AAiBHIgHgBIgEgDIgCgEIgVhOIAAgBIAAABIgUBOIgCAEIgEADIgHABIgMAAIgLAAIgHgBIgEgDIgCgEIgjh1IgBgHIgBgEIABgCIADgCIAGgBIAJAAIAJAAIAGABQABAAAAABQABAAAAAAQAAAAAAABQABAAAAAAIABADIAaBfIAAACIABgCIAYhfIABgDIADgCIAGgBIAHAAIAJAAIAGABIACACIACACIAaBgIAAACIAAgCIAZhfIACgDQAAAAAAAAQAAgBABAAQAAAAAAAAQABgBAAAAIAGgBIAJAAIAJAAIAFABIADACIABACIgBAEIgBAHIgjB1IgCAEIgEADIgHABIgLAAIgMAAg");
	this.shape_37.setTransform(127.225,62.125);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AAjBIIgFgBIgEgCIgBgCIAAhKQAAgJgBgGQgCgFgCgEQgDgEgEgCQgEgDgFABQgHAAgHAEQgHAGgHAJIAABXIgBACIgEACIgFABIgJAAIgJAAIgFgBIgDgCIgBgCIAAiCIAAgDIADgBIAFgBIAHgBIAIABIAFABIACABIABADIAAAPQALgMALgGQAKgFAMgBQANAAAKAFQAJAFAFAHQAGAHADAKQACALAAAOIAABQIgBACIgDACIgFABIgJAAIgJAAg");
	this.shape_38.setTransform(101.25,62);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgJAMgGQANgFAOAAQARAAALAFQAMAFAIAJQAHAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJACAHQACAGAEAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAHgBIABAAIACACIABAEIAAAGIAAAGIgBADIgBADIgBACIgFADIgLAEIgPACQgJACgJAAQgRAAgNgFgAgJgsQgGADgDAEQgEAFgCAGQgCAGAAAHIA2AAQABgQgGgJQgIgJgOAAQgFAAgFADg");
	this.shape_39.setTransform(85.55,62.125);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AAjBmIgGgBIgCgCIgBgCIAAhLQAAgJgCgGQgBgFgDgDQgDgEgEgCQgEgDgGABQgFAAgHAEQgIAFgHAJIAABYIgBACIgDACIgGABIgJAAIgJAAIgGgBIgCgCIgBgCIAAjAIABgDQAAAAAAAAQAAgBAAAAQABAAAAAAQABAAAAAAIAGgCIAJAAIAJAAIAGACIADABIABADIAABIQAJgJAKgFQAJgFAKAAQAOAAAJAFQAJAFAGAHQAGAHACALQACAJABAPIAABQIgBACIgEACIgFABIgJAAIgJAAg");
	this.shape_40.setTransform(70.05,59);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AAABWQgIgCgGgGQgFgGgDgIQgCgKAAgMIAAhBIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgeIABgCIADgCIAGgBIAIAAIAIAAIAGABIADACIABACIAAAeIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgBIACgBIACABIABACIABAEIAAAGIgBAKIgCAFIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_41.setTransform(56.525,60.5);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgXAqIgEgBIgBgCIAAgDIASgnIAAgXIABgIQACgDACgCQADgCACAAIAKgBIAIABQAEAAADACIADAFIABAIIgBAKIgBAJIgEAIIgFAIIgTAcIgCADIgDABIgEABIgGABIgHgBg");
	this.shape_42.setTransform(657.275,30.575);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AAABWQgIgCgGgGQgFgFgDgJQgCgKAAgLIAAhCIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgdIABgDIADgCIAGgBIAIAAIAIAAIAGABIADACIABADIAAAdIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgCIACAAIACAAIABADIABAEIAAAGIgBALIgCAEIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_43.setTransform(648.575,21.9);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgRBFQgLgFgJgIQgHgKgEgNQgFgOAAgQQAAgTAGgOQAEgOAJgKQAJgJAMgFQAMgFAOAAIALACIAKADQAFABAEACIAGAEIACADIABADIAAAEIAAAHIgBAMQAAAAAAABQgBAAAAABQgBAAAAAAQgBAAAAAAQgDAAgDgCIgHgEIgJgEQgEgCgIAAQgOgBgHALQgIAMABAUQAAAKABAJQACAHAEAGQADAFAFADQAGADAIAAQAHAAAFgCIAKgFIAHgGQABAAAAAAQABgBAAAAQABAAAAAAQABAAABAAIACAAIABADIABAFIAAAIIAAAGIgBAFIgBACIgBADIgHAEIgKAEIgLAEIgNABQgOgBgMgEg");
	this.shape_44.setTransform(637.45,23.5);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgJANgGQAMgFAPAAQAQAAALAFQAMAFAHAJQAIAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJABAHQACAGAFAFQAEAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAGgBIACAAIABACIABAEIAAAGIAAAGIgBADIgBADIgBACIgFADIgLAEIgPACQgJACgKAAQgQAAgNgFgAgJgsQgGADgDAEQgEAFgCAGQgBAGAAAHIA2AAQAAgQgHgJQgGgJgOAAQgHAAgEADg");
	this.shape_45.setTransform(623.45,23.525);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgWB9IgGgBIgDgCIgBgDIAAgEIAAgGIAAgHIABgEIABgCIACgBIADAAIAFABIAHgBIAEgEIADgHIABgNIAAiFIABgCIACgCIAFgBIAJgBIAJABIAGABIADACIAAACIAACGQAAAQgCAJQgDAKgFAGQgGAHgIADQgHADgLAAIgKgBgAgEhbQgEgEAAgKQAAgMAEgEQAEgEAMAAQANAAAEAEQAEAEAAALQAAALgEAEQgFAEgMAAQgMAAgEgEg");
	this.shape_46.setTransform(611.075,23.275);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgJgJQgHgKgFgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKANgFQANgGASAAQARAAANAFQANAFAIAJQAJAJAEAOQAEANAAASQAAAPgEAOQgFAOgJAKQgIAKgOAFQgNAGgSAAQgRAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQADAGAHADQAFADAJAAQAIAAAGgDQAGgDAEgGQAEgFACgIQACgJAAgKQAAgJgBgIQgCgIgEgGQgDgGgHgDQgFgEgKAAQgHAAgGADg");
	this.shape_47.setTransform(600.2,23.525);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AggBIIgFgBIgDgCIgBgCIAAiCIAAgDIADgBIAFgBIAIgBIAIABIAEABIACABIACADIAAAQIAJgMIAIgIQAEgCAEgBIAIgCIAFABIAEABIAEABIACABIABABIABADIAAAFIABAIIgBAJIgBAFIgBADIgCABIgDgBIgDgCIgEgBIgFAAIgGABQgDACgDACIgIAHIgGALIAABRIgBACIgDACIgGABIgJABIgJgBg");
	this.shape_48.setTransform(587.9,23.4);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("Ag3BiIgGgBIgDgCIgBgCIAAi2IABgDIADgBIAEgBIAIgBIAHABIAFABIADABIAAADIAAAPIAMgKIALgIIALgEQAGgCAHAAQAOAAAKAGQAKAGAHAKQAGAKADAMQADANAAAPQAAASgEANQgEANgHALQgHAJgLAFQgKAGgOAAIgKgBIgJgEIgJgFIgJgIIAAA+IgBACIgDACIgFABIgJAAIgJAAgAgEhBQgEABgEACIgIAHIgIAKIAAArQAIAJAHAFQAHAGAHgBQAHABAFgEQAFgEADgFQADgGACgHIABgPIgBgQQgBgIgDgGQgDgGgFgEQgFgDgHAAIgGABg");
	this.shape_49.setTransform(574.175,26);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AggBIIgFgBIgDgCIgBgCIAAiCIAAgDIAEgBIAEgBIAIgBIAIABIAEABIADABIABADIAAAQIAJgMIAIgIQAEgCAEgBIAIgCIAEABIAFABIAEABIACABIABABIACADIAAAFIAAAIIAAAJIgCAFIgBADIgCABIgDgBIgDgCIgEgBIgFAAIgGABQgEACgDACIgHAHIgGALIAABRIgBACIgDACIgGABIgJABIgJgBg");
	this.shape_50.setTransform(554.35,23.4);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgkBEQgJgEgGgIQgFgIgDgJQgDgKABgPIAAhPIABgDIACgCIAGgBIAJgBIAJABIAFABIAEACIABADIAABIQgBAKACAGQABAGADADQACAEAFACQAEACAFABQAGgBAIgFQAGgFAJgKIAAhVIABgDIACgCIAGgBIAJgBIAJABIAFABIAEACIABADIAACBIgBADIgDACIgEABIgIAAIgIAAIgFgBIgDgCIAAgDIAAgPQgLALgLAHQgLAFgMAAQgNABgJgFg");
	this.shape_51.setTransform(540.2,23.65);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgIgJQgJgKgEgNQgEgNAAgSQAAgPAFgOQAEgOAJgKQAJgKAOgFQAMgGARAAQASAAANAFQANAFAJAJQAIAJAEAOQAEANAAASQAAAPgFAOQgEAOgIAKQgJAKgOAFQgNAGgRAAQgSAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQAEAGAFADQAHADAIAAQAIAAAGgDQAGgDAFgGQAEgFABgIQACgJAAgKQAAgJgCgIQgBgIgDgGQgFgGgFgDQgGgEgJAAQgIAAgGADg");
	this.shape_52.setTransform(524.1,23.525);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgZBhIgGgCQAAAAAAAAQgBgBAAAAQAAAAAAgBQgBAAAAgBIABgEIASgsIgDgCIgDgEIgth3IgCgIQAAgBAAgBQAAAAABgBQAAAAAAgBQABAAAAAAQABgCAFgBIALAAIAKAAIAFABQABAAAAABQABAAAAAAQABAAAAABQAAAAAAABIADAFIAdBXIABAAIAchZQABgEACgBQAAAAAAAAQABgBAAAAQABAAABAAQAAgBABAAIALAAIALAAQAEABACACQABAAAAABQAAAAABABQAAAAAAABQAAAAAAABIgCAGIgrB/IgPAvQgCADgGACQgEABgMAAIgJAAg");
	this.shape_53.setTransform(509.25,26.125);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgJgJQgHgKgFgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKANgFQANgGASAAQASAAAMAFQANAFAIAJQAJAJAEAOQAEANAAASQAAAPgEAOQgFAOgJAKQgIAKgOAFQgNAGgSAAQgRAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQADAGAHADQAFADAJAAQAIAAAGgDQAGgDAEgGQAEgFACgIQACgJAAgKQAAgJgBgIQgCgIgEgGQgDgGgHgDQgFgEgKAAQgHAAgGADg");
	this.shape_54.setTransform(487.25,23.525);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AAABWQgIgCgGgGQgFgFgDgJQgCgKAAgLIAAhCIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgdIABgDIADgCIAGgBIAIAAIAIAAIAGABIADACIABADIAAAdIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgCIACAAIACAAIABADIABAEIAAAGIgBALIgCAEIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_55.setTransform(474.075,21.9);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AAjBmIgFgBIgEgCIgBgCIAAhLQABgKgCgFQgCgFgCgDQgCgEgEgCQgFgCgFAAQgGgBgIAGQgHAEgIAJIAABYIgBACIgCACIgGABIgJABIgJgBIgFgBIgEgCIgBgCIAAjAIABgDQABAAAAAAQAAgBAAAAQABAAAAAAQABAAABgBIAFgBIAJAAIAJAAIAGABIACACIABADIAABIQAKgJAKgFQAJgFALAAQAMAAAKAFQAJAFAFAHQAGAHADALQADAJgBAOIAABRIgBACIgCACIgGABIgJABIgJgBg");
	this.shape_56.setTransform(454.3,20.4);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AAABWQgIgCgGgGQgFgFgDgJQgCgKAAgLIAAhCIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgdIABgDIADgCIAGgBIAIAAIAIAAIAGABIADACIABADIAAAdIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgCIACAAIACAAIABADIABAEIAAAGIgBALIgCAEIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_57.setTransform(440.775,21.9);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("Ag3BiIgGgBIgDgCIgBgCIAAi2IABgDIADgBIAEgBIAIgBIAHABIAFABIADABIAAADIAAAPIAMgKIALgIIALgEQAGgCAHAAQAOAAAKAGQAKAGAHAKQAGAKADAMQADANAAAPQAAASgEANQgEANgHALQgHAJgLAFQgKAGgOAAIgKgBIgJgEIgJgFIgJgIIAAA+IgBACIgDACIgFABIgJAAIgJAAgAgEhBQgEABgEACIgIAHIgIAKIAAArQAIAJAHAFQAHAGAHgBQAHABAFgEQAFgEADgFQADgGACgHIABgPIgBgQQgBgIgDgGQgDgGgFgEQgFgDgHAAIgGABg");
	this.shape_58.setTransform(428.225,26);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgJgJQgIgJgFgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJANgGQAMgFAPAAQAQAAAMAFQALAFAHAJQAIAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJACAHQABAGAEAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAFgBIADAAIABACIABAEIAAAGIAAAGIAAADIgBADIgCACIgFADIgLAEIgPACQgIACgLAAQgPAAgOgFgAgKgsQgFADgDAEQgDAFgCAGQgCAGAAAHIA2AAQAAgQgHgJQgHgJgNAAQgGAAgGADg");
	this.shape_59.setTransform(412.2,23.525);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgjBiQgLgGgGgKQgHgKgDgNQgDgNAAgPQAAgRAEgOQAEgNAHgKQAHgKALgEQAKgGAOAAQAKAAAJAEQAJAFAJAJIAAhHIABgDIADgBIAFgCIAJgBIAJABIAGACIADABIABADIAAC/IgBADIgDACIgEABIgIAAIgHAAIgFgBIgDgCIgBgDIAAgOQgKAKgLAHQgLAFgMAAQgPAAgKgFgAgNgIQgFAEgDAFQgDAFgCAIQgBAHAAAIIABAQQABAHADAHQADAGAFADQAFAEAIAAIAGgBIAIgEIAHgGIAJgKIAAgrQgIgJgHgGQgHgFgHAAQgHAAgGAEg");
	this.shape_60.setTransform(396.275,20.55);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgjBiQgLgGgGgKQgHgKgDgNQgDgNAAgPQAAgRAEgOQAEgNAHgKQAHgKALgEQAKgGAOAAQAKAAAJAEQAJAFAJAJIAAhHIABgDIADgBIAFgCIAJgBIAJABIAGACIADABIABADIAAC/IgBADIgDACIgEABIgIAAIgHAAIgFgBIgDgCIgBgDIAAgOQgKAKgLAHQgLAFgMAAQgPAAgKgFgAgNgIQgFAEgDAFQgDAFgCAIQgBAHAAAIIABAQQABAHADAHQADAGAFADQAFAEAIAAIAGgBIAIgEIAHgGIAJgKIAAgrQgIgJgHgGQgHgFgHAAQgHAAgGAEg");
	this.shape_61.setTransform(373.375,20.55);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgjBiQgLgGgGgKQgHgKgDgNQgDgNAAgPQAAgRAEgOQAEgNAHgKQAHgKALgEQAKgGAOAAQAKAAAJAEQAJAFAJAJIAAhHIABgDIADgBIAFgCIAJgBIAJABIAGACIADABIABADIAAC/IgBADIgDACIgEABIgIAAIgHAAIgFgBIgDgCIgBgDIAAgOQgKAKgLAHQgLAFgMAAQgPAAgKgFgAgNgIQgFAEgDAFQgDAFgCAIQgBAHAAAIIABAQQABAHADAHQADAGAFADQAFAEAIAAIAGgBIAIgEIAHgGIAJgKIAAgrQgIgJgHgGQgHgFgHAAQgHAAgGAEg");
	this.shape_62.setTransform(357.275,20.55);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgeBHQgJgDgGgFQgHgFgDgIQgEgIAAgLQAAgLAFgJQAEgIAJgFQAJgFANgDQANgCARAAIAMAAIAAgIIgBgLQgBgFgDgDQgDgDgFgBQgEgCgGAAQgKAAgHACIgNAFIgJAEIgGACIgDgBIgCgDIgBgEIgBgGIABgIQABgCACgCIAHgFQAFgDAHgCIAPgDQAIgCAIAAQAPAAALADQALADAHAHQAHAGADAKQAEAJAAAOIAABXQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAgBAAQAAABgBAAIgKAAIgJAAQgBAAgBgBQAAAAgBAAQAAAAgBgBQAAAAgBAAIgBgDIAAgLQgIAJgKAFQgLAFgLAAQgLAAgIgDgAgFALQgGABgEADQgEADgCADQgCAEAAAFQAAAIAFAFQAGAFAJAAQAHAAAGgEQAHgEAGgIIAAgWIgOAAQgJAAgFABg");
	this.shape_63.setTransform(341.825,23.525);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgJgJQgIgKgEgNQgEgNAAgSQAAgPAFgOQAEgOAJgKQAJgKAOgFQANgGAQAAQASAAANAFQANAFAJAJQAIAJAEAOQAEANAAASQAAAPgFAOQgEAOgIAKQgKAKgNAFQgOAGgQAAQgSAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJACAJQABAIAEAGQAEAGAFADQAHADAIAAQAIAAAHgDQAFgDAFgGQAEgFABgIQACgJAAgKQAAgJgCgIQgBgIgDgGQgFgGgFgDQgGgEgKAAQgHAAgGADg");
	this.shape_64.setTransform(319.9,23.525);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AAABWQgIgCgGgGQgFgFgDgJQgCgKAAgLIAAhCIgQAAQgCAAgCgDQgBgEAAgIIAAgHIABgFIACgCIACgBIAQAAIAAgdIABgDIADgCIAGgBIAIAAIAIAAIAGABIADACIABADIAAAdIAcAAIADABIACACIABAFIAAAHQAAAIgBAEQgCADgDAAIgcAAIAAA8QAAALADAFQAEAGAIgBIAFAAIAFgBIADgCIACAAIACAAIABADIABAEIAAAGIgBALIgCAEIgEADIgGACIgHABIgIABQgLAAgHgEg");
	this.shape_65.setTransform(306.725,21.9);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AgfBgQgMgDgHgEQgIgFgDgGQgEgHAAgIQAAgFACgEQABgFACgDIAGgJIAIgHQgGgCgEgHQgDgFgBgHQAAgJAEgGQAFgHAGgFQgFgGgDgHQgEgHAAgLQAAgLAFgKQADgJAIgGQAHgGAKgDQAKgDAMgBIALABIAKACIApAAQADAAACAEIABALQAAAGgBAEQgCADgDAAIgOAAQADADABAFQABAFAAAEQAAAMgDAJQgFAIgGAHQgHAGgKADQgLADgLAAQgGAAgGgCIgJgDIgDAFQgBACAAACQAAAFADADQAEACAHAAIAfABQALABAJADQAJACAGAGQAFAEAEAHQADAHAAAJQgBAJgEAJQgEAIgIAHQgJAGgNAEQgNADgQABQgQgBgMgCgAgYAtIgDAEIgCAFIgBAEQAAAHAIAFQAHADAOAAQAHAAAGgBQAFgCAEgDQAEgDABgDQABgEABgDQAAgHgGgDQgFgEgJgBIgZAAIgHAGgAgMhGQgEACgDADQgCADgCAEIgBAJQAAAKAGAGQAFAFALABQAEAAAEgCQAFgCACgDIAFgHIABgJQAAgKgGgGQgGgGgKAAQgFAAgEACg");
	this.shape_66.setTransform(287.75,26.05);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AAjBIIgGgBIgDgCIAAgCIAAhKQgBgKgBgFQgCgFgCgEQgCgEgEgCQgFgCgGAAQgGgBgGAGQgIAFgIAJIAABXIgBACIgCACIgGABIgJABIgJgBIgFgBIgEgCIgBgCIAAiCIABgDIADgBIAFgBIAIgBIAHABIAFABIACABIABADIAAAPQALgMALgGQAKgFANgBQANAAAJAFQAJAFAGAHQAFAHADAKQACAKABAPIAABQIgBACIgDACIgGABIgJABIgJgBg");
	this.shape_67.setTransform(272.75,23.4);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgIBkIgFgBIgDgCIgBgDIAAiBIABgDIADgCIAFgBIAIgBIAJABIAGABIADACIABADIAACBIgBADIgDACIgGABIgJAAIgIAAgAgQhAQgEgFAAgKQAAgLAEgFQAFgEALAAQANAAAEAEQAEAFAAAKQAAALgEAFQgFADgMAAQgLAAgFgDg");
	this.shape_68.setTransform(260.975,20.65);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AAgBmIgGgBIgEgCIgCgDIgrhFIAABGIgBACIgDACIgFABIgJABIgJgBIgGgBIgDgCIgBgCIAAjAIABgDQAAAAABAAQAAgBAAAAQABAAAAAAQABAAAAgBIAGgBIAJAAIAJAAIAFABIADACIABADIAABxIAmgzIACgDIAEgBIAGgBIAJgBIAKABIAGABIADABIABADIgBAFIgEAFIgmAqIAsBFIADAFIABAEIgBACIgDACIgGABIgJABIgKgBg");
	this.shape_69.setTransform(250.825,20.4);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgJgJQgHgKgFgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKANgFQANgGASAAQASAAAMAFQANAFAIAJQAJAJAEAOQAEANAAASQAAAPgEAOQgFAOgJAKQgIAKgOAFQgNAGgSAAQgRAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQADAGAHADQAFADAJAAQAIAAAGgDQAGgDAEgGQAEgFACgIQACgJAAgKQAAgJgBgIQgCgIgEgGQgDgGgHgDQgFgEgKAAQgHAAgGADg");
	this.shape_70.setTransform(234.8,23.525);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgIgJQgJgKgEgNQgEgNAAgSQAAgPAFgOQAEgOAJgKQAJgKAOgFQANgGAQAAQASAAANAFQANAFAJAJQAIAJAEAOQAEANAAASQAAAPgFAOQgEAOgIAKQgKAKgNAFQgOAGgQAAQgSAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJACAJQABAIAEAGQAEAGAFADQAHADAIAAQAIAAAHgDQAFgDAFgGQAEgFABgIQACgJAAgKQAAgJgCgIQgBgIgDgGQgFgGgFgDQgHgEgJAAQgHAAgGADg");
	this.shape_71.setTransform(218.65,23.525);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AgIBmIgGgBIgDgCIAAgCIAAjAIAAgDQABAAAAAAQAAgBAAAAQABAAAAAAQABAAAAgBIAGgBIAIAAIAJAAIAGABIADACIABADIAADAIgBACIgDACIgGABIgJABIgIgBg");
	this.shape_72.setTransform(206.95,20.4);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgJANgGQAMgFAOAAQARAAALAFQAMAFAHAJQAIAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJABAHQACAGAFAFQAEAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAHgBIABAAIACACIABAEIAAAGIAAAGIgBADIgBADIgBACIgFADIgLAEIgPACQgJACgKAAQgPAAgOgFgAgJgsQgGADgDAEQgEAFgCAGQgBAGAAAHIA1AAQABgQgHgJQgGgJgOAAQgHAAgEADg");
	this.shape_73.setTransform(188.85,23.525);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgfBIIgGgBIgDgCIgBgCIAAiCIABgDIACgBIAGgBIAHgBIAHABIAGABIABABIABADIAAAQIAKgMIAIgIQAEgCAEgBIAIgCIAEABIAFABIAEABIADABIABABIABADIAAAFIAAAIIAAAJIgBAFIgBADIgDABIgDgBIgDgCIgEgBIgFAAIgGABQgDACgEACIgGAHIgHALIAABRIgBACIgDACIgFABIgJABIgJgBg");
	this.shape_74.setTransform(177.1,23.4);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AgXAqIgEgBIgBgBIAAgEIASgnIAAgXIABgIIAEgFIAFgCIAKAAIAIAAIAHACIADAFIABAIIgBALIgBAJIgEAHIgFAIIgTAcIgCADIgDABIgEABIgGAAIgHAAg");
	this.shape_75.setTransform(167.075,14.3);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AgkBEQgJgEgFgIQgGgIgDgJQgCgKAAgPIAAhPIABgDIACgCIAGgBIAJgBIAJABIAFABIAEACIABADIAABIQAAAKABAGQABAGADADQACAEAFACQAEACAFABQAHgBAHgFQAGgFAJgKIAAhVIAAgDIAEgCIAFgBIAJgBIAJABIAGABIACACIABADIAACBIgBADIgCACIgEABIgIAAIgIAAIgFgBIgDgCIAAgDIAAgPQgLALgLAHQgKAFgMAAQgOABgJgFg");
	this.shape_76.setTransform(155.7,23.65);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgfBFQgNgFgIgJQgJgKgEgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKANgFQANgGASAAQARAAANAFQANAFAJAJQAIAJAEAOQAEANAAASQAAAPgEAOQgEAOgKAKQgIAKgOAFQgNAGgSAAQgRAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQAEAGAGADQAFADAJAAQAIAAAGgDQAHgDADgGQAFgFABgIQACgJAAgKQAAgJgCgIQgBgIgEgGQgDgGgHgDQgGgEgIAAQgIAAgGADg");
	this.shape_77.setTransform(139.6,23.525);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgZBhIgGgCQAAAAAAAAQgBgBAAAAQAAAAAAgBQAAAAAAgBIAAgEIASgsIgDgCIgDgEIgth3IgCgIQAAgBAAgBQAAAAABgBQAAAAAAgBQABAAAAAAQACgCAEgBIALAAIAKAAIAGABQAAAAAAABQABAAAAAAQABAAAAABQAAAAAAABIADAFIAeBXIAAAAIAchZQABgEABgBQABAAAAAAQABgBAAAAQABAAABAAQAAgBABAAIALAAIALAAQAEABACACQAAAAABABQAAAAABABQAAAAAAABQAAAAAAABIgCAGIgrB/IgQAvQgBADgGACQgEABgMAAIgJAAg");
	this.shape_78.setTransform(124.75,26.125);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AgPBnIgFgBIgDgCIgBgDIAAhoIgRAAQgCAAgBgEQgCgDAAgJIABgHIABgEIACgDIACgBIAQAAIAAgLQAAgNADgKQACgKAGgGQAFgIAJgCQAIgEAMAAIALABIAIACIAEACIACADIABAFIAAAGIAAAHIgBAFIgBACIgDAAIgCAAIgCgCIgFgBIgGgBQgEAAgDACQgCABgDADQgBADgBAEIgBALIAAALIAYAAIACABIACADIABAEIAAAHQAAAJgBADQgCAEgCAAIgYAAIAABoIgBADIgDACIgFABIgJAAIgJAAg");
	this.shape_79.setTransform(106.4,20.35);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AgIBfIgGgBIgEgCIAAgDIAAiyIAAgCIAEgCIAGgBIAIgBIAJABIAGABIADACIABACIAACyIgBADIgDACIgGABIgJABIgIgBg");
	this.shape_80.setTransform(97.35,21.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib._3d_blurb, new cjs.Rectangle(49.5,0,656.1,79.2), null);


(lib.logo_text = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.designCo();
	this.instance.setTransform(327.15,209.9,1.088,0.6327,0,0,0,300.7,93.5);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AkUKEIAA0IIF5AAQBSAAAuAvQAwAvgBBSIAADuQAACWhDBKQhKBQikAAIhaAAIAAI6gAh3hJIBaAAQBTAAAggiQAigjAAhYIAAjnQAAgjgkAAIjLAAg");
	this.shape.setTransform(618.5,91.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AkUKEIAA0IIF4AAQBTAAAvAvQAuAvABBSIAADuQAACWhEBKQhKBQikAAIhaAAIAAI6gAh3hJIBaAAQBTAAAhgiQAhgjAAhYIAAjnQAAgjgkAAIjLAAg");
	this.shape_1.setTransform(549.5,91.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("ACbKEIgulLIjZAAIguFLIiVAAIC30IIDxAAIC3UIgAhAAAIgXCmICvAAIgYimIg8nwIgHAAg");
	this.shape_2.setTransform(479.075,91.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AkUKEIAA0IIF4AAQBTAAAuAvQAwAvAABSIAADuQAACWhEBKQhKBQikAAIhaAAIAAI6gAh3hJIBaAAQBTAAAggiQAigjAAhYIAAjnQAAgjgkAAIjLAAg");
	this.shape_3.setTransform(413.85,91.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AB9KEIi9qEIhEkQIAKEQIAAKEIiWAAIAA0IICTAAIC+KEIBEESIgKkSIAAqEICWAAIAAUIg");
	this.shape_4.setTransform(303.475,91.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("ACbKEIgulLIjZAAIguFLIiVAAIC30IIDxAAIC3UIgAhAAAIgXCmICvAAIgYimIg8nwIgHAAg");
	this.shape_5.setTransform(233.375,91.9);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AjtKEIAA0IICeAAIAAR2IE9AAIAACSg");
	this.shape_6.setTransform(167.5,91.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AhNKEIAAnhIjfsnICmAAICGI4ICIo4IClAAIjeMnIAAHhg");
	this.shape_7.setTransform(105.325,91.9);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AkUKEIAA0IIF4AAQBSAAAwAvQAuAvABBSIAAMnQAACXhEBJQhJBRilAAgAh3HyIBaAAQBUAAAggjQAhgjAAhZIAAsgQAAgjglAAIjKAAg");
	this.shape_8.setTransform(39.3,91.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.logo_text, new cjs.Rectangle(0,0,654.1,268.8), null);


(lib.logo_seal = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.dp();
	this.instance.setTransform(184.35,184.4,1,1,0,0,0,148.1,101.5);

	this.instance_1 = new lib.circle();
	this.instance_1.setTransform(184.3,184.3,1,1,0,0,0,184.3,184.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.logo_seal, new cjs.Rectangle(0,0,368.7,368.7), null);


(lib.logo_full = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.logo_text();
	this.instance.setTransform(678.95,164.05,1,1.2204,0,0,0,327.1,134.4);

	this.instance_1 = new lib.logo_seal();
	this.instance_1.setTransform(164.15,164.55,0.8896,0.8896,0,0,0,184.5,184.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.logo_full, new cjs.Rectangle(0,0,1006,328.4), null);


// stage content:
(lib.dpDesign_site = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{games_open:95,games_close:110,graphic_open:65,graphic_close:80,"3d_open":33,"3d_close":50,logo_open:1,logo_close:17});

	this.actionFrames = [0,13,16,32,46,49,64,79,94,109,124];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		this.btn_red.addEventListener("click", openLogo.bind(this));
		this.btn_orange.addEventListener("click", open3D.bind(this));
		this.btn_yellow.addEventListener("click", openGraphic.bind(this));
		this.btn_teal.addEventListener("click", openGames.bind(this));
		this.mailLink_1.addEventListener("click",sendMail.bind(this));
		
		
		function openLogo(){
		
		 this.gotoAndPlay('logo_open');
		}
		
		function open3D(){
		
		 this.gotoAndPlay('3d_open');
		}
		
		function openGraphic(){
		
		 this.gotoAndPlay('graphic_open');
		}
		
		function openGames(){
		
		 this.gotoAndPlay('games_open');
		}
		
		function sendMail(){
		
		 window.open ("mailto:dpapp@dylanpappdesign.com?subject=Quote Request","_self");
		}
		
		this.stop();
	}
	this.frame_13 = function() {
		this.btn_backRed.addEventListener("click", closeLogo.bind(this));
		this.btn_orange.addEventListener("click", open3D.bind(this));
		this.btn_yellow.addEventListener("click", openGraphic.bind(this));
		this.btn_teal.addEventListener("click", openGames.bind(this));
		
		
		function closeLogo(){
		
		 this.gotoAndPlay('logo_close');
		}
		
		function open3D(){
		
		 this.gotoAndPlay('3d_open');
		}
		
		function openGraphic(){
		
		 this.gotoAndPlay('graphic_open');
		}
		
		function openGames(){
		
		 this.gotoAndPlay('games_open');
		}
	}
	this.frame_16 = function() {
		this.stop();
	}
	this.frame_32 = function() {
		this.btn_red.addEventListener("click", openLogo.bind(this));
		this.btn_orange.addEventListener("click", open3D.bind(this));
		this.btn_yellow.addEventListener("click", openGraphic.bind(this));
		this.btn_teal.addEventListener("click", openGames.bind(this));
		this.mailLink_1.addEventListener("click",sendMail.bind(this));
		
		
		function openLogo(){
		
		 this.gotoAndPlay('logo_open');
		}
		
		function open3D(){
		
		 this.gotoAndPlay('3d_open');
		}
		
		function openGraphic(){
		
		 this.gotoAndPlay('graphic_open');
		}
		
		function openGames(){
		
		 this.gotoAndPlay('games_open');
		}
		
		function sendMail(){
		
		 window.open ("mailto:dpapp@dylanpappdesign.com?subject=Quote Request","_self");
		}
		
		this.stop();
	}
	this.frame_46 = function() {
		this.btn_backOrange.addEventListener("click", close3D.bind(this));
		this.btn_yellow.addEventListener("click", openGraphic.bind(this));
		this.btn_teal.addEventListener("click", openGames.bind(this));
		
		function close3D(){
		
		 this.gotoAndPlay('3d_close');
		}
		
		function openGraphic(){
		
		 this.gotoAndPlay('graphic_open');
		}
		
		function openGames(){
		
		 this.gotoAndPlay('games_open');
		}
	}
	this.frame_49 = function() {
		this.stop();
	}
	this.frame_64 = function() {
		this.btn_red.addEventListener("click", openLogo.bind(this));
		this.btn_orange.addEventListener("click", open3D.bind(this));
		this.btn_yellow.addEventListener("click", openGraphic.bind(this));
		this.btn_teal.addEventListener("click", openGames.bind(this));
		this.mailLink_1.addEventListener("click",sendMail.bind(this));
		
		
		function openLogo(){
		
		 this.gotoAndPlay('logo_open');
		}
		
		function open3D(){
		
		 this.gotoAndPlay('3d_open');
		}
		
		function openGraphic(){
		
		 this.gotoAndPlay('graphic_open');
		}
		
		function openGames(){
		
		 this.gotoAndPlay('games_open');
		}
		
		function sendMail(){
		
		 window.open ("mailto:dpapp@dylanpappdesign.com?subject=Quote Request","_self");
		}
		
		this.stop();
	}
	this.frame_79 = function() {
		this.btn_backYellow.addEventListener("click", closeGraphic.bind(this));
		this.btn_teal.addEventListener("click", openGames.bind(this));
		
		function closeGraphic(){
		
		 this.gotoAndPlay('graphic_close');
		}
		
		function openGames(){
		
		 this.gotoAndPlay('games_open');
		}
		
		this.stop();
		this.stop();
	}
	this.frame_94 = function() {
		this.btn_red.addEventListener("click", openLogo.bind(this));
		this.btn_orange.addEventListener("click", open3D.bind(this));
		this.btn_yellow.addEventListener("click", openGraphic.bind(this));
		this.btn_teal.addEventListener("click", openGames.bind(this));
		this.mailLink_1.addEventListener("click",sendMail.bind(this));
		
		
		function openLogo(){
		
		 this.gotoAndPlay('logo_open');
		}
		
		function open3D(){
		
		 this.gotoAndPlay('3d_open');
		}
		
		function openGraphic(){
		
		 this.gotoAndPlay('graphic_open');
		}
		
		function openGames(){
		
		 this.gotoAndPlay('games_open');
		}
		
		function sendMail(){
		
		 window.open ("mailto:dpapp@dylanpappdesign.com?subject=Quote Request","_self");
		}
		
		this.stop();
	}
	this.frame_109 = function() {
		this.btn_backTeal.addEventListener("click", closeGames.bind(this));
		
		
		function closeGames(){
		
		 this.gotoAndPlay('games_close');
		}
		
		this.stop();
		this.btn_TV.addEventListener("click", gotoGames.bind(this));
		
		
		function gotoGames(){
		
		 window.open ("https://papptimus.itch.io/starfighter-77","_new");
		}
	}
	this.frame_124 = function() {
		this.btn_red.addEventListener("click", openLogo.bind(this));
		this.btn_orange.addEventListener("click", open3D.bind(this));
		this.btn_yellow.addEventListener("click", openGraphic.bind(this));
		this.btn_teal.addEventListener("click", openGames.bind(this));
		this.mailLink_1.addEventListener("click",sendMail.bind(this));
		
		
		function openLogo(){
		
		 this.gotoAndPlay('logo_open');
		}
		
		function open3D(){
		
		 this.gotoAndPlay('3d_open');
		}
		
		function openGraphic(){
		
		 this.gotoAndPlay('graphic_open');
		}
		
		function openGames(){
		
		 this.gotoAndPlay('games_open');
		}
		
		function sendMail(){
		
		 window.open ("mailto:dpapp@dylanpappdesign.com?subject=Quote Request","_self");
		}
		
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(13).call(this.frame_13).wait(3).call(this.frame_16).wait(16).call(this.frame_32).wait(14).call(this.frame_46).wait(3).call(this.frame_49).wait(15).call(this.frame_64).wait(15).call(this.frame_79).wait(15).call(this.frame_94).wait(15).call(this.frame_109).wait(15).call(this.frame_124).wait(1));

	// copyright
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AA0AcIgCAAIgBgBIAAgBIAAgnIgBAAIgNAnQAAABAAAAQAAAAgBABQAAAAAAAAQgBAAAAAAIgGABIgFgBIgCgCIgOgnIAAAnIAAABIgBABIgCAAIgDABIgEgBIgCAAIgBgBIAAgBIAAgwIABgEQAAgBABAAQAAAAAAAAQABgBAAAAQABAAAAAAIAMAAIADABIADACIACACIABAEIAKAaIAJgaQABgEADgCQACgDADAAIAMAAQABAAAAAAQABAAAAABQABAAAAAAQABAAAAABQAAAAAAABQABAAAAAAQAAABAAABQAAAAAAABIAAAwIAAABIgBABIgCAAIgEABIgEgBgAgsAcIgCAAIgBgBIgBgBIAAgnIgMAAIgBgBIgBgBIAAgCIAAgDIAAgEIAAgCIABgBIABgBIApAAIABABIABABIABACIAAAEIAAADIgBACIgBABIgBABIgMAAIAAAnIAAABIgBABIgDAAIgEABIgFgBg");
	this.shape.setTransform(1108.725,1055.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgQBAIgEAAIgBgCIAAgEIAMgdIgCgBIgCgDIgehPIgBgFQAAgBAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAIAEgBIAHgBIAHABIAEAAIACACIABADIAUA6IAAAAIATg7IABgDIADgBIAIgBIAHABIAEABIABADIAAAEIgdBUIgLAgQgBACgEABIgKABIgGgBg");
	this.shape_1.setTransform(1097.175,1061.85);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAeAwIgGAAIgFgBIgCgBIAAgCIAAgwIgBgKIgCgGQgCgDgDgBQgDgCgEAAQgEAAgEAEQgFADgFAHIAAA4IgBACIgCABIgDABIgGAAIgHAAIgDgBIgCgBIAAgCIAAhWIAAgBIACgCIADAAIAFgBIAFABIAEAAIABACIABABIAAAKQAGgHAIgEQAHgEAHAAQAKAAAGADQAFADAEAFQAEAFACAGQABAHABAKIAAA0IgBACIgCABIgEABIgFAAg");
	this.shape_2.setTransform(1087.45,1060.025);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgUAwQgGgDgEgDQgEgEgCgFQgDgFAAgHQAAgHADgHQADgFAGgDQAGgDAJgCQAJgCAKAAIAJAAIAAgFIgBgHIgDgGIgFgDIgHgBQgGAAgFACIgIADIgHADIgEABIgBAAIgCgCIgBgEIAAgDIAAgFIACgDIAFgDIAIgEIAKgCIAKgBQALAAAHACQAHACAFAEQAEAFADAGQACAGAAAKIAAA5IgBACIgDACIgGAAIgHAAIgDgCIgBgCIAAgHQgFAGgHADQgHADgHAAQgHAAgGgBgAgDAHIgHADIgEAEIgBAGQAAAFAEADQADAEAGAAQAEAAAFgDQAEgDAFgEIAAgQIgKAAIgJABg");
	this.shape_3.setTransform(1076.875,1060.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AglBBIgDAAIgCgCIgBgBIAAh5IABgCIABgBIAEgBIAFAAIAEAAIAEABIABABIABACIAAAKIAHgHIAIgFIAHgDIAIgBQAKAAAHAEQAGAEAFAGQAEAHACAJQACAIAAAKQAAAMgDAIQgCAJgFAHQgFAGgHAEQgHADgJAAIgGAAIgGgCIgGgEIgGgGIAAAqIgBABIgCACIgEAAIgGABIgGgBgAgDgrIgFACIgFAFIgFAGIAAAdQAFAFAFAEQAEAEAEAAQAFAAADgDQAEgCACgEQACgDABgFIABgKIgBgLQAAgFgCgEQgCgEgEgCQgDgDgFAAIgEABg");
	this.shape_4.setTransform(1067.075,1061.775);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AA5AwIgGAAIgEgBIgCgBIAAgCIAAgyIgBgIIgDgGQgBgDgDgBQgDgCgDAAQgFAAgEAEQgFADgFAHIAAA4IAAACIgCABIgEABIgGAAIgFAAIgEgBIgCgBIAAgCIAAgyIgBgIIgDgGQgBgDgDgBQgDgCgDAAQgFAAgEAEQgFADgFAHIAAA4IAAACIgCABIgEABIgGAAIgGAAIgEgBIgCgBIAAgCIAAhWIAAgBIACgCIADAAIAFgBIAFABIAEAAIABACIABABIAAAKQAHgHAHgEQAHgEAIAAIAKABIAHADIAFAFIAEAHIAIgIIAHgEIAIgDIAHgBQAJAAAGADQAGADADAFQAEAFACAGQABAHAAAIIAAA2IAAACIgCABIgEABIgGAAg");
	this.shape_5.setTransform(1053.375,1060.025);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgUAuQgJgDgGgHQgFgGgDgIQgDgJAAgMQAAgKADgKQADgIAGgHQAGgHAJgEQAJgDALAAQAMAAAIADQAJAEAGAFQAFAGADAJQADAKAAALQAAALgDAJQgDAIgGAHQgGAHgJADQgJAEgLAAQgMAAgIgDgAgIgbQgFACgCAEQgDAEgBAFIgBAMIABAMQABAFACAEQADAEAEACQAEADAFAAQAFAAAEgDQAFgBACgEQADgEABgFIABgNIgBgLQgBgFgCgEQgDgEgEgDQgEgCgGAAQgEAAgEACg");
	this.shape_6.setTransform(1039.825,1060.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgNA9QgKgEgHgIQgIgIgEgMQgEgLAAgQQAAgPAFgNQAEgMAIgJQAHgIALgFQALgEAMAAIAKABIAJACIAIADIAEAEIACACIABACIAAADIABAFIgBAFIAAADIgCACIgBAAIgEgBIgGgEIgIgEQgFgCgHAAQgHAAgGAEQgFADgEAFQgFAGgCAIQgCAIAAAJQAAALADAJQACAIAEAFQAEAFAFADQAGADAIAAQAHAAAFgCIAIgEIAGgDIAEgCIABABIABABIABAEIAAAFIAAAEIgBADIAAACIgCACIgEADIgIAEIgKACIgMABQgMAAgLgEg");
	this.shape_7.setTransform(1029.325,1058.475);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAeAwIgHAAIgDgBIgCgBIgBgCIAAgwIgBgKIgDgGQgCgDgCgBQgDgCgEAAQgDAAgFAEQgFADgFAHIAAA4IAAACIgCABIgFABIgGAAIgFAAIgEgBIgCgBIgBgCIAAhWIABgBIABgCIAEAAIAFgBIAFABIADAAIACACIAAABIAAAKQAIgHAHgEQAGgEAJAAQAIAAAGADQAGADAFAFQADAFACAGQABAHAAAKIAAA0IAAACIgCABIgDABIgGAAg");
	this.shape_8.setTransform(1014.05,1060.025);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgVBAQgHgCgFgDQgGgDgCgFQgCgEAAgFIABgGIACgFIAEgGIAFgFQgEgCgCgDQgCgEAAgFQAAgGACgDQADgGAEgDQgDgEgCgEQgCgFAAgIQAAgHACgGQADgGAFgEQAFgEAGgDQAHgCAIABIAHAAIAHABIAbAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAAAIABAHQAAAGgBABQgBABAAABQAAAAAAAAQgBABAAAAQAAAAgBAAIgKAAIADAFIABAGQAAAIgCAGQgDAGgFAEQgEAEgHACQgHACgHAAIgIgBIgGgCIgCACIgBADQAAAEADABQACACAFAAIAUABIANACQAGACAEADQAEAEACAEQACAFAAAFQAAAHgDAFQgDAHgFADQgGAFgJACQgIACgLAAQgLAAgIgBgAgPAeIgDADIgBADIAAADQAAAFAFACQAEADAJAAIAJgBIAGgEQACgBABgCIABgFQAAgFgDgCQgEgDgGAAIgQAAIgEAEgAgIgvIgEAEQgCACgBADIgBAFQAAAIAEADQAEAEAHAAIAFgBIAFgDIADgFIABgGQAAgHgEgEQgEgDgGAAIgHAAg");
	this.shape_9.setTransform(1003.825,1061.8);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAABDIgFAAIgEgBIgCgCIAAgCIAAhVIAAgCIACgBIAEgBIAFgBIAGABIAEABIACABIAAACIAABVIAAACIgCACIgEABIgGAAgAgKgrQgDgCAAgIQAAgHADgDQADgCAHAAQAIgBADADQADADAAAHQAAAHgDADQgDADgIAAQgIAAgCgDg");
	this.shape_10.setTransform(996.725,1058.2);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgNAxIgIgCIgFgDIgEgCIgCgDIAAgHIAAgEIABgDIABgBIABgBIADABIAGADIAHADQAEABAFABIAFgBIAFgDQAAAAABAAQAAAAAAgBQABAAAAgBQAAAAAAgBIABgEQAAgDgBgCIgFgDIgGgEIgIgDIgHgDQgEgDgDgCQgDgDgCgEQgCgFAAgGQAAgGADgFQACgFAFgEQAEgEAHgCQAHgCAHAAIAIABIAHABIAFACIADACIABABIABACIAAACIABAEIgBAEIAAADIgBACIgBAAIgDgBIgFgDIgGgCIgJAAIgEAAIgEACIgDADIAAAEQAAACABACIAFAFIAGACIAIADIAIAEQAEACADADQADACACAFQABAEAAAGQAAAIgCAFQgDAGgFAEQgFADgHADQgHABgHAAIgKAAg");
	this.shape_11.setTransform(990.275,1060.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgPAvQgKgEgFgGQgGgGgDgIQgDgKAAgMQAAgLADgJQAEgJAFgHQAGgGAIgEQAIgDAKAAQAKAAAIADQAIADAFAGQAFAGACAIQADAHAAAKIAAADQAAAEgCACQgCACgDAAIg1AAQAAAGACAEQABAFADADQACAEAFABQAEABAGABIAMgBIAIgCIAFgDIAFgBIABABIABABIAAADIAAAEIAAADIAAADIAAACIgBABIgEACIgHADIgKACIgMAAQgLAAgIgCgAgGgdIgGAFIgDAHIgCAIIAkAAQAAgKgEgFQgEgHgKABQgDgBgEACg");
	this.shape_12.setTransform(981.2,1060.1);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgsA/QgDAAgDgCQgCgCAAgEIAAhtQAAgEACgCQADgCADAAIAhAAQAPAAAMAEQALAEAJAIQAIAHAEAMQAEALABAPQgBARgEAMQgFAMgIAIQgJAIgMAEQgMADgQAAgAgaArIANAAQALAAAGgDQAHgDAFgFQAFgGADgIQACgIAAgKQAAgJgCgIQgCgHgFgGQgFgGgHgDQgGgDgMAAIgNAAg");
	this.shape_13.setTransform(970.25,1058.475);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AglBBIgDAAIgCgCIgBgBIAAh5IABgCIABgBIAEgBIAFAAIAEAAIAEABIABABIABACIAAAKIAHgHIAIgFIAHgDIAIgBQAKAAAHAEQAGAEAFAGQAEAHACAJQACAIAAAKQAAAMgDAIQgCAJgFAHQgFAGgHAEQgHADgJAAIgGAAIgGgCIgGgEIgGgGIAAAqIgBABIgCACIgEAAIgGABIgGgBgAgDgrIgFACIgFAFIgFAGIAAAdQAFAFAFAEQAEAEAEAAQAFAAADgDQAEgCACgEQACgDABgFIABgKIgBgLQAAgFgCgEQgCgEgEgCQgDgDgFAAIgEABg");
	this.shape_14.setTransform(953.975,1061.775);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AglBBIgDAAIgCgCIgBgBIAAh5IABgCIABgBIAEgBIAFAAIAEAAIAEABIABABIABACIAAAKIAHgHIAIgFIAHgDIAIgBQAKAAAHAEQAGAEAFAGQAEAHACAJQACAIAAAKQAAAMgDAIQgCAJgFAHQgFAGgHAEQgHADgJAAIgGAAIgGgCIgGgEIgGgGIAAAqIgBABIgCACIgEAAIgGABIgGgBgAgDgrIgFACIgFAFIgFAGIAAAdQAFAFAFAEQAEAEAEAAQAFAAADgDQAEgCACgEQACgDABgFIABgKIgBgLQAAgFgCgEQgCgEgEgCQgDgDgFAAIgEABg");
	this.shape_15.setTransform(943.225,1061.775);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgUAwQgGgDgEgDQgEgEgCgFQgDgFAAgHQAAgHADgHQADgFAGgDQAGgDAJgCQAJgCAKAAIAJAAIAAgFIgBgHIgDgGIgFgDIgHgBQgGAAgFACIgIADIgHADIgEABIgBAAIgCgCIgBgEIAAgDIAAgFIACgDIAFgDIAIgEIAKgCIAKgBQALAAAHACQAHACAFAEQAEAFADAGQACAGAAAKIAAA5IgBACIgDACIgGAAIgHAAIgDgCIgBgCIAAgHQgFAGgHADQgHADgHAAQgHAAgGgBgAgDAHIgHADIgEAEIgBAGQAAAFAEADQADAEAGAAQAEAAAFgDQAEgDAFgEIAAgQIgKAAIgJABg");
	this.shape_16.setTransform(932.425,1060.1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgeBAIgGAAIgEgBIgCgCIAAgCIAAhwQAAgFACgCQACgCAEAAIAeAAIAIAAIAJACQAGABAGACQAGADAEAFQAEAFACAGQACAGAAAIQAAALgDAIQgEAHgGAFQgGAHgJACQgKADgLAAIgLAAIAAAoIAAACIgDACIgDABIgHAAgAgRAAIAMAAQAFAAAEgCQAEgBADgDIAEgHQABgEAAgFQAAgHgCgEQgCgFgEgCQgDgCgEAAIgHAAIgLAAg");
	this.shape_17.setTransform(923.225,1058.5);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAeAwIgHAAIgDgBIgDgBIAAgCIAAgwIgBgKIgCgGQgDgDgCgBQgDgCgDAAQgFAAgEAEQgFADgFAHIAAA4IAAACIgDABIgDABIgHAAIgFAAIgEgBIgCgBIAAgCIAAhWIAAgBIABgCIAEAAIAFgBIAFABIADAAIACACIAAABIAAAKQAIgHAHgEQAHgEAIAAQAIAAAGADQAHADADAFQAEAFACAGQACAHgBAKIAAA0IAAACIgCABIgEABIgFAAg");
	this.shape_18.setTransform(907.65,1060.025);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgUAwQgGgDgEgDQgEgEgCgFQgDgFAAgHQAAgHADgHQADgFAGgDQAGgDAJgCQAJgCAKAAIAJAAIAAgFIgBgHIgDgGIgFgDIgHgBQgGAAgFACIgIADIgHADIgEABIgBAAIgCgCIgBgEIAAgDIAAgFIACgDIAFgDIAIgEIAKgCIAKgBQALAAAHACQAHACAFAEQAEAFADAGQACAGAAAKIAAA5IgBACIgDACIgGAAIgHAAIgDgCIgBgCIAAgHQgFAGgHADQgHADgHAAQgHAAgGgBgAgDAHIgHADIgEAEIgBAGQAAAFAEADQADAEAGAAQAEAAAFgDQAEgDAFgEIAAgQIgKAAIgJABg");
	this.shape_19.setTransform(897.075,1060.1);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AAABEIgFAAIgEgBIgCgBIAAgCIAAh/IAAgCIACgBIAEgBIAFAAIAGAAIAEABIACABIAAACIAAB/IAAACIgCABIgEABIgGAAg");
	this.shape_20.setTransform(889.975,1058.025);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgQBAIgEAAIgBgCIAAgEIAMgdIgCgBIgCgDIgehPIgBgFQAAgBAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAIAEgBIAHgBIAHABIAEAAIACACIABADIAUA6IAAAAIATg7IABgDIADgBIAIgBIAHABIAEABIABADIAAAEIgdBUIgLAgQgBACgEABIgKABIgGgBg");
	this.shape_21.setTransform(882.775,1061.85);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgsA/QgDAAgCgCQgCgCAAgEIAAhtQAAgEACgCQACgCADAAIAgAAQAQAAAMAEQALAEAJAIQAIAHAEAMQAFALgBAPQABARgFAMQgFAMgJAIQgIAIgMAEQgMADgQAAgAgaArIANAAQALAAAGgDQAHgDAFgFQAFgGACgIQACgIAAgKQAAgJgCgIQgCgHgEgGQgFgGgHgDQgHgDgLAAIgNAAg");
	this.shape_22.setTransform(872.1,1058.475);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgWA9QgIgEgFgJQgFgIgCgMQgCgMAAgPQAAgOACgNQADgMAFgJQAGgIAJgFQAJgEALAAQANAAAJAEQAIAFAFAIQAFAIACAMQACAMAAAPQAAAPgCAMQgDAMgFAJQgGAIgJAFQgIAEgMAAQgNAAgJgEgAgIgpQgEADgCAFQgDAGAAAIIgBATIABAWQABAIACAGQACAFAEACQAEACAEAAQAEAAACgBQADgBADgDIADgGIADgJIABgLIAAgNIAAgPIgCgMIgCgJIgEgFIgFgDIgGgBQgFAAgDADg");
	this.shape_23.setTransform(855.875,1058.475);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AghBAIgEAAIgDgCIgBgDIgBgFIABgGIABgEIACgEIADgDIAWgYIAKgMIAGgJIADgJIAAgHIgBgHIgCgFIgFgDQgDgBgDAAQgHAAgDABIgIAEIgGADIgDABIgCAAIgBgCIgBgEIAAgFIAAgEIAAgDIABgCIACgCIAEgDIAIgDIALgDIAMgBQAJAAAHACQAHADAGAEQAEAFADAGQACAGABAHIgCAMQgBAGgEAHQgEAGgGAIIgSATIgOAPIAxAAIACABIABACIABADIAAAFIAAAFIgBADIgBACIgCAAg");
	this.shape_24.setTransform(845.75,1058.375);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgWA9QgIgEgFgJQgFgIgCgMQgCgMAAgPQAAgOACgNQADgMAFgJQAGgIAJgFQAJgEALAAQANAAAJAEQAIAFAFAIQAFAIACAMQACAMAAAPQAAAPgCAMQgDAMgFAJQgGAIgJAFQgIAEgMAAQgNAAgJgEgAgIgpQgEADgCAFQgDAGAAAIIgBATIABAWQABAIACAGQACAFAEACQAEACAEAAQAEAAACgBQADgBADgDIADgGIADgJIABgLIAAgNIAAgPIgCgMIgCgJIgEgFIgFgDIgGgBQgFAAgDADg");
	this.shape_25.setTransform(835.575,1058.475);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgiBAIgDAAIgCgCIgCgDIgBgFIABgGIABgEIACgEIADgDIAWgYIALgMIAFgJIADgJIABgHIgBgHIgEgFIgDgDQgEgBgEAAQgFAAgFABIgIAEIgFADIgEABIgBAAIgBgCIgBgEIAAgFIAAgEIABgDIABgCIABgCIAFgDIAHgDIALgDIAMgBQAJAAAIACQAGADAFAEQAFAFADAGQACAGAAAHIgBAMQgBAGgEAHQgEAGgGAIIgSATIgOAPIAxAAIACABIABACIABADIABAFIgBAFIAAADIgCACIgCAAg");
	this.shape_26.setTransform(825.45,1058.375);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgdBBQgNgEgIgIQgJgJgEgMQgEgNAAgRQAAgRAFgNQAEgOAJgJQAIgJAOgEQAMgEAQAAQAQAAANAEQAMAEAJAJQAJAIAEANQAEAMAAARQAAARgEANQgFAOgJAJQgJAJgMAEQgNAEgQAAQgRAAgMgEgAgWgxQgJADgHAHQgFAHgEAKQgDALAAAMQAAAOADAKQAEAKAFAGQAHAHAJADQAJADAOAAQAOAAAJgEQAKgEAFgIQAGgHADgKQACgKAAgLQAAgNgCgJQgDgKgGgHQgGgHgKgEQgJgDgOAAQgNAAgJAEgAgOAoQgGgDgFgFQgEgFgDgIQgCgIAAgKQAAgKACgIQAEgIAEgFQAFgGAHgCQAHgDAIAAIAHABIAFABIAGACIADADIACABIAAACIABACIAAAEIAAADIgBADIgCACIgBAAIgDgBIgDgCIgGgDIgIgBQgHAAgEAGQgFAHAAALQAAAGABAFIAEAIIAFAFQADABAEAAQAFAAACgBIAGgDIAEgDIADgBIABAAIABACIAAACIAAAFIAAADIAAADIAAACIgCABIgDACIgGADIgGACIgIABQgIAAgHgDg");
	this.shape_27.setTransform(812,1058.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(125));

	// titles
	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AjVC8QglgTgaggQgZgfgMgrQgNgqAAgwQAAggAFgcQAGgdAHgVQAHgWAJgOQAIgOAHgHQAGgGAMgDQAMgCAXAAIAYAAQALABAGADQAGACADAEQADADAAAFQAAAHgIANIgSAfQgKAUgIAbQgIAbABAkQAAAXAEASQAHASAKANQAKANAPAHQAQAHASAAQAWAAAPgMQAPgMAMgSQAMgTAKgXIAXgxQAMgaAOgYQAOgYAVgSQAVgTAcgMQAcgMAoAAQAtAAAjARQAiARAXAdQAWAcAMAnQALAnAAAqQAAAXgDAWQgEAXgFATQgHAUgHAPQgHAPgFAFIgIAHIgJADIgPABIgVAAIgYAAIgQgCQgGgCgDgDQgDgEAAgFQAAgFAHgMIAOgdQAJgRAGgXQAHgWAAgbQAAgUgGgPQgFgQgIgKQgJgLgNgFQgMgFgPAAQgVAAgQALQgOAMgNATQgMATgKAYIgXAxQgLAagPAYQgPAZgUATQgVATgbALQgdAMglAAQgyAAgmgSg");
	this.shape_28.setTransform(1837.45,812.925);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AkhC6QgJgBgGgDQgFgCgDgEQgDgEAAgEIAAk8QAAgQAKgLQAJgLAWAAIIlAAQAWAAAJALQAKALAAAQIAAE6QAAAFgDADQgCADgHADQgFACgKACIgYABIgYgBQgIgCgGgCQgHgDgCgDQgCgDAAgFIAAjgIibAAIAAC9QAAAFgDAEQgCADgHADQgEACgLACIgWAAIgXAAQgJgCgGgCQgFgDgCgDQgDgEAAgFIAAi9IiyAAIAADiQAAAEgEAEQgCAEgGACQgGADgJABIgYABIgYgBg");
	this.shape_29.setTransform(1837.45,767.025);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AkoFwQgFAAgEgDQgEgCgCgHQgCgHgCgMQgBgMgBgSQABgRABgMQACgMACgGQACgHAEgEQAEgDAFAAIIBAAIAAgBIoBi2QgGgDgEgEQgEgEgCgHQgDgJgBgLIgBgcIABgcQACgMADgHQADgHADgFQAEgEAFgCIIBixIAAgBIoBAAQgFAAgEgCQgEgDgCgHQgCgIgCgLQgBgMgBgRQABgSABgMQACgLACgIQACgHAEgCQAEgDAFAAIIyAAQAZAAANANQAOANAAAWIAABUQAAAXgFAQQgDAQgJAMQgIAMgOAHQgOAIgVAGIl3CIIAAACIF2CNQAVAHAOAHQAPAHAIALQAJAJADAOQAFAOAAASIAABXQAAANgEAKQgEAIgHAHQgFAGgLADQgIADgNAAg");
	this.shape_30.setTransform(1837.25,697.7);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("Ak3EfQgFgGgBgNIgBgmIABgnQABgOABgHQADgHAEgDQADgDAHgCIB/grIAAjsIh8goIgLgFQgFgDgDgHQgCgIgBgMIgBgiQAAgXACgNQABgMAFgFQAGgFAKABQALACARAGIIwDDQAHADAFADQAGAEACAJQADAIABAQIABAoIgBAtQgBARgDAJQgCAKgGAEQgFAEgJADIovDDQgSAGgKACIgDAAQgIAAgFgEgAhIBSIELhYIAAAAIkLhag");
	this.shape_31.setTransform(1837.4,623.716);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("ADCENIgRgDQgGgDgCgDQgDgDAAgEQAAgHAIgOQAJgOALgYQAKgXAJggQAJghAAgrQAAgtgQglQgQglgdgbQgdgagqgOQgogOgxAAQg1AAgqAPQgpAOgbAZQgdAagOAlQgOAjAAAsQAAAVAFAWQAFAUAKATICSAAIAAh4QAAgIALgGQALgEAaAAQANgBAKACQAJABAFACQAGADACADQAEAEAAAEIAADWQAAAIgEAFQgCAHgFAEQgGAFgIACQgHACgKAAIj6AAQgPABgLgFQgKgFgHgQQgGgQgIgYQgGgXgFgZQgFgagDgZQgBgaAAgaQgBhKAVg8QAXg8AogqQAqgpA7gWQA8gWBLAAQBNAAA9AXQA/AYAqArQArArAYA9QAWA8AABKQAAApgFAiQgGAigIAZQgIAZgJARQgKAQgGAHQgHAGgNADQgMADgZAAIgXgBg");
	this.shape_32.setTransform(1837.4,560.25);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AiFEYQg9gUgsgnQgrgmgXg4QgWg6AAhKQAAhJATg3QAUg3AngkQAngmA+gRQA8gTBUAAQBLAAA+AUQA9ATArAmQArAoAXA5QAXA4AABKQAABIgTA3QgTA3gnAlQgoAlg8ASQg9AThSAAQhNAAg/gTgAhaicQgpAJgdASQgeASgPAgQgPAfgBAwQAAAuASAfQASAgAeAUQAfAUAnAHQApAJAsgBQAyABAogJQAqgHAdgTQAdgTAQgfQAQgfAAgvQAAgugSghQgSgfgegTQgdgUgogIQgogIgtAAQgzAAgpAHg");
	this.shape_33.setTransform(1837.4,473.25);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AkgC6QgKgBgGgDQgGgCgDgEQgCgEAAgEIAAk8QAAgQAJgLQAKgLAVAAIInAAQAVAAAJALQAKALAAAQIAAE6QAAAFgCADQgDADgGADQgHACgJACIgYABIgXgBQgJgCgHgCQgGgDgDgDQgCgDAAgFIAAjgIiaAAIAAC9QAAAFgDAEQgCADgHADQgEACgKACIgYAAIgWAAQgJgCgGgCQgGgDgCgDQgCgEAAgFIAAi9IizAAIAADiQAAAEgCAEQgDAEgFACQgHADgKABIgXABIgXgBg");
	this.shape_34.setTransform(1837.4,417.975);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AiLDwQg9gXgogrQgmgqgTg8QgSg+AAhSIAAiXQAAgQAJgLQAKgLAVAAIInAAQAVAAAJALQAKALAAAQIAACiQAABTgUA7QgTA7goAoQgnAog4AWQg6AUhLABQhWAAg+gXgAjWhDQAAA1AOAjQAOAkAbAZQAcAYApAMQApAMA2gBQAsAAAogKQAmgKAcgYQAdgXAPgkQAQgkAAg7IAAhAImtAAg");
	this.shape_35.setTransform(1837.4,362.45);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AkpBBQgGAAgDgEQgEgDgDgIQgCgHgBgMQgCgMAAgTQAAgSACgMQABgMACgIQADgHAEgDQADgEAGAAIJTAAQAFAAAEAEQAEACADAIQACAIABAMQACAMAAASQAAATgCAMQgBAMgCAHQgDAIgEADQgEAEgFAAg");
	this.shape_36.setTransform(1837.4,316);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AEnEcQgLgCgRgGIowi8QgIgDgFgEQgFgEgDgIQgDgJAAgPIgBgoIAAggIACgYQABgKABgGQACgGAEgEQADgEADgCIALgFIIvi8QASgGAKgBQAKgBAFAGQAGAGAAAPQACAOAAAbIgBAjQgBANgDAHQgCAGgFADIgMAFInmCZIHkCXQAIACAEADQAGADADAIQADAGABAOIABAkQAAAWgCANQgBAMgGAFQgEADgHAAIgEAAg");
	this.shape_37.setTransform(1837.4,273.0797);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AkNEEQgMAAgIgDQgJgFgGgGQgGgGgDgJQgCgKAAgJIAAg2QgBgSAEgMQADgNAJgKQAJgLAPgJQAQgKAZgNIEmibQAagOAfgOIA7gaIAAgBIhGADIhIABIlJAAQgGAAgDgCQgEgEgDgFQgDgIgBgKQgCgMAAgRQAAgSACgLQABgLADgGQADgHAEgCQADgDAGAAII3AAQAXAAALAOQALANAAATIAABFQAAATgDANQgDAMgIALQgGAKgOAIQgNAJgSAJIjnB7IgpAVIgoAUIgoATIgnASIAAABIBHgDIBGgBIEpAAQAEAAAEAEQAEACADAIQADAGABAMQABALAAARQAAARgBALQgBALgDAHQgDAFgEADQgEADgEgBg");
	this.shape_38.setTransform(1677.45,863.8);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("ADCENIgRgDQgGgCgDgDQgCgEAAgEQAAgHAJgOQAIgOALgYQAKgXAJggQAIghABgrQgBgtgQglQgPglgegaQgcgagqgPQgogOgxAAQg2AAgpAOQgpAPgcAaQgbAZgPAlQgOAkAAArQAAAVAFAVQAFAWAJASICTAAIAAh4QAAgJALgEQALgGAbAAQAMABAJABQAKABAFADQAGACADADQACAEAAAEIAADWQAAAHgCAGQgDAGgFAGQgFAEgJACQgHADgJAAIj7AAQgPAAgLgFQgKgGgHgPQgGgQgIgYQgGgXgFgZQgFgZgDgaQgCgZAAgaQABhMAUg7QAWg8ApgqQAqgpA8gWQA7gWBLAAQBNAAA9AXQA+AYArArQArArAXA9QAYA8AABKQgBAqgGAhQgEAigJAZQgIAZgJARQgKAQgGAHQgHAGgMAEQgNACgYAAIgYgBg");
	this.shape_39.setTransform(1677.5,797.7);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AkpBBQgGAAgDgEQgEgDgDgIQgCgHgCgMQgBgMAAgTQAAgSABgMQACgMACgIQADgHAEgDQADgEAGAAIJTAAQAFAAAEAEQAEADADAHQACAIABAMQACAMAAASQAAATgCAMQgBAMgCAHQgDAIgEADQgEAEgFAAg");
	this.shape_40.setTransform(1677.45,753.85);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AjVC8QgmgTgZggQgZgfgMgrQgNgqAAgwQAAggAFgcQAFgdAIgVQAIgWAIgOQAIgOAHgHQAGgGAMgDQAMgCAXAAIAZAAQAKABAGADQAHACACAEQADADAAAFQAAAHgIANIgSAfQgJAUgJAbQgHAbgBAkQAAAXAFASQAHASAKANQAKANAPAHQAQAHASAAQAWAAAOgMQAQgMAMgSQAMgTALgXIAVgxQAMgaAPgYQAOgYAVgSQAVgTAcgMQAcgMAoAAQAtAAAjARQAiARAWAdQAYAcALAnQALAnAAAqQAAAXgDAWQgEAXgFATQgHAUgHAPQgHAPgFAFIgJAHIgJADIgOABIgVAAIgYAAIgQgCQgGgCgDgDQgDgEAAgFQAAgFAHgMIAPgdQAIgRAGgXQAHgWAAgbQAAgUgGgPQgEgQgJgKQgKgLgMgFQgNgFgOAAQgVAAgQALQgPAMgMATQgLATgLAYIgXAxQgLAagPAYQgPAZgUATQgVATgcALQgbAMgmAAQgzAAglgSg");
	this.shape_41.setTransform(1677.45,716.975);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AkgC6QgKgBgGgDQgGgCgDgEQgCgEAAgEIAAk8QAAgQAKgLQAJgLAVAAIImAAQAWAAAJALQAKALAAAQIAAE6QAAAFgCADQgDADgGADQgHACgJACIgYABIgXgBQgKgCgGgCQgGgDgDgDQgBgDAAgFIAAjgIibAAIAAC9QAAAFgDAEQgCADgHADQgFACgJACIgYAAIgWAAQgJgCgGgCQgFgDgCgDQgDgEAAgFIAAi9IiyAAIAADiQAAAEgEAEQgCAEgFACQgHADgJABIgYABIgXgBg");
	this.shape_42.setTransform(1677.45,671.075);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AiLDwQg9gXgogrQgmgqgTg8QgSg+AAhSIAAiYQAAgPAKgMQAJgLAVABIImAAQAWgBAJALQAKAMAAAPIAACiQAABUgUA7QgTA7goAoQgmAog6AWQg4AUhMAAQhVABg/gXgAjVhDQgBA1AOAjQAOAkAbAZQAcAYApALQApAMA2AAQAsAAAogKQAmgLAcgXQAdgXAPgkQARgjAAg8IAAhBImtAAg");
	this.shape_43.setTransform(1677.45,615.55);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AjwDpIgPgCQgGgCgEgCIgKgIQgGgFgIgQQgJgPgIgWQgIgXgGgcQgFgdAAghQAAhAAUg0QAUg0AoglQAoglA7gTQA8gUBPAAQBPAAA/AWQA+AVArAnQAqAmAWA3QAWA1AABAQAAAbgEAYQgEAYgIAVQgHAVgJARQgJAQgHAHQgGAGgFADQgEACgHACIgQACIgXABIgZgBQgKgBgHgDQgGgCgDgEQgDgDAAgEQAAgIAJgLQAIgLALgSQAKgSAJgYQAIgZAAgiQAAgmgPgcQgPgegdgVQgcgVgpgKQgpgLgxAAQg4AAgpAMQgpALgaAVQgaAVgNAeQgNAdAAAmQAAAiAIAZQAIAZAKASIARAdQAIAMAAAGQAAAFgCADQgCADgGACQgFACgLABIgcABIgVgBg");
	this.shape_44.setTransform(1677.425,534.075);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AkpBBQgGgBgDgDQgEgDgDgHQgCgIgCgMQgBgMAAgTQAAgSABgMQACgMACgIQADgHAEgDQADgDAGgBIJTAAQAFABAEADQAEACADAJQACAHABAMQACAMAAASQAAATgCAMQgBAMgCAIQgDAHgEADQgEADgFABg");
	this.shape_45.setTransform(1677.45,493.55);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AkpD3QgGAAgDgDQgEgEgDgHQgCgIgCgMQgBgMAAgSQAAgUABgMQACgNACgGQADgIAEgDQADgDAGAAID/AAIAAjrIj/AAQgGAAgDgDQgEgDgDgHQgCgIgCgMQgBgMAAgTQAAgTABgMQACgMACgIQADgHAEgDQADgDAGgBIJTAAQAFABAEADQAEADADAHQACAIABAMQACAMAAATQAAATgCAMQgBAMgCAIQgDAHgEADQgEADgFAAIjoAAIAADrIDoAAQAFAAAEADQAEADADAIQACAGABANQACAMAAAUQAAASgCAMQgBAMgCAIQgDAHgEAEQgEADgFAAg");
	this.shape_46.setTransform(1677.45,448.65);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AAfDIQgogRgcggQgcgfgPguQgOgvAAg9IAAg1IjKAAQgFAAgEgDQgEgDgCgIQgCgHgCgMQgCgMABgTQgBgTACgMQACgNACgHQACgIAEgCQAEgDAFAAII3AAQAXAAALAMQAMAMAAATIAACVQAAAWgCAUQgBAUgGAcQgGAdgPAdQgPAdgXAUQgXAVgfAKQgfALgnAAQg1AAgpgQgAAEgdQAAAdAIAVQAIAVAPANQAPANAVAHQAVAHAYAAQAhAAAWgMQAVgLALgSQAKgRACgSQADgSAAgUIAAg3IjWAAg");
	this.shape_47.setTransform(1677.3,392.425);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("Ak3EfQgEgGgCgNIgBgmIAAgnQABgOADgHQACgHAEgDQAEgDAGgCIB/grIAAjsIh7goIgMgFQgFgDgCgHQgDgIgBgMIgBgiQAAgXABgNQACgMAFgFQAGgFAKABQAKACASAGIIvDDQAJADAFADQAFAEADAJQADAIAAAQIABAoIgBAtQAAARgDAJQgDAKgFAEQgGAEgJADIovDDQgSAGgKACIgDAAQgIAAgFgEgAhIBSIELhYIAAAAIkLhag");
	this.shape_48.setTransform(1677.45,333.616);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AkyDoQgEgCgCgHQgCgHgBgOIgBgnIABghQABgMACgHQADgHAEgDQAEgDAGgCICNg4IArgUQASgKAMgLQANgMAGgQQAHgPAAgVIAAgoIjxAAQgFAAgEgDQgEgDgCgIQgCgHgCgMQgCgMABgTQgBgTACgMQACgNACgHQACgIAEgCQAEgDAFAAII9AAQAWAAAIALQAKALAAAQIAACjIgBAoIgCAeQgGAmgNAeQgNAfgWAVQgVAVgdALQgdAMglAAQggAAgagIQgagIgUgQQgVgQgPgXQgPgXgIgdQgIAOgJANQgKAMgOALQgOALgSAKQgRAKgXAJIh8A1IgcAKQgIACgFAAQgFAAgEgCgAAogoQAAAcAGATQAHAVAMANQAMAOARAHQARAHAUAAQAfAAAWgOQAVgOAJghQADgIAAgNQACgMAAgWIAAg6IizAAg");
	this.shape_49.setTransform(1677.3,277.325);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("ADCENIgRgDQgGgDgDgCQgCgEAAgEQAAgHAJgOQAIgOALgYQAKgXAJggQAJghAAgrQgBgtgQglQgPglgegbQgcgagqgOQgogOgxAAQg2AAgpAPQgpAOgcAZQgcAagOAlQgOAjAAAsQAAAVAFAWQAFAUAJATICTAAIAAh4QAAgIALgGQALgEAbAAQAMgBAJACQAKABAFACQAGADADADQACAEAAAEIAADWQAAAHgCAGQgDAHgFAEQgGAFgIACQgHACgJAAIj7AAQgPABgLgFQgLgGgGgPQgGgQgIgYQgGgXgFgZQgFgagDgZQgCgaAAgaQABhKAUg8QAWg8ApgqQAqgpA8gWQA7gWBLAAQBNAAA9AXQA/AYAqArQArArAXA9QAYA8AABKQgBAqgFAhQgGAhgIAaQgIAZgJARQgKAQgGAHQgHAGgNADQgMADgZAAIgXgBg");
	this.shape_50.setTransform(1677.4,213.85);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("ADCENIgRgDQgGgCgCgDQgDgEAAgEQAAgGAIgPQAJgOALgXQAKgYAJggQAJghAAgrQgBgtgPglQgQglgdgaQgdgagqgPQgogOgxAAQg1AAgqAOQgpAPgbAaQgcAZgPAlQgOAkAAArQAAAWAFAUQAFAWAKASICSAAIAAh4QAAgJALgEQALgGAaAAQANAAAJACQAKABAFADQAGACADADQADAEAAAEIAADVQAAAJgDAGQgDAFgFAGQgGAEgIADQgHACgKAAIj6AAQgPgBgLgEQgKgFgHgQQgGgRgIgWQgGgYgFgZQgFgZgCgaQgCgZAAgaQAAhLAUg8QAXg8AogqQAqgpA7gWQA8gWBLAAQBMAAA+AYQA/AXAqArQArArAYA9QAWA8AABKQAAAqgFAhQgGAigIAZQgIAZgJAQQgKARgGAHQgHAGgNAEQgMACgZAAIgXgBg");
	this.shape_51.setTransform(1517.45,807.7);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AkNEFQgMAAgIgFQgJgEgGgGQgGgHgDgIQgDgJABgKIAAg3QgBgRAEgMQADgMAJgLQAKgLAOgKQAQgJAZgMIEmidQAbgOAegOIA7gZIAAgBIhGADIhIABIlJAAQgGAAgDgCQgEgEgDgFQgDgIgBgKQgBgMAAgSQAAgRABgLQABgLADgHQADgGAEgCQAEgCAFAAII3AAQAXgBALAOQAMANgBATIAABGQAAASgDANQgDANgIAKQgGAJgOAKQgNAIgSAKIjoB6IgoAVIgpAUIgnATIgnASIAAAAIBHgCIBGAAIEoAAQAFgBAEADQAEAEADAGQADAHABALQABAMAAARQAAARgBALQgBALgDAHQgDAFgEADQgEACgFABg");
	this.shape_52.setTransform(1517.35,744.25);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AkqBAQgFAAgDgCQgEgEgCgHQgDgIgCgMQgBgMAAgTQAAgSABgMQACgNADgHQACgIAEgCQADgDAFAAIJVAAQAEAAAEADQAEADACAHQADAIACAMQABAMAAASQAAATgBAMQgCAMgDAIQgCAHgEAEQgEACgEAAg");
	this.shape_53.setTransform(1517.4,698);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AkgCsQgJgBgIgCQgGgDgDgDQgCgEAAgFIAAkhQAAgPAJgMQAJgLAWABII9AAQAFgBADAEQAEACADAIQACAHACANQABAMAAATQAAATgBAMQgCAMgCAIQgDAHgEAEQgDACgFAAIn7AAIAADGQAAAFgEAEQgCADgHADQgFACgLABIgYABIgZgBg");
	this.shape_54.setTransform(1517.55,666.6);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AkhC6QgJgBgGgDQgFgCgDgEQgDgEAAgEIAAk8QAAgQAJgLQAKgLAWAAIIlAAQAWAAAJALQAKALAAAQIAAE6QAAAFgDADQgCADgHADQgFACgKACIgYABIgYgBQgIgCgGgCQgHgDgCgDQgCgDgBgFIAAjgIiaAAIAAC9QAAAFgDAEQgDADgGADQgEACgLACIgWAAIgXAAQgJgCgGgCQgFgDgCgDQgDgEAAgFIAAi9IizAAIAADiQAAAEgDAEQgCAEgGACQgGADgJABIgYABIgYgBg");
	this.shape_55.setTransform(1517.4,619.175);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AiLDwQg+gXgmgqQgogrgSg9QgSg8AAhUIAAiXQAAgQAJgLQAKgLAWAAIIlAAQAWAAAJALQAKALAAAQIAACiQAABUgUA7QgUA6gnApQgnApg5AUQg4AWhMgBQhVAAg/gWgAjVhDQAAA1ANAjQAOAkAcAYQAbAYApAMQApANA2AAQAsAAAngLQAngLAcgWQAcgYAQgkQAQgkAAg7IAAhBImsAAg");
	this.shape_56.setTransform(1517.4,563.65);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AiEEYQg+gUgsgnQgrgmgXg4QgWg6AAhKQAAhJATg3QATg3AogkQAngmA9gRQA9gTBUAAQBLAAA9AUQA+ATArAmQArAoAXA5QAXA4AABKQAABIgTA3QgTA3goAlQgnAlg9ATQg7AShTAAQhOAAg9gTgAhaicQgpAIgdATQgeASgPAgQgPAfAAAwQgBAuATAfQARAgAeAUQAeAUAoAHQApAJAsgBQAyABAogJQAqgHAcgTQAegTAPgfQAQgfAAgvQAAgugSghQgRgfgegTQgegUgogIQgngIgsAAQg0AAgpAHg");
	this.shape_57.setTransform(1517.4,496.65);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AkoFwQgFAAgDgDQgEgCgDgHQgDgHgBgMQgBgMAAgSQAAgRABgMQABgMADgGQADgHAEgEQADgDAFAAIIBAAIAAgBIoAi2QgHgCgEgFQgEgEgCgHQgDgJgBgLIAAgcIABgcQABgMACgHQAEgHAEgFQADgEAGgCIIAixIAAgBIoBAAQgFAAgDgCQgEgDgDgHQgDgIgBgLQgBgMAAgRQAAgSABgMQABgLADgIQADgHAEgCQADgDAFAAIIyAAQAZAAANANQANANAAAWIAABUQAAAXgDAQQgEAQgJAMQgIAMgOAHQgOAIgVAGIl3CIIAAABIF3COQAUAHAPAHQANAHAJALQAJAJAEAOQADAOAAASIAABWQAAAOgDAKQgDAIgIAHQgGAGgJADQgKADgMAAg");
	this.shape_58.setTransform(1517.25,419.15);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AiLDwQg+gXgmgrQgogqgSg8QgSg+AAhSIAAiXQAAgQAJgLQAKgLAWAAIIlAAQAWAAAJALQAKALAAAQIAACiQAABTgUA7QgUA7gnAoQgnAog5AWQg4AUhMAAQhVABg/gXgAjVhDQAAA1ANAjQAOAkAcAZQAbAYApAMQApAMA2gBQAsAAAngKQAngKAcgYQAcgXAQgkQAQgjAAg8IAAhAImsAAg");
	this.shape_59.setTransform(1517.4,322.95);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AjWDBQglgSgYggQgagggNgtQgMgtAAg1QAAggAEgcQAFgcAHgWQAGgWAIgOQAHgOAFgFQADgEAFgCIALgEQAHgCAKAAIAYgBQAXAAAJAEQAKAEAAAHQAAAFgHAMQgHAMgHATQgHASgIAZQgGAZAAAgQAAAbAGAUQAHAUALAOQAMAPAQAHQARAHATAAQAXAAARgJQASgIAMgRQANgRAGgYQAIgagBgjIAAg3QABgGABgEQACgFAFgDQAFgDAKgBQAKgBANAAQAPAAAJABQAJABAFADQAEADACAEQACAEAAAGIAAA3QAAAcAHAWQAHAWAMAOQAMAPASAIQARAIAVAAQAQAAAOgGQAPgFAKgKQALgLAGgQQAGgQAAgXQAAgZgIgXQgHgWgJgSQgJgSgIgMQgIgNAAgFQAAgEABgDQADgDAEgCQAFgCAKgBIAXgBIAUAAIAOACIAJAEQAEACAFAFQAFAFAJAPQAJAPAJAXQAJAXAFAeQAHAeAAAjQAAAtgKAkQgMAjgUAYQgUAYgdANQgeAMglAAQgdAAgZgHQgYgHgVgOQgTgPgNgVQgOgVgHgcIgCAAQgEAhgMAbQgMAagUATQgTASgZAJQgZAKgcAAQgvAAglgSg");
	this.shape_60.setTransform(1517.4,264.375);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AkNEEQgMAAgJgDQgIgFgGgGQgGgHgDgIQgCgKAAgJIAAg2QAAgSADgMQAEgNAIgKQAJgKAPgKQAQgKAYgNIEnibQAbgOAdgOIA8gaIAAgBIhGADIhIABIlJAAQgGAAgDgCQgEgDgDgGQgDgIgBgKQgCgMAAgRQAAgSACgLQABgLADgHQADgGAEgCQADgCAGgBII3AAQAWAAALAOQAMANABATIAABGQgBASgDANQgDANgIAKQgGAJgOAJQgMAJgUAJIjmB7IgpAVIgoAUIgoATIgnASIAAABIBHgDIBGgBIEpAAQAEAAAEAEQAEACADAIQADAGABAMQABAKAAASQAAARgBALQgBALgDAHQgDAFgEADQgEACgEAAg");
	this.shape_61.setTransform(1357.4,795.3);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("ADBENIgRgDQgFgCgDgDQgCgEAAgEQAAgHAIgOQAKgOAKgYQAKgXAJggQAIghAAgrQABgtgRglQgPglgegbQgcgagpgOQgpgOgxAAQg2AAgpAOQgpAPgbAZQgdAagNAlQgPAkAAArQAAAVAFAVQAFAVAJATICTAAIAAh4QAAgJALgEQALgGAaABQANAAAKABQAJABAFADQAGACACADQADAEABAEIAADWQgBAHgDAGQgCAGgGAGQgFAEgHACQgIACgJABIj7AAQgPAAgLgFQgLgGgGgPQgHgQgGgYQgHgXgFgZQgFgZgCgaQgDgaAAgZQAAhMAWg7QAVg8AqgqQApgpA7gWQA8gWBLAAQBMAAA+AXQA+AYArArQAsArAWA9QAXA8AABKQABAqgHAhQgEAigJAZQgIAZgJARQgJAQgHAHQgHAGgNADQgMADgYAAIgZgBg");
	this.shape_62.setTransform(1357.4,729.2);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AkpBBQgGAAgDgEQgEgDgCgIQgDgGgCgNQgBgMAAgTQAAgSABgMQACgMADgIQACgIAEgCQADgEAGAAIJUAAQAEAAAEAEQAEACADAJQACAHACAMQABAMAAASQAAATgBAMQgCANgCAGQgDAIgEADQgEAEgEAAg");
	this.shape_63.setTransform(1357.4,685.35);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AjVC8QglgTgaggQgZgfgMgrQgNgqAAgwQAAggAFgcQAFgdAIgVQAHgWAJgOQAIgOAHgHQAGgGAMgDQAMgCAXAAIAYAAQALABAGADQAGACADAEQADADAAAFQAAAHgIANIgSAfQgKAUgIAbQgHAbAAAkQAAAXAEASQAHASAKANQAKANAPAHQAQAHASAAQAWAAAPgMQAPgMAMgSQAMgTAKgXIAXgxQALgaAPgYQAOgYAVgSQAVgTAcgMQAcgMAoAAQAuAAAiARQAiARAWAdQAYAcALAnQALAnAAAqQAAAXgDAWQgEAXgFATQgHAUgHAPQgHAPgFAFIgIAHIgJADIgPABIgVAAIgYAAIgQgCQgGgCgDgDQgDgEAAgFQAAgFAHgMIAOgdQAJgRAGgXQAHgWAAgbQAAgUgGgPQgFgQgIgKQgKgLgMgFQgNgFgOAAQgVAAgQALQgOAMgNATQgLATgLAYIgXAxQgLAagPAYQgPAZgUATQgVATgcALQgcAMglAAQgzAAglgSg");
	this.shape_64.setTransform(1357.4,648.475);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AkhC6QgJgBgGgDQgGgCgCgEQgDgEAAgEIAAk8QAAgQAKgLQAJgLAVAAIImAAQAWAAAJALQAKALAAAQIAAE6QAAAFgCADQgDADgHADQgGACgJACIgYABIgXgBQgKgCgFgCQgHgDgCgDQgCgDAAgFIAAjgIibAAIAAC9QAAAFgDAEQgDADgGADQgEACgLACIgXAAIgWAAQgJgCgGgCQgFgDgCgDQgDgEAAgFIAAi9IiyAAIAADiQAAAEgEAEQgCAEgFACQgHADgJABIgYABIgYgBg");
	this.shape_65.setTransform(1357.4,602.575);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AiLDwQg9gXgogrQgngqgSg8QgSg+AAhSIAAiXQAAgQAKgLQAJgLAVAAIImAAQAWAAAJALQAKALAAAQIAACiQAABTgUA7QgTA7goAoQgmAog6AWQg4AUhMAAQhVABg/gXgAjVhDQAAA1ANAjQAOAkAbAZQAcAYApAMQApALA2AAQAtAAAngKQAmgKAcgYQAdgXAPgkQARgjAAg8IAAhAImtAAg");
	this.shape_66.setTransform(1357.4,547.05);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AiEEXQg/gTgrgmQgrgngXg5QgWg5AAhJQAAhKATg3QATg3AoglQAnglA9gSQA+gSBTAAQBLAAA+ATQA9AUArAnQArAnAXA4QAXA5AABKQAABIgTA3QgTA3goAlQgnAkg9ATQg7AThTAAQhOAAg9gUgAhaibQgpAHgdATQgeATgPAfQgQAfAAAvQABAvARAgQASAgAeATQAeAUAoAIQApAHAtABQAxgBApgHQApgIAcgSQAegUAPgfQARgggBguQABgvgTgfQgRgggegTQgegUgogIQgngIgsAAQg0AAgpAIg");
	this.shape_67.setTransform(1357.4,457.45);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("ADBENIgRgDQgFgCgDgEQgCgDAAgFQAAgFAIgPQAKgOAKgYQAKgXAJggQAIghAAgrQABgugRgkQgPglgegbQgcgagpgOQgpgOgxAAQg2AAgpAPQgpAOgbAZQgdAagNAlQgPAjAAAsQAAAVAFAWQAFAUAJATICTAAIAAh4QAAgIALgGQALgEAaAAQANAAAKABQAJABAFACQAGADACAEQADADABAEIAADVQgBAJgDAGQgCAFgGAFQgFAFgHACQgIACgJAAIj7AAQgPABgLgFQgLgFgGgQQgHgQgGgXQgHgYgFgZQgFgagCgZQgDgZAAgbQAAhKAWg8QAVg8AqgpQApgqA7gWQA8gWBLAAQBMAAA+AYQA+AXArArQAsArAWA9QAXA9AABJQABApgHAiQgEAhgJAaQgIAZgJAQQgJARgHAHQgHAGgNADQgMADgYAAIgZgBg");
	this.shape_68.setTransform(1357.4,390.5);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AiEEYQg/gUgrgnQgrgmgXg4QgWg6AAhKQAAhJATg3QATg3AogkQAngmA9gRQA+gTBTAAQBLAAA+AUQA9ATArAmQArAoAXA5QAXA4AABKQAABIgTA3QgTA3goAlQgnAlg9ASQg7AThTAAQhOAAg9gTgAhaicQgpAJgdASQgeASgPAgQgQAfAAAwQABAuARAfQASAgAeAUQAeAUAoAHQApAJAtgBQAxABApgJQApgHAcgTQAegTAPgfQARgfgBgvQABgugTghQgRgfgegTQgegUgogIQgngIgsAAQg0AAgpAHg");
	this.shape_69.setTransform(1357.4,326.1);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AkgCsQgJgBgIgCQgFgDgEgDQgDgEAAgFIAAkhQAAgPAKgMQAJgLAWABII9AAQAEAAAEADQAEACADAIQADAHABANQACAMAAATQAAATgCAMQgBAMgDAIQgDAHgEAEQgEACgEAAIn7AAIAADGQAAAFgEAEQgCADgHADQgFACgKABIgZABIgZgBg");
	this.shape_70.setTransform(1357.55,276);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28}]}).to({state:[{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28}]},33).to({state:[{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28}]},1).to({state:[{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28}]},16).to({state:[{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28}]},14).to({state:[{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28}]},1).to({state:[{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28}]},1).to({state:[{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28}]},1).to({state:[{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28}]},12).to({state:[{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28}]},1).to({state:[{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28}]},13).to({state:[{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28}]},1).to({state:[{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28}]},1).to({state:[{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28}]},1).to({state:[{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28}]},1).to({state:[{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28}]},1).to({state:[{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28}]},11).to({state:[{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28}]},1).to({state:[{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28}]},12).to({state:[{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28}]},1).to({state:[{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28}]},1).wait(1));

	// back
	this.btn_backRed = new lib.back();
	this.btn_backRed.name = "btn_backRed";
	this.btn_backRed.setTransform(1239.55,65.7,1.7033,1.7017,0,0,0,77.8,38);
	this.btn_backRed.alpha = 0;
	this.btn_backRed._off = true;
	new cjs.ButtonHelper(this.btn_backRed, 0, 1, 1);

	this.btn_backOrange = new lib.back();
	this.btn_backOrange.name = "btn_backOrange";
	this.btn_backOrange.setTransform(1399.55,65.7,1.7033,1.7017,0,0,0,77.8,38);
	this.btn_backOrange._off = true;
	new cjs.ButtonHelper(this.btn_backOrange, 0, 1, 1);

	this.btn_backYellow = new lib.back();
	this.btn_backYellow.name = "btn_backYellow";
	this.btn_backYellow.setTransform(1559.55,65.7,1.7033,1.7017,0,0,0,77.8,38);
	new cjs.ButtonHelper(this.btn_backYellow, 0, 1, 1);

	this.btn_backTeal = new lib.back();
	this.btn_backTeal.name = "btn_backTeal";
	this.btn_backTeal.setTransform(1719.55,65.7,1.7033,1.7017,0,0,0,77.8,38);
	this.btn_backTeal.alpha = 0;
	this.btn_backTeal._off = true;
	new cjs.ButtonHelper(this.btn_backTeal, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.btn_backRed}]},13).to({state:[{t:this.btn_backRed}]},3).to({state:[]},1).to({state:[{t:this.btn_backRed}]},29).to({state:[{t:this.btn_backOrange}]},3).to({state:[]},1).to({state:[{t:this.btn_backOrange}]},26).to({state:[{t:this.btn_backYellow}]},3).to({state:[]},1).to({state:[{t:this.btn_backTeal}]},26).to({state:[{t:this.btn_backTeal}]},3).to({state:[]},1).wait(15));
	this.timeline.addTween(cjs.Tween.get(this.btn_backRed).wait(13).to({_off:false},0).to({alpha:1},3).to({_off:true},1).wait(29).to({_off:false,x:1399.55},0).to({_off:true},3).wait(76));
	this.timeline.addTween(cjs.Tween.get(this.btn_backOrange).wait(46).to({_off:false},3).to({_off:true},1).wait(26).to({_off:false,x:1559.55,alpha:0},0).to({_off:true,alpha:1},3).wait(46));
	this.timeline.addTween(cjs.Tween.get(this.btn_backTeal).wait(106).to({_off:false},0).to({alpha:1},3).to({_off:true},1).wait(15));

	// images
	this.instance = new lib.patch();
	this.instance.setTransform(658,432,1,1,0,0,0,622,298);

	this.instance_1 = new lib.sub();
	this.instance_1.setTransform(731,312.5,0.7849,0.7849,0,0,0,965,531.5);

	this.instance_2 = new lib.poster();
	this.instance_2.setTransform(879.9,407.6,0.7539,0.7539,0,0,0,384,512);

	this.btn_TV = new lib.btn_tv();
	this.btn_TV.name = "btn_TV";
	this.btn_TV.setTransform(960.05,410.7,0.6382,0.6381,0,0,0,651.5,690.2);
	new cjs.ButtonHelper(this.btn_TV, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},16).to({state:[]},1).to({state:[{t:this.instance_1}]},32).to({state:[]},1).to({state:[{t:this.instance_2}]},29).to({state:[]},1).to({state:[{t:this.btn_TV}]},29).to({state:[]},1).wait(15));

	// text_1
	this.instance_3 = new lib.log_blurb();
	this.instance_3.setTransform(720.35,869.9,1,1,0,0,0,377.6,39.6);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.instance_4 = new lib._3d_blurb();
	this.instance_4.setTransform(720.35,869.9,1,1,0,0,0,377.6,39.6);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.instance_5 = new lib.graphic_blurb();
	this.instance_5.setTransform(879.75,916.25,1,1,0,0,0,377.4,39.8);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.instance_6 = new lib.games_blurb();
	this.instance_6.setTransform(959.55,916.25,1,1,0,0,0,377.4,39.8);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(12).to({_off:false},0).to({regX:377.4,regY:39.8,x:720.15,y:870.1,alpha:1},4).wait(1).to({regX:377.6,regY:39.6,x:720.35,y:869.9},0).to({alpha:0},4).to({_off:true},1).wait(103));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(45).to({_off:false},0).to({regX:377.4,regY:39.8,x:720.15,y:870.1,alpha:1},4).wait(1).to({regX:377.6,regY:39.6,x:720.35,y:869.9},0).to({alpha:0},4).to({_off:true},1).wait(70));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(75).to({_off:false},0).to({alpha:1},4).wait(1).to({alpha:0},4).to({_off:true},1).wait(40));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(105).to({_off:false},0).to({alpha:1},4).wait(1).to({alpha:0},4).to({_off:true},1).wait(10));

	// teal
	this.btn_teal = new lib.btn_teal();
	this.btn_teal.name = "btn_teal";
	this.btn_teal.setTransform(1840,540,1,1,0,0,180,80,540);
	new cjs.ButtonHelper(this.btn_teal, 0, 1, 1);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#84B8AB").s().p("EAMWBUYI41AAIAAg8IAA7+IAA7+IAA79IAA7+IAA7+IAA7+IY1AAIAKAAIAAb+IAAb+IAAb+IAAb9IAAb+IAAb+IAAA8IgKAAg");
	this.shape_71.setTransform(1840,540);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#84B8AB").s().p("EgMVBUYIgKAAIAAg8IAA7+IAA7+IAA79IAA7+IAA7+IAA7+IAKAAIY1AAIAAb+IAAb+IAAb+IAAb9IAAb+IAAb+IAAA8I41AAg");
	this.shape_72.setTransform(1840,540);

	this.instance_7 = new lib.teal_stretch();
	this.instance_7.setTransform(1839.9,540.1,1,1,0,0,180,79.9,540.1);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.btn_teal}]}).to({state:[{t:this.shape_71}]},1).to({state:[{t:this.btn_teal}]},15).to({state:[{t:this.shape_71}]},1).to({state:[{t:this.btn_teal}]},15).to({state:[{t:this.shape_71}]},1).to({state:[{t:this.btn_teal}]},16).to({state:[{t:this.shape_71}]},1).to({state:[{t:this.btn_teal}]},14).to({state:[{t:this.shape_72}]},1).to({state:[{t:this.btn_teal}]},14).to({state:[{t:this.btn_teal}]},1).to({state:[{t:this.btn_teal}]},14).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},4).to({state:[{t:this.instance_7}]},10).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.btn_teal}]},14).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.btn_teal).to({_off:true},1).wait(15).to({_off:false},0).to({_off:true},1).wait(15).to({_off:false},0).to({_off:true},1).wait(16).to({_off:false},0).to({_off:true},1).wait(14).to({_off:false},0).to({_off:true},1).wait(14).to({_off:false},0).wait(15).to({_off:true},1).wait(15).to({_off:false},14).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(95).to({_off:false},0).to({scaleX:4.1429,x:1588.75,y:540.15},4).to({scaleX:12,scaleY:0.9999,x:960.9,y:540.05},10).wait(1).to({_off:true,regX:80,regY:540,scaleX:1,scaleY:1,x:1840,y:540},14).wait(1));

	// yellow
	this.btn_yellow = new lib.btn_yellow();
	this.btn_yellow.name = "btn_yellow";
	this.btn_yellow.setTransform(1680,540,1,1,0,0,180,80,540);
	new cjs.ButtonHelper(this.btn_yellow, 0, 1, 1);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFB24B").s().p("EAMWBUYI41AAIAAg8IAA7+IAA7+IAA79IAA7+IAA7+IAA7+IY1AAIAKAAIAAb+IAAb+IAAb+IAAb9IAAb+IAAb+IAAA8IgKAAg");
	this.shape_73.setTransform(1680,540);

	this.instance_8 = new lib.yellow_stretch();
	this.instance_8.setTransform(1680,540,1,1,0,0,180,80,540);
	this.instance_8._off = true;

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFB24B").s().p("EgMVBUYIgKAAIAAg8IAA7+IAA7+IAA79IAA7+IAA7+IAA7+IAKAAIY1AAIAAb+IAAb+IAAb+IAAb9IAAb+IAAb+IAAA8I41AAg");
	this.shape_74.setTransform(1680,540);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.btn_yellow}]}).to({state:[{t:this.shape_73}]},1).to({state:[{t:this.btn_yellow}]},15).to({state:[{t:this.shape_73}]},1).to({state:[{t:this.btn_yellow}]},15).to({state:[{t:this.shape_73}]},1).to({state:[{t:this.btn_yellow}]},16).to({state:[{t:this.shape_73}]},1).to({state:[{t:this.btn_yellow}]},14).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},14).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.btn_yellow}]},14).to({state:[{t:this.shape_74}]},1).to({state:[{t:this.shape_74}]},15).to({state:[{t:this.btn_yellow}]},14).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.btn_yellow).to({_off:true},1).wait(15).to({_off:false},0).to({_off:true},1).wait(15).to({_off:false},0).to({_off:true},1).wait(16).to({_off:false},0).to({_off:true},1).wait(14).to({_off:false},0).to({_off:true},1).wait(15).to({_off:false},14).to({_off:true},1).wait(29).to({_off:false},0).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(65).to({_off:false},0).to({scaleX:10.9998,x:879.9},14).wait(1).to({_off:true,scaleX:1,x:1680},14).wait(31));

	// orange
	this.btn_orange = new lib.button();
	this.btn_orange.name = "btn_orange";
	this.btn_orange.setTransform(1520,540,1,1,0,0,180,80,540);
	new cjs.ButtonHelper(this.btn_orange, 0, 1, 1);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FF6A5B").s().p("EAMWBUYI41AAIAAg8IAA7+IAA7+IAA79IAA7+IAA7+IAA7+IY1AAIAKAAIAAb+IAAb+IAAb+IAAb9IAAb+IAAb+IAAA8IgKAAg");
	this.shape_75.setTransform(1520,540);

	this.instance_9 = new lib.orange_stretch();
	this.instance_9.setTransform(1520,540,1,1,0,0,180,80,540);
	this.instance_9._off = true;

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FF6A5B").s().p("EgMWBUYIgJAAIAAg8IAA7+IAA7+IAA79IAA7+IAA7+IAA7+IAJAAIY2AAIAAb+IAAb+IAAb+IAAb9IAAb+IAAb+IAAA8I42AAg");
	this.shape_76.setTransform(1520,540);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.btn_orange}]}).to({state:[{t:this.shape_75}]},1).to({state:[{t:this.btn_orange}]},15).to({state:[{t:this.shape_75}]},1).to({state:[{t:this.btn_orange}]},15).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},16).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.btn_orange}]},14).to({state:[{t:this.shape_76}]},1).to({state:[{t:this.btn_orange}]},29).to({state:[{t:this.shape_76}]},1).to({state:[{t:this.shape_76}]},15).to({state:[{t:this.btn_orange}]},14).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.btn_orange).to({_off:true},1).wait(15).to({_off:false},0).to({_off:true},1).wait(15).to({_off:false},0).to({_off:true},1).wait(17).to({_off:false},14).to({_off:true},1).wait(29).to({_off:false},0).to({_off:true},1).wait(29).to({_off:false},0).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(33).to({_off:false},0).to({scaleX:10,x:800.15},16).wait(1).to({_off:true,scaleX:1,x:1520},14).wait(61));

	// red
	this.btn_red = new lib.btn_red();
	this.btn_red.name = "btn_red";
	this.btn_red.setTransform(1360,540,1,1,0,0,180,80,540);
	new cjs.ButtonHelper(this.btn_red, 0, 1, 1);

	this.instance_10 = new lib.red_stretch();
	this.instance_10.setTransform(1360.3,540,1,1,0,0,180,80,540);
	this.instance_10._off = true;

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#B93564").s().p("EgMVBUYIgKAAIAAg8IAA7+IAA7+IAA79IAA7+IAA7+IAA7+IAKAAIY1AAIAAb+IAAb+IAAb+IAAb9IAAb+IAAb+IAAA8I41AAg");
	this.shape_77.setTransform(1360,540);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.btn_red}]}).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},15).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.btn_red}]},15).to({state:[{t:this.shape_77}]},1).to({state:[{t:this.btn_red}]},31).to({state:[{t:this.shape_77}]},1).to({state:[{t:this.btn_red}]},29).to({state:[{t:this.shape_77}]},1).to({state:[{t:this.shape_77}]},15).to({state:[{t:this.btn_red}]},14).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.btn_red).to({_off:true},1).wait(16).to({_off:false},15).to({_off:true},1).wait(31).to({_off:false},0).to({_off:true},1).wait(29).to({_off:false},0).to({_off:true},1).wait(29).to({_off:false},0).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1).to({_off:false},0).to({scaleX:9,x:720.3},15).wait(1).to({x:720.6},0).to({_off:true,scaleX:1,x:1360},15).wait(93));

	// email
	this.mailLink_1 = new lib.mail1();
	this.mailLink_1.name = "mailLink_1";
	this.mailLink_1.setTransform(239.45,873.15,1,1,0,0,0,188.3,12.8);
	new cjs.ButtonHelper(this.mailLink_1, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.mailLink_1).to({_off:true},1).wait(31).to({_off:false},0).to({_off:true},1).wait(31).to({_off:false},0).to({_off:true},1).wait(29).to({_off:false},0).to({_off:true},1).wait(29).to({_off:false},0).wait(1));

	// logo
	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#CCD4FF").s().p("AgQASQgFgFAAgMQAAgNAFgFQAFgFALAAQAMAAAFAFQAFAFAAAMQAAANgFAFQgFAFgMAAQgMAAgEgFg");
	this.shape_78.setTransform(591.825,686.075);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#CCD4FF").s().p("AgPBnIgFgBIgDgDIgBgCIAAhpIgRAAQgCABgBgEQgCgEAAgHIABgIIABgFIABgCIADgBIAQAAIAAgKQAAgOADgKQACgKAGgHQAFgHAIgDQAJgDAMAAIALABIAIACIAEACIABADIABAEIABAHIgBAIIgBADIAAACIgCAAIgDAAIgDgBIgEgBIgGgBQgEABgDABQgCABgCADQgDACAAAFIgBALIAAALIAYAAIACABIACACIABAFIABAIQAAAHgCAEQgBAEgDgBIgYAAIAABpIgBACIgDADIgGABIgIAAIgJAAg");
	this.shape_79.setTransform(584.95,677.95);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#CCD4FF").s().p("AgfBFQgNgFgIgJQgJgKgEgNQgEgNAAgSQAAgPAFgOQAEgOAJgKQAJgKAOgFQANgGARAAQARAAANAFQANAFAJAJQAIAJAEAOQAEANAAASQAAAPgFAOQgEAOgIAKQgJAKgOAFQgNAGgRAAQgSAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQAEAGAFADQAHADAIAAQAIAAAGgDQAGgDAFgGQAEgFABgIQACgJAAgKQAAgJgCgIQgBgIgDgGQgFgGgFgDQgGgEgJAAQgIAAgGADg");
	this.shape_80.setTransform(571.8,681.125);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#CCD4FF").s().p("AgjBhQgLgFgGgKQgHgKgDgNQgDgNAAgPQAAgRAEgOQAEgNAHgJQAHgKALgGQAKgFAOAAQAKAAAJAEQAJAFAJAJIAAhHIABgDIADgCIAFgBIAJgBIAJABIAGABIADACIABADIAAC/IgBADIgDACIgEABIgIAAIgHAAIgFgBIgDgCIgBgDIAAgPQgKAMgLAFQgLAHgMAAQgPAAgKgHgAgNgIQgFADgDAGQgDAFgCAIQgBAHAAAIIABAQQABAIADAGQADAGAFADQAFAEAIAAIAGgBIAIgEIAHgGIAJgKIAAgsQgIgIgHgFQgHgGgHAAQgHAAgGAEg");
	this.shape_81.setTransform(548.525,678.15);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#CCD4FF").s().p("AgkBEQgJgEgGgIQgFgIgDgKQgCgJgBgQIAAhOIABgDIADgCIAGgBIAJAAIAJAAIAGABIACACIABADIAABIQABALABAFQABAFADAEQACAEAFACQAEACAGAAQAGABAGgGQAIgFAIgKIAAhVIABgDIACgCIAGgBIAJAAIAJAAIAFABIAEACIABADIAACBIgBACIgDADIgEABIgJAAIgHAAIgFgBIgDgDIAAgCIAAgPQgLAMgLAFQgKAHgNAAQgNgBgJgEg");
	this.shape_82.setTransform(532.75,681.25);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#CCD4FF").s().p("AgfBFQgNgFgJgJQgHgKgFgNQgEgNAAgSQAAgPAFgOQAEgOAJgKQAJgKAOgFQANgGAQAAQATAAAMAFQANAFAJAJQAIAJAEAOQAEANAAASQAAAPgFAOQgDAOgJAKQgKAKgNAFQgOAGgQAAQgSAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJACAJQABAIAEAGQAEAGAFADQAHADAIAAQAIAAAHgDQAFgDAFgGQAEgFABgIQACgJAAgKQAAgJgCgIQgBgIgDgGQgEgGgGgDQgHgEgJAAQgHAAgGADg");
	this.shape_83.setTransform(516.65,681.125);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#CCD4FF").s().p("AgfBIIgGgBIgDgCIgBgCIAAiCIABgCIACgCIAGgCIAHAAIAHAAIAGACIABACIABACIAAAQIAKgMIAIgHQAEgEAEgBIAIgBIAFABIAEAAIAEABIADACIABACIAAACIAAAEIABAJIgBAIIAAAGIgBACIgDABIgDAAIgDgCIgEgBIgFAAIgGABQgEACgDACIgGAHIgHALIAABRIgBACIgDACIgFABIgJAAIgJAAg");
	this.shape_84.setTransform(504.35,681);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#CCD4FF").s().p("Ag3BiIgGgBIgDgCIgBgDIAAi1IABgCIADgCIAEgCIAIAAIAHAAIAFACIADACIAAACIAAAPIAMgKIALgHIALgFQAGgBAHgBQAOABAKAFQAKAGAHAJQAGAKADANQADAOAAAOQAAARgEAOQgEANgHAKQgHAKgLAGQgKAFgOAAIgKgBIgJgEIgJgFIgJgIIAAA9IgBADIgDACIgFABIgJABIgJgBgAgEhBQgEABgEACIgIAHIgIAKIAAArQAIAJAHAFQAHAFAHAAQAHAAAFgDQAFgEADgFQADgGACgHIABgPIgBgQQgBgIgDgGQgDgGgFgEQgFgDgHAAIgGABg");
	this.shape_85.setTransform(490.625,683.6);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#CCD4FF").s().p("AgYBFQgNgEgJgJQgJgJgEgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJAMgGQANgFAPAAQAQAAAMAFQALAFAIAJQAHAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJADAHQACAGADAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAFgBIACAAIACACIABAEIAAAGIAAAGIAAADIgBADIgCACIgFADIgLAEIgPACQgIACgKAAQgQAAgOgFgAgKgsQgFADgDAEQgEAFgBAGQgDAGAAAHIA2AAQABgQgGgJQgIgJgOAAQgGAAgFADg");
	this.shape_86.setTransform(467.8,681.125);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#CCD4FF").s().p("AgCBmQgGgBgFgDQgFgCgFgFQgFgEgFgGIAAAOIgBADIgDACIgFABIgHAAIgIAAIgEgBIgDgCIgBgDIAAi/IABgDQAAAAABAAQAAgBAAAAQABAAAAAAQABgBAAAAIAGgBIAJgBIAJABIAFABIADACIABADIAABIIAKgJIAKgFIAJgEIALgBQAPAAAKAGQAKAGAHAKQAGAJADANQADANAAAOQAAASgEAOQgEANgHAKQgHAKgLAFQgKAGgNAAQgHAAgFgCgAgFgKIgHADIgIAHIgIAJIAAArQAIAKAHAFQAHAFAHAAQAHAAAFgDQAFgEADgGQAEgGABgHIACgPQAAgJgCgHQgBgIgDgGQgDgFgFgEQgFgDgHAAIgHABg");
	this.shape_87.setTransform(452.625,678.125);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#CCD4FF").s().p("AgIBmIgGgBIgDgCIAAgCIAAjAIAAgCQABgBAAAAQAAAAAAgBQABAAAAAAQABAAAAAAIAGgCIAIgBIAJABIAGACIADACIABACIAADAIgBACIgDACIgGABIgJAAIgIAAg");
	this.shape_88.setTransform(433.75,678);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#CCD4FF").s().p("AgIBmIgFgBIgEgCIgBgCIAAjAIABgCQABgBAAAAQAAAAAAgBQABAAAAAAQABAAABAAIAFgCIAIgBIAJABIAGACIACACIABACIAADAIgBACIgCACIgGABIgJAAIgIAAg");
	this.shape_89.setTransform(426.4,678);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#CCD4FF").s().p("AgIBkIgFgBIgDgDIgBgCIAAiBIABgDIADgCIAFgBIAIAAIAJAAIAGABIADACIABADIAACBIgBACIgDADIgGABIgJAAIgIAAgAgQhBQgEgDAAgLQAAgMAEgDQAFgFALAAQANAAAEAFQAEADAAALQAAAMgEADQgFAFgMAAQgLAAgFgFg");
	this.shape_90.setTransform(419.025,678.25);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#CCD4FF").s().p("AAiBHIgHgBIgEgDIgCgEIgVhOIAAgBIAAABIgUBOIgCAEIgEADIgHABIgMAAIgLAAIgHgBIgEgDIgCgEIgjh1IgBgHIgBgEIABgCIADgCIAGgBIAJAAIAJAAIAGABQABAAAAABQABAAAAAAQAAAAAAABQABAAAAAAIABADIAaBfIAAACIABgCIAYhfIABgDIADgCIAGgBIAHAAIAJAAIAGABIACACIACACIAaBgIAAACIAAgCIAZhfIACgDQAAAAAAAAQAAgBABAAQAAAAAAAAQABgBAAAAIAGgBIAJAAIAJAAIAFABIADACIABACIgBAEIgBAHIgjB1IgCAEIgEADIgHABIgLAAIgMAAg");
	this.shape_91.setTransform(404.175,681.125);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#CCD4FF").s().p("AgkBEQgJgEgFgIQgGgIgDgKQgCgJAAgQIAAhOIABgDIACgCIAGgBIAJAAIAJAAIAFABIAEACIABADIAABIQgBALACAFQABAFADAEQACAEAFACQAEACAFAAQAGABAIgGQAGgFAJgKIAAhVIABgDIADgCIAFgBIAJAAIAJAAIAFABIADACIACADIAACBIgCACIgCADIgEABIgIAAIgIAAIgFgBIgDgDIAAgCIAAgPQgLAMgLAFQgLAHgMAAQgNgBgJgEg");
	this.shape_92.setTransform(378.1,681.25);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#CCD4FF").s().p("AgfBFQgNgFgIgJQgJgKgEgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKANgFQAOgGARAAQARAAANAFQANAFAJAJQAIAJAEAOQAEANAAASQAAAPgFAOQgEAOgIAKQgJAKgOAFQgNAGgRAAQgSAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQAEAGAFADQAHADAIAAQAIAAAGgDQAHgDADgGQAEgFACgIQACgJAAgKQAAgJgCgIQgBgIgDgGQgFgGgGgDQgGgEgIAAQgIAAgGADg");
	this.shape_93.setTransform(362,681.125);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#CCD4FF").s().p("AgZBhIgGgCQAAAAAAAAQgBgBAAAAQAAAAAAgBQgBAAAAgBIABgEIASgsIgDgCIgDgEIgth3IgCgIQAAgBAAgBQAAAAABgBQAAAAAAgBQABAAAAAAQABgCAFgBIALAAIAKAAIAFABQABAAAAABQABAAAAAAQABAAAAABQAAAAAAABIADAFIAdBXIABAAIAchZQABgEABgBQABAAAAAAQABgBAAAAQABAAABAAQAAgBABAAIALAAIALAAQAEABACACQABAAAAABQAAAAABAAQAAABAAABQAAAAAAABIgCAGIgrB/IgPAvQgCADgGACQgEABgMAAIgJAAg");
	this.shape_94.setTransform(347.15,683.725);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#CCD4FF").s().p("AAjBIIgFgBIgEgCIgBgCIAAhKQABgKgCgFQgCgGgCgDQgDgEgDgCQgFgCgFAAQgHAAgHAEQgHAGgHAKIAABWIgCACIgDACIgFABIgJAAIgJAAIgFgBIgDgCIgCgCIAAiCIABgCIADgCIAFgCIAHAAIAIAAIAFACIACACIABACIAAAPQALgMALgFQAKgHAMAAQANABAKAEQAJAEAFAIQAGAHADALQACAKAAAOIAABQIgBACIgCACIgGABIgJAAIgJAAg");
	this.shape_95.setTransform(325.25,681);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#CCD4FF").s().p("AgfBgQgMgDgHgFQgIgEgEgHQgDgGAAgIQAAgFABgEQABgEADgEIAGgIIAIgHQgHgEgDgGQgEgFABgHQAAgJADgGQAEgHAHgGQgFgFgEgHQgDgHAAgLQAAgMAEgIQAFgJAHgHQAHgGAKgDQAKgEAMABIALABIAKABIApAAQADAAACADIABAMQAAAGgBAEQgCADgDAAIgPAAQAEAEABAFQACAEgBAEQAAAMgDAJQgFAIgHAHQgHAGgJADQgLADgLAAIgMgCIgIgDIgEAEQgBADgBADQAAADAFAEQADACAHAAIAeABQAMABAJACQAIAEAGAEQAGAFADAHQADAHABAIQAAAKgFAJQgEAJgIAGQgJAGgNAEQgMAEgRAAQgRAAgLgDgAgXAtIgEAEIgCAFIgBAEQABAIAHADQAIAFANAAQAHAAAGgCQAGgCADgDQADgDACgDQABgDAAgEQAAgHgEgEQgGgDgJgBIgaAAIgFAGgAgMhGQgEABgDAEQgDADgBAEIgBAJQAAAKAFAGQAHAGAKgBQAFAAADgCQAEgBAEgDIADgHIACgJQAAgKgGgGQgGgGgJAAQgGAAgEACg");
	this.shape_96.setTransform(309.95,683.65);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#CCD4FF").s().p("AgIBkIgFgBIgDgDIgBgCIAAiBIABgDIADgCIAFgBIAIAAIAJAAIAGABIADACIABADIAACBIgBACIgDADIgGABIgJAAIgIAAgAgQhBQgEgDAAgLQAAgMAEgDQAFgFALAAQANAAAEAFQAEADAAALQAAAMgEADQgFAFgMAAQgLAAgFgFg");
	this.shape_97.setTransform(299.275,678.25);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#CCD4FF").s().p("AgUBJIgLgDIgJgEIgGgDIgCgFIgBgKIABgGIABgEQAAgBAAAAQAAAAAAgBQAAAAABAAQAAAAAAAAIACgBIAFACIAIAEIAKAEQAHACAIAAIAIgBIAGgDIAFgFQABgDAAgEQAAgEgCgDIgIgGIgJgEIgMgFIgLgFIgKgHQgFgFgDgHQgCgGAAgJQAAgKADgIQAFgHAGgGQAHgGAKgDQAKgDALAAIAMABIAKACIAIADIAFADIACACIABADIAAAEIAAAFIAAAHIAAAEIgBACIgDAAIgEgBIgHgEIgKgDQgFgCgHAAIgHABQgFABgCACIgDAFQgCACABADQAAAFACADQADADAFACIAJAFIAMAEIAMAGQAFADAFAEQAFAEACAHQADAGAAAJQAAALgEAJQgEAIgIAGQgIAGgKADQgKADgLAAIgPgBg");
	this.shape_98.setTransform(289.7,681.125);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#CCD4FF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgJANgGQAMgFAOAAQARAAALAFQAMAFAHAJQAIAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJACAHQABAGAFAFQAEAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAHgBIACAAIABACIABAEIAAAGIAAAGIgBADIgBADIgBACIgFADIgLAEIgPACQgJACgKAAQgQAAgNgFgAgJgsQgGADgDAEQgEAFgBAGQgCAGAAAHIA2AAQAAgQgHgJQgGgJgOAAQgHAAgEADg");
	this.shape_99.setTransform(276.05,681.125);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#CCD4FF").s().p("AgjBhQgLgFgGgKQgHgKgDgNQgDgNAAgPQAAgRAEgOQAEgNAHgJQAHgKALgGQAKgFAOAAQAKAAAJAEQAJAFAJAJIAAhHIABgDIADgCIAFgBIAJgBIAJABIAGABIADACIABADIAAC/IgBADIgDACIgEABIgIAAIgHAAIgFgBIgDgCIgBgDIAAgPQgKAMgLAFQgLAHgMAAQgPAAgKgHgAgNgIQgFADgDAGQgDAFgCAIQgBAHAAAIQAAAIABAIQABAIADAGQADAGAFADQAFAEAIAAIAGgBIAIgEIAHgGIAJgKIAAgsQgIgIgHgFQgHgGgHAAQgHAAgGAEg");
	this.shape_100.setTransform(260.125,678.15);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#CCD4FF").s().p("AgeBHQgJgDgGgFQgHgFgDgIQgEgIAAgLQAAgLAFgJQAEgIAJgFQAJgFANgDQANgCARAAIAMAAIAAgIIgBgLQgBgFgDgDQgDgDgFgBQgEgCgGAAQgKAAgHACIgNAFIgJAEIgGACIgDgBIgCgDIgBgEIgBgGIABgIQABgCACgCIAHgFQAFgDAHgCIAPgDQAIgCAIAAQAPAAALADQALADAHAHQAHAGADAKQAEAJAAAOIAABXQAAAAAAABQAAAAgBAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAABgBAAQAAAAgBAAQAAABgBAAIgKAAIgJAAQgBAAgBgBQAAAAgBAAQAAAAgBgBQAAAAgBAAIgBgDIAAgLQgIAJgKAFQgLAFgLAAQgLAAgIgDgAgFALQgGABgEADQgEADgCADQgCAEAAAFQAAAIAFAFQAGAFAJAAQAHAAAGgEQAHgEAGgIIAAgWIgOAAQgJAAgFABg");
	this.shape_101.setTransform(237.875,681.125);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#CCD4FF").s().p("AgYBFQgNgEgJgJQgIgJgFgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJANgGQAMgFAPAAQAQAAAMAFQALAFAHAJQAIAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJACAHQABAGAEAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAFgBIADAAIABACIABAEIAAAGIAAAGIAAADIgBADIgCACIgFADIgLAEIgPACQgIACgLAAQgPAAgOgFgAgKgsQgFADgDAEQgDAFgCAGQgCAGAAAHIA2AAQAAgQgHgJQgHgJgNAAQgGAAgGADg");
	this.shape_102.setTransform(216.45,681.125);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#CCD4FF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgJANgGQAMgFAOAAQARAAALAFQAMAFAHAJQAIAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJABAHQACAGAFAFQAEAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAHgBIACAAIABACIABAEIAAAGIAAAGIgBADIAAADIgCACIgFADIgLAEIgPACQgJACgKAAQgQAAgNgFgAgJgsQgGADgDAEQgDAFgDAGQgBAGAAAHIA2AAQAAgQgHgJQgGgJgOAAQgHAAgEADg");
	this.shape_103.setTransform(201.35,681.125);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#CCD4FF").s().p("AAABWQgIgCgGgGQgFgGgDgIQgCgKAAgMIAAhBIgQAAQgCAAgCgEQgBgDAAgIIAAgIIABgEIACgCIACgBIAQAAIAAgeIABgCIADgCIAGgBIAIAAIAIAAIAGABIADACIABACIAAAeIAcAAIADABIACACIABAEIAAAIQAAAIgBADQgCAEgDAAIgcAAIAAA8QAAALADAFQAEAFAIAAIAFAAIAFgBIADgBIACgBIACABIABACIABAEIAAAGIgBAKIgCAGIgEACIgGACIgHABIgIAAQgLAAgHgDg");
	this.shape_104.setTransform(188.775,679.5);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#CCD4FF").s().p("AAjBIIgGgBIgDgCIgBgCIAAhKQAAgKgBgFQgCgGgCgDQgCgEgEgCQgFgCgFAAQgGAAgHAEQgIAGgIAKIAABWIgBACIgCACIgGABIgJAAIgJAAIgFgBIgEgCIgBgCIAAiCIABgCIADgCIAFgCIAHAAIAIAAIAFACIACACIABACIAAAPQALgMALgFQAKgHANAAQANABAJAEQAJAEAGAIQAFAHADALQADAKgBAOIAABQIAAACIgDACIgGABIgJAAIgJAAg");
	this.shape_105.setTransform(176.1,681);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#CCD4FF").s().p("AgeBHQgJgDgGgFQgHgFgDgIQgEgIAAgLQAAgLAFgJQAEgIAJgFQAJgFANgDQANgCARAAIAMAAIAAgIIgBgLQgBgFgDgDQgDgDgFgBQgEgCgGAAQgKAAgHACIgNAFIgJAEIgGACIgDgBIgCgDIgBgEIgBgGIABgIQABgCACgCIAHgFQAFgDAHgCIAPgDQAIgCAIAAQAPAAALADQALADAHAHQAHAGADAKQAEAJAAAOIAABXQAAAAAAABQAAAAgBAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAABgBAAQAAAAgBAAQgBABAAAAIgKAAIgJAAQgBAAgBgBQAAAAgBAAQAAAAgBgBQAAAAgBAAIgBgDIAAgLQgIAJgKAFQgLAFgLAAQgLAAgIgDgAgFALQgGABgEADQgEADgCADQgCAEAAAFQAAAIAFAFQAGAFAJAAQAHAAAGgEQAHgEAGgIIAAgWIgOAAQgJAAgFABg");
	this.shape_106.setTransform(160.225,681.125);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#CCD4FF").s().p("AggBIIgFgBIgDgCIgBgCIAAiCIAAgCIAEgCIAEgCIAIAAIAIAAIAEACIADACIABACIAAAQIAJgMIAIgHQAEgEAEgBIAIgBIAEABIAFAAIAEABIACACIABACIABACIAAAEIABAJIgBAIIgBAGIgBACIgCABIgDAAIgDgCIgEgBIgFAAIgGABQgDACgDACIgIAHIgGALIAABRIgBACIgDACIgGABIgJAAIgJAAg");
	this.shape_107.setTransform(149.25,681);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#CCD4FF").s().p("AgeBHQgJgDgGgFQgHgFgDgIQgEgIAAgLQAAgLAFgJQAEgIAJgFQAJgFANgDQANgCARAAIAMAAIAAgIIgBgLQgBgFgDgDQgDgDgFgBQgEgCgGAAQgKAAgHACIgNAFIgJAEIgGACIgDgBIgCgDIgBgEIgBgGIABgIQABgCACgCIAHgFQAFgDAHgCIAPgDQAIgCAIAAQAPAAALADQALADAHAHQAHAGADAKQAEAJAAAOIAABXQAAAAAAABQAAAAgBAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAABgBAAQAAAAgBAAQgBABAAAAIgKAAIgJAAQgBAAgBgBQAAAAgBAAQAAAAgBgBQAAAAgBAAIgBgDIAAgLQgIAJgKAFQgLAFgLAAQgLAAgIgDgAgFALQgGABgEADQgEADgCADQgCAEAAAFQAAAIAFAFQAGAFAJAAQAHAAAGgEQAHgEAGgIIAAgWIgOAAQgJAAgFABg");
	this.shape_108.setTransform(135.425,681.125);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#CCD4FF").s().p("AgkBEQgJgEgGgIQgGgIgCgKQgCgJgBgQIAAhOIABgDIAEgCIAFgBIAJAAIAJAAIAGABIACACIABADIAABIQAAALACAFQABAFADAEQADAEAEACQAEACAGAAQAFABAHgGQAIgFAIgKIAAhVIAAgDIADgCIAGgBIAJAAIAJAAIAGABIACACIABADIAACBIgBACIgCADIgFABIgIAAIgHAAIgFgBIgCgDIgBgCIAAgPQgLAMgLAFQgLAHgLAAQgOgBgJgEg");
	this.shape_109.setTransform(120.3,681.25);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#CCD4FF").s().p("AgfBgQgMgDgHgFQgIgEgEgHQgDgGAAgIQAAgFABgEQACgEACgEIAGgIIAIgHQgGgEgEgGQgDgFAAgHQAAgJADgGQAEgHAHgGQgFgFgEgHQgCgHAAgLQAAgMADgIQAFgJAHgHQAHgGAKgDQAKgEAMABIALABIAKABIAqAAQACAAACADIABAMQAAAGgCAEQgBADgCAAIgQAAQAEAEABAFQABAEABAEQAAAMgEAJQgFAIgHAHQgGAGgLADQgJADgMAAIgMgCIgIgDIgEAEQgBADgBADQAAADAFAEQADACAHAAIAeABQAMABAIACQAKAEAFAEQAGAFADAHQADAHAAAIQABAKgFAJQgEAJgIAGQgJAGgNAEQgMAEgRAAQgRAAgLgDgAgXAtIgEAEIgCAFIAAAEQAAAIAHADQAIAFANAAQAHAAAGgCQAGgCADgDQADgDACgDQABgDAAgEQAAgHgEgEQgGgDgJgBIgaAAIgFAGgAgMhGQgEABgDAEQgDADgBAEIgBAJQAAAKAFAGQAHAGAKgBQAFAAAEgCQAEgBADgDIADgHIACgJQAAgKgGgGQgGgGgJAAQgGAAgEACg");
	this.shape_110.setTransform(105.1,683.65);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#CCD4FF").s().p("AgYBFQgNgEgJgJQgIgJgFgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJANgGQAMgFAPAAQAQAAAMAFQALAFAIAJQAHAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJACAHQABAGAEAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAFgBIADAAIABACIABAEIAAAGIAAAGIAAADIgBADIgCACIgFADIgLAEIgPACQgIACgLAAQgPAAgOgFgAgKgsQgFADgDAEQgDAFgCAGQgCAGAAAHIA2AAQAAgQgHgJQgHgJgNAAQgGAAgGADg");
	this.shape_111.setTransform(83.7,681.125);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#CCD4FF").s().p("AAsBfIgIgBQgEgBgBgCIgCgGIgdh3IAAAAIgdB3IgCAGIgEADIgIABIgNABIgNgBIgJgBQgCgBgCgCIgCgGIgrikIgCgJQAAgBABAAQAAgBAAAAQAAgBAAAAQABgBAAAAQACgCAEAAIAMgBIALABIAGABQABAAAAAAQAAAAABAAQAAABAAAAQAAAAABABIABAEIAhCQIAiiPIADgEQAAgBAAAAQAAgBABAAQAAAAAAAAQABgBABAAIAGgBIAJgBIALABIAHABIADADIACAEIAjCPIABAAIAhiPIABgEQAAgBABAAQAAgBAAAAQABAAAAAAQABgBAAAAIAGgBIAKgBIAKABIAGACQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIgBAJIgsCkIgCAGIgFADIgIABIgMABIgNgBg");
	this.shape_112.setTransform(63.65,678.675);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#CCD4FF").s().p("AgQASQgFgFAAgMQAAgNAFgFQAFgFALAAQAMAAAFAFQAFAFAAAMQAAANgFAFQgFAFgMAAQgMAAgEgFg");
	this.shape_113.setTransform(1230.175,645.475);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#CCD4FF").s().p("AAjBIIgFgBIgEgCIgBgDIAAhJQAAgKgBgFQgCgFgCgEQgDgEgEgCQgEgCgFAAQgHAAgHAEQgHAGgHAKIAABVIgBADIgEACIgFABIgJAAIgJAAIgGgBIgCgCIgBgDIAAiBIAAgCIADgDIAFgBIAHAAIAIAAIAFABIACADIABACIAAAPQALgMALgFQAKgHAMAAQANABAKAEQAJAEAFAIQAGAIADAKQACAKAAAOIAABPIgBADIgDACIgFABIgJAAIgJAAg");
	this.shape_114.setTransform(1218.15,640.4);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#CCD4FF").s().p("AgfBFQgNgFgJgJQgHgKgFgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKANgFQANgGASAAQASAAAMAFQANAFAIAJQAJAJAEAOQAEANAAASQAAAPgEAOQgFAOgJAKQgIAKgOAFQgNAGgSAAQgRAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQADAGAHADQAFADAJAAQAIAAAGgDQAHgDADgGQAEgFACgIQACgJAAgKQAAgJgBgIQgCgIgEgGQgDgGgHgDQgGgEgIAAQgIAAgGADg");
	this.shape_115.setTransform(1201.95,640.525);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#CCD4FF").s().p("AgIBkIgFgCIgDgCIgBgCIAAiCIABgCIADgCIAFgBIAIAAIAJAAIAGABIADACIABACIAACCIgBACIgDACIgGACIgJAAIgIAAgAgQhBQgEgDAAgLQAAgMAEgDQAFgFALAAQANAAAEAFQAEADAAALQAAAMgEADQgFAEgMABQgLgBgFgEg");
	this.shape_116.setTransform(1190.225,637.65);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#CCD4FF").s().p("AgUBJIgMgDIgJgEIgEgDIgDgFIgBgKIAAgGIABgEQABgBAAAAQAAAAAAgBQAAAAABAAQAAAAAAAAIACgBIAFACIAHAEIALAEQAHACAIAAIAHgBIAIgDIADgFQACgDAAgEQAAgEgDgDIgHgGIgJgEIgLgFIgMgFIgKgHQgEgFgDgHQgDgGAAgJQAAgKAEgIQADgHAHgGQAHgGAKgDQAKgDALAAIAMABIALACIAIADIAEADIACACIABADIABAEIAAAFIAAAHIgCAEIgBACIgCAAIgEgBIgHgEIgJgDQgGgCgHAAIgIABQgEABgBACIgEAFQgCACAAADQAAAFAEADQACADAFACIAJAFIAMAEIALAGQAGADAFAEQAEAEADAHQADAGAAAJQAAALgEAJQgEAIgIAGQgHAGgLADQgLADgLAAIgOgBg");
	this.shape_117.setTransform(1180.65,640.525);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#CCD4FF").s().p("AgIBkIgFgCIgDgCIgBgCIAAiCIABgCIADgCIAFgBIAIAAIAJAAIAGABIADACIABACIAACCIgBACIgDACIgGACIgJAAIgIAAgAgQhBQgEgDAAgLQAAgMAEgDQAFgFALAAQANAAAEAFQAEADAAALQAAAMgEADQgFAEgMABQgLgBgFgEg");
	this.shape_118.setTransform(1170.925,637.65);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#CCD4FF").s().p("AgLBHIgIgBIgEgDIgCgEIgnh1IgCgFIAAgEIgBgCIABgCIADgCIAGgBIAJAAIAJAAIAGABIADACIACADIAcBfIABAEIABgEIAdhfIACgDIADgCIAFgBIAJAAIAJAAIAGABIACACIABACIAAACIAAADIgBACIgBAEIgnB1IgCAEIgEADIgIABIgNAAIgLAAg");
	this.shape_119.setTransform(1160.125,640.525);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#CCD4FF").s().p("AAjBIIgFgBIgDgCIgBgDIAAhJQAAgKgCgFQgBgFgDgEQgDgEgEgCQgEgCgGAAQgFAAgHAEQgIAGgHAKIAABVIgBADIgEACIgFABIgJAAIgJAAIgGgBIgCgCIgBgDIAAiBIAAgCIADgDIAFgBIAIAAIAHAAIAFABIACADIABACIAAAPQALgMALgFQAKgHAMAAQAOABAJAEQAJAEAFAIQAHAIACAKQADAKAAAOIAABPIgCADIgDACIgFABIgJAAIgJAAg");
	this.shape_120.setTransform(1145.45,640.4);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#CCD4FF").s().p("AgYBFQgNgEgJgJQgJgJgEgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJAMgGQANgFAPAAQAQAAAMAFQALAFAIAJQAHAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJADAHQACAGADAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAFgBIACAAIACACIABAEIAAAGIAAAGIAAADIgBADIgCACIgFADIgLAEIgPACQgIACgKAAQgQAAgOgFgAgKgsQgFADgDAEQgEAFgBAGQgDAGAAAHIA2AAQABgQgGgJQgIgJgOAAQgGAAgFADg");
	this.shape_121.setTransform(1129.75,640.525);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#CCD4FF").s().p("AgkBEQgJgEgFgIQgHgHgCgLQgDgKAAgPIAAhPIABgCIAEgCIAFgBIAJAAIAJAAIAFABIADACIACACIAABJQAAAKABAGQABAGADADQADAEAEACQAEACAGAAQAFABAIgGQAGgFAJgKIAAhWIAAgCIAEgCIAFgBIAJAAIAJAAIAGABIACACIABACIAACCIgBACIgCACIgFACIgHAAIgIAAIgFgCIgCgCIgBgCIAAgPQgLAMgLAFQgKAHgMAAQgOgBgJgEg");
	this.shape_122.setTransform(1107.35,640.65);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#CCD4FF").s().p("AgfBFQgNgFgIgJQgJgKgEgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKANgFQANgGASAAQASAAAMAFQANAFAIAJQAJAJAEAOQAEANAAASQAAAPgEAOQgFAOgJAKQgIAKgOAFQgNAGgSAAQgRAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQADAGAHADQAFADAJAAQAIAAAGgDQAGgDAEgGQAEgFACgIQACgJAAgKQAAgJgBgIQgCgIgEgGQgDgGgHgDQgGgEgIAAQgIAAgGADg");
	this.shape_123.setTransform(1091.25,640.525);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#CCD4FF").s().p("AgZBhIgGgCQAAAAAAAAQgBgBAAAAQAAAAAAgBQAAAAAAgBIABgEIARgsIgEgCIgCgEIgth3IgCgIQAAgBAAgBQAAAAAAgBQABAAAAgBQAAAAABAAQACgCAEgBIALAAIAKAAIAGABQAAAAAAABQABAAAAAAQABAAAAABQAAAAAAABIADAFIAeBXIAAAAIAchZQABgEABgBQABAAAAAAQABgBAAAAQABAAABAAQAAgBABAAIALAAIALAAQAEABACACQAAAAABABQAAAAAAAAQABABAAABQAAAAAAABIgBAGIgsB/IgQAvQgBADgGACQgEABgMAAIgJAAg");
	this.shape_124.setTransform(1076.4,643.125);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#CCD4FF").s().p("AgIBmIgFgBIgEgCIgBgDIAAi/IABgCQABgBAAAAQAAAAABgBQAAAAAAAAQABAAABAAIAFgCIAIgBIAJABIAFACIADACIABACIAAC/IgBADIgDACIgFABIgJAAIgIAAg");
	this.shape_125.setTransform(1058.85,637.4);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#CCD4FF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgJAMgGQANgFAOAAQARAAALAFQAMAFAHAJQAIAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQgBAJACAHQADAGAEAFQAEAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAHgBIABAAIACACIABAEIAAAGIAAAGIgBADIgBADIgBACIgFADIgLAEIgPACQgJACgKAAQgPAAgOgFgAgJgsQgGADgDAEQgEAFgCAGQgCAGABAHIA1AAQABgQgHgJQgGgJgPAAQgFAAgFADg");
	this.shape_126.setTransform(1047.55,640.525);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#CCD4FF").s().p("AgYBFQgNgEgJgJQgJgJgEgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJAMgGQANgFAOAAQARAAAMAFQALAFAIAJQAHAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJACAHQADAGADAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAGgBIACAAIACACIABAEIAAAGIAAAGIgBADIgBADIgBACIgFADIgLAEIgPACQgJACgJAAQgQAAgOgFgAgJgsQgGADgDAEQgDAFgDAGQgCAGAAAHIA2AAQABgQgGgJQgIgJgOAAQgGAAgEADg");
	this.shape_127.setTransform(1032.45,640.525);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#CCD4FF").s().p("AgOBnIgGgCIgDgCIgBgCIAAhpIgQAAQgDABgCgEQgBgEAAgHIAAgIIABgFIADgCIACAAIAQAAIAAgLQAAgOADgKQADgKAFgHQAGgGAIgEQAIgDAMAAIALABIAIACIAEACIACADIABAEIAAAIIAAAHIgBADIgCACIgCAAIgCAAIgCgBIgFgBIgGAAQgEAAgCABQgEABgCADQgCADAAAEIgBALIAAAMIAYAAIADAAIABACIABAFIAAAIQABAHgCAEQgCAEgCgBIgYAAIAABpIgBACIgDACIgFACIgIAAIgJAAg");
	this.shape_128.setTransform(1021.05,637.35);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#CCD4FF").s().p("AgjBhQgLgFgGgKQgHgKgDgNQgDgNAAgOQAAgSAEgOQAEgNAHgJQAHgLALgFQAKgFAOAAQAKAAAJAEQAJAFAJAIIAAhGIABgDIADgCIAFgBIAJAAIAJAAIAGABIADACIABADIAAC/IgBADIgDABIgEACIgIAAIgHAAIgFgCIgDgBIgBgDIAAgPQgKAMgLAFQgLAHgMAAQgPAAgKgHgAgNgIQgFADgDAFQgDAHgCAHQgBAHAAAIIABAQQABAHADAHQADAGAFADQAFAEAIAAIAGgBIAIgDIAHgHIAJgKIAAgsQgIgIgHgFQgHgGgHAAQgHAAgGAEg");
	this.shape_129.setTransform(1000.775,637.55);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#CCD4FF").s().p("AAjBIIgGgBIgDgCIAAgDIAAhJQgBgKgBgFQgCgFgCgEQgCgEgEgCQgFgCgGAAQgGAAgGAEQgIAGgIAKIAABVIgBADIgCACIgGABIgJAAIgJAAIgFgBIgEgCIgBgDIAAiBIABgCIADgDIAFgBIAIAAIAHAAIAFABIACADIABACIAAAPQALgMALgFQAKgHANAAQANABAJAEQAJAEAGAIQAFAIADAKQACAKAAAOIAABPIAAADIgDACIgGABIgJAAIgJAAg");
	this.shape_130.setTransform(985.1,640.4);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#CCD4FF").s().p("AgeBHQgJgDgGgFQgHgFgDgIQgEgIAAgLQAAgLAFgJQAEgIAJgFQAJgFANgDQANgCARAAIAMAAIAAgIIgBgLQgBgFgDgDQgDgDgFgBQgEgCgGAAQgKAAgHACIgNAFIgJAEIgGACIgDgBIgCgDIgBgEIgBgGIABgIQABgCACgCIAHgFQAFgDAHgCIAPgDQAIgCAIAAQAPAAALADQALADAHAHQAHAGADAKQAEAJAAAOIAABXQAAAAAAABQAAAAgBAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAABgBAAQAAAAgBAAQAAABgBAAIgKAAIgJAAQgBAAgBgBQAAAAgBAAQAAAAgBgBQAAAAgBAAIgBgDIAAgLQgIAJgKAFQgLAFgLAAQgLAAgIgDgAgFALQgGABgEADQgEADgCADQgCAEAAAFQAAAIAFAFQAGAFAJAAQAHAAAGgEQAHgEAGgIIAAgWIgOAAQgJAAgFABg");
	this.shape_131.setTransform(969.225,640.525);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#CCD4FF").s().p("AAgBmIgGgBIgEgBIgCgEIgrhEIAABEIgBADIgDACIgFABIgJAAIgJAAIgGgBIgDgCIgBgDIAAi/IABgCQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAIAGgCIAJgBIAJABIAFACIADACIABACIAAByIAmg0IACgCIAEgDIAGgBIAJAAIAKAAIAGABIADADIABACIgBAEIgEAGIgmArIAsBDIADAGIABADIgBAEIgDABIgGABIgJAAIgKAAg");
	this.shape_132.setTransform(948.925,637.4);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#CCD4FF").s().p("AgfBFQgNgFgJgJQgHgKgFgNQgEgNAAgSQAAgPAFgOQAEgOAJgKQAJgKAOgFQANgGAQAAQATAAAMAFQANAFAJAJQAIAJAEAOQAEANAAASQAAAPgFAOQgDAOgJAKQgKAKgNAFQgOAGgQAAQgSAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJACAJQABAIAEAGQAEAGAFADQAHADAIAAQAIAAAHgDQAFgDAFgGQADgFACgIQACgJAAgKQAAgJgCgIQgBgIgDgGQgEgGgGgDQgHgEgJAAQgHAAgGADg");
	this.shape_133.setTransform(932.9,640.525);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#CCD4FF").s().p("AgfBFQgNgFgIgJQgJgKgEgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKANgFQANgGASAAQARAAANAFQANAFAJAJQAIAJAEAOQAEANAAASQAAAPgEAOQgEAOgKAKQgIAKgOAFQgNAGgSAAQgRAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQAEAGAGADQAFADAJAAQAIAAAGgDQAHgDADgGQAFgFABgIQACgJAAgKQAAgJgCgIQgBgIgEgGQgDgGgHgDQgGgEgIAAQgIAAgGADg");
	this.shape_134.setTransform(916.75,640.525);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#CCD4FF").s().p("AgIBmIgGgBIgCgCIgBgDIAAi/IABgCQAAgBAAAAQAAAAABgBQAAAAAAAAQABAAAAAAIAGgCIAIgBIAJABIAFACIAEACIABACIAAC/IgBADIgEACIgFABIgJAAIgIAAg");
	this.shape_135.setTransform(905.05,637.4);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#CCD4FF").s().p("AgYBFQgNgEgJgJQgIgJgFgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJANgGQAMgFAPAAQAQAAAMAFQALAFAHAJQAIAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJACAHQABAGAEAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAFgBIADAAIABACIABAEIAAAGIAAAGIAAADIgBADIgCACIgFADIgLAEIgPACQgIACgLAAQgPAAgOgFgAgKgsQgFADgDAEQgDAFgCAGQgCAGAAAHIA2AAQAAgQgGgJQgIgJgNAAQgGAAgGADg");
	this.shape_136.setTransform(886.95,640.525);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#CCD4FF").s().p("AAjBmIgFgBIgEgCIgBgDIAAhKQABgKgCgFQgCgFgCgDQgCgEgEgCQgFgCgFAAQgGAAgIAEQgHAFgIAKIAABWIgBADIgDACIgFABIgJAAIgJAAIgFgBIgEgCIgBgDIAAi/IABgCQABgBAAAAQAAAAAAgBQABAAAAAAQABAAABAAIAFgCIAJgBIAJABIAFACIADACIABACIAABIQAKgKAKgEQAJgEALgBQAMABAKAEQAJAEAFAIQAGAIADAKQADAJgBAPIAABPIgBADIgCACIgGABIgJAAIgJAAg");
	this.shape_137.setTransform(871.45,637.4);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#CCD4FF").s().p("AAABWQgIgCgGgGQgFgGgDgJQgCgIAAgNIAAhBIgQAAQgCAAgCgEQgBgDAAgIIAAgIIABgEIACgDIACAAIAQAAIAAgeIABgCIADgCIAGgBIAIgBIAIABIAGABIADACIABACIAAAeIAcAAIADAAIACADIABAEIAAAIQAAAIgBADQgCAEgDAAIgcAAIAAA8QAAALADAFQAEAFAIABIAFgBIAFgBIADgBIACgBIACABIABACIABAEIAAAGIgBAKIgCAGIgEACIgGACIgHABIgIAAQgLAAgHgDg");
	this.shape_138.setTransform(857.925,638.9);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#CCD4FF").s().p("AgfBgQgMgDgIgFQgHgEgEgHQgDgGAAgIQAAgFABgEQACgEACgEIAGgIIAIgHQgGgEgEgFQgEgHAAgGQABgJAEgGQADgHAHgGQgFgFgEgHQgCgHAAgLQAAgLADgJQAEgKAIgFQAHgHAKgDQAKgDAMAAIALABIAKACIAqAAQACAAACACIABALQAAAIgCADQAAABAAAAQgBABAAAAQgBABAAAAQgBAAAAAAIgQAAQADADACAGQABAEABAFQAAALgFAJQgDAIgIAHQgGAGgLADQgJADgMAAIgMgCIgIgDIgEAEQgBADgBADQABADADAEQAEACAHABIAeAAQAMABAIACQAKAEAGAEQAFAFADAHQADAHAAAIQABAKgFAJQgEAIgJAHQgIAGgNAEQgMADgRAAQgQAAgMgCgAgYAsIgDAFIgCAFIAAAEQAAAIAHADQAIAEANABQAHAAAGgDQAFgBAEgDQADgDACgDQABgDAAgFQAAgGgEgEQgGgDgJAAIgagBIgGAFgAgMhGQgEABgDAEQgDADgBAFIgBAIQAAAKAFAGQAHAGAKgBQAFAAAEgCQADgBAEgDIADgHIACgIQAAgLgGgGQgGgGgJAAQgGAAgEACg");
	this.shape_139.setTransform(838.95,643.05);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#CCD4FF").s().p("AAjBIIgFgBIgEgCIgBgDIAAhJQAAgKgBgFQgCgFgCgEQgDgEgEgCQgEgCgFAAQgHAAgHAEQgHAGgHAKIAABVIgBADIgEACIgFABIgJAAIgJAAIgGgBIgCgCIgBgDIAAiBIAAgCIADgDIAFgBIAHAAIAIAAIAFABIACADIABACIAAAPQALgMALgFQAKgHAMAAQANABAKAEQAJAEAFAIQAGAIADAKQACAKAAAOIAABPIgBADIgDACIgFABIgJAAIgJAAg");
	this.shape_140.setTransform(823.95,640.4);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#CCD4FF").s().p("AgIBkIgFgCIgDgCIgBgCIAAiCIABgCIADgCIAFgBIAIAAIAJAAIAGABIADACIABACIAACCIgBACIgDACIgGACIgJAAIgIAAgAgQhBQgEgDAAgLQAAgMAEgDQAFgFALAAQANAAAEAFQAEADAAALQAAAMgEADQgFAEgMABQgLgBgFgEg");
	this.shape_141.setTransform(812.175,637.65);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#CCD4FF").s().p("AgLBHIgIgBIgEgDIgCgEIgnh1IgCgFIAAgEIgBgCIABgCIADgCIAGgBIAJAAIAJAAIAGABIADACIACADIAcBfIABAEIABgEIAdhfIACgDIADgCIAFgBIAJAAIAJAAIAGABIACACIABACIAAACIAAADIgBACIgBAEIgnB1IgCAEIgEADIgIABIgNAAIgLAAg");
	this.shape_142.setTransform(801.375,640.525);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#CCD4FF").s().p("AgYBFQgNgEgJgJQgJgJgEgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJAMgGQANgFAPAAQAQAAAMAFQALAFAIAJQAHAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJADAHQACAGADAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAFgBIACAAIACACIABAEIAAAGIAAAGIAAADIgBADIgCACIgFADIgLAEIgPACQgIACgKAAQgQAAgOgFgAgKgsQgFADgDAEQgEAFgBAGQgDAGAAAHIA2AAQABgQgGgJQgIgJgOAAQgGAAgFADg");
	this.shape_143.setTransform(786.85,640.525);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#CCD4FF").s().p("AgIBkIgFgCIgDgCIgBgCIAAiCIABgCIADgCIAFgBIAIAAIAJAAIAGABIADACIABACIAACCIgBACIgDACIgGACIgJAAIgIAAgAgQhBQgEgDAAgLQAAgMAEgDQAFgFALAAQANAAAEAFQAEADAAALQAAAMgEADQgFAEgMABQgLgBgFgEg");
	this.shape_144.setTransform(775.675,637.65);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#CCD4FF").s().p("AAjBmIgFgBIgEgCIgBgDIAAhKQABgKgCgFQgCgFgCgDQgDgEgDgCQgFgCgFAAQgGAAgIAEQgHAFgHAKIAABWIgCADIgDACIgFABIgJAAIgJAAIgFgBIgDgCIgCgDIAAi/IACgCQAAgBAAAAQAAAAABgBQAAAAAAAAQABAAABAAIAFgCIAJgBIAJABIAFACIADACIACACIAABIQAJgKAKgEQAIgEAMgBQAMABAKAEQAJAEAFAIQAHAIACAKQACAJAAAPIAABPIgBADIgCACIgGABIgJAAIgJAAg");
	this.shape_145.setTransform(764,637.4);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#CCD4FF").s().p("AgRBFQgMgEgHgKQgJgJgDgNQgFgNAAgSQAAgSAGgOQAEgPAJgJQAJgKAMgEQAMgEANgBIAMABIALADQAEACAEADIAFADIADADIABADIABAEIAAAGIgBAMQgCAEgDAAQgCAAgDgCIgHgFIgJgEQgEgDgIAAQgOAAgHAMQgIAKAAAVQAAAKACAIQACAJAEAFQAEAFAEAEQAGACAIAAQAHAAAFgCIAKgGIAHgEQABgBAAAAQABgBAAAAQABAAAAAAQABgBAAAAIADABIACADIAAAFIAAAHIAAAHIAAAEIgBAEIgCACIgGAEIgKAFIgMACIgNABQgPABgLgFg");
	this.shape_146.setTransform(749.75,640.5);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#CCD4FF").s().p("AgeBHQgJgDgGgFQgHgFgDgIQgEgIAAgLQAAgLAFgJQAEgIAJgFQAJgFANgDQANgCARAAIAMAAIAAgIIgBgLQgBgFgDgDQgDgDgFgBQgEgCgGAAQgKAAgHACIgNAFIgJAEIgGACIgDgBIgCgDIgBgEIgBgGIABgIQABgCACgCIAHgFQAFgDAHgCIAPgDQAIgCAIAAQAPAAALADQALADAHAHQAHAGADAKQAEAJAAAOIAABXQAAAAAAABQAAAAgBAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAABgBAAQAAAAgBAAQAAABgBAAIgKAAIgJAAQgBAAgBgBQAAAAgBAAQAAAAgBgBQAAAAgBAAIgBgDIAAgLQgIAJgKAFQgLAFgLAAQgLAAgIgDgAgFALQgGABgEADQgEADgCADQgCAEAAAFQAAAIAFAFQAGAFAJAAQAHAAAGgEQAHgEAGgIIAAgWIgOAAQgJAAgFABg");
	this.shape_147.setTransform(735.575,640.525);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#CCD4FF").s().p("AgfBFQgNgFgJgJQgIgKgEgNQgEgNAAgSQAAgPAFgOQAEgOAJgKQAJgKAOgFQANgGAQAAQASAAANAFQANAFAJAJQAIAJAEAOQAEANAAASQAAAPgFAOQgEAOgIAKQgKAKgNAFQgOAGgQAAQgSAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJACAJQABAIAEAGQAEAGAFADQAHADAIAAQAIAAAHgDQAFgDAFgGQAEgFABgIQACgJAAgKQAAgJgCgIQgBgIgDgGQgFgGgFgDQgHgEgIAAQgIAAgGADg");
	this.shape_148.setTransform(713.65,640.525);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#CCD4FF").s().p("AAABWQgIgCgGgGQgFgGgDgJQgCgIAAgNIAAhBIgQAAQgCAAgCgEQgBgDAAgIIAAgIIABgEIACgDIACAAIAQAAIAAgeIABgCIADgCIAGgBIAIgBIAIABIAGABIADACIABACIAAAeIAcAAIADAAIACADIABAEIAAAIQAAAIgBADQgCAEgDAAIgcAAIAAA8QAAALADAFQAEAFAIABIAFgBIAFgBIADgBIACgBIACABIABACIABAEIAAAGIgBAKIgCAGIgEACIgGACIgHABIgIAAQgLAAgHgDg");
	this.shape_149.setTransform(700.475,638.9);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#CCD4FF").s().p("AgjBhQgLgFgGgKQgHgKgDgNQgDgNAAgOQAAgSAEgOQAEgNAHgJQAHgLALgFQAKgFAOAAQAKAAAJAEQAJAFAJAIIAAhGIABgDIADgCIAFgBIAJAAIAJAAIAGABIADACIABADIAAC/IgBADIgDABIgEACIgIAAIgHAAIgFgCIgDgBIgBgDIAAgPQgKAMgLAFQgLAHgMAAQgPAAgKgHgAgNgIQgFADgDAFQgDAHgCAHQgBAHAAAIIABAQQABAHADAHQADAGAFADQAFAEAIAAIAGgBIAIgDIAHgHIAJgKIAAgsQgIgIgHgFQgHgGgHAAQgHAAgGAEg");
	this.shape_150.setTransform(680.275,637.55);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#CCD4FF").s().p("AgYBFQgNgEgJgJQgIgJgFgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJANgGQAMgFAPAAQAQAAAMAFQALAFAIAJQAHAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQABAJACAHQACAGADAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAFgBIADAAIABACIABAEIAAAGIAAAGIAAADIgBADIgCACIgFADIgLAEIgPACQgIACgLAAQgPAAgOgFgAgKgsQgFADgDAEQgEAFgBAGQgCAGgBAHIA3AAQAAgQgGgJQgIgJgNAAQgGAAgGADg");
	this.shape_151.setTransform(665,640.525);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#CCD4FF").s().p("AAABWQgIgCgGgGQgFgGgDgJQgCgIAAgNIAAhBIgQAAQgCAAgCgEQgBgDAAgIIAAgIIABgEIACgDIACAAIAQAAIAAgeIABgCIADgCIAGgBIAIgBIAIABIAGABIADACIABACIAAAeIAcAAIADAAIACADIABAEIAAAIQAAAIgBADQgCAEgDAAIgcAAIAAA8QAAALADAFQAEAFAIABIAFgBIAFgBIADgBIACgBIACABIABACIABAEIAAAGIgBAKIgCAGIgEACIgGACIgHABIgIAAQgLAAgHgDg");
	this.shape_152.setTransform(652.425,638.9);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#CCD4FF").s().p("AAABWQgIgCgGgGQgFgGgDgJQgCgIAAgNIAAhBIgQAAQgCAAgCgEQgBgDAAgIIAAgIIABgEIACgDIACAAIAQAAIAAgeIABgCIADgCIAGgBIAIgBIAIABIAGABIADACIABACIAAAeIAcAAIADAAIACADIABAEIAAAIQAAAIgBADQgCAEgDAAIgcAAIAAA8QAAALADAFQAEAFAIABIAFgBIAFgBIADgBIACgBIACABIABACIABAEIAAAGIgBAKIgCAGIgEACIgGACIgHABIgIAAQgLAAgHgDg");
	this.shape_153.setTransform(642.375,638.9);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#CCD4FF").s().p("AgIBkIgFgCIgDgCIgBgCIAAiCIABgCIADgCIAFgBIAIAAIAJAAIAGABIADACIABACIAACCIgBACIgDACIgGACIgJAAIgIAAgAgQhBQgEgDAAgLQAAgMAEgDQAFgFALAAQANAAAEAFQAEADAAALQAAAMgEADQgFAEgMABQgLgBgFgEg");
	this.shape_154.setTransform(633.725,637.65);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#CCD4FF").s().p("ABNBIIgGgBIgDgCIgBgDIAAhMIgBgMQgBgFgDgEQgCgEgFgCQgDgCgGAAQgGAAgHAEQgHAGgIAKIAABVIgBADIgCACIgGABIgJAAIgIAAIgGgBIgDgCIgBgDIAAhMIAAgMQgCgFgDgEQgCgEgEgCQgEgCgFAAQgHAAgHAEQgGAGgIAKIAABVIgBADIgDACIgFABIgJAAIgJAAIgGgBIgDgCIgBgDIAAiBIABgCIADgDIAEgBIAIAAIAHAAIAGABIACADIAAACIAAAPQAMgMAKgFQALgHAMAAQAHAAAHACQAGACAGADQADADAFAFIAFAKIAMgMIALgHIALgEIALgCQAOABAIAEQAJAEAFAIQAGAIACAKQADAKAAALIAABSIgBADIgDACIgFABIgJAAIgJAAg");
	this.shape_155.setTransform(617.9,640.4);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#CCD4FF").s().p("ABMBIIgFgBIgDgCIgBgDIAAhMIgBgMQgCgFgCgEQgDgEgEgCQgEgCgFAAQgGAAgHAEQgHAGgIAKIAABVIAAADIgDACIgGABIgJAAIgIAAIgGgBIgDgCIAAgDIAAhMIgBgMQgCgFgDgEQgCgEgEgCQgEgCgFAAQgHAAgHAEQgGAGgIAKIAABVIgBADIgDACIgGABIgJAAIgJAAIgFgBIgDgCIgBgDIAAiBIAAgCIAEgDIAEgBIAIAAIAIAAIAFABIACADIABACIAAAPQALgMAKgFQALgHAMAAQAHAAAHACQAGACAGADQADADAFAFIAFAKIAMgMIALgHIALgEIALgCQAOABAIAEQAJAEAFAIQAGAIACAKQADAKAAALIAABSIgBADIgDACIgGABIgJAAIgJAAg");
	this.shape_156.setTransform(593.5,640.4);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#CCD4FF").s().p("AgfBFQgNgFgIgJQgJgKgEgNQgEgNAAgSQAAgPAFgOQAEgOAJgKQAJgKAOgFQAMgGARAAQASAAANAFQANAFAJAJQAIAJAEAOQAEANAAASQAAAPgFAOQgEAOgIAKQgJAKgOAFQgNAGgRAAQgSAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQAEAGAFADQAHADAIAAQAIAAAGgDQAGgDAFgGQAEgFABgIQACgJAAgKQAAgJgCgIQgBgIgDgGQgFgGgFgDQgGgEgJAAQgIAAgGADg");
	this.shape_157.setTransform(573.15,640.525);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#CCD4FF").s().p("AgRBFQgMgEgHgKQgIgJgFgNQgDgNAAgSQAAgSAEgOQAGgPAIgJQAJgKAMgEQAMgEANgBIAMABIALADQAFACADADIAFADIADADIABADIABAEIAAAGIgCAMQgBAEgDAAQgCAAgDgCIgGgFIgJgEQgGgDgHAAQgOAAgHAMQgHAKgBAVQABAKABAIQACAJAEAFQAEAFAFAEQAFACAHAAQAIAAAGgCIAJgGIAHgEQABgBAAAAQABgBAAAAQABAAAAAAQABgBAAAAIADABIACADIAAAFIABAHIgBAHIAAAEIgCAEIgCACIgFAEIgLAFIgLACIgNABQgPABgLgFg");
	this.shape_158.setTransform(559.1,640.5);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#CCD4FF").s().p("AgYBFQgNgEgJgJQgIgJgFgOQgEgNAAgTQAAgQAEgOQAFgOAIgKQAJgJANgGQAMgFAPAAQAQAAALAFQAMAFAHAJQAIAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJACAHQABAGAFAFQAEAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAGgBIACAAIABACIABAEIAAAGIAAAGIgBADIAAADIgCACIgFADIgLAEIgPACQgJACgKAAQgQAAgNgFgAgKgsQgFADgDAEQgDAFgCAGQgCAGAAAHIA2AAQAAgQgHgJQgGgJgOAAQgGAAgGADg");
	this.shape_159.setTransform(538.3,640.525);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#CCD4FF").s().p("AggBIIgFgBIgDgCIgBgDIAAiBIAAgCIAEgDIAEgBIAIAAIAIAAIAFABIACADIABACIAAAQIAJgMIAIgHQAEgEAEgBIAIgBIAEABIAFAAIAEABIACACIACACIABACIAAAEIAAAJIAAAIIgBAGIgCACIgCABIgDAAIgDgBIgEgBIgFgBIgGACQgEABgDACIgHAHIgGALIAABQIgBADIgDACIgGABIgJAAIgJAAg");
	this.shape_160.setTransform(526.55,640.4);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#CCD4FF").s().p("AgeBHQgJgDgGgFQgHgFgDgIQgEgIAAgLQAAgLAFgJQAEgIAJgFQAJgFANgDQANgCARAAIAMAAIAAgIIgBgLQgBgFgDgDQgDgDgFgBQgEgCgGAAQgKAAgHACIgNAFIgJAEIgGACIgDgBIgCgDIgBgEIgBgGIABgIQABgCACgCIAHgFQAFgDAHgCIAPgDQAIgCAIAAQAPAAALADQALADAHAHQAHAGADAKQAEAJAAAOIAABXQAAAAAAABQAAAAgBAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAABgBAAQAAAAgBAAQAAABgBAAIgKAAIgJAAQgBAAgBgBQAAAAgBAAQAAAAgBgBQAAAAgBAAIgBgDIAAgLQgIAJgKAFQgLAFgLAAQgLAAgIgDgAgFALQgGABgEADQgEADgCADQgCAEAAAFQAAAIAFAFQAGAFAJAAQAHAAAGgEQAHgEAGgIIAAgWIgOAAQgJAAgFABg");
	this.shape_161.setTransform(512.725,640.525);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#CCD4FF").s().p("AgYBFQgNgEgJgJQgIgJgFgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJANgGQAMgFAPAAQAQAAAMAFQALAFAIAJQAHAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQABAJACAHQACAGADAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAFgBIADAAIABACIABAEIAAAGIAAAGIAAADIgBADIgCACIgFADIgLAEIgPACQgIACgKAAQgQAAgOgFgAgKgsQgFADgDAEQgEAFgBAGQgCAGgBAHIA3AAQAAgQgGgJQgIgJgNAAQgGAAgGADg");
	this.shape_162.setTransform(491.3,640.525);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#CCD4FF").s().p("AAiBHIgHgBIgEgDIgCgEIgVhOIAAgBIAAABIgUBOIgCAEIgEADIgHABIgMAAIgLAAIgHgBIgEgDIgCgEIgjh1IgBgHIgBgEIABgCIADgCIAGgBIAJAAIAJAAIAGABQABAAAAABQABAAAAAAQAAAAAAABQABAAAAAAIABADIAaBfIAAACIABgCIAYhfIABgDIADgCIAGgBIAHAAIAJAAIAGABIACACIACACIAaBgIAAACIAAgCIAZhfIACgDQAAAAAAAAQAAgBABAAQAAAAAAAAQABgBAAAAIAGgBIAJAAIAJAAIAFABIADACIABACIgBAEIgBAHIgjB1IgCAEIgEADIgHABIgLAAIgMAAg");
	this.shape_163.setTransform(472.875,640.525);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#CCD4FF").s().p("AgXAqIgEgBIgBgCIAAgDIASgnIAAgXIABgIQACgDACgCQADgCACAAIAKgBIAIABQAEAAADACIADAFIABAIIgBAKIgBAJIgEAIIgFAIIgTAcIgCADIgDABIgEABIgGABIgHgBg");
	this.shape_164.setTransform(450.425,647.575);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#CCD4FF").s().p("AAjBIIgGgBIgCgCIgBgDIAAhJQgBgKgBgFQgBgFgDgEQgDgEgEgCQgEgCgGAAQgGAAgGAEQgIAGgIAKIAABVIAAADIgDACIgGABIgJAAIgJAAIgGgBIgDgCIgBgDIAAiBIABgCIADgDIAFgBIAIAAIAHAAIAFABIACADIABACIAAAPQALgMALgFQAKgHANAAQANABAJAEQAJAEAGAIQAFAIADAKQACAKABAOIAABPIgBADIgEACIgFABIgJAAIgJAAg");
	this.shape_165.setTransform(439.15,640.4);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#CCD4FF").s().p("AgfBgQgMgDgIgFQgHgEgDgHQgEgGAAgIQAAgFACgEQAAgEADgEIAGgIIAIgHQgHgEgDgFQgDgHgBgGQAAgJAFgGQAEgHAGgGQgFgFgDgHQgDgHAAgLQAAgLADgJQAEgKAIgFQAHgHAKgDQAKgDAMAAIALABIAKACIAqAAQACAAACACIABALQAAAIgCADQAAABAAAAQgBABAAAAQgBABAAAAQgBAAAAAAIgQAAQADADACAGQACAEAAAFQAAALgFAJQgDAIgIAHQgHAGgKADQgKADgLAAIgMgCIgJgDIgDAEQgCADABADQAAADADAEQAEACAHABIAfAAQALABAIACQAJAEAHAEQAFAFAEAHQACAHAAAIQAAAKgEAJQgEAIgJAHQgIAGgNAEQgNADgQAAQgQAAgMgCgAgYAsIgDAFIgCAFIAAAEQgBAIAIADQAHAEAOABQAHAAAGgDQAGgBADgDQADgDACgDQABgDABgFQAAgGgGgEQgFgDgJAAIgZgBIgHAFgAgMhGQgEABgDAEQgCADgCAFIgBAIQAAAKAGAGQAFAGALgBQAEAAAFgCQADgBADgDIAFgHIABgIQAAgLgGgGQgGgGgJAAQgGAAgEACg");
	this.shape_166.setTransform(423.85,643.05);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#CCD4FF").s().p("AgIBkIgFgCIgDgCIgBgCIAAiCIABgCIADgCIAFgBIAIAAIAJAAIAGABIADACIABACIAACCIgBACIgDACIgGACIgJAAIgIAAgAgQhBQgEgDAAgLQAAgMAEgDQAFgFALAAQANAAAEAFQAEADAAALQAAAMgEADQgFAEgMABQgLgBgFgEg");
	this.shape_167.setTransform(413.175,637.65);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#CCD4FF").s().p("AgTBJIgNgDIgJgEIgEgDIgDgFIgBgKIAAgGIACgEQAAgBAAAAQAAAAAAgBQAAAAABAAQAAAAAAAAIACgBIAFACIAHAEIAMAEQAGACAHAAIAIgBIAIgDIADgFQACgDAAgEQAAgEgDgDIgHgGIgJgEIgLgFIgMgFIgKgHQgEgFgDgHQgDgGAAgJQAAgKAEgIQADgHAHgGQAHgGAKgDQAKgDALAAIAMABIALACIAIADIAEADIACACIABADIABAEIAAAFIAAAHIgBAEIgCACIgCAAIgEgBIgHgEIgJgDQgGgCgHAAIgHABQgFABgBACIgEAFQgCACAAADQAAAFAEADQACADAFACIAJAFIAMAEIALAGQAHADAEAEQAEAEADAHQADAGAAAJQAAALgEAJQgFAIgHAGQgHAGgLADQgLADgLAAIgNgBg");
	this.shape_168.setTransform(403.6,640.525);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#CCD4FF").s().p("AgYBFQgNgEgJgJQgJgJgEgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJAMgGQANgFAPAAQAQAAAMAFQALAFAIAJQAHAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJADAHQACAGADAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAFgBIACAAIACACIABAEIAAAGIAAAGIAAADIgBADIgCACIgFADIgLAEIgPACQgIACgKAAQgQAAgOgFgAgKgsQgFADgDAEQgEAFgBAGQgDAGAAAHIA2AAQABgQgGgJQgIgJgOAAQgGAAgFADg");
	this.shape_169.setTransform(389.95,640.525);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#CCD4FF").s().p("AgjBhQgLgFgGgKQgHgKgDgNQgDgNAAgOQAAgSAEgOQAEgNAHgJQAHgLALgFQAKgFAOAAQAKAAAJAEQAJAFAJAIIAAhGIABgDIADgCIAFgBIAJAAIAJAAIAGABIADACIABADIAAC/IgBADIgDABIgEACIgIAAIgHAAIgFgCIgDgBIgBgDIAAgPQgKAMgLAFQgLAHgMAAQgPAAgKgHgAgNgIQgFADgDAFQgDAHgCAHQgBAHAAAIIABAQQABAHADAHQADAGAFADQAFAEAIAAIAGgBIAIgDIAHgHIAJgKIAAgsQgIgIgHgFQgHgGgHAAQgHAAgGAEg");
	this.shape_170.setTransform(374.025,637.55);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#CCD4FF").s().p("AgjBhQgLgFgGgKQgHgKgDgNQgDgNAAgOQAAgSAEgOQAEgNAHgJQAHgLALgFQAKgFAOAAQAKAAAJAEQAJAFAJAIIAAhGIABgDIADgCIAFgBIAJAAIAJAAIAGABIADACIABADIAAC/IgBADIgDABIgEACIgIAAIgHAAIgFgCIgDgBIgBgDIAAgPQgKAMgLAFQgLAHgMAAQgPAAgKgHgAgNgIQgFADgDAFQgDAHgCAHQgBAHAAAIIABAQQABAHADAHQADAGAFADQAFAEAIAAIAGgBIAIgDIAHgHIAJgKIAAgsQgIgIgHgFQgHgGgHAAQgHAAgGAEg");
	this.shape_171.setTransform(351.125,637.55);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#CCD4FF").s().p("AgYBFQgNgEgJgJQgJgJgEgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJAMgGQANgFAOAAQARAAAMAFQALAFAIAJQAHAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJACAHQADAGADAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAGgBIACAAIACACIABAEIAAAGIAAAGIAAADIgCADIgBACIgFADIgLAEIgPACQgIACgKAAQgQAAgOgFgAgKgsQgFADgDAEQgDAFgDAGQgCAGAAAHIA2AAQABgQgGgJQgIgJgOAAQgGAAgFADg");
	this.shape_172.setTransform(335.85,640.525);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#CCD4FF").s().p("AAjBmIgGgBIgCgCIgBgDIAAhKQgBgKgBgFQgBgFgDgDQgDgEgEgCQgEgCgGAAQgGAAgGAEQgIAFgIAKIAABWIgBADIgCACIgGABIgJAAIgJAAIgGgBIgDgCIAAgDIAAi/IAAgCQABgBAAAAQAAAAAAgBQABAAAAAAQABAAAAAAIAGgCIAJgBIAJABIAGACIACACIABACIAABIQAKgKAKgEQAIgEAMgBQAMABAKAEQAJAEAGAIQAFAIADAKQACAJABAPIAABPIgBADIgEACIgFABIgJAAIgJAAg");
	this.shape_173.setTransform(320.35,637.4);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#CCD4FF").s().p("AgUBJIgLgDIgJgEIgGgDIgCgFIgBgKIABgGIAAgEQABgBAAAAQAAAAAAgBQAAAAABAAQAAAAAAAAIACgBIAFACIAIAEIAKAEQAHACAIAAIAIgBIAGgDIAFgFQABgDAAgEQAAgEgCgDIgIgGIgJgEIgMgFIgLgFIgKgHQgFgFgDgHQgCgGAAgJQAAgKADgIQAEgHAHgGQAHgGAKgDQAKgDALAAIAMABIAKACIAIADIAFADIACACIABADIAAAEIAAAFIAAAHIgBAEIAAACIgDAAIgEgBIgHgEIgKgDQgFgCgHAAIgIABQgEABgCACIgDAFQgCACABADQAAAFACADQADADAFACIAJAFIAMAEIAMAGQAFADAFAEQAFAEACAHQADAGAAAJQAAALgEAJQgFAIgHAGQgIAGgKADQgKADgLAAIgPgBg");
	this.shape_174.setTransform(306.35,640.525);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#CCD4FF").s().p("AgIBkIgFgCIgDgCIgBgCIAAiCIABgCIADgCIAFgBIAIAAIAJAAIAGABIADACIABACIAACCIgBACIgDACIgGACIgJAAIgIAAgAgQhBQgEgDAAgLQAAgMAEgDQAFgFALAAQANAAAEAFQAEADAAALQAAAMgEADQgFAEgMABQgLgBgFgEg");
	this.shape_175.setTransform(296.625,637.65);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#CCD4FF").s().p("AAjBIIgFgBIgDgCIgCgDIAAhJQAAgKgBgFQgBgFgDgEQgDgEgEgCQgEgCgGAAQgGAAgHAEQgHAGgHAKIAABVIgBADIgEACIgFABIgJAAIgJAAIgGgBIgCgCIgBgDIAAiBIAAgCIADgDIAFgBIAHAAIAIAAIAFABIACADIABACIAAAPQALgMALgFQAKgHAMAAQAOABAJAEQAJAEAFAIQAHAIACAKQADAKAAAOIAABPIgCADIgDACIgFABIgJAAIgJAAg");
	this.shape_176.setTransform(284.95,640.4);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#CCD4FF").s().p("AgIBkIgFgCIgDgCIgBgCIAAiCIABgCIADgCIAFgBIAIAAIAJAAIAGABIADACIABACIAACCIgBACIgDACIgGACIgJAAIgIAAgAgQhBQgEgDAAgLQAAgMAEgDQAFgFALAAQANAAAEAFQAEADAAALQAAAMgEADQgFAEgMABQgLgBgFgEg");
	this.shape_177.setTransform(273.175,637.65);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#CCD4FF").s().p("AgOBnIgGgCIgDgCIgBgCIAAhpIgQAAQgDABgCgEQgBgEAAgHIAAgIIABgFIADgCIACAAIAQAAIAAgLQAAgOADgKQADgKAFgHQAGgGAIgEQAIgDAMAAIALABIAIACIAEACIACADIABAEIAAAIIAAAHIgBADIgCACIgCAAIgBAAIgDgBIgFgBIgGAAQgEAAgCABQgDABgDADQgCADAAAEIgBALIAAAMIAYAAIADAAIABACIABAFIAAAIQABAHgCAEQgCAEgCgBIgYAAIAABpIgBACIgDACIgFACIgIAAIgJAAg");
	this.shape_178.setTransform(265.05,637.35);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#CCD4FF").s().p("AgfBFQgNgFgIgJQgJgKgEgNQgEgNAAgSQAAgPAFgOQAEgOAJgKQAJgKAOgFQANgGARAAQARAAANAFQANAFAJAJQAIAJAEAOQAEANAAASQAAAPgFAOQgEAOgIAKQgJAKgOAFQgNAGgRAAQgSAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQAEAGAFADQAHADAIAAQAIAAAGgDQAGgDAFgGQAEgFABgIQACgJAAgKQAAgJgCgIQgBgIgDgGQgFgGgFgDQgGgEgJAAQgIAAgGADg");
	this.shape_179.setTransform(245.1,640.525);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#CCD4FF").s().p("AAABWQgIgCgGgGQgFgGgDgJQgCgIAAgNIAAhBIgQAAQgCAAgCgEQgBgDAAgIIAAgIIABgEIACgDIACAAIAQAAIAAgeIABgCIADgCIAGgBIAIgBIAIABIAGABIADACIABACIAAAeIAcAAIADAAIACADIABAEIAAAIQAAAIgBADQgCAEgDAAIgcAAIAAA8QAAALADAFQAEAFAIABIAFgBIAFgBIADgBIACgBIACABIABACIABAEIAAAGIgBAKIgCAGIgEACIgGACIgHABIgIAAQgLAAgHgDg");
	this.shape_180.setTransform(231.925,638.9);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#CCD4FF").s().p("AAABWQgIgCgGgGQgFgGgDgJQgCgIAAgNIAAhBIgQAAQgCAAgCgEQgBgDAAgIIAAgIIABgEIACgDIACAAIAQAAIAAgeIABgCIADgCIAGgBIAIgBIAIABIAGABIADACIABACIAAAeIAcAAIADAAIACADIABAEIAAAIQAAAIgBADQgCAEgDAAIgcAAIAAA8QAAALADAFQAEAFAIABIAFgBIAFgBIADgBIACgBIACABIABACIABAEIAAAGIgBAKIgCAGIgEACIgGACIgHABIgIAAQgLAAgHgDg");
	this.shape_181.setTransform(214.725,638.9);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#CCD4FF").s().p("Ag3BiIgGgBIgDgCIgBgDIAAi1IABgCIADgDIAEgBIAIAAIAHAAIAFABIADADIAAACIAAAPIAMgKIALgHIALgFQAGgBAHgBQAOABAKAFQAKAGAHAJQAGALADANQADANAAAOQAAARgEAOQgEANgHAKQgHAKgLAGQgKAFgOAAIgKgBIgJgDIgJgGIgJgIIAAA9IgBADIgDACIgFABIgJABIgJgBgAgEhBQgEABgEACIgIAHIgIAKIAAArQAIAJAHAFQAHAFAHABQAHgBAFgDQAFgEADgGQADgEACgIIABgPIgBgQQgBgIgDgGQgDgGgFgDQgFgEgHAAIgGABg");
	this.shape_182.setTransform(202.175,643);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#CCD4FF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgJAMgGQANgFAOAAQARAAALAFQAMAFAHAJQAIAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJABAHQACAGAFAFQAEAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAHgBIABAAIACACIABAEIAAAGIAAAGIgBADIgBADIgBACIgFADIgLAEIgPACQgJACgKAAQgPAAgOgFgAgJgsQgGADgDAEQgEAFgCAGQgBAGAAAHIA1AAQABgQgHgJQgGgJgOAAQgHAAgEADg");
	this.shape_183.setTransform(186.15,640.525);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#CCD4FF").s().p("AgRBFQgLgEgJgKQgIgJgDgNQgFgNAAgSQAAgSAGgOQAEgPAJgJQAJgKAMgEQAMgEAOgBIALABIAKADQAFACAEADIAGADIACADIABADIABAEIAAAGIgBAMQgCAEgDAAQgCAAgDgCIgHgFIgJgEQgEgDgIAAQgOAAgHAMQgIAKAAAVQAAAKACAIQACAJAEAFQAEAFAEAEQAGACAIAAQAHAAAFgCIAKgGIAHgEQABgBAAAAQABgBAAAAQABAAAAAAQABgBABAAIACABIACADIAAAFIAAAHIAAAHIAAAEIgBAEIgCACIgHAEIgJAFIgMACIgNABQgOABgMgFg");
	this.shape_184.setTransform(172.5,640.5);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#CCD4FF").s().p("AAjBIIgGgBIgDgCIgBgDIAAhJQAAgKgBgFQgCgFgCgEQgCgEgEgCQgFgCgFAAQgGAAgHAEQgIAGgIAKIAABVIgBADIgCACIgGABIgJAAIgJAAIgFgBIgEgCIgBgDIAAiBIABgCIADgDIAFgBIAHAAIAIAAIAFABIACADIABACIAAAPQALgMALgFQAKgHANAAQANABAJAEQAJAEAGAIQAFAIADAKQADAKgBAOIAABPIAAADIgDACIgGABIgJAAIgJAAg");
	this.shape_185.setTransform(158.1,640.4);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#CCD4FF").s().p("AgfBFQgNgFgJgJQgHgKgFgNQgEgNAAgSQAAgPAFgOQAEgOAJgKQAJgKAOgFQANgGAQAAQATAAAMAFQANAFAIAJQAJAJAEAOQAEANAAASQAAAPgFAOQgDAOgKAKQgJAKgNAFQgOAGgRAAQgRAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJACAJQABAIAEAGQADAGAGADQAHADAIAAQAIAAAHgDQAGgDAEgGQADgFACgIQACgJAAgKQAAgJgBgIQgCgIgEgGQgEgGgFgDQgHgEgJAAQgHAAgGADg");
	this.shape_186.setTransform(141.9,640.525);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#CCD4FF").s().p("AgRBFQgMgEgHgKQgJgJgDgNQgFgNAAgSQAAgSAGgOQAEgPAJgJQAJgKAMgEQAMgEANgBIAMABIALADQAEACAEADIAFADIADADIABADIABAEIAAAGIgBAMQgCAEgDAAQgCAAgDgCIgHgFIgIgEQgFgDgIAAQgOAAgHAMQgIAKAAAVQAAAKACAIQACAJAEAFQAEAFAEAEQAGACAIAAQAHAAAFgCIAKgGIAHgEQABgBAAAAQABgBAAAAQABAAAAAAQABgBAAAAIADABIACADIAAAFIAAAHIAAAHIAAAEIgBAEIgCACIgGAEIgKAFIgMACIgNABQgPABgLgFg");
	this.shape_187.setTransform(127.85,640.5);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#CCD4FF").s().p("ABNBIIgGgBIgDgCIgBgDIAAhMIgBgMQgCgFgCgEQgCgEgEgCQgFgCgEAAQgIAAgGAEQgHAGgIAKIAABVIgBADIgDACIgFABIgJAAIgIAAIgFgBIgEgCIgBgDIAAhMIgBgMQgBgFgCgEQgDgEgEgCQgEgCgFAAQgHAAgGAEQgIAGgHAKIAABVIgBADIgDACIgFABIgJAAIgJAAIgGgBIgDgCIgBgDIAAiBIABgCIACgDIAGgBIAHAAIAHAAIAFABIACADIABACIAAAPQALgMALgFQALgHALAAQAJAAAGACQAHACAEADQAEADAEAFIAHAKIALgMIALgHIALgEIALgCQANABAJAEQAJAEAGAIQAFAIADAKQACAKAAALIAABSIgBADIgDACIgFABIgJAAIgJAAg");
	this.shape_188.setTransform(102.5,640.4);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#CCD4FF").s().p("AgfBFQgNgFgJgJQgHgKgFgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKANgFQAOgGAQAAQATAAAMAFQANAFAIAJQAJAJAEAOQAEANAAASQAAAPgEAOQgFAOgJAKQgJAKgNAFQgOAGgRAAQgRAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJACAJQABAIAEAGQADAGAHADQAFADAJAAQAIAAAHgDQAFgDAEgGQAEgFACgIQACgJAAgKQAAgJgBgIQgCgIgEgGQgEgGgGgDQgFgEgKAAQgHAAgGADg");
	this.shape_189.setTransform(82.15,640.525);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#CCD4FF").s().p("AggBIIgFgBIgDgCIgBgDIAAiBIAAgCIADgDIAGgBIAHAAIAIAAIAEABIACADIABACIAAAQIAKgMIAIgHQAEgEAEgBIAIgBIAFABIAEAAIAEABIACACIABACIABACIAAAEIABAJIgBAIIgBAGIgBACIgCABIgDAAIgDgBIgEgBIgFgBIgGACQgDABgDACIgHAHIgHALIAABQIgBADIgDACIgFABIgJAAIgKAAg");
	this.shape_190.setTransform(69.85,640.4);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#CCD4FF").s().p("AgqBfIgGgBIgDgDIgBgCIAAirQAAgHADgCQADgDAFAAIBZAAIACABIACACIABAFIAAAIIAAAHIgBAFIgCACIgCABIg9AAIAAAzIA5AAIACABIACACIABAFIAAAGIAAAIIgBAFIgCACIgCABIg5AAIAABHIgBACIgDADIgGABIgKAAIgJAAg");
	this.shape_191.setTransform(57.425,638.125);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#CCD4FF").s().p("AgQASQgFgFAAgMQAAgNAFgFQAFgFALAAQAMAAAFAFQAFAFAAAMQAAANgFAFQgFAFgMAAQgMAAgEgFg");
	this.shape_192.setTransform(978.125,604.875);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#CCD4FF").s().p("AgYBFQgNgEgJgJQgIgJgFgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJANgGQAMgFAPAAQAQAAAMAFQALAFAIAJQAHAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQABAJACAHQACAGADAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAFgBIADAAIABACIABAEIAAAGIAAAGIAAADIgBADIgCACIgFADIgLAEIgPACQgIACgLAAQgPAAgOgFgAgKgsQgFADgDAEQgEAFgBAGQgCAGgBAHIA3AAQAAgQgGgJQgIgJgNAAQgGAAgGADg");
	this.shape_193.setTransform(966.5,599.925);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#CCD4FF").s().p("AgRBFQgMgEgHgKQgIgJgFgNQgDgNAAgSQAAgSAEgOQAGgOAIgKQAJgJAMgFQAMgEANAAIAMAAIALADQAFACADADIAFADIADADIABADIABAEIAAAGIgCAMQgBAEgDAAQgCAAgDgDIgGgEIgJgFQgGgCgHAAQgOABgHAKQgHALgBAVQABALABAHQACAJAEAFQAEAGAFADQAFACAHAAQAIAAAGgCIAJgFIAHgGQABAAAAAAQABgBAAAAQABAAAAAAQABgBAAAAIADABIACADIAAAFIABAHIgBAHIAAAEIgCAEIgCACIgFAEIgLAFIgLACIgNABQgPABgLgFg");
	this.shape_194.setTransform(952.85,599.9);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#CCD4FF").s().p("AAjBIIgGgBIgCgCIgBgDIAAhJQAAgKgCgFQgBgGgDgDQgDgEgEgCQgEgDgGAAQgFABgHAFQgIAFgHAKIAABVIgBADIgEACIgFABIgJAAIgJAAIgGgBIgCgCIgBgDIAAiBIAAgCIADgDIAFgBIAIAAIAHAAIAFABIACADIABACIAAAPQALgMALgFQAKgHAMABQAOAAAJAEQAJAFAFAHQAHAIACAKQADAJAAAPIAABPIgBADIgEACIgFABIgJAAIgJAAg");
	this.shape_195.setTransform(938.45,599.8);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#CCD4FF").s().p("AgYBFQgNgEgJgJQgJgJgEgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJAMgGQANgFAPAAQAQAAAMAFQALAFAIAJQAHAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJADAHQACAGADAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAFgBIACAAIACACIABAEIAAAGIAAAGIAAADIgBADIgCACIgFADIgLAEIgPACQgIACgKAAQgQAAgOgFgAgKgsQgFADgDAEQgEAFgBAGQgDAGAAAHIA2AAQABgQgGgJQgIgJgOAAQgGAAgFADg");
	this.shape_196.setTransform(922.75,599.925);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#CCD4FF").s().p("AgIBjIgFgBIgDgCIgBgCIAAiCIABgCIADgBIAFgCIAIAAIAJAAIAGACIADABIABACIAACCIgBACIgDACIgGABIgJABIgIgBgAgQhBQgEgDAAgLQAAgMAEgDQAFgFALAAQANAAAEAFQAEADAAALQAAAMgEADQgFAEgMABQgLgBgFgEg");
	this.shape_197.setTransform(911.575,597.05);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#CCD4FF").s().p("AgfBIIgGgBIgDgCIgBgDIAAiBIABgCIADgDIAEgBIAIAAIAHAAIAGABIACADIABACIAAAQIAJgMIAIgIQAEgDAEgBIAIAAIAEAAIAFAAIAEABIADACIABABIABADIAAAEIAAAJIAAAIIgBAGIgBADIgDAAIgDAAIgDgBIgEgBIgFgBIgGACQgEABgDACIgHAHIgGALIAABQIgBADIgDACIgFABIgJAAIgJAAg");
	this.shape_198.setTransform(903.3,599.8);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#CCD4FF").s().p("AgYBFQgNgEgJgJQgIgJgFgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJANgGQAMgFAPAAQAQAAAMAFQALAFAHAJQAIAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJACAHQABAGAEAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAFgBIADAAIABACIABAEIAAAGIAAAGIAAADIgBADIgCACIgFADIgLAEIgPACQgIACgLAAQgPAAgOgFgAgKgsQgFADgDAEQgDAFgCAGQgCAGAAAHIA2AAQAAgQgHgJQgHgJgNAAQgGAAgGADg");
	this.shape_199.setTransform(889.65,599.925);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#CCD4FF").s().p("Ag3BiIgGgBIgDgCIgBgDIAAi1IABgCIADgDIAEgBIAIAAIAHAAIAFABIADADIAAACIAAAPIAMgKIALgHIALgFQAGgCAHABQAOAAAKAFQAKAGAHAJQAGALADANQADANAAAPQAAAQgEAOQgEANgHALQgHAJgLAGQgKAFgOAAIgKgBIgJgDIgJgGIgJgIIAAA9IgBADIgDACIgFABIgJABIgJgBgAgEhBQgEABgEADIgIAGIgIAKIAAArQAIAJAHAFQAHAFAHABQAHgBAFgDQAFgEADgGQADgEACgIIABgPIgBgQQgBgIgDgGQgDgGgFgDQgFgEgHAAIgGABg");
	this.shape_200.setTransform(874.475,602.4);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#CCD4FF").s().p("AAiBHIgGgBIgEgCIgBgCIgYguIgYAuIgBACIgDACIgGABIgKAAIgLAAIgFgCQgBAAAAAAQAAgBgBAAQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAgBQAAAAAAgBQABgBAAAAIAkhAIghg8IgBgEQAAgBAAAAQAAgBAAAAQAAAAAAgBQABAAAAAAIAHgCIALAAIAKAAIAGABIAEABIABACIAXAsIAXgsIABgCIADgBIAFgBIAJAAIAKAAIAGABQAAAAABABQAAAAAAAAQAAABAAAAQABABAAAAIgCAFIghA7IAkBBIABAEQAAAAAAAAQAAABAAAAQgBAAAAABQAAAAgBAAIgGACIgLAAIgLAAg");
	this.shape_201.setTransform(859.1438,599.925);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#CCD4FF").s().p("AgYBFQgNgEgJgJQgIgJgFgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJANgGQAMgFAPAAQAQAAAMAFQALAFAHAJQAIAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJACAHQACAGADAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAFgBIADAAIABACIABAEIAAAGIAAAGIAAADIgBADIgCACIgFADIgLAEIgPACQgJACgKAAQgPAAgOgFgAgKgsQgFADgDAEQgDAFgCAGQgCAGAAAHIA2AAQAAgQgHgJQgHgJgNAAQgGAAgGADg");
	this.shape_202.setTransform(845.1,599.925);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#CCD4FF").s().p("AgYBFQgNgEgJgJQgJgJgEgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJAMgGQANgFAOAAQARAAAMAFQALAFAIAJQAHAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJACAHQADAGADAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAGgBIACAAIACACIABAEIAAAGIAAAGIAAADIgCADIgBACIgFADIgLAEIgPACQgIACgKAAQgRAAgNgFgAgKgsQgFADgDAEQgDAFgDAGQgCAGAAAHIA2AAQABgQgGgJQgIgJgOAAQgGAAgFADg");
	this.shape_203.setTransform(823.2,599.925);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#CCD4FF").s().p("AgLBHIgIgBIgEgDIgCgEIgnh1IgCgFIAAgEIgBgCIABgCIADgCIAGgBIAJAAIAJAAIAGABIADACIACADIAcBfIABAEIABgEIAdhfIACgDIADgCIAFgBIAJAAIAJAAIAGABIACACIABACIAAACIAAADIgBACIgBAEIgnB1IgCAEIgEADIgIABIgNAAIgLAAg");
	this.shape_204.setTransform(808.875,599.925);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#CCD4FF").s().p("AgIBjIgFgBIgDgCIgBgCIAAiCIABgCIADgBIAFgCIAIAAIAJAAIAGACIADABIABACIAACCIgBACIgDACIgGABIgJABIgIgBgAgQhBQgEgDAAgLQAAgMAEgDQAFgFALAAQANAAAEAFQAEADAAALQAAAMgEADQgFAEgMABQgLgBgFgEg");
	this.shape_205.setTransform(798.125,597.05);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#CCD4FF").s().p("AAABXQgIgDgGgGQgFgFgDgKQgCgIAAgNIAAhBIgQAAQgCAAgCgEQgBgDAAgIIAAgIIABgEIACgDIACAAIAQAAIAAgdIABgDIADgCIAGgBIAIgBIAIABIAGABIADACIABADIAAAdIAcAAIADAAIACADIABAEIAAAIQAAAIgBADQgCAEgDAAIgcAAIAAA8QAAALADAFQAEAFAIABIAFgBIAFgBIADgCIACAAIACAAIABADIABAEIAAAHIgBAJIgCAGIgEACIgGACIgHABIgIAAQgLAAgHgCg");
	this.shape_206.setTransform(789.025,598.3);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#CCD4FF").s().p("AgeBHQgJgDgGgFQgHgFgDgIQgEgIAAgLQAAgLAFgJQAEgIAJgFQAJgFANgDQANgCARAAIAMAAIAAgIIgBgLQgBgFgDgDQgDgDgFgBQgEgCgGAAQgKAAgHACIgNAFIgJAEIgGACIgDgBIgCgDIgBgEIgBgGIABgIQABgCACgCIAHgFQAFgDAHgCIAPgDQAIgCAIAAQAPAAALADQALADAHAHQAHAGADAKQAEAJAAAOIAABXQAAAAAAABQAAAAgBAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAABgBAAQAAAAgBAAQgBABAAAAIgKAAIgJAAQgBAAgBgBQAAAAgBAAQAAAAgBgBQAAAAgBAAIgBgDIAAgLQgIAJgKAFQgLAFgLAAQgLAAgIgDgAgFALQgGABgEADQgEADgCADQgCAEAAAFQAAAIAFAFQAGAFAJAAQAHAAAGgEQAHgEAGgIIAAgWIgOAAQgJAAgFABg");
	this.shape_207.setTransform(776.575,599.925);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#CCD4FF").s().p("AgYBFQgNgEgJgJQgIgJgFgOQgEgNAAgTQAAgQAEgOQAFgOAIgKQAJgJANgGQAMgFAPAAQAQAAALAFQAMAFAHAJQAIAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJACAHQABAGAFAFQAEAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAGgBIACAAIABACIABAEIAAAGIAAAGIAAADIgBADIgCACIgFADIgLAEIgPACQgJACgKAAQgQAAgNgFgAgKgsQgFADgDAEQgDAFgCAGQgCAGAAAHIA2AAQAAgQgHgJQgGgJgOAAQgHAAgFADg");
	this.shape_208.setTransform(761.95,599.925);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#CCD4FF").s().p("AggBIIgFgBIgDgCIgBgDIAAiBIAAgCIAEgDIAEgBIAIAAIAHAAIAGABIACADIABACIAAAQIAJgMIAIgIQAEgDAEgBIAIAAIAEAAIAFAAIAEABIACACIACABIABADIAAAEIAAAJIAAAIIgBAGIgCADIgCAAIgDAAIgDgBIgEgBIgFgBIgGACQgEABgDACIgHAHIgGALIAABQIgBADIgDACIgGABIgJAAIgJAAg");
	this.shape_209.setTransform(750.2,599.8);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#CCD4FF").s().p("AgRBFQgMgEgIgKQgHgJgFgNQgDgNAAgSQAAgSAEgOQAFgOAJgKQAJgJAMgFQAMgEAOAAIALAAIAKADQAFACAEADIAGADIACADIABADIAAAEIAAAGIgBAMQgBAEgCAAQgDAAgDgDIgHgEIgJgFQgFgCgHAAQgOABgHAKQgHALAAAVQgBALACAHQACAJAEAFQADAGAGADQAFACAHAAQAIAAAGgCIAJgFIAHgGQABAAAAAAQABgBAAAAQABAAAAAAQABgBABAAIACABIABADIABAFIAAAHIAAAHIgBAEIgBAEIgBACIgHAEIgKAFIgLACIgNABQgOABgMgFg");
	this.shape_210.setTransform(738,599.9);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#CCD4FF").s().p("AAABXQgIgDgGgGQgFgFgDgKQgCgIAAgNIAAhBIgQAAQgCAAgCgEQgBgDAAgIIAAgIIABgEIACgDIACAAIAQAAIAAgdIABgDIADgCIAGgBIAIgBIAIABIAGABIADACIABADIAAAdIAcAAIADAAIACADIABAEIAAAIQAAAIgBADQgCAEgDAAIgcAAIAAA8QAAALADAFQAEAFAIABIAFgBIAFgBIADgCIACAAIACAAIABADIABAEIAAAHIgBAJIgCAGIgEACIgGACIgHABIgIAAQgLAAgHgCg");
	this.shape_211.setTransform(719.375,598.3);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#CCD4FF").s().p("AgUBJIgMgDIgIgEIgGgDIgCgFIgBgKIAAgGIABgEQABgBAAAAQAAAAAAgBQAAAAABAAQAAAAAAAAIACgBIAFACIAHAEIALAEQAHACAIAAIAIgBIAHgDIADgFQACgDAAgEQAAgEgCgDIgIgGIgJgEIgLgFIgMgFIgKgHQgFgFgDgHQgCgGAAgJQAAgKAEgIQAEgHAGgGQAHgGAKgDQAKgDALAAIAMABIALACIAHADIAFADIACACIABADIAAAEIAAAFIAAAHIgBAEIgBACIgCAAIgEgBIgHgEIgJgDQgGgCgHAAIgIABQgDABgCACQgDACgBADQgBACgBADQAAAFADADQADADAFACIAJAFIAMAEIAMAGQAFADAFAEQAEAEADAHQADAGAAAJQAAALgEAJQgFAIgHAGQgIAGgKADQgKADgLAAIgPgBg");
	this.shape_212.setTransform(708.85,599.925);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#CCD4FF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgJAMgGQANgFAOAAQARAAALAFQAMAFAHAJQAIAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJACAHQADAGAEAFQAEAFAHACQAGADAJAAQAKAAAHgCIANgDIAIgDIAHgBIABAAIACACIABAEIAAAGIAAAGIgBADIgBADIgBACIgFADIgLAEIgPACQgJACgJAAQgRAAgNgFgAgJgsQgGADgDAEQgEAFgCAGQgCAGAAAHIA2AAQABgQgHgJQgGgJgPAAQgFAAgFADg");
	this.shape_213.setTransform(695.2,599.925);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#CCD4FF").s().p("AgCBmQgGgBgFgDQgFgCgFgFQgFgEgFgGIAAAOIgBADIgDACIgFABIgHAAIgIAAIgEgBIgDgCIgBgDIAAi/IABgDQAAAAABAAQAAgBAAAAQABAAAAAAQABgBAAAAIAGgBIAJgBIAJABIAFABIADACIABADIAABIIAKgJIAKgFIAJgEIALgBQAPAAAKAGQAKAGAHAKQAGAJADANQADANAAAOQAAASgEAOQgEANgHAKQgHAKgLAFQgKAGgNAAQgHAAgFgCgAgFgKIgHADIgIAHIgIAJIAAArQAIAKAHAFQAHAFAHAAQAHAAAFgDQAFgEADgGQAEgGABgHIACgPQAAgJgCgHQgBgIgDgGQgDgFgFgEQgFgDgHAAIgHABg");
	this.shape_214.setTransform(680.025,596.925);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#CCD4FF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgJANgGQAMgFAPAAQAQAAALAFQAMAFAHAJQAIAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJABAHQACAGAFAFQAEAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAGgBIACAAIABACIABAEIAAAGIAAAGIgBADIgBADIgBACIgFADIgLAEIgPACQgJACgKAAQgQAAgNgFgAgJgsQgGADgDAEQgEAFgCAGQgBAGAAAHIA2AAQAAgQgHgJQgGgJgOAAQgHAAgEADg");
	this.shape_215.setTransform(657.2,599.925);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#CCD4FF").s().p("AAABXQgIgDgGgGQgFgFgDgKQgCgIAAgNIAAhBIgQAAQgCAAgCgEQgBgDAAgIIAAgIIABgEIACgDIACAAIAQAAIAAgdIABgDIADgCIAGgBIAIgBIAIABIAGABIADACIABADIAAAdIAcAAIADAAIACADIABAEIAAAIQAAAIgBADQgCAEgDAAIgcAAIAAA8QAAALADAFQAEAFAIABIAFgBIAFgBIADgCIACAAIACAAIABADIABAEIAAAHIgBAJIgCAGIgEACIgGACIgHABIgIAAQgLAAgHgCg");
	this.shape_216.setTransform(644.625,598.3);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#CCD4FF").s().p("AgkBEQgJgFgGgHQgFgHgDgLQgDgKABgPIAAhPIABgCIACgCIAGgBIAJAAIAJAAIAFABIAEACIABACIAABJQgBAKACAGQABAFADAEQACAEAFACQAEADAFgBQAGABAIgGQAGgFAJgKIAAhWIABgCIADgCIAFgBIAJAAIAJAAIAFABIAEACIABACIAACCIgBACIgDACIgEABIgIABIgIgBIgFgBIgDgCIAAgCIAAgPQgLAMgLAFQgLAHgMAAQgNgBgJgEg");
	this.shape_217.setTransform(631.55,600.05);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#CCD4FF").s().p("AgIBmIgFgBIgEgCIgBgDIAAi/IABgCQABgBAAAAQAAAAAAgBQABAAAAAAQABAAABgBIAFgBIAIgBIAJABIAGABIACADIABACIAAC/IgBADIgCACIgGABIgJAAIgIAAg");
	this.shape_218.setTransform(619.9,596.8);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#CCD4FF").s().p("AgfBFQgNgFgJgJQgHgKgFgNQgEgNAAgSQAAgPAFgOQAEgOAJgKQAJgKAOgFQANgGAQAAQATAAAMAFQANAFAIAJQAJAJAEAOQAEANAAASQAAAPgFAOQgDAOgKAKQgJAKgNAFQgOAGgQAAQgSAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJACAJQABAIAEAGQADAGAGADQAHADAIAAQAIAAAHgDQAGgDAEgGQADgFACgIQACgJAAgKQAAgJgBgIQgCgIgEgGQgEgGgFgDQgHgEgJAAQgHAAgGADg");
	this.shape_219.setTransform(608.1,599.925);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#CCD4FF").s().p("AgTBJIgMgDIgJgEIgFgDIgDgFIgBgKIABgGIABgEQAAgBAAAAQAAAAAAgBQAAAAABAAQAAAAAAAAIACgBIAFACIAIAEIALAEQAGACAHAAIAIgBIAHgDIAFgFQABgDAAgEQAAgEgDgDIgHgGIgJgEIgMgFIgLgFIgKgHQgFgFgCgHQgDgGAAgJQAAgKADgIQAEgHAHgGQAHgGAKgDQAKgDALAAIAMABIAKACIAIADIAFADIACACIABADIABAEIAAAFIAAAHIgBAEIgBACIgDAAIgEgBIgHgEIgKgDQgFgCgHAAIgHABQgFABgCACIgDAFQgBACAAADQAAAFADADQACADAFACIAJAFIAMAEIALAGQAHADAEAEQAEAEADAHQADAGAAAJQAAALgEAJQgFAIgHAGQgHAGgLADQgKADgMAAIgNgBg");
	this.shape_220.setTransform(594.15,599.925);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#CCD4FF").s().p("AgCBmQgGgBgFgDQgFgCgFgFQgFgEgFgGIAAAOIgBADIgDACIgFABIgHAAIgIAAIgEgBIgDgCIgBgDIAAi/IABgDQAAAAABAAQAAgBAAAAQABAAAAAAQABgBAAAAIAGgBIAJgBIAJABIAFABIADACIABADIAABIIAKgJIAKgFIAJgEIALgBQAPAAAKAGQAKAGAHAKQAGAJADANQADANAAAOQAAASgEAOQgEANgHAKQgHAKgLAFQgKAGgNAAQgHAAgFgCgAgFgKIgHADIgIAHIgIAJIAAArQAIAKAHAFQAHAFAHAAQAHAAAFgDQAFgEADgGQAEgGABgHIACgPQAAgJgCgHQgBgIgDgGQgDgFgFgEQgFgDgHAAIgHABg");
	this.shape_221.setTransform(580.575,596.925);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#CCD4FF").s().p("AgeBHQgJgDgGgFQgHgFgDgIQgEgIAAgLQAAgLAFgJQAEgIAJgFQAJgFANgDQANgCARAAIAMAAIAAgIIgBgLQgBgFgDgDQgDgDgFgBQgEgCgGAAQgKAAgHACIgNAFIgJAEIgGACIgDgBIgCgDIgBgEIgBgGIABgIQABgCACgCIAHgFQAFgDAHgCIAPgDQAIgCAIAAQAPAAALADQALADAHAHQAHAGADAKQAEAJAAAOIAABXQAAAAAAABQAAAAgBAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAABgBAAQAAAAgBAAQAAABgBAAIgKAAIgJAAQgBAAgBgBQAAAAgBAAQAAAAgBgBQAAAAgBAAIgBgDIAAgLQgIAJgKAFQgLAFgLAAQgLAAgIgDgAgFALQgGABgEADQgEADgCADQgCAEAAAFQAAAIAFAFQAGAFAJAAQAHAAAGgEQAHgEAGgIIAAgWIgOAAQgJAAgFABg");
	this.shape_222.setTransform(564.375,599.925);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#CCD4FF").s().p("AgYBFQgNgEgJgJQgJgJgEgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJAMgGQANgFAPAAQAQAAAMAFQALAFAIAJQAHAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJADAHQACAGADAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAFgBIACAAIACACIABAEIAAAGIAAAGIAAADIgBADIgCACIgFADIgLAEIgPACQgIACgKAAQgQAAgOgFgAgKgsQgFADgDAEQgEAFgBAGQgDAGAAAHIA2AAQABgQgGgJQgIgJgOAAQgGAAgFADg");
	this.shape_223.setTransform(542.95,599.925);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#CCD4FF").s().p("AAjBmIgGgBIgDgCIAAgDIAAhKQgBgKgBgFQgCgGgCgCQgCgEgEgCQgFgDgGAAQgGABgGAFQgIAEgIAKIAABWIgBADIgCACIgGABIgJAAIgJAAIgFgBIgEgCIgBgDIAAi/IABgCQABgBAAAAQAAAAAAgBQABAAAAAAQABAAABgBIAFgBIAJgBIAJABIAGABIACADIABACIAABIQAKgJAKgFQAJgEALAAQANAAAJAEQAJAFAGAHQAFAHADALQACAJABAOIAABQIgBADIgDACIgGABIgJAAIgJAAg");
	this.shape_224.setTransform(527.45,596.8);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#CCD4FF").s().p("AAABXQgIgDgGgGQgFgFgDgKQgCgIAAgNIAAhBIgQAAQgCAAgCgEQgBgDAAgIIAAgIIABgEIACgDIACAAIAQAAIAAgdIABgDIADgCIAGgBIAIgBIAIABIAGABIADACIABADIAAAdIAcAAIADAAIACADIABAEIAAAIQAAAIgBADQgCAEgDAAIgcAAIAAA8QAAALADAFQAEAFAIABIAFgBIAFgBIADgCIACAAIACAAIABADIABAEIAAAHIgBAJIgCAGIgEACIgGACIgHABIgIAAQgLAAgHgCg");
	this.shape_225.setTransform(513.925,598.3);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#CCD4FF").s().p("AAjBmIgGgBIgDgCIAAgDIAAhKQgBgKgBgFQgCgGgCgCQgCgEgEgCQgFgDgGAAQgGABgGAFQgIAEgIAKIAABWIgBADIgCACIgGABIgJAAIgJAAIgFgBIgEgCIgBgDIAAi/IABgCQABgBAAAAQAAAAAAgBQABAAAAAAQABAAABgBIAFgBIAJgBIAJABIAGABIACADIABACIAABIQAKgJAKgFQAJgEALAAQANAAAJAEQAJAFAGAHQAFAHADALQACAJAAAOIAABQIAAADIgDACIgGABIgJAAIgJAAg");
	this.shape_226.setTransform(494.15,596.8);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#CCD4FF").s().p("AAABXQgIgDgGgGQgFgFgDgKQgCgIAAgNIAAhBIgQAAQgCAAgCgEQgBgDAAgIIAAgIIABgEIACgDIACAAIAQAAIAAgdIABgDIADgCIAGgBIAIgBIAIABIAGABIADACIABADIAAAdIAcAAIADAAIACADIABAEIAAAIQAAAIgBADQgCAEgDAAIgcAAIAAA8QAAALADAFQAEAFAIABIAFgBIAFgBIADgCIACAAIACAAIABADIABAEIAAAHIgBAJIgCAGIgEACIgGACIgHABIgIAAQgLAAgHgCg");
	this.shape_227.setTransform(480.625,598.3);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#CCD4FF").s().p("AgIBjIgFgBIgDgCIgBgCIAAiCIABgCIADgBIAFgCIAIAAIAJAAIAGACIADABIABACIAACCIgBACIgDACIgGABIgJABIgIgBgAgQhBQgEgDAAgLQAAgMAEgDQAFgFALAAQANAAAEAFQAEADAAALQAAAMgEADQgFAEgMABQgLgBgFgEg");
	this.shape_228.setTransform(471.975,597.05);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#CCD4FF").s().p("AAiBHIgHgBIgEgDIgCgEIgVhOIAAgBIAAABIgUBOIgCAEIgEADIgHABIgMAAIgLAAIgHgBIgEgDIgCgEIgjh1IgBgHIgBgEIABgCIADgCIAGgBIAJAAIAJAAIAGABQABAAAAABQABAAAAAAQAAAAAAABQABAAAAAAIABADIAaBfIAAACIABgCIAYhfIABgDIADgCIAGgBIAHAAIAJAAIAGABIACACIACACIAaBgIAAACIAAgCIAZhfIACgDQAAAAAAAAQAAgBABAAQAAAAAAAAQABgBAAAAIAGgBIAJAAIAJAAIAFABIADACIABACIgBAEIgBAHIgjB1IgCAEIgEADIgHABIgLAAIgMAAg");
	this.shape_229.setTransform(457.125,599.925);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#CCD4FF").s().p("AgUBJIgLgDIgJgEIgGgDIgCgFIgBgKIABgGIAAgEQABgBAAAAQAAAAAAgBQAAAAABAAQAAAAAAAAIACgBIAFACIAIAEIALAEQAGACAIAAIAIgBIAGgDIAFgFQABgDAAgEQAAgEgCgDIgIgGIgJgEIgMgFIgLgFIgKgHQgFgFgDgHQgCgGAAgJQAAgKADgIQAFgHAGgGQAHgGAKgDQAKgDALAAIAMABIAKACIAIADIAFADIACACIABADIAAAEIAAAFIAAAHIgBAEIAAACIgDAAIgEgBIgHgEIgKgDQgFgCgHAAIgIABQgEABgCACIgDAFQgCACABADQAAAFACADQADADAFACIAJAFIAMAEIAMAGQAFADAFAEQAFAEACAHQADAGAAAJQAAALgEAJQgFAIgHAGQgIAGgKADQgKADgLAAIgPgBg");
	this.shape_230.setTransform(433.25,599.925);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#CCD4FF").s().p("AAABXQgIgDgGgGQgFgFgDgKQgCgIAAgNIAAhBIgQAAQgCAAgCgEQgBgDAAgIIAAgIIABgEIACgDIACAAIAQAAIAAgdIABgDIADgCIAGgBIAIgBIAIABIAGABIADACIABADIAAAdIAcAAIADAAIACADIABAEIAAAIQAAAIgBADQgCAEgDAAIgcAAIAAA8QAAALADAFQAEAFAIABIAFgBIAFgBIADgCIACAAIACAAIABADIABAEIAAAHIgBAJIgCAGIgEACIgGACIgHABIgIAAQgLAAgHgCg");
	this.shape_231.setTransform(421.775,598.3);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#CCD4FF").s().p("AAjBIIgGgBIgDgCIAAgDIAAhJQgBgKgBgFQgCgGgCgDQgCgEgEgCQgFgDgGAAQgGABgGAFQgIAFgIAKIAABVIgBADIgCACIgGABIgJAAIgJAAIgFgBIgEgCIgBgDIAAiBIABgCIADgDIAFgBIAIAAIAHAAIAFABIACADIABACIAAAPQALgMALgFQAKgHANABQANAAAJAEQAJAFAGAHQAFAIADAKQACAJABAPIAABPIgBADIgDACIgGABIgJAAIgJAAg");
	this.shape_232.setTransform(409.1,599.8);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#CCD4FF").s().p("AgYBFQgNgEgJgJQgIgJgFgOQgEgNAAgTQAAgQAEgOQAFgOAIgKQAJgJANgGQAMgFAPAAQAQAAALAFQAMAFAHAJQAIAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJACAHQABAGAFAFQAEAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAGgBIACAAIABACIABAEIAAAGIAAAGIgBADIAAADIgCACIgFADIgLAEIgPACQgJACgKAAQgQAAgNgFgAgKgsQgFADgDAEQgDAFgCAGQgCAGAAAHIA2AAQAAgQgHgJQgGgJgOAAQgHAAgFADg");
	this.shape_233.setTransform(393.4,599.925);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#CCD4FF").s().p("AgIBjIgFgBIgDgCIgBgCIAAiCIABgCIADgBIAFgCIAIAAIAJAAIAGACIADABIABACIAACCIgBACIgDACIgGABIgJABIgIgBgAgQhBQgEgDAAgLQAAgMAEgDQAFgFALAAQANAAAEAFQAEADAAALQAAAMgEADQgFAEgMABQgLgBgFgEg");
	this.shape_234.setTransform(382.225,597.05);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#CCD4FF").s().p("AgIBmIgGgBIgDgCIgBgDIAAi/IABgCQABgBAAAAQAAAAAAgBQABAAAAAAQABAAAAgBIAGgBIAIgBIAJABIAGABIACADIABACIAAC/IgBADIgCACIgGABIgJAAIgIAAg");
	this.shape_235.setTransform(374.9,596.8);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#CCD4FF").s().p("AgRBFQgMgEgIgKQgIgJgEgNQgDgNAAgSQAAgSAEgOQAGgOAIgKQAJgJAMgFQAMgEANAAIAMAAIAKADQAGACADADIAFADIADADIABADIAAAEIAAAGIgBAMQgBAEgCAAQgDAAgDgDIgGgEIgJgFQgGgCgHAAQgOABgHAKQgHALAAAVQgBALACAHQACAJAEAFQADAGAGADQAFACAHAAQAIAAAGgCIAJgFIAHgGQABAAAAAAQABgBAAAAQABAAAAAAQABgBAAAAIADABIABADIABAFIABAHIgBAHIgBAEIgBAEIgCACIgGAEIgKAFIgLACIgNABQgOABgMgFg");
	this.shape_236.setTransform(365.05,599.9);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("#CCD4FF").s().p("AggBIIgFgBIgDgCIgBgDIAAiBIAAgCIAEgDIAEgBIAIAAIAIAAIAEABIADADIABACIAAAQIAJgMIAIgIQAEgDAEgBIAIAAIAFAAIAEAAIAEABIACACIABABIABADIAAAEIABAJIgBAIIgBAGIgBADIgCAAIgDAAIgDgBIgEgBIgFgBIgGACQgDABgDACIgIAHIgGALIAABQIgBADIgDACIgGABIgJAAIgJAAg");
	this.shape_237.setTransform(347.25,599.8);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#CCD4FF").s().p("AgkBEQgJgFgFgHQgGgHgDgLQgCgKAAgPIAAhPIABgCIACgCIAGgBIAJAAIAJAAIAFABIAEACIABACIAABJQgBAKACAGQABAFADAEQACAEAFACQAEADAFgBQAGABAIgGQAGgFAJgKIAAhWIABgCIADgCIAFgBIAJAAIAJAAIAFABIADACIACACIAACCIgCACIgCACIgEABIgIABIgIgBIgFgBIgDgCIAAgCIAAgPQgLAMgLAFQgLAHgMAAQgNgBgJgEg");
	this.shape_238.setTransform(333.1,600.05);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#CCD4FF").s().p("AgfBFQgNgFgIgJQgJgKgEgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKANgFQAOgGARAAQARAAANAFQANAFAJAJQAIAJAEAOQAEANAAASQAAAPgFAOQgEAOgIAKQgJAKgOAFQgNAGgRAAQgSAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQAEAGAFADQAHADAIAAQAIAAAGgDQAHgDADgGQAEgFACgIQACgJAAgKQAAgJgCgIQgBgIgDgGQgFgGgGgDQgGgEgIAAQgIAAgGADg");
	this.shape_239.setTransform(317,599.925);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#CCD4FF").s().p("AgYBFQgNgEgJgJQgJgJgEgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJAMgGQANgFAPAAQAQAAAMAFQALAFAIAJQAHAIAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJADAHQACAGADAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAFgBIACAAIACACIABAEIAAAGIAAAGIAAADIgBADIgCACIgFADIgLAEIgPACQgIACgKAAQgQAAgOgFgAgKgsQgFADgDAEQgEAFgBAGQgDAGAAAHIA2AAQABgQgGgJQgIgJgOAAQgGAAgFADg");
	this.shape_240.setTransform(294.55,599.925);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#CCD4FF").s().p("AgjBhQgLgFgGgKQgHgKgDgNQgDgNAAgOQAAgSAEgOQAEgNAHgJQAHgLALgFQAKgFAOAAQAKAAAJAFQAJAEAJAIIAAhGIABgDIADgCIAFgBIAJAAIAJAAIAGABIADACIABADIAAC/IgBADIgDABIgEABIgIABIgHgBIgFgBIgDgBIgBgDIAAgPQgKAMgLAFQgLAHgMAAQgPAAgKgHgAgNgIQgFAEgDAEQgDAHgCAHQgBAHAAAIIABAQQABAHADAHQADAGAFAEQAFADAIAAIAGgBIAIgDIAHgHIAJgKIAAgsQgIgIgHgGQgHgFgHAAQgHAAgGAEg");
	this.shape_241.setTransform(278.625,596.95);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#CCD4FF").s().p("AgIBjIgFgBIgDgCIgBgCIAAiCIABgCIADgBIAFgCIAIAAIAJAAIAGACIADABIABACIAACCIgBACIgDACIgGABIgJABIgIgBgAgQhBQgEgDAAgLQAAgMAEgDQAFgFALAAQANAAAEAFQAEADAAALQAAAMgEADQgFAEgMABQgLgBgFgEg");
	this.shape_242.setTransform(267.275,597.05);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#CCD4FF").s().p("AgLBHIgIgBIgEgDIgCgEIgnh1IgCgFIAAgEIgBgCIABgCIADgCIAGgBIAJAAIAJAAIAGABIADACIACADIAcBfIABAEIABgEIAdhfIACgDIADgCIAFgBIAJAAIAJAAIAGABIACACIABACIAAACIAAADIgBACIgBAEIgnB1IgCAEIgEADIgIABIgNAAIgLAAg");
	this.shape_243.setTransform(256.475,599.925);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#CCD4FF").s().p("AgfBFQgNgFgIgJQgJgKgEgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKANgFQAOgGARAAQARAAANAFQANAFAJAJQAIAJAEAOQAEANAAASQAAAPgFAOQgEAOgIAKQgJAKgOAFQgNAGgRAAQgSAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQAEAGAFADQAHADAIAAQAIAAAGgDQAHgDADgGQAEgFACgIQACgJAAgKQAAgJgCgIQgBgIgDgGQgFgGgGgDQgGgEgIAAQgIAAgGADg");
	this.shape_244.setTransform(241.4,599.925);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#CCD4FF").s().p("AggBIIgFgBIgDgCIgBgDIAAiBIAAgCIAEgDIAEgBIAIAAIAHAAIAGABIACADIABACIAAAQIAJgMIAIgIQAEgDAEgBIAIAAIAEAAIAFAAIAEABIACACIACABIABADIAAAEIAAAJIAAAIIgBAGIgCADIgCAAIgDAAIgDgBIgEgBIgFgBIgGACQgEABgDACIgHAHIgGALIAABQIgBADIgDACIgGABIgJAAIgJAAg");
	this.shape_245.setTransform(229.1,599.8);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#CCD4FF").s().p("Ag3BiIgGgBIgDgCIgBgDIAAi1IABgCIADgDIAEgBIAIAAIAHAAIAFABIADADIAAACIAAAPIAMgKIALgHIALgFQAGgCAHABQAOAAAKAFQAKAGAHAJQAGALADANQADANAAAPQAAAQgEAOQgEANgHALQgHAJgLAGQgKAFgOAAIgKgBIgJgDIgJgGIgJgIIAAA9IgBADIgDACIgFABIgJABIgJgBgAgEhBQgEABgEADIgIAGIgIAKIAAArQAIAJAHAFQAHAFAHABQAHgBAFgDQAFgEADgGQADgEACgIIABgPIgBgQQgBgIgDgGQgDgGgFgDQgFgEgHAAIgGABg");
	this.shape_246.setTransform(215.375,602.4);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#CCD4FF").s().p("AgfBFQgNgFgJgJQgHgKgFgNQgEgNAAgSQAAgPAEgOQAFgOAJgKQAJgKANgFQANgGASAAQASAAAMAFQANAFAIAJQAJAJAEAOQAEANAAASQAAAPgEAOQgFAOgJAKQgIAKgOAFQgNAGgSAAQgRAAgNgFgAgNgpQgGADgEAGQgEAGgCAIQgCAIAAAKQAAAJABAJQACAIAEAGQADAGAHADQAFADAJAAQAIAAAGgDQAGgDAEgGQAEgFACgIQACgJAAgKQAAgJgBgIQgCgIgEgGQgDgGgHgDQgFgEgKAAQgHAAgGADg");
	this.shape_247.setTransform(192.05,599.925);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#CCD4FF").s().p("AAABXQgIgDgGgGQgFgFgDgKQgCgIAAgNIAAhBIgQAAQgCAAgCgEQgBgDAAgIIAAgIIABgEIACgDIACAAIAQAAIAAgdIABgDIADgCIAGgBIAIgBIAIABIAGABIADACIABADIAAAdIAcAAIADAAIACADIABAEIAAAIQAAAIgBADQgCAEgDAAIgcAAIAAA8QAAALADAFQAEAFAIABIAFgBIAFgBIADgCIACAAIACAAIABADIABAEIAAAHIgBAJIgCAGIgEACIgGACIgHABIgIAAQgLAAgHgCg");
	this.shape_248.setTransform(178.875,598.3);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f("#CCD4FF").s().p("AgYBFQgNgEgIgJQgKgJgEgOQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgJANgGQAMgFAPAAQAQAAALAFQAMAFAHAJQAIAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJACAHQABAGAFAFQAEAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAGgBIACAAIABACIABAEIAAAGIAAAGIgBADIgBADIgBACIgFADIgLAEIgPACQgJACgKAAQgQAAgNgFgAgJgsQgGADgDAEQgDAFgCAGQgCAGAAAHIA2AAQAAgQgHgJQgGgJgOAAQgHAAgEADg");
	this.shape_249.setTransform(159.5,599.925);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#CCD4FF").s().p("AgLBHIgIgBIgEgDIgCgEIgnh1IgCgFIAAgEIgBgCIABgCIADgCIAGgBIAJAAIAJAAIAGABIADACIACADIAcBfIABAEIABgEIAdhfIACgDIADgCIAFgBIAJAAIAJAAIAGABIACACIABACIAAACIAAADIgBACIgBAEIgnB1IgCAEIgEADIgIABIgNAAIgLAAg");
	this.shape_250.setTransform(145.175,599.925);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f("#CCD4FF").s().p("AgIBjIgFgBIgDgCIgBgCIAAiCIABgCIADgBIAFgCIAIAAIAJAAIAGACIADABIABACIAACCIgBACIgDACIgGABIgJABIgIgBgAgQhBQgEgDAAgLQAAgMAEgDQAFgFALAAQANAAAEAFQAEADAAALQAAAMgEADQgFAEgMABQgLgBgFgEg");
	this.shape_251.setTransform(134.425,597.05);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#CCD4FF").s().p("AgfBIIgGgBIgDgCIgBgDIAAiBIABgCIADgDIAEgBIAIAAIAHAAIAGABIACADIAAACIAAAQIAKgMIAIgIQAEgDAEgBIAIAAIAEAAIAFAAIAEABIADACIABABIABADIAAAEIAAAJIAAAIIgBAGIgBADIgDAAIgDAAIgDgBIgEgBIgFgBIgGACQgEABgDACIgHAHIgGALIAABQIgBADIgDACIgFABIgJAAIgJAAg");
	this.shape_252.setTransform(126.15,599.8);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f("#CCD4FF").s().p("AAABXQgIgDgGgGQgFgFgDgKQgCgIAAgNIAAhBIgQAAQgCAAgCgEQgBgDAAgIIAAgIIABgEIACgDIACAAIAQAAIAAgdIABgDIADgCIAGgBIAIgBIAIABIAGABIADACIABADIAAAdIAcAAIADAAIACADIABAEIAAAIQAAAIgBADQgCAEgDAAIgcAAIAAA8QAAALADAFQAEAFAIABIAFgBIAFgBIADgCIACAAIACAAIABADIABAEIAAAHIgBAJIgCAGIgEACIgGACIgHABIgIAAQgLAAgHgCg");
	this.shape_253.setTransform(114.675,598.3);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#CCD4FF").s().p("AgUBJIgMgDIgJgEIgEgDIgDgFIgBgKIAAgGIABgEQABgBAAAAQAAAAAAgBQAAAAABAAQAAAAAAAAIACgBIAFACIAHAEIALAEQAHACAIAAIAIgBIAHgDIADgFQACgDAAgEQAAgEgDgDIgHgGIgJgEIgLgFIgMgFIgKgHQgEgFgDgHQgDgGAAgJQAAgKAEgIQAEgHAGgGQAHgGAKgDQAKgDALAAIAMABIALACIAIADIAEADIACACIABADIAAAEIAAAFIAAAHIgBAEIgBACIgCAAIgEgBIgHgEIgJgDQgGgCgHAAIgIABQgDABgCACQgDACgBADQgBACgBADQAAAFADADQADADAFACIAJAFIAMAEIALAGQAGADAFAEQAEAEADAHQADAGAAAJQAAALgEAJQgEAIgIAGQgIAGgKADQgLADgLAAIgOgBg");
	this.shape_254.setTransform(104.15,599.925);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f("#CCD4FF").s().p("AgYBFQgNgEgJgJQgIgJgFgOQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgJANgGQAMgFAPAAQAQAAAMAFQALAFAIAJQAHAIADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhOAAQAAAJACAHQABAGAEAFQAFAFAHACQAGADAJAAQAKAAAHgCIANgDIAJgDIAFgBIADAAIABACIABAEIAAAGIAAAGIAAADIgBADIgCACIgFADIgLAEIgPACQgIACgLAAQgPAAgOgFgAgKgsQgFADgDAEQgDAFgCAGQgCAGAAAHIA2AAQAAgQgHgJQgHgJgNAAQgGAAgGADg");
	this.shape_255.setTransform(83.7,599.925);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#CCD4FF").s().p("AAsBfIgIgBQgEgBgBgCIgCgGIgdh3IAAAAIgdB3IgCAGIgEADIgIABIgNABIgNgBIgJgBQgCgBgCgCIgCgGIgrikIgCgJQAAAAABgBQAAgBAAAAQAAgBAAAAQABgBAAAAQACgCAEAAIAMgBIALABIAGABQABAAAAAAQAAAAABABQAAAAAAAAQAAAAABABIABAEIAhCQIAiiPIADgEQAAgBAAAAQAAgBABAAQAAAAAAAAQABgBABAAIAGgBIAJgBIALABIAHABIADADIACAEIAjCPIABAAIAhiPIABgEQAAgBABAAQAAgBAAAAQABAAAAAAQABgBAAAAIAGgBIAKgBIAKABIAGACQAAAAABABQAAAAAAABQAAAAAAABQAAABAAAAIgBAJIgsCkIgCAGIgFADIgIABIgMABIgNgBg");
	this.shape_256.setTransform(63.65,597.475);

	this.instance_11 = new lib.logo_full();
	this.instance_11.setTransform(550.95,316.8,1,1,0,0,0,502.9,164.2);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f("#CCD4FF").s().p("AljCCIgJAAIgFgCQgBAAAAgBQAAAAgBgBQAAAAAAAAQAAgBAAAAIABgEQAMgdAHgeQAGgeAAggQAAgggGgeQgHgegMgdIAAgDQAAgBAAAAQAAgBAAAAQAAAAABAAQAAgBABAAIAFgCIAJAAIAHAAIAFABIACABIABABQAQAfAIAfQAHAgABAgQAAAQgCAQQgCAQgEAQQgEAQgFAPQgHAPgIAQIgBACIgDABIgFABIgHAAgAtuCCIgFgBIgDgBIgCgCQgHgQgGgPQgHgPgDgQQgEgQgCgQQgCgQAAgQQAAgQACgPQACgRAEgQQAEgQAGgPQAGgPAHgQIABgBIADgBIAFgBIAHAAIAJAAIAGACIACADIgBADQgNAdgFAeQgHAeAAAgQAAAgAHAeQAFAeANAdIABAEIgCADIgFACIgJAAIgHAAgAM5BRIgMgCIgJgDIgEgDQgCgCgBgDIgBgIIABgIIABgEIABgCIACAAIAFABIAIACIALACIAMABQANAAAIgEQAJgFAFgHQAGgIACgJQADgKgBgKQgGADgKADQgJADgMAAQgQAAgKgDQgLgEgGgHQgHgHgDgLQgDgLAAgNQAAgPAEgMQAFgMAIgIQAJgJAMgFQAMgEAQAAQAOAAAKACQAKAEAHAFQAHAGAFAJQAEAHADALQADAJABAMIABAYIgBAYQgBALgDAMQgEAMgFALQgGAKgKAJQgJAHgNAFQgNAFgSAAIgMgBgANKhSQgFADgDAEQgEAFgCAGQgBAGAAAHQAAAHABAHQACAFADAEQADAFAEABQAGACAHAAQAIAAAIgCQAHgDAGgEQgBgQgBgLQgCgKgEgHQgDgFgFgDQgGgDgGAAQgIAAgEACgAF5BPQgKgDgHgGQgHgGgFgHQgEgJgDgJQgDgLgBgMIgBgYIABgXQABgNADgLQAEgLAFgLQAFgLAKgIQAJgIANgFQANgEARAAIALABIALABIAIACIAEADIACACIABACIABAEIAAAFIAAAIIgCAEIgBADIgCAAIgFAAIgHgDIgJgCIgNgBQgLAAgJAFQgIAEgFAIQgFAHgCAKQgCAKgBALIAHgEIAJgEIAMgCIAMgBQAOAAAKAEQALAEAGAIQAGAGAEALQADAKAAAMQgBAPgEAMQgEAMgJAJQgIAJgNAFQgMAFgRAAQgNAAgJgDgAGLgKIgHACIgIAEIgGADQAAAPACAKQACALADAGQADAGAFADQAGACAHAAQAHAAAEgCQAFgDAEgEIAFgLQACgGAAgHIgBgNQgCgGgDgDQgDgDgFgDQgFgCgGAAIgJABgAgaBOQgMgCgIgHQgIgGgFgJQgEgKABgLQAAgJACgHQACgHAFgFQAFgFAHgGQAHgGAJgEIgNgJQgGgFgEgGQgEgFgDgHQgCgHAAgIQAAgLAEgJQAEgKAIgGQAIgHAMgEQAMgEAPABQAQgBALAEQALAEAHAFQAHAHAEAJQADAIAAAKQAAAHgCAGQgDAHgEAGQgDAGgHAFQgGAFgHAEQAIAFAHAFQAHAFAGAGQAEAGADAHQACAGABAJQgBAMgEAKQgEALgJAHQgJAGgNAEQgNAEgRAAQgPAAgMgEgAgJAEIgJAIQgEAEgBAFQgBAEgBAFQAAALAIAHQAHAFAOAAQAOAAAIgFQAGgHABgKQAAgGgDgEQgBgFgEgEQgEgEgGgDIgOgHIgKAGgAgOhPQgGAFAAAKQAAAEACAEQABAFADADIAIAHIAMAHQAKgGAHgIQAFgGAAgKQAAgEgBgFQgCgDgDgDQgDgEgFgBQgFgCgGABQgLgBgGAHgAizBRIgLgCIgIgDIgGgDQgBgCgBgDIgBgIIAAgIIABgEIACgCIACAAIAFABIAIACIAKACIAOABQAMAAAJgEQAIgFAFgHQAFgIADgJQADgKAAgKQgHADgJADQgKADgNAAQgOAAgLgDQgKgEgHgHQgHgHgDgLQgDgLAAgNQAAgPAFgMQADgMAJgIQAIgJANgFQAMgEARAAQANAAAKACQAJAEAIAFQAHAGAEAJQAFAHADALQADAJABAMIABAYIgBAYQgCALgDAMQgDAMgGALQgFAKgKAJQgJAHgNAFQgNAFgSAAIgNgBgAihhSQgFADgEAEQgDAFgBAGQgCAGAAAHQAAAHACAHQAAAFAEAEQADAFAFABQAFACAGAAQAJAAAIgCQAHgDAFgEQAAgQgBgLQgCgKgDgHQgEgFgFgDQgFgDgIAAQgGAAgFACgAnpBQIgPgDIgLgEIgGgEIgBgCIgBgDIgBgGIAAgHIABgKQAAAAAAgBQABAAAAgBQABAAAAAAQABAAAAAAIAGABIAJAFIAMAEQAIACAJAAQAIAAAHgCQAFgCAFgDQAEgDADgGQACgEAAgHQgBgGgCgFQgCgFgFgEQgGgEgHgBQgIgCgLAAIgQAAIgDgBQAAAAgBAAQAAAAAAAAQgBgBAAAAQAAgBAAAAIgBgEIgBgIIABgGIABgFIACgCIADAAIAQAAQAJAAAHgCQAGgCAEgEQAFgEADgFQABgFAAgGQABgFgCgEQgBgFgEgDQgDgDgFgCQgFgCgHAAQgHAAgHACIgMAFIgJAGIgFACIgDAAIgBgCIgBgFIgBgHIABgGIAAgEIABgDIADgCIAFgFQAFgDAHgCQAHgDAJgCQAJgBAKAAQAOgBALAEQAKADAIAGQAHAGAEAJQADAJABALQAAAIgCAIQgDAIgEAFQgFAHgFADQgHAFgJABIAAABQAKABAJAEQAIAEAFAGQAFAFADAHQADAHAAAJQAAAOgGALQgEALgLAIQgJAHgNAEQgOAEgQAAQgKAAgIgCgAqBBRIgPgDIgKgDIgGgDIgCgDIAAgCIgBgGIAAgGIAAgHIABgFIACgCIACgBIAEACIAJAEIALAEQAHABAKAAQAIAAAIgBQAGgDAFgDQAFgEADgGQADgGgBgIQABgHgDgGQgCgFgFgDQgEgEgIgBQgHgCgLgBIgQACIgMAAQgFAAgCgCQgBgCAAgFIAAhTQgBgGADgDQACgCAFAAIBaAAIACABIACADIABAEIABAIQAAAJgCAEQgBAEgDAAIhEAAIAAAoIAKAAIAMgBQAPAAAMAFQAMADAIAHQAIAGAEALQAEAKABANQgBAQgFALQgGANgJAIQgKAIgNAEQgPAFgQAAIgQgBgAKaBPIgHgCQAAAAgBAAQAAgBAAAAQgBAAAAgBQAAAAAAAAIABgFIBDiSIhPAAQgDAAgCgFQgBgDgBgKIABgHIABgFIACgDIADgBIBwAAIAFAAIACACIACAGIAAAIIAAAIIgBAFIgBAFIgCAGIg+CQIgCADIgFABIgGABIgKAAIgMAAgAI8BPIgGgBIgDgCIgBgCIAAgjIhJAAIgEAAIgCgCIgBgGIgBgJIAAgIIABgHIACgEIABgFIA8hoIACgCIAFgCIAIgBIAMAAIANAAIAIABIAEACIACAEIAABwIAQAAQADAAACAEQACAEgBAIQABAHgCAEQgBAEgEAAIgQAAIAAAjIgBACIgDACIgGABIgJAAIgIAAgAIAAIIAyAAIAAhVIgBAAgAB2BPIgHgCQAAAAgBAAQAAgBAAAAQgBAAAAgBQAAAAAAAAIABgFIBDiSIhPAAQgDAAgCgFQgBgDgBgKIABgHIABgFIACgDIADgBIBwAAIAFAAIACACIACAGIAAAIIAAAIIgBAFIgBAFIgCAGIg/CQIgBADIgFABIgGABIgJAAIgNAAgAswBOIgFAAQgBAAgBAAQAAgBgBAAQAAAAgBgBQAAAAgBAAQgBgCgBgEIAAgIIAAgIIACgGIADgFIAEgGIAigjIAPgRQAHgJACgHQAEgHABgGIABgLQABgFgCgEQgBgFgEgDQgDgDgEgCQgEgBgHAAQgIAAgHACQgGABgGADIgIAFIgFACIgCAAIgDgDIAAgGIgBgIIAAgFIABgFIACgCIACgDIAHgFQAEgDAIgDIAQgEQAIgBAKAAQAPAAALADQAKAEAIAHQAHAGAEAJQAEAKgBAKQAAAJgCAJQgBAKgGAJQgFALgLAMQgJAMgRAQIgXAYIBLAAIADAAIADADIAAAFIABAHIgBAHIAAAFIgCADIgDAAgAD3AUQgDAAgCgEQgCgDAAgIQAAgIACgDQACgDADAAIA9AAIADAAIACADIACAFIAAAGQgBAIgBADQgCAEgDAAg");
	this.shape_257.setTransform(143.6,816.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_257},{t:this.instance_11},{t:this.shape_256},{t:this.shape_255},{t:this.shape_254},{t:this.shape_253},{t:this.shape_252},{t:this.shape_251},{t:this.shape_250},{t:this.shape_249},{t:this.shape_248},{t:this.shape_247},{t:this.shape_246},{t:this.shape_245},{t:this.shape_244},{t:this.shape_243},{t:this.shape_242},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.shape_238},{t:this.shape_237},{t:this.shape_236},{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78}]}).wait(125));

	// blue
	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f().s("#CCD4FF").ss(4,1,1).p("AzSkIMAmlAAAQA8AAAAA8IAAGZQAAA8g8AAMgmlAAAQg8AAAAg8IAAmZQAAg8A8AAg");
	this.shape_258.setTransform(180.675,887.85);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f("#CCD4FF").s().p("AphB6IgGgBIgCgBIgBgDIAAg+IgKAJIgLAFIgKAEIgLABQgOAAgLgHQgJgFgGgKQgHgKgDgNQgDgNAAgOQAAgRAEgOQADgOAIgJQAIgLAKgEQALgGAOAAIAKABQAFABAFADIAKAHIAMALIAAgPIABgCIADgCIAEgBIAIAAIAIAAIAEABQABAAAAAAQAAAAABABQAAAAAAAAQAAABABAAIABACIAAC2IgBADIgEABIgFABIgJABIgJgBgAqVgmQgFAEgDAFQgEAHgBAHQgCAHAAAIIACAPQABAIADAGQADAGAFAEQAFADAHAAIAIgBIAIgDIAHgHIAJgKIAAgrQgIgJgIgGQgHgFgIAAQgGAAgGAEgAG7BmQgJgDgIgFIgTgMQgJgHgIgJQgIADgJACQgJACgMABQgXgBgQgFQgQgGgMgMQgLgLgFgTQgFgSAAgYQAAgYAFgSQAHgTALgMQALgNASgHQAQgHAYAAQAUAAARAGQAQAFALANQAMALAFASQAGASAAAZQAAANgBALQgCAKgEAKQgDAJgFAIQgEAIgGAGIAQAMIAMAGIAIADIAEADQACABABAEIAAAKIAAAIIgCAGQAAAAAAAAQAAABgBAAQAAAAAAABQgBAAAAAAIgCAAQgFAAgHgCgAFKhVQgKAFgFAJQgGAJgCAMQgDAMAAANQAAAQADAMQACAMAFAIQAGAKAJAEQAKAFAOgBQAOAAAJgEQAKgGAGgJQAGgJADgMQABgMAAgNQAAgPgBgMQgDgMgGgJQgFgJgKgEQgJgFgOgBQgPAAgJAGgAOjBFQgNgFgIgIQgKgKgEgNQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgKANgFQAMgFAQAAQAQAAALAFQAMAFAHAIQAIAJADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJABAGQACAHAFAFQAEAEAHADQAHADAJAAQAKAAAHgCIANgDIAJgDIAGgBIACAAIABACIABAEIAAAGIAAAGIgBADIAAADIgCACIgFADIgLADIgPADQgJABgKABQgRgBgNgEgAOygsQgGADgDAEQgDAEgDAHQgBAFAAAHIA3AAQAAgPgHgJQgGgJgOAAQgIAAgEADgAKcBEQgOgFgIgIQgIgKgEgNQgEgOgBgRQAAgQAFgOQAFgOAIgJQAJgKAOgFQANgGASAAQASAAANAFQANAFAIAJQAIAJAFANQAEAOgBARQAAAQgEAOQgEAOgJAJQgJAKgNAGQgOAFgSABQgSAAgMgGgAKugpQgHADgDAGQgFAFgBAJQgCAIAAAKQAAAJABAJQABAIAEAFQAEAHAGACQAGAEAJAAQAJAAAGgDQAGgDAEgGQAEgGACgHQACgJAAgKQgBgJgBgIQgBgIgEgGQgEgGgGgDQgGgEgJAAQgJAAgFADgAH1BFQgJgFgFgHQgHgHgCgLQgDgKAAgPIAAhPIABgCIAEgCIAFgBIAJAAIAJAAIAFABIADACIABACIAABJQAAAKACAGQABAGADADQADAEAEACQAEADAGgBQAGAAAHgFQAIgFAIgKIAAhWIAAgCIAEgCIAFgBIAJAAIAJAAIAGABIACACIABACIAACCIgBACIgCACIgFABIgIABIgHgBIgFgBIgCgCIgBgCIAAgPQgLALgLAGQgLAHgMAAQgOgBgJgEgABLBGQgJgCgGgFQgHgFgDgJQgEgIABgKQgBgLAFgJQAEgIAKgFQAIgGANgCQAOgCARgBIANAAIAAgIIgBgKQgCgFgDgDQgCgDgGgBQgEgCgHAAQgJAAgIACIgMAEIgJAFIgHACIgCgBIgCgDIgCgEIgBgHIACgHQAAgCACgDIAIgEQAEgDAHgCIAQgDQAHgCAJAAQAQAAAKADQAMADAGAHQAHAFAEALQADAJAAANIAABYQAAAAAAAAQAAABAAAAQgBABAAAAQAAAAAAAAQgBABAAAAQgBAAAAABQgBAAgBAAQAAAAgBAAIgKABIgJgBQgBAAAAAAQgBAAgBAAQAAgBgBAAQAAAAAAgBIgBgCIAAgLQgIAJgLAEQgLAGgMAAQgKAAgJgEgABlALQgHABgEADQgEACgBAEQgCAEAAAFQAAAIAEAEQAGAGAJAAQAIAAAGgFQAHgEAHgHIAAgWIgPAAQgIAAgGABgAjTBJIgMgEIgJgDIgFgDIgCgFIgBgKIAAgHIABgDQAAgBAAAAQAAgBABAAQAAAAAAAAQAAAAAAAAIACgCIAGADIAHADIALAFQAGACAIAAIAJgBIAHgEIAEgEQABgDABgEQgBgFgCgDIgHgFIgKgFIgMgEIgMgFIgJgIQgFgEgDgHQgDgGABgKQgBgJAEgIQAEgIAGgFQAHgGAKgDQALgDAMAAIALABIALACIAIADIAFACIACADIABADIAAADIAAAGIAAAHIgBADIgBACIgDAAIgEgBIgHgDIgJgEQgGgBgGAAIgJABQgEABgCACQgDACAAACQgCADAAADQAAAEADAEQADADAFACIAKAFIALAEIAMAGQAGADAFAEQAEAEACAGQAEAHAAAJQAAALgFAJQgEAIgIAGQgHAFgLADQgKAEgMAAIgOgBgAlgBFQgNgFgIgIQgKgKgEgNQgEgNAAgTQAAgQAEgOQAFgOAJgKQAIgKAMgFQANgFAPAAQARAAALAFQAMAFAIAIQAHAJAEAMQADAMAAANIAAAGQAAAGgDADQgDADgFAAIhQAAQAAAJACAGQACAHAEAFQAFAEAHADQAGADAKAAQAKAAAHgCIANgDIAIgDIAHgBIABAAIACACIABAEIAAAGIAAAGIgBADIgBADIgBACIgFADIgLADIgPADQgJABgJABQgSgBgNgEgAlRgsQgGADgDAEQgEAEgCAHQgCAFAAAHIA3AAQABgPgGgJQgIgJgOAAQgGAAgFADgAoIBFQgJgFgGgHQgFgHgDgLQgDgKABgPIAAhPIABgCIACgCIAGgBIAJAAIAJAAIAFABIAEACIABACIAABJQgBAKACAGQABAGADADQACAEAFACQAEADAFgBQAHAAAIgFQAGgFAJgKIAAhWIABgCIADgCIAFgBIAJAAIAJAAIAFABIAEACIABACIAACCIgBACIgDACIgEABIgIABIgIgBIgFgBIgDgCIAAgCIAAgPQgLALgLAGQgMAHgMAAQgNgBgJgEgAs5BFQgNgFgJgIQgIgKgFgNQgEgNAAgTQAAgQAFgOQAEgOAIgKQAJgKANgFQAMgFAQAAQAQAAAMAFQALAFAHAIQAIAJADAMQAEAMAAANIAAAGQAAAGgDADQgDADgFAAIhPAAQAAAJACAGQABAHAEAFQAFAEAHADQAHADAJAAQAKAAAHgCIANgDIAJgDIAFgBIADAAIABACIABAEIAAAGIAAAGIAAADIgBADIgCACIgFADIgLADIgPADQgIABgLABQgQgBgOgEgAsrgsQgFADgDAEQgDAEgCAHQgCAFAAAHIA3AAQAAgPgGgJQgIgJgNAAQgHAAgGADgAM9BGQgIgCgGgHQgFgFgDgJQgCgJAAgMIAAhCIgQAAQgCAAgBgDQgCgDAAgJIABgHIABgFIABgCIACAAIAQAAIAAgeIABgDIADgCIAGAAIAJgBIAJABIAFAAIADACIABADIAAAeIAcAAIADAAIACACIABAFIABAHQgBAJgBADQgCADgDAAIgcAAIAAA9QAAAKADAGQAEAFAJAAIAEgBIAFgBIADgBIACAAIACAAIABACIABAFIABAGIgBAKIgCAFIgFACIgGADIgHABIgIAAQgLAAgIgDgAhWBGQgJgCgFgHQgGgFgCgJQgCgJAAgMIAAhCIgQAAQgCAAgCgDQgCgDABgJIAAgHIABgFIABgCIADAAIAQAAIAAgeIAAgDIAEgCIAFAAIAJgBIAJABIAGAAIACACIABADIAAAeIAdAAIADAAIACACIAAAFIABAHQAAAJgBADQgCADgDAAIgdAAIAAA9QABAKADAGQADAFAJAAIAFgBIAFgBIACgBIADAAIACAAIABACIAAAFIABAGIgBAKIgCAFIgEACIgGADIgHABIgIAAQgMAAgHgDgAuOBGIgFgBIgDgCIgCgCIgRgrIgFgMIgHgKQgEgCgEgDQgFgBgGAAIgNAAIAABHIAAACIgEACIgGABIgJABIgJgBIgGgBIgDgCIgBgCIAAirQAAgHAEgCQADgEAEAAIAyAAIAMAAIAIABQAMACAKAEQAIAEAHAGQAGAHADAJQAEAIAAALQAAAKgDAIQgCAIgEAGQgFAGgHAFQgHAEgJADIAJAFIAGAHIAGAJIAGALIAQAmIADAIIABAEIgBADIgDABIgGABIgMABIgKgBgAvVgjIAVAAQAHgBAGgCQAHgCAEgDQAEgEACgEQACgGAAgFQAAgKgEgGQgFgHgJgCIgGgBIgLgBIgSAAg");
	this.shape_259.setTransform(175.5,891.1);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#B93564").s().p("EgMVBUYIgJAAIgBAAIAAg8IAA7+IAA7+IAA79IAA7+IAA7+IAA7+IABAAIAJAAIY1AAIAAb+IAAb+IAAb+IAAb9IAAb+IAAb+IAAA8I41AAg");
	this.shape_260.setTransform(1360,540);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f("#FF6A5B").s().p("EAMWBUYIgKAAI42AAIgJAAIAAg8IAA7+IAA7+IAA79IAA7+IAA7+IAA7+IAJAAIY2AAIAKAAIAeAAIAAb+IAAb+IAAb+IAAb9IAAb+IAAb+IAAA8g");
	this.shape_261.setTransform(1522,540);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#FFB24B").s().p("EgMLBUYIAAg8IAA7+IAA7+IAA79IAA7+IAA7+IAA7+IYXAAIAAb+IAAb+IAAb+IAAb9IAAb+IAAb+IAAA8I4XAAg");
	this.shape_262.setTransform(1682,540);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f("#84B8AB").s().p("EgMVBUYIgKAAIAAg8IAA7+IAA7+IAA79IAA7+IAA7+IAA7+IAKAAIY1AAIAAb+IAAb+IAAb+IAAb9IAAb+IAAb+IAAA8I41AAg");
	this.shape_263.setTransform(1840,540);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f("#272D4D").s().p("EBgtBUYI8HAAI8GAAI8GAAI8GAAI8HAAI8GAAI8GAAIAAg8IAA3kIAAgKIAAkQIAAiKIAAnXIAAydIAA79IAA7+IAA7+IAA7+IcGAAIcGAAIcHAAIcGAAIcGAAIcGAAIcHAAIDTAAIAAb+IAAb+IAAb+IAAb9IAAb+IAAb+IAAA8IjTAAgEhcAA5kQABA7A7AAMAmnAAAQA8AAAAg7IAAmbQAAg7g8AAMgmnAAAMAmnAAAQA8AAAAA7IAAGbQAAA7g8AAMgmnAAAQg7AAgBg7IAAmbQABg7A7AAQg7AAgBA7IAAGbgEhSPA4sIABADIACABIAGABIAJABIAJgBIAFgBIAEgBIABgDIAAi3IgBgCQgBAAAAgBQAAAAAAAAQgBgBAAAAQAAAAgBAAIgEgBIgIAAIgIAAIgEABIgDACIgBACIAAAPIgMgLIgKgHQgFgDgFgBIgKgBQgOAAgLAGQgKAEgIALQgIAJgDAOQgEAOAAASQAAAOADANQADANAHAKQAGAKAJAFQALAHAOAAIALgBIAKgEIALgFIAKgJgEhCNA4JIATAMQAIAFAJADQAHACAFAAIACAAQAAAAABAAQAAgBAAAAQABAAAAgBQAAAAAAAAIACgGIAAgIIAAgKQgBgEgCgBIgEgDIgIgDIgMgGIgQgMQAGgGAEgIQAFgIADgJQAEgKACgLQABgLAAgNQAAgZgGgSQgFgSgMgLQgLgNgQgFQgRgGgUAAQgYAAgQAHQgSAHgLANQgLAMgHATQgFASAAAYQAAAZAFASQAFATALALQAMAMAQAGQAQAFAXABQAMgBAJgCQAJgCAIgDQAIAJAJAHgEg6BA1yQgNAFgIAKQgJAKgFAOQgEAOAAARQAAATAEANQAEANAKAKQAIAIANAFQANAEARABQAKgBAJgBIAPgDIALgDIAFgDIABgCIABgDIABgDIAAgGIAAgGIgBgEIgBgCIgCAAIgGABIgJADIgNADQgHACgKAAQgJAAgHgDQgHgDgEgEQgFgFgCgHQgBgGAAgJIBPAAQAFAAADgDQADgDAAgHIAAgGQAAgNgEgMQgDgMgIgJQgHgIgMgFQgLgFgQAAQgQAAgMAFgEg+GA1zQgOAFgJAKQgIAJgFAOQgFAOAAARQABASAEANQAEANAIAKQAIAIAOAFQAMAGASAAQASgBAOgFQANgGAJgKQAJgJAEgOQAEgOAAgRQABgRgEgOQgFgNgIgJQgIgJgNgFQgNgFgSAAQgSAAgNAGgEhA/A1wIgFABIgEACIgBACIAABQQAAAPADAKQACALAHAHQAFAHAJAFQAJAEAOABQAMAAALgHQALgGALgLIAAAPIABACIACACIAFABIAHABIAIgBIAFgBIACgCIABgCIAAiDIgBgCIgCgCIgGgBIgJAAIgJAAIgFABIgEACIAAACIAABXQgIAKgIAFQgHAFgGAAQgGABgEgDQgEgCgDgEQgDgDgBgGQgCgGAAgKIAAhKIgBgCIgDgCIgFgBIgJAAIgJAAgEhHOA2sQgNACgIAGQgKAGgEAIQgFAJABALQgBAKAEAIQADAJAHAFQAGAFAJACQAJAEAKAAQAMAAALgGQALgEAIgJIAAALIABACQAAABAAAAQABAAAAABQABAAABAAQAAAAABAAIAJABIAKgBQABAAAAAAQABAAABAAQAAgBABAAQAAAAABgBQAAAAAAAAQAAAAABgBQAAAAAAgBQAAAAAAAAIAAhZQAAgNgDgJQgEgLgHgFQgGgHgMgDQgKgDgQAAQgJAAgHACIgQADQgHACgEADIgIAEQgCADAAACIgCAHIABAHIACAEIACADIACABIAHgCIAJgFIAMgEQAIgCAJAAQAHAAAEACQAGABACADQADADACAFIABAKIAAAIIgNAAQgRABgOACgEhMTA3bQAAAAAAAAQAAAAAAAAQgBAAAAABQAAAAAAABIgBADIAAAHIABAKIACAFIAFADIAJADIAMAEIAOABQAMAAAKgEQALgDAHgFQAIgGAEgIQAFgJAAgLQAAgJgEgHQgCgGgEgEQgFgFgGgDIgMgGIgLgEIgKgFQgFgCgDgDQgDgEAAgEQAAgDACgDQAAgCADgCQACgCAEgBIAJgBQAGAAAGABIAJAEIAHADIAEABIADAAIABgCIABgDIAAgHIAAgGIAAgDIgBgDIgCgDIgFgCIgIgDIgLgCIgLgBQgMAAgLADQgKADgHAGQgGAFgEAIQgEAIABAJQgBAKADAGQADAHAFAEIAJAJIAMAFIAMAEIAKAFIAHAFQACADABAFQgBAEgBADIgEAEIgHAEIgJABQgIAAgGgCIgLgFIgHgDIgGgDIgCACgEhOGA1yQgMAFgIAKQgJAKgFAOQgEAOAAARQAAATAEANQAEANAKAKQAIAIANAFQANAEASABQAJgBAJgBIAPgDIALgDIAFgDIABgCIABgDIABgDIAAgGIAAgGIgBgEIgCgCIgBAAIgHABIgIADIgNADQgHACgKAAQgKAAgGgDQgHgDgFgEQgEgFgCgHQgCgGAAgJIBQAAQAFAAADgDQADgDAAgHIAAgGQAAgNgDgMQgEgMgHgJQgIgIgMgFQgLgFgRAAQgPAAgNAFgEhQ9A1wIgGABIgCACIgBACIAABQQgBAPADAKQADALAFAHQAGAHAJAFQAJAEANABQAMAAAMgHQALgGALgLIAAAPIAAACIADACIAFABIAIABIAIgBIAEgBIADgCIABgCIAAiDIgBgCIgEgCIgFgBIgJAAIgJAAIgFABIgDACIgBACIAABXQgJAKgGAFQgIAFgHAAQgFABgEgDQgFgCgCgEQgDgDgBgGQgCgGABgKIAAhKIgBgCIgEgCIgFgBIgJAAIgJAAgEhVeA1yQgNAFgJAKQgIAKgEAOQgFAOAAARQAAATAEANQAFANAIAKQAJAIANAFQAOAEAQABQALgBAIgBIAPgDIALgDIAFgDIACgCIABgDIAAgDIAAgGIAAgGIgBgEIgBgCIgDAAIgFABIgJADIgNADQgHACgKAAQgJAAgHgDQgHgDgFgEQgEgFgBgHQgCgGAAgJIBPAAQAFAAADgDQADgDAAgHIAAgGQAAgNgEgMQgDgMgIgJQgHgIgLgFQgMgFgQAAQgQAAgMAFgEg8RA1xIgBACIgBAFIgBAHQAAAJACADQABADACAAIAQAAIAABDQAAAMACAJQADAJAFAFQAGAHAIACQAIADALAAIAIAAIAHgBIAGgDIAFgCIACgFIABgKIgBgGIgBgFIgBgCIgCAAIgCAAIgDABIgFABIgEABQgJAAgEgFQgDgGAAgKIAAg+IAcAAQADAAACgDQABgDABgJIgBgHIgBgFIgCgCIgDAAIgcAAIAAgeIgBgDIgDgCIgGAAIgIgBIgJABIgGAAIgDACIgBADIAAAeIgQAAIgCAAgEhKmA1xIgBACIgBAFIAAAHQgBAJACADQACADACAAIAQAAIAABDQAAAMACAJQACAJAGAFQAFAHAJACQAHADAMAAIAIAAIAHgBIAGgDIAEgCIACgFIABgKIgBgGIAAgFIgBgCIgCAAIgDAAIgCABIgFABIgFABQgJAAgDgFQgDgGgBgKIAAg+IAdAAQADAAACgDQABgDAAgJIgBgHIAAgFIgCgCIgDAAIgdAAIAAgeIgBgDIgCgCIgGAAIgJgBIgJABIgFAAIgEACIAAADIAAAeIgQAAIgDAAgEhXtA2wQAGAAAFABQAEADAEADIAHAKIAFAMIARArIACACIADACIAFABIAKABIAMgBIAGgBIADgBIABgDIgBgEIgDgIIgQgmIgGgLIgGgKIgGgHIgJgFQAJgDAHgEQAHgFAFgGQAEgGACgIQADgIAAgKQAAgLgEgIQgDgJgGgHQgHgGgIgEQgKgEgMgCIgIgBIgMAAIgyAAQgEAAgDAEQgEACAAAHIAACsIABACIADACIAGABIAJABIAJgBIAGgBIAEgCIAAgCIAAhIgEhHNA3hQgEgEAAgIQAAgFACgEQABgEAEgCQAEgDAHgBQAGgBAIAAIAPAAIAAAWQgHAHgHAEQgGAFgIAAQgJAAgGgGgEg94A3fQgGgCgEgHQgEgFgBgIQgBgJAAgJQAAgLACgIQABgJAFgFQADgGAHgDQAFgDAJAAQAJAAAGAEQAGADAEAGQAEAGABAIQABAIABAKQAAAKgCAJQgCAHgEAGQgEAGgGADQgGADgJAAQgJAAgGgEgEhS7A3eQgFgEgDgGQgDgGgBgIIgCgQQAAgIACgHQABgHAEgHQADgFAFgEQAGgEAGAAQAIAAAHAFQAIAGAIAJIAAAsIgJAKIgHAHIgIADIgIABQgHAAgFgDgEhDbA3cQgJgEgGgKQgFgIgCgMQgDgNAAgQQAAgNADgMQACgMAGgJQAFgJAKgFQAJgGAPAAQAOABAJAFQAKAEAFAJQAGAJADAMQABAMAAAPQAAANgBANQgDAMgGAJQgGAJgKAGQgJAEgOAAQgOABgKgFgEg6CA2oQAAgHABgFQADgHADgEQADgEAGgDQAEgDAIAAQAOAAAGAJQAHAJAAAPgEhOHA2oQAAgHACgFQACgHAEgEQADgEAGgDQAFgDAGAAQAOAAAIAJQAGAJgBAPgEhVfA2oQAAgHACgFQACgHADgEQADgEAFgDQAGgDAHAAQANAAAIAJQAGAJAAAPgEhX6A2TIAAg2IASAAIALABIAGABQAJACAFAHQAEAGAAAKQAAAFgCAGQgCAEgEAEQgEADgHACQgGACgHABg");
	this.shape_264.setTransform(640,540);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_264},{t:this.shape_263},{t:this.shape_262},{t:this.shape_261},{t:this.shape_260},{t:this.shape_259},{t:this.shape_258}]}).wait(125));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(933.6,435.4,986.4,644.6999999999999);
// library properties:
lib.properties = {
	id: '5B711A9CF9C0484E86DE8422BD7F6B89',
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/eightysPoster.png", id:"eightysPoster"},
		{src:"images/tiny_sub.png", id:"tiny_sub"},
		{src:"images/patch_color.png", id:"patch_color"},
		{src:"images/patch_BW.png", id:"patch_BW"},
		{src:"images/TV.png", id:"TV"},
		{src:"images/patch_em.png", id:"patch_em"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['5B711A9CF9C0484E86DE8422BD7F6B89'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;