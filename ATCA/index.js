(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"index_atlas_1", frames: [[1390,1524,360,272],[0,1203,874,646],[876,1203,823,319],[0,1851,133,133],[876,1524,512,512],[0,0,1921,1201]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.gotoAndPlay = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_22 = function() {
	this.initialize(ss["index_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_24 = function() {
	this.initialize(ss["index_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["index_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.index_atlas_14 = function() {
	this.initialize(ss["index_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.logo = function() {
	this.initialize(ss["index_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.map2 = function() {
	this.initialize(ss["index_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
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


(lib.Path = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#FFFFFF","#DFF5FD","#90DBF8","#12B3F0","#00AEEF"],[0,0.141,0.439,0.871,0.941],-27.5,45.4,0,-1.1,1.9,71.3).s().p("AoRIMQjZjUAAk3QAAk2DZjTQDXjWE6AAQE5AADXDWQDbDSAAE3QAAE3jZDUQjZDTk5AAQk4AAjZjTg");
	this.shape.setTransform(74.725,73.475);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(0,0,149.5,147), null);


(lib.ClipGroup_0 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AkjKlQiHg4hohmQhohlg5iEQg7iIAAiWQAAiVA7iIQA5iDBohmQBohmCHg4QCLg5CYgBQCZABCMA5QCGA4BoBmQBoBmA5CDQA7CIAACVQAACWg7CIQg5CEhoBlQhoBmiGA4QiMA6iZgBQiYABiLg6g");
	mask.setTransform(79.45,73.45);

	// Layer_3
	this.instance = new lib.CachedBmp_22();
	this.instance.setTransform(0,17.65,0.4381,0.4381);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_0, new cjs.Rectangle(4.4,17.7,150.2,119.10000000000001), null);


(lib.map = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.map2();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.map, new cjs.Rectangle(0,0,1921,1201), null);


(lib.faa = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.index_atlas_14();
	this.instance.setTransform(0,0,1.5113,1.5113);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.faa, new cjs.Rectangle(0,0,201,201), null);


(lib.btn_ffice = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.logo();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,512,512);


(lib.ClipGroup = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Ak4KgQE0klBpi1QA1hbgJggQinCrjACTQiFBnh+BOQgcgWgcgcQjZjUAAk3QAAk2DZjTQDXjWE6AAQE5AADXDWQDbDSAAE3QAAE3jZDUQjZDTk5AAQipAAiPg/g");
	mask.setTransform(79.725,73.725);

	// Layer_3
	this.instance = new lib.Path();
	this.instance.setTransform(79.7,73.75,1,1,0,0,0,74.7,73.5);
	this.instance.alpha = 0.4492;

	this.instance_1 = new lib.ClipGroup_0();
	this.instance_1.setTransform(78.9,73.5,1,1,0,0,0,78.9,73.5);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00AEEF").s().p("AoSILQjZjSAAk3QAAk3DZjSQDZjWE5AAQE4AADZDWQDbDRAAE4QAAE2jZDTQjaDTk5AAQk5AAjZjTg");
	this.shape.setTransform(79.375,73.55);

	var maskedShapeInstanceList = [this.instance,this.instance_1,this.shape];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup, new cjs.Rectangle(5,0.3,149.5,146.89999999999998), null);


(lib.tbo_logosvg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// tbo_logo_svg
	this.instance = new lib.CachedBmp_24();
	this.instance.setTransform(0,0,0.4381,0.4381);

	this.instance_1 = new lib.ClipGroup();
	this.instance_1.setTransform(317.25,166,1,1,0,0,0,78.9,73.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,396.1,283);


(lib.btn_tboe = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.tbo_logosvg("synched",0);
	this.instance.setTransform(226.1,161.5,1.1414,1.1414,0,0,0,198.1,141.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_2
	this.instance_1 = new lib.CachedBmp_20();
	this.instance_1.setTransform(20,287.9,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,448.3,447.4);


(lib.btn_tbo = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.tbo_logosvg("synched",0);
	this.instance.setTransform(226.1,161.5,1.1414,1.1414,0,0,0,198.1,141.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,448.3,323);


// stage content:
(lib.tabletMenu = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0];
	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		this.stop();
		this.btn_tbo.addEventListener("click", goTBO.bind(this));
		this.btn_tboe.addEventListener("click", goTBOE.bind(this));
		this.btn_ffice.addEventListener("click", goFFICE.bind(this));
		
		function goTBO()
		{
			window.open ("MRTBO/index.html","_self");
		
		}
		
		function goTBOE()
		{
			window.open ("TBOE/index.html","_self");
		
		}
		
		function goFFICE()
		{
			window.open ("FFICE/index.html","_self");
		
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// btns
	this.btn_tboe = new lib.btn_tboe();
	this.btn_tboe.name = "btn_tboe";
	this.btn_tboe.setTransform(1315.75,376.15,0.7552,0.7552,0,0,0,226.1,161.4);
	new cjs.ButtonHelper(this.btn_tboe, 0, 1, 1);

	this.btn_ffice = new lib.btn_ffice();
	this.btn_ffice.name = "btn_ffice";
	this.btn_ffice.setTransform(960,910,1,1,0,0,0,256,256);
	new cjs.ButtonHelper(this.btn_ffice, 0, 1, 1);

	this.btn_tbo = new lib.btn_tbo();
	this.btn_tbo.name = "btn_tbo";
	this.btn_tbo.setTransform(645.7,423.25,0.8637,0.8637,0,0,0,226.1,161.4);
	new cjs.ButtonHelper(this.btn_tbo, 0, 1, 1);

	this.instance = new lib.faa();
	this.instance.setTransform(1820,108.5,1,1,0,0,0,100.5,100.5);
	this.instance.alpha = 0.1797;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.btn_tbo},{t:this.btn_ffice},{t:this.btn_tboe}]}).wait(1));

	// BG
	this.instance_1 = new lib.map();
	this.instance_1.setTransform(960.5,603.5,1,1,0,0,0,960.5,600.5);
	this.instance_1.alpha = 0.5781;

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AADg9IAAB6IgFAA");
	this.shape.setTransform(1920.25,1190.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#003366").s().p("EiV/BdwMAAAi7fMEr/AAAMAAAC66IAAAlg");
	this.shape_1.setTransform(960,600);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.instance_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(960,600,961.5,604);
// library properties:
lib.properties = {
	id: '7DF0303D6EBAD64A994D8D874EAA99EC',
	width: 1920,
	height: 1200,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/index_atlas_1.png", id:"index_atlas_1"},
		{src:"sounds/btn_sound2.mp3", id:"btn_sound2"}
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
an.compositions['7DF0303D6EBAD64A994D8D874EAA99EC'] = {
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
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;