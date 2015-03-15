function createWrold(){
	var worldAABB = new b2AABB();
	worldAABB.minVertex.Set(-WorldX, -WorldY);
	worldAABB.maxVertex.Set(WorldX, WorldY);
	var gravity = new b2Vec2(0, 300);
	var doSleep = true;
	return new b2World(worldAABB, gravity, doSleep);
}

var m_w = 0;
var m_z = 987654321;
var mask = 0xffffffff;

function seed(i) {
    m_w = i;
}

function random(){
    m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
    m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
    var result = ((m_z << 16) + m_w) & mask;
    result /= 4294967296;
    return result + 0.5;
}

function createGround(){
	var height;
	var oldHeight = 50;
	for(var i=-WorldX/50/2; i<WorldX/50/2; i++){
		height = Math.floor((random() * 50) + 30);
		var points = [[-50, oldHeight], [50, height], [50, 200], [-50, 200]];
		oldHeight = height;
		createPoly(i*101, WorldY-200, points, 1);
	}
}

function createPoly(x,y, points, index){
	var polyDef = new b2PolyDef();
	polyDef.vertexCount = points.length;
	polyDef.groupIndex = index;
	for (var i = 0; i < points.length; i++) {
		polyDef.vertices[i].Set(points[i][0], points[i][1]);
	}
	polyDef.restitution = 0.01;
	var polyBd = new b2BodyDef();
	polyBd.AddShape(polyDef);
	polyBd.position.Set(x/zoom-posx,y/zoom-posy);
	world.CreateBody(polyBd);
}

function createCircle(x,y){
	var circleSd = new b2CircleDef();
	circleSd.density = 1.0;
	circleSd.radius = 25;
	circleSd.restitution = 0.5;
	circleSd.friction = 0.1;
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

function createTriangel(x,y){
	var points = [[-30, 0], [30, 0], [0, 30]];
	var polyDef = new b2PolyDef();
	polyDef.vertexCount = points.length;
	for (var i = 0; i < points.length; i++) {
		polyDef.vertices[i].Set(points[i][0], points[i][1]);
	}
	polyDef.density = 1.0;
	polyDef.restitution = 0.5;
	polyDef.friction = 0.1;
	var polyBd = new b2BodyDef();
	polyBd.AddShape(polyDef);
	polyBd.position.Set(x/zoom-posx,y/zoom-posy);
	world.CreateBody(polyBd);
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
				drawObjects(s, b.m_rotation);
			}
			var str = String(s.m_userData);
			if (str.substring(0,4) == "ship"){
				text(str.substring(4,str.length), Number(str.substring(4,str.length))*10, 100);
			}
		}
		bodyCount++;
	}
	return bodyCount;
}
function drawPart(img, s, ang){
		ctx.save();
		var tV = b2Math.AddVV(s.m_position, b2Math.b2MulMV(s.m_R, s.m_vertices[2]));
		var sV = b2Math.AddVV(s.m_position, b2Math.b2MulMV(s.m_R, s.m_vertices[1]));
		var height = Math.sqrt(Math.pow(tV.x-sV.x, 2)+Math.pow(tV.y-sV.y, 2))*zoom;
		sV = b2Math.AddVV(s.m_position, b2Math.b2MulMV(s.m_R, s.m_vertices[3]));
		var width = Math.sqrt(Math.pow(tV.x-sV.x, 2)+Math.pow(tV.y-sV.y, 2))*zoom;
		var tV = b2Math.AddVV(s.m_position, b2Math.b2MulMV(s.m_R, s.m_vertices[2]));
		var sV = b2Math.AddVV(s.m_position, b2Math.b2MulMV(s.m_R, s.m_vertices[1]));
		var height = Math.sqrt(Math.pow(tV.x-sV.x, 2)+Math.pow(tV.y-sV.y, 2))*zoom;
		sV = b2Math.AddVV(s.m_position, b2Math.b2MulMV(s.m_R, s.m_vertices[3]));
		var width = Math.sqrt(Math.pow(tV.x-sV.x, 2)+Math.pow(tV.y-sV.y, 2))*zoom;
		ctx.translate((tV.x+posx)*zoom, (tV.y+posy)*zoom);
		ctx.rotate(ang);
		ctx.drawImage(img, 0, 0, width, height);//get width and hight of object
		ctx.restore();
}

function drawObjects(s, ang){
	switch(s.m_groupIndex) {
    case 1://ground
		ctx.strokeStyle = '#C83200';
		ctx.fillStyle = '#C83200';
		ctx.beginPath();
		var tV = b2Math.AddVV(s.m_position, b2Math.b2MulMV(s.m_R, s.m_vertices[0]));
		ctx.moveTo((tV.x+posx)*zoom, (tV.y+posy)*zoom);
		for (var i = 0; i < s.m_vertexCount; i++) {
			var v = b2Math.AddVV(s.m_position, b2Math.b2MulMV(s.m_R, s.m_vertices[i]));
			ctx.lineTo((v.x+posx)*zoom, (v.y+posy)*zoom);
			if (i==3){
				ctx.lineTo((v.x+posx-1)*zoom, (v.y+posy)*zoom);
			}
		}
		ctx.lineTo((tV.x+posx-1)*zoom, (tV.y+posy)*zoom);
		ctx.stroke();
		ctx.fill();
        break;
	case 2://hull
		var img = document.createElement('img');
		img.src = 'images/hull1.png';
		drawPart(img, s, ang);
		break;
    default:
		ctx.strokeStyle = 'black';
		ctx.fillStyle = 'white';
		ctx.beginPath();
		var tV = b2Math.AddVV(s.m_position, b2Math.b2MulMV(s.m_R, s.m_vertices[0]));
		ctx.moveTo((tV.x+posx)*zoom, (tV.y+posy)*zoom);
		for (var i = 0; i < s.m_vertexCount; i++) {
			var v = b2Math.AddVV(s.m_position, b2Math.b2MulMV(s.m_R, s.m_vertices[i]));
			ctx.lineTo((v.x+posx)*zoom, (v.y+posy)*zoom);
		}
		ctx.lineTo((tV.x+posx)*zoom, (tV.y+posy)*zoom);
		ctx.stroke();
		ctx.fill();
	}
}

function removeObjects(world){
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

function text(message, x,y){
	ctx.font = '18px Calibri';
	ctx.fillStyle = 'black';
	ctx.fillText(message, x,y);
}

function staticText(message, x, y){
	ctx.font = windowHeight / 35 +"px Calibri";
	ctx.fillStyle = 'white';
	ctx.fillText(message, windowWidth / x,windowHeight / y);
}

function displayFps(){
	fps = 1000/elapsedTime;
	fps = Math.floor(fps);
	ctx.font = '18px Calibri';
	ctx.fillStyle = 'black';
	ctx.fillText("Fps: "+fps, 10,20);
}