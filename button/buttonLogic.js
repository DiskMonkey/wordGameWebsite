//this module implicitly assumes that there is only one slot (unlike the drag module for example)

addClickListenerToElem(slotChildren[0], resetGame)


// addClickListenerToElem(positionResetButton, resetAllAnswers)
// addClickListenerToElem(getNewWordsButton, sendGet3)
// addClickListenerToElem(resetGameButton, sendCheckID)

function resetGame()
{
    resetTimer()
    clearScore()
    requestNewGame()
}


// function addClickListenerToElem(elem, funct) // this function is defined in pointsAudio
// {
//     if (elem.addEventListener)
//         elem.addEventListener("click", funct, false);
//     else if (elem.attachEvent)
//         elem.attachEvent('onclick', funct);
// }
