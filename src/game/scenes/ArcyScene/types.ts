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
  | "npc_other"
  | "item_view"
  | "item_other"
  | "other"

export type Location = { x: number; y: number }

/**
 * NPC TYPES
 */
export type NPCData = {
  name: string
  description?: string
  surname?: string
  species?: string
}

/**
 * ITEM TYPES
 */
export type ItemData = {
  name: string
  rawName: string
  description: string
  weight: number
  quality?: ItemQuality
  wear?: number
  decoration?: string
}

export type ItemQuality =
  | "well"
  | "fine"
  | "superior"
  | "exceptional"
  | "masterful"
