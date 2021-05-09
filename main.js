//Asset
let simboli = [
    'immagini/cocco.png',
    'immagini/fragola.png',
    'immagini/limone.png',
    'immagini/avocado.png',
    'immagini/anguria.png',
    'immagini/mela.png',
    'immagini/arancia.png',
    'immagini/kiwi.png',
    'immagini/melone.png'
];
/*immagini da pixabay.com, licenza cc0*/

const arr = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 
    110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 225, 250, 275, 300, 325, 350, 375, 400];

var lunghezzaArray = simboli.length;
var tentativiRitiro = 0;
var sconfitteConsecutive = 0;

var bottone = document.querySelector('button');
//var bottone = document.getElementById("button");
var simboliId = document.getElementById("simboliId");
var simbolo1 = document.getElementById("simbolo1");
var simbolo2 = document.getElementById("simbolo2");
var simbolo3 = document.getElementById("simbolo3");

var punti = document.getElementById("punti");
var tentativi = document.getElementById("tentativi");
var rapporto = document.getElementById("rapporto");
var ritiri = document.getElementById("ritiri");

var n_tentativi = 0;
var n_punti = 0;

const DELAY = 5500;

bottone.addEventListener("click", function(){ //parte la slot

    ritiri.innerHTML = 2;
    tentativiRitiro = 0;

    if(sconfitteConsecutive < 10){

        parteSimbolo(1);

        setTimeout(function(){ parteSimbolo(2) }, 500);

        setTimeout(function(){ parteSimbolo(3) }, 1000);

    } else {
        vittoriaAssicurata();
    }

    setTimeout(function(){

        aumentaTentativi();

        if(verificaVittoria()){
            aumentaPunteggio();
            sconfitteConsecutive = 0;
            tentativiRitiro = 2;
            ritiri.innerHTML = 2 - tentativiRitiro;
        } else {
            sconfitteConsecutive++;
        }

        mostraRapporto();
    }, DELAY);

});

function aumentaTentativi(){
    n_tentativi++;
    tentativi.innerHTML = n_tentativi;
}

function aumentaPunteggio(){
    n_punti++;
    punti.innerHTML = n_punti;
}

function mostraRapporto(){
    rapporto.innerHTML = n_punti/n_tentativi;
}

function verificaVittoria(){
    return simbolo1.src == simbolo2.src && simbolo2.src == simbolo3.src;
}

function parteSimbolo(s) {
    let n = getRandom(0, lunghezzaArray);
    if(s==1) { 
        for(let a of arr){
            setTimeout( () => {
                n = getRandom(0, lunghezzaArray);
                simbolo1.src = simboli[n]; 
            }, a*10);
        } 
    }
    if(s==2) { 
        for(let a of arr){
            setTimeout( () => {
                n = getRandom(0, lunghezzaArray);
                simbolo2.src = simboli[n]; 
            }, a*10);
        }
     }
    if(s==3) { 
        for(let a of arr){
            setTimeout( () => {
                n = getRandom(0, lunghezzaArray);
                simbolo3.src = simboli[n]; 
            }, a*10);
        }
     }
}

function vittoriaAssicurata(){
    let n = getRandom(0, lunghezzaArray);
    simbolo1.src = simboli[n];
    setTimeout(function(){ simbolo2.src = simboli[n]; }, 1000);
    setTimeout(function(){ simbolo3.src = simboli[n]; }, 2000);
}

function getRandom(min, max) { //genera numero casuale
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Il max è escluso e il min è incluso
  }

simboliId.addEventListener("click", function(){ //ritira il simbolo cliccato
    if(!verificaVittoria() && tentativiRitiro < 2){
        if(event.target.id == 'simbolo1') {
            parteSimbolo(1);
        }
        if(event.target.id == 'simbolo2') {
            parteSimbolo(2);
        }
        if(event.target.id == 'simbolo3') {
            parteSimbolo(3);
        }

        //
        setTimeout( () => {
            if(verificaVittoria()){
                aumentaPunteggio();
            }
    
            mostraRapporto();
            tentativiRitiro++;
            if(verificaVittoria()){tentativiRitiro = 2}
            ritiri.innerHTML = 2 - tentativiRitiro;
        }, DELAY);

        
    }
});  
