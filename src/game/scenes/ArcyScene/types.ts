export type Action = {
  id: string
  description: string
  type: string
  fn: () => void
}

export type ItemInteraction = {
  id: string
  x: number
  y: number
  actions: Action[]
  name: string
  description: string
}
