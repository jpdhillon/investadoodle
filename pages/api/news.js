export default async function handler(req, res) {
  try {
    const finnhubAPIKey = process.env.FINNHUB_API_KEY
    const response = await fetch(
      `https://finnhub.io/api/v1/news?category=general&token=${finnhubAPIKey}`
    )
    const data = await response.json()

    if (Array.isArray(data)) {
      const articles = data.slice(0, 10)
      res.status(200).json(articles)
    } else {
      res.status(500).json({ message: 'Received invalid data format from API' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
}
