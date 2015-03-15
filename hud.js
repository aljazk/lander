function drawText(string, x, y, type){
	switch(type){
		case 0:
			ctx.font = '25px Calibri';
			ctx.fillStyle = 'black';
			ctx.fillText(string, x-1,y+1);
			ctx.fillStyle = "rgb(240,240,255)";
			break;
		case 1:
			ctx.font = '20px Calibri';
			ctx.fillStyle = 'black';
			ctx.fillText(string, x-1,y+1);
			ctx.fillStyle = "rgb(240,240,255)";
			break;
		default:
			ctx.font = '18px Calibri';
			ctx.fillStyle = 'black';
			break;
	}
	ctx.fillText(string, x,y);
}

function drawHud(){
	var img = document.createElement('img');
	img.src = 'images/mainhud.png';
	ctx.drawImage(img, -55, -2, 500, 80);
	var img = document.createElement('img');
	img.src = 'images/statshud.png';
	ctx.drawImage(img, 0,0, 70,80 ,390,-2, 70,80);
	var width = 500;
	ctx.drawImage(img, 70,0, 100,80 ,460,-2, width,80);
	ctx.drawImage(img, 200,0, 277,80 ,460+width,-2, 277,80);
	drawText("2 231 531, 25 "+String.fromCharCode(8364), 10, 30, 0);
	drawText("25.1.2085 15:02", 10, 60, 1);
	drawText("Ships on Mars: "+ships, 230, 30, 1);
	drawText("Selected ship: "+drivenShip, 210, 60, 1);
	
	if (shipList){
		drawShipList();
	}
	
	drawButtons();
}

function addHudButtons(){
	addButton(">>", 370, 62, 1);
}

var shipList = false;

function toggleShipList(){
	shipList = !shipList;
	if (shipList){
		for (var i=1; i<=ships; i++){
			addButton("O", 660, 80+i*30, 1);
		}
	} else {
		for (var i=0; i<getButtonCount(); i++){
			while (getText(i) == "O"){
				removeButton(i);
			}
		}
	}
}

function drawShipList(){
	var img = document.createElement('img');
	img.src = 'images/hudsquare.png';
	ctx.drawImage(img, 391, 76, 300, 400);
	for (var i=1; i<=ships; i++){
		drawText("ship "+i, 410, 80+i*30, 1);
	}
}