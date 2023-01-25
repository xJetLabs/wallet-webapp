export const formatNumber = (number: number, config: object = {}) => {
  if (!number) {
    number = 0;
  }

  const enFormat = new Intl.NumberFormat("en-US", {
    ...{ maximumFractionDigits: 3, minimumFractionDigits: 0 },
    ...config,
  });

  return enFormat.format(number);
};

export const countCharts = function (string: string, c: string) {
  var result = 0,
    i = 0;
  for (i; i < string.length; i++) if (string[i] === c) result++;
  return result;
};

export const errorMapping = (serverError: string) => {
  console.error(serverError);

  switch (serverError) {
    case "error_insufficientFunds":
      return "You don't have enough TON";
    case "Invalid ton_address":
      return "Receiver address is invalid";
    default:
      return "An error occured";
  }
};
