(() => {
 'use strict'

    let   deck              = [];
    const tipos             = ['C','H', 'D', 'S'];
    const especiales        = ['A', 'J', 'Q', 'K'];
    let puntosJugador       = 0;
    let puntosComputadora   = 0;

    // referencias del html

    const btnPedir               = document.querySelector ('#btnPedir');
    const btnDetener             = document.querySelector ('#btnDetener');
    const btnNuevo               = document.querySelector ('#btnNuevo');
    const divCartasJugador       = document.querySelector('#jugador-cartas');
    const divCartasComputadoras  = document.querySelector('#computadora-cartas');
    const puntosHTML             = document.querySelectorAll('small');

    // Esta funcion crea un nuevo deck

    const crearDeck = () =>{
    for ( let i = 2; i <= 10; i++ ){
        for (let tipo of tipos) {
        deck.push( i + tipo );
        }
    }
    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);   
        }     
    }

    deck = _.shuffle ( deck );
    //console.log ( deck );
    return deck;
    }

    crearDeck();

    // Esta funciona permite tomar una carta

    const pedirCarta = () =>{

    if ( deck.length === 0){
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop ();
    return carta;
    }

    const valorCarta = ( carta ) =>{
    const valor = carta.substring(0, carta.length -1);
    return ( isNaN (valor) ) ?
    ( valor === 'A') ? 11 : 10
    : valor * 1;
    }
    // Eventos

    // TURNO DE LA COMPUTADORA
    const turnoComputadora = (puntosMinimos) =>{
    do {

        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta( carta );
        console.log ( puntosComputadora ); 
        puntosHTML[1].innerHTML = puntosComputadora;

        const imgCarta = document.createElement ('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add( 'carta' );
        divCartasComputadoras.append( imgCarta );

        if( puntosMinimos > 21 ){
            break;
        }
        
    } while ( (puntosComputadora < puntosMinimos) && ( puntosMinimos <= 21) );

    setTimeout( () => {

    if( puntosComputadora === puntosJugador ){
    alert('Nadie gana :(');
    } else if ( puntosMinimos > 21){
    alert('Computadora gana');
    } else if ( puntosComputadora > 21){
    alert('Jugador gana')
    } else{
    alert('Computadora gana')
    }

    }, 10 );

    } 


    btnPedir.addEventListener('click', () => {

    const carta = pedirCarta ();
    puntosJugador = puntosJugador + valorCarta( carta );
    console.log ( puntosJugador );  
    puntosHTML[0].innerHTML = puntosJugador;


    //<img class = "carta" src="assets/cartas/10D.png">

    const imgCarta = document.createElement ('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add( 'carta' );
    divCartasJugador.append( imgCarta );

    if ( puntosJugador > 21 ){
    console.warn( 'Has perdido' );
    btnDetener.disabled = true;
    btnPedir.disabled = true;
    turnoComputadora( puntosJugador );
    } else if ( puntosJugador === 21){
    console.warn('21, Genial !');
    btnDetener.disabled = true;
    btnPedir.disabled = true;

    }

    });

    btnDetener.addEventListener ('click', () =>{
    btnDetener.disabled = true;
    btnPedir.disabled   = true;

    turnoComputadora( puntosJugador );
    })


    btnNuevo.addEventListener('click', ()=>{

    console.clear ();
    deck = [];
    deck = crearDeck();

    
    puntosJugador     = 0;
    puntosComputadora = 0;

    puntosHTML  [0].innerText  = 0;
    puntosHTML  [1].innerText  = 0;

    divCartasComputadoras.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnDetener.disabled = false;
    btnPedir.disabled = false;
    });


})();



