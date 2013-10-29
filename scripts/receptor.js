//constants in all caps

var RECEPTOR_RADIUS = 50;

var RECEPTOR_TYPES = {
	METH : {value:0, name:"Methanphetamine", color: 0x8A2BE2}, //blue violet
	DOPAMINE : {value:1, name:"Dopamine", color: 0xFF8C00}, //dark orange
	SERATONIN: {value:3, name:"Seratonin", color: 0x228B22}, //Forest green
};


/**
 * Receptor base class
 *
 * @class Receptor
 * @inherits PIXI.DisplayObjectContainer
 * @constructor
 * @param pos {PIXI.Point} 2D position, center of receptor
 */
Receptor = function(x, y, type){
	PIXI.DisplayObjectContainer.call(this);
	
	this.type = type || RECEPTOR_TYPES.METH; //default to meth
	
	this.position.x = x;
	this.position.y = y;
	
	this.node = new PIXI.Graphics();
	this.node.beginFill(this.type.color);
	this.node.lineStyle(2, 0xfff, 1);
	this.node.drawCircle(x, y, RECEPTOR_RADIUS);
	this.addChild(this.node);
	
	this.node.interactivity = true;
}

Receptor.constructor = Receptor;
Receptor.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

Receptor.prototype.getType = function(){
	return this.type;
}

Receptor.prototype.getDisplayObject = function(){
	return this.node;
}