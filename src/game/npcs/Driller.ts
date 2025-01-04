import { NPC } from "."

const drillerData = {
  species: "Dwarf",
  name: "Driller",
  surname: "Drillersson",
  description: "He likes to drill.",
}

export const Driller = new NPC("driller", { x: 19, y: 5 }, drillerData)
