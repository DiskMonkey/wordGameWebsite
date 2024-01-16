var ws;
var numChoices = 3 // need to generalize this to any number of input
let myid = null;
let chosenTask = "get3" // need to set this when multiple tasks are available

choiceList = []
for (var i = 0; i < numChoices; i++)
{
    choiceList.push(document.getElementById(i + "answers"))
}

initWebSocket().then(function (wsLocal) //sends initial message
{
    wsLocal.onmessage = ({ data }) => onReceive(data)

    ws = wsLocal
    message = {
        'code': "getid",
        'task': chosenTask
    } // need to generalize this

    wsLocal.send(JSON.stringify(message))
    //TODO: need to start timer
});

function onReceive(data)
{
    parsedJson = JSON.parse(data)

    console.log(JSON.stringify(parsedJson, null, 2))

    switch (parsedJson['code'])
    {
        case "getidresponse":
            myid = parsedJson['response'] //stored in global variable so client remembers who it is
            message = {
                'code': chosenTask,
                'id': myid
            }
            ws.send(JSON.stringify(message))
            break
        case "checkidresponse":
            if (parsedJson['response'])
            {
                message = {
                'code': "getid",
                'task': chosenTask
                } // need to generalize this
                ws.send(JSON.stringify(message))
                resetAllAnswers()
                clearRows()
                resetTimer()
            }
            else
            {
                console.log("This user is currently ingame, so a new game cannot be started.")
            }
            break
        case "get3response":
            for (var i = 0; i < numChoices; i++)
            {
                choiceList[i].innerHTML = parsedJson['response'][i]
            }
            initStartingCoord()
            popOutAllOccupations()
            break
        case "check3response":
            if (parsedJson['response'] == true)
            {
                newSolutionFound()
                sendGet3()
            }
            break
        default:
            console.log("Unknown Code: ", parsedJson['code'])
    }

}

function sendGet3()
{
    if (myid != null)
    {
        message = {
            'code': "get3",
            'id': myid,
        }
        ws.send(JSON.stringify(message))
    }
}

function sendCheckID() //called if the user wants to restart the game
{
    if (myid != null)
    {
        message = {
            'code': "checkid",
            'id': myid,
            'task': chosenTask
        }
        ws.send(JSON.stringify(message))
    }
}

function checkSolution() //gets called from interact.js when all slots are full
{
    slotOccupations = getStringSlotOccupations()

    message = {
        'code': "check3", //needs to be generalized
        'solution': slotOccupations,
        'id': myid
    }

    ws.send(JSON.stringify(message))
}