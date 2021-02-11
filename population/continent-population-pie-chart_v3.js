(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"continent_population_pie_chart_v3_atlas_1", frames: [[1494,944,302,469],[1494,1415,302,469],[1494,0,474,470],[1494,472,474,470],[0,0,1384,800],[0,802,745,944],[747,802,745,944]]},
		{name:"continent_population_pie_chart_v3_atlas_2", frames: [[1526,839,161,44],[1223,824,177,163],[389,547,740,84],[389,0,792,174],[1402,984,198,102],[0,0,387,361],[0,363,387,361],[389,176,465,271],[856,176,465,271],[1402,787,122,195],[1984,0,27,473],[2013,0,27,473],[389,633,850,65],[389,449,1014,96],[1526,789,178,48],[1669,429,35,109],[0,726,1092,127],[1593,645,185,96],[1323,0,558,162],[1593,743,323,44],[1241,645,112,44],[1780,645,218,44],[1131,547,90,44],[1780,691,213,44],[1977,475,71,44],[0,855,1221,32],[1394,645,197,140],[1323,164,252,166],[1405,429,262,89],[1730,415,245,127],[1730,261,233,152],[1094,700,298,122],[1323,332,405,95],[1241,547,772,47],[1577,164,405,95],[1241,596,772,47]]}
];


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



(lib.CachedBmp_41 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_36 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_40 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_42 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_32 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_39 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_37 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_35 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_33 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_28 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_31 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_24 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_29 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_26 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_27 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_25 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.africapopulation = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.asiapopulation = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.australiapopulation = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.northamericapopulation = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.europepopulation = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.southamericapopulation = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.shutterstock_788258803_v2 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_2"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(ss["continent_population_pie_chart_v3_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();
// helper functions:

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


(lib.try_again = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// txt
	this.instance = new lib.CachedBmp_41();
	this.instance.setTransform(-40.3,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_40();
	this.instance_1.setTransform(-184.9,21.85,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	// box
	this.instance_2 = new lib.CachedBmp_42();
	this.instance_2.setTransform(-198.05,-9.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.try_again, new cjs.Rectangle(-198,-9.9,396,87), null);


(lib.Symbol1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.shutterstock_788258803_v2();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(0,0,1384,800), null);


(lib.southamericapopulation_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(3));

	// Layer_1
	this.instance = new lib.CachedBmp_37();
	this.instance.setTransform(-96.7,0,0.5,0.5);

	this.instance_1 = new lib.southamericapopulation();
	this.instance_1.setTransform(-362,-51);

	this.instance_2 = new lib.CachedBmp_39();
	this.instance_2.setTransform(-96.7,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_2},{t:this.instance_1}]},1).to({state:[{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-362,-51,458.8,231.5);


(lib.sa_pop = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_36();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sa_pop, new cjs.Rectangle(0,0,88.5,81.5), null);


(lib.northamericapopulation_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(3));

	// Layer_1
	this.instance = new lib.CachedBmp_33();
	this.instance.setTransform(-116.2,0,0.5,0.5);

	this.instance_1 = new lib.northamericapopulation();
	this.instance_1.setTransform(-328,-5);

	this.instance_2 = new lib.CachedBmp_35();
	this.instance_2.setTransform(-116.2,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_2},{t:this.instance_1}]},1).to({state:[{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-328,-5,444.3,140.5);


(lib.na_pop = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_32();
	this.instance.setTransform(0,-0.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.na_pop, new cjs.Rectangle(0,0,99,51), null);


(lib.europepopulation_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(3));

	// Layer_1
	this.instance = new lib.CachedBmp_29();
	this.instance.setTransform(-75.55,0,0.5,0.5);

	this.instance_1 = new lib.europepopulation();
	this.instance_1.setTransform(-233,-107);

	this.instance_2 = new lib.CachedBmp_31();
	this.instance_2.setTransform(-75.55,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_2},{t:this.instance_1}]},1).to({state:[{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-233,-107,308.5,341.5);


(lib.europe_pop = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_28();
	this.instance.setTransform(0,-0.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.europe_pop, new cjs.Rectangle(0,0,61,97.5), null);


(lib.dia3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_27();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.dia3, new cjs.Rectangle(0,0,507,48), null);


(lib.dia2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_26();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.dia2, new cjs.Rectangle(0,0,425,32.5), null);


(lib.dia1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_25();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.dia1, new cjs.Rectangle(0,0,546,63.5), null);


(lib.australiapop = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(3));

	// Layer_1
	this.instance = new lib.CachedBmp_22();
	this.instance.setTransform(-6.75,0,0.5,0.5);

	this.instance_1 = new lib.australiapopulation();
	this.instance_1.setTransform(-18,-79);

	this.instance_2 = new lib.CachedBmp_24();
	this.instance_2.setTransform(-6.75,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_2},{t:this.instance_1}]},1).to({state:[{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18,-79,262,315.5);


(lib.asiapop = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(3));

	// Layer_1
	this.instance = new lib.CachedBmp_19();
	this.instance.setTransform(-186.2,0,0.5,0.5);

	this.instance_1 = new lib.asiapopulation();
	this.instance_1.setTransform(174,156);

	this.instance_2 = new lib.CachedBmp_21();
	this.instance_2.setTransform(-186.2,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_2},{t:this.instance_1}]},1).to({state:[{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-186.2,0,612.2,472);


(lib.asia_pop = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_18();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.asia_pop, new cjs.Rectangle(0,0,89,24), null);


(lib.arrow = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_17();
	this.instance.setTransform(-1,-1,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arrow, new cjs.Rectangle(-1,-1,279,81), null);


(lib.ao_pop = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_16();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ao_pop, new cjs.Rectangle(0,0,17.5,54.5), null);


(lib.africapopulation_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(3));

	// Layer_1
	this.instance = new lib.CachedBmp_13();
	this.instance.setTransform(-118.55,0,0.5,0.5);

	this.instance_1 = new lib.africapopulation();
	this.instance_1.setTransform(-287,131);

	this.instance_2 = new lib.CachedBmp_15();
	this.instance_2.setTransform(-118.55,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_2},{t:this.instance_1}]},1).to({state:[{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-287,0,405.5,271);


(lib.africa_pop = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_12();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.africa_pop, new cjs.Rectangle(0,0,92.5,48), null);


// stage content:
(lib.continentpopulationpiechart_v3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{select_aus:0,pop_count:1});

	this.actionFrames = [0,1];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		this.stop();
		
		if (window.parent.cpAPIInterface){
			window.parent.cpAPIInterface.pause();
		}
		
		
		var _this = this;
		
		stage.enableMouseOver();
		
		
		const array = [];
		
		_this.asia1.on('mouseover', onMouseover);
		_this.asia1.on('mouseout', onMouseout);
		_this.europe1.on('mouseover', onMouseover);
		_this.europe1.on('mouseout', onMouseout);
		_this.northamerica1.on('mouseover', onMouseover);
		_this.northamerica1.on('mouseout', onMouseout);
		_this.southamerica1.on('mouseover', onMouseover);
		_this.southamerica1.on('mouseout', onMouseout);
		_this.africa1.on('mouseover', onMouseover);
		_this.africa1.on('mouseout', onMouseout);
		_this.australia1.on('mouseover', onMouseover);
		
		
		function onMouseover(evt){
			
		
			if (!array.includes(evt.currentTarget.name))
			{
				array.push(evt.currentTarget.name);
				console.log(array);
			};
			
			if(!array.includes("australia1"))
			{
				_this.try_again.visible = true;
			}
			else
			{
				console.log('Correct!');
				_this.gotoAndStop('pop_count');
				
			}
		}
		
		function onMouseout(evt)
		{
			_this.try_again.visible = false;
		
		}
	}
	this.frame_1 = function() {
		if (window.parent.cpAPIInterface){
			window.parent.cpAPIInterface.pause();
		}
		
		var _this = this;
		
		var pop_count;
		
		stage.enableMouseOver();
		
		const array = [];
		
		_this.asia1.on('mouseover', onMouseover);
		_this.asia1.on('mouseout', onMouseout);
		_this.europe1.on('mouseover', onMouseover);
		_this.europe1.on('mouseout', onMouseout);
		_this.northamerica1.on('mouseover', onMouseover);
		_this.northamerica1.on('mouseout', onMouseout);
		_this.southamerica1.on('mouseover', onMouseover);
		_this.southamerica1.on('mouseout', onMouseout);
		_this.africa1.on('mouseover', onMouseover);
		_this.africa1.on('mouseout', onMouseout);
		_this.australia1.on('mouseover', onMouseover);
		_this.australia1.on('mouseout', onMouseout);
		
		
		function onMouseover(evt){
			
			_this.asia1.gotoAndStop(0);
			_this.europe1.gotoAndStop(0);
			_this.northamerica1.gotoAndStop(0);
			_this.southamerica1.gotoAndStop(0);
			_this.africa1.gotoAndStop(0);
			_this.australia1.gotoAndStop(0);		
			
			evt.currentTarget.gotoAndStop(1);
			
			pop_count = evt.currentTarget.name + "_label";
			var instName = _this[pop_count];
			instName.visible = true;
			
			if (!array.includes(evt.currentTarget.name))
			{
				array.push(evt.currentTarget.name);
				console.log(array);
			};
		}
		
		function onMouseout(evt){
		
			if (array.length == 5){
				_this.continue1.visible = true;
				_this.dia2.visible = false;
				_this.dia3.visible = true;
			}
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1));

	// dialogue
	this.dia1 = new lib.dia1();
	this.dia1.name = "dia1";
	this.dia1.setTransform(509.95,114.25,1,1,0,0,0,272.9,31.7);

	this.dia3 = new lib.dia3();
	this.dia3.name = "dia3";
	this.dia3.setTransform(510.25,120.3,1,1,0,0,0,253.5,24);
	this.dia3.visible = false;

	this.dia2 = new lib.dia2();
	this.dia2.name = "dia2";
	this.dia2.setTransform(512,114.95,1,1,0,0,0,212.6,16.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.dia1}]}).to({state:[{t:this.dia2},{t:this.dia3}]},1).wait(1));

	// population
	this.continue1 = new lib.arrow();
	this.continue1.name = "continue1";
	this.continue1.setTransform(841,664.95,1,1,0,0,0,138.4,39.6);
	this.continue1.visible = false;

	this.asia1_label = new lib.asia_pop();
	this.asia1_label.name = "asia1_label";
	this.asia1_label.setTransform(625.25,413.05,1,1,0,0,0,44.6,12.1);
	this.asia1_label.visible = false;

	this.australia1_label = new lib.ao_pop();
	this.australia1_label.name = "australia1_label";
	this.australia1_label.setTransform(507.75,210.8,1,1,0,0,0,8.8,27.2);

	this.europe1_label = new lib.europe_pop();
	this.europe1_label.name = "europe1_label";
	this.europe1_label.setTransform(459.25,271.75,1,1,0,0,0,30.6,48.8);
	this.europe1_label.visible = false;

	this.southamerica1_label = new lib.sa_pop();
	this.southamerica1_label.name = "southamerica1_label";
	this.southamerica1_label.setTransform(396.1,309.7,1,1,0,0,0,44.2,40.6);
	this.southamerica1_label.visible = false;

	this.northamerica1_label = new lib.na_pop();
	this.northamerica1_label.name = "northamerica1_label";
	this.northamerica1_label.setTransform(369.05,361.8,1,1,0,0,0,49.5,25.6);
	this.northamerica1_label.visible = false;

	this.africa1_label = new lib.africa_pop();
	this.africa1_label.name = "africa1_label";
	this.africa1_label.setTransform(378.1,462.75,1,1,0,0,0,46.2,23.9);
	this.africa1_label.visible = false;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.africa1_label},{t:this.northamerica1_label},{t:this.southamerica1_label},{t:this.europe1_label},{t:this.australia1_label},{t:this.asia1_label},{t:this.continue1}]},1).wait(1));

	// text
	this.instance = new lib.CachedBmp_2();
	this.instance.setTransform(318.95,50.05,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1();
	this.instance_1.setTransform(410.85,7.75,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_4();
	this.instance_2.setTransform(318.95,50.05,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_3();
	this.instance_3.setTransform(410.85,7.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_3},{t:this.instance_2}]},1).wait(1));

	// try_again
	this.try_again = new lib.try_again();
	this.try_again.name = "try_again";
	this.try_again.setTransform(696.9,483.4,1,1,0,0,0,184.9,31.8);
	this.try_again.visible = false;

	this.timeline.addTween(cjs.Tween.get(this.try_again).to({_off:true},1).wait(1));

	// australia_3
	this.australia1 = new lib.australiapop();
	this.australia1.name = "australia1";
	this.australia1.setTransform(620.25,258.55,1,1,0,0,0,113,78.7);

	this.timeline.addTween(cjs.Tween.get(this.australia1).wait(2));

	// europe_42
	this.europe1 = new lib.europepopulation_1();
	this.europe1.name = "europe1";
	this.europe1.setTransform(359.6,244.1,1,1,0,0,0,-78.8,63.9);

	this.timeline.addTween(cjs.Tween.get(this.europe1).wait(2));

	// southamerica_15
	this.southamerica1 = new lib.southamericapopulation_1();
	this.southamerica1.name = "southamerica1";
	this.southamerica1.setTransform(286.1,301.05,1,1,0,0,0,-131.7,66.3);

	this.timeline.addTween(cjs.Tween.get(this.southamerica1).wait(2));

	// northamerica_20
	this.northamerica1 = new lib.northamericapopulation_1();
	this.northamerica1.name = "northamerica1";
	this.northamerica1.setTransform(291.3,347.3,1,1,0,0,0,-106.4,67.6);

	this.timeline.addTween(cjs.Tween.get(this.northamerica1).wait(2));

	// africa_65
	this.africa1 = new lib.africapopulation_1();
	this.africa1.name = "africa1";
	this.africa1.setTransform(396.05,491.5,1,1,0,0,0,0,118.2);

	this.timeline.addTween(cjs.Tween.get(this.africa1).wait(2));

	// asia_215
	this.asia1 = new lib.asiapop();
	this.asia1.name = "asia1";
	this.asia1.setTransform(684.15,414.35,1,1,0,0,0,119.5,235.4);

	this.timeline.addTween(cjs.Tween.get(this.asia1).wait(2));

	// key
	this.instance_4 = new lib.CachedBmp_11();
	this.instance_4.setTransform(774.05,732.65,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_10();
	this.instance_5.setTransform(669.85,732.65,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_9();
	this.instance_6.setTransform(512.35,732.65,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_8();
	this.instance_7.setTransform(357.45,732.65,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_7();
	this.instance_8.setTransform(263.95,732.65,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_6();
	this.instance_9.setTransform(180.25,732.65,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_5();
	this.instance_10.setTransform(163.55,735.6,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4}]}).wait(2));

	// msk (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("EhP/A8AMAAAh3/MCf/AAAMAAAB3/g");
	var mask_graphics_1 = new cjs.Graphics().p("EhP/A8AMAAAh3/MCf/AAAMAAAB3/g");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:512,y:384}).wait(1).to({graphics:mask_graphics_1,x:512,y:384}).wait(1));

	// BG
	this.instance_11 = new lib.Symbol1();
	this.instance_11.setTransform(492,412,1,1,0,0,0,692,400);
	this.instance_11.alpha = 0.1484;

	var maskedShapeInstanceList = [this.instance_11];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(2));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(512,391.8,512,376.2);
// library properties:
lib.properties = {
	id: 'A12381D38F04B04BB03C5B1C1019C418',
	width: 1024,
	height: 768,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/continent_population_pie_chart_v3_atlas_1.png", id:"continent_population_pie_chart_v3_atlas_1"},
		{src:"images/continent_population_pie_chart_v3_atlas_2.png", id:"continent_population_pie_chart_v3_atlas_2"}
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
an.compositions['A12381D38F04B04BB03C5B1C1019C418'] = {
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