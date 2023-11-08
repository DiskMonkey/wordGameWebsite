const interact = require('interactjs')

const boogie = interact('.boogie')
boogie.draggable({
	origin: 'self',                   // (0, 0) will be the element's top-left
    inertia: true,                    // start inertial movement if thrown
    listeners: {
		move(event){
			print("moved")
		}
	}
})