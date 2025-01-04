export type Action = {
  id: string
  type: ActionType
  key: string
  prompt: string
  result: string
  fn: (action: Action) => void
}

type ActionType =
  | "npc_view"
  | "npc_talk"
  | "npc_attack"
  | "item_view"
  | "item_loot"
  | "other"

export type ItemInteraction = {
  id: string
  x: number
  y: number
  actions: Action[]
  name: string
  description: string
}

// NPC types
export type NPCData = {
  name: string
  surname?: string
  species?: string
  description?: string
}

export type NPCLocation = { x: number; y: number }
