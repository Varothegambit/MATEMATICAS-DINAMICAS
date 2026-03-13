
window.onload = function(){


let canvas = document.getElementById("lienzo");
let ctx = canvas.getContext("2d");

let escala = 100;   // 100 píxeles = 1 unidad
let puntos = [];

mostrarFormula();

canvas.addEventListener("click", function(e){

if(puntos.length >= 3) return;

let rect = canvas.getBoundingClientRect();

// convertir clic a unidades matemáticas
let x = (e.clientX - rect.left)/escala;
let y = (e.clientY - rect.top)/escala;

puntos.push({x:x,y:y});

dibujar();
actualizarFormula();

});


function dibujar(){

ctx.clearRect(0,0,canvas.width,canvas.height);

// dibujar puntos
for(let p of puntos){

ctx.beginPath();
ctx.arc(p.x*escala,p.y*escala,5,0,2*Math.PI);
ctx.fillStyle="black";
ctx.fill();

}

// dibujar lados
if(puntos.length >= 2){

ctx.beginPath();
ctx.moveTo(puntos[0].x*escala,puntos[0].y*escala);

for(let p of puntos){
ctx.lineTo(p.x*escala,p.y*escala);
}

ctx.stroke();

}

if(puntos.length === 3){

ctx.closePath();
ctx.stroke();

}

}


// distancia entre puntos (ya en unidades matemáticas)
function distancia(p1,p2){

return Math.sqrt(
Math.pow(p1.x-p2.x,2) +
Math.pow(p1.y-p2.y,2)
);

}


// mostrar fórmula inicial
function mostrarFormula(){

let texto="$$c^2 = a^2 + b^2 - 2ab\\cos(\\gamma)$$";

document.getElementById("mensaje").innerHTML = texto;

MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

}


// actualizar fórmula al hacer clic
function actualizarFormula(){

let texto="$$c^2 = a^2 + b^2 - 2ab\\cos(\\gamma)$$";

if(puntos.length >= 1){

let a = puntos[0].x.toFixed(2);

texto += "$$c^2 = ("+a+")^2 + b^2 - 2("+a+")b\\cos(\\gamma)$$";

}

if(puntos.length >= 2){

let a = puntos[0].x.toFixed(2);
let b = puntos[1].x.toFixed(2);

texto += "$$c^2 = ("+a+")^2 + ("+b+")^2 - 2("+a+")("+b+")\\cos(\\gamma)$$";

}

if(puntos.length === 3){

let A = puntos[0];
let B = puntos[1];
let C = puntos[2];

let a = distancia(B,C);
let b = distancia(A,C);
let c = distancia(A,B);

let cosGamma = (a*a + b*b - c*c)/(2*a*b);

let gamma = Math.acos(cosGamma)*180/Math.PI;

texto += "$$("+
c.toFixed(2)+")^2 = ("+
a.toFixed(2)+")^2 + ("+
b.toFixed(2)+")^2 - 2("+
a.toFixed(2)+")("+
b.toFixed(2)+")\\cos("+gamma.toFixed(2)+"^\\circ)$$";

let izquierda = c*c;
let derecha = a*a + b*b - 2*a*b*Math.cos(gamma*Math.PI/180);

texto += "$$"+
izquierda.toFixed(2)+" = "+derecha.toFixed(2)+"$$";

}

document.getElementById("mensaje").innerHTML = texto;

MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

}


// borrar lienzo
function borrar(){

puntos = [];

ctx.clearRect(0,0,canvas.width,canvas.height);

mostrarFormula();

}
}