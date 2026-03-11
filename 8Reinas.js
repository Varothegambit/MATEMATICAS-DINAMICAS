let canvas = document.getElementById("tablero");
let ctx = canvas.getContext("2d");

let size = 60;
let reinas = [];

dibujarTablero();

canvas.addEventListener("click", function(e){

let rect = canvas.getBoundingClientRect();

let x = Math.floor((e.clientX - rect.left) / size);
let y = Math.floor((e.clientY - rect.top) / size);

if(reinas.length < 8 && !ComprobarReinas(x,y)){
reinas.push({x:x,y:y});
}

dibujarTablero();
dibujarReinas();
CasillasAmenazadas();

if(reinas.length === 8 && !ComprobarCasillas()){
document.getElementById("mensaje").innerHTML = "¡Ganaste!";
}

});


//Creamos la función que dibuja el tablero el blanco y negro
function dibujarTablero(){

for(let i=0;i<8;i++){
for(let j=0;j<8;j++){

if((i+j)%2==0){
ctx.fillStyle="white";
}else{
ctx.fillStyle="gray";
}

ctx.fillRect(i*size,j*size,size,size);

}
}

}

//Función para pintar las reinas sobre el tablero
function dibujarReinas(){

ctx.fillStyle="black";

for(let r of reinas){

ctx.beginPath();
ctx.arc(r.x*size+30,r.y*size+30,15,0,2*Math.PI);
ctx.fill();

}

}

//Creamos una función que pinte de rojo las casillas amenazadas por la dama colocada
function CasillasAmenazadas(){

ctx.fillStyle="rgba(100,0,0,0.4)";

for(let r of reinas){

for(let i=0;i<8;i++){

ctx.fillRect(r.x*size,i*size,size,size);
ctx.fillRect(i*size,r.y*size,size,size);

}

for(let i=-8;i<8;i++){

let x=r.x+i;
let y=r.y+i;

if(x>=0 && x<8 && y>=0 && y<8){
ctx.fillRect(x*size,y*size,size,size);
}

x=r.x+i;
y=r.y-i;

if(x>=0 && x<8 && y>=0 && y<8){
ctx.fillRect(x*size,y*size,size,size);
}

}

}

}


//Creamos funcion de comprobación si una reina colocada amenaza a una reina ya colocada
function ComprobarCasillas(){

for(let i=0;i<reinas.length;i++){
for(let j=i+1;j<reinas.length;j++){

let a=reinas[i];
let b=reinas[j];

if(a.x==b.x || a.y==b.y ||
Math.abs(a.x-b.x)==Math.abs(a.y-b.y)){
return true;
}

}
}

return false;

}

//Función que comprueba si ya hay una reina en esa casilla
function ComprobarReinas(x,y){

for(let r of reinas){
if(r.x==x && r.y==y){
return true;
}
}

return false;

}

//Función para reiniciar el tablero
function ReiniciarTablero(){

reinas=[];

ctx.clearRect(0,0,480,480);

dibujarTablero();

document.getElementById("mensaje").innerHTML="";

}