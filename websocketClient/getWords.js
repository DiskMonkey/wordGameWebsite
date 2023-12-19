var ws;

initWebSocket().then(function (wsLocal)
{
    ws = wsLocal
    wsLocal.send("Boingo")

    wsLocal.onmessage = ({data}) => onReceive(data)
});


function onReceive(data) {
    console.log("Unsigned Data: " + data)
    ws.send("Springy")
}
