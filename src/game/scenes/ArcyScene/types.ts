export type Action = {
  id: string
  description: string
  result?: string
}

export type Interaction = {
  id: string
  x: number
  y: number
  actions: Action[]
  name: string
  description: string
}
