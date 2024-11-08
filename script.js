const gameboard = (function() {

    let turn = 0;

    const slots = ( function() {

        function slotter (slot) {
            let name   = slot;
            let symbol = '';
            const setSymbol = (newSymbol) => symbol = newSymbol;
            const getSymbol = () => symbol;
            const getName   = () => name;
            const isEmpty   = () => symbol == '';
            const reset     = () => {
                if (getSymbol()){
                    document.getElementsByClassName(name)[0].classList.remove(symbol);
                    symbol = '';
                }      
            }
            return { setSymbol, getSymbol, getName, isEmpty, reset };
        }

        const slot1 = slotter('slot_1');
        const slot2 = slotter('slot_2');
        const slot3 = slotter('slot_3');
        const slot4 = slotter('slot_4');
        const slot5 = slotter('slot_5');
        const slot6 = slotter('slot_6');
        const slot7 = slotter('slot_7');
        const slot8 = slotter('slot_8');
        const slot9 = slotter('slot_9');

        return { slot1, slot2, slot3, slot4, slot5, slot6, slot7, slot8, slot9 };
    })();
     
    function checkWinCondition(slots) {
        if (slots.slot1.getSymbol() != '' && slots.slot1.getSymbol() === slots.slot2.getSymbol() &&
                                             slots.slot2.getSymbol() === slots.slot3.getSymbol()){
            return true;
        }
        if (slots.slot4.getSymbol() != '' && slots.slot4.getSymbol() === slots.slot5.getSymbol() &&
                                             slots.slot5.getSymbol() === slots.slot6.getSymbol()){
            return true;
        }
        if (slots.slot7.getSymbol() != '' && slots.slot7.getSymbol() === slots.slot8.getSymbol() &&
                                             slots.slot8.getSymbol() === slots.slot9.getSymbol()){
            return true;
        }
        if (slots.slot1.getSymbol() != '' && slots.slot1.getSymbol() === slots.slot4.getSymbol() &&
        slots.slot4.getSymbol() === slots.slot7.getSymbol()){
            return true;
        }
        if (slots.slot2.getSymbol() != '' && slots.slot2.getSymbol() === slots.slot5.getSymbol() &&
        slots.slot5.getSymbol() === slots.slot8.getSymbol()){
            return true;
        }
        if (slots.slot3.getSymbol() != '' && slots.slot3.getSymbol() === slots.slot6.getSymbol() &&
        slots.slot6.getSymbol() === slots.slot9.getSymbol()){
            return true;
        }
        if (slots.slot1.getSymbol() != '' && slots.slot1.getSymbol() === slots.slot5.getSymbol() &&
        slots.slot5.getSymbol() === slots.slot9.getSymbol()){
            return true;
        }
        if (slots.slot3.getSymbol() != '' && slots.slot3.getSymbol() === slots.slot5.getSymbol() &&
        slots.slot5.getSymbol() === slots.slot7.getSymbol()){
            return true;
        }
        let isTie = true;

        for (let i in slots){
            if (slots[i].getSymbol() === ""){
                isTie = false;
                break;
            }
        }

        if ( isTie ) { 
            tie();
        }

        return false;
    }

    function tie () { 
        let elem = document.getElementsByClassName('win')[0];
        elem.showModal();
        let winner = document.getElementById('winner');
        winner.textContent = 'Draw';
    }

    function win ( player ) { 
        let elem = document.getElementsByClassName('win')[0];
        elem.showModal();
        let winner = document.getElementById('winner');
        winner.textContent = player.getName() + " wins!";
    }

    function play(player, slot) { 
        if (!slot.isEmpty()){
            return;
        }
        slot.setSymbol(player.getSymbol());
        document.getElementsByClassName(slot.getName())[0].classList.add(player.getSymbol());
        if ( checkWinCondition(slots) ) {
            win ( player );
        }

        turn = (turn === 0 ? 1 : 0); 
        document.getElementById('player_turn').innerText = getPlayer().getName();
    }


    const getPlayer = () => turn === 0 ? gameflow.players.player_1 : gameflow.players.player_2;

    return { play, slots, getPlayer };
})();

function player() {
    let name   = '';
    let symbol = '';
    const setXSymbol = () => symbol = 'x';
    const setOSymbol = () => symbol = 'o';
    const getSymbol  = () => symbol;
    const setName    = (newName) => name = newName; 
    const getName    = () => name;
    return { getSymbol, setOSymbol, setXSymbol, setName, getName };
}

const gameflow = (function() {

    function load() { 
        let dialog = document.querySelector('dialog');
        dialog.showModal();
        setFn(function() {start()}, 'button');
        for (let i = 1; i<10; i++){
            let slotName = 'slot_' + i;
            setFnWithClassName(function(){ 
                gameboard.play(gameboard.getPlayer(), gameboard.slots['slot' + i])
            }, slotName);
        }

        setFnWithClassName(function(){reload()}, 'win')
    }

    function reload() {
        for (let slotIndex in gameboard.slots){
            gameboard.slots[slotIndex].reset();
        }
        document.getElementsByClassName('win')[0].close();
    }

    const players = (function() {

        const player_1 = player();
        const player_2 = player();
        player_1.setOSymbol();
        player_2.setXSymbol();

        return { player_1, player_2 }

    })();

    function start (){
        setNames();  
        let dialog = document.querySelector('dialog');
        dialog.close();
    } 

    function setNames(){
        gameflow.players.player_1.setName(document.getElementsByClassName('jugador_1')[0].value);
        gameflow.players.player_2.setName(document.getElementsByClassName('jugador_2')[0].value);
        document.getElementById('player_turn').innerText = document.getElementsByClassName('jugador_1')[0].value;
    }

    function setFn(f, target) {
        let elem = document.querySelector(target);
        elem.addEventListener('click', f);
    }

    function setFnWithClassName(f, target) {
        let elem = document.getElementsByClassName(target)[0];
        elem.addEventListener('click', f);
    }

    function getSlot(slotName) {
        return document.getElementsByClassName(slotName)[0];
    }

    return { start, load, players }
})();



gameflow.load();
