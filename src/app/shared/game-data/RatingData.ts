export const RatingData = [
  {name: 'Bronze', startRating: 0, endRating: 1199, icon: 'Bronze.png'},
  {name: 'Silver', startRating: 1200, endRating: 1399, icon: 'Silver.png'},
  {name: 'Gold', startRating: 1400, endRating: 1599, icon: 'Gold.png'},
  {name: 'Platinum', startRating: 1600, endRating: 1799, icon: 'Platinum.png'},
  {name: 'Diamond', startRating: 1800, endRating: 1999, icon: 'Diamond.png'},
  {name: 'Expert', startRating: 2000, endRating: 2199, icon: 'Expert.png'},
  {name: 'Master', startRating: 2200, endRating: 2399, icon: 'Master.png'},
  {name: 'Senior Master', startRating: 2400, endRating: 2599, icon: 'SeniorMaster.png'},
  {name: 'Grandmaster', startRating: 2600, endRating: 2799, icon: 'GrandMaster.png'},
  {name: 'Legend', startRating: 2800, endRating: 10000, icon: 'Legend.png'},
]

export function getByElo(elo: number): any {
  return RatingData.find(rating => rating.startRating < elo && rating.endRating >= elo);
}
