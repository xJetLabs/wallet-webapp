const enFormat = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 3,
  minimumFractionDigits: 0,
});

export const formatNumber = (number: number) => {
  return enFormat.format(number);
};
