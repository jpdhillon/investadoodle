import axios from 'axios'

export default async (req, res) => {
  const symbol = req.query.symbol
  const twelvedataAPIKey = process.env.TWELVEDATA_API_KEY
  const url = `https://api.twelvedata.com/time_series?symbol=${symbol}
&interval=5min&apikey=${twelvedataAPIKey}`

  try {
    const response = await axios.get(url)
    res.status(200).json(response.data)
  } catch (error) {
    res.status(500).json({ error })
  }
}
