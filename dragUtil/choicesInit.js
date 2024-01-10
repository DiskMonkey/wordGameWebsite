var NUM_ANSWERS = 3 //TODO: make this choosable by client on prev page
containerElem = document.getElementById("allAnswersContainer")

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

    singleAnswerContainer.appendChild(draggableAnswer)

    containerElem.appendChild(singleAnswerContainer)
}

for (var i = 0; i < NUM_ANSWERS; i++)
{
    let draggableAnswer = document.getElementById(i + "answers")
    let rect = draggableAnswer.getBoundingClientRect()
    draggableAnswer.setAttribute("startingStyleTop", rect.top)
    draggableAnswer.setAttribute("startingStyleLeft", rect.left)
}