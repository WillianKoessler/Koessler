class vec2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	set(x, y) {
		if (isNaN(x) || isNaN(y)) { throw TypeError("Invalid type for Set operation on Vec2"); }
		this.x = x;
		this.y = y;
	}
	add(other) {
		if ((!other instanceof vec2)) { throw TypeError("Invalid type for Add operation on Vec2"); }
		this.x += other.x;
		this.y += other.y;
	}
	sub(other) {
		if (!(other instanceof vec2)) { throw TypeError("Invalid type for Sub operation on Vec2"); }
		this.x -= other.x;
		this.y -= other.y;
	}
	scale(scalar) {
		if (isNaN(scalar)) { throw TypeError("Invalid type for Scale operation on Vec2"); }
		this.x *= scalar;
		this.y *= scalar;
	}
	add_(other) {
		if (!(other instanceof vec2)) { throw TypeError("Invalid type for Add operation on Vec2"); }
		return new vec2(this.x + other.x, this.y + other.y);
	}
	sub_(other) {
		if (!(other instanceof vec2)) { throw TypeError("Invalid type for Sub operation on Vec2"); }
		return new vec2(this.x - other.x, this.y - other.y);
	}
	scale_(scalar) {
		if (!isNaN(scalar)) { throw TypeError("Invalid type for Scale operation on Vec2"); }
		return new vec2(this.x * scalar, this.y * scalar);
	}
}



class Star {
	constructor(p5Canvas) {
		this.canvas = p5Canvas;
		this.pos = new vec2(
			Math.floor(Math.random() * this.canvas.width),
			Math.floor(Math.random() * this.canvas.height)
		);
		this.vel = new vec2(
			Math.floor(Math.random() * 2 - 1),
			Math.floor(Math.random() * 2 - 1)
		);
		this.acc = new vec2(0, 0);
		this.last_pos = new vec2(this.pos.x, this.pos.y);
		this.damping = 0.9;
	}
	update() {
		this.vel.add(this.acc);
		this.acc.set(0, 0.06);
		this.pos.add(this.vel);
		if (this.pos.x > this.canvas.width) this.pos.x = 0;
		if (this.pos.x < 0) this.pos.x = this.canvas.width;
		if (this.pos.y > this.canvas.height) {
			this.pos.y = Math.random() * this.canvas.height - this.canvas.height;
			this.vel.set(Math.random() * 20 - 10, 0);
		}
		this.vel.scale(this.damping);
		this.last_pos.set(this.pos.x, this.pos.y);
	}
	show() {
		this.canvas.line(this.pos.x, this.pos.y, this.last_pos.x, this.last_pos.y);
	}
};



var stars = Array(100);

function img_sim(p) {
	p.windowResized = function () {
		p.resizeCanvas(p.windowWidth, p.windowHeight);
	}

	p.setup = function () {
		p.createCanvas(p.windowWidth, p.windowHeight);
		p.stroke(128);
		p.strokeWeight(3);
		p.noFill();
		for (let i = 0; i < stars.length; i++) {
			stars[i] = new Star(p);
			stars[i].vel.scale(5);
		}
	}

	p.draw = function () {
		p.background(0);
		for (let i = 0; i < stars.length; i++) { stars[i].update(); }
		for (let i = 0; i < stars.length; i++) { stars[i].show(); }
	}
}
canvas = new p5(img_sim, 'bg')