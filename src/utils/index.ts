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
  switch (serverError) {
    case "error_insufficientFunds":
      return "You don't have enough TON";
    case "Invalid ton_address":
      return "Receiver address is invalid";
    default:
      return serverError.replace("error_", ""); // "An error occured";
  }
};

export const formatToken = (token: string) => {
  if (!token) {
    return "";
  }

  if (token.length < 16) {
    return token;
  }

  const [beforeCopy, afterCopy] = [token.slice(), token.slice()];

  const before = beforeCopy.slice(0, 6);
  const after = afterCopy.slice(-7);

  return `${before}...${after}`;
};

export const formatDate = (date: Date) => {
  const dateStr =
    ("00" + date.getDate()).slice(-2) +
    "." +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "." +
    date.getFullYear() +
    " " +
    ("00" + date.getHours()).slice(-2) +
    ":" +
    ("00" + date.getMinutes()).slice(-2) +
    ":" +
    ("00" + date.getSeconds()).slice(-2);

  return dateStr;
};

export function removeTrailingZeros(num: string) {
  const number = parseFloat(num);

  return number * 1;
}