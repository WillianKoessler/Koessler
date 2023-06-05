var body;
var keyboard = {'w':false, 'a':false, 's':false, 'd':false, 'ArrowLeft':false, 'ArrowUp':false, 'ArrowRight':false, 'ArrowDown':false, 'q':false, 'e':false};
var inputs = {forwards:0, sideways:0, turn:0};
var mode = 1;
var modes = ['Keyboard', 'Mouse'];
var activeMode = modes[mode];

function setup(){
	createCanvas(windowWidth, windowHeight);
	body = new Body(width/2, height/2);
}

function draw(){
	background(color(0, 0, 0, 50));
	displayUI();
	switch(activeMode) {
		case 'Keyboard':
            Body.angular_friction = 0.075;
            Body.friction = 0.0125;
			handleKeyboard();
			if(inputs.forwards != 0) body.forwards(inputs.forwards*0.1);
			if(inputs.sideways != 0) body.sideways(inputs.sideways*0.1);
			if(inputs.turn != 0) body.turn(inputs.turn);
			break;
		case 'Mouse':
            Body.friction = 0.02;
			body.applyForce(
              createVector(mouseX, mouseY)
              .sub(body.pos)
              .normalize(),
            1);
            body.face_movement();
			break;
	}
	body.update();
    body.wrapSpace();
	body.show();
}

function keyPressed(){
	try{
		keyboard[key] = true;
		if (key === ' ') {
			if(++mode > modes.length-1) mode = 0;
			activeMode = modes[mode];
		} 
	} catch(err){
		console.log("keyPressed SoftError:", err);
		return;
	}
}
function keyReleased(){
	try{
		keyboard[key] = false;
		// console.log(JSON.stringify(keyboard, null, 4));
	} catch(err){
		console.log("keyReleased SoftError:", err);
		return;
	}
}

function handleKeyboard(){
	inputs.forwards = (Number(keyboard.w || keyboard.ArrowUp) - Number(keyboard.s || keyboard.ArrowDown));
	inputs.sideways = (Number(keyboard.e) - Number(keyboard.q));
	inputs.turn = (Number(keyboard.d || keyboard.ArrowRight) - Number(keyboard.a || keyboard.ArrowLeft));
	if (Number.isNaN(inputs.forwards)) inputs.forwards = 0;
	if (Number.isNaN(inputs.sideways)) inputs.sideways = 0;
	if (Number.isNaN(inputs.turn)) inputs.turn = 0;
}

function displayUI() {
	let msg = `Steering Behaviour Demo (${activeMode})\n`;
    msg += 'Inputs:\n';
    msg += `\tSwitch Modes ${JSON.stringify(modes)} -> "Spacebar"\n`;
	switch(activeMode) {
		case modes[0]:
			msg += '\tMove Forward -> "ArrowUp" or "w"\n';
			msg += '\tTurn Left -> "ArrowLeft" or "a"\n';
			msg += '\tMove Backwards -> "ArrowDown" or "s"\n';
			msg += '\tTurn Right -> "ArrowRight" or "d"\n';
			msg += '\tStrife Left -> "q"\n';
			msg += '\tStrife Right -> "e"';
			break;
		case modes[1]:
			msg += '\t';
			break;
	}
	push();
	fill(255);
	noStroke();
	text(msg, 10, 10);
	pop();
}