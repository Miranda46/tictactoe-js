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
            return { setSymbol, getSymbol, getName, isEmpty };
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
        console.log(slots.slot1.getSymbol(),slots.slot2.getSymbol(),slots.slot3.getSymbol())
        console.log(slots.slot1.getSymbol() === slots.slot2.getSymbol())
        return false;
    }

    function win ( player ) { 
        console.log(player.getName());
    }

    function play(player, slot) { 
        console.log(slot.getSymbol())
        if (!slot.isEmpty()){
            return;
        }

        slot.setSymbol(player.getSymbol());
        if ( checkWinCondition(slots) ) {
            win ( player );
        }

        turn = turn === 0 ? 1 : 0; 
    }

    const getTurn = () => turn;

    return { play, slots, getTurn };
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

const player_1 = player();
const player_2 = player();


player_1.setName('gonzalo');
player_2.setName('zalah');
player_1.setOSymbol();
player_2.setXSymbol();
gameboard.play(player_1, gameboard.slots.slot1)
gameboard.play(player_1, gameboard.slots.slot3)
gameboard.play(player_1, gameboard.slots.slot2)










