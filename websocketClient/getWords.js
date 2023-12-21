var ws;
var sendMessage = true;

initWebSocket().then(function (wsLocal)
{
    ws = wsLocal
    wsLocal.send("Boingo")

    wsLocal.onmessage = ({data}) => onReceive(data)
});


function onReceive(data) {
    console.log("Unsigned Data: " + data)
    if (sendMessage)
    {
        sendMessage = !sendMessage
        ws.send("Springy")
    }
}
