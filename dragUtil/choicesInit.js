var NUM_ANSWERS = 3 //TODO: make this choosable by client on prev page
let containerElem = document.getElementById("allAnswersContainer")
let answerChildren = containerElem.children

for (var i = 0; i < NUM_ANSWERS; i++)
{
    var singleAnswerContainer = document.createElement("div")
    singleAnswerContainer.id = i + "answerContainer"
    singleAnswerContainer.className = "singleAnswerContainer"

    var draggableAnswer = document.createElement("div")
    draggableAnswer.id = i + "answers"
    draggableAnswer.className = "answers"



    var testContent = document.createTextNode("test" + i)
    draggableAnswer.appendChild(testContent)
    draggableAnswer.style.position = "absolute"

    singleAnswerContainer.appendChild(draggableAnswer)

    containerElem.appendChild(singleAnswerContainer)


}


function initStartingCoord()
{
    for (var i = 0; i < NUM_ANSWERS; i++)
    {
        var answerChild = answerChildren[i];
        let draggableText = answerChild.firstChild

        let answerChildRect = answerChild.getBoundingClientRect()
        let draggableTextRect = draggableText.getBoundingClientRect()

        textWidthOffset = draggableTextRect.width / 2
        textHeightOffset = draggableTextRect.height / 2

        let startY = ((answerChildRect.top + answerChildRect.bottom) / 2) + window.scrollY - textHeightOffset
        let startX = ((answerChildRect.left + answerChildRect.right) / 2) + window.scrollX - textWidthOffset

        draggableText.setAttribute("startingStyleY", startY)
        draggableText.setAttribute("startingStyleX", startX)

        draggableText.style.top = startY + "px"
        draggableText.style.left = startX + "px"
    }
}
initStartingCoord()


