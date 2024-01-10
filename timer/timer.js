timerElem = document.getElementById("timer")


function dateToTime(d)
{
    let date = new Date(d)
    let output = ""
    minutes = date.getMinutes().toString().padStart(2, '0')
    seconds = date.getSeconds().toString().padStart(2, '0')

    output = minutes + ":" + seconds

    if (minutes < 1 && seconds < 30)
    {
        milliseconds = date.getMilliseconds().toString().padStart(2, '3')
        output += "." + milliseconds
    }

    return (output)
}


let numSeconds = 60
var frameTime = 50; // ms
var startTime = Date.now()
var expected = startTime + frameTime;
let timeLeft = new Date(numSeconds * 1000);

function step()
{
    var drift = Date.now() - expected; // the drift (positive for overshooting)
    if (drift > frameTime) {
        console.log("Timer not updating quickly; using slow mode.")
        timeLeft = (numSeconds * 1000) - (Date.now() - startTime)
    }

    timeLeft = timeLeft - Math.max(0, frameTime - drift)
    timerElem.innerHTML = dateToTime(timeLeft)

    expected += frameTime;

    if (timeLeft > 0)
    {
        setTimeout(step, Math.max(0, frameTime - drift)); // take into account drift
    }
    else
    {
        timerElem.innerHTML = "Time's up!"
    }
}

setTimeout(step, frameTime);