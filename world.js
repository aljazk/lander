function createWrold(){
	var worldAABB = new b2AABB();
	worldAABB.minVertex.Set(-windowWidth*3, -windowHeight*3);
	worldAABB.maxVertex.Set(windowWidth*3, windowHeight*3);
	var gravity = new b2Vec2(0, 300);
	var doSleep = true;
	return new b2World(worldAABB, gravity, doSleep);
}

function createCircle(x,y){
	var circleSd = new b2CircleDef();
	circleSd.density = 1.0;
	circleSd.radius = 25;
	circleSd.restitution = 0.5;
	circleSd.friction = 0.0;
	var circleBd = new b2BodyDef();
	circleBd.AddShape(circleSd);
	circleBd.position.Set(x/zoom-posx,y/zoom-posy);
	world.CreateBody(circleBd);
}

function createRect(x,y){
	var boxSd = new b2BoxDef();
	boxSd.extents.Set(20, 20);
	boxSd.density = 1.0;
	boxSd.restitution = 0.5;
	boxSd.friction = 0.1;
	var boxBd = new b2BodyDef();
	boxBd.AddShape(boxSd);
	boxBd.position.Set(x/zoom-posx,y/zoom-posy);
	world.CreateBody(boxBd);
}

function createStat(x,y, w,h){//dont set density to make it static.. ffs
	var groundSd = new b2BoxDef();
	groundSd.extents.Set(w, h);
	groundSd.restitution = 0.2;
	var groundBd = new b2BodyDef();
	groundBd.AddShape(groundSd);
	groundBd.position.Set(x, y);
	world.CreateBody(groundBd);
	
}

function drawCircle(x,y, rad){
	ctx.beginPath();
	ctx.arc(x,y,rad,0,2*Math.PI);
	ctx.stroke();
}

function drawWorld(world){
	var bodyCount = 0;
	for (var b = world.m_bodyList; b; b = b.m_next) {
		for (var s = b.GetShapeList(); s != null; s = s.GetNext()) {
			if (s.m_type == b2Shape.e_circleShape){
				var pos = s.m_position;
				ctx.beginPath();
				ctx.arc((pos.x+posx)*zoom,(pos.y+posy)*zoom,s.m_radius*zoom,0,2*Math.PI);
				ctx.stroke();
			} else if (s.m_type == b2Shape.e_polyShape){
				ctx.beginPath();
				var tV = b2Math.AddVV(s.m_position, b2Math.b2MulMV(s.m_R, s.m_vertices[0]));
				ctx.moveTo((tV.x+posx)*zoom, (tV.y+posy)*zoom);
				for (var i = 0; i < s.m_vertexCount; i++) {
					var v = b2Math.AddVV(s.m_position, b2Math.b2MulMV(s.m_R, s.m_vertices[i]));
					ctx.lineTo((v.x+posx)*zoom, (v.y+posy)*zoom);
				}
				ctx.lineTo((tV.x+posx)*zoom, (tV.y+posy)*zoom);
				ctx.stroke();
			}
			bodyCount++;
		}
	}
	return bodyCount;
}

function teleportSide(world){
	for (var b = world.m_bodyList; b; b = b.m_next) {
		for (var s = b.GetShapeList(); s != null; s = s.GetNext()) {
			if (s.m_position.x > WorldX){
				world.DestroyBody(b);
			}
			if (s.m_position.x < -WorldX){
				world.DestroyBody(b);
			}
			if (s.m_position.y > WorldY){
				world.DestroyBody(b);
			}
			if (s.m_position.y < -WorldY){
				world.DestroyBody(b);
			}
		}
	}
}

function drawRect(){
	ctx.beginPath();
	var tV = b2Math.AddVV(s.m_position, b2Math.b2MulMV(s.m_R, s.m_vertices[0]));
	ctx.moveTo(tV.x, tV.y);
	for (var i = 0; i < s.m_vertexCount; i++) {
		var v = b2Math.AddVV(s.m_position, b2Math.b2MulMV(s.m_R, s.m_vertices[i]));
		ctx.lineTo(v.x, v.y);
	}
	ctx.lineTo(tV.x, tV.y);
	ctx.stroke();
}

function displayFps(){
	fps = 1000/elapsedTime;
	fps = Math.floor(fps);
	ctx.font = '18px Calibri';
	ctx.fillStyle = 'black';
	ctx.fillText("Fps: "+fps, 10,20);
}