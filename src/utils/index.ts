const enFormat = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 3,
  minimumFractionDigits: 0,
});

export const formatNumber = (number: number) => {
  return enFormat.format(number);
};

export const countCharts = function (string: string, c: string) {
  var result = 0,
    i = 0;
  for (i; i < string.length; i++) if (string[i] === c) result++;
  return result;
};
