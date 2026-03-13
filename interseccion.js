window.onload = function(){

let canvas = document.getElementById("lienzo");
let ctx = canvas.getContext("2d");

let puntos = [];
let rectas = [];

canvas.addEventListener("click", function(e){

let rect = canvas.getBoundingClientRect();

let x = e.clientX - rect.left;
let y = e.clientY - rect.top;

// guardar punto
puntos.push({x:x,y:y});

// cuando hay dos puntos se crea una recta
if(puntos.length === 2){

rectas.push({
p1:puntos[0],
p2:puntos[1]
});

puntos = [];

}

dibujarTodo();

});


function dibujarTodo(){

ctx.clearRect(0,0,canvas.width,canvas.height);

// dibujar puntos actuales
for(let p of puntos){

ctx.beginPath();
ctx.arc(p.x,p.y,4,0,2*Math.PI);
ctx.fillStyle="black";
ctx.fill();

}

// dibujar rectas
for(let r of rectas){
dibujarRecta(r.p1,r.p2);
}

// dibujar intersecciones
for(let i=0;i<rectas.length;i++){
for(let j=i+1;j<rectas.length;j++){

let p = interseccion(rectas[i],rectas[j]);

if(p){

ctx.beginPath();
ctx.arc(p.x,p.y,6,0,2*Math.PI);
ctx.fillStyle="red";
ctx.fill();

}

}
}

}


function dibujarRecta(p1,p2){

let width = canvas.width;
let height = canvas.height;

// recta vertical
if(p1.x === p2.x){

ctx.beginPath();
ctx.moveTo(p1.x,0);
ctx.lineTo(p1.x,height);
ctx.strokeStyle="yellow";
ctx.lineWidth=2;
ctx.stroke();

return;
}

// pendiente
let m = (p2.y - p1.y)/(p2.x - p1.x);

// ordenada en origen
let b = p1.y - m*p1.x;

// intersección con bordes
let y0 = b;
let yw = m*width + b;

ctx.beginPath();
ctx.moveTo(0,y0);
ctx.lineTo(width,yw);
ctx.strokeStyle="yellow";
ctx.lineWidth=2;
ctx.stroke();

}


function interseccion(r1,r2){

let x1=r1.p1.x;
let y1=r1.p1.y;

let x2=r1.p2.x;
let y2=r1.p2.y;

let x3=r2.p1.x;
let y3=r2.p1.y;

let x4=r2.p2.x;
let y4=r2.p2.y;

let den = (x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);

if(den === 0){
return null;
}

let px =
((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4))/den;

let py =
((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4))/den;

return {x:px,y:py};

}


function borrar(){

rectas = [];
puntos = [];

ctx.clearRect(0,0,canvas.width,canvas.height);

}
}