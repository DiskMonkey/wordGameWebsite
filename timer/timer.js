timerElem = document.getElementById("timer")


function dateToTime(d)
{
    let date = new Date(d)
    let output = ""
    minutes = date.getMinutes().toString().padStart(2, '0')
    seconds = date.getSeconds().toString().padStart(2, '0')

    output = minutes + ":" + seconds

    if (date.getTime() < 30000) //add more digits once there is less than 30 seconds (30,000 ms) left
    {
        milliseconds = date.getMilliseconds().toString().padStart(2, '3')
        output += "." + milliseconds
    }

    return (output)
}

function resetTimer() //should only be called after the timer is not running (b/c of race condition)
{
    if (timeLeft <= 0)
    {
        startTime = Date.now()
        setTimeout(step, frameTime);
    }
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
        console.log("Timer not updating quickly; tab might be inactive")
    }

    timeLeft = (numSeconds * 1000) - (Date.now() - startTime)
    timerElem.innerHTML = dateToTime(timeLeft)

    expected += frameTime;

    if (timeLeft > 0)
    {
        setTimeout(step, Math.max(0, frameTime - drift)); // take into account drift
    }
    else
    {
        timerElem.innerHTML = "Time's up!"
        // console.log("Time passed (sec): " + ((Date.now() - startTime) / 1000))
    }
}

setTimeout(step, frameTime);