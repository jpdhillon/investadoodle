import axios from 'axios'

export default async function handler(req, res) {
  const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY
  // const dateToday = new Date().toISOString().split('T')[0]
  const dateToday = '2023-05-09'

  const ipoResponse = await axios.get(
    `https://finnhub.io/api/v1/calendar/ipo?from=${dateToday}&to=${dateToday}&token=${FINNHUB_API_KEY}`
  )
  const earningsResponse = await axios.get(
    `https://finnhub.io/api/v1/calendar/earnings?from=${dateToday}&to=${dateToday}&token=${FINNHUB_API_KEY}`
  )

  const ipoCalendar = ipoResponse.data.ipoCalendar
  const earningsCalendar = earningsResponse.data.earningsCalendar

  res.status(200).json({ ipoCalendar, earningsCalendar })
}
