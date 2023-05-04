import axios from 'axios'

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY

export default async function handler(req, res) {
  const symbol = req.query.symbol

  try {
    const response1 = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
    )
    const response2 = await axios.get(
      `https://finnhub.io/api/v1/stock/metric?metric=all&symbol=${symbol}&token=${FINNHUB_API_KEY}`
    )

    const data = {
      currentPrice: response1.data.c,
      openPrice: response1.data.o,
      highPrice: response1.data.h,
      lowPrice: response1.data.l,
      previousClose: response1.data.pc,
      percentChange: response1.data.dp,
      averageVolume10D: response2.data.metric['10DayAverageTradingVolume'],
      high52Week: response2.data.metric['52WeekHigh'],
      high52WeekDate: response2.data.metric['52WeekHighDate'],
      low52Week: response2.data.metric['52WeekLow'],
      low52WeekDate: response2.data.metric['52WeekLowDate'],
      beta: response2.data.metric.beta,
      epsTTM: response2.data.metric.epsTTM,
      marketCapitalization: response2.data.metric.marketCapitalization,
    }

    res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching data from FinnHub:', error)
    res.status(500).json({ error: 'Failed to fetch data from FinnHub' })
  }
}
