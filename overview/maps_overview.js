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



(lib.brazil = function() {
	this.initialize(img.brazil);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,789);


(lib.field = function() {
	this.initialize(img.field);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1228,768);


(lib.game_map = function() {
	this.initialize(img.game_map);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,711);


(lib.laptop = function() {
	this.initialize(img.laptop);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,800,576);


(lib.car_gps = function() {
	this.initialize(img.car_gps);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3500,2332);


(lib.car = function() {
	this.initialize(img.car);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,409,275);


(lib.phone_map = function() {
	this.initialize(img.phone_map);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,741);


(lib.treasure = function() {
	this.initialize(img.treasure);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,697);


(lib.folded_map = function() {
	this.initialize(img.folded_map);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3305,2203);


(lib.library_map = function() {
	this.initialize(img.library_map);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1393,1176);


(lib.mall_map = function() {
	this.initialize(img.mall_map);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,800,400);


(lib.GPS_noSig = function() {
	this.initialize(img.GPS_noSig);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,512,512);


(lib.worldmap = function() {
	this.initialize(img.worldmap);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,532);


(lib.World_human_population_density_map = function() {
	this.initialize(img.World_human_population_density_map);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,800,318);


(lib.plane = function() {
	this.initialize(img.plane);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,916);


(lib.weather = function() {
	this.initialize(img.weather);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2156,1238);


(lib.phone = function() {
	this.initialize(img.phone);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,400,600);// helper functions:

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


(lib.worldmap_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.worldmap();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.worldmap_1, new cjs.Rectangle(0,0,1024,532), null);


(lib.weather_map = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.weather();
	this.instance.setTransform(0,0,0.475,0.4749);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.weather_map, new cjs.Rectangle(0,0,1024,588), null);


(lib.treasure_map = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.treasure();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.treasure_map, new cjs.Rectangle(0,0,1024,697), null);


(lib.text_box = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("Physical Map:", "bold 22px 'Arial Black'");
	this.text.lineHeight = 33;
	this.text.lineWidth = 172;
	this.text.parent = this;
	this.text.setTransform(145.65,13.75);

	this.text_1 = new cjs.Text("Population Map:", "bold 22px 'Arial Black'");
	this.text_1.lineHeight = 33;
	this.text_1.lineWidth = 194;
	this.text_1.parent = this;
	this.text_1.setTransform(134.6,124.15);

	this.text_2 = new cjs.Text(" a map that shows how many people live in an area", "22px 'Arial'");
	this.text_2.textAlign = "center";
	this.text_2.lineHeight = 27;
	this.text_2.lineWidth = 382;
	this.text_2.parent = this;
	this.text_2.setTransform(231.5,159.15);

	this.text_3 = new cjs.Text(" a map that shows Earth's features and landforms", "22px 'Arial'");
	this.text_3.textAlign = "center";
	this.text_3.lineHeight = 27;
	this.text_3.lineWidth = 412;
	this.text_3.parent = this;
	this.text_3.setTransform(231.5,50.3);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(6,1,1).p("EgkPgRQMBIfAAAMAAAAihMhIfAAAg");
	this.shape.setTransform(232,110.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("EgkPARRMAAAgihMBIfAAAMAAAAihg");
	this.shape_1.setTransform(232,110.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.text_3},{t:this.text_2},{t:this.text_1},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.text_box, new cjs.Rectangle(-3,-3,470,227), null);


(lib.squirrel_tail2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#563C22").s().p("ACyF3Qg+gpgSgJQgigUgKgHQgOgLgIgLIAsAdQBRA2AqAaIA4AjQgggPgtgegAi6jPQgXgbANgNQAKACAIgBIAGATQAOAkABAOIAAADgAj+mjIAhANIABAFIAQA6g");
	this.shape.setTransform(29.25,222.775);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#5E554A").s().p("AjOTIQhTgDgsgGQhGgJg0gXIgEgBIAAAAIg4gkQgqgahRg2IgsgdQgGgIgDgIQgIgVAGgmQAHgtgDgQQgEgegagcQgSgUgigYQgogagPgOQgcgagKgcQAugPABgaQABgPgUgWIgkgpIgBgCQgBgOgNglIgGgSQAQgCAEgLQADgKgLgRIgmg6IgQg5IgBgFIBFAcQAKADAEgBQAGgBADgHQADgGgBgHQgCgIgNgPQhKhTgLiKQgEg2AGhCQADgmALhSQAJhAALgdIAIgUQAhAHARAaQAPAXACAlIABBBQADBSBCB+QBNCUAOA6QAIAoAFATQAJAiAOAVQAQAVAtAeQAsAeAPAWQAKiZA+hoQAkg8A0grQA3gtA/gPQAXgGAXAAQADgiAEgRQAPgyAqgeIATgOQALgIAHgHQAIgKALgbQAahEAJgbQAWg/AGgNQAQgrATgeQAhgxA6gqQArgfBFgjQBbguBbgiQAYgJALgGQAUgJAMgLQAPgOALgWIASgqQA1h/BOg1IAVgPQALgJADgLQAEgLgFgZQgZh2AQh5QAGgsASgQQAVgTAiAIQAcAGAcAVQBQBAAvB3IABAAIAAAMIABAiIAAABQAAAsgRBWQgKA0gHAXQgMAqgRAdQgLASgTAZIghAqIgRAYQgKAOgIAIQgKALgSAMIgdAVQgNALgwAuQgkAjgcAPIgjARQgUALgLAMIgNAUQgIAMgHAFQgHAFgLAEIgSAFQggAKgXAbIgOASQgJAKgHAGQgGAEgKAFIgSAIQgaAOgZAbQgQASgZAkQgZAjgLAWQgRAhgBAdIACAgQABATgCANQgBAIgHAVQgGASgBALQgBAQAKANIADADQAJAKANgCQgEBEAXA/IABADIAKAYQAJAUANgCQAFgBADgEQAxBcAEBoQADBAgPBMQgLA6gaBOQgfBegfA/QgpBSg1A4QgyA1hBAkQgZAOgLAJIgIAHIgDAAQgJAAgMAEQghANgsADIgKAAIgOAAIg4gBg");
	this.shape_1.setTransform(100.7536,146.6231);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#808080").s().p("ApTOvQgtgfgPgVQgPgUgJgiQgFgTgIgoQgOg6hNiUQhCh+gDhTIAAhBQgDglgOgXQgSgbghgHIAMgZIAWgsQAbg4AliMQAiiAAkhAQAxhVBhhMQA9gwB8hKID3iSQArgaAWgIQAVgIAugIICPgZQA3gKAcgIQAggIA+gYIBYgiQBQgfAqgbQA/goAYg3QAZACAiAbIAbAWQAPALAOAEQARAGARgEQASgEAIgNQAHAQAJAJQALALAMgFQAzAjAeBIQATAxARBXQAJAvADAYIADAYQgwh3hQg/QgbgWgdgGQghgHgVASQgTAQgGAtQgQB4AZB2QAGAZgEAMQgDAKgLAJIgVAPQhOA1g1B/IgSAqQgMAXgOANQgNAMgTAJQgLAFgZAJQhbAjhbAtQhFAigrAgQg5AqghAxQgTAdgRArQgGAOgWA/QgJAbgaBDQgKAbgJAKQgGAIgLAIIgUANQgpAfgPAzQgFARgDAhQgWABgXAFQhAAQg3AtQg0AqgkA8Qg+BpgJCZQgQgXgsgdg");
	this.shape_2.setTransform(102.925,102.775);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AjGVRQiWgGhigoQgxgUg4gjQgjgWhAgvIgagUQgOgMgIgNQgVghAJgrIAJghQAEgUgEgOQgDgNgMgNQgHgIgPgMIhShCQgWgRgLgMQgQgSgFgTQgFgVANgUQAOgVAVADQgFgRgQgQQgIgKgVgRQgnghgIgbQgFgUAJgTQAKgUATgCIhUh3QgOgUADgLQACgMAOgGQANgFAOADIAZAJQAPAFAKAAQgyhNgHhyQgEgtADg4QACgiAHhCQAKhkAOgwQALglAehAQAhhFALgfQALgfAMg1QAPg/AHgWQAYhMArhEQAshDA7g1QAwgqBeg7QB8hPBgg1QBegzAcgTIAegTQASgLAOgFQARgHAugJICkgcQA1gIAfgJQAVgHAdgMIAygUIA1gVQAigNAUgJQAVgJAbgOQBCgkAPgqIAGgQQADgIAGgEQAMgKAXAHQA7AQApAuQAQgLASAHQgBgHAFgHQAFgGAIgBQAMgBAOAMQAsAiAZAZQAkAjAUAjQAQAdALAoQAGAWALAyQANBAAFAiQAIA3gCAsQgCAegGAkIgNBCQgJApgFAUQgKAigMAZQgQAkguA8QgpA2gaAXQgNALgcAVQgcAVgNAMIgkAkQgVAVgSAKIgnATQgYAMgLANIgQAZQgJAPgJAHQgIAGgPADIgYAGQgUAGgQAPQgPAPgIAUIgHATQgGAKgIACQgFABgIgDQgKgDgEAAQgRgCgVAbIg3BLQgYAigGARQgJAXgBA7QAAA2gOAaQAHgFAKAFQAJAFAEAJQAFAKgCAbQgDAzASAvQANAEANASQAcAnAXBHQAOAtAEAfQAFAggDA4QgGBWgQBEQgLArgSA0IglBdQgeBNgXAmQgaArgtAxQgvAzgqAYIgpAYQgYAOgJASIgIAOQgEAHgHAAQgIAAgEgIQgCgEAAgEQg3ARhPAAIgogBgAt2KSIAeAhIAkApQAUAVgBAQQgBAaguAPQAKAcAcAZQAPAOAoAbQAiAYASATQAaAcAEAeQADARgHAsQgGAmAIAVQADAJAGAIQAIALAOALQAJAHAjAUQARAJA/ApQAtAeAgAPIAAAAIAEACQA0AXBGAJQAsAGBTADQAsABAaAAIAKgBQAsgDAhgMQAMgFAJAAIADAAIAIgHQAKgJAagOQBBgjAyg1QA1g4AphTQAfg+AfheQAahPALg6QAPhLgDhBQgEhogxhcQgDAFgFAAQgNACgJgUIgKgXIgBgEQgXg/AEhEQgNADgJgKIgDgEQgKgNABgQQABgLAGgSQAHgUABgJQACgMgBgUIgCggQABgeARghQALgWAZgiQAZgjAQgSQAZgcAagNIASgIQAKgFAGgFQAHgFAJgLIAOgSQAXgbAggJIASgGQALgEAHgEQAHgGAIgMIANgTQALgNAUgKIAjgRQAcgPAkgkQAwguANgKIAdgVQASgNAKgKQAIgJAKgOIARgXIAhgqQATgZALgTQARgdAMgpQAHgYAKgzQARhWAAgsIAAgCIgBghIAAgMIgBgBIgCgYQgEgYgJgvQgQhXgUgxQgdhIgzgjQgMAFgMgLQgIgJgHgQQgJANgSAEQgRAEgRgGQgNgEgQgLIgagWQgigbgagCQgYA3g+AoQgqAbhQAfIhZAiQg+AYggAIQgcAIg2AKIiPAZQguAIgVAIQgWAIgsAaIj2CSQh9BKg9AwQhgBMgxBVQglBAgiCAQglCNgaA4IgWAsIgMAZIgIAUQgLAegJBAQgLBQgDAnQgGBDAEA1QALCLBKBTQANAPACAHQABAHgDAGQgDAHgGACQgEABgKgEIhFgcIghgNIAyBMIAmA6QALARgDAJQgEAMgQABQgIABgLgCQgNANAXAbg");
	this.shape_3.setTransform(99.1505,136.1755);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.squirrel_tail2, new cjs.Rectangle(0,0,198.3,272.4), null);


(lib.squirrel_tail1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AjBXBQh/gHh4gxQh4gwhhhUQgygrgfgoQgngvAMg4QAOgqACgWQACgbgJgbQgPgtgvg1Qg1g1gZgcQgsgwgSgsQgchBAegdQAJgIANgDIAYgCQAIgBACgCQADgDgCgHIgEgKIgFgLQgYgzgFhBQgEgzAJhFQAJhEALgzQAOhAAZgjQALgQAYgUIAmgiQAVgVAAgTQgBgJgFgOIgIgYQgIgZALgVQALgVAagFQAZgGAaAPQAIAEAKAIQAFghAMggQATgvAhgmQA/hJBqgVQAkgHA0gEIBZgGQAzgFAhgIQAugMAggXQAygjADgoQADglgmggQgfgbgzgQQgggKg7gJQiAgQhAgKQhwgRhIglQgcgOgMgJQgWgPgKgQQgMgTADgYQACgVANgUQALgRAUgRIAlgeQAVgSAJgNQAJgNACgNQgNgBgNgIQgTgNgKgYQgJgYAGgaQAHgYASgUQASgUAegRQAUgMAjgPQAwgUA1gLQhJhEAfg8QARggAsgTQAdgNAxgJQBRgQBrAIQAjACCdAVQBbAMBBACQglgpgPg5QgCgIAGgHQAGgHAIADQD/BmDCC6IAGgEQAagRAfAoIBnCNQAMgcATgYQAFgHAKAAQAKABACAKQAeC7gGC5QAWgMARgbQAPgXARgwQAFgOANAEQANAEgCAOQgNBOgSBGQhFEBidDYQgJAMgMgIQgNgHAIgMQArg7AmhBQBpi2AvjKQgaAggkAKQgHABgGgEQgHgEABgIQAIixgYitQgKATgGAUQgDAKgJABQgJAAgGgIIhuiVQgNgSgEgFIgIgFQAHAJgIAKQgIALgLgHQgFgEgDgEQi7i3jshlQAUAuApAjQAIAGgEAKQgFAJgJAAQhMACh5gQQiVgUgXgCQhjgJhLALQguAGgkANQgpAOgRAXQgVAeAZAlQAPAWAlAeQAGAFgDAJQgCAKgIABQh0AShNAzQgwAgACAlQACARALAOQANAQAQgDQAIgCAFAFQAGAEAAAHQAFAtgwApQhBA5gIAMQgRAdAOAUQAIAOAhATQAsAaA3AQQA9ARCDAQQB/APBAATQAtANAgAWQAnAbAOAkQARAqgYArQgVAkgqAbQg8AlhpAJQijAOgLACQheAUg5A/QgeAhgRArQgSArgBAtQAAAKgJADQgJAEgHgHQgPgPgHgFQgOgLgNgDQgNgDgKAGQgMAFgBANQAAALAGAQQAIAVABAGQAGAYgLAXQgJATgWAUQgbAVgMALQglAhgQBEQgJAjgLBJQgKA/ACA1QABBBAVAvQAPAjACAKQAEAbgXALQgHAEgPAAQgPAAgHADQgOAHAHAfQAKAtAnAuQALAOA/BAQAuAwAWAkQAeA1gBAvQAAAXgKAiIgHAbQgEAPACAMQADAXAUAaQAIAKAfAeQArAqAmAcQBYBBBnAmQBnAmBsAGQAPABAAAPQAAAOgNAAIgCAAg");
	this.shape.setTransform(97.2057,147.2831);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#563C22").s().p("AhGBbIALAGIAAABgAA6geIgBgBIgBgDIAAAAIAAgBIgBgDIgBgEQgGgRACgMIACgFIAAAAIABgDIAAgBQADgFAFgFIAEgDIAGgEQgHAqgDAjg");
	this.shape_1.setTransform(14.0125,147.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#5E554B").s().p("ABCPxIgbgOQgjgCgggFQg5gJg3gRQg2gQg0gZIgLgGIgxgaQhkg7hMhXQgggjgFgdQgDgTAIgdIAJgkIAAAAIADgNIABgGQAFgwgeg1QgJgQgLgQQgUgbgcgcIgJgIQg1g2gQgUIgGgHIglhEIgBgEIgDgIIgCgKQgDgPADgNIACgHIABgBQAEgKAIgEQAGgDAPAAIABAAIAGgBIAFAAIABAAQAMgCAGgGIAAgBQAHgIgDgMIgBgBIAAgBQgCgIgGgNQgcg3gDhKIAAgHIAAgCIAAgCIAAgBIAAgIIAAgCIAAgDIACggIABgNIABgFIAIhBIAAgCIABgBIAAgCIAAgBIAAgCIABgBIACgOIACgPIAEgTIAAgBQAHglAHgVIABgCIAAgBIAAgBIABgCIAAAAIAAgBIABgCIABgCIACgHIADgFQAGgPAIgNIAFgHIADgEIABgBIgjgTIAAgBIAjATIAFgHIABAAIABgBIABgBIAAgBIAEgDIAAgBIABgBIASgPIADgDIAAAAIACgCIACgBIACgCIABgBIAXgTIACgCIACgCIACgCIABgBIAAAAIABgBIAAgBIAEgDIABgDIAAAAIAFgHIACgCQAFgKACgLIAAgCIAAgBIAAgBIAAgBIAAgBIAAgCIgBgKIgBgCIgDgKIgBgEQADgiAHgqIAGgCIAFgBIABgBIACAAIAEAAIAFAAIACAAIABAAIABAAIABAAIAAAAIACAAIAHACIABAAIALAFQAGADAHAFIABABIAMAJIADADIAKAKIABABIAAgHQABgSADgRIACgKIAAgCIADgJIAAgCQAHgYAMgXIAAgBQAHgPAKgPIADgDIACgEIAPgUIABAAIABgBIAAgBIABAAQAWgbAcgTIABAAQAQgLATgJIABAAIAEgCIACgBQANgGAOgEIAGgCIAFgBIADgBIADgBIACAAIAJgCIAEgBIABgBIACAAIABAAIAGgBIABgBIAEAAIADgBIACAAIAEgBIAMgCIAFgBIACAAIAGgBIACAAIAJgBIATgBIABAAIAHgBIAVgBIABAAIALgBIADAAIAXgCIADAAIADgBIALAAIADgBIAlgEQAigKAmgEIAPgFQAVgHARgIIADgBIAagQIABgBIABAAIAAgBIANgKIAEgEIABgBIABgBIAGgHIABgBQAGgGAEgHIANgbIABgBIABgGIABgFIAAgBIAAgBQABgNgCgMIgBgDIgDgKIAEgGQAIgKALgHQAigYBCAFQA/AFAgAZIAGAFQAlAiAEBBQAEBRgxBLIgKAOIgBACIhEBEIgLAJIgBAAQgPAKgQAJQhQAqh2AMIgqADIABADIALAVQAHALAHAGQAHAFAMAEIAUAGQAaAIAVASQAVATAJAYQALAdgFAnQgEAagOArIgwCUQBUhAB1hVICrh7QApgeAbgMQAogSAjAGQAqAHAYApQAXApgPAoQgIAVgUAVQgNAOgaAUQg9Avh7BcIhpBNQhiBFgaAWQhCA4ghA6QgoBFgJBjQgFA+AGB3IABATIAEA2QAEApAHAfQAQBDAmA8IgQAeIAAAAQAMAHAEABQAFACAOAAQAZABAVAPQAVAOAKAXQAJAXgFAaQgEAZgRASQgMANgbAPQgnAVgaAGQgPAEgNAAQgXAAgSgJg");
	this.shape_2.setTransform(73.8672,193.5667);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#808080").s().p("Aj8TEQgHgfgEgpIgEg2IgBgTQgGh3AFg+QAJhjAohFQAhg6BCg4QAagWBhhGIBphNQB7hcA9gvQAagUANgOQAUgVAIgVQAPgogXgpQgYgpgqgHQgjgGgoASQgbAMgpAeIiqB7Qh1BVhUBAIAwiUQAOgrAEgaQAFgngLgdQgJgYgVgTQgVgSgagIIgUgGQgMgEgHgFQgHgGgHgLIgLgVIgBgDIAqgDQB2gMBQgpQAQgJAPgKIABAAIALgJIBDhEIABgCIAKgOQAxhLgEhRQgEhBglgiIgGgFQgggZg+gFQhCgFgiAYQgLAHgIAKIgEAGQgIgWgVgUQghgeg0gRIgBAAIgLgEIgIgCQgvgNg/gJIiGgRQhkgNhHgbIgEgCIgHgDQgkgOgcgTIgBAAIgBgBIgHgGQgQgMgGgMQgOgaATggIABgCIABgCQAPgYAcgVQAbgUAPgPIAEgEIAEgFIAAAAQAYgcgEgdQgXAGgSgTIgHgIQgTgaAHgdIABgCQAGgUARgSIAIgJIABAAQATgRAcgPQBPgoBZgOQhPg+AMg1QALgtBHgWQB0glDBAXICdAVQBcALBBgCQg6gugRhHQEDBnDHDFQgBgEADgGQAEgLAKABQAOAAAQAWIB3CjQAMgqAbgiQAfDDgJDEQAmgJAbgoQASgcATg0QgaCnhBCdIgBADIgVAxQg7CAhTByIhSCVIANAWQBEB6gLCEQgIBig1BwQgbA4g7BgIgTAGQgnAOgYATQgfAZgPAmQgPAmAFAnIAFAVIAAAGQg1BKgyA2QiOCXijAgIgKACIhBB2Qgmg8gQhDg");
	this.shape_3.setTransform(109.7652,136.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.squirrel_tail1, new cjs.Rectangle(0,0,194.5,295.3), null);


(lib.squirrel_eyes_closed = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A39E9F").s().p("AELCXQgBgkAKg3QAFgXAEgMQAGgTALgMIAPgPIAQgXQAGgIAGgGIAGABQAHADAFAMQAOAnABAlQAAAXgGAOQgFAOgMAOQgIAIgRAOQgMALgKAGQgTANgVAHIgBgHgAipB+QgugFgugSQhCgagbgtQgUghgChFIgBgtQAAgIADgCIAGgHQADgEgBgEQAkgPAngCQAjgBAcAKQAhALASAXQAWAcAEAvQACAOAAAZIACAoIAEAqQABAYgJAPIgEAJQgFgCgJgCg");
	this.shape.setTransform(40.3667,18.2205);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AD5C0QgFgCgCgDQgCgFAFgEQgBgEABgIIAGhAQABgSADgLIAEgPIAFgYQAEgSAPgSIAbghIAQgUIABgBIAHgDIAJgDIAMgBIALABQAKAHAHAPQALAUAFAjQAKA9gVAiQgJAPgbAXQgVARgNAIQgTANgSAFQgKADgJAAQgHAAgGgCgAFPgrIgRAWIgPAQQgKALgHATQgEAMgEAYQgKA2ABAkIAAAIQAVgHATgNQAKgHAMgKQARgOAIgJQANgNAFgOQAFgOAAgXQAAglgPgnQgFgNgGgCIgHgBQgFAFgGAJgAiFCXQgDgCgBgFIAAgEQgEACgEgBQAAAGgEACQgDACgHgBQgzgGglgMQgvgPgggZQgTgPgPgTQgMgQgEgJQgHgOgEgSQgMgyADhNIACgLQgDgCgCgDQgDgFABgDQABgGAFAAIAHACIADAAIAHgGQAPgJAYgFQA4gNAvALQA5AOAcArQATAdAFAuIADAnIACAnIAEAtQAAAYgEARQACACABAFIAAAMIgBAIQgBAEgEABIgDABQgDAAgCgCgAkhidQgoADgkAOQABAFgCAEIgHAGQgCADAAAIIAAAsQACBFAUAhQAbAuBDAaQAuASAtAFQAKABAFACIADgIQAJgQAAgXIgEgqIgCgoQgBgZgBgOQgFgwgVgbQgTgYgggLQgagJgfAAIgGAAg");
	this.shape_1.setTransform(40.2218,18.192);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.squirrel_eyes_closed, new cjs.Rectangle(0,0,80.5,36.4), null);


(lib.squirrel_eyes = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgRApIAAgJIAEAJIgDACIgBACIAAgEgAAAAkQgFgLAAgNQAAgHACgIIADgRIAAADIADAGQABACgCADQgDAJAAAFQAAAIAFAFQADACAEAAQAEgBACgEQABABAAABQAAAAAAABQAAAAAAABQAAAAgBABIgDAEQgCAFADAEIACADIgDABIgCgEQgDAEgDABIAAAAQgEAAgCgFgAAAgfIABgFIADgJQAAAFADAEQgFAFgBADIgBACg");
	this.shape.setTransform(68.425,28.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Ai7COIgKgDIgMgDIgYgGIgkgLIAFgEIAFgHIAGgKIABgEIAEgKIAQglQAKgXAEgPQAHgbgBgzQgBgUgCgKQgCgJgFgKIgGgJIgHgLIgCgDQgBgCgFgCIgBgBIATAGQALAFAKAGQAaAQAPAXQAKAOAFATIABAFQAEARAAAVQAAAOgDAdQgIBCgJAfIAAAAQgEAIABAMIgCABIgTgFgAFABqIAAAAQAFgNAAgPIABgFIAAAAIgBgHIgHglQgDgIgGgJIgMgSIAAAAIADgGIAJgQIADgCQAGgHAGgEIAJANIAEAKIABAEIACAHQAAAAAAABQAAAAABAAQAAAAAAAAQAAAAAAAAIAEAZIABAGIgBAXIgCALIgBADIAAADIgBABQgBAEAAAEIgBADIgBABIAAADIgCACIAAABIAAADQgBAGgIAIQgEAFgCAAIAAAAIgBAAgAEgAqIgBgFIAAgLQACgDADAAIABgBQADABABACIACACIADADIACAFQgBAFgCABIgCABIgBABIgEACQgFAAgBgDgAkngqQgDAAgCgCQgCgCgBgEIgEgJQgBgGAAgGQAAgMACgFQACgJAIgFIAJgDIADgBIAGgBQAGgBADgCIAEABQAAAEADAIQAEAOABAMIAAAJIAAABIAAAAIAAAGIAAAAIgBAFIgHAEIgMAEIgHAAgAlXg0QgDgEABgHIABgGIgBgBIAAgCIACgFQACgDAFABIAAgBQAFACACACIABADIAAABIABABQADAFAAAFQAAAMgJABIgDABQgEAAgDgFg");
	this.shape_1.setTransform(42.0125,17.625);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AERCrQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAIAAgBQgBgGAAgFIAAgDIADgBIgDgJIAAgZIABgQIABgRIAAgJIABgDIADgGIAAgEIABgDIACgFIAAgBQANgwAXgkIAKgPIAJgJIAIgGQAIgFAMAMQAPAQAIAdQALAigFAeQgCANgGAQQgJAYgMAQQgNAUgWANQgUAOgZAEIgEAAQgGAAgBgEgAEeBpQgDAKAAAHQABANAGALQACAFAEAAQACgBADgEIADADIADAAIgCgDQgEgEADgFIADgEQAAgBABAAQAAgBAAgBQAAAAAAgBQgBAAAAgBQgCAEgEAAQgEABgDgCQgGgFAAgIQAAgFAEgKQACgDgBgDIgDgFIgBgEIgDARgAFRgdIgCACIgJAQIgDAGIAAAAIAMASQAGAJADAIIAHAlIABAHIgBAAIAAAFQAAAPgFANIAAAAIAAAAQACAAAFgFQAHgIACgGIAAgDIAAgBIABgCIABgDIABgBIABgDQAAgEABgEIABgBIAAgDIABgDIACgLIABgXIgBgGIgEgZQAAAAAAAAQgBAAAAAAQAAAAAAAAQAAgBAAAAIgCgHIgBgEIgEgKIgJgNQgGAEgHAHgAEjBJIgBAFIgBAIIABgDIABgCQABgDAFgFQgDgEAAgFIgDAJgAE+AYQgDAAgCADIAAALIABAFQABADAEAAIAFgCIABgBIACgBQACgBABgFIgDgFIgCgDIgCgCQgBgCgEgBgAifCoQhMgMgqgTQhAgfgZgzQgIgOgJgfQgGgZgDgLQgHgzAXgsIABgCIAGgNIABgDIAEgEIAAAAIAFgEQAEgGANgEQAxgQAggBQBBgDAwAnQAYATAPAbQAPAcADAeQABATgEAgIgGAwQgFAmgJAWIgBABIAAABQgBAGgCAKIgFAKIgDAEQAAAGgHAEQgGADgIAAIgMgCgAjaiQQAFACACACIABAEIAIAKIAGAJQAFAKACAJQACAKABAUQABAzgHAbQgEAPgKAXIgQAlIgEAKIgCAEIgFAKIgGAHIgEAEIAkALIAXAGIANADIAKADIATAFIACAAIAAgBQgBgMADgIIAAAAQAKgfAHhCQAEgdAAgOQAAgVgEgRIgBgFQgFgTgLgOQgPgXgZgQQgKgGgLgFIgUgGIABABgAj8hqIgGABIgDABIgJADQgIAFgCAJQgDAFAAAMQABAGABAGIAEAJQABAEABACQACACAEAAIALAAIAHAAIAMgEIAHgEIABgFIAAAAIAAgFIAAgBIAAgBIAAgJQgBgMgFgOQgCgIAAgEIgEgBQgDACgGABgAk9hMIgCAFIAAACIAAABIgBAGQAAAHACAEQAEAGAHgCQAJgBAAgMQAAgFgEgFIAAgBIAAgBIgBgDQgCgCgGgCIAAABIgCAAQgDAAgBACg");
	this.shape_2.setTransform(39.4499,17.5191);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.squirrel_eyes, new cjs.Rectangle(0,0,78.9,35.1), null);


(lib.signal = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0066FF").s().p("ADVAeIgHgCIgEgEIgCgEIgDgEIgCgDIgBgEIAAgEIAAgEIAAgCIAAgEIABgEIABgEIACgDIACgEIADgEIADgDIADgBIAEAAIAAgBICOAAIAGACIAFAEIACAEIADAEIABAEIABADIAAAEIAAAEIAAADIAAADIAAAEIgCAEIAAAEIgEADIgDAEIgCADIgDABIgEABIiOAAgAg9AeIgIgCIgEgEIgDgEIgCgEIgCgDIgBgEIAAgEIgBgEIABgCIAAgEIABgEIABgEIACgDIACgEIADgEIADgDIADgBIAFAAIAAgBICLAAIAHACIAFAEIADAEIABAEIACAEIAAADIABAEIAAAEIAAADIAAADIgBAEIgBAEIgBAEIgCADIgEAEIgCADIgCABIgGABIiLAAgAlhAeIgHgCIgEgEIgCgEIgDgEIgCgDIgBgEIAAgEIgBgEIABgCIAAgEIABgEIABgEIACgDIACgEIADgEIADgDIADgBIAEAAIAAgBICOAAIAGACIAFAEIACAEIADAEIABAEIABADIAAAEIAAAEIAAADIAAADIAAAEIgCAEIAAAEIgEADIgCAEIgDADIgDABIgEABIiOAAg");
	this.shape.setTransform(37.35,3.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.signal, new cjs.Rectangle(0,0,74.7,6.1), null);


(lib.pop_map = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.World_human_population_density_map();
	this.instance.setTransform(0,0,1.3175,1.3175);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.pop_map, new cjs.Rectangle(0,0,1054,419), null);


(lib.plane_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.plane();
	this.instance.setTransform(0,0,0.3896,0.3896);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.plane_1, new cjs.Rectangle(0,0,399,356.9), null);


(lib.map_zoom = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.phone_map();
	this.instance.setTransform(0,0,0.7949,0.795);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.map_zoom, new cjs.Rectangle(0,0,814,589.1), null);


(lib.lib_map = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.library_map();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.lib_map, new cjs.Rectangle(0,0,1393,1176), null);


(lib.laptop_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.laptop();
	this.instance.setTransform(0,0,0.5362,0.5363);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.laptop_1, new cjs.Rectangle(0,0,429,308.9), null);


(lib.game_map_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.game_map();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.game_map_1, new cjs.Rectangle(0,0,1024,711), null);


(lib.food_text = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("Food Court", "bold 18px 'Arial Black'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 27;
	this.text.lineWidth = 158;
	this.text.parent = this;
	this.text.setTransform(81.05,2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.food_text, new cjs.Rectangle(0,0,162.1,29.9), null);


(lib.foldedMap = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.folded_map();
	this.instance.setTransform(0,0,0.1873,0.1873);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.foldedMap, new cjs.Rectangle(0,0,618.9,412.7), null);


(lib.car_gps_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.car_gps();
	this.instance.setTransform(0,0,0.2926,0.2926);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.car_gps_1, new cjs.Rectangle(0,0,1024,682.3), null);


(lib.car_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.car();
	this.instance.setTransform(0,0,0.3618,0.362);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.car_1, new cjs.Rectangle(0,0,148,99.6), null);


(lib.brazil_map = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.brazil();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.brazil_map, new cjs.Rectangle(0,0,1024,789), null);


(lib.bluejay_tail = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AhXEBIhegDQgwgBgegEQgcgCgqgIIidgcQgVgEgIgGQgHgFgDgHIgBgFQgSgSgLgiQgKgngHgTQgOgjgFgSQgHgXgBgdQgCgTADgaIAFgnQAGgvAKgVQAPgfAqgfQANgJAJgBIACAAQAEgDAGAAQAMgBAPAGQCiBGDaAmQCCAXEJAZQBRAIAmABQBCACA0gHQAYgDAKAGQAKAGADAPQACANgEAPQgJAngdAiQgaAggmAXQgmAXg7ATQADAMgTAOQhYA/hoAYQg8APhPACIgfAAQgpAAhDgCgAnsjZIgKAHQgPAJgKAMQgPASgGAWIgFAaIgDAXQgIA2AFAjQADAMAEAMQADAIAIAQQAGAPAGAXIAAACIALAlQAIAVAKAOIAJANIAKAEIARAHQAQAGAmAFQAqAHBUAPQA5AJBIAEQAsACBXABQA8ACAfgCIADABQAxgCAngHQBcgQBNgxQhGAPgvADQgsADhfgGIgFAAIjIgRQhzgJhBgJQhigOhNgZQgWgGgBgNQgBgGAFgGQAFgGAIgBQAJgCASAFQBrAeCJARQBVAKCiAMIBhAGQA1ABArgDQA4gFBEgRQBXgUA1ghQAggVAXgdQAYgeAJgkQg1AHhBgCQgogBhNgHIiZgOQh2gKg9gJQj0ggjrhXIgHgDIgBAAIgGAEg");
	this.shape.setTransform(60.0694,25.9456);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#446077").s().p("AgbDeQhXgCgsgCQhIgEg5gIQhUgQgqgGQgmgFgQgHIgRgHIgKgEIgJgMQgKgOgIgWIgLglIAAgBQgGgYgGgOQgIgQgDgJQgEgMgDgLQgFgkAIg1IADgYIAFgaQAGgVAPgTQAKgMAPgJIAKgGIAGgFIABABIAHADQDrBXD1AgQA8AIB2AKICZAOQBNAHAoACQBBACA1gHQgJAjgYAfQgXAcggAWQg1AghXAVQhEAQg4AFQgrAEg1gCIhhgGQiigMhVgKQiJgRhrgdQgSgGgJACQgIACgFAFQgFAGABAHQABAMAWAHQBNAYBiAOQBBAJBzAKIDIAQIAFABQBfAFAsgCQAvgDBGgQQhNAxhcAQQgnAHgxACIgDAAIgmABIg1gBg");
	this.shape_1.setTransform(60.375,25.9625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bluejay_tail, new cjs.Rectangle(0,0,120.2,51.9), null);


(lib.bison_smiling = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// glasses
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhxBAQAQgXAagWQARgOAhgWQAmgbAagMQAlgRAiAAQgKAMgRAKIghARQgfAPgrAfIhWA+g");
	this.shape.setTransform(321.25,272.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AANA1QgEgBgEgIIgVgsQgJgSACgKQACgHAFgGQAIgKAIAAQAEgBAEACQAFADABAFQABAEgEAIQgEAIAAAEQAAAEADAFIAEAIQAEAIACATIAEAQQAAAFgDADQgDADgDAAIgCAAg");
	this.shape_1.setTransform(312.7068,281.8468);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(255,255,255,0.157)").s().p("AwXFxIgDgDIglgkQgRgUgUgsQhAiWgSifIgCgIIAEgBQABAHAGAEQAGAFAHAAQAIAAASgIIA9gkQB/hMCPgvQCOgvCUgPQCEgNCFANQCDANBVArIADADIALAHQAEAEACALIADAQQABAJAAAUIABBGIgEALIgDASQgBAMgHASQgIAbgKAYQgLAegLAQQgIALACAGIACAFQgQAagIARIgKAYQgHACgKAGQh0BJimAnQhnAYjJAZQh9AQg7AEQg6AFg0AAIgagBgAL7ASIAFACIAAgCQAAgBgBAAQAAgBAAAAQAAAAgBgBQAAAAgBAAQgBAFgCgJIgFgXIgBAAIgEgPIABAAIgBgDIgGgTIgFgPIAAAAIgBABIgMgbIAAAAQgDgFgCgHIAAgBIgCgDIgEgDIgGgQIgCABQgLgSgNgRQAJgJgJgYIgWg7IgEgKQAKgNANgUIALgSIBGgTQBIgSA8gJQBZgNBUACQAgAAAUAHQAUAGAaAUQAaAVALATIAGAIQgCAHAAAIIAAAVQAAAXgLAnQgVBHgQAkQgGANgSAhQgVALglALIiwA5QgzAPgZACIgjABIgSABIgJgrg");
	this.shape_2.setTransform(426.475,278.5005);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#ADA298").s().p("AABAPIgGgeIAAgBIAFAYQACAJABgFQABAAAAAAQAAAAABABQAAAAAAAAQAAABABABIAAACIgFgCg");
	this.shape_3.setTransform(502.7,278.8375);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AxmGSIgFgHIAAgBIgLgQQgqg+gLgUQg+hxAKisIADgmQgDgPgCgIQgEgMAAgGQABgGAFgFQAEgFAGgBIAHgBQADgKAHgCQAIgDAHAHIAAABQAHAHgBAJIgBACIAAAAIgDALIgCAHIAAADIACAJQASCfBACWQAUAsARAUIAlAkIADADQA+ABBKgFQA7gEB9gQQDJgZBngYQCmgnB0hJQAKgGAHgCIAKgYQAIgSAQgZIgCgFQgCgGAIgLQALgQALgeQAKgYAIgbQAHgSABgMIADgSIAEgLIgBhGQAAgUgBgJIgDgQQgCgLgEgEIgLgHIgDgDQhVgriDgNQiFgNiEANQiUAPiOAvQiPAvh/BMIg9AkQgSAIgIAAQgHAAgGgFQgGgEgBgHQgBgMASgLQD6itEcg3QCSgcCRAGQCVAGCKAqQAuAOAbASQANAJAKAJIAEABQAOAEAVACIAMABIAAAAIAFgCIAsgfQAUgOAOgFQAMgEARgCIAegDIBBgKQAYgDAvgBQBOgCAoABQAkABAgAEIADgBIAKgJQALgIAWgFQAKgDAIABIAJgEQAhgMAggKQAFgGAGAAQADgBADABQCcgwCfgNQArgEAcACQAnACAeALQA+AXAiA6QAJAPAAAMQAAAFgDAFQgDBEgUBDQgMApgSAlIALgCIgxAxIgEAEIgGAEIgwAUIgLAFIgGACIgkAMIgnAQQgdALhAAUQgzAPgdAFQgeAEgagCIAEAQIAEAPIAAACQAAAFACAOIABAIIACALIABAFIAFAjIADAKIADAQIABAGIgGAUIgBADQgFgEgCgGIgEgFQgMgOgGgKQgFgJgLgjQgQgqgGgWQgEgQgDgWIgGgnQgKhEgdg5QgYgugiggQgJAEgLgCQgHgBgTgHQgmgNhCABQh6ABh/AOQg2AKg2AQIgSAEIgCABQgJAEgEAGIgEAJQgBAHgCACQgFAIgLAAIgEgBIgtBiQgcA+gRAeIAAAAQgOBAgQA1IghAMQghAMgUAKQgIADgCAEIgDAGQgCADgEADIARgYQhBAnhSAcQhZAeh9AWQheAQi8AXQhlAMgsAEIgZACQgDgDgGgBIgOABQgMABgVAAIgiAAIgoAEIgWADIgJgMgAL3gOIAHAeIAJArIASgBIAjgBQAZgCAzgPICwg5QAkgMAWgKQASghAGgNQAQgkAVhHQALgnAAgXIAAgVQAAgJABgGIgFgIQgLgTgagVQgagUgUgGQgUgHggAAQhUgChZANQg8AJhIASIhGATIgLASQgNAUgLAMIAFALIAWA7QAJAYgJAJQANARALARIABAAIAHAQIAEACIACAEIAAABQACAHADAFIAAAAIAMAaIABAAIAAAAIAFAPIAGATIABADIgBAAIAEAPgACxjmIgHACQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAABAAAAIAJgBIAIgEIgBAAIgGACgAJ+kqIADADIAEgFIgHACg");
	this.shape_4.setTransform(426.1975,278.74);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(91));

	// eyes
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#ADA298").s().p("AqyByIgVgGIgGgCQgMADgRgBIgjgGIgNgCQgJgBgFgCQgHgDgEgGIgBgEIAAAAIARgMIAXgQIAAAAIACAAQAHgBAEgBQAJgFAEgJQAPgIANgFQAsgTBEgEQgHAFgHANIgIASQgKgGgJAAQgLAAgFAKIgCAFQAAAGAEAHIABABQAEAHAJAGIAOAKIgKAEQgGACgDAEIgFAGQgKAFgIAGIgBABIgGAAgAodA3IgFgBQAIgMAHgSQAGgNABgIIAjABQABAEAAAGQgBAIgFAJQgKAQgRAGQgHADgGAAIgHgBgApMAKQgEgFgEgCIAPgBIACADQAGADAIgEIgOAbQgFgPgEgGgAMlhFIgHgCIgIgCIAAAAIgBgCQAAgBAAAAQgBgBAAAAQAAAAgBAAQAAAAgBAAQgBAFgCgJIgFgZIABgBIAEgBIAPgFIACAAQAAAEAEAGIABACIAHAQQAFAHAEAEIgFAAQgFAAgDADIgCACIgBAAg");
	this.shape_5.setTransform(424.85,286.675);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("Au3DdQgFgBgCgEQgCgFAGgMIADgGIgBgDQAAgFAFgEIACgIIAGgbQAMg6AbgnQAJgOAWgaQArgxAbgYQAQgOAUgPQA2gnAsAFIADAAIALACQAMACASAJQAWALAIADIAcAIIATAMIAZAVIAjAjIAcAXQARANAJALIAGAJQAjgGAYgRIgegCQgEAAgBgCQgBgDAGgCIAlgJQAVgGAKAGQAJAFACALQABAMgGAKQgIANgbANQgoASgbAFQgZAEg0gEIgmgCIgjgBQgBAIgFANQgIASgHAMIgIAMQAbgHAbgFQATgDAHAIQAEAEABAGQAAAGgDAFQgEAIgOAGQgJAEgOACIgZACQgbADgqANQg0AQgQADQgNAEgFgHQgEgFAEgGQADgFAGgEIABgBQAIgGAKgFQANgGASgHIgHgDIgOgKQgJgGgFgHIAAgBQgFgHABgGIACgFQAFgKALAAQAJAAAKAGIAIgSQAHgNAHgFQhEAEgsATQgNAFgPAIQgMAHgOAJIAAAAIgYAQIgRAMIgxAhQgGAMgFAIQgHAKgGACIgFABIgEgBgArAhYQgeARggAcQgWASghAiQgXAXgLANQgSAVgJATQgIAQgNAvIAYgTQAmgdAWgNQANgJANgGQATgMAOgHQAQgHAhgLQAzgTAegGQAtgKAmADIAbADIgegcQgVgTgJgGQgKgGgUgHQgWgHgJgFIgTgJIgQgEQgIgDgEgFIgBgCIgPAHgAp1BKIgQABQAFACAEAFQAEAGAEAPIAPgbIABgCIgRAAgAMKAAQgDAAgCgCQgFgEgEgHIgHgQIgBgCQgEgGgBgEIAAgEIAAAAIgVgCIgEgBIgBgDIgGgUQgCgIgDgHQAOgKAIgEIATgKIACAAQAMgGAJgCIAAAAIANgBIACgBIALgGIALgGQANgGAHACQAGABAEAFIADAAIAKgBIgFgFIgCgCQgTgUgMgJIgNgJIgIgEQgIgEgHgCQgKgDgHABIgDABIgHAEIgIAIIgOASIgOAQQgLAMgLAIIgBAAIgBABIAEAIIAAAAQgDgFgCgGIAAgCIgCgDIgEgDIgGgPIAAgBIACgBQAGgEAHgJIAlgqQAIgKAHgEIAGgCIADgBIAHgBIACAAQALgBALACQAMADAOAGIACABQATAJAYAUQAPAMALALIAGAHIADgGQAGgLAFgEQAEgDAFABQAGAAACADQADAEAAAGIABgIQAEgTACgFQAEgMAIADQADABACAGQAMAegHAXQgGAVgXASIACADQAEAJgCAHQgBAFgEAEQgFAEgFABQgMABgJgIIgEgFIgHADQgEgCgFABIgGACQgEgEgHABQgIABgFAJIAAAFIgBAAIgeAHIAYgEIAHgBIgBAFIAAAfQgFACgDADIgCACIgQAGIgCABIgLADIgBAAIgFABIgDABIgBAAIgBACIgBABQgFAGgIAAIgDAAg");
	this.shape_6.setTransform(429.699,279.4521);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#563D22").s().p("AuWC9QADgUAMgVQAJgRAWgZQAyg8AfgfQAwguAvgbQAogXAfADQAUABAjARQAbAOAKAGQAUALANANQANANAWAjIgKAMQgJAIgWAKIh1A1Qg1AXhBARQghAIgQAHIgMAGQgUgBgPAEIgLAEIhFAGIgBAAgALrg7IgBgEQgCgJABgDQAAgGAFgJIAHgNIAHgWQACgFAJgMQATgZALgLQAKgKAIAAQAFABAGADQAuAbARAdQAHAMALAcIAEAHIgYAOQgYAOgNAFQgMAEghAIQgeAGgPAAIgGAAQgLgPgEgOg");
	this.shape_7.setTransform(427.675,278.6239);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AvMDjIgHgGQgHgKABgSQACggAhgxQAwhIAvgxQA6g8A+gkQA0geAnAEQASABAmAPQA5AXAYASQAcAWAkA0IAKAQIAHgGIANgIIAFgHIAIgOIAFgKIAFgNIAJgUIADgJQAEgGAFADQADABAAAFIgCAHQgFALgBAHIgBANQABAJgBAEQgBAGgGALIgBABIARgNQAHgGAEADQADACgCAFIgGAGQgKAIgNAQIgWAbQgaAegeASQgMAIgNAHIgPAKIg4AhQgoAXgYAJQggALhAAGIh/ANIgzAJIgbADIgUACIgQADQgKgBgEgGgArShAQgvAbgwAuQgfAegyA8QgWAZgJASQgMAVgDATIABAAIBFgFIALgFQAPgDAUAAIAMgGQAQgGAhgIQBBgRA1gXIB1g1QAWgKAJgJIAKgLQgWgkgNgMQgNgNgUgMQgKgGgbgNQgjgRgUgCIgGAAQgdAAgkAVgALRgCQgHgDgIgKQgMgSgHgVQgEgGgBgLQgCgQAFgNIAJgSIAIgVQAIgXAbggQAbgdAUgHQAMgEAKACQAFABAOAGQAbAPALAIQAtAgATA5IAGgEIASgJQAGgCADAAIAMgMQADgDADgCIADgCQAGAAgBAGQAAAEgEADQgFAHgMANIgDACQgbAmg2AgQgVAMgRAGQgFACgaAHQgyANgXABIgEAAIgFABQgFAAgEgCgAMLi4QgLALgTAZQgJALgCAGIgHAVIgHAOQgFAIAAAGQgBADACAJIABAFQAEANALAQIAGgBQAPAAAegGQAhgHAMgFQANgFAYgOIAYgOIgEgHQgLgbgHgNQgRgdgugaQgGgEgFAAIgBAAQgHAAgKAKg");
	this.shape_8.setTransform(430.2514,279.2667);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#ADA298").s().p("AqyByIgVgGIgFgCQgNADgQgBIgkgGIgOgCQgHgBgGgCQgGgDgFgGIgCgEIAAAAIARgMIAYgQIABAAIABAAQAHgBADgBQAKgFAFgJQAOgIANgFQAsgTBEgEQgHAFgGANIgIASQgLgGgIAAQgMAAgFAKIgBAFQgCAGAFAHIAAABQAFAHAJAGQAIAGAGAEIgKAEQgGACgDAEIgEAGQgLAFgHAGIgCABIgGAAgAodA3IgEgBQAGgMAIgSQAFgNABgIIAjABQADAEgBAGQAAAIgFAJQgLAQgRAGQgHADgGAAIgHgBgApMAKQgEgFgFgCIARgBIABADQAGADAIgEIgPAbQgDgPgFgGgAMlhFIgHgCIgIgCIgBAAIAAgCQAAgBAAAAQgBgBAAAAQAAAAgBAAQAAAAAAAAQgCAFgBgJIgGgZIABgBIADgBIAQgFIABAAQABAEAEAGIABACIAIAQQADAHAGAEIgGAAQgFAAgDADIgDACIAAAAg");
	this.shape_9.setTransform(424.35,287.675);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("Au3DdQgFgBgCgEQgCgFAGgMIADgGIgBgDQAAgFAFgEIACgIIAGgbQAMg6AbgnQAJgOAWgaQArgxAbgYQAQgOAUgPQA2gnAsAFIADAAIALACQAMACASAJQAWALAIADIAcAIIATAMIAZAVIAjAjIAcAXQARANAJALIAGAJQAjgGAYgRIgegCQgEAAgBgCQgBgDAGgCIAlgJQAVgGAKAGQAJAFACALQABAMgGAKQgIANgbANQgoASgbAFQgZAEg0gEIgmgCIgjgBQgBAIgFANQgIASgHAMIgIAMQAbgHAbgFQATgDAHAIQAEAEABAGQAAAGgDAFQgEAIgOAGQgJAEgOACIgZACQgbADgqANQg0AQgQADQgNAEgFgHQgEgFAEgGQADgFAGgEIABgBQAIgGAKgFQANgGASgHIgHgDQgHgEgHgGQgJgGgFgHIAAgBQgFgHABgGIACgFQAFgKALAAQAJAAAKAGIAIgSQAHgNAHgFQhEAEgsATQgNAFgPAIQgMAHgOAJIAAAAIgYAQIgRAMIgxAhQgGAMgFAIQgHAKgGACIgFABIgEgBgArAhYQgeARggAcQgWASghAiQgXAXgLANQgSAVgJATQgIAQgNAvIAYgTQAmgdAWgNQANgJANgGQATgMAOgHQAQgHAhgLQAzgTAegGQAtgKAmADIAbADIgegcQgVgTgJgGQgKgGgUgHQgWgHgJgFIgTgJIgQgEQgIgDgEgFIgBgCIgPAHgAp1BKIgQABQAFACAEAFQAEAGAEAPIAPgbIABgCIgRAAgAMKAAQgDAAgCgCQgFgEgEgHIgHgQIgBgCQgEgGgBgEIAAgEIAAAAIgVgCIgEgBIgBgDIgGgUQgCgIgDgHQAOgKAIgEIATgKIACAAQAMgGAJgCIAAAAIANgBIACgBIALgGIALgGQANgGAHACQAGABAEAFIADAAIAKgBIgFgFIgCgCQgTgUgMgJIgNgJIgIgEQgIgEgHgCQgKgDgHABIgDABIgHAEIgIAIIgOASIgOAQQgLAMgLAIIgBAAIgBABIAEAIIAAAAQgDgFgCgGIAAgCIgCgDIgEgDIgGgPIAAgBIACgBQAGgEAHgJIAlgqQAIgKAHgEIAGgCIADgBIAHgBIACAAQALgBALACQAMADAOAGIACABQATAJAYAUQAPAMALALIAGAHIADgGQAGgLAFgEQAEgDAFABQAGAAACADQADAEAAAGIABgIQAEgTACgFQAEgMAIADQADABACAGQAMAegHAXQgGAVgXASIACADQAEAJgCAHQgBAFgEAEQgFAEgFABQgMABgJgIIgEgFIgHADQgEgCgFABIgGACQgEgEgHABQgIABgFAJIAAAFIgBAAIgeAHIAYgEIAHgBIgBAFIAAAfQgFACgDADIgCACIgQAGIgCABIgLADIgBAAIgFABIgDABIgBAAIgBACIgBABQgFAGgIAAIgDAAg");
	this.shape_10.setTransform(429.199,280.4521);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5}]}).to({state:[{t:this.shape_8},{t:this.shape_7}]},50).to({state:[{t:this.shape_10},{t:this.shape_9}]},10).wait(31));

	// head
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAfEPQgJgCgFgKQgEgIAAgLIACgUQAAgMgDgHIgxAiQgUANgNgCQgNgCgIgNQgHgNABgPQABgKAFgSQAGgTABgJQgdAIgmgNIhBgcIgcgNQgQgIgIgKQgPgSgDgmQgFg8ALgkQALgiAqg3IBHhcQAMgPAIgEQAGgDAHABQAIABAEAGQAIALgQAWIhLBiQgVAcgKARQgPAagFAXQgFAaAGAzQACAQAEAGQAGAHARAHIA/AbQAlANAdgFIAWgEQAMgBAHAHQAJAJgFATQgDAMgLAWQgIAUAEANIBFguQAUgOALAFQAPAHgDAZIgDARQgCAKACAIIA5g+QAQgSANABQAHABAGAGQAFAGABAIQACAKgEATQAGgEAKgOQAIgMAIgCQAIgBAHAGQAHAFADAIQADAKgFAXIAygaQAKgGAHABQAHABAEAHQAEAHgCAIQgEANgQAIQgTAHgIAEIgbAPQgRAHgMgFQgHgDgEgHQgDgIADgGQgFADgFAGIgJALQgLAOgNgEQgOgFABgXIACgQQAAgJgDgHQgbAggeAeQgOAPgLAAIgEgBg");
	this.shape_11.setTransform(269.8667,197.6095);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#563D22").s().p("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");
	this.shape_12.setTransform(374.2,349.75);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#302113").s().p("AjKDjIgOgCIAAAAQgEgEgEABIgDAAQgMgDgKgGQgHgFgHgGQgJAEgMgIQgGgFgIgJIgMgQIgkg+IAAgBQAAgGgEgHIgFgLIgDgQIgFgYIgJgfIgFgOIAAgFQgCgIgEgKQgDgbgXgnQgohEg2g4QAngPAsAFQArAFAkAXQATAMAzAzIALAKQAkAkAfAQQALAFAKADQASAFAsACQBPADAqgFQBCgIAugdQAWgNAoghQAlgbAfgEQAXgDAlAIQBeATBhAeQh/BSg+A2QhhBVgpBeQgHAPgGAEQgHAGgUABIkhAIIgUABQgTAAgLgCgAkrgMIgEAEIABAEQABADAGAFQAZAXAdARIARALIADADQAPAHALAIQAlAbAHAlIADAOQADAIAFADQADADAEAAQADABAEgCQAJgCAEgHQAHgKgCgVQgCgYgMgWQgMgWgTgQQgRgNgjgRIgWgKQgegMgRgDIgKgBQgJAAgGAEg");
	this.shape_13.setTransform(475.875,419.3526);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#47311D").s().p("ANSXRIgFACIALgEIgEAFIgCgDgAmsOVQgThMgog1QgVgcgTAHQgOAFgGAdQgUBRg9A4IhBhYQgpg3gagXQgbgYg5ghIgKgFQgFgGgGgCQgIgDgKADIgSAHQhHAihRgNQhSgMg6g2QAogoAXg1QAXg0ADg5QADgsgLgmQgNgrgdgbQgVgUgkgOIgFgCIgGgDIgEgBIgBAAIgCgBIgCAAIg0gRIgRgFIgTgHQhJgbg9gzQhFg4gshMIABgCIAEgBIBBgRIACAAIAEgBIADAAIAJgCQA/gJAagJIAVgIIBMgxIAIgIQAhgeA1hAIAFgGIADAAIAHgMIABgBIAFgHIAdglIAAgBQAbgkAOgiQAFgNACgLQAGgcgOgQIgDgDQgKgKgSgCIgYAAIgJAAQgmAAgkgNQgOgGgOgHIABgBIgBABIgFgDIgNgIIgSgPQAPgCAPgFQAMgFAMgIIAJgHQAygmAlhbIABgDQAfhOARgcQAhg5AtgWQAVgJAAgLQAAgKgMgDIAFgMQAyAVAeALQAVAHATAFIAGACIAiAIIAAAAIABAAIAGABQBAALBOgIQAMAXAFAfQAPBbg7B6QgIARgrBQQghA7gPAoQgKAdAAARQABAPAOAiQAeBGAHBMQAIBMgQBKQgFAbADALQAEAPAXAUQAuApAdAlQAkAvAOAvQAJAcABAeIAGANQAJAcgHAcQgGAZgQAaIgCADQgHAWgJAWIgCAGIBTAvIABABIAEADIAMAHIACABQARgXAEgJIAJgTQAFgLAFgGQAIgIAOgJQARgJAIgGQAJgGARgPQAQgQAJgGQAegVA1gHIAVgDIAEgEQATgUAUgJQAYgKAZAFQAUAEAMANIAhgHQA3gIAfAcQANAMAEAQQAFASgIANQgJAOgcALQgXAJggAJQAigeAqgSQAJgCgBgMQgBgLgJgEQgNgFgWANQg7AigoA1IgIACIADgFQgHAMgFAOIgEAHIgXAqQgxBoATBrQAEAYAKAJQAOANAlgIIBCgOIAMgBIgFAOQgWBUh5A6QgwAYg2ARQgEhSgQg9gAWPIAQgFgIgFgEQgMgMgBgDQgCgDAAgGIgBgKQgBgFgEgHIgFgMIgFgaIgHgWQgFgOgCgJIAAgRIADgDIABgBIAAAAQAFgHABgJIASjLQACgeAFgVQAGgaAOghIAOgZQACAaAGAWQANAzAlA2QAWAiAyA7Qg7AYgnA5QgSAZgLAdIgEgCIABAFIAAADQgKAdgEAgQgDAZACAaIABARgALSGlQgDgGgBgIIgCgPIgFgTQgNgggPgbQgKgUgNgPIgWgZQgHgJgQgXQgOgVgKgKQgQgPgHgJQgHgKABgHIALAKQBMA8AjAYIAGAEIABAAIADACIATAOIAEADIAAABQAJAHAGAHIACABIAAAAIACADIABABIAAABQAXAggJAnQgCAIgJAVIgDAHIgCAEIgCAFIgDAOQgCAIACAFQgFgEgDgGgAJICIQAJACALAKIAMALgAmlsgIAMgQIAHABQAIAAAFgDQAIgFAAgMQAAgKgFgIIgEAHQAvhQAOheQAFgkgRgKQgKgHgYAFIiZAgIA7gvQAjgdAUgWQAcgeAOghQAQglgEgkQgDgWgLgIQgJgGgNABQgMACgLAHIgSAOQgMAKgIAEIgLAEIgBABIgEgLQABgKgFgJQgFgJgJgFQABgRAagPQBKgsCWhBQA8gZAcgHQBCgRBUAKQBiAMCPA7QDVBXAYAIQASAGAIgCQAHgBAFgFQAFgFAAgGQAAgNgWgJQhFgdhkgnQAGgCAHgFQAygfBIgLQAugHBVgBQBkgBA3AJQBUANA1ArQASAOATAXIAiAoQAiApBSBVIAvAyIAZAcQAZAbARAVQAlAvAWARQASANA+AbIAIADIACABIAOAHIAFADQAAAJAJAGQAIAGAKgBIADAAIAJAJIAEAFQghAGghACQg0ACgzgJQgbgEgbgIIgXgGQgOgDgKACQgMADgJAJQgIAKACALQgxAMgwgbQgwgbgQgvIgFgPQgDgJgEgGQgFgHgHgDQgIgEgHADQgHACgKAOQgjA2g1ArQgaAVgUAAQgdgBgWgrQgjhEAJhNIADgWQABgKgCgJIABAJIAPgIIAggKQATgFAKgJQALgIgDgKQgDgHgMgDQgYgGgbAGQgYAGgXAPIgCACIAEAAIgGAAQgNACgGAOIgQAPIgkAmIiQClQgQhIgnAAQgRAAgZAVIhhBPQgOALgIAFQgOAHgLgBQgQAAgVgRQglgegggjQgXgZgPgLQgYgQgVAFQgOAEgUARQgoAjggAkIgzA5Qg1A1hGAUQgjALghAAQgkAAgjgNg");
	this.shape_14.setTransform(369.3125,326.3648);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#CCCCCC").s().p("AutJ1QhLgBhYgcQg7gThhgqQgtgUgagNQgmgUgcgWQghgbgWghQgXgkgHgnQgGgeAFgzQAIhdAchFQAhhPBIhNQAvgxBghRICWh+QBOhCAqghQCgh9CnhPIgeAnQgLAOgSASIgfAfQgsAvhSBtIhXB2QgZAigPAOQgWAUgKALQgNAQgNAbQgmBLgRA3QgXBJAGA/QAGAzAXAbQARAVAhAOQAqATA6AGQAkAEBEgBQBWgBArgGQAZgDABgOQAAgIgHgFQAlgPAjgVQgNBDhSBBIhDAzQgmAegWAbQgMAPADAKQAFASAjgHIDagrQgKBNgoBAQgRgCgZAFQhlAXgyAKQhTARg9AAIgJgBgATFG8IgIgFIgEgDQgWgNgOgHIglgQQgWgKgOgJQgQgLgQgVIgdglIgKgMIAiAAQAtgDAigKQARgGAlgRQAxgWAVgVQANgNALgTQAuhKAEhcQADhagohOIgZgrQgQgbgHgRQAsAVAqApQAhAgAlAyQAjAwAPAlQARAnAGA9QAKBdgYA6QgQAogxA6QgWAcgNANQgVAUgWALQgSAJgrAKQgXAFgQAFIgGgDg");
	this.shape_15.setTransform(386.248,181.0058);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("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");
	this.shape_16.setTransform(373.6393,298.5686);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11}]}).wait(91));

	// body
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#302113").s().p("AxWCCIgIgCIAAgBIgUgMIgDgCIAAAAQgKgJgMgOIgjgrIgDgGIgCABIgfgmIABgDQAQgdArgPQAegLAxgGIgGADQgUAKgMAIQgHAGgDAGQgDAJAFAFQAEAEAMgBQATgDAggOQAygVA3gdIAFgBIAAAAIAIAFQAGAEAEgCIACgCQATAJAPAWIAHAJIACABIAAABQAQAXAGAKIANAdIAMAcQAFAJAHAIIgFAEQgHAFADAJQgKABgbAAIgdABQgVgMgMABQgKAAgLAIIgTANQggAWg2ADIgEAAgAPcA9QhAgigbgVIgjgeIAmgSIAmgRIgjARIAEALQBpgjBcgvQANgGAHABQAKADACgBIADgBQACgBABgEQACgDgBgFIABABIAOAKQAIAHAGADIAFACIAAAAIACAEIAAAAIABACIABABIAMAUQAIAPALAfIAXA+IhWAFQgzADgeARIgVAMQgMAHgKAAIgCAAQgMAAgXgLg");
	this.shape_17.setTransform(264.525,591.525);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#47311D").s().p("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");
	this.shape_18.setTransform(280.5928,484.025);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#563D22").s().p("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");
	this.shape_19.setTransform(278.0792,364.375);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#775330").s().p("EgW7AqeIABgBIADAGgA8hTdQgvgOhCgkQglgVgWgPQgfgWgVgXQgdgigehHQg8iQgmiZQgUhPAEgvQAGg6AhguIAcgjQAPgUAEgSQADgLAAgoQAAgfAKgQQAHgJAOgJIAYgQQASgNAXgfQAagjANgMQAdgZAogIQAogHAlANQAkANAbAfQAaAdAKAmQADANAEAZQADAZADAMQAFAVANAcIAWAuQAoBTAGBLQACAgAEALQADALAJAOIAPAYQAoBDgFBfIgCAmQgCAXACAQQACAVALAjQAMAmACASQALBGgrA/QgsA/hFAPQgUAFgWAAQgkAAgpgMgANdQaIgSgsQgiAPgeAEQgrgMgkgBIgSgIQgXgMgngcQgwghgYgVQglgggVgiQglAPgaAGIgGACIgDAFQgPAoADAoQgGgqgygmIgDgDQgfgFgcgRQgjgVgUghQgSgdgFgiQgCgOAAgOIgCgEIgHgUIgNgLQgtgngSgLQgOgJgfgOQgegOgPgJQgXgOgOgTQgRgXAAgXQgiAQg7gcQhIgjgagBQgOAAgXAEQgcAGgKAAQgfADgdgMQgqgegkgdQghgngQg0IgPgzQgKgegNgRQgJgMgUgRQgWgTgHgIQgbgdgLgqQgJgmADgrQAEgjAMgsIAahOIAEgPQACgNAEgNIABgGIgJgPQgQgcgNgMIgIgIQgNgPgTgPQgRgNgggTQgYgOgLgEQgLgEgUgDQgWgEgKgDIgNgEIgCgHIAJgRQAKgQAMgcIAKgWQAHgUgBgUQgBgVgLgQQgIgMgSgMQgRgKgTgGQgMgEgngHIgigGQgUgCgPACIgCAAQAJgNAJgSIAFgFQANgJAFgJQADgEADgLIAKgNQAYggAKgyIACgPIACgKIAIggIgDgRIgDgQQgCgagFgOIgDgHIgFgJIgEgHIgBgCQgGgNgIgGQgYgggPgMQgKgIgIgCQADgHAFgGQAIgIAXgLQAegOAggUQBAgoA/hCQAOgOAHgKQAJgPACgOIgBgKIgDgEIABgGIABgRQABgIgBgFQgCgHgFgHIgCgIQgEgOgIgLQgbgrgrgXIgBAAIgBgEQAPgFAXgMIAYgNQAJgBAEgBQAKgCALgHIAEgDIAFAAQAEAAAJgGQAwgfAdgcQAmglAOgrQADgLAAgFQgBgHgCgEQgBgGgFgFQgGgHgXgGQgZgFgagPIgcgPIgZgMIAAgBIgCgCIgYgRQgQgNgEgIIgCgGQASAAALgEQALgDAPgIIAHgEQANgBASgHQBUgiBChAQAfgeArg4IAdglIgEgCQAHgVgGgSQgFgOgMgFIAAgBQgEgEgIgEIhig/IC8htQAOgIAFgFQAKgIAEgKQAKgXgXgWQgVgTgdgFIg3gKQgfgIgMgUQBbhKBsgyQBrgzBzgYIBkgSQA8gLAngNQAagJBDgeQA6gaAkgKQAsgLBHgEQBpgEANgCQAcgDB7gWQBdgRA7ADQBKAEBWAiQA1AVBiA0QA+AiAdATQAwAgAeAkQAgAoAcBHIAtB3QAVAwApBAIBFBsQBDBtA6CMQArBrAzCcQATA8AKAbQASAwAUAkQAHAOAIAJQAAAIAAAJQACARAKAbIAZBDQAJAbAKARQALASAcAeIAcAeQAAAJACALQASBTBCCqQBACjARBbQALA7ADBKQACAsAABZQgBDSgDCUQgBBUgEAsQgHBHgRA2QgNApggBCQglBKgLAfIgJAZQgRgPgWgQQgsghgjgQQgugWgqADQgqACgnAaQgkAXgcAmQgWAfgUAuIghBSQgGARgKAEQgIADgJgDIgRgJQgXgLgkADQgqAGgUACIhAAAQgnAAgYAIQgqAQggAxQgSAdgbBCQgYA8gjBFQgngKg0AAQhYgBg7AXIgjAPQgVAHgQABIgDAAIgMgBgAm8/JIAPgBIANgCIAAAHIAAACQgOgEgOgCg");
	this.shape_20.setTransform(290.9587,323.94);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("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");
	this.shape_21.setTransform(284.9175,328.509);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17}]}).wait(91));

	// tail
	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#302113").s().p("AB7OBIg4hwQggg+gcguIgSghQgKgTgEgPIgGgsQgFghgUg4IgYg8QgEhDgNhQIgGgjIAAgBQgKg4gQhNIgiipIgUhsQgMhGgCgkQgGhUAVhgQAShPAmhgQAehKAegjQAZgcA0giQBqhEBSgWQgRAdgPAqQghBagbCVQglDGgLAtQgTBJgqCSQghCAADBdQABAtAOBPIAHAkIAuD2QAUBrAPA4QAYBZAhBCQAFAIAFAGQgJAZgFApIgBgCg");
	this.shape_22.setTransform(62.6595,339.725);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AB+N6QAFgpAJgZQgFgGgEgIQgihCgXhZQgPg4gUhrIgvj2IgGgkQgOhPgCgtQgDhcAhiBQAriSAShJQALgtAljGQAciVAghaQAQgqARgdQhTAWhpBEQg0AigZAcQgfAjgdBKQgnBggRBPQgWBgAGBUQADAkAMBGIATBsIAjCpQAPBNAKA4IAAABIAGAjQANBQAFBDQgZg8ghhHQgLhBgShQQgWhmgFgeIgIhBIgIhBIgVhqQgMhAAAgrQABg9AdhfQAYhPAghWQAehLAbgiQAWgaAqgfQBqhNB+gkQANgEAMADQAOAEgBALIgBAGIAAAAQAFAHgBAJQAAAHgFAIIgJANQgZAogTBRQgNA7gaCXQgXCGgUBMQgPA8glB4QgeBrgFBMQgDA9AKBNQAGAuASBbIA0EKQARBVAPAoIAVA0QANAcAGATQADAAADACQAEAEgBALQgJBIgQBDIgag4g");
	this.shape_23.setTransform(62.4067,340.6183);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#312112").s().p("AgyBmQAdhqAHhiIBBACQgDA3gCBrIAAApg");
	this.shape_24.setTransform(58.175,377.8);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#302113").s().p("AgvNeQgLgPgJgBQgMgCgQASIgzA7IABhwQAAgZgMgHQgHgEgLADIgRAIQgaANgdACQgdABgbgKQAsgEAkgsQAZgfAYg5QA7iOAdhuIBfABQgBBYAGAzIALBGQAIAuADAXQANBxgYBwQgLAwgZAHQgHg1gdgugAgyDFQACgdAAgcQABhigpjxQgljXANh8QAHhAAaheQALgrALgaQAPgkAUgZQAZggArgaQAdgQA2gYQA3gXAggHQAxgMAnALQgZANgTAcQgNAVgPAiQgeBJgVBMQgOA0gWBrIhXGvQgVBjgIA7QgKBIgFBag");
	this.shape_25.setTransform(61.825,347.7811);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AgoPuQgMgMgEggQgFgkgJgMQguAyg9AZQgQAIgQgCQgSgDgCgOQgCgIAGgJIAMgPQASgWAGgdQAGgcgIgbQghAJgUADQgfADgXgHQgagJgPgaQgOgbAMgXQAIgNASgLIAhgRQAkgWAZgtQARgeATg6QAlhsAQg5QAahdAIhNQAMiAgpj/QgpkAANiBQAIhKAbhkQANgyANgfQARgrAYgdQAogxBIggQAugTBagYIBwgcQAQgDAHADQAHADAEAKQAOAfgTApQgGAMglA6QgZAmgTA1QgMAlgPA+QgcBwgrDeIgwD0QgUBhgIA1QghDXAWDjIAWDhQAGCBgfBbQgOArgWARQgPAMgSAAIgDABQgRAAgMgMgAhBNOQAJABALAPQAdAuAHA1QAZgHALgwQAYhwgNhxQgDgXgIguIgLhGQgGgzABhYIABgpQAChsACg2QAFhaAKhIQAIg7AVhjIBXmvQAWhrAOg0QAVhMAehJQAPgiANgVQATgcAZgNQgngLgxAMQggAHg3AXQg2AYgdAQQgrAagZAgQgUAZgPAkQgLAagLArQgaBegHBAQgNB8AlDXQApDxgBBiQAAAcgCAdQgHBigdBrQgdBug7COQgYA5gZAfQgkAsgsAEQAbAKAdgBQAdgCAagNIARgIQALgDAHAEQAMAHAAAZIgBBwIAzg7QAPgQALAAIACAAg");
	this.shape_26.setTransform(61.6076,347.7538);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_23},{t:this.shape_22}]}).to({state:[{t:this.shape_26},{t:this.shape_25},{t:this.shape_24}]},20).wait(71));

	// back_legs
	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#160F09").s().p("AFoNjIgjgPIADAAIiFhcQglgagQgMIgDgCQAkAAAmgEIAGAEIAqAdIACABIABABIBhBAQAVAPAFAKIADAHQBigLBdgkQAQgGAEgJQADgKgIgLQgJgPghgYQgNgJgJgIIADABQAQAGAfAQQAbAPAJAKQAQASgEAbQgDAbgVANIgDACIgBABIgBAAIgBABIgIADIgKADIgbAHQgTAFgZANIAAABIgJACQgiAJgiAFIgLACIg/gcgAAXIAQgQgHgWgPIgWg0QgghNgfgvQgqg/g0giIgegTQgKgHgIgHQALgWASgRQAKAQAVANIABABQAPAKAfAQQAyAfAmA6QAeAtAbBHIAvB3IAAABQgRgFgRgJgACLFiQguhJAJg7QAGgqAigtIAHgHIAmAUIgKAKQgQARgHAQQgOAjAQA1QAnB2CKBSQgUASgaAMQhdhDg3hYgAFemJQgRgKgagMIgtgUQgVgJhYgyQhDglgugPQgwgPgxgCQg0gCguAPQhKAWhOBGIhEA+QgcAXgbAKIgEgBQgGgBgKAAQgSAAgUgMQgMgIgTgSQgugqgWgbQgfgngMgmQADgOAFgNQASgvAugrQAggdA8gmQA+gnAngVQA4geAygSQBJgaBPgFQBPgEBMARIAiAHQATADAPgCQARgDAagOQAfgQALgEQAvgPA4AXQAfANAvAiIAAAAIAFAKIAEAKQAiBJAWBIQAKAhAHAOQAFAKAGAIQgLAngGAiIgNBTQgIApgRAyIgBABIgEAMQgzgpgOgJg");
	this.shape_27.setTransform(200.1564,492.3005);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#302113").s().p("AQ5P1QgigBgQgJQgOgHgVgcQAAgFgGgIQgHgKgngrQgegggIgaQgLgkAOg6QAQhHAZg+QANghAEgPQAHgbgGgWQgEgPgLgQIgWgdQhQhjgbh9QgIgsAHgYQAIgbAegZQATgQAfgSQAkgSARgLQA+glBQhRQBqhuAagWQAzgtAvgQQAdgKAdABQAfAAAZANQAGAggFAhQgGAggSAcQgHANgSAXQgOAVgEARQgDALgBAWQAAAWgDAKIgHAaQgDAPAHAJQAHAHAKgBIgFAAQgHAKgEALIgIAaQgGAOgIAHQgHAHgNAEIgXAGIgpAWQgYANgSgCQgHgBgNgFQgNgEgGgBQgTgDgSALQgRALgKASIgJATIgJASQgHALgPALIgaATQgQANgcAeQgbAcgJAVQgKAWAEAYQAEAaARAQQAQASAZAEQAaAEAUgNQAOgIAOgRIAYgfQAVgYAkgUQAXgMAsgSIBWggIAEgCQgHAPgGAKQgLARgYAfQgUAdgHAXIgGAeQgDAUgEAKQgIAWgZAeQgeAkgHANQgXAngCBCIgBBxIgCAdQAAARAEALQAEALASAZQAYAfAhBDQgtABg0AAIhBAAgAmqPTQgFgLgVgOIhhhBIgBAAIgCgCIgqgdIgfgWQgogfgbggQgigqgehCIAAgBIgvh4QgchGgegtQgmg7gygeQgfgRgPgJIgBgBQgVgOgKgQIgDgFQgTgiAVg1IATgqQALgZAEgSQALg1gehIQgXg3ghgnQghglgsgXQgsgWgwgFIgCgBQgIgBgGABIAAAAIAHgDQAJgDABgGQACgKgNgCIAEABQAbgLAcgXIBEg9QBOhGBKgXQAugOA0ACQAxABAxAQQAuAPBDAlQBYAxAVAKIAtATQAaAMARALQAOAJAzAoIgdBMQguB0gdA4QgvBeg4A+Ig7BEIgHAHQgiAtgGApQgJA8AuBJQA3BXBdBEQBBAuBTAlQAaAMAKAGQAUAMAIAQQAEAIADAPQAEAQAEAHQAFALANAMQAJAJANAJQAhAYAJAPQAIALgDAJQgEAKgQAGQhdAkhiALIgDgHgAm5M1QgGADAAAJQAAAGAFAHQAKAMATAFQAPAEAKgDQAUgFATgcQAEADAHgCQAFgBAEgEQAIgJgFgMQgDgLgNgFQgMgEgKAGQgFADgLAOQgSAVgRgEIgNgFIgHgBIgGABgA2mmgQgJgiADgtQACgcAKgzQALg6AKgYQAMgbAXgeQAOgSAegiQBKhRAtgpQBLhCBIgcQAugSA8gHQAsgGBBAAQA2gBAhADQAwAGAkAPQA4AYA/BCQAeAgAXAgQAsA5ApBUQgvgjgfgNQg4gXgvAQQgLAEgfAQQgaANgRADQgPADgTgEIgigHQhNgRhPAFQhPAEhJAaQgyASg4AeQgnAWg+AmQg8AnggAdQguAqgSAwQgFANgDANIgCgFg");
	this.shape_28.setTransform(281.5539,478.467);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("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");
	this.shape_29.setTransform(282.1412,478.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_29},{t:this.shape_28},{t:this.shape_27}]}).wait(91));

	// shadow
	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("rgba(0,0,0,0.118)").s().p("AugERQgOgGgegQQgdgPgQgHQgQgGgfgJQgggKgPgGIgkgOQgVgJgPgEQgQgDgdgCIgzAIQhUAMhHgGQhFgGgzggQgogZgQgiIgIABIhAAKQgnAGgagBQgigBgdgPQgggPgOgcQgLgXADgaQAEgbARgTQAQgSAdgKQATgHAjgHIDigsQA7gMAggCQAmgDAgAFQBngbB5gPQBegMCtgKIABAAQAzgNAZgDQArgGAiAHIATAGIDagMQAkgLAQgDQA2gNArADQARABA1AJIALACIBogGIAHgBIAEAAIAogNQA+gVAhAAQAVABApAIQApAJAUAAQATAABZgTQBCgOAlATQALAFAXASQAVAQAOAGQASAHAXgBQAQgBAagFIB1gcQBFgMAxAMQANADAjAMQAWAIAPADIAEABIAVADQARABAVgDQASgBAigGQBcgOBdALQA8AGArAWQA0AbAOAuQCLghBMgJQB4gPBgAUQAzAKAlAUQAmAVASAlQAUApgUAfQgQAWgkAJIhBAMQgfAGguATQg8AYgQAFQgeAKgsAHIhMAMQh0ATiVAvIkDBXQhWAdg1AHQhPAJg5gbIgcgOQgRgJgMgDQgRgEgWACIgoAGQhqAUhtAEQg/ADgrgLQg6gOgcgmQgyAehIABQgkAAg7gIQg/ANg0gIQgngHglgSQhAABhVAUIiZAoQhZAWhEACIgLAAQhQAAg/gag");
	this.shape_30.setTransform(274.053,595.8801);

	this.timeline.addTween(cjs.Tween.get(this.shape_30).wait(91));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(26.9,47.4,524.7,578.4);


(lib.background_field = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.field();
	this.instance.setTransform(69,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.background_field, new cjs.Rectangle(69,0,1228,768), null);


(lib.arrow = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#666666").ss(2,1,1).p("AM4jFIAJAAAM4DOIAAC+IIwmNIowmKIAADGANBDOIgJAAMgifAAAIAAmTMAifAAA");
	this.shape.setTransform(138.425,39.575);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AHIBvQgRgIgJgMQgKgMgDgNQgEgUgBgmIAAh5IAuAAIAAB6QAAAeADAJQACAOALAIQAMAJATAAQATAAALgIQAKgIABgMQACgMAAgbIAAh9IAuAAIAAB3QAAApgDARQgEARgKAMQgKALgRAHQgQAHgbAAQgiAAgRgHgAotBXQgegfAAg3QAAgiALgXQAHgSAOgOQAOgNAQgHQAVgJAcAAQAzAAAeAfQAeAfAAA3QAAA4geAfQgeAfgzAAQgyAAgfgfgAoKg6QgRATAAAnQAAAnASAUQASAUAbAAQAcAAASgUQARgUAAgnQAAgngRgTQgRgUgdAAQgcAAgSAUgAsRBXQgegfAAg2QAAg4AeggQAdgfAwAAQAqAAAaAZQAQAOAIAcIguALQgEgSgNgKQgNgLgTAAQgZAAgPASQgQATgBApQABAqAQASQAPATAZAAQASAAAOgMQAMgMAHgZIAsAOQgKAmgYASQgYASglAAQgtAAgdgfgAKCByIAAjjICqAAIAAAmIh7AAIAAAzIByAAIAAAmIhyAAIAAA+IB/AAIAAAmgAE+ByIhciUIAACUIgrAAIAAjjIAtAAIBdCXIAAiXIAsAAIAADjgABdByIAAjjIAuAAIAADjgAgvByIAAi9IhEAAIAAgmIC1AAIAAAmIhDAAIAAC9gAjBByIhciUIAACUIgrAAIAAjjIAtAAIBdCXIAAiXIArAAIAADjg");
	this.shape_1.setTransform(115.1,39.525);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#7D7D7D").s().p("ARLDKMgifAAAIAAmTMAifAAAIAKAAIAAGTgAHHADQAAAmAEAUQADANAKANQAKAMARAHQARAIAhAAQAbAAAQgHQARgHAKgMQAKgMAEgRQAEgRAAgpIAAh3IguAAIAAB+QAAAbgCALQgCAMgKAIQgKAIgUAAQgTAAgLgIQgMgJgCgOQgCgJAAgdIAAh7IguAAgAnjhxQgQAHgOAOQgNAOgIARQgKAYAAAjQAAA1AeAgQAeAfAzAAQAyAAAeggQAegfAAg2QAAg4gegfQgegggzAAQgcAAgVAJgArnhaQgeAfAAA5QAAA1AeAgQAdAfAuAAQAkAAAYgSQAYgTAKglIgsgOQgGAZgNAMQgOALgSAAQgZAAgPgSQgQgTAAgqQAAgpAQgSQAQgSAZAAQASAAANAKQANAKAEASIAugLQgIgbgQgPQgagZgqAAQgwAAgdAggAKsBuICuAAIAAgnIh/AAIAAg+IByAAIAAglIhyAAIAAgzIB7AAIAAgnIiqAAgAFoBuIAvAAIAAjkIgrAAIAACYIheiYIgtAAIAADkIArAAIAAiUgACHBuIAuAAIAAjkIguAAgAhJhPIBEAAIAAC9IAtAAIAAi9IBEAAIAAgnIi1AAgAiXBuIAuAAIAAjkIgrAAIAACYIhdiYIgtAAIAADkIArAAIAAiUgAnfA2QgSgUAAgmQAAgnASgUQARgTAdAAQAcAAARATQASATAAAoQAAAmgSAUQgSAUgbAAQgcAAgSgUg");
	this.shape_2.setTransform(110.875,39.975);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.lf(["#8C8C8C","#FFFFFF"],[0,1],-28,0,28.1,0).s().p("AkXDOIAJAAIAAmTIgJAAIAAjGIIvGKIovGNg");
	this.shape_3.setTransform(248.825,39.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arrow, new cjs.Rectangle(-1,-1,278.9,81.2), null);


(lib.squirrel_smiling = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// eyes
	this.instance = new lib.squirrel_eyes();
	this.instance.setTransform(95.45,-76.9,1,1,0,0,0,39.5,17.5);

	this.instance_1 = new lib.squirrel_eyes_closed();
	this.instance_1.setTransform(97.05,-75.15,1,1,0,0,0,40.2,18.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},17).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance_1}]},4).to({state:[{t:this.instance}]},2).wait(54));

	// body
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#827567").s().p("AlSM4Qg7gphChBQhBhAgkg+QgthKgGhNQgGg+AJh6QAHhfAOheQAQhpAZhGQAahNAxhDQArg6BAg7QAxguBKg3QEQjJFSi4IAmgUIASgJQAAAFAHAFQAPALAMgPIACgEIAHACQAFAOAGAMQAHAMALAPIAUAaIAXAiQAOAWAKAMQAVAYAlAXIgFAEQgYAQgjAKIg/APQhgAVhSAgQiLAziCBVQhbA8hIBDQiIB+hZCoQhXCngbC4QgMBWAKA6QAHAqAUAuQAPAiAbAxQBAB1A3BLQAWAeAWAaQg3gWg3gmg");
	this.shape.setTransform(-45.6918,37.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C9C7C7").s().p("AnAObIgRgRQgKgKgJgFQgNgGgOAEQgHACgIAGIgCADIgKAJQgogdgjgsIgFgKIgrhAIgFgGQgQgegPgiQg7iHAGhpIAAgDQACgcAJgtIANhJQAEglABgxIgBhXQgBhQAGg7IAAgEIACgOIABgLIAAAAQAJg6APgyIALgfIAjg3QAXgdAqgVQAZgMA0gSQBggfAygFQBYgJA6AjIAdASQARAKAOACQAHACATAAQADAGAJAGQAPAJAVAEIAQACQAGAJAFALIACAEQgFARAAATQAAARAHAHQAGAFAPABIAsACIAMABIABAAQAbAAARgCQAcgFARgPQAhgfgKhKQgDgbgGgaIADALQgCg5gVg2IgWgyQgNgegFgVQgHggADhCIAGhwQABgdAEgRQAIggAZggQBcgiBcgPQCFgVB5AWQBSAOBBAhQAYAMAVAPQAGAvgBA+IAAAEQgBA8gJAzQgGAkgdBdQhgE/iWEpQhQCfhpCnQgGAJAHAIQAGAHAKgCQBbgQAtgDQBMgEA7ARQA1APAoAhQAmAgAQAqQgVAIgdgEQgGAAg5gNQgngKgZAAQgkABgYASQgKAIADAJIALAhQlUhTlcAsQhkAMhkAYQgIACgCAIQgCAJAFAGQBHBJAeArQAoA7ALA5Qg9ghgzgvQgGgFgJACQgIABgCAJIgJAuIgKAuQgDASgIACIgBAAQgFAAgJgIg");
	this.shape_1.setTransform(34.5696,68.6164);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#A39E9F").s().p("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");
	this.shape_2.setTransform(30.6556,13.8605);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("ABTCaIgOgHQgHgDgDgDIgBgFIARACIAQABIAJAAQAAAEADAFIAFAJIgBAAIgDABQgKAAgLgEgACDCIIAAAAIACgBIABAAQAMgCADgGQADgFgBgGIAAgFQAAgkAEgqIAAAAIgFgJQgCgFgCgJQgCAHgGAGIAAABQgKAPgNAMIgJAHQgYATggAJIgVAFQgpAIgtgMIAAABIgBgBIgFAAIgBAAIglgNQg/gwgagYQgdgYgMgVQgHgMgDgNIgTAIQgJAEgFAAQgJAAgCgIQAAgGAFgFIAKgJQgJgCgCgJQgBgJAIgFQACgCAKgBIAegCIADgDQAKgGAIAGIABACIAQgCQALgBAFACQAKAGgDAHQgBAFgJADIgeAOQgBAPAKAPQAGAJATASQAjAfA0ApIAFADIACACIADABIACABIACABIAMADIACABIAYAFIAEAAQAiAKAqgKQAhgIAWgSQAbgVAHgbIAEgKQgHACgIgCIgMgEQgGgCgDgDQgJgGgEgNQgDgHAAgFIABgHIgBgEIACgMIgBgFQABgJAIgEQAJgEAHAJQAFAGACAKQAFABAIgDQAOgGAFgJQAGgMgIgLIgIgHQgEgGABgEIAEgJIADgIQAEgEAJAAIARABQAQABALAEQAMAEAFAGIAEAIIAEANIADAKIAEAEIACAGQADgCAGABQAIACANAKQALALAEAIQADAFACAMQADAQgBAIIgDAQQgGARgIANQgOAWgZANQgVAKgTgEQgGgCgGgDIACA4QAAAMgCAGIgHALQgIAKgFACIgLACIgGABIgJgRgADnhGQgCAIgIAIQgQARgXAEIgMADIgBACIgCADIgBADIAAAKIAAAFIAAAAIgBAGQAAACACACQAHANAFAGQAKAKAKAAQAIABAJgEQARgHAOgUQAIgLADgKQADgOgDgVIgDgNQgFgKgMgJIgEgEQAAAMgDAIg");
	this.shape_3.setTransform(96.0015,-40.8472);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("ABKC7IgPgBIgSgBIgEgBQgJgBgCgCQgEgCgEgFQgHgKABgHQAAgFADgDIgCgFIAAgEIAVgGQAggJAXgTIAJgHQANgMAKgPIABgBQAFgGADgHQABAJADAFIAFAJIAAAAQgEAqAAAkIgBAGQACAFgDAFQgEAGgLACIgBABIgCAAIgBAAIAAAAQgKACgNAAIgEAAIgDABIgKAAgAiKi6IABAAIgBACIAAgCg");
	this.shape_4.setTransform(97.675,-45.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("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");
	this.shape_5.setTransform(22.9597,14.3012);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_5},{t:this.shape_2},{t:this.shape_3},{t:this.shape},{t:this.shape_1},{t:this.shape_4}]},17).wait(62));

	// tail
	this.instance_2 = new lib.squirrel_tail1();
	this.instance_2.setTransform(-84.8,-34.3,1,1,0,0,0,97.2,147.7);

	this.instance_3 = new lib.squirrel_tail2();
	this.instance_3.setTransform(-82.8,-45.8,1,1,0,0,0,99.2,136.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2}]}).to({state:[{t:this.instance_3}]},7).to({state:[{t:this.instance_2}]},42).to({state:[{t:this.instance_3}]},7).wait(23));

	// shadow
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(0,0,0,0.118)").s().p("Al/F2Qg5gDgrglQgugoABg0Qhughg5gMQhegVhNACIhFADQgoACgcgFQgigHgogTQgZgNgsgbQgygfgYgTQgmgfgTghQgYgpABgyQABgyAZgoQAYgmAtgeQAjgXA1gVQCohBC9gLQCGgJBaAdQATAGAjAOQAlAQAQAFQAjANBGAOIDlAxQA1AMAdAAQAsgBBwgwQBhgpA6APQARAEAoAUQAlARAWADQAaADA7gNQA3gMAdAIQAOAEAaAQQAZAPAOAEQAZAGBBgKQA4gKAcARQAJAFAYAXQAUATAQAEQAQADAVgIIAjgQQA4gYBFATQA8AQA5AtQBDA1AMA4QANA8gtA6QgoA1hDAbQgoARhXASQhWATgpARQhRAogoAPQhHAbgygWQgKgEgZgQQgWgOgOgEQglgNg4ATQgWAIhjAuQhJAigzAGQg8AHg7gYQg6gYgmguIgRgUQgLgLgLgDQgRgFggAQIh/A/QhBAfgkANQgyAQgrABIgNgBg");
	this.shape_6.setTransform(-17.5213,133.5398);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(79));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-182,-182,338.5,353);


(lib.squirrel_pirate_smiling = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// sword
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#474747").s().p("AhWB8QgEgEABgFQABgGAEgEQAFgGANgEIAbgJQAVgHAKADIAIAEIgPAkIgIAAIgVAFQgKACgPAAQgNAAgEgFgAhGA0IAJgcIACgHIALgCIAngIIAFAAQAFgBAKADIAJAFIAEAEIgJAaIgFABIgKAAQgHgBgNADIgfAJIgNAEIgJABIADgJgAgvgZIAMgrQAqABAqgEIAOgBIgBADIgMAYIgJARQglAEgnAAIgMgBgAArhSIg9gCIgMgBIAGgRIABgCIAJgYIARAAIAYABIATADIASADQAMABAEACQAIAEACAKIgBAHIgFABIgEAAIgBAAIgBAAIgCAAIgDAGIgEAIIgDAAIgKABIgNgBg");
	this.shape.setTransform(280.1697,343.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CCCCCC").s().p("AlvF6IAQgRIAAAAQD7iuDdkIQBoh8BkiTIArgkQgnA8gsA8QheCBiBCTIg+BFQijCwjKCAQgDgDABgEg");
	this.shape_1.setTransform(217.4162,419.4875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#666666").s().p("AmBGNIAMgMQgBAEADADQDKiACkiwIA9hFQCBiTBeiAQAsg9Ang7IgrAjQhkCThoB8QjdEJj7CtQAjgnAYglQApg/AUhJQAUhJgDhLIAAgZQABgOAHgJQAHgJAPgFQAFgCAUgDQBAgNBIglQAsgYBRg0QCLhcBEg0QA7gtAvgsQgzBOhJBfIiPC4IhHBcQgpA0giAlQggAihOBDIhIA9QgqAhgjAXQgnAahNAoIgdAQIAXgXg");
	this.shape_2.setTransform(218.0125,418.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AqXMiQgIgMADgMQADgMAOgMQADgMAJgIQB8h2A5hpQAjhCAOhFQAOhKgNhEIgEgZQgBgOADgLQAHgUAagLQAOgGAjgHQBBgNBKgnQAsgYBTg3QCOhfBFg2QBlhOBHhPIgWgMIgigQQgTgKgLgKIgMgKQgIgGgGgCIgQgEIgBgBIgCAAQgJABgMgFQgOgGgGgJQgHgKACgOQACgOALgHQAMgJARACQALABAHAEIALAHQAEAEALAFQAGAEADAIIAAAHIAJAIQAGAEATAKIBSAnQAWgdAdgpIAGgRIgDAJIAJgBIANgEIAfgJQANgDAHABIALAAIAEgBIAJgaIgDgEIgJgFQgKgDgGABIgFAAIgnAIIgLACIABgEIAKgnIANABQAoAAAlgEIgHAOQgPAygUAzIgIgEQgKgDgVAHIgbAJQgNAEgFAGQgEAEgBAGQgBAFAEAEQAEAFANAAQAPAAAKgCIAVgFIAIAAIgXAyIAAAAIAPADIAWgHQAegLAQgJQANgIANgMQAngjANgpQAKgggFgoQgDgfgOgpIgDgJQgMADgMABIAGgBIABgHQgCgKgIgEQgEgCgMgBIgSgDIgTgDIgYgBIgSAAIAFgNIgHgFQgJgIgEgIQgGgMACgRQACgLAGgTQAKgcAJgMQAGgHAJgJIARgPIAWgVQANgMAMgEQARgFAVAFQAOADAXAKQAYALAHAJQAHAIACAMQABAKgEAKQgEAJgKAQQgGAOADAeQAEAegFANQgFAQgQALIASA8QANA2gHAoQgGAfgUAiQgMAVgdAlQgOATgIAFQgLAHgXAJIgFAEIAWANQAbAPARAFIATAFQAKADAGAFQAJAGAEAJQAFAKgBAKQgBAKgHAJQgHAIgKADQgTAFgUgOQgHgEgJgJIgQgNQgNgLgXgNQgggSgRgFIgCgBIgTAFIglAPIgBAAQgoBGgzBHQgnA3hMBeIiVC5QhOBjgvAxQhJBLh/BgQhqBShNAnIhYArQgxAcgaAhQgKAPgIACIgGABQgIAAgHgJgAClg3QhEA0iLBbQhRA1gsAXQhIAmhAAMQgVAEgFACQgOAEgHAJQgHAJgCAOIAAAaQADBLgUBJQgUBJgoA/QgYAlgkAnIAAAAIgQARIgMANIgXAWIAegQQBMgoAogaQAjgXApghIBJg9QBOhDAggiQAjgkApg1IBFhdICQi4QBIheA0hOQgwAsg6AtgAG/oiIAFgRIAMABIA+ACQAOABAJgBIACAAIgFAKIgOABQgkADgjAAIgOAAg");
	this.shape_3.setTransform(231.8944,391.3455);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// hat
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#A39E9F").s().p("ACTBFQgOgDgegNQgcgMgRgDIgXgCIgKAAIgBAAIgCAAIgIAAIgIgBIgGgBIgHgBIAIgPQAQgXAkgcIABABQgJAMgMAMQgEAEgCADQgDADAEAEQADADAFgCQADgBAEgFQARgPASgJIgFgCIAKAEIgCAHQgBADABADQACAEADgBQADAAACgEIADgGIARALIACABIAXAQIAXAMQANAHAFAGQAJAKgEAKQgDAJgMADIgCABIgFAAQgGAAgHgCgAgjAXIgJgDIgBgBIgDgBIgIgDIAHACIA/gyQgDAOgLAPQgDAEgTAVIgEAFIgJgDgAhWAIIgMgCIgBAAIAAAAIgXgCIgIAAIgTgDIgKgCQgMgFgGgHQgGgHABgLQABgLAHgFIAHgDIAHgEIAIgIQAFgDAJABIAPACIAMgEQANgFAQABIAHABIACAAIAHACIACAAIAUAFIABAAIAWAGQgJAOgHAHIAHgMQADgKgHgCQgEgCgFAFIgEAJQgDAFgFAFIgCACIgMAKQgIAGADAHIAAAAIAAAAIABADIAAAAIABACIgBAEQgDADgCAIIAAABIgIgBgAgagXIAAAAIAXgcIABABIACAAIADACIABAAIAFABQgRAMgYAUIgCABgAAggoIAFACIgIAFIADgHg");
	this.shape_4.setTransform(518.0689,162.3812);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("ADsDhQgFgJABgLIADgUQAAgMgEgHQgEgHgNgIQgdgRg6gXIgbgKIgEAGIABgFQABgHgEgGQgEgHgPgKQgPgMgIADQgKAEABAQIAGAYQAFAOgDAJIgGAMIgBgGIgHAEQgHADgGgFQgFgEgBgPIgBgMIgJASQgHAOgCADQgIAJgJgEQgHgDgDgNQgGgWACgvQgQAOgCAVIAAAaQgBAIgDAFQgFAGgGABQgIACgGgGQgGgFgEgJIgEgPQgDgKgEgFIgCABIgDgFQgIgIgUAFIgTAFQgKADgFAEIgjAPQgkAMgJAEQgYAMgIATQAPgGAKAEQAHACADAGQADAHgDAFQgCAEgGADIgJAEIgGAGQgEAEgDAAQgIACgIgKQgLgNgDgOQgYgEgLgIQgIgFgEgIQgFgJABgIQACgJAJgGQAJgFAHAFIAIAGIAHAFQAFACAKgDIAdgMIB4g4IAHgGQgEAAgEgDQgDgDgBgFIgBgPQgIgKgFgLQgLgWgEgvIAAgDIhOg2QgWgOgLAHIgLAKQgGAGgGAAQgGAAgEgGQgDgGgBgIQAAgLAFgJQAGgKAJgBQgFgeAPgSQAIgKAOgCQANgDAKAIQAKAIgBAOQgCAPgMADIA6AnQALAJAAAGIgBALQAAAFAIAFQgDgMAFgIIAAAAIABgGQACgLAHgBIAEABIAIgOQAHgMAMgKQASgOAWgFIABAAQAJgHARgGIAkgNQAUgHAKACIAFACQAKABANAIIAWAPQAUAMACAJIABAHQABAEABACQACADAJAFQAfAMAIAZQAEAMgBAWIAAgBQACgCADgPQADgJAHgJIgHAYQgEAOgGAZIgEAYIACgBIAIgJQAFgEAUgDQAdgEAZgMQgEgHAGgJQAEgFAIgIQAHgHALgRQAGgGAHgDQAJgCAGAEQAIAEABAOIgDAVIAZAeQAHAHADAGQADAIgBAIQgBALgIAFQgKAGgKgHQgIgFgFgLQgvgGg3AcIgXALQgNAFgLAAIgNgCQgFAAgGADIgIACIgGARQgDAOADAJQADAFAGADQAGACAEgDQgGANADAGQAEAHAOAAIASAAIALAFQArARAXAMIAvAaQAbAOAVAGIAUAFQAMADAHAEQAJAGAFAJQAFAKgDAKQgFAOgTADQgMABgTgGQgMgEgIADQgFACgJAKQgJAJgGAAIgBAAQgJAAgFgJgAhPA6IADAHQACgBAEgHIAEgHIgNAIgAhhh6QgKACgEAEQgGAHAEATIAGAXQAEARADAGQAIAMALACQAGABAQgGQAMgEADgFQAEgFABgJQABgNgCgFIgFgLQAGgIgBgLQgCgKgGgEQgGgFgQABIgCACIgJAAIgIgBIgIABgAgFiDQgFADgDAEQgCAFABAKIACAYQABAPACAGIAJAOQAEAHADACQAJAGANgGQAQgGAKgOQAIgNgCgKIgEgNQABgKgCgFQgCgHgJgDIgOgFIgIgGQgFgDgGAAQgIAAgJAFgAgQhFIAEgHIgEAAgAgcjDIABAAIALACIgEgEgABJCdQADgDAEgBQgCAEgDACQgDACgEAAIAFgEgABbBxIACgBIgBABIAAAAIgBAAg");
	this.shape_5.setTransform(450.1889,114.3183);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFCC").s().p("ASDF6IACgEQiIgTh6hDQh/hFhbhtQgfgkgwhGQg1hNgYgeQhNhihlhIQhXg/hJgQQg+gNhnANQlQAsi2CsQgZAYhdBrQhHBRg4AmQhMAyhcANQhdANhWgdQBngBA2gIQBWgMA9ghQA8giBDhLIBwiCQBphtCYhCQCMg8CjgSQBugLBMARQBkAXBfBOQBJA9BRBoICICyQBSBkBOA2QBDAtBjAlQAgAMB/ApQAFgHACgEQACgFAAgJIACgOIAFgOQAEgJABgGQAAgJgHgRIgjhPQACgCAEAAQAEgBADACQAEADAFAIIAWAiQANAWAFANQAHAUgEARQgCAJgGARIgCARQgCAKgDAGQgCAEgIAGQgBADgFADIgCABQgJAIgCAHIgNADQgEgFABgIgAwJCZQgagCgXgMQgegPgagjQgQgVgZgsQgPgbgFgMQgKgWgEgTQgDgPAAgnIAAhQQAAgLAFgCQAFgDAFAGQAEAFAAAHQABANAAASIgCAgQAAA/AbA8QAcA7AxApQAjAcAeAFIAZAEQAPADAFAJQgTAGgUAAIgKAAg");
	this.shape_6.setTransform(434.5696,111.497);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("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");
	this.shape_7.setTransform(431.067,133.2079);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]}).wait(1));

	// Layer_1
	this.instance = new lib.squirrel_smiling();
	this.instance.setTransform(283.35,290.9,1.6737,1.6737,0,0,0,-12.7,-8.2);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AAxFNQgIgEgHgJIgBgBQgLgEgOgJIgMgLQgbgBgcgHQgrgKgWgUQgLgLgVghQgUgjgJgVQgRgngJhAQgIhGgHgjQgKgwgTgVQgGgGgNgKIgTgPQgTgSgIgaQgJgaAFgZQAEgaARgVQAQgWAYgKQAdgNA2ACQCQAEBPA/QAQANAfAcQAdAZAdALQAUAJArAMQAlAMASASQAQAQAGAWQAGAWgGAWQgDAOgOAZQgPAZgEANIgCAKQAEgBAEABQAEACADADIAFgEIAHgCIALgQQAGgKAGgDQAJgHAJAEQAIAEABAKQAAAGgDAMIgOArIgnBVIgRAgQgKAQgUAaIgVAZIgFAGIgCADQgTAZgeAQQgOAKgUAKQgaANgTAAQgLAAgIgEg");
	this.shape_8.setTransform(505.1721,177.7164);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.squirrel_pirate_smiling, new cjs.Rectangle(0,0,566.6,590.8), null);


(lib.phone_zoom = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.phone();
	this.instance.setTransform(-36,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(49));

	// msk (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AxYfWMAAAg+rMAiyAAAMAAAA+rg");
	mask.setTransform(171.25,308.05);

	// Layer_2
	this.instance_1 = new lib.map_zoom();
	this.instance_1.setTransform(222.45,312.2,0.6867,0.6867,0,0,0,406.8,294.6);

	var maskedShapeInstanceList = [this.instance_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regX:407,regY:294.5,scaleX:1,scaleY:1,x:260,y:208.5},24).to({regX:406.8,regY:294.6,scaleX:0.6867,scaleY:0.6867,x:222.45,y:312.2},24).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-36,0,400,600);


(lib.phone_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.phone();
	this.instance.setTransform(-36,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// msk (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AxYfWMAAAg+rMAiyAAAMAAAA+rg");
	mask.setTransform(171.25,308.05);

	// Layer_2
	this.instance_1 = new lib.map_zoom();
	this.instance_1.setTransform(222.45,312.2,0.6867,0.6867,0,0,0,406.8,294.6);

	var maskedShapeInstanceList = [this.instance_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.phone_1, new cjs.Rectangle(-36,0,400,600), null);


(lib.mall_map_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.food_text();
	this.instance.setTransform(696.4,215.5,1,1,0,0,0,81,15);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regY:14.9,scaleX:1.425,scaleY:1.4247,x:702.45},12).to({regY:15,scaleX:1,scaleY:1,x:696.4},12).wait(1));

	// Layer_1
	this.instance_1 = new lib.mall_map();

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(25));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,818,400);


(lib.gps_graphic = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.signal();
	this.instance.setTransform(349.6,173.7,1,1,45,0,0,37.4,3);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:258.75,y:82.85,alpha:0},23).to({scaleX:0.9999,scaleY:0.9999,rotation:-45,x:203,y:87.9,alpha:1},1).to({x:138.75,y:154.15,alpha:0},23).wait(1));

	// Layer_1
	this.instance_1 = new lib.GPS_noSig();

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(48));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,512,512);


(lib.bluejay_flat = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// eye
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAcBIIAQgIQAGgFAHgOIAMgYQAIgUgDgNQAAgEgDgHIgFgMIgFgSQgEgLgFgKIANAGIAdARIAOAJQAAAFAEAGIABABIgBADQgFAKgBAGIAAAMIgDAMIgJAOQgDAJgDAFQgEAFgKAHQgLAIgMAGQgHAFgIABQgGACgGAAIAEgDgAhiAbQgMgHgBgGQAEgBACgFQAAgFgDgDIgEgCIACgHIAEgIIABAGIACAMIAFAXIABADgAgxgCQgHgCAAgHIABgHIAAgLIADgLIADgJQACgGAEAAQABAAABAAQAAAAABgBQAAAAABAAQAAAAAAAAQAJACADAIQAEAIgEAHIgGAHQgCAEgBAKQgDAIgIAAIgCAAIAAAAg");
	this.shape.setTransform(120.825,80.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgPBpIgVAAQgNAAgGgCQgUgEgMgNQgEgEgFgHIgBgBQgNgFgQgKIgKgFQgGgEgGgFIgLgPIgEgEIgCACQgKAHgHABQgFABgNgEQgIgEAAgCQgCgDACgEQACgEADgCIAPgEQAPgEAOgYIAagwQATgaAXgIQANgEATAAIAhABIATgBQALAAAIABQAOACAWANQAPAHAPAKIABABIAYAQQAMAIALAEIAKAKIADADIANgBQAWgBAIgGIAHgFIAHgEQAEgBAFACQAEABABAEQAAAEgFAFQgRARgQAGQgMAEgTAAQgRgBgNgEIAAACIgHAIIgCAPQgBAHgGALIgLASIgIAOIgMAJIgcARQgRAKgNACIgNABIgIAAgAAjgxIAFATIAFALQADAHAAAFQADANgIATIgMAZQgHAOgGAEIgQAJIgDADQAFAAAGgCQAIgCAHgEQAMgGALgIQAKgHAEgGQADgEADgKIAJgOIADgMIAAgLQABgHAFgKIABgCIgBgCQgEgFAAgFIgOgKIgdgQIgNgHQAFAKAEALgAiIgEIgCAFIAEAEQADACAAAGQgCAFgEAAQABAHAMAGIABABIgBgEIgFgXIgCgLIgBgGIgEAIgAAOgOQgBAFgDAGIAAAFQAEgDAAgLIAAgGIAAAEgAhFgzQgEAAgCAGIgDAJIgDALIAAALIgBAHQAAAHAHABIAAABIAAgBIACAAQAIAAADgGQABgKACgEIAGgIQAEgHgEgIQgDgIgJgCQAAABAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAgAgHgxIAEAAIgHgCIgEgBQAEADADAAgABZhUIACAAIACACIgEgCg");
	this.shape_1.setTransform(123.4056,79.9667);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// body
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#666666").s().p("AAiEdQAGgOAIgdIAdhtIAMgtIAHgeQAFgXABgQQABgYACgGIAIgUQAFgNAAgIIgCgLQgBgGACgEQABgDAFgGQAFgGABgDQABgFgDgDIAKAFIABABIAZAJIABAAIABABIABAAIACAAIALACIAHABIAMAAIABACIAHAOIgEAHIhjDTQggBMgYBGQgHgFgJAEIgEACIAHgQgAjLB2QAAgNADgEQAGgHACgEQAFgIgGgIQgFgIgHAAQAZghANgUQASgbARgmIAdhFQADACAEgBQAEgBACgDQAEgFABgJQAGgngGgwQgEgagLgxIAqAaQAlAWAcAIIAFAIQgBAJACALQACAHAGAPIgBABQgPAigpAqQg0A2gNASIgTAdQgMASgIAKIgUAaQgHALgIAYQgEAJgTAgIgFAJIAAgFg");
	this.shape_2.setTransform(186.5625,287.0125);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#CCCCCC").s().p("AEtPaIAAAAIgBgBIAAAAIgBgBIABgFIAAgFIAFAKIAEAFIABADIgJgGgAGWKaQhXgDhEgPQhogVhng3QhBgjgkglIgXgaQgOgOgNgHIgCgBIAEAEIgtgzQg1g+gthDQgDgUAAgPQABgYAIgVQAKgWARgOQAXgRAlgBQAaAAAnAJQArALApAOQA7AlAoASQApATBWAdQB1AnBDASIAJADIAPAIIDkCCQAYAOAMALQASAQAEATQAEAWgPAWQgNATgWAPQgYAQgiANQgTAIgrAOIgHACIgeAAQhDAAgmgCgAPgH3IAJACIgDAPIgFAAIgBgRgAvKsvQgWgCgGgKQgHgMAPgUQAXggAuglIBNg/IABAIQADAQAOAXQARAbAEAKQgZAiADAkQACARAIAOQhQgBhJgIg");
	this.shape_3.setTransform(169.1985,178.3375);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#304354").s().p("ABaCcIiChBQgWgKgKAIIgBABIgKgBQgJgOgBgRQgEgkAZghQgEgKgRgbQgOgXgDgQIgBgIIABAAQANgNACgJQACgGgCgGQAEAAAFgDQAIgGABgKIAAgCIABgDIAAgFIANgFQAQgFAQADQAdAFAcAgQAVAXAPAaIAAABQABAiAPA0QgYgKgVAXQgVAYAGAcQAEAQAMAQIAMANQAOAOAeAUIAWAQIgWgMg");
	this.shape_4.setTransform(95.825,88.7438);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#999999").s().p("ADSNcIgHgNIgBgCIgMAAIgHgBIgLgCIgDAAIgBgBIgBAAIgBAAIgYgJIgCgBIgBgDIgEgFIgFgKQABgMgFgGIgFgFIgFgCIgLgGQgFgEgFgHIAAgBIgJgNQgLgLgEgHIgKgSIgFgNIgFgEQgKgIgFgNQgDgJAAgJIgFABIgCACIgIgKQgHgJgQgMIglgaIAAAAIgPgLQjfiiiKigIgCgCIgDgDIgIgKIgwg5QgdghgXgVIhGg7QgqgjgVgdQgVgcgQgoQgKgZgQgzIhIjxQgRg3gEggQgGgxAQglQAKgXAkgrQAigpAJgaQAGgTABgXQAJgBALgDQAXgGAjgVQBOgsBEgtQAegTAMgQIAFgIIgNAfIgBAEIgFAMIgGATQgQAygEArIgBADIgBAdIAAAEQABAtALAyQAWBsA5BbQAIAJAFALIAAABIAOASQAZAjAzA3QA4A+AVAbQATAYAkAzQAiAtAbAaQAiAfBOAwQA/AlAmAUQA5AeAxARIASAGQhDgSh1gnQhVgdgpgTQgogSg8glQgpgOgrgKQgngJgaAAQglABgXARQgRANgKAWQgIAVgBAYQAAAPADAUQAtBDA1A+IAtAzIgEgEIACABQANAHAOAOIAXAaQAkAlBCAjQBnA3BnAVQBEAPBXADQAvACBYAAIAHgCQArgOATgIQAigNAYgQQAWgPANgTQAPgWgEgWQgEgTgSgQQgMgLgYgOIjkiCIgPgIIAAgBIANAEIA7AOIAIACQAiARAwAOQAqAMBUAVQASAGAiAMIAzASQAlAMBQASIBHAPIAAAAIABARQgGACgGAFQgrAhgkAMQgNAFgfAHQgbAHgPAGQgNAFgRAKIgdAPQgSAKg5AYQgvAUgaAQIgiAUQgKAGgVAIIggANQgpAUgoA0QgpA3ANAoQAEAOAKACQAMABAGgMIABAAIAAABIgGAKQgCADgBAHIgGAUIgCAKQgGAEgGAHIgEAFQgHAIgIAOIgFAKIgHAOIAEgIg");
	this.shape_5.setTransform(186.1913,194.4375);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#BCD6F7").s().p("AG9K+IgBgBQgEgDgDgBIgFAAQgLgFgIgJQgMgNgFgQQgGgRADgRQgYAHgagIQgagIgOgVQgPgVADgbQAEgcATgQQANgKAYgHIAogMQANgEAvgZQAkgTAZgCQANgBAaABQARgCARgHQAbgLAWgYIAQgSQAJgKAIgGQAOgKASgCIABAAIAjAcIgfBUQg2gTgYgNQgNgHgIABQgKACgCAMQgDAMAGAJQAGAHAKAGIAUAHIAGACQAcAJAzATIAJAEIgJAJIgsAsIgNgEQgXgIgVgEQgmgJgfABQgKABgGAEQgIAFABAHQACAIARADQBBAJAjALIABABIAEABIgQAQQgTASgHAOIgEgCIg9gTIgIgCIgDgBIgNgEQgMgCgKACQgMACgCAJQgBAKAMAKIAFADQASANAmAMIAgAKQgHAFgKAFIgiAMIgdAMQgSAIgMACIgKABQgKAAgKgDgAoyiBIAAgCQAAgQgCgeQgDgggEgSQgGgcgNgSIAAgBQgMgPgUgOIgBAAIgFgDIgFgDIgFgDIgBgBIgWgPQgegVgOgNIgMgNQgMgQgEgRQgGgbAVgYQAVgZAYALQgPg1gBghIAAgBQgBgxAWgfQAZgiA5gRQBRgYBVAVQBWAUA9A6IAQARIAJAKIAEAGIAAAAQAMAQAHARIAEAMIADAJIABAFQAFAggLAoQgHAagVArIgoBcIgGAHQgLAQgfAUQhEAshNAtQgjAVgYAGQgKADgJAAgAnWniIANgBQAKgDANgOQASgUAPgYQgZgKgegHQg7gPglAMQgSAGAAAMQgBAHAIAGQAEAEALAFQASAKALAPQAJANAFACQAEACAHAAIALgBIANABgAmLqSIAEACIgDgCIgBAAg");
	this.shape_6.setTransform(171.0232,136.8664);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#446077").s().p("AHALwQhSgegrgLIg3gLQABgQAGgRQAHgOARgaIANgXICnAzIAgAKIB1AiQgYAwgVAWIgPAPQhLgRgtgPgAHyJtIilg3IAagxIAMAFIAaALIACABIABAAIABABQAeAKAsALIBLAQIARAFIANAEQAkAKAuAPQgEAWgEALIgKAbQg4gPhagegAGsH4Ig1gTIAHgPQAPgfANgOIAwARIBEATIgRBBQg0gMgdgKgAqTkuIAGgTIAEgMIACgEIANgfIAphcQAUgrAIgaQAKgngFggIgBgFIgCgJIgFgMQgHgRgMgQIAAAAIgEgGIgIgKIAVgOQAigWAJgIIATgRQAMgKAKgFIALgFIAKgGIAJgIIAKgIQARgKARAJQAIAEAFAIQAFAIAAAJQANABAJAJQAJAGAEAKIgDABQgOAFABAcIACASQgFAFAAACQgBADAEAJQAEALgCAMQgBANgIAJQgJAJgCAHQgCAEABAGIABALQAAASgLASQgHANgRASQgrAuggAfIhpBlQgQAPgLAHQgJAGgJACIACgGg");
	this.shape_7.setTransform(205.3,144.5173);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#7FB3DF").s().p("AhPQsIAGABIgBAGIgFgHgALKKqIgtgKIAPgPQAUgWAZgwIBBAQICXAiIAFABIgWBYQhqgVhsgXgAQqJNQgqgbgygXQg5gbhvgpIAXgrQAaAOAlAWIA5AjIAgATIAqAeQAdAVAPASIAFAGIgGgEgAE1I+QhBgSghgjIgIgIQAPAEAPgCQAMgCASgHIAdgNIAigMQAKgEAHgGIBGAVIgOAXQgRAagGAOQgGARgBAQIg8gOgADgJGIg7gOIgMgEIAAABIgKgDIgSgGQgxgRg4geQgmgUg+glQhPgwgiggQgcgaghgtQgkgzgUgYQgVgbg4g+Qgzg3gZgjIgNgSIAAgBQgGgLgIgJQg4hagXhsQgLgyAAgtIAAgEIABgdIAAgDQAFgrAQgyIgCAGQAJgDAJgFQALgHAQgPIBphlQAfgfArguQARgSAIgNQALgSgBgSIgBgLQAAgGABgEQADgHAJgJQAIgJABgNQACgMgFgLQgDgJAAgDQAAgCAFgFQAEAcALAgQAJAcAVAvIAvBuQA3B+AaA2IA3BqIAZArQAOAYAOAQQAXAaA6AnQA7AoAkAVIAkAUQAUAMAOAKQALAIAYAUQAVAUANAJQAQALAeAPQAjASAMAHQATAMAfAWIgBABQgSACgOAKQgIAFgJALIgQARQgWAYgbAMQgRAHgRABQgaAAgNABQgZACgkATQgvAYgNAFIgoALQgYAHgNALQgTAQgEAbQgDAbAPAWQAOAUAaAJQAaAIAYgIQgDARAGARQAFARAMAMQAIAJALAFQgGABgFAHQgGAIABAKQADAPAVAOQAPALATAKIgIgCgANfJAQg9gJgbgGIgfgHIALgbQADgLAEgWQAxARA8AWIgIArgAF1GxIgNgEIAEABQAHgOATgSIAPgQQATAHAcAMIATAJIgMgFIgZAxgAGvFlIAsgtIAJgJIAbAKQgOAOgOAfIgIAOIgsgPgArVqgIgLABQgHAAgEgCQgFgCgJgMQgLgQgSgJQgLgGgEgDQgIgGABgIQAAgLASgGQAlgNA7APQAeAIAZAJQgPAYgSAVQgNAOgKACIgNABIgNgBgAvHseQgdgggdgFQgQgDgQAFIgNAFIAAAFIAAgNQgBgMACgGQADgNAOgLQAHgHARgNQAKgIAPgWQAPgVAKgJQARgQAngQQA/gbAlgOQA4gUAvgJQAqgIAzgDQAigCA8gBQBJgBAlACQA9ACAwAKQA2AMAtAVQgGALgNAKIgaAQQgiAUgHAWQgEAPAJAOQAJAOAPgCQgGAmAMAhIgBABQgEgKgJgGQgKgJgMgBQAAgJgFgIQgFgIgIgEQgSgJgQAKIgKAIIgJAIIgKAGIgLAFQgKAFgMAKIgTARQgKAIghAWIgWAOIgQgRQg9g6hWgVQhVgUhRAYQg5AQgZAjQgXAfACAwQgPgagVgXg");
	this.shape_8.setTransform(195.2438,155.7425);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#7CB7EE").s().p("AB0EBIAWhXIAEABIAeAIQAFADAIADQAnAPAhAZIATANIAEADIAGAEIAIAIIAUAMIATASIALAIIAGAJQhzgUh3gXgADrCdQgpgVg3gMQgfgHg4gJIAHgrQBTAfAtAVQAdAOAZAPIAeASIAKAQIgDACQgTgOgYgLgAgJABQhJgZglgKQgWgGg8gOIARhBQAqAMAZAJIAyAUQAvATAfAQIAHADIgXArIgEgCgAAyhJIgbgSIADABIAZARIgBAAgAidigIg9gNQgpgJhXgfIgDgCIAfhUQAlAaBPAwQA7AnAhAnIAAACQgcgKgTgFg");
	this.shape_9.setTransform(276.4125,202.575);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("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");
	this.shape_10.setTransform(192.3722,197.8445);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	// tail
	this.instance = new lib.bluejay_tail();
	this.instance.setTransform(314.25,205.7,1,1,0,0,0,60.1,25.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// shadow
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("rgba(0,0,0,0.118)").s().p("AolFFQg4gPgYgrIgUgqQgMgYgRgIQgNgHgUABQgJABgZAFQhkAShbgpIglgSQgWgKgQgFQgUgFgggBIg1gBQg9gFgvghQg0gjgMg2QgJgqAUgtQASgqAkgfQAfgaAugVQAggPA1gSQCsg5CKgYQDrgqB/BWIAeAUQASAKAPACQANABASgGIAegMQA8gWA/ATIAkAMQAVAIAPACQAUACAjgGQAogIAOAAQAmgCAjARQAjAQAXAeIAUAbQAMAPAOAEQAOAFATgFIAhgNQBKgfB1ANQBBAICFASQBXAGCogaQCsgcBTAEQArACAgARQAlAWgCAiQgDA0hfAVQjeAwh0AQQi+AbiYgLQitgNgbABQhwAEhCA0QgYASg3BEQgvA6gmATQgnAUhBADIhuAFQglAGhAAWQhFAYgfAGQgZAGgZAAQgcAAgbgIg");
	this.shape_11.setTransform(210.1108,326.8379);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bluejay_flat, new cjs.Rectangle(66.6,43.3,307.70000000000005,316.8), null);


(lib.arrow_continue_pulsing = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		var _this = this;
		
		_this.arrow1.on('click', function(){
			console.log("clicked Continue arrow");
			if (window.parent.cpAPIInterface){
				window.parent.cpAPIInterface.play();
				console.log("sent to cpAPIInterface");
			} else {
				console.log("no cpAPIInterface");
			}
			
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(91));

	// Layer_3
	this.arrow1 = new lib.arrow();
	this.arrow1.name = "arrow1";
	this.arrow1.setTransform(-81.6,40.4,1,1,0,0,0,138.4,39.6);

	this.timeline.addTween(cjs.Tween.get(this.arrow1).to({regX:138.3,regY:39.4,scaleX:1.0724,scaleY:1.0724,x:-81.65,y:40.25},12,cjs.Ease.quadInOut).to({regX:138.4,regY:39.6,scaleX:1,scaleY:1,x:-81.6,y:40.4},12,cjs.Ease.quadInOut).wait(67));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-231,-3.1,299,87.1);


// stage content:
(lib.maps_overview = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{jay1:1,byrson1:111,earl1:332,bryson2:601,jay2:982,earl2:1164,jay3:1795,jay4:2308,earl4:2396,bryson5:2558,earl5:2731,bryson6:2778});

	this.actionFrames = [0,1,111,332,601,982,1164,1365,1795,2027,2152,2308,2396,2558,2731,2778];
	this.streamSoundSymbolsList[1] = [{id:"G3C2A3mapsoverviewjay1",startFrame:1,endFrame:111,loop:1,offset:0}];
	this.streamSoundSymbolsList[111] = [{id:"G3C2A3mapsoverviewbryson1",startFrame:111,endFrame:332,loop:1,offset:0}];
	this.streamSoundSymbolsList[332] = [{id:"G3C2A3mapsoverviewearl1",startFrame:332,endFrame:601,loop:1,offset:0}];
	this.streamSoundSymbolsList[601] = [{id:"G3C2A3mapsoverviewbryson2",startFrame:601,endFrame:982,loop:1,offset:0}];
	this.streamSoundSymbolsList[982] = [{id:"G3C2A3mapsoverviewjay2",startFrame:982,endFrame:1164,loop:1,offset:0}];
	this.streamSoundSymbolsList[1164] = [{id:"G3C2A3mapsoverviewearl2",startFrame:1164,endFrame:1365,loop:1,offset:0}];
	this.streamSoundSymbolsList[1365] = [{id:"G3C2A3mapsoverviewbryson3",startFrame:1365,endFrame:1795,loop:1,offset:0}];
	this.streamSoundSymbolsList[1795] = [{id:"G3C2A3mapsoverviewjay3",startFrame:1795,endFrame:2027,loop:1,offset:0}];
	this.streamSoundSymbolsList[2027] = [{id:"G3C2A3mapsoverviewbryson4",startFrame:2027,endFrame:2152,loop:1,offset:0}];
	this.streamSoundSymbolsList[2152] = [{id:"G3C2A3mapsoverviewearl3",startFrame:2152,endFrame:2308,loop:1,offset:0}];
	this.streamSoundSymbolsList[2308] = [{id:"G3C2A3mapsoverviewjay4",startFrame:2308,endFrame:2396,loop:1,offset:0}];
	this.streamSoundSymbolsList[2396] = [{id:"G3C2A3mapsoverviewearl4",startFrame:2396,endFrame:2558,loop:1,offset:0}];
	this.streamSoundSymbolsList[2558] = [{id:"G3C2A3mapsoverviewbryson5",startFrame:2558,endFrame:2731,loop:1,offset:0}];
	this.streamSoundSymbolsList[2731] = [{id:"G3C2A3mapsoverviewearl5",startFrame:2731,endFrame:2778,loop:1,offset:0}];
	this.streamSoundSymbolsList[2778] = [{id:"G3C2A3mapsoverviewbryson6",startFrame:2778,endFrame:3583,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		if (window.parent.cpAPIInterface){
			window.parent.cpAPIInterface.pause();
		}
	}
	this.frame_1 = function() {
		var soundInstance = playSound("G3C2A3mapsoverviewjay1",0);
		this.InsertIntoSoundStreamData(soundInstance,1,111,1);
	}
	this.frame_111 = function() {
		var soundInstance = playSound("G3C2A3mapsoverviewbryson1",0);
		this.InsertIntoSoundStreamData(soundInstance,111,332,1);
	}
	this.frame_332 = function() {
		var soundInstance = playSound("G3C2A3mapsoverviewearl1",0);
		this.InsertIntoSoundStreamData(soundInstance,332,601,1);
	}
	this.frame_601 = function() {
		var soundInstance = playSound("G3C2A3mapsoverviewbryson2",0);
		this.InsertIntoSoundStreamData(soundInstance,601,982,1);
	}
	this.frame_982 = function() {
		var soundInstance = playSound("G3C2A3mapsoverviewjay2",0);
		this.InsertIntoSoundStreamData(soundInstance,982,1164,1);
	}
	this.frame_1164 = function() {
		var soundInstance = playSound("G3C2A3mapsoverviewearl2",0);
		this.InsertIntoSoundStreamData(soundInstance,1164,1365,1);
	}
	this.frame_1365 = function() {
		var soundInstance = playSound("G3C2A3mapsoverviewbryson3",0);
		this.InsertIntoSoundStreamData(soundInstance,1365,1795,1);
	}
	this.frame_1795 = function() {
		var soundInstance = playSound("G3C2A3mapsoverviewjay3",0);
		this.InsertIntoSoundStreamData(soundInstance,1795,2027,1);
	}
	this.frame_2027 = function() {
		var soundInstance = playSound("G3C2A3mapsoverviewbryson4",0);
		this.InsertIntoSoundStreamData(soundInstance,2027,2152,1);
	}
	this.frame_2152 = function() {
		var soundInstance = playSound("G3C2A3mapsoverviewearl3",0);
		this.InsertIntoSoundStreamData(soundInstance,2152,2308,1);
	}
	this.frame_2308 = function() {
		var soundInstance = playSound("G3C2A3mapsoverviewjay4",0);
		this.InsertIntoSoundStreamData(soundInstance,2308,2396,1);
	}
	this.frame_2396 = function() {
		var soundInstance = playSound("G3C2A3mapsoverviewearl4",0);
		this.InsertIntoSoundStreamData(soundInstance,2396,2558,1);
	}
	this.frame_2558 = function() {
		var soundInstance = playSound("G3C2A3mapsoverviewbryson5",0);
		this.InsertIntoSoundStreamData(soundInstance,2558,2731,1);
	}
	this.frame_2731 = function() {
		var soundInstance = playSound("G3C2A3mapsoverviewearl5",0);
		this.InsertIntoSoundStreamData(soundInstance,2731,2778,1);
	}
	this.frame_2778 = function() {
		var soundInstance = playSound("G3C2A3mapsoverviewbryson6",0);
		this.InsertIntoSoundStreamData(soundInstance,2778,3583,1);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(110).call(this.frame_111).wait(221).call(this.frame_332).wait(269).call(this.frame_601).wait(381).call(this.frame_982).wait(182).call(this.frame_1164).wait(201).call(this.frame_1365).wait(430).call(this.frame_1795).wait(232).call(this.frame_2027).wait(125).call(this.frame_2152).wait(156).call(this.frame_2308).wait(88).call(this.frame_2396).wait(162).call(this.frame_2558).wait(173).call(this.frame_2731).wait(47).call(this.frame_2778).wait(805));

	// continue_button
	this.instance = new lib.arrow_continue_pulsing();
	this.instance.setTransform(866.75,712.85,1,1,0,0,0,-81.6,40.4);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3582).to({_off:false},0).wait(1));

	// OST
	this.text = new cjs.Text("JAY: I love looking at maps. There are so many different kinds! ", "italic 18px 'Arial'");
	this.text.textAlign = "center";
	this.text.lineHeight = 22;
	this.text.lineWidth = 924;
	this.text.parent = this;
	this.text.setTransform(512.15,34.75);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(111).to({text:"BRYSON: That’s true. A map can show the entire world, like a globe does, but it can also show only part of Earth."},0).wait(221).to({text:"EARL: And with a map on a phone, or computer, you can zoom in or out to see more details in a smaller area or fewer details in a larger area."},0).wait(269).to({text:"BRYSON: Maps are flat, not round like a globe. A paper map is helpful if you are somewhere that you can’t use the internet. You can fold it up and put it in a pocket. Maps can show an entire country or a city. "},0).wait(381).to({text:"JAY: Hey! The library even has a map that shows where in the building you can find different kinds of books.  "},0).wait(182).to({text:"EARL: And a mall has a map to show you where different stores are... and the food court. I LOVE the food court!"},0).wait(201).to({text:"BRYSON [Shaking his head]: People use different maps for different reasons. A treasure map helps you find buried treasure. A weather map shows the temperature or the path of a storm.  The map on your phone can give you directions or help you find a place to eat. "},0).wait(430).to({text:"JAY: A physical map shows Earth’s features: landforms and bodies of water, like oceans, lakes, rivers, and streams."},0).wait(232).to({text:"BRYSON: A population map shows how many people live in an area."},0).wait(125).to({text:"EARL:  A video game map can show you where to find treasure, your teammates, or even the bad guys."},0).wait(156).to({text:"JAY: What about the maps on phones and in cars?"},0).wait(88).to({text:"EARL: Yes, those things know exactly where you are. How do they even DO that?"},0).wait(162).to({text:"BRYSON: A phone uses something called GPS, which stands for Global Positioning System. "},0).wait(173).to({text:"EARL: That sounds important!"},0).wait(47).to({text:"BRYSON: It is, and we use it all the time with maps on our phones or in our cars. Airplanes use it too! Here's how it works. GPS bounces radio signals between your phone or car and ground stations and satellites to figure out exactly where you are on Earth. Then your car or phone uses that location and a map to give you directions."},0).wait(805));

	// text_box
	this.instance_1 = new lib.text_box();
	this.instance_1.setTransform(530.5,233.65,1,1,0,0,0,232,110.5);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1353).to({_off:false},0).to({regY:110.4,scaleX:1.2996,scaleY:1.2995,x:512,y:251.45,alpha:1},8).wait(95).to({alpha:0},13).wait(2114));

	// bluejay
	this.instance_2 = new lib.bluejay_flat();
	this.instance_2.setTransform(874.25,605.8,0.7261,0.7261,0,0,0,220.4,201.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({y:596.15},3).to({y:605.8},3).wait(6).to({regX:220.5,regY:201.8,rotation:2.9994,x:874.3,y:598.2},3).to({regX:220.4,regY:201.7,rotation:0,x:874.25,y:605.8},5).wait(4).to({y:596.15},4).to({y:605.8},4).to({y:596.15},3).to({y:605.8},3).wait(19).to({y:596.15},4).to({y:605.8},4).to({y:596.15},4).to({y:605.8},4).to({y:596.15},4).to({y:605.8},4).to({y:596.15},4).to({y:605.8},4).to({y:596.15},4).to({y:605.8},4).wait(3486));

	// pirate_squirrel
	this.instance_3 = new lib.squirrel_pirate_smiling();
	this.instance_3.setTransform(526.05,652.4,0.3892,0.3892,0,0,0,283.2,295.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(3583));

	// bison
	this.instance_4 = new lib.bison_smiling();
	this.instance_4.setTransform(129.75,547.65,0.7974,0.7974,3.9877,0,0,296.2,332.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(3583));

	// car
	this.instance_5 = new lib.car_1();
	this.instance_5.setTransform(1053.9,538.9,1,1,0,0,0,74,99.5);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(2900).to({_off:false},0).to({regY:99.6,rotation:14.9983,guide:{path:[1053.9,538.9,1053.9,538.7,1053.9,538.5,1053.6,536.3,1049.6,536.1,1036.4,535.3,1023.2,534.5,1003.9,533.2,979.4,530.9,966.4,529.7,935.6,526.6,809.4,513.9,683.2,501.2,665.1,499.4,654.5,497.8,635.6,495,607.1,487.7,591.9,483.9,581.6,481.2]}},35).to({regX:74.1,regY:99.7,rotation:0.2929,guide:{path:[581.5,481.3,563.6,476.8,560.1,476,530.9,469.3,496.7,465.1,468.5,461.6,432.5,459.2,396.1,456.7,359.6,455.8]}},15).to({regX:74,rotation:-9.5851,guide:{path:[359.7,455.8,358.2,455.8,356.6,455.7,253.7,453.2,133.2,463,112.3,464.6,99,466.3,93.3,467.1,85.6,468.3]}},16).to({regY:99.5,rotation:0,guide:{path:[85.5,468.3,72.3,470.4,53.2,473.9,11.8,481.5,-29.5,489.1,-32.4,489.6,-33.6,490.7,-34.3,491.4,-34.5,492.4,-64.3,500.2,-94,508,-123.3,516.1,-150.8,528.8,-152.2,529.5,-152.5,530,-152.8,530.5,-152.8,531,-152.8,531.4,-152.5,531.7]}},15).wait(602));

	// plane
	this.instance_6 = new lib.plane_1();
	this.instance_6.setTransform(-117.25,369.25,0.6817,0.6817,0,0,0,199.5,178.6);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(2944).to({_off:false},0).to({regY:178.5,scaleX:1,scaleY:1,x:1305.7,y:128.5},65).wait(574));

	// gps_graphic
	this.instance_7 = new lib.gps_graphic();
	this.instance_7.setTransform(528,379,1,1,0,0,0,256,256);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(3011).to({_off:false},0).to({alpha:1},12).wait(560));

	// car_map
	this.instance_8 = new lib.car_gps_1();
	this.instance_8.setTransform(512,384.05,1,1,0,0,0,512,341.2);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(2363).to({_off:false},0).to({alpha:1},9).wait(402).to({alpha:0},12).wait(797));

	// game_map
	this.instance_9 = new lib.game_map_1();
	this.instance_9.setTransform(-514,388.25,1,1,0,0,0,512,355.5);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(2152).to({_off:false},0).to({x:512,y:384.5},10).wait(141).to({x:1536,y:388.25,alpha:0},11).wait(1269));

	// pop_map
	this.instance_10 = new lib.pop_map();
	this.instance_10.setTransform(1551,332.65,1,1,0,0,0,527,209.5);
	this.instance_10.alpha = 0;
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(2026).to({_off:false},0).to({x:507,y:332.5,alpha:1},9).wait(117).to({x:1551,y:332.65,alpha:0},10).wait(1421));

	// brazil_map
	this.instance_11 = new lib.brazil_map();
	this.instance_11.setTransform(1536,394.95,1,1,0,0,0,512,394.5);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1795).to({_off:false},0).to({regY:394.4,scaleX:1.0557,scaleY:1.0556,x:520.5,y:378.9,alpha:1},14).wait(209).to({alpha:0},8).wait(1557));

	// weather_map
	this.instance_12 = new lib.weather_map();
	this.instance_12.setTransform(-550.05,390.1,1,1,0,0,0,512,294);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1548).to({_off:false},0).to({x:512,y:390},13).wait(117).to({x:1536,y:386,alpha:0},16).wait(1889));

	// treasure
	this.instance_13 = new lib.treasure_map();
	this.instance_13.setTransform(-544.1,381.25,1,1,0,0,0,512,348.5);
	this.instance_13.alpha = 0;
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1466).to({_off:false},0).to({x:512,y:381.5,alpha:1},11).wait(75).to({x:1536,y:381.25,alpha:0},9).wait(2022));

	// mall_map
	this.instance_14 = new lib.mall_map_1();
	this.instance_14.setTransform(1431.6,316,1,1,0,0,0,400,200);
	this.instance_14.alpha = 0;
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1164).to({_off:false},0).to({x:516,alpha:1},14).wait(168).to({alpha:0},11).wait(2226));

	// libMap
	this.instance_15 = new lib.lib_map();
	this.instance_15.setTransform(534.2,384.05,0.5104,0.5103,0,0,0,696.8,588.1);
	this.instance_15.alpha = 0;
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1001).to({_off:false},0).to({alpha:1},11).wait(140).to({alpha:0},10).wait(2421));

	// phone
	this.instance_16 = new lib.phone_1();
	this.instance_16.setTransform(1114.65,310.85,0.6425,0.6425,0,0,0,200.2,300.2);
	this.instance_16._off = true;

	this.instance_17 = new lib.phone_zoom();
	this.instance_17.setTransform(528.65,287.35,0.885,0.885,0,0,0,200.3,300.1);
	this.instance_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(360).to({_off:false},0).to({x:480.3},9).wait(42).to({_off:true,regX:200.3,regY:300.1,scaleX:0.885,scaleY:0.885,x:528.65,y:287.35},9).wait(1918).to({_off:false,y:323.5,alpha:0},0).to({alpha:1},11).wait(425).to({alpha:0},0).wait(809));
	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(411).to({_off:false},9).wait(181).to({alpha:0},16).wait(1068).to({x:-115.9,y:323.5},0).to({x:528.65,alpha:0.9883},9).wait(92).to({alpha:0},9).to({_off:true},543).wait(1245));

	// laptop
	this.instance_18 = new lib.laptop_1();
	this.instance_18.setTransform(1271.65,336.4,1,1,0,0,0,214.5,154.5);
	this.instance_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(378).to({_off:false},0).to({x:761.75},11).wait(212).to({alpha:0},16).wait(2966));

	// foldedMap
	this.instance_19 = new lib.foldedMap();
	this.instance_19.setTransform(-377.1,284.45,1,1,0,0,0,309.4,206.3);
	this.instance_19.alpha = 0;
	this.instance_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(683).to({_off:false},0).to({x:544.9,y:352,alpha:1},13).wait(277).to({x:1361.7,y:284.45,alpha:0},9).wait(2601));

	// worldmap
	this.instance_20 = new lib.worldmap_1();
	this.instance_20.setTransform(1538.25,384,1,1,0,0,0,512,266);
	this.instance_20.alpha = 0;
	this.instance_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(146).to({_off:false},0).to({x:512,alpha:1},36).wait(149).to({alpha:0},9).wait(3243));

	// bkgd
	this.instance_21 = new lib.background_field();
	this.instance_21.setTransform(456,384,1,1,0,0,0,614,384);
	this.instance_21.filters = [new cjs.ColorFilter(0.8203125, 0.8203125, 0.8203125, 1, 0, 0, 0, 0)];
	this.instance_21.cache(67,-2,1232,772);

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(3583));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-550,334,2628,461.5);
// library properties:
lib.properties = {
	id: '123F095CE409A14AB2EEECE538385223',
	width: 1024,
	height: 768,
	fps: 24,
	color: "#CCCCCC",
	opacity: 1.00,
	manifest: [
		{src:"images/brazil.png", id:"brazil"},
		{src:"images/field.png", id:"field"},
		{src:"images/game_map.png", id:"game_map"},
		{src:"images/laptop.png", id:"laptop"},
		{src:"images/car_gps.png", id:"car_gps"},
		{src:"images/car.png", id:"car"},
		{src:"images/phone_map.png", id:"phone_map"},
		{src:"images/treasure.png", id:"treasure"},
		{src:"images/folded_map.png", id:"folded_map"},
		{src:"images/library_map.png", id:"library_map"},
		{src:"images/mall_map.png", id:"mall_map"},
		{src:"images/GPS_noSig.png", id:"GPS_noSig"},
		{src:"images/worldmap.png", id:"worldmap"},
		{src:"images/World_human_population_density_map.png", id:"World_human_population_density_map"},
		{src:"images/plane.png", id:"plane"},
		{src:"images/weather.jpg", id:"weather"},
		{src:"images/phone.png", id:"phone"},
		{src:"sounds/G3C2A3mapsoverviewbryson2.mp3", id:"G3C2A3mapsoverviewbryson2"},
		{src:"sounds/G3C2A3mapsoverviewbryson6.mp3", id:"G3C2A3mapsoverviewbryson6"},
		{src:"sounds/G3C2A3mapsoverviewearl2.mp3", id:"G3C2A3mapsoverviewearl2"},
		{src:"sounds/G3C2A3mapsoverviewearl5.mp3", id:"G3C2A3mapsoverviewearl5"},
		{src:"sounds/G3C2A3mapsoverviewjay1.mp3", id:"G3C2A3mapsoverviewjay1"},
		{src:"sounds/G3C2A3mapsoverviewjay2.mp3", id:"G3C2A3mapsoverviewjay2"},
		{src:"sounds/G3C2A3mapsoverviewjay3.mp3", id:"G3C2A3mapsoverviewjay3"},
		{src:"sounds/G3C2A3mapsoverviewjay4.mp3", id:"G3C2A3mapsoverviewjay4"},
		{src:"sounds/G3C2A3mapsoverviewbryson1.mp3", id:"G3C2A3mapsoverviewbryson1"},
		{src:"sounds/G3C2A3mapsoverviewearl3.mp3", id:"G3C2A3mapsoverviewearl3"},
		{src:"sounds/G3C2A3mapsoverviewearl4.mp3", id:"G3C2A3mapsoverviewearl4"},
		{src:"sounds/G3C2A3mapsoverviewbryson5.mp3", id:"G3C2A3mapsoverviewbryson5"},
		{src:"sounds/G3C2A3mapsoverviewbryson4.mp3", id:"G3C2A3mapsoverviewbryson4"},
		{src:"sounds/G3C2A3mapsoverviewearl1.mp3", id:"G3C2A3mapsoverviewearl1"},
		{src:"sounds/G3C2A3mapsoverviewbryson3.mp3", id:"G3C2A3mapsoverviewbryson3"}
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
an.compositions['123F095CE409A14AB2EEECE538385223'] = {
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