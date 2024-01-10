var ws;
var numChoices = 3 // need to generalize this to any number of input
let myid;

choiceList = []
for (var i = 0; i < numChoices; i++)
{
    choiceList.push(document.getElementById(i + "answers"))
}

initWebSocket().then(function (wsLocal) //sends initial message
{
    wsLocal.onmessage = ({data}) => onReceive(data)

    ws = wsLocal
    message = {
        'code': "getid",
        'task': "get3"
    } // need to generalize this

    wsLocal.send(JSON.stringify(message))
    //TODO: need to start timer
});

function onReceive(data) {
    parsedJson = JSON.parse(data)

    console.log(JSON.stringify(parsedJson, null, 2))

    switch (parsedJson['code'])
    {
        case "getidresponse":
            myid = parsedJson['response'] //stored in global variable so client remembers who it is
            message = {
                    'code': 'get3',
                    'id': myid
                }
            ws.send(JSON.stringify(message))
            break
        case "get3response":
            for (var i = 0; i < numChoices; i++)
            {
                choiceList[i].innerHTML = parsedJson['response'][i]
            }
            break
        case "check3response":
            if (parsedJson['response'] == true)
            {
                newSolutionFound()
                message = {
                    'code': "get3",
                    'id': myid,

                }
                ws.send(JSON.stringify(message))
            }
            break
        default:
            console.log("Unknown Code: ", parsedJson['code'])
    }

}

function checkSolution() //gets called from interact.js when all slots are full
{
    slotOccupations = getStringSlotOccupations()

    message = {
        'code': "check3",
        'solution': slotOccupations,
        'id': myid
    } //needs to be generalized

    ws.send(JSON.stringify(message))
}