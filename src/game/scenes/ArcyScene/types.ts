export type Action = 'view' | 'talk' | 'take'

export type Interaction = {
    id: string;
    x: number;
    y: number;
    actions: Action[]
    name: string
    description: string
}