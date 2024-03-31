function initWebSocket()
{
	return new Promise(function (resolve, reject)
	{
		var ws = new WebSocket('ws://socket-nlb-ff0352c7da817418.elb.us-east-1.amazonaws.com:5150'); //need to use wss when i upgrade to https
		// var ws = new WebSocket('ws://localhost:5150'); //for testing locally (these 2 lines are the only ones i need to change)
		ws.onopen = () =>
		{
			console.log('Connection opened!');
			resolve(ws);
		}

		ws.onmessage = ({ data }) => console.log("Unsigned Data: " + data);
		ws.onclose = function ()
		{
			ws = null;
		}

		var timeWaitSec = 5;
		setTimeout(function checkIfWebSocketFailed()
		{
			if (ws == null || ws.readyState == ws.CLOSED || ws.readyState == ws.CONNECTING)
			{
				reject("No Connection");
			}
		}, 1000 * timeWaitSec)
	});
}

function messagePromise(ws)
{
	return new Promise(function (resolve)
	{
		ws.onmessage = ({ data }) =>
		{
			resolve(data);
		}
	});
}
