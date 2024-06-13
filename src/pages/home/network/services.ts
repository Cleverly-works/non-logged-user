export const getAllLocations = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve([
        { label: "Location1", value: 2324 },
        { label: "Location2", value: 9292 },
      ]);
    }, 1000);
  });
};

export const getAllSublocations = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve([
        { label: "Subocation1", value: 1123 },
        { label: "Sublocation2", value: 1233 },
      ]);
    }, 1000);
  });
};

export const createReportedIssue = (data: any) => {
  console.log(data);
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve({ jobId: 1234 });
    }, 1000);
  });
};
