let streakElem = document.getElementById("streakText")
let scoreElem = document.getElementById("scoreText")
let curStreak = 0
let curScore = 0
let scoreUpdateDelay = 75 //the ms that the score takes to increase by 1

function increaseScore()
{
    curScore += curStreak + 1


    scoreDiff = curScore - readScore()

    setTimeout(updateScore, scoreUpdateDelay)
}

function updateScore()
{
    if (scoreDiff > 0)
    {
        //TODO: play a pleasing tone that increases in pitch slightly with each consecutive score update
        newScore = "Score: " + (readScore() + 1)
        scoreElem.textContent = newScore
        scoreDiff--
        setTimeout(updateScore, scoreUpdateDelay)
    }
}

function increaseStreak()
{
    curStreak++
    streakElem.textContent = "Streak: " + curStreak
}

function breakStreak()
{
    curStreak = 0
    streakElem.textContent = "Streak: " + curStreak
}

function readScore()
{
    return parseInt(scoreElem.textContent.slice(7)) //7 is the length of "Score: "
}
