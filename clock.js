const drawClock = (x, y, startTime, playLengthInQuarters, text) => {
	return () => {
		drawBackground(x, y, ctx, radius);
		drawPie(x, y, ctx, radius, startTime, playLengthInQuarters);
		// drawDots(x, y, ctx, radius);
		drawLines(x, y, ctx, radius);
		drawHourNumbers(ctx, radius);
		// drawMinuteNumbers(ctx, radius);
		drawTime(x, y, ctx, radius);
		drawText(x, y, ctx, radius, text);
	}
}

const drawBackground = (x, y, ctx, radius) => {
	ctx.beginPath();
	ctx.arc(x, y, radius * 2, 0, 2 * Math.PI);
	ctx.fillStyle = 'white';
	ctx.fill();
	ctx.beginPath();
	ctx.arc(x, y, radius * 0.1, 0, 2 * Math.PI);
	ctx.fillStyle = '#333';
	ctx.fill();
}

const drawPie = (x, y, ctx, radius, startTime, playLengthInQuarters) => {
	ctx.beginPath();
	ctx.fillStyle = '#800';
	ctx.strokeStyle = 'white';
	ctx.lineWidth = 2;
	ctx.stroke();
	ctx.moveTo(x, y);
	ctx.arc(x, y, radius * .75, (startTime / 24) * 2 * Math.PI - (Math.PI / 2), ((startTime + playLengthInQuarters) / 24) * 2 * Math.PI - (Math.PI / 2));
	ctx.fill();
}

const drawHourNumbers = (ctx, radius) => {
	const outwards = .85
	ctx.beginPath();
	ctx.font = radius * 0.15 + "px arial";
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	for (let num = 1; num < 25; num++) {
		let ang = num * Math.PI / 12;
		ctx.rotate(ang);
		ctx.translate(0, -radius * outwards);
		ctx.rotate(-ang);
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 4;
		ctx.stroke();
		ctx.strokeText(num.toString(), 0, 0);
		ctx.fillStyle = 'white';
		ctx.fillText(num.toString(), 0, 0);
		ctx.rotate(ang);
		ctx.translate(0, radius * outwards);
		ctx.rotate(-ang);
	}
}

const drawDots = (x, y, ctx, radius) => {
	const outwards = .7
	for (let num = 1; num < 13; num++) {
		let ang = num * Math.PI / 6;
		ctx.rotate(ang);
		ctx.translate(0, -radius * outwards);
		ctx.rotate(-ang);
		ctx.beginPath();
		ctx.arc(x, y, radius * 0.05, 0, 2 * Math.PI);
		ctx.fillStyle = '#000';
		ctx.fill();
		ctx.rotate(ang);
		ctx.translate(0, radius * outwards);
		ctx.rotate(-ang);
	}
}

const drawLines = (x, y, ctx, radius) => {
	const outwards = .65
	for (let num = 1; num < 13; num++) {
		let ang = num * Math.PI / 6;
		ctx.rotate(ang);
		ctx.translate(0, -radius * outwards);
		ctx.rotate(-ang);
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'black';
		ctx.lineCap = "square";
		ctx.moveTo(x, y);
		ctx.rotate(ang);
		ctx.lineTo(0, -radius * .10);
		ctx.stroke();
		ctx.rotate(-ang);
		ctx.rotate(ang);
		ctx.translate(0, radius * outwards);
		ctx.rotate(-ang);
	}
}
const drawMinuteNumbers = (ctx, radius) => {
	const outwards = .55
	ctx.font = radius * 0.15 + "px arial";
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	for (let num = 0; num < 12; num++) {
		let ang = num * Math.PI / 6;
		ctx.rotate(ang);
		ctx.translate(0, -radius * outwards);
		ctx.rotate(-ang);
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 4;
		ctx.stroke();
		ctx.strokeText((num * 5).toString(), 0, 0);
		ctx.fillStyle = 'white';
		ctx.fillText((num * 5).toString(), 0, 0);
		ctx.rotate(ang);
		ctx.translate(0, radius * outwards);
		ctx.rotate(-ang);
	}
}

const drawTime = (x, y, ctx, radius) => {
	let now = getCETorCESTDate();
	let hour = now.getHours();
	let minute = now.getMinutes();
	let second = now.getSeconds();
	//hour
	hour = (hour * Math.PI / 12) +
		(minute * Math.PI / (12 * 60)) +
		(second * Math.PI / (360 * 60));
	drawHand(x, y, ctx, hour, radius * 0.5, radius * 0.07);
	//minute
	minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
	drawHand(x, y, ctx, minute, radius * 0.8, radius * 0.07);
	// second
	second = (second * Math.PI / 30);
	drawHand(x, y, ctx, second, radius * 0.9, radius * 0.02);
}

const drawHand = (x, y, ctx, pos, length, width) => {
	ctx.beginPath();
	ctx.lineWidth = width;
	ctx.strokeStyle = 'black';
	ctx.lineCap = "round";
	ctx.moveTo(x, y);
	ctx.rotate(pos);
	ctx.lineTo(0, -length);
	ctx.stroke();
	ctx.rotate(-pos);
}

const drawText = (x, y, ctx, radius, text) => {
	ctx.font = radius * 0.2 + "px arial";
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 4;
	ctx.stroke();
	ctx.strokeText(text, x, y + radius * 1.1);
	ctx.fillStyle = 'white';
	ctx.fillText(text, x, y + radius * 1.1);
}

// This one is from Sergey Krictsov: https://stackoverflow.com/a/31006541
function getCETorCESTDate() {
	let localDate = new Date();
	let utcOffset = localDate.getTimezoneOffset();
	let cetOffset = utcOffset + 60;
	let cestOffset = utcOffset + 120;
	let cetOffsetInMilliseconds = cetOffset * 60 * 1000;
	let cestOffsetInMilliseconds = cestOffset * 60 * 1000;

	let cestDateStart = new Date();
	let cestDateFinish = new Date();
	let localDateTime = localDate.getTime();
	let cestDateStartTime;
	let cestDateFinishTime;
	let result;

	cestDateStart.setTime(Date.parse('29 March ' + localDate.getFullYear() + ' 02:00:00 GMT+0100'));
	cestDateFinish.setTime(Date.parse('25 October ' + localDate.getFullYear() + ' 03:00:00 GMT+0200'));

	cestDateStartTime = cestDateStart.getTime();
	cestDateFinishTime = cestDateFinish.getTime();

	if (localDateTime >= cestDateStartTime && localDateTime <= cestDateFinishTime) {
		result = new Date(localDateTime + cestOffsetInMilliseconds);
	} else {
		result = new Date(localDateTime + cetOffsetInMilliseconds);
	}

	return result;
}

// code is loosely based on https://www.w3schools.com/graphics/tryit.asp?filename=trycanvas_clock_start
let canvas = document.getElementById("clock");
let ctx = canvas.getContext("2d");
let radius = canvas.height / 2.1;
ctx.translate(radius, radius);
radius *= .90
setInterval(drawClock(0, 0, 20, 2, "CE(S)T"), 1000);

document.getElementById("timetest").innerHTML = getCETorCESTDate()