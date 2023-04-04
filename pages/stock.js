import { useRouter } from 'next/router'
import StockNews from '../components/StockNews'

function StockPage() {
  const router = useRouter()
  const { symbol, newsSymbol } = router.query

  return (
    <div>
      <h1>Symbol: {symbol}</h1>
      <StockNews symbol={newsSymbol} />
    </div>
  )
}

export default StockPage
