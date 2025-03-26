const getDateStringFromDate = (date: Date): string => {
  // return format examaple: 2025-03-25
  return date.toISOString().split('T')[0];
};


export {getDateStringFromDate};