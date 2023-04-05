const twelvedataAPIKey = process.env.TWELVEDATA_API_KEY

export default async function handler(req, res) {
  const { symbol } = req.query
  const response = await fetch(
    `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${twelvedataAPIKey}`
  )
  const data = await response.json()
  const {
    open,
    high,
    low,
    close,
    volume,
    average_volume,
    previous_close,
    percent_change,
  } = data
  res.status(200).json({
    open,
    high,
    low,
    close,
    volume,
    average_volume,
    previous_close,
    percent_change,
  })
}
