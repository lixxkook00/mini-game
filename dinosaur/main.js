const query = document.querySelector.bind(document)
const queryAll = document.querySelectorAll.bind(document)

// BGs
const background = query('.background')
const landscape = query('.landscape')
const rocks = query('.rocks')
const ground = query('.ground')

const bigRockContainer = query('.crash-anim')

const dino = query('.dino')

const result = query('.result')

const BG_LIST = [background, landscape, rocks, ground]


// UTILS
const hidden = (element) => {
    element.style.opacity = 0
}

const show = (element) => {
    element.style.opacity = 1
}

const animated = (element) => {
    element.classList.add('animated')
}

const clearAnimated = (element) => {
    element.classList.remove('animated')
}

const fakeLoading = (loadingFilled, loadingText, callback = null) => {
  let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
            clearInterval(interval);
            progress = 100
            

            reStartDemo()
        }

        loadingFilled.style.width = `${progress}%`;
        loadingText.innerText = `${progress.toFixed(0)}%`
    }, 500);
}

// HANDLER
const handleBackGround = (action) => {
    BG_LIST.forEach(element => {
        switch(action) {

            case 'STOP':
                element.classList.remove('animated')
                hidden(dino)
                break;

            case "RUN":
                element.classList.add('animated')
                show(dino)
                break;

            default:
                // code block
        }
    });
}

// GAME CIRCLE
const startGame = () => {
    bigRockContainer.classList.remove('animated')
    handleBackGround('RUN')
}

const endGame = () => {
    bigRockContainer.classList.add('animated')
    handleBackGround('STOP')

    bigRockContainer.addEventListener("animationend", () => {
        // show result
        result.innerText = `${score.final}x`
        animated(result)

        // reloading screen
        result.addEventListener("animationend", () => {
            setTimeout(() => {
                clearAnimated(result)
                waitingBet()
                fakeLoading(
                    query('.bet-loader .loader-line .filled'),
                    query('.bet-loader .percent'),
                    // reStartDemo
                )
            }, 2000)
        })


    });
}

const waitingBet = () => {
    bigRockContainer.classList.remove('animated')
    query('.bet-loader').classList.add('visible')
}


// DEMO
let score = {
    final : 0,
    current : 0
};
let intervalRate = null

const updateCurrentRateBet = (value) => {
    const rate = query('.current-num')
    rate.innerText = `${parseFloat(value.toFixed(2))} x`
}

const handleBet = (rateUp) => {
    score.current = score.current + parseFloat(rateUp)

    if(score.final > score.current){
        updateCurrentRateBet(score.current)
    }else{
        clearInterval(intervalRate)
        endGame()
    }
}

// RUN DEMO
const reStartDemo = () => {
    score = {
        final : 0,
        current : 0
    }
    clearInterval(intervalRate)

    query('.current-num').innerText = `0x`
    query('.bet-loader .loader-line .filled').style.width = `${0}%`;
    query('.bet-loader .percent').innerText = `${0}%`

    query('.bet-loader').classList.remove('visible')
    startGame()
    demo()
}

const demo = () => {
    score.final = (Math.random() * (5.00 - 1.00) + 1.00).toFixed(2),
    intervalRate = setInterval(() => {
        handleBet(
            Math.random().toFixed(2)
        )
    }, 1000)
}
demo()


// setTimeout(() => {
//     endGame()

//     setTimeout(() => {
//         restartGame()
//     }, 1000)
// }, 3000)