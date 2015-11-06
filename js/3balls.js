
var threeBall = function (canvas,context) {
	var paused = true,
	discs = [
		{
			x: 150,
			y: 250,
			lastX: 150,
			lastY: 250,
			velocityX: -3.2,
			velocityY: 3.5,
			radius: 25,
			innerColor: 'rgba(255,255,0,1)',
			middleColor: 'rgba(255,255,0,0.7)',
			outerColor: 'rgba(255,255,0,0.5)',
			strokeStyle: 'gray',
		},
		{
			x: 50,
			y: 150,
			lastX: 50,
			lastY: 150,
			velocityX: -2.2,
			velocityY: 2.5,
			radius: 25,
			innerColor: 'rgba(100,145,230,1)',
			middleColor: 'rgba(100,145,230,0.7)',
			outerColor: 'rgba(100,145,230,0.5)',
			strokeStyle: 'blue',
		},
		{
			x: 150,
			y: 75,
			lastX: 150,
			lastY: 75,
			velocityX: 1.2,
			velocityY: 2.5,
			radius: 25,
			innerColor: 'rgba(255,0,0,1)',
			middleColor: 'rgba(255,0,0,0.7)',
			outerColor: 'rgba(255,0,0,0.5)',
			strokeStyle: 'orange',
		},
	],
	numDiscs = discs.length,
	animateButton = document.getElementById('animateButton');

	//function
	function drawBackground () {

	}
	function update () {
		var disc = null;
		for (var i = 0; i < numDiscs; ++i) {
			disc = discs[i];

			if (disc.x + disc.velocityX + disc.radius > context.canvas.width || disc.x + disc.velocityX - disc.radius < 0)
				disc.velocityX = -disc.velocityX;
			if (disc.y + disc.velocityY + disc.radius > context.canvas.height || disc.y + disc.velocityY - disc.radius < 0)
				disc.velocityY = -disc.velocityY;
			disc.x += disc.velocityX;
			disc.y += disc.velocityY;
		}
	}

	function draw() {
		var disc = null;

		for (var i = 0; i < numDiscs; ++i) {
			disc = discs[i];

			gradient = context.createRadialGradient(disc.x,disc.y,0,disc.x,disc.y,disc.radius);
			gradient.addColorStop(0.3,disc.innerColor);
			gradient.addColorStop(0.5,disc.middleColor);
			gradient.addColorStop(1.0,disc.outerColor);

			//context.save();
			context.beginPath();
			context.arc(disc.x,disc.y,disc.radius,0,Math.PI*2,false);
			context.fillStyle = gradient;
			context.strokeStyle = disc.strokeStyle;
			context.fill();
			context.stroke();
			//context.restore();
		}
	}

	function animate () {
		if (!paused) {
			context.clearRect(0,0,canvas.width,canvas.height);
			drawBackground();
			update();
			draw();

			window.requestNextAnimationFrame(animate);
		}
	}

	animateButton.onclick = function (e) {
		paused = paused ? false : true;
		if (paused) {
			animateButton.value = 'Animate';
		}
		else {
			window.requestNextAnimationFrame(animate);
			animateButton.value = 'Pause';
		}
	}
	context.font = '48px Helvetica';
}