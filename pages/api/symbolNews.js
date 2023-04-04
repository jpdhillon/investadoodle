export default async function handler(req, res) {
  const { symbol, from, to } = req.query
  const finnhubAPIKey = process.env.FINNHUB_API_KEY
  const response = await fetch(
    `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${from}&to=${to}&token=${finnhubAPIKey}`
  )
  const data = await response.json()
  res.status(200).json(data)
}
