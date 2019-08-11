let field = document.createElement('div');

for(let i = 0; i < 2500; i++){
    let cell = document.createElement('div');
    field.appendChild(cell);
    cell.classList.add('cell');
}

document.body.appendChild(field);
field.classList.add('field');

let cell = document.getElementsByClassName('cell');

let x = 1;
    y = 1;

for(let i = 0; i < 2500; i++){
    if(x == 51){
        x = 1;
        y++;
    }
    cell[i].setAttribute('posX',x);
    cell[i].setAttribute('posY',y);

    x++;
}

function createSnake(){
    let posX = Math.round(Math.random()*46 + 4);
    let posY = Math.round(Math.random()*50);
    return [posX, posY];
}

let snakeCoordinates = createSnake();
let snake = [document.querySelector("[  posx = '" + snakeCoordinates[0] + "'][  posy = '" + snakeCoordinates[1] + "']"),
             document.querySelector("[  posx = '" + (snakeCoordinates[0] - 1) + "'][  posy = '" + snakeCoordinates[1] + "']"),
             document.querySelector("[  posx = '" + (snakeCoordinates[0] - 2) + "'][  posy = '" + snakeCoordinates[1] + "']"),
             document.querySelector("[  posx = '" + (snakeCoordinates[0] - 3) + "'][  posy = '" + snakeCoordinates[1] + "']")]

for(let i = 1; i < snake.length; i++){
    snake[i].classList.add('snakeCell');
}

snake[0].classList.add('snakeHead');

function createApple(){
    function generateApple(){
        let posX = Math.round(Math.random()*49 + 1);
        let posY = Math.round(Math.random()*49 + 1);
        return [posX, posY];
    }
    let appleCoordinate = generateApple();  
    let apple = document.querySelector("[  posx = '" + appleCoordinate[0] + "'][  posy = '" + appleCoordinate[1] + "']");
    apple.classList.add('apple');
    while(apple.classList.contains('snakeCell')){
        let appleCoordinate = generateApple();
        let apple = document.querySelector("[  posx = '" + appleCoordinate[0] + "'][  posy = '" + appleCoordinate[1] + "']");
        apple.classList.add('apple');        
    }
}

createApple();

let direction = 'right';
let steps = false;
let score = 0;
let scoreField = document.getElementsByClassName('score')[0];

function move(){
    let snakeHead = [snake[0].getAttribute('posX'),snake[0].getAttribute('posY')];
    snake[0].classList.remove('snakeHead');
    snake[snake.length - 1].classList.remove('snakeCell');
    snake.pop();
    if(direction == 'right'){
        if(snakeHead[0] < 50){
            snake.unshift(document.querySelector("[  posx = '" + (+snakeHead[0] + 1) + "'][  posy = '" + snakeHead[1] + "']"))
        }else{
            snake.unshift(document.querySelector("[  posx = '1'][  posy = '" + snakeHead[1] + "']"))
        }
    }else if(direction == 'left'){
        if(snakeHead[0] > 1){
            snake.unshift(document.querySelector("[  posx = '" + (+snakeHead[0] - 1) + "'][  posy = '" + snakeHead[1] + "']"))
        }else{
            snake.unshift(document.querySelector("[  posx = '50'][  posy = '" + snakeHead[1] + "']"))
        }
    }else if(direction == 'up'){
        if(snakeHead[1] > 1){
            snake.unshift(document.querySelector("[  posx = '" + snakeHead[0] + "'][  posy = '" + (+snakeHead[1]-1) + "']"))
        }else{
            snake.unshift(document.querySelector("[  posx = '" + snakeHead[0] + "'][  posy = '50']"))
        }
    }else if(direction == 'down'){
        if(snakeHead[1] < 50){
            snake.unshift(document.querySelector("[  posx = '" + snakeHead[0] + "'][  posy = '" + (+snakeHead[1]+1) + "']"))
        }else{
            snake.unshift(document.querySelector("[  posx = '" + snakeHead[0] + "'][  posy = '1']"))
        }
    }
    
    
    for(let i = 1; i < snake.length; i++){
        snake[i].classList.add('snakeCell');
    }
    snake[0].classList.add('snakeHead');

    let apple = document.getElementsByClassName('apple')[0];


    if(apple.getAttribute('posX') == snakeHead[0] && apple.getAttribute('posY') == snakeHead[1]){
        apple.classList.remove('apple');
        createApple();
        snake.push(snake[1]);
        snake[snake.length - 1].classList.add('snakeCell');
        score++;
        scoreField.innerHTML = '<h1>' + score + '</h1>';
    }

    if(snake[0].classList.contains('snakeCell')){
        clearInterval(interval);
        let gameOver = document.createElement('div');
        document.body.appendChild(gameOver);
        gameOver.classList.add('gameOver');
        gameOver.innerHTML = '<h1>GameOver</h1><p style ="color:green">Что бы начать заново нажмите f5</p>';
    }

    
    step = true;
}


let interval = setInterval(move, 100);


window.addEventListener('keydown',(e)=>{
    if(step){
        if(e.keyCode == 37 && direction != 'right'){
            direction = 'left';
            step = false;
        }
        if(e.keyCode == 38 && direction != 'down'){
            direction = 'up';
            step = false;
        }
        if(e.keyCode == 39 && direction != 'left'){
            direction = 'right';
            step = false;
        }
        if(e.keyCode == 40 && direction != 'up'){
            direction = 'down';
            step = false;
        }
    }
})







