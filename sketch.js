var mainCanvasSize = 800;
var cellSize;

var chessBoard;
var imgs = {};

var value;

// debug
var mouse;
var debugPos;

// FUNCTIONS

function ask(piece, q, ...r){
    
    value = "";//reset value
    $("#dialog").dialog();
    $("#dialog").dialog( "option", "title", q);
    btns = [];
    for(let i = 0; i < r.length; i++){
        btns.push({
            text: r[i],
            click: function() {
                value = r[i];
                chessBoard.promote(piece, value);
                $(this).dialog("close");
            }
        });
    }
    $("#dialog").dialog("option", "buttons", btns); // setter
    $('#myDialog').dialog( 'option', 'position', [mainCanvasSize, mainCanvasSize] );
    $("#dialog").dialog("open");
}

function preload(){
    let types = ["W", "B"];
    let url = "https://cdn.jsdelivr.net/gh/Jkutkut/JS-Chess-Game";
    let imgDirectory = "@442c044119dd754b10617a7efd4816e5da3cd58e/res/img/";
    let piezas = [
        "bishop",
        "rook",
        "knight",
        "queen",
        "king",
        "pawn"
    ];
    let imgFormat = ".png";

    url += imgDirectory;
    for (let t = 0; t < 2; t++) { // for each type (White and black)
        let currentType = types[t];
        for (let p = 0; p < 6; p++) {
            imgs[piezas[p] + currentType] = loadImage(
                url + currentType + "-" + piezas[p] + imgFormat
            );
        }
    }
}

function setup() {
    createCanvas(mainCanvasSize, mainCanvasSize);
    cellSize = mainCanvasSize / 8;

    chessBoard = new ChessBoard(mainCanvasSize);
    noStroke();
    textSize(20);
    fill(255);

    // background(0);
    chessBoard.show();

    debugPos = chessBoard.createVector(3, 4);
}


function draw() {
    if (chessBoard.mouseHandler(mouseX, mouseY)) {
        mouse = chessBoard.mouse;
        if (mouse)
        chessBoard.showCell(debugPos);
        text("("+mouse.r+", "+mouse.c+")", debugPos.size * 4.28, debugPos.size * 3.55);
    }
}

function mouseClicked() {
    chessBoard.clickHandler();
}