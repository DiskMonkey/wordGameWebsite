slotContainer = document.getElementById("slotParent")
numSlots = 3 //when i generalize, this value needs to be set

//  slotOccupiedBy[index] = the answer elem
slotOccupiedBy = []

for (let i = 0; i < numSlots; i++) {
    slotOccupiedBy[i] = null
}

function logSlotOccupations()
{
    out = ""
    for (let i = 0; i < numSlots; i++)
    {
        if (slotOccupiedBy[i] == null)
        {
            out = out + "NULL, "
        }
        else
        {
            out = out + slotOccupiedBy[i].innerHTML + ", "
        }
    }
    console.log(out)
}

function setSlotEmpty(slotIndex)
{
    slotOccupiedBy[slotIndex] = null
    // logSlotOccupations()
}

function setSlotOccupied(slotIndex, item)
{
    slotOccupiedBy[slotIndex] = item
    // logSlotOccupations()
}

function getSlotOccupations()
{
    return slotOccupiedBy
}

function getStringSlotOccupations()
{
    wordSolutions = []

    for (var i = 0; i < slotOccupiedBy.length; i++)
    {
        wordSolutions.push(slotOccupiedBy[i].innerHTML)
    }

    return wordSolutions
}

function getNumSlots()
{
    return numSlots
}

function isSlotOccupied(slotIndex)
{
    return (slotOccupiedBy[slotIndex] != null)
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