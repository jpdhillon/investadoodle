const alphaVantageAPIKey = process.env.ALPHA_VANTAGE_API_KEY

export default async function handler(req, res) {
  const { symbol } = req.query
  const response = await fetch(
    `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${alphaVantageAPIKey}`
  )
  const data = await response.json()
  const {
    Symbol,
    MarketCapitalization,
    PERatio,
    EPS,
    Beta,
    DividendDate,
    ExDividendDate,
  } = data
  res.status(200).json({
    Symbol,
    MarketCapitalization,
    PERatio,
    EPS,
    Beta,
    DividendDate,
    ExDividendDate,
  })
}
