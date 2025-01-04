export type NPCData = {
  id: string
  name: string
  surname?: string
  species?: string
  description?: string
}

export type NPCLocation = { x: number; y: number }

export type NPCAction = {
  type: "talk" | "view" | "attack"
  description: string
}
