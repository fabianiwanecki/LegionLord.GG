export const KingUpgradeData = [
  {name: 'Upgrade King Attack', cost: 20, income: 6, icon: 'UpgradeKingAttack.png'},
  {name: 'Upgrade King Regen', cost: 20, income: 6, icon: 'UpgradeKingRegen.png'},
  {name: 'Upgrade King Spell', cost: 20, income: 6, icon: 'UpgradeKingSpell.png'},
]

export function getKingUpgradeByName(name: string): any {
  return KingUpgradeData.find(kingUpgrade => kingUpgrade.name === name);
}
