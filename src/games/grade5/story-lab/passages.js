export const QUESTIONS_PER_SESSION = 4;

export const TYPE_LABELS = {
  emotion: "Feelings",
  motivation: "Why?",
  plot: "Story",
};

export const PASSAGES = [
  {
    id: "lost-puppy",
    title: "The Lost Puppy",
    text: `Maya and her dad were walking through the park when Maya heard a soft whining sound near the bushes. She stopped and listened. Her dad asked if she wanted to keep walking, but Maya shook her head. She felt something was wrong.

Maya walked slowly toward the sound. Behind the bushes, a small brown puppy was shivering. It had no collar and looked scared. Maya's dad called the ranger station while Maya sat quietly nearby so the puppy would not run away.

Soon the ranger arrived. The puppy belonged to a family searching the park. When the owners arrived, the puppy wagged its tail and jumped into their arms. Maya smiled, happy the puppy was safe.`,
    questions: [
      {
        type: "emotion",
        prompt: "How does Maya feel when she first hears the whining?",
        choices: ["Worried", "Bored", "Angry"],
        answer: "Worried",
      },
      {
        type: "motivation",
        prompt: "Why does Maya walk toward the bushes?",
        choices: ["She wants to find what is making the sound", "She is looking for her ball", "She wants to race her dad"],
        answer: "She wants to find what is making the sound",
      },
      {
        type: "plot",
        prompt: "What problem are Maya and her dad trying to help solve?",
        choices: ["A lost puppy needs to get home", "They need to finish their walk faster", "The ranger is lost"],
        answer: "A lost puppy needs to get home",
      },
      {
        type: "emotion",
        prompt: "How does Maya probably feel at the end of the story?",
        choices: ["Happy", "Frustrated", "Sleepy"],
        answer: "Happy",
      },
    ],
  },
  {
    id: "science-fair",
    title: "The Science Fair Surprise",
    text: `Jordan spent weeks building a volcano model for the school science fair. On the morning of the fair, Jordan's little sister accidentally knocked over the model in the garage. Paint and foam pieces scattered everywhere.

Jordan stared at the mess and felt tears forming. Mom helped clean up, but there was not enough time to rebuild everything perfectly. Jordan decided to bring what was left and write a new sign explaining what happened.

At the fair, Jordan nervously set up the damaged volcano. When the judges asked questions, Jordan honestly explained the accident and what was learned about planning ahead. One judge said that solving problems matters as much as the project itself. Jordan left feeling proud anyway.`,
    questions: [
      {
        type: "plot",
        prompt: "What goes wrong before the science fair?",
        choices: ["The volcano model gets knocked over", "Jordan forgets the fair date", "The school cancels the fair"],
        answer: "The volcano model gets knocked over",
      },
      {
        type: "emotion",
        prompt: "How does Jordan feel when seeing the mess?",
        choices: ["Upset", "Excited", "Calm"],
        answer: "Upset",
      },
      {
        type: "motivation",
        prompt: "Why does Jordan still go to the fair?",
        choices: ["To share what happened and what was learned", "To buy a new volcano", "To skip class"],
        answer: "To share what happened and what was learned",
      },
      {
        type: "emotion",
        prompt: "How does Jordan feel at the end?",
        choices: ["Proud", "Embarrassed", "Angry at their sister"],
        answer: "Proud",
      },
    ],
  },
  {
    id: "new-team",
    title: "The New Team Member",
    text: `When Elena joined the soccer team mid-season, the other players already had inside jokes and favorite positions. At the first practice, Elena missed an easy pass and heard someone sigh. She wondered if she would ever fit in.

The next day, Elena stayed after practice to juggle the ball alone. Captain Rosa noticed and showed Elena a trick for better control. Elena listened carefully and tried again. At the following game, Elena passed the ball to Rosa for the winning goal.

After the game, the team cheered together. Elena realized that showing effort and listening helped her become part of the group. Rosa told her, "Everyone starts somewhere." Elena felt like she finally belonged.`,
    questions: [
      {
        type: "emotion",
        prompt: "How does Elena feel at her first practice?",
        choices: ["Unsure if she belongs", "Confident and relaxed", "Angry at the coach"],
        answer: "Unsure if she belongs",
      },
      {
        type: "motivation",
        prompt: "Why does Elena stay after practice to train?",
        choices: ["She wants to improve and earn her place", "She lost her backpack", "She is waiting for a ride"],
        answer: "She wants to improve and earn her place",
      },
      {
        type: "plot",
        prompt: "What important event happens in the game?",
        choices: ["Elena helps set up the winning goal", "Elena sits on the bench", "The game is canceled"],
        answer: "Elena helps set up the winning goal",
      },
      {
        type: "emotion",
        prompt: "How does Elena feel at the end of the story?",
        choices: ["Like she belongs on the team", "Like quitting", "Jealous of Rosa"],
        answer: "Like she belongs on the team",
      },
    ],
  },
  {
    id: "stormy-night",
    title: "Letters in the Attic",
    text: `During a stormy night, the power went out in Grandpa's old house. Ava and Grandpa lit a lantern and climbed to the attic to find blankets. Ava noticed a dusty box labeled with her mom's name.

Inside were letters her mom had written as a girl. Ava asked Grandpa if she could read one aloud. The letter described being nervous about moving to a new town—feelings Ava had lately too.

Grandpa explained that her mom had been brave and made friends by joining the school newspaper. Ava thought about trying the newspaper club herself. When the power returned, Ava felt less alone knowing her mom had faced similar worries.`,
    questions: [
      {
        type: "plot",
        prompt: "What do Ava and Grandpa find in the attic?",
        choices: ["Old letters from Ava's mom", "A broken lantern", "A lost kitten"],
        answer: "Old letters from Ava's mom",
      },
      {
        type: "emotion",
        prompt: "Why might Ava relate to her mom's letter?",
        choices: ["They both feel nervous about change", "They both dislike reading", "They both live in the attic"],
        answer: "They both feel nervous about change",
      },
      {
        type: "motivation",
        prompt: "Why might Ava join the newspaper club?",
        choices: ["Her mom's letter inspires her to try something new", "Grandpa forces her to join", "The club gives free pizza only"],
        answer: "Her mom's letter inspires her to try something new",
      },
      {
        type: "emotion",
        prompt: "How does Ava feel after reading the letter?",
        choices: ["Less alone", "More confused", "Angry at her mom"],
        answer: "Less alone",
      },
    ],
  },
];

export function pickSession() {
  const passage = PASSAGES[Math.floor(Math.random() * PASSAGES.length)];
  const questions = [...passage.questions].sort(() => Math.random() - 0.5).slice(0, QUESTIONS_PER_SESSION);
  return { passage, questions };
}
