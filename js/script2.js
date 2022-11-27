var stage = document.getElementById("stage");
    var ctx = stage.getContext("2d");

    var bird = new Image();
    var bg = new Image();
    var fg = new Image();
    var pipeNorth = new Image();
    var pipeSouth = new Image();

    bird.src = "img/bird.png";
    bg.src = "img/bg.png";
    
    pipeNorth.src = "img/pipeNorth.png";
    pipeSouth.src = "img/pipeSouth.png";

    var continua = true;
    var gap = 120;
    var constant;
    var bX = 10;
    var bY = 150;
    var gravity = 2.0;
    var gravity_backup = gravity;
    var score = 0;

    var fly = new Audio();
    var scor = new Audio();
    fly.src = "som/fly.mp3";
    scor.src = "som/score.mp3";

    document.addEventListener("keydown", moveUp);;
    document.addEventListener("click", moveUp);
    document.getElementById("btn_again").addEventListener("click", play_again);

    function moveUp() {

        if (!continua) {
            return false;
        }

        gravity = -6.0;
        fly.play();

        setTimeout(function () {
            gravity = gravity_backup;
        }, 80);

    }

    function game_over() {
        continua = false;
        document.getElementById("pontos_detail").innerText = score;
        document.getElementById("game_over").style = "display:inline";
        gravity = 0;
    }

    function play_again() {
        continua = true;
        score = 0;
        gravity = gravity_backup;
        bY = 150;
        document.getElementById("pontos_detail").innerText = score;
        document.getElementById("game_over").style = "display:none";

        pipe = [];
        pipe[0] = {
            x: stage.width,
            y: 0
        }

    }

    var pipe = [];
    
    pipe[0] = {
        x: stage.width,
        y: 0
    }

    function draw() {
        ctx.drawImage(bg, 0, 0);
        for (var i = 0; i < pipe.length; i++) {
            constant = pipeNorth.height + gap;
            ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
            ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
            

            if (continua) {
                pipe[i].x--;
            }

            if (pipe[i].x == 115) {
                pipe.push({
                    x: stage.width,
                    y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
                })
            }

            if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width
                && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant)
                || bY + bird.height >= stage.height) {
                game_over();
            }

            if (pipe[i].x == 5) {
                score++;
                scor.play();
            }



        }


        ctx.drawImage(fg, 0, stage.height - fg.height);
        var bd = ctx.drawImage(bird, bX, bY);

        bY += gravity;

        var width_canvas = (stage.width / 2) - 10;
        ctx.fillStyle = "#FFF";
        ctx.strokeStyle = "#000";
        ctx.font = "70px Flappy";
        ctx.fillText(score, width_canvas, 80);
        ctx.strokeText(score, width_canvas, 80);

        requestAnimationFrame(draw);
    }

    window.onload = function () {
        draw();
    }

    console.log(pipe.push)