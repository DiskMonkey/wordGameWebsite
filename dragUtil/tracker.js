numSlots = 3 //when i generalize, this value needs to be set

//  slotOccupiedBy[index] = the text of the answer
slotOccupiedBy = []

for (let i = 0; i < numSlots; i++) {
    slotOccupiedBy[i] = null
}

function setSlotEmpty(slotIndex)
{
    slotOccupiedBy[slotIndex] = null
}

function setSlotOccupied(slotIndex, item)
{
    slotOccupiedBy[slotIndex] = item
    console.log(slotOccupiedBy)
}

function getSlotOccupations()
{
    return slotOccupiedBy
}

function isAllSlotsOccupied()
{
    for (let i = 0; i < numSlots; i++) {
        if (slotOccupiedBy[i] == null)
        {
            return false
        }
    }
    return true
}