var settings = {
	"warmup": 5*60,
	"cooldown": 5*60,
	"run": 3*60,
	"walk": 1.5*60,
	"sets": 12
}

var runTime = settings["run"] * settings["sets"];
var walkTime = settings["walk"] * (settings["sets"] - 1)
var totalTime = settings["warmup"] + settings["cooldown"] + runTime + walkTime;
var seconds = [];
var sets = [];
var circle;

var startTime = new Date().getTime() / 1000;

console.log("Warmup:   " + settings["warmup"] + " (" + secondsToTime(settings["warmup"]) + ")");
console.log("Sets:     " + settings["sets"]);
console.log("Run:      " + settings["run"]);
console.log("Walk:     " + settings["walk"]);
console.log("Cooldown: " + settings["cooldown"]);

console.log("Running:  " + runTime);
console.log("Walking:  " + walkTime);
console.log("Total:    " + totalTime);

// Make an array of seconds
var i = 0;
var set = 0;
var second = 0;
var runNumber = 1;
var walkNumber = 1;
var setRunTime = 1;
for (i=0; i<settings["warmup"]; i++) {
	seconds[second] = "Warmup";
	sets[second] = settings["warmup"] + 1 - setRunTime;
	second++;
	setRunTime++;
}
for (set = 1; set <= settings["sets"]; set++) {
	setRunTime = 1;
	for (i = 1; i <= settings["run"]; i++) {
		seconds[second] = "Run " + runNumber + " of " + settings["sets"];
		sets[second] = settings["run"] + 1 - setRunTime;
		second++;
		setRunTime++;
	}
	// Add walk time for all but the last set
	if (set < settings["sets"]) {
		setRunTime = 1;
		for (i = 0; i < settings["walk"]; i++) {
			seconds[second] = "Walk " + walkNumber + " of " + settings["sets"];
			sets[second] = settings["walk"] + 1 - setRunTime;
			second++;
			setRunTime++;
		}
	}
	runNumber++;
	walkNumber++;
}
setRunTime = 1;
for (i = 0; i < settings["cooldown"]; i++) {
	seconds[second] = "Cooldown";
	sets[second] = settings["walk"] + 1 - setRunTime;
	second++;
	setRunTime++;
}

console.log(seconds);
console.log(sets);

var runTimer = setInterval( () => {
	var currentTime = Date.now() / 1000;
	var runningTime = Math.round(currentTime - startTime) - 1;
	if (runningTime > totalTime - 1) {
		clearInterval(runTimer);
	}
	// Show it
	displayStatus = document.getElementById("status");
	displayStatus.innerHTML = whatRoundIsIt(runningTime);
	elapsedStatus = document.getElementById("elapsed");
	elapsedStatus.innerHTML = secondsToTime(totalTime - runningTime);
	//leftStatus = document.getElementById("left");
	//leftStatus.innerHTML = secondsToTime(sets[runningTime]);
	percentStatus = document.getElementById("percent");
	var percent = 100 - (sets[runningTime] / settings["run"] * 100)
	percentStatus.innerHTML = secondsToTime(sets[runningTime]); // percent.toFixed(0) + "%";
	percentCircle = document.getElementById("percentCircle");
	percentCircle.className = "c100 p" + percent.toFixed(0);

}, 1000);

function whatRoundIsIt(elapsedTime) {
	if (elapsedTime < totalTime) {
		return seconds[elapsedTime];
	} else {
		return 'Done';
	}
}

function secondsToTime(seconds) {
    var sec_num = seconds;
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = Math.round(sec_num - (hours * 3600) - (minutes * 60));
    var timeString = "";

	if (hours   < 10) {hours = "0" + hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}

	timeString = hours + ':' + minutes + ':' + seconds;

	return timeString;
}