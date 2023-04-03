import { useRouter } from 'next/router'

function StockPage() {
  const router = useRouter()
  const { symbol } = router.query

  return (
    <div>
      <h1>Symbol: {symbol}</h1>
    </div>
  )
}

export default StockPage
