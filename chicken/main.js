const query = document.querySelector.bind(document)
const queryAll = document.querySelectorAll.bind(document)

const PLATE_QUANTITY = 25

const plateList = queryAll('.plates .ul-grand-parent .ul-parent ul li')

const openedPlate = []

plateList.forEach((plate, index) => {
    plate.onclick = () => {
        handleOpenPlate(plate, index)
    }
})


const handleRandom = () => {
    return Math.floor(Math.random() * 2);
}

const handleFakeOpen = (plate) => {
    plate.classList.add('openning')

    plate.classList.add('lost-opened')
    if(handleRandom() === 1){
        plate.classList.add('chicken')
    }else{
        plate.classList.add('bone')
    }
}

const randomPlatesLeft = () => {
    plateList.forEach((plate, index) => {
        if(!openedPlate.includes(index)){
            handleFakeOpen(plate)
        }
    })
}

// handle
const handleOpenPlate = (plate, index) => {
    plate.classList.add('openning')

    plate.classList.add('lost-opened')
    if(handleRandom() === 1){
        plate.classList.add('chicken')
        openedPlate.push(index)
    }else{
        plate.classList.add('bone')
        randomPlatesLeft()
    }

    console.log(openedPlate)
}

query('.bet-button').onclick = () => {
    plateList.forEach((plate) => {
        plate.className = ''
        openedPlate.length = 0
    })
}