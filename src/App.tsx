import { useRef, useState } from 'react';
import { IRefPhaserGame, PhaserGame } from './game/PhaserGame';
import { EventBus } from './game/EventBus';
import { Interaction } from './game/scenes/ArcyScene/types';

const App = () => {
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const [itemPosition, setItemPosition] = useState({ x: 0, y: 0 });

    EventBus.on('itemInteraction', (interaction: Interaction) => {
        setItemPosition({ x: interaction.x, y: interaction.y })
    })

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} />
            <div>
                <div className="spritePosition">Interactible item position:
                    <pre>{`{\n  x: ${itemPosition.x}\n  y: ${itemPosition.y}\n}`}</pre>
                </div>
            </div>
        </div>
    )
}

export default App
