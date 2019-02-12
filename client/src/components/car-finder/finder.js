
import carFacts from "./carFacts";

export const Submit = (data) => {
  let count = [], carLinks;
  // Finds and selects all matching cars
  for (let i in data) {
    let category, feat, cars;
    category = carFacts[i]
    for (feat in category) {  
      if (category.hasOwnProperty(feat))
        cars = category[feat];
      if (data[i] === feat) {
        count += cars.map((car) => {
          return car;
        }) + ',';
        break;
      }
    }
  }
  
  carLinks = count.split(',').sort().filter((i, idx, arr) => {
    let car = 0;
    for (let j = idx; j < arr.length; j++) {
      if (i.indexOf(arr[j]) > -1) {
        car++;
        if (car === 3)   // Loop through all matching vehicles and
          return i;     // return only those with 3 results
      }
    }
    return null;
  });
  return carLinks;
}