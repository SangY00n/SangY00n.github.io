import BLOCKS from "./blocks.js"

// DOM
const playground = document.querySelector(".playground > ul");
const gameText = document.querySelector(".game-text");
const scoreDisplay = document.querySelector(".score");
const restartButton = document.querySelector(".game-text > button");

// Setting
const GAME_ROWS = 20;
const GAME_COLS = 10;
// console.log(playground);

// variables
let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;



const movingItem = {
    type: "",
    direction: 0, // 블럭을 돌리는 것의 기준
    top: 0, // 좌표 기준으로 어디까지 내려와 있는지
    left: 0, // 좌표에서 좌우 값을 알려주는 역할
};


init();

//functions
function init(){

    
    tempMovingItem = { ...movingItem}; // 스프레딩 오퍼레이터 ...  => 값을 복사를 한다.
    for(let i=0;i<GAME_ROWS;i++) {
        prependNewLine();
    }
    generateNewBlock();
    
}

function prependNewLine(){ // prepend == 앞에 붙이다
        const li = document.createElement("li");
        const ul = document.createElement("ul");
        for(let j=0;j<GAME_COLS;j++) {
            const matrix = document.createElement("li");
            ul.prepend(matrix);
        }
        li.prepend(ul);
        playground.prepend(li);
}

function renderBlocks(moveType = "") {
    const { type, direction, top, left } = tempMovingItem;
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving=> {
        moving.classList.remove(type, "moving");
    })
    BLOCKS[type][direction].some(block => { // forEach와 달리 some은 return 을 만나면 반복이 종료됨.
        const x = block[0] + left;
        const y = block[1] + top;
        
        // 삼항 연산자 사용하여 y가 없으면 null을 넣는다. (블럭이 맨 아래로 내려갔을 때 오류 발생 방지)
        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;

        const isAvailable = checkEmpty(target);

        // console.log(isAvailable);

        if (isAvailable) {
            target.classList.add(type, "moving");
        } else {
            tempMovingItem = { ...movingItem }; // tempMovingItem의 값을 값을 변경하지 않았던 movingItem의 값으로 원상복구
            if(moveType==='retry'){
                clearInterval(downInterval);
                showGameoverText();
            }
            setTimeout(() => {
                renderBlocks('retry'); // 재귀 함수 호출. setTimeout 을 이용하여 스택이 무한정으로 불러지는 현상을 방지. 
                if(moveType === "top") { // moveType이 top이면 즉, 아래로 내리려는 중인 경우
                    seizeBlock();
                }
            }, 0)
            // renderBlocks();
            return true;
        }
    })
    // 위의 내용이 모두 실행이 정상적으로 작동되면 그제서야 movingItem을 업데이트 시켜준다.
    // 위의 내용이 정상적으로 작동되지 않으면 즉, 잘못된 부분으로 블럭을 이동하려는 것이라면 renderBlocks를 다시 호출하고 기존의 renderBlocks는 return true를 만나 종료된다.
    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction = direction;
}
function seizeBlock() { // seize == 붙잡다, 잡다
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving => {
        moving.classList.remove("moving"); // 현재 블럭의 moving 클래스를 삭제
        moving.classList.add("seized"); // 현재 블럭에 seized 클래스를 추가
    })
    checkMatch();
    // generateNewBlock(); // => checkMatch() 함수를 만들어 그 안에 마지막에 넣는다.
}

function checkMatch() {


    const childNodes = playground.childNodes;
    childNodes.forEach(child=>{
        let matched = true;
        child.children[0].childNodes.forEach(li=>{
            if(!li.classList.contains("seized")){
                matched=false;
            }
        })
        if(matched){
            child.remove();
            prependNewLine();
            score++;
            scoreDisplay.innerText = score;
        }
    })

    generateNewBlock();
}
function generateNewBlock(){

    clearInterval(downInterval);
    downInterval = setInterval(()=>{
        moveBlock('top', 1);
    },duration);

    const blockArray = Object.entries(BLOCKS);
    const randomIndex = Math.floor(Math.random() * blockArray.length);
    

    movingItem.type = blockArray[randomIndex][0];
    movingItem.top=0;
    movingItem.left=3; // 중앙에서 generate
    movingItem.direction=0;
    tempMovingItem={ ...movingItem };
    renderBlocks(); 
}
function checkEmpty(target){
    if(!target || target.classList.contains("seized")){
        return false;
    }
    return true;
}

function moveBlock(moveType, amount) {
    tempMovingItem[moveType] += amount; // moveType은 "left" 또는 "top"
    renderBlocks(moveType);
}

function changeDirection(){
    const direction = tempMovingItem.direction;
    direction === 3 ? tempMovingItem.direction = 0 : tempMovingItem.direction+=1;
    renderBlocks();
}
function dropBlock(){
    clearInterval(downInterval);
    downInterval = setInterval(()=>{
        moveBlock("top",1);
    }, 10)
}
function showGameoverText() {
    gameText.style.display = "flex"; /// flex / none
}

// event handling
document.addEventListener("keydown", e => {
    switch(e.keyCode){
        case 39:
            moveBlock("left", 1);
            break;
        case 37:
            moveBlock("left", -1);
            break;
        case 40:
            moveBlock("top", 1);
            break;
        case 38:
            changeDirection();
            break;
        case 32:
            dropBlock();
            break;
        default:
            break;
    }
    // console.log(e);
})

restartButton.addEventListener("click",()=>{
    playground.innerHTML = "";

    gameText.style.display = "none";

    score = 0;
    scoreDisplay.innerText = score;

    init();
})