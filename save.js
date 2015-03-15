function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function loadSeed(){
	var seed = getCookie("seed");
	return seed;
}

function saveShips(){
	var savestring = "";
	var i = 0;
	for (var b = world.m_bodyList; b; b = b.m_next) {
		for (var s = b.GetShapeList(); s != null; s = s.GetNext()) {
			var str = String(s.m_userData);
			if (str.substring(0,4) == "ship"){
				savestring += str+","+Math.round(b.m_position.x)+"|"+Math.round(b.m_position.y)+","+Math.round(b.m_rotation*1000)/1000;
				savestring += ","+Math.round(b.m_linearVelocity.x)+"|"+Math.round(b.m_linearVelocity.y);
				//find all joints connected to this body
				var num = findComma(str, 2);
				if (num > 0){
					str = str.substring(0, num);
				}
				for (var j = world.m_jointList; j; j = j.m_next) {
					if (String(j.m_userData) == str)
					savestring += ",j-"+ Math.round(j.GetAnchor1().x)+"|"+Math.round(j.GetAnchor1().y);
				}
				savestring += ":";
				if (str.substring(str.indexOf(",")+1, str.indexOf(",")+5) == "hull"){
					savestring += "_";
				}
				/*
				for (var j = b.m_jointList; j; j = j.m_next){
					if (j != null){
						var b1 = j.m_body1;
						savestring += "joint! "+ String(12)+" ";
					}
				}
				*/
				i++;
			}
			break;
		}
	}
	
	text(savestring+" "+i, 10,100);
	document.cookie="save="+savestring;
	return savestring;
}

function saveWorld(){
	document.cookie="savegame="+getText(0);
	document.cookie="seed="+getText(1);
	document.cookie="save="+saveShips();
	//document.cookie="expires=Thu, 18 Dec 2013 12:00:00 UTC";
	var x = document.cookie;
}

var fileString;
var fopen = false
var worked = -1;

function loadWorld(){
	var test = document.cookie;
	text(test, 10,60);
}

function loadShips(){
	var savestring = getCookie("save");
	//alert(savestring);
	for (var i=0; i<savestring.length; i=savestring.indexOf("_", i)+1){
		var shipString = savestring.substring(i, savestring.indexOf("_", i));
		createShipString(shipString);
	}
}