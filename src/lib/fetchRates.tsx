export const fetchBananoUsdRate = async () => {
    const data = await (await fetch("https://api.coingecko.com/api/v3/simple/price?ids=BANANO&vs_currencies=USD")).json()
    return data?.banano?.usd
}

export const fetchFiatUsdRato = async (currency: string) => {
    const data = await (await fetch(`https://api.exchangerate.host/latest?base=USD&symbols=${currency}`)).json()
    return data?.rates[currency]
}