function addClickListenerToElem(elem, funct)
{
    if (elem.addEventListener)
        elem.addEventListener("click", funct, false);
    else if (el.attachEvent)
        elem.attachEvent('onclick', funct);
}

var positionResetButton = document.getElementById("positionResetButton");
var getNewWordsButton = document.getElementById("getNewWordsButton");
var resetGameButton = document.getElementById("resetGameButton");

addClickListenerToElem(positionResetButton, resetAllAnswers)
