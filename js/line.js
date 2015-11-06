var slowline = function (canvas,context,path) {

	var paused = true,
		animateButton = document.getElementById('animateButton'),
		len = path.length,
		addX = 1,
		addY = 1,
		nowargu = 1,
		nowX = path[0].x,
		nowY = path[0].y,
		nextX = path[1].x,
		nextY = path[1].y,
		imagedata = "";
	context.beginPath();
	context.moveTo(path[0].x,path[0].y);
	
	this.update = function () {
		if (nowX > nextX) {
			addX = -1;
		} else {
			addX = 1;
		}
		if (nowY > nextY) {
			addY = -1;
		} else {
			addY = 1;
		}
		if (nowX == nextX && nowY == nextY && nowargu < len) {
			nextX = path[nowargu].x;
			nextY = path[nowargu].y;
			nowargu++;
		} else {
			nowX += addX;
			nowY += addY;
		}

		if (nowX == nextX && nowY == nextY && nowargu == len) {
			return "fin";
		} else {
			return "ack";
		}

	}

	this.draw = function () {
		context.lineTo(nowX,nowY);
		context.stroke();
	}

	this.update2 = function (x,y,w,h) {
		if (x < canvas.width && y < canvas.height) {
			imagedata = context.getImageData(x,y,w,h);
		}
	}

	this.draw2 = function (x,y,dx,dy,dw,dh) {
		context.putImageData(imagedata,x,y,dx,dy,dw,dh);
	}

}