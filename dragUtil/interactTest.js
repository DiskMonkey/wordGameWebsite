let slotParent = document.getElementById("slotParent")
let slotChildren = slotParent.children
let snapTargets = [returnToSender]
for (var i = 0; i < slotChildren.length; i++)
{
	var slot = slotChildren[i];

	if (slot.className == 'slotBreak')
	{
		continue
	}

	var rect = slot.getBoundingClientRect()
	snapTargets.push({ x: ((rect.left + rect.right) / 2) + window.scrollX, y: ((rect.top + rect.bottom) / 2) + window.scrollY, range: 75 })
}

function returnToSender()
{
	//todo: returns the original pixel location of the word, using element.id
}

const snapToSlot = interact.modifiers.snap({
	origin: {x: 0, y: 0},
	endOnly: true,
	targets: snapTargets,
})

const answers = interact('.answers')
answers.draggable({
	origin: 'self',
	inertia: true,                    // start inertial movement if thrown
	modifiers: [snapToSlot],
	listeners: {
		start(event)
		{
			const elem = event.target
			elem.style.position = 'absolute';
			document.onmousemove = prevent
			// console.log(event)
		},
		move(event)
		{
			const elem = event.target

			elementDrag(event, elem)

			if (!checkVisible(elem))
			{
				console.log("Offscreen elem")
				//TODO: Return elem to initial position.
			}

			if (event.dragLeave != null)
			{
				setSlotEmpty(event.dragLeave.id.slice(4))
			}
		}
	},

})


const answerSlot = interact('.answerSlot')
answerSlot.dropzone({
	ondrop: function (event)
	{
		// console.log(event)
		// alert(event.relatedTarget.id
		// 	+ ' was dropped into '
		// 	+ event.target.id)


		setSlotOccupied(event.target.id.slice(4), event.relatedTarget.innerHTML)

		if (isAllSlotsOccupied())
		{
			checkSolution()
		}
	}
})
	.on('dropactivate', function (event)
	{
		event.target.classList.add('drop-activated')
	})





function prevent(e)
{
	e.preventDefault();
}

function elementDrag(event, elem)
{
	const position = { pos1: 0, pos2: 0, pos3: (elem.clientWidth + elem.clientLeft) / 2, pos4: (elem.clientHeight + elem.clientTop) / 2 }

	position.pos1 = position.pos3 - event.clientX;
	position.pos2 = position.pos4 - event.clientY;
	position.pos3 = event.clientX;
	position.pos4 = event.clientY;
	// set the element's new position:
	elem.style.top = (elem.offsetTop - position.pos2) + "px";
	elem.style.left = (elem.offsetLeft - position.pos1) + "px";
}

function checkVisible(elm)
{
	var rect = elm.getBoundingClientRect();
	var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
	var viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth);
	return !(rect.bottom < 0 || rect.top - viewHeight >= 0 || rect.left < 0 || rect.right - viewWidth >= 0);
}