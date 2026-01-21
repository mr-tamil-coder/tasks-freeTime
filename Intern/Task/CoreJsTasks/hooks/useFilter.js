export function useFilter(data) {
  return function ({ location, ageMin, ageMax }) {
    return data.filter(item => {
      const locationMatch = !location || location === "All" || item.location === location;
      const ageMatch = (!ageMin && !ageMax) || 
                       (item.age >= (ageMin || 0) && item.age <= (ageMax || Infinity));
      
      return locationMatch && ageMatch;
    });
  };
}
