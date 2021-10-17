const flightDateGenerator = flightDate => {
  const year = flightDate.slice(0, 4);
  const month = flightDate.slice(5, 7);
  const day = flightDate.slice(8, 10);
  const date = new Date(year, month - 1, day);

  return date;
};

export default flightDateGenerator;
