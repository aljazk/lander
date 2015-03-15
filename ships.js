var ships = 0; var driveNewShip = true; var drivenShip = 0;

var hull, engine1, engine2;

function selectShip(select){
	if (select == 0){
		driveNewShip = !driveNewShip;
	} else {
		drivenShip = select;
		for (var b = world.m_bodyList; b; b = b.m_next) {
			for (var s = b.GetShapeList(); s != null; s = s.GetNext()) {
				var str = String(s.m_userData);
				var num = findComma(str, 2);
				if (num > 1){
					str = str.substring(0, num);
				}
				if (str == "ship"+select+",hull"){
					hull = b;
				} else if (str == "ship"+select+",engine1"){
					engine1 = b;
				} else if (str == "ship"+select+",engine2"){
					engine2 = b;
				}
			}
		}
	}
}

function moveShip(){
	text("Drive new ship: "+driveNewShip+" ;Ship driven: "+drivenShip, 10, 80);
	if (ships > 0){
		var power = 1;
		if(keyW){
			power = 50000/fps*100;
			hull.m_angularVelocity += power/4400000;
		}
		if(keyA){
			hull.m_angularVelocity -= 0.1;
		}
		if(keyD){
			hull.m_angularVelocity += 0.1;
		}
		var fx = Math.sin(engine1.m_rotation+Math.PI)*power;
		var fy = Math.cos(engine1.m_rotation+Math.PI)*power;
		var f = new b2Vec2(-fx,fy);
		var p = new b2Vec2(0,0);
		var str;
		for (var s = engine1.GetShapeList(); s != null; s = s.GetNext()) {
			str = s.m_userData;
			break;
		}
		str += ",";
		str = str.substring(findComma(str, 2)+1, findComma(str, 3));
		if (str == "working"){
			engine1.m_linearVelocity.Add( b2Math.MulFV(engine1.m_invMass, f) );
		}
		fx = Math.sin(engine2.m_rotation+Math.PI)*power;
		fy = Math.cos(engine2.m_rotation+Math.PI)*power;
		f = new b2Vec2(-fx,fy);
		p = new b2Vec2(0,0);
		for (var s = engine2.GetShapeList(); s != null; s = s.GetNext()) {
			str = s.m_userData;
			break;
		}
		str += ",";
		str = str.substring(findComma(str, 2)+1, findComma(str, 3));
		if (str == "working"){
			engine2.m_linearVelocity.Add( b2Math.MulFV(engine2.m_invMass, f) );
		}
	}
}

function breakeJoints(){
	if(fps > 10){
		if (wait > 100){
			if (world.m_jointCount != 0){
				for(var j = world.m_jointList; j; j = j.m_next){
					if (Math.abs(j.GetReactionForce(1.0/fps).x) > 6000){
						//find body connected to that joint
						for (var b = world.m_bodyList; b; b = b.m_next) {
							for (var s = b.GetShapeList(); s != null; s = s.GetNext()) {
								var str = String(s.m_userData);
								str += ",";
								str = str.substring(0, str.indexOf(",", 7));
								//breake engine
								if (str == j.m_userData){
									s.m_userData = s.m_userData.replace("working", "broken");
								}
								break;
							}
						}
						//destory joint
						world.DestroyJoint(j);
					}
				}
			}
		}
		wait ++;
		world.Step(1.0/fps, 1);
	}
}

function createShip(x,y, shipType){
	var shipBody = new b2BodyDef();
	var shipDef = new b2BoxDef();
	ships++;
	var shipStr = "ship"+ ships+",";
	switch(shipType){
	case 1:
		var shipHull, t1, t2;
		shipDef.userData = shipStr+"hull";
		shipDef.allowSleep = false;
		shipDef.extents.Set(40, 80);
		shipDef.density = 1.0;
		shipDef.restitution = 0.01;
		shipDef.friction = 111;
		shipDef.groupIndex = 0;
		shipBody.AddShape(shipDef);
		shipBody.position.Set(x,y);
		shipHull = world.CreateBody(shipBody);
		shipDef.userData = shipStr+"engine1,working";
		shipDef.extents.Set(20, 30);
		shipDef.density = 1.0;
		shipDef.restitution = 0.01;
		shipDef.friction = 111;
		shipDef.groupIndex = 0;
		shipBody.AddShape(shipDef);
		shipBody.position.Set(x+40,y+60);
		t1 = world.CreateBody(shipBody);
		var jointDef = new b2RevoluteJointDef();
		jointDef.userData = shipStr+"engine1";
		jointDef.anchorPoint.Set(x+40, y+60);
		jointDef.body1 = shipHull;
		jointDef.body2 = t1;
		jointDef.enableLimit = true;
		var j = world.CreateJoint(jointDef);
		shipDef.userData = shipStr+"engine2,working";
		shipDef.extents.Set(20, 30);
		shipDef.density = 1.0;
		shipDef.restitution = 0.01;
		shipDef.friction = 111;
		shipBody.AddShape(shipDef);
		shipBody.position.Set(x-40,y+60);
		var jointDef = new b2RevoluteJointDef();
		t2 = world.CreateBody(shipBody);
		jointDef.userData = shipStr+"engine2";
		jointDef.anchorPoint.Set(x-40, y+60);
		jointDef.body1 = shipHull;
		jointDef.body2 = t2;
		jointDef.enableLimit = true;
		world.CreateJoint(jointDef);
		break;
	default:
		shipDef.allowSleep = false;
		shipDef.extents.Set(40, 80);
		shipDef.density = 1.0;
		shipDef.restitution = 0.01;
		shipDef.friction = 111;
		shipDef.groupIndex = 2;
		shipBody.AddShape(shipDef);
		shipBody.position.Set(x,y);
		shipHull = world.CreateBody(shipBody);
		shipDef.extents.Set(20, 30);
		shipDef.density = 1.0;
		shipDef.restitution = 0.01;
		shipDef.friction = 111;
		shipDef.groupIndex = 0;
		shipBody.AddShape(shipDef);
		shipBody.position.Set(x+40,y+60);
		t1 = world.CreateBody(shipBody);
		var jointDef = new b2RevoluteJointDef();
		jointDef.anchorPoint.Set(x+40, y+60);
		jointDef.body1 = shipHull;
		jointDef.body2 = t1;
		jointDef.enableLimit = true;
		world.CreateJoint(jointDef);
		shipDef.extents.Set(20, 30);
		shipDef.density = 1.0;
		shipDef.restitution = 0.01;
		shipDef.friction = 111;
		shipBody.AddShape(shipDef);
		shipBody.position.Set(x-40,y+60);
		var jointDef = new b2RevoluteJointDef();
		t2 = world.CreateBody(shipBody);
		jointDef.anchorPoint.Set(x-40, y+60);
		jointDef.body1 = shipHull;
		jointDef.body2 = t2;
		jointDef.enableLimit = true;
		world.CreateJoint(jointDef);
	}
	if (driveNewShip){
		selectShip(ships);
	} else if (ships == 1)
		selectShip(1);
}

function findComma(string, num){
	var c = 1;
	for(var i=0; i<string.length; i++){
		if(string[i] == ","){
			if(c == num){
				return i;
			} else {
				c++;
			}
		}
	}
	return -1;
}

function findChar(string, cchar, num){
	var c = 1;
	for(var i=0; i<string.length; i++){
		if(string[i] == cchar[0]){
			if(c == num){
				return i;
			} else {
				c++;
			}
		}
	}
	return -1;
}

function countChar(string, cchar){
	var c = 0;
	for(var i=0; i<string.length; i++){
		if (string[i] == cchar[0]){
			c++;
		}
	}
	return c;
}

function orderEngines(string){
	var str = "";
	var engines = countChar(string, ":");
	for(var i=1; i<engines+1; i++){
		var num = string.indexOf("engine"+i);
		str += string.substring(num-6, string.indexOf(":", num)+1);
	}
	return str;
}

function getBox2dStats(string){
	var num = string.indexOf("|");
	for(var i=num; i>0; i--){
		if (string[i] == ","){
			return string.substring(i+1, string.length);
		}
	}
	return "error";
}

function getUserData(string){
	var num = string.indexOf("|");
	for(var i=num; i>0; i--){
		if (string[i] == ","){
			return string.substring(0, i);
		}
	}
	return "error";
}

function createShipString(shipString){
	var shipId = shipString.substring(0, findComma(shipString, 1));
	var hullString = shipString.substring(shipString.indexOf("hull"), shipString.length);
	var stats = getBox2dStats(hullString);
	var userData = getUserData(hullString);
	var posX = Number(stats.substring(0, stats.indexOf("|")));
	var posY = Number(stats.substring(stats.indexOf("|")+1, findComma(stats, 1)));
	var rotation = Number(stats.substring(findComma(stats, 1)+1, findComma(stats, 2)));
	var velX = Number(stats.substring(findComma(stats, 2)+1, findChar(stats, "|", 2)));
	var velY = Number(stats.substring(findChar(stats, "|", 2)+1, stats.indexOf(":")));
	var shipStr = shipId+","+userData;
	
	//createShip(posX, posY, 1);
	var shipBody = new b2BodyDef();
	var shipDef = new b2BoxDef();
	var jointDef = new b2RevoluteJointDef();
	var shipHull, t1;
	shipDef.userData = shipStr;
	shipDef.allowSleep = false;
	shipDef.extents.Set(40, 80);
	shipDef.density = 1.0;
	shipDef.restitution = 0.1;
	shipDef.friction = 111;
	shipDef.groupIndex = 0;
	shipBody.AddShape(shipDef);
	shipBody.position.Set(posX,posY);
	shipBody.linearVelocity.Set(velX,velY);
	shipBody.rotation = rotation;
	//text(velX+"|"+velY, 10, 120);
	shipHull = world.CreateBody(shipBody);
	shipString = shipString.substring(0, shipString.indexOf("hull")-6);
	//text(shipString, 10, 120);
	shipString = orderEngines(shipString);
	//text(shipString, 10, 140);
	last = 0;
	var engines = countChar(shipString, ":");
	for (var i=1; i<engines+1; i++){
		var objectString = shipString.substring(last, findChar(shipString, ":", i));
		last = findChar(shipString, ":", i)+1;
		objectString = objectString.substring(findComma(objectString, 1)+1, objectString.length);
		var stats = getBox2dStats(objectString);
		var userData = getUserData(objectString);
		var jointString;
		if (stats.indexOf("j-") > 0){
			jointString = stats.substring(stats.indexOf("j-")+2, stats.length);
			stats = stats.substring(0, stats.indexOf("j-")-1);
		} else {
			jointString = "no joints";
		}
		text(stats+" + "+jointString, 10, 120);
		posX = Number(stats.substring(0, stats.indexOf("|")));
		posY = Number(stats.substring(stats.indexOf("|")+1, findComma(stats, 1)));
		rotation = Number(stats.substring(findComma(stats, 1)+1, findComma(stats, 2)));
		velX = Number(stats.substring(findComma(stats, 2)+1, findChar(stats, "|", 2)));
		velY = Number(stats.substring(findChar(stats, "|", 2)+1, stats.length));
		text(userData+","+ posX + "|"+ posY + ","+ rotation +","+ velX+"|"+velY, 10, 140);
		
		shipDef.userData = shipId+","+userData;
		shipDef.extents.Set(20, 30);
		shipDef.density = 1.0;
		shipDef.restitution = 0.1;
		shipDef.friction = 111;
		shipDef.groupIndex = 0;
		shipBody.AddShape(shipDef);
		shipBody.position.Set(posX,posY);
		shipBody.linearVelocity.Set(velX,velY);
		shipBody.rotation = rotation;
		t1 = world.CreateBody(shipBody);
		if(jointString != "no joints"){
			posX = Number(jointString.substring(0, jointString.indexOf("|")));
			posY = Number(jointString.substring(jointString.indexOf("|")+1, jointString.length));
			userData += ",";
			userData = userData.substring(0, userData.indexOf(","));
			jointDef.userData = shipId+","+userData;
			jointDef.anchorPoint.Set(posX, posY);
			jointDef.body1 = shipHull;
			jointDef.body2 = t1;
			jointDef.enableLimit = true;
			world.CreateJoint(jointDef);
			shipDef.extents.Set(20, 30);
		}
	}
	ships++;
	selectShip(ships);
}