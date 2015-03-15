var bType=[], bBGimg=[], bHimg=[], bMargin=[], bFontType=[], bSFont=[], bMode=[], bStatic=[], bColor=[], bHover=[], bPress=[], bTxt=[], bX=[], bY=[], bW=[];

function addButton(text, x,y, type){
	switch(type){
		case 1:
			bType[bType.length] = "press";
			bBGimg[bBGimg.length] = "NULL";
			bHimg[bHimg.length] = "NULL";
			bMargin[bMargin.length] = 2;
			bFontType[bFontType.length] = '30px Calibri';
			bSFont[bSFont.length] = -1;
			bMode[bMode.length] = 0;
			bColor[bColor.length] = 'black';
			bHover[bHover.length] = 'blue';
			bPress[bPress.length] = 'red';
			bTxt[bTxt.length] = text;
			bStatic[bStatic.length] = 0;
			break;
		case 2:  // menu button
			bType[bType.length] = "menu";
			bBGimg[bBGimg.length] = "NULL";
			bHimg[bHimg.length] = "images/button.png";
			bMargin[bMargin.length] = 4;
			bFontType[bFontType.length] = 'px Calibri';
			bSFont[bSFont.length] = 25;
			bMode[bMode.length] = 0;
			bColor[bColor.length] = 'white';
			bHover[bHover.length] = 'white';
			bPress[bPress.length] = 'white';
			bTxt[bTxt.length] = text;
			bStatic[bStatic.length] = 1;
			break;
		case 3: // button
			bType[bType.length] = "press";
			bBGimg[bBGimg.length] = "images/butt.png";
			bHimg[bHimg.length] = "images/hbutt.png";
			bMargin[bMargin.length] = 10;
			bFontType[bFontType.length] = 'px Calibri';
			bSFont[bSFont.length] = 40;
			bMode[bMode.length] = 0;
			bColor[bColor.length] = 'white';
			bHover[bHover.length] = 'white';
			bPress[bPress.length] = 'blue';
			bTxt[bTxt.length] = text;
			bStatic[bStatic.length] = 1;
			break;
		case 4: 
			bType[bType.length] = "input";
			bBGimg[bBGimg.length] = "NULL";
			bHimg[bHimg.length] = "NULL";
			bMargin[bMargin.length] = 6;
			bFontType[bFontType.length] = 'px Calibri';
			bSFont[bSFont.length] = 40;
			bMode[bMode.length] = 0;
			bColor[bColor.length] = 'white';
			bHover[bHover.length] = 'red';
			bPress[bPress.length] = 'blue';
			bTxt[bTxt.length] = text;
			bStatic[bStatic.length] = 1;
			break;
		default:
			bType[bType.length] = "press";
			bBGimg[bBGimg.length] = "NULL";
			bHimg[bHimg.length] = "NULL";
			bMargin[bMargin.length] = 2;
			bFontType[bFontType.length] = '25px Calibri';
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
	ctx.font = bFontType[bFontType.length-1];
	bW[bW.length] = ctx.measureText(text).width;
}

function removeButton(id){
	bType.splice(id,1);
	bBGimg.splice(id,1);
	bHimg.splice(id,1);
	bMargin.splice(id,1);
	bFontType.splice(id,1);
	bSFont.splice(id,1);
	bMode.splice(id,1);
	bStatic.splice(id,1);
	bColor.splice(id,1);
	bHover.splice(id,1);
	bPress.splice(id,1);
	bTxt.splice(id,1);
	bX.splice(id,1);
	bY.splice(id,1);
	bW.splice(id,1);
}

function removeAllButtons(){
	bType.splice(0,bType.length);
	bBGimg.splice(0,bBGimg.length);
	bHimg.splice(0,bHimg.length);
	bMargin.splice(0,bMargin.length);
	bFontType.splice(0,bFontType.length);
	bSFont.splice(0,bSFont.length);
	bMode.splice(0,bMode.length);
	bStatic.splice(0,bStatic.length);
	bColor.splice(0,bColor.length);
	bHover.splice(0,bHover.length);
	bPress.splice(0,bPress.length);
	bTxt.splice(0,bTxt.length);
	bX.splice(0,bX.length);
	bY.splice(0,bY.length);
	bW.splice(0,bW.length);
}

function drawButtons(){
	for (var i=0; i<bX.length; i++){
		switch(bType[i][0]){
			case 'm':
				var num = 0;
				while (bFontType[i][num] != 'p'){
					num++;
				}
				bFontType[i] = bFontType[i].slice(num,bFontType[i].length);
				var fontSize = windowHeight/bSFont[i];
				bFontType[i] = Math.round(fontSize)+bFontType[i];
				ctx.font = bFontType[i];
				bW[i] = ctx.measureText(bTxt[i]).width;
				if (bBGimg[i] != 'NULL'){
					var img = document.createElement('img');
					img.src = bBGimg[i];
					ctx.drawImage(img, windowWidth / bX[i]-bMargin[i], windowHeight / bY[i]-bMargin[i]-Number(bFontType[i].substring(0, num))/3*2, bW[i]+bMargin[i]*2, Number(bFontType[i].substring(0, num))/3*2+bMargin[i]*2);
				}
				switch(bMode[i]){
					case 0:
						ctx.fillStyle = bColor[i];
						break;
					case 1:
						if (bHimg[i] != 'NULL'){
							var img = document.createElement('img');
							img.src = bHimg[i];
							ctx.drawImage(img, windowWidth / bX[i]-bMargin[i], windowHeight / bY[i]-bMargin[i]-Number(bFontType[i].substring(0, num))/3*2, bW[i]+1000, Number(bFontType[i].substring(0, num))/3*2+bMargin[i]*2);
						}
						ctx.fillStyle = bHover[i];
						break;
					case 2:
						ctx.fillStyle = bPress[i];
						break;
				}
				ctx.fillText(bTxt[i], windowWidth / bX[i], windowHeight / bY[i]);
				break;
			case 'p':
				if (bStatic[i]){
					var num = 0;
					while (bFontType[i][num] != 'p'){
						num++;
					}
					bFontType[i] = bFontType[i].slice(num,bFontType[i].length);
					var fontSize = windowHeight/bSFont[i];
					bFontType[i] = Math.round(fontSize)+bFontType[i];
				}
				ctx.font = bFontType[i];
				bW[i] = ctx.measureText(bTxt[i]).width;
				if (bBGimg[i] != 'NULL'){
					if (bStatic[i]){
						var img = document.createElement('img');
						img.src = bBGimg[i];
						ctx.drawImage(img, windowWidth / bX[i]-bMargin[i], windowHeight / bY[i]-bMargin[i]-Number(bFontType[i].substring(0, num))/3*2, bW[i]+bMargin[i]*2, Number(bFontType[i].substring(0, num))/3*2+bMargin[i]*2);
					} else {
						var img = document.createElement('img');
						img.src = bBGimg[i];
						ctx.drawImage(img, bX[i], bY[i]-Number(bFontType[i].substring(0, num))/3*2, bW[i], Number(bFontType[i].substring(0, num))/3*2.5);
					}
				}
				switch(bMode[i]){
					case 0:
						ctx.fillStyle = bColor[i];
						break;
					case 1:
						if (bHimg[i] != 'NULL'){
							if (bStatic[i]){
								var img = document.createElement('img');
								img.src = bHimg[i];
								ctx.drawImage(img, windowWidth / bX[i]-bMargin[i], windowHeight / bY[i]-bMargin[i]-Number(bFontType[i].substring(0, num))/3*2, bW[i]+bMargin[i]*2, Number(bFontType[i].substring(0, num))/3*2+bMargin[i]*2);
							} else {
								var img = document.createElement('img');
								img.src = bHimg[i];
								ctx.drawImage(img, bX[i], bY[i]-Number(bFontType[i].substring(0, num))/3*2, bW[i], Number(bFontType[i].substring(0, num))/3*2.5);
							}
						}
						ctx.fillStyle = bHover[i];
						break;
					case 2:
						ctx.fillStyle = bPress[i];
						break;
				}
				if (bStatic[i]){
					ctx.fillText(bTxt[i], windowWidth / bX[i], windowHeight / bY[i]);
				} else {
					ctx.fillText(bTxt[i], bX[i], bY[i]);
				}
				break;
			case 'i':				
				if (bStatic[i]){
					var num = 0;
					while (bFontType[i][num] != 'p'){
						num++;
					}
					bFontType[i] = bFontType[i].slice(num,bFontType[i].length);
					var fontSize = windowHeight/bSFont[i];
					bFontType[i] = Math.round(fontSize)+bFontType[i];
				}
				ctx.font = bFontType[i];
				bW[i] = ctx.measureText(bTxt[i]).width;
				switch(bMode[i]){
					case 0:
						if (bStatic[i]){
							ctx.beginPath();
							var buttonWidth = bW[i]+bMargin[i]*2;
							if (buttonWidth < 200){
								buttonWidth = 200;
							}
							ctx.rect(windowWidth / bX[i]-bMargin[i], windowHeight / bY[i]-bMargin[i]-Number(bFontType[i].substring(0, num))/3*2, buttonWidth, Number(bFontType[i].substring(0, num))/3*2+bMargin[i]*2);
							ctx.lineWidth = 2;
							ctx.strokeStyle = 'grey';
							ctx.stroke();
						} else {
							ctx.beginPath();
							var buttonWidth = bW[i]+bMargin[i]*2;
							if (buttonWidth < 200){
								buttonWidth = 200;
							}
							ctx.rect(bX[i], bY[i]-Number(bFontType[i].substring(0, num))/3*2, bW[i], Number(bFontType[i].substring(0, num))/3*2.5);
							ctx.lineWidth = 2;
							ctx.strokeStyle = 'grey';
							ctx.stroke();
						}
						ctx.fillStyle = bColor[i];
						break;
					case 1:
						if (bStatic[i]){
							ctx.beginPath();
							var buttonWidth = bW[i]+bMargin[i]*2;
							if (buttonWidth < 200){
								buttonWidth = 200;
							}
							ctx.rect(windowWidth / bX[i]-bMargin[i], windowHeight / bY[i]-bMargin[i]-Number(bFontType[i].substring(0, num))/3*2, buttonWidth, Number(bFontType[i].substring(0, num))/3*2+bMargin[i]*2);
							ctx.lineWidth = 2;
							ctx.strokeStyle = 'grey';
							ctx.stroke();
						} else {
							ctx.beginPath();
							var buttonWidth = bW[i]+bMargin[i]*2;
							if (buttonWidth < 200){
								buttonWidth = 200;
							}
							ctx.rect(bX[i], bY[i]-Number(bFontType[i].substring(0, num))/3*2, bW[i], Number(bFontType[i].substring(0, num))/3*2.5);
							ctx.lineWidth = 2;
							ctx.strokeStyle = 'grey';
							ctx.stroke();
						}
						ctx.fillStyle = bHover[i];
						break;
					case 2:
						if (bStatic[i]){
							ctx.beginPath();
							var buttonWidth = bW[i]+bMargin[i]*2;
							if (buttonWidth < 200){
								buttonWidth = 200;
							}
							ctx.rect(windowWidth / bX[i]-bMargin[i], windowHeight / bY[i]-bMargin[i]-Number(bFontType[i].substring(0, num))/3*2, buttonWidth, Number(bFontType[i].substring(0, num))/3*2+bMargin[i]*2);
							ctx.lineWidth = 2;
							ctx.strokeStyle = 'blue';
							ctx.stroke();
						} else {
							ctx.beginPath();
							var buttonWidth = bW[i]+bMargin[i]*2;
							if (buttonWidth < 200){
								buttonWidth = 200;
							}
							ctx.rect(bX[i], bY[i]-Number(bFontType[i].substring(0, num))/3*2, bW[i], Number(bFontType[i].substring(0, num))/3*2.5);
							ctx.lineWidth = 2;
							ctx.strokeStyle = 'blue';
							ctx.stroke();
						}
						ctx.fillStyle = bPress[i];
						break;
				}
				if (bStatic[i]){
					ctx.fillText(bTxt[i], windowWidth / bX[i], windowHeight / bY[i]);
				} else {
					ctx.fillText(bTxt[i], bX[i], bY[i]);
				}
				break;
		}
	}
}

function checkButtonPress(mouseX,mouseY, press){
	mouseX += 8;
	mouseY += 8;
	for (var i=0; i<bX.length; i++){
		if (bType[i][0] == "i"){
			if (bMode[i] == 1){
				bMode[i] = 0;
			} else if (bMode[i] == 2 && press){
				bMode[i] = 0;
			}
		} else {
			bMode[i] = 0;
		}
		var num = 0;
		while (bFontType[i][num] != 'p'){
			num++;
		}
		if(bStatic[i]){
			var x = windowWidth / bX[i];
			var y = windowHeight / bY[i];
			var buttonWidth = bW[i]+bMargin[i];
			if (bType[i][0] == 'i' && buttonWidth < 200){
				buttonWidth = 198;
			}
			if (mouseX > x-bMargin[i] && mouseX < buttonWidth+x && mouseY < y+bMargin[i] && mouseY > y-bMargin[i]-Number(bFontType[i].substring(0, num))/3*2){
				if (press){
					bMode[i] = 2;
					if(bTxt[i] == "NEW GAME"){
						switchMenu(1);
					}
					if(bTxt[i] == "CREATE"){
						saveWorld();
						switchMenu(2);
					}
					if(bTxt[i] == "LOAD GAME"){
						switchMenu(2);
					}
				} else {
					if(bMode[i] == 0){
						bMode[i] = 1;
					}
				}
			}
		} else {
			if (mouseX > bX[i]-bMargin[i] && mouseX < bW[i]+bMargin[i]+bX[i] && mouseY < bY[i]+bMargin[i] && mouseY > bY[i]-bMargin[i]-Number(bFontType[i].substring(0, num))/3*2){
				if (press){
					bMode[i] = 2;
					if(getMenu() == 3 || getMenu() == 2){
						if (bTxt[i] == ">>"){
							toggleShipList();
						}
					}
				} else {
					bMode[i] = 1;
				}
			}
		}
	}
}

function buttonInput(keycode){
	for(var i=0; i<bX.length; i++){
		if (bType[i][0] == 'i'){
			if (bMode[i] == 2){
				if (keycode == 8){
					bTxt[i] = bTxt[i].substr(0, bTxt[i].length-1);
				} else {
					bTxt[i] = bTxt[i]+String.fromCharCode(keycode);
				}
				//bTxt[i] = bTxt[i]+keycode;
			}
		}
	}
}

function getText(id){
	return bTxt[id];
}

function getButtonCount(){
	return bTxt.length;
}