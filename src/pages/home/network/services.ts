export const getAllLocations = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve([
        { label: "Location1", value: "location1" },
        { label: "Location2", value: "location2" },
      ]);
    }, 3000);
  });
};
