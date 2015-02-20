var bType=[], bSFont=[], bMode=[], bStatic=[], bColor=[], bHover=[], bPress=[], bTxt=[], bX=[], bY=[], bW=[], bH=[];

function addButton(text, x,y, type){
	switch(type){
		case 1: 
			bType[bType.length] = '30px Calibri';
			bMode[bMode.length] = 0;
			bColor[bColor.length] = 'black';
			bHover[bHover.length] = 'blue';
			bPress[bPress.length] = 'red';
			bTxt[bTxt.length] = text;
			bStatic[bStatic.length] = 0;
			break;
		case 2: 
			bType[bType.length] = 'px Calibri';
			bSFont[bSFont.length] = 25;
			bMode[bMode.length] = 0;
			bColor[bColor.length] = 'white';
			bHover[bHover.length] = 'black';
			bPress[bPress.length] = 'blue';
			bTxt[bTxt.length] = text;
			bStatic[bStatic.length] = 1;
			break;
		default:
			bType[bType.length] = '25px Calibri';
			bMode[bMode.length] = 0;
			bColor[bColor.length] = 'black';
			bHover[bHover.length] = 'blue';
			bPress[bPress.length] = 'red';
			bTxt[bTxt.length] = text;
			bStatic[bStatic.length] = 0;
			break;
	}
	bX[bX.length] = x;
	bY[bY.length] = y;
	ctx.font = bType[bType.length-1];
	bW[bW.length] = ctx.measureText(text).width;
}

function removeButton(id){
	bType.splice(id,1);
	bMode.splice(id,1);
	bColor.splice(id,1);
	bHover.splice(id,1);
	bPress.splice(id,1);
	bTxt.splice(id,1);
	bX.splice(id,1);
	bY.splice(id,1);
	bW.splice(id,1);
}

function drawButtons(){
	for (var i=0; i<bX.length; i++){
		if (bStatic[i]){
			var num = 0;
			while (bType[i][num] != 'p'){
				num++;
			}
			bType[i] = bType[i].slice(num,bType[i].length);
			var fontSize = windowHeight/bSFont[i];
			bType[i] = Math.round(fontSize)+bType[i];
			text(bType[i], 10,40);
		}
		ctx.font = bType[i];
		bW[i] = ctx.measureText(bTxt[i]).width;
		switch(bMode[i]){
			case 0:
				ctx.fillStyle = bColor[i];
				break;
			case 1:
				ctx.fillStyle = bHover[i];
				break;
			case 2:
				ctx.fillStyle = bPress[i];
				break;
		}
		if (bStatic[i]){
			ctx.fillText(bTxt[i], windowWidth / bX[i], windowHeight / bY[i]);
		} else {
			ctx.fillText(bTxt[i], bX[i], bY[i])
		}
	}
}

function checkButtonPress(mouseX,mouseY, press){
	mouseX += 8;
	mouseY += 8;
	for (var i=0; i<bX.length; i++){
		bMode[i] = 0;
		var num = 0;
		while (bType[i][num] != 'p'){
			num++;
		}
		if(bStatic[i]){
			var x = windowWidth / bX[i];
			var y = windowHeight / bY[i];
			if (mouseX > x && mouseX < bW[i]+x && mouseY < y && mouseY > y-Number(bType[i].substring(0, num))/3*2){
				if (press){
					bMode[i] = 2;
				} else {
					bMode[i] = 1;
				}
			}
		} else {
			if (mouseX > bX[i] && mouseX < bW[i]+bX[i] && mouseY < bY[i] && mouseY > bY[i]-Number(bType[i].substring(0, num))/3*2){
				if (press){
					bMode[i] = 2;
				} else {
					bMode[i] = 1;
				}
			}
		}
	}
}