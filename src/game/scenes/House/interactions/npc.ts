import { Interaction } from "../../ArcyScene/types"

export const npcInteractions: Interaction[] = [
  {
    id: "driller",
    x: 19,
    y: 5,
    actions: [
      {
        id: "talk",
        description:
          "Start new conversation with the Dwarf Driller Drillersson",
        type: "talk",
      },
      {
        id: "view",
        description: "View the Dwarf Driller Drillersson",
        type: "view_npc",
      },
      {
        id: "attack",
        description: "Attack Driller",
        type: "attack",
      },
    ],
    name: "Door",
    description: "Door.",
  },
]
