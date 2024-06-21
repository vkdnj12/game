import { FRUITS } from "/suika/fruits.js"

var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    World = Matter.World,
    Body = Matter.Body;

// 엔진 선언
const engine = Engine.create();

// 렌더 선언
const render = Render.create({
    engine,
    element : document.body,
    options: {
        wireframes : false, // true면 색 적용 아됨
        background : '#F7F4C8', // 배경
        width : 620,
        height : 850,
    }
});
// 월드 선언
const world = engine.world;

// 왼쪽 벽 생성
const leftWall = Bodies.rectangle(15, 395, 30, 790, {
    isStatic : true, // 고정해주는 기능
    render : { fillStyle : '#E6B143'} // 색상 지정
})

// 오른쪽 벽 생성
const rightWall = Bodies.rectangle(605, 395, 30, 790, {
    isStatic : true, // 고정해주는 기능
    render : { fillStyle : '#E6B143'} // 색상 지정
})

// 아래쪽 벽 생성
const ground = Bodies.rectangle(310, 820, 620, 60, {
    isStatic : true, // 고정해주는 기능
    render : { fillStyle : '#E6B143'} // 색상 지정
})

// 경계선 생성
const topLine = Bodies.rectangle(310, 150, 620, 2, {
    isStatic : true, // 고정해주는 기능
    isSensor : true, // 충돌은 감지하나 물리엔진은 적용 안함
    render : { fillStyle : '#E6B143'} // 색상 지정
})

// 벽 배치
World.add(world, [leftWall, rightWall, ground, topLine]);

Render.run(render);
Runner.run(engine);

// 현재 과일 값을 저장할 변수 생성
let currentBody = null;
let currentFruit = null;
// 키 조작을 제어하는 변수 생성
let disableAction = false;

// 과일 떨어지는 함수 만들기
function addFruit(){

    // 과일 index 저장
    const index = Math.floor(Math.random() * 5);

    const fruit = FRUITS[index];

    const body = Bodies.circle(300, 50, fruit.radius, {
        index : index,
        isSleeping : true,
        render : {
            sprite : { texture : `${fruit.name}.png`},
                        // texture : fruit.name + '.png' },
        },
        restitution : 0.2,
    });

    // 현재 과일값 저장
    currentBody = body;
    currentFruit = fruit;

    World.add(world, body);
}

window.onkeydown = (event) => {

    // 제어 조작 변수가 true 경우 바로 리턴
    if (disableAction)
        return;

    switch(event.code){
        case "KeyA":
            Body.setPosition(currentBody, {
                x: currentBody.position.x - 10,
                y: currentBody.position.y
            })
            break;
        case "KeyD":
            Body.setPosition(currentBody, {
                x: currentBody.position.x + 10,
                y: currentBody.position.y
            })
            break;    
        case "KeyS":
            currentBody.isSleeping = false;

            disableAction = true;

            setTimeout(() => {
                addFruit();
                disableAction = false;
            }, 1000);
            break;    
    }
}

addFruit();