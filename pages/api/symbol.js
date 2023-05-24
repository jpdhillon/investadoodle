import axios from 'axios'

const alphaVantageAPIKey = process.env.ALPHA_VANTAGE_API_KEY

export default async function handler(req, res) {
  const { input } = req.query

  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${input}&apikey=${alphaVantageAPIKey}`
    )
    const { bestMatches } = response.data

    const filteredMatches = bestMatches.filter((match) => {
      return (
        !match['1. symbol'].includes('.') &&
        match['3. type'] === 'Equity' &&
        match['4. region'] === 'United States'
      )
    })

    res.status(200).json(filteredMatches)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching data from Alpha Vantage API' })
  }
}
