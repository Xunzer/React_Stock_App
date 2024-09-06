import { stocks } from "@/data";

export const searchStock = (text: string) => {
    if (!text) return [];

    // use a anonymous function in the filter() to return a filtered array of stocks whose ticker property matches the provided pattern text or matches the company name regardless of case
    return stocks.filter((i) => i.ticker.match(new RegExp(text, "i")) || i.companyName.match(new RegExp(text, "i")))
}

export const selectStock = (text: string) => {
    const stock = stocks.filter((i) => i.ticker === text);
    // check if any stocks match the criteria
    if (stock.length > 0) {
        // return the first matching stock
        return stock[0];
    }
    // return null if no stocks match
    return null;
}


export const selectStockPrices = (text: string) => {
    const stock = stocks.filter((i) => i.ticker === text);
    // check if any stocks match the criteria
    if (stock.length > 0) {
        // return the first matching stock
        return stock[0];
    }
    // return null if no stocks match
    return null;
}