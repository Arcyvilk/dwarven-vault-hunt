import { generalInteractions } from "./general"
import { itemInteractions } from "./item"
import { npcInteractions } from "./npc"

export const interactions = [
  ...generalInteractions,
  ...itemInteractions,
  ...npcInteractions,
]
