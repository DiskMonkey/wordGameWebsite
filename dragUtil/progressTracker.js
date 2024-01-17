let table = document.getElementById("previousSolutionsTable")
let numTableRows = 1

function newSolutionFound() //TODO: generalize to any number of slots
{
    let solution = getStringSlotOccupations()
    addRowPrevAnsw(solution[0], solution[1], solution[2])
}

function addRowPrevAnsw(right, avr, left) //TODO: generalize to any number of inputs (taken as list)
{
    let row = table.insertRow(-1)
    row.insertCell(0).innerHTML = right
    row.insertCell(1).innerHTML = avr
    row.insertCell(2).innerHTML = left
    numTableRows++
}

function clearRows() //reset table for new game
{
    for (let i = 1; i < numTableRows; i++)
    {
        table.deleteRow(1)
    }
    numTableRows = 1
}