// Start a WebSocket connection with the server using SocketIO
var socket = io();

// Create a variable for the web page's canvas element, which has id="mycanvas"
var canvas = document.getElementById('mycanvas');

// Create a variable to access the two-dimensional canvas drawing functions
var pen = canvas.getContext('2d');

// Set event listeners for when the mouse button is pressed down, when the mouse moves, and when the mouse button is released
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', drawStuff);
canvas.addEventListener('mouseup', stopDrawing);

let isDrawing = false;
socket.on('mousedown', function(data) {
	console.log(data)
	startDrawing(data)
})
socket.on('mousemove', function(data) {
	drawStuff(data)
})
function startDrawing(event) {
	console.log("START: " + event.clientX + ", " + event.clientY);
	isDrawing = true;
	pen.beginPath();
	pen.moveTo(event.clientX, event.clientY);
	socket.emit('mousedown', {clientX: event.clientX, clientY: event.clientY});
	// Which canvas drawing functions should go here??
	// HINT: start with pen.beginPath();
}

function drawStuff(event) {
	if (isDrawing) {
		pen.lineTo(event.clientX, event.clientY)
		pen.stroke()
	}
	socket.emit('mousemove', {clientX: event.clientX, clientY: event.clientY})
	// Which canvas drawing functions should go here?? (or none at all?)

}

function stopDrawing(event) {
	console.log('mouseup')
	isDrawing = false
	// Which canvas drawing functions should go here?? (or none at all?)
}