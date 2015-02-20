var mouseDown = false;

function listenForEvents(){
	document.addEventListener("mousedown", function(event){
		if(x < 0){
			if(event.button == 0){
				checkButtonPress(event.pageX-8, event.pageY-8, 1);
				mouseDown = true;
			} else if (event.button == 1){
				
			} else if (event.button == 2){
				createShip(event.pageX-10, event.pageY -10, 1);
			}
			x = 1;
		}
		dragx = event.pageX, dragy = event.pageY;
		drag = true;
	});
	x--;
	document.addEventListener("mousemove", function(event){
		if(g < 0 && drag){
			posx -= (dragx - event.pageX)/zoom;
			posy -= (dragy - event.pageY)/zoom;
			dragx = event.pageX, dragy = event.pageY;
			//document.getElementById("demo").innerHTML = posx+" "+posy;
			g = 1;
		}
		checkButtonPress(event.pageX-8, event.pageY-8, mouseDown);
	});
	g--;
	document.addEventListener("mouseup", function(event){
		drag = false;
		mouseDown = false;
	});
	document.addEventListener("mousewheel", function(event){
		if(w < 0){
			if (0 < event.wheelDelta){
				zoom += zoom/10;
			} else if (0 > event.wheelDelta){
				zoom -= zoom/10;
			}
			w = 1;
		}
	});
	document.addEventListener("mousewheel", function(event){
		if(w < 0){
			if (0 < event.wheelDelta){
				zoom += zoom/10;
			} else if (0 > event.wheelDelta){
				zoom -= zoom/10;
			}
			w = 1;
		}
	});
	w--;
	document.addEventListener("keydown", function(event){
		if(event.keyCode == 87){//w
			keyW = true;
		}
		if(event.keyCode == 65){//a
			keyA = true;
		}
		if(event.keyCode == 68){//d
			keyD = true;
		}
		
	});
	document.addEventListener("keyup", function(event){
		if(event.keyCode == 87){//w
			keyW = false;
		}
		if(event.keyCode == 65){//a
			keyA = false;
		}
		if(event.keyCode == 68){//d
			keyD = false;
		}
		
	});
}