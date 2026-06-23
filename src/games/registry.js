import * as memory from "./memory/memory.js";
import * as countTap from "./count-tap/count-tap.js";
import * as letterHunt from "./letter-hunt/letter-hunt.js";
import * as rhymeTime from "./rhyme-time/rhyme-time.js";

export const games = [memory, countTap, letterHunt, rhymeTime];

export const gamesById = Object.fromEntries(games.map((g) => [g.gameMeta.id, g]));
