var x, y, c;
var acc1 = 10;
var acc2 = 10;
let scale1 = [60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82];
let scale2 = [61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83];
let noteIndex = 0;
let midiVal, freq, note, scaleChoice, ball;
let WIDTH = 100;
let HEIGHT = 100;

function windowResized() {
	resizeCanvas()	
}

function setup(){
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	canvas.style('z-index', '-1');
	frameRate(24);
	
	c = color(255, 184, 77);
	x = random(windowWidth);
	y = random(windowHeight);
	osc = new p5.TriOsc();
	env = new p5.Envelope();
	scaleChoice = random([scale1, scale2]);
	startSound(note, scaleChoice);

	ball = new Ball;
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(32);

	// for (let i = 0; let i < nb; let i++) {
	// 	ball[i].move();
	// 	ball[i].show();
	// }
	ball.move();
	ball.show();
}

class Ball {
	constructor() {
		this.x = random(windowWidth);
		this.y = random(windowHeight);		
	}

	move() {
		if (this.x > windowWidth) {
			acc1 = -10;
			note = int(random(0, 11));
			startSound(note, scaleChoice);
		}
		else if (this.x < 0) {
			acc1 = 10;		
			note = int(random(0, 11));
			startSound(note, scaleChoice);
		}
		if (this.y > windowHeight) {
			acc2 = -10;
			note = int(random(0, 11));
			startSound(note, scaleChoice);
		}
		else if (this.y < 0) {
			acc2 = 10;		
			note = int(random(0, 11));
			startSound(note, scaleChoice);
		}
		this.x = this.x + acc1;
		this.y = this.y + acc2;
	}
	
	show() {
		stroke(c);
		strokeWeight(1);
		fill(32);
		ellipse(ball.x, ball.y, WIDTH, HEIGHT);
	}
}

function startSound(note, scaleChoice) {
	osc.start(); 
	noteIndex = note;
	scale = scaleChoice; 

	midiVal = scale[noteIndex % scale.length];
	freq = midiToFreq(midiVal);
	osc.freq(freq);
	env.ramp(osc, 0, 0.5, 0);
}