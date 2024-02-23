let timerElem = document.getElementById("timer")
let historyElem = document.getElementById("previousSolutionsTable")
let allAnswersContainer = document.getElementById("allAnswersContainer")

function dateToTime(d)
{
    let date = new Date(d)
    let output = ""
    minutes = date.getMinutes().toString().padStart(2, '0')
    seconds = date.getSeconds().toString().padStart(2, '0')

    output = minutes + ":" + seconds

    if (date.getTime() < 10000) //add more digits once there is less than 10 seconds (10,000 ms) left
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
        timeLeft = new Date(numSeconds * 1000);
        setTimeout(step, frameTime);
    }
}

let numSeconds = 10
var frameTime = 50; // ms
var startTime = Date.now() //set again when resetTimer is called
var expected = startTime + frameTime;
let timeLeft = null;

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
        timerDone()
    }
}


function timerDone()
{
    historyElem.style.display = "table" //remove the 'display: none;'
    allAnswersContainer.style.display = "none"

    //TODO: make 'play again' button visible
    //TODO: make the score and streak move to the center

}