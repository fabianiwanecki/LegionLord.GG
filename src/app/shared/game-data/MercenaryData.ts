export const MercenaryData = [
  {name: 'Snail', cost: 20, income: 6, icon: 'Snail.png'},
  {name: 'Giant Snail', cost: 20, income: 6, icon: 'GiantSnail.png'},
  {name: 'Lizard', cost: 40, income: 12, icon: 'Lizard.png'},
  {name: 'Dragon Turtle', cost: 40, income: 12, icon: 'DragonTurtle.png'},
  {name: 'Brute', cost: 60, income: 15, icon: 'Brute.png'},
  {name: 'Fiend', cost: 60, income: 18, icon: 'Fiend.png'},
  {name: 'Hermit', cost: 80, income: 20, icon: 'Hermit.png'},
  {name: 'Dino', cost: 80, income: 24, icon: 'Dino.png'},
  {name: 'Imp', cost: 100, income: 25, icon: 'Imp.png'},
  {name: 'Cannoneer', cost: 100, income: 30, icon: 'Cannoneer.png'},
  {name: 'Safety Mole', cost: 120, income: 30, icon: 'SafetyMole.png'},
  {name: 'Drake', cost: 120, income: 36, icon: 'Drake.png'},
  {name: 'Pack Leader', cost: 160, income: 40, icon: 'PackLeader.png'},
  {name: 'Mimic', cost: 160, income: 40, icon: 'Mimic.png'},
  {name: 'Witch', cost: 200, income: 50, icon: 'Witch.png'},
  {name: 'Ogre', cost: 200, income: 50, icon: 'Ogre.png'},
  {name: 'Ghost Knight', cost: 240, income: 60, icon: 'GhostKnight.png'},
  {name: 'Four Eyes', cost: 240, income: 60, icon: 'FourEyes.png'},
  {name: 'Centaur', cost: 280, income: 70, icon: 'Centaur.png'},
  {name: 'Shaman', cost: 320, income: 80, icon: 'Shaman.png'},
  {name: 'Siege Ram', cost: 320, income: 80, icon: 'SiegeRam.png'},
  {name: 'Kraken', cost: 400, income: 100, icon: 'Kraken.png'},
]

export function getMercenaryByName(name: string): any {
  return MercenaryData.find(merc => merc.name === name);
}
