export type NPCData = {
  name: string
  surname?: string
  species?: string
  description?: string
}

export type NPCLocation = { x: number; y: number }

export type NPCAction = {
  type: string
  description: string
  fn: () => void
}
