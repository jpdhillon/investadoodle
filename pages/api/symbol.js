// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const { inputValue } = req.query

  const response = await fetch(
    `https://finnhub.io/api/v1/search?q=${inputValue}&token=cfkkko1r01qokcgl3of0cfkkko1r01qokcgl3ofg`
  )
  const data = await response.json()

  res.status(200).json(data)
}
