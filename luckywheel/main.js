const query = document.querySelector.bind(document)
const queryAll = document.querySelectorAll.bind(document)

const wheel = query('.wheel-prize')
const wheelPrizeList = queryAll('.wheel-prize-item')
const button = query('.wheel-button')

const handleSpinning = () => {
    // random reward
    // a Thuong can call APIs to get a index of award here 
    const resultNum = Math.floor(Math.random() * 7) + 1;
    
    // clear wheel
    wheelPrizeList.forEach(prize => {
        prize.classList.remove('active')
    });

    // start animation
    wheel.classList.add('active')

    // finish : active a index of award on wheel
    setTimeout(() => {
        wheel.classList.remove('active')
        
        wheelPrizeList[resultNum-1].classList.add('active')
        
        console.log("Trung so :",resultNum);

    },(400*5)+resultNum*50)
}

button.onclick = () => {
    handleSpinning()
}