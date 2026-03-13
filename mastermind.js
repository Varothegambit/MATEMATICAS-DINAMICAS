let canvas = document.getElementById("tablero");
let ctx = canvas.getContext("2d");

let colores = [
"red",
"yellow",
"orange",
"blue",
"green",
"purple"
];

let secreto = [];

// generar combinación secreta
for(let i=0;i<5;i++){
let r = Math.floor(Math.random()*colores.length);
secreto.push(r);
}

let tablero = [];

// -1 significa círculo vacío
for(let i=0;i<12;i++){
tablero.push([-1,-1,-1,-1,-1]);
}

let resultados = [];

for(let i=0;i<12;i++){
resultados.push([0,0,0,0,0]);
}

let filaActual = 0;

dibujar();

canvas.addEventListener("click",function(e){

let rect = canvas.getBoundingClientRect();

let x = e.clientX - rect.left;
let y = e.clientY - rect.top;

let fila = Math.floor(y/40);
let col = Math.floor((x-20)/40);

if(fila === filaActual && col>=0 && col<5){

tablero[fila][col]++;

if(tablero[fila][col] >= colores.length){
tablero[fila][col] = -1;
}

dibujar();

}

});


function dibujar(){

ctx.clearRect(0,0,canvas.width,canvas.height);

// dibujar fichas del jugador
for(let i=0;i<12;i++){

for(let j=0;j<5;j++){

ctx.beginPath();
ctx.arc(40 + j*40 , 40 + i*40 , 15 , 0 , 2*Math.PI);

if(tablero[i][j] === -1){
ctx.fillStyle = "white";
}
else{
ctx.fillStyle = colores[tablero[i][j]];
}

ctx.fill();
ctx.stroke();

}

}

// dibujar resultados
for(let i=0;i<12;i++){

for(let j=0;j<5;j++){

ctx.beginPath();

ctx.arc(300 + j*20 , 40 + i*40 , 7 , 0 , 2*Math.PI);

if(resultados[i][j] === 2){
ctx.fillStyle = "black";
}

else if(resultados[i][j] === 1){
ctx.fillStyle = "white";
}

else{
ctx.fillStyle = "lightgray";
}

ctx.fill();
ctx.stroke();

}

}

}


function comprobar(){

let intento = tablero[filaActual];

let negro = 0;
let blanco = 0;

let usadoSecreto = [false,false,false,false,false];
let usadoIntento = [false,false,false,false,false];

// comprobar negros
for(let i=0;i<5;i++){

if(intento[i] === secreto[i]){

negro++;
usadoSecreto[i] = true;
usadoIntento[i] = true;

}

}

// comprobar blancos
for(let i=0;i<5;i++){

if(usadoIntento[i]) continue;

for(let j=0;j<5;j++){

if(!usadoSecreto[j] && intento[i] === secreto[j]){

blanco++;
usadoSecreto[j] = true;
break;

}

}

}

// guardar resultados
for(let i=0;i<negro;i++){
resultados[filaActual][i] = 2;
}

for(let i=negro;i<negro+blanco;i++){
resultados[filaActual][i] = 1;
}

dibujar();

if(negro === 5){
alert("¡Has ganado!");
}

filaActual++;

if(filaActual === 12){
alert("Se acabaron los intentos");
}

}