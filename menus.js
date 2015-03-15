var menu;

function getMenu(){
	return menu;
}

function switchMenu(setmenu){
	menu = setmenu;
	switch(setmenu){
		case 0:
			removeAllButtons();
			addButton("NEW GAME", 1.7, 3, 2);
			addButton("LOAD GAME", 1.7, 2.7, 2);
			addButton("OPTIONS", 1.7, 2.45, 2);
			addButton("EXIT", 1.7, 2.25, 2);
			break;
		case 1:
			removeAllButtons();
			addButton("savegame", 1.7, 2.7, 4);
			addButton(Math.round(Math.random()*1000)+"", 1.7, 2.25, 4);
			addButton("CREATE", 1.7, 2, 2);
			saveWorld();
			break;
		case 2:
			removeAllButtons();
			seed(loadSeed());
			createGround();
			loadShips();
			zoom = 0.2, posx = WorldX/3.5, posy = -WorldY*0.38;
			addHudButtons();
			break;
		case 3:
			removeAllButtons();
			addHudButtons();
			break;
	}
}

function displayMenu(){
	switch(menu){
		case 0:
			mainmenu();
			break;
		case 1:
			newgame();
			break;
		case 2:
			game();
			break;
		case 3:
			drawHud();
			break;
	}
}

function mainmenu(){
	var img = document.createElement('img');
	img.src = 'images/background.jpg';
	ctx.drawImage(img, 0, 0, windowWidth, windowHeight);
	
	var img = document.createElement('img');
	img.src = 'images/main1.png';
	ctx.drawImage(img, 0, 0, windowWidth, windowHeight);
	drawButtons();
}

function newgame(){
	var img = document.createElement('img');
	img.src = 'images/background.jpg';
	ctx.drawImage(img, 0, 0, windowWidth, windowHeight);
	
	var img = document.createElement('img');
	img.src = 'images/main1.png';
	ctx.drawImage(img, 0, 0, windowWidth, windowHeight);
	
	staticText("Name your savegame.", 1.7, 3);
	staticText("Select world seed.", 1.7, 2.45);
	
	loadWorld();
	
	drawButtons();
}


function game(){
	moveShip();
	breakeJoints();
	removeObjects(world);
	var n = drawWorld(world);
	drawButtons();
	text("Number of objects: " +n+ " seed: " + getCookie("seed"), 10,40);
	text("Posx: "+ Math.floor(posx) +" Posy: "+ Math.floor(posy) +" Zoom: "+ zoom, 10,60);
	drawHud();
	saveShips();
}