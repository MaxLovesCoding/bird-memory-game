export const ROUNDS_PER_SESSION = 10;

export const WORDS = [
  { correct: "definitely", hint: "I will ___ finish my homework before dinner.", wrong: ["definately", "defiantly"] },
  { correct: "separate", hint: "Please ___ the recycling from the trash.", wrong: ["seperate", "seperat"] },
  { correct: "necessary", hint: "It is ___ to wear a helmet when biking.", wrong: ["neccessary", "necesary"] },
  { correct: "believe", hint: "I ___ practice will help me improve.", wrong: ["beleive", "belive"] },
  { correct: "receive", hint: "Did you ___ my thank-you note?", wrong: ["recieve", "receeve"] },
  { correct: "because", hint: "We stayed inside ___ it was raining.", wrong: ["becuase", "becase"] },
  { correct: "friend", hint: "My best ___ helped me study.", wrong: ["freind", "frend"] },
  { correct: "people", hint: "Many ___ came to the school concert.", wrong: ["peple", "peopel"] },
  { correct: "thought", hint: "I ___ about the story all night.", wrong: ["thaught", "thot"] },
  { correct: "important", hint: "It is ___ to get enough sleep.", wrong: ["importent", "importants"] },
  { correct: "special", hint: "Today felt ___ because Grandma visited.", wrong: ["speshal", "specail"] },
  { correct: "beautiful", hint: "The sunset looked ___ over the lake.", wrong: ["beautful", "beutiful"] },
];

export function pickRounds(count = ROUNDS_PER_SESSION) {
  return [...WORDS].sort(() => Math.random() - 0.5).slice(0, count).map((entry) => ({
    ...entry,
    choices: [entry.correct, ...entry.wrong].sort(() => Math.random() - 0.5),
  }));
}
