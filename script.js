let GameBoard = [1,1,1,1,1,1,1,1]
let Coins =[1,1,2,2,3,3,4,4]
const $ = e => document.querySelector(e)
const ce = e => document.createElement(e)
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  

function RestartGame(){
    DoneforeButtons.forEach(element => {
        element.classList.remove("invisible")
    })
    DoneforeButtons = []
    let CoinPool = [...Coins]
    let Mix = []
    for (let i = 1; i < 9; i++) { 
        Random = getRandomInt(CoinPool.length)
        Mix.push(CoinPool[Random])
        CoinPool.splice(Random,1)
    }
    for (let i = 0; i < 8; i++) { 
        GameBoard[i] = Mix[i]
        Img = $("#img"+(i+1))
        Img.src = "M"+(GameBoard[i])+".jpg"
    };
}
let NumberOfReviled = 0
let ReviledButtons = []
let ReviledButtonsNumber = []
let DoneforeButtons = []
let Intermission = false
function Revil(number){
    if(Intermission==false){
        Button = $("#but"+number)
        ReviledButtons.push(Button)
        ReviledButtonsNumber.push(number-1)
        Button.classList.add("invisible")
        NumberOfReviled += 1
        if(NumberOfReviled == 2){
            if(GameBoard[ReviledButtonsNumber[0]] != GameBoard[ReviledButtonsNumber[1]]){
                Intermission = true
                NumberOfReviled = 0
                sleep(1000).then(() => {
                    ReviledButtons.forEach(element => {
                        element.classList.remove("invisible")
                    });
                    ReviledButtons = []
                    ReviledButtonsNumber = []
                    Intermission = false
                })
            }
            else{
                DoneforeButtons.push(ReviledButtons[0])
                DoneforeButtons.push(ReviledButtons[1])
                NumberOfReviled = 0
                ReviledButtons = []
                ReviledButtonsNumber = []
                if(DoneforeButtons.length == 8){
                    let H1 = ce("h1")
                    H1.innerText = "Gratulacje wygrałeś"
                    let Reset = ce("Button")
                    let ButtonBox = ce("div")
                    Reset.innerText = "Reset"
                    Reset.style.width = "20vw"
                    Reset.style.height = "10vh"
                    ButtonBox.style.width = "60vw"
                    ButtonBox.style.height = "10vh"
                    ButtonBox.classList.add("d-flex") 
                    ButtonBox.classList.add("justify-content-center")
                    Reset.onclick = () => {
                        H1.remove()
                        ButtonBox.remove()
                        RestartGame()
                    }
                    let Box = $("#minigamebox")
                    Box.appendChild(H1)
                    ButtonBox.appendChild(Reset)
                    Box.appendChild(ButtonBox)
                }
            }
        }
    }
}
RestartGame()