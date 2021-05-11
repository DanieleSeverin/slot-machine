//Asset
let simboliDS = [
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
const arrDS = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 
    110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 225, 250, 275, 300, 325, 350, 375, 400];

let partitaIniziataDS = false;
let lunghezzaArrayDS = simboliDS.length;
let tentativiRitiroDS = 0;
let sconfitteConsecutiveDS = 0;

let n_tentativiDS = 0;
let n_puntiDS = 0;

const DELAY_DS = 5500;

//elementi DOM
let bottoneDS = document.getElementById("buttonDS");
let simboliIdDS = document.getElementById("simboliIdDS");
let simbolo1DS = document.getElementById("simbolo1DS");
let simbolo2DS = document.getElementById("simbolo2DS");
let simbolo3DS = document.getElementById("simbolo3DS");

let puntiDS = document.getElementById("puntiDS");
let tentativiDS = document.getElementById("tentativiDS");
let rapportoDS = document.getElementById("rapportoDS");
let ritiriDS = document.getElementById("ritiriDS");

//Partenza slot
bottoneDS.addEventListener("click", function(){

    if(!partitaIniziataDS){
        partitaIniziataDS=true;
        ritiriDS.innerHTML = 2;
        tentativiRitiroDS = 0;

        if(sconfitteConsecutiveDS < 10){

            parteSimboloDS(1);

            setTimeout(function(){ parteSimboloDS(2) }, 500);

            setTimeout(function(){ parteSimboloDS(3) }, 1000);

        } else {
            vittoriaAssicurataDS();
        }

        setTimeout(function(){

            aumentaTentativiDS();

            if(verificaVittoriaDS()){
                aumentaPunteggioDS();
                sconfitteConsecutiveDS = 0;
                tentativiRitiroDS = 2;
                ritiriDS.innerHTML = 2 - tentativiRitiroDS;
            } else {
                sconfitteConsecutiveDS++;
            }

            mostraRapportoDS();
            partitaIniziataDS=false;
        }, DELAY_DS);
    }
});

function aumentaTentativiDS(){
    n_tentativiDS++;
    tentativiDS.innerHTML = n_tentativiDS;
}

function aumentaPunteggioDS(){
    n_puntiDS++;
    puntiDS.innerHTML = n_puntiDS;
}

function mostraRapportoDS(){
    rapportoDS.innerHTML = n_puntiDS/n_tentativiDS;
}

function verificaVittoriaDS(){
    return simbolo1DS.src == simbolo2DS.src && simbolo2DS.src == simbolo3DS.src;
}

//Animazione e generazione casuale di un simbolo
function parteSimboloDS(sDS) {
    let nDS = getRandomDS(0, lunghezzaArrayDS);
    if(sDS==1) { 
        for(let aDS of arrDS){
            setTimeout( () => {
                nDS = getRandomDS(0, lunghezzaArrayDS);
                simbolo1DS.src = simboliDS[nDS]; 
            }, aDS*10);
        } 
    }
    if(sDS==2) { 
        for(let aDS of arrDS){
            setTimeout( () => {
                nDS = getRandomDS(0, lunghezzaArrayDS);
                simbolo2DS.src = simboliDS[nDS]; 
            }, aDS*10);
        }
     }
    if(sDS==3) { 
        for(let aDS of arrDS){
            setTimeout( () => {
                nDS = getRandomDS(0, lunghezzaArrayDS);
                simbolo3DS.src = simboliDS[nDS]; 
            }, aDS*10);
        }
     }
}

//se nelle ultime 10 partite non si hanno avuto vittorie 
//viene generata una vittoria
function vittoriaAssicurataDS(){
    let nVincenteDS = getRandomDS(0, lunghezzaArrayDS);

    parteSimboloDS(1);

    setTimeout(()=>{
        simbolo1DS.src = simboliDS[nVincenteDS];
    }, DELAY_DS)

    setTimeout(function(){ 
        parteSimboloDS(2);        
    }, 500);

    setTimeout(()=> {
        simbolo2DS.src = simboliDS[nVincenteDS]; 
    }, DELAY_DS)

    setTimeout(function(){ 
        parteSimboloDS(3);
    }, 1000);

    setTimeout(()=>{
        simbolo3DS.src = simboliDS[nVincenteDS];
    }, DELAY_DS)
}

function getRandomDS(minDS, maxDS) { 
    minDS = Math.ceil(minDS);
    maxDS = Math.floor(maxDS);
    return Math.floor(Math.random() * (maxDS - minDS)) + minDS;
  }

//ritira il simbolo cliccato
simboliIdDS.addEventListener("click", function(){ 
    if(!partitaIniziataDS){
        if(!verificaVittoriaDS() && tentativiRitiroDS < 2){
            if(event.target.id == 'simbolo1DS') {
                parteSimboloDS(1);
            }
            if(event.target.id == 'simbolo2DS') {
                parteSimboloDS(2);
            }
            if(event.target.id == 'simbolo3DS') {
                parteSimboloDS(3);
            }

            tentativiRitiroDS++;
            ritiriDS.innerHTML = 2 - tentativiRitiroDS;

            setTimeout( () => {
                if(verificaVittoriaDS()){
                    aumentaPunteggioDS();
                    sconfitteConsecutiveDS = 0;
                    tentativiRitiroDS = 2
                }
        
                mostraRapportoDS();
                ritiriDS.innerHTML = 2 - tentativiRitiroDS;
            }, DELAY_DS);
        }
    }
});  

//ciao