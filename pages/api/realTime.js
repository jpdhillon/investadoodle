const twelvedataAPIKey = process.env.TWELVEDATA_API_KEY

export default async function handler(req, res) {
  const { symbol } = req.query
  const response = await fetch(
    `https://api.twelvedata.com/price?symbol=${symbol}&apikey=${twelvedataAPIKey}`
  )
  const data = await response.json()
  res.status(200).json({ price: data.price })
}
