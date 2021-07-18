import {
    Ball
} from './ball.js';

import {
    Block
} from './block.js';

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        document.body.appendChild(this.canvas);

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();


        this.ball = new Ball(this.stageWidth, this.stageHeight, 60, 15);
        this.block = new Block(700, 30, 300, 450);


        window.requestAnimationFrame(this.animate.bind(this));

    }

    // 현재 내가 만들고자 하는 애니메이션의 크기를 아는 것이 중요.
    // resize 이벤트를 걸어주고 스크린 사이즈를 가지고 와서 애니메이션을 정의
    // 브라우저는 가변적이므로 이렇게 스크린 사이즈를 먼저 가져오는 것이 좋다
    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth *2;
        this.canvas.height = this.stageHeight *2;
        this.ctx.scale(2,2);
    }

    // 애니메이션을 실제로 구동시키는 함수
    // 애니메이션 이라는 건 계속 뭔가를 생성하는 것. 생성하기 전에 이전 프레임을 지워줘야 한다.
    animate(t) {
        window.requestAnimationFrame(this.animate.bind(this));

        //이전 프레임을 지워준다.
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.block.draw(this.ctx);
        this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.block);
    }
}

window.onload = () => {
    new App();
};