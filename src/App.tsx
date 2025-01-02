import { useRef, useState } from 'react'
import { IRefPhaserGame, PhaserGame } from './game/PhaserGame'
import { EventBus } from './game/EventBus'
import { Interaction } from './game/scenes/ArcyScene/types'
import { InteractionDecisionModal } from './components'

const App = () => {
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const [itemPosition, setItemPosition] = useState({ x: 0, y: 0 });

    const [interaction, setInteraction] = useState<Interaction>()
    const [isInteractionDecisionVisible, setIsInteractionDecisionVisible] = useState(false)

    EventBus.on('obstacleFound', (x: number, y: number) => {
        setItemPosition({ x, y })
    })

    EventBus.on('newInteraction', (newInteraction: Interaction) => {
        setInteraction(newInteraction)
        setIsInteractionDecisionVisible(true)
        console.log(interaction)
    })

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} />
            <div>
                <div className="spritePosition">
                    <span>Obstacle position:</span>
                    <pre>{`{\n  x: ${itemPosition.x}\n  y: ${itemPosition.y}\n}`}</pre>
                </div>
            </div>
            { interaction && (
                <InteractionDecisionModal
                    isOpen={isInteractionDecisionVisible}
                    interaction={interaction}
                    onClose={() => { setIsInteractionDecisionVisible(false)}}
                /> 
            )}
        </div>
    )
}

export default App
