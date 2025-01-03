const alphabet: string[] = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "w",
  "v",
  "x",
  "y",
  "z",
]

export const chooseOption = <T>(options: T[], choice: string) => {
  const choiceIndex = alphabet.findIndex((letter) => letter === choice)
  return options[choiceIndex]
}

export const mapOptions = <T>(options: T[]) => {
  return options.map((option: T, index: number) => ({
    ...option,
    letter: alphabet[index],
  }))
}
