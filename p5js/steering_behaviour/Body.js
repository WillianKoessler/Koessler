class Body {
	constructor(x, y) {
		if(typeof Body.angular_friction === 'undefined') Body.angular_friction = 0.075;
		if(typeof Body.friction === 'undefined') Body.friction = 0.0125;
		this.margin = 10;
		this.size = 10;
		this.heading = -PI/2;
		this.angular_vel = 0;
		this.angular_acc = 0;
		try {
			this.pos = createVector(x, y);
			this.vel = createVector(0, 0);
			this.acc = createVector(0, 0);
		} catch (err) {
			console.log(err);
		}
	}

	applyForce(direction, force) {
        if (typeof direction === typeof this.pos) {
          this.acc = direction.mult(force);
        } else {
		  this.acc = p5.Vector.fromAngle(direction).mult(force);
        }
	}
  
    face_movement(){
        this.heading = this.vel.heading();
    }

	turn(direction, speed=null){
		this.angular_acc = Number(direction) * (Number(speed === null) * Math.pow(1/this.size, 2)) + (Number(speed !== null) * Number(speed));
	}

	forwards(speed) {
		let direction = p5.Vector.fromAngle(this.heading);
		direction.mult(speed);
		this.acc.add(direction);
	}

	sideways(speed) {
		let direction = p5.Vector.fromAngle(this.heading+(PI/2));
		direction.mult(speed);
		this.acc.add(direction);
	}


	update() {
		this.angular_vel += this.angular_acc;
		this.heading += this.angular_vel;
		this.angular_vel *= 1-Body.angular_friction;
		this.angular_acc = 0;

		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.vel.mult(1-Body.friction);
		this.acc.set(0, 0);
	}

	show() {
		push();
		translate(this.pos.x, this.pos.y);
		scale(this.size);
		rotate(this.heading);
		strokeWeight(1 / this.size);

		beginShape();
		vertex(1, 0);
		vertex(-0.5, -0.5);
		vertex(-0.5, 0.5);
		vertex(1, 0);
		endShape();
		pop();
	}

	wrapSpace() {
		let hw = width + this.margin;
		let lw = -this.margin;
		let hy = height + this.margin;
		let ly = -this.margin;
		if (this.pos.x > hw) this.pos.x = lw;
		if (this.pos.x < lw) this.pos.x = hw;
		if (this.pos.y > hy) this.pos.y = ly;
		if (this.pos.y < ly) this.pos.y = hy;
	}
}