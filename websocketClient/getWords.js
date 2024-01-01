var ws;
var sendMessage = true;
numChoices = 3 // need to generalize this to any number of input

choiceList = []
for (var i = 0; i < numChoices; i++)
{
    console.log(document.getElementById(i + "answers"))
    choiceList.push(document.getElementById(i + "answers"))
}

initWebSocket().then(function (wsLocal) //sends initial message
{
    wsLocal.onmessage = ({data}) => onReceive(data)

    ws = wsLocal
    message = { 'code': "get3" } // need to generalize this
    wsLocal.send(JSON.stringify(message))
});

function onReceive(data) {
    parsedJson = JSON.parse(data)

    console.log(JSON.stringify(parsedJson, null, 2))

    switch (parsedJson['code'])
    {
        case "get3response":
            for (var i = 0; i < numChoices; i++)
            {
                choiceList[i].innerHTML = parsedJson['response'][i]
            }
            break
        case "check3response":
            console.log("code here")
            break
        default:
            console.log("Unknown Code: ", parsedJson['code'])
    }

}

function checkSolution()
{
    slotOccupations = getSlotOccupations()
    message = {
        'code': "check3",
        'solution': slotOccupations
    } //needs to be generalized

    ws.send(JSON.stringify(message))
}