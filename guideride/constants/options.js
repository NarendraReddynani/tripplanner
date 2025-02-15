export const SelectTravelerList = [
  {
    id: 1,
    title: 'Solo Traveler',
    desc: 'Explore the world alone!',
    icon: '🧑‍🎤',
    people: '1',
    type: 'solo'
  },
  {
    id: 2,
    title: 'Couple',
    desc: 'Romantic adventures await!',
    icon: '❤️‍🔥',
    people: '2 people',
    type: 'couple'
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A journey with loved ones!',
    icon: '👨‍👩‍👧‍👦',
    people: '3 to 5 people',
    type: 'family'
  },
  {
    id: 4,
    title: 'Friends',
    desc: 'Unforgettable memories together!',
    icon: '🎉',
    people: '5 to 10 people',
    type: 'friends'
  }
];

export const SelectBudgetOptions = [
  { id: 1, title: 'Low Budget', desc: 'Basic affordable trips', type: 'low', icon: '💰' },
  { id: 2, title: 'Moderate Budget', desc: 'Standard comfort trips', type: 'moderate', icon: '✨' },
  { id: 3, title: 'Luxury Budget', desc: 'High-end premium trips', type: 'luxury', icon: '💎' },
];

  
export const AI_PROMPT='generate travel plan for Location:{location},for {totalDays} days and {totalNight} night for the {traveler} with a {budget} budget with flight details,flight price with booking url,hotels options list with hotelName,hotel address,price,hotel image url,geo coordinates,rating,descriptions and places to visit nearby with placename,place details,place image url,geo coordinates,ticket pricing,time to travel each of the location for  {totalDays} day and {totalNight} night with each day plan with best time to visit in JSON format'