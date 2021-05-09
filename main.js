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

//variabili
const arr = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 
    110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 225, 250, 275, 300, 325, 350, 375, 400];

let partitaIniziata = false;
let lunghezzaArray = simboli.length;
let tentativiRitiro = 0;
let sconfitteConsecutive = 0;

let n_tentativi = 0;
let n_punti = 0;

const DELAY = 5500;

//elementi DOM
let bottone = document.querySelector('button');
let simboliId = document.getElementById("simboliId");
let simbolo1 = document.getElementById("simbolo1");
let simbolo2 = document.getElementById("simbolo2");
let simbolo3 = document.getElementById("simbolo3");

let punti = document.getElementById("punti");
let tentativi = document.getElementById("tentativi");
let rapporto = document.getElementById("rapporto");
let ritiri = document.getElementById("ritiri");

//Partenza slot
bottone.addEventListener("click", function(){

    if(!partitaIniziata){
        partitaIniziata=true;
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
            partitaIniziata=false;
        }, DELAY);
    }
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

//Animazione e generazione casuale di un simbolo
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

//se nelle ultime 10 partite non si hanno avuto vittorie 
//viene generata una vittoria
function vittoriaAssicurata(){
    let nVincente = getRandom(0, lunghezzaArray);

    parteSimbolo(1);
    simbolo1.src = simboli[nVincente];

    setTimeout(function(){ 
        parteSimbolo(2);
        simbolo2.src = simboli[nVincente]; 
    }, 500);

    setTimeout(function(){ 
        parteSimbolo(3);
        simbolo3.src = simboli[nVincente];
    }, 1000);
}

function getRandom(min, max) { 
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

//ritira il simbolo cliccato
simboliId.addEventListener("click", function(){ 
    if(!partitaIniziata){
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

            tentativiRitiro++;
            ritiri.innerHTML = 2 - tentativiRitiro;

            setTimeout( () => {
                if(verificaVittoria()){
                    aumentaPunteggio();
                    sconfitteConsecutive = 0;
                    tentativiRitiro = 2
                }
        
                mostraRapporto();
                ritiri.innerHTML = 2 - tentativiRitiro;
            }, DELAY);

            
        }
    }
});  
