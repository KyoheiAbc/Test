
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let Objects = [];

function isColliding(o) {
    for (const obj of Objects) {
        if (obj !== o) {
            if (
                o.x < obj.x + 32 &&
                o.x + 32 > obj.x &&
                o.y < obj.y + 32 &&
                o.y + 32 > obj.y
            ) {
                return true;
            }
        }
    }
    return false;
}

class Object {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        while (true) {
            if (!isColliding(this)) {
                break;
            }
            else {
                this.x = Math.random() * (canvas.width - 32);
                this.y = Math.random() * (canvas.height - 32);
            }
        }

        this.moveX = Math.random() * 2 - 1;
        this.moveY = Math.random() * 2 - 1;
        this.color = Math.random();


    }
    update() {
        this.x += 4 * this.moveX;
        this.y += 4 * this.moveY;

        if (this.x < 0 || this.x > canvas.width - 32) {
            this.moveX *= -1;
            this.x = Math.max(0, Math.min(canvas.width - 32, this.x));
        }
        if (this.y < 0 || this.y > canvas.height - 32) {
            this.moveY *= -1;
            this.y = Math.max(0, Math.min(canvas.height - 32, this.y));
        }
        if (isColliding(this)) {
            this.moveX *= -1;
            this.moveY *= -1;
            this.color = Math.random();
        }
    }
}

let FPS = 60;
let pause = false;




addEventListener("mousedown", (e) => {
    Objects.push(new Object(e.clientX, e.clientY));
    console.log(`Object created at (${e.clientX}, ${e.clientY})`);
}
);
addEventListener("keydown", (e) => {
    if (e.key === "p") {
        pause = !pause;
        console.log(`Game ${pause ? "paused" : "resumed"}`);
    }
    if (e.key === "ArrowUp") {
        FPS += 10;
    } else if (e.key === "ArrowDown") {
        FPS = Math.max(1, FPS - 10);
    }
});



function gameLoop() {
    if (pause) {
        setTimeout(gameLoop, 1000 / FPS);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);


    for (const obj of Objects) {
        obj.update();

        ctx.fillStyle = `hsl(${obj.color * 360}, 50%, 50%)`;

        ctx.fillRect(obj.x, obj.y, 32, 32);



    }



    const now = performance.now();
    if (!this.lastTime) this.lastTime = now;
    const fps = 1000 / (now - this.lastTime);
    this.lastTime = now;
    if (!this.lastLogTime || now - this.lastLogTime >= 1000) {
        console.log(`FPS: ${fps.toFixed(2)}`);
        console.log(`Objects: ${Objects.length}`);
        this.lastLogTime = now;
    }

    requestAnimationFrame(gameLoop);


}

gameLoop();