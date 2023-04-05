import axios from 'axios'

export default async (req, res) => {
  const symbol = req.query.symbol
  const alphaVantageAPIKey = process.env.ALPHA_VANTAGE_API_KEY
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${alphaVantageAPIKey}`

  try {
    const response = await axios.get(url)
    res.status(200).json(response.data)
  } catch (error) {
    res.status(500).json({ error })
  }
}
