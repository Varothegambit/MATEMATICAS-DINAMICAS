//Definimos la función cambio de signo, recibira como parámetros la función f y los extremos del intervalo inicial a y b
function CS(f,a,b){
	//Si hay cambio de signo devuelve 1 
	if (f(a)*f(b)<0) return 1;
	//En caso contrario devuelve 0
	else return 0;
}


//Definimos la funcion Biseccion con los parámetros de entradas pedidos por el ejercicio (función f, extremos del intervalo y número de iteraciones)
function Biseccion(f, a, b, n) {
//Declaramos la variable c que usaremos para acotar los intervalos recurrentes
    let c;
/*Comprobamos que podemos aplicar el método con la condición de cambio de signo(haciendo uso de la función CS)
 Si no la cumple el programa debe de devolver el valor null el cual usaremos 
en la función final CalRes(). */
    if (CS(f,a,b) == 0) {
	//El Id resultado será el valor que devuelva la función final (CalRes) y lo usaremos para mostrar por pantalla los pop-ups
    document.getElementById("resultado").innerHTML =
    "El intervalo no tiene cambio de signo";
    return null;
}

//Iniciamos el bucle en i=0 con incrementos de uno y parada cuando llegue al número de iteraciones n
    for (let i = 0; i < n; i++) {
//Asignamos a la variable c el punto medio de a y b
        c = (a + b) / 2;
//Si el producto de f(a) y f(c) es negativo, hay un cambio de signo y por tanto, nuestro intervalo pasa a ser [a,c]. Para ello hacemos la compprobación con la función CS
        if (CS(f,a,c) == 1) {
            b = c;
        } else {
//En caso contrario, nuestro intervalo pasa a ser [c,b] y volvemos a repetir el proceso hasta llegar al número de iteraciones. (Asignamos a var a el valor de c)
            a = c;
        }
    }
 //Cuando acabe el bucle devolveremos el valor de c
    return c;
}

/*Definimos  la función final Calcular Resultado (CalRes). Esta función permite al usuario introducir la función, los extremos del intervalo
 y el número de iteraciones a su gusto, además de dar el resultado si lo hubiese o mensaje de error*/ 
 
function CalRes(){
//En los siguientes código leemos los parámetros introducidos por el usuario, haciendo uso del id de cada uno asignado en el html
//En la siguiente línea lee el campu función 
let textoFuncion = document.getElementById("funcion").value;
// idem. con el extremo inferior del intervalo inicial (número real)
let a = parseFloat(document.getElementById("a").value);
// idem. con el extremo superior del intervalo inicial (número real)
let b = parseFloat(document.getElementById("b").value);
// idem. con el número de iteraciones (número natural)
let n = parseInt(document.getElementById("n").value);

//Puesto que el usuario mete la función como un texto, tenemos que pasarlo a lenguaje simbólico para trabajar posteriormente con él
let f = new Function("x", "return " + textoFuncion);

//Hacemos uso de la función Bisección, y asignamos a la variable res el valor devuelto
let res = Biseccion(f, a, b, n);

//Si el resultado es null (Línea 22) que muestre un mensaje de que no hay cambio de signo (Si el usuario mete mal el intervalo aparecerá mismo error).
if (res === null){
document.getElementById("resultado").innerHTML =
"El intervalo no tiene cambio de signo";
}
//En caso contrario tendremos resultado numérico (El método se ha podido aplicar) y lo devolveremos por pantalla
else{
document.getElementById("resultado").innerHTML =
"Raíz aproximada: " + res.toFixed(6);
}

}