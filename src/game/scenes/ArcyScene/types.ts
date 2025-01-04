export type Action = {
  id: string
  description: string
  type: "simple" | "talk" | "view_npc" | "view_item" | "attack"
  result?: string
}

export type ItemInteraction = {
  id: string
  x: number
  y: number
  actions: Action[]
  name: string
  description: string
}
