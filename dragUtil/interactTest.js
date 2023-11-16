const boogie = interact('.boogie')
boogie.draggable({
	origin: 'self',                   // (0, 0) will be the element's top-left
	inertia: true,                    // start inertial movement if thrown
	listeners: {
		start(event)
		{
			const elem = event.target
			//elem.onmousedown = prevent
			document.onmousemove = prevent
			console.log(event)
		},
		move(event)
		{
			const elem = event.target

			elementDrag(event, elem)

		}
	}
})

function prevent(e)
{
	e.preventDefault();
}

function elementDrag(event, elem)
{
	const position = { pos1: 0, pos2: 0, pos3: (elem.clientWidth + elem.clientLeft) / 2, pos4: (elem.clientHeight + elem.clientTop) / 2}

	position.pos1 = position.pos3 - event.clientX;
	position.pos2 = position.pos4 - event.clientY;
	position.pos3 = event.clientX;
	position.pos4 = event.clientY;
	// set the element's new position:
	elem.style.top = (elem.offsetTop - position.pos2) + "px";
	elem.style.left = (elem.offsetLeft - position.pos1) + "px";
}