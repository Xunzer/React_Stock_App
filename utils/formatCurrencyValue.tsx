//  this function can format a number or string as currency value
export const formatCurrencyValue = (
  // price can be number or string or undefined, currency is used for formatting, set to USD by default, rest is additional options to pass 
  price: number | string | undefined,
  currency: string = "USD",
  rest?: any
) => {
  // if price is null, the function returns an empty string, else if the type of price is string, we would convert it to number
  if (!price) return "";
  if (typeof price === "string") price = Number(price);

  // constructor of formatter
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    ...rest,
  });

  return formatter.format(price);
};