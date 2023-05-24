import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useEffect, useState } from 'react';
import { ResponsiveContainer } from 'recharts';

const StockChart = ({ symbol, onError }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/chart?symbol=${symbol}&interval=5min&outputsize=100`);
        const data = await res.json();

        if (!data['values']) {
          throw new Error("Unexpected API response format");
        }

        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        onError(); 
      }
    };
    fetchData();
  }, [symbol]);

  if (!data || !data['values']) {
    return <p>Loading...</p>;
  }

  const latestDate = data['values'].reduce((latest, value) => {
    const date = new Date(value['datetime']);
    return date > latest ? date : latest;
  }, new Date(0));

  const formattedData = [];
  const times = data['values'].filter(value => {
    const date = new Date(value['datetime']);
    const estDate = new Date(date.getTime() - 4 * 60 * 60 * 1000); // Convert to EDT timezone
    const hour = estDate.getUTCHours();
    const minute = estDate.getUTCMinutes();

    return date.toDateString() === latestDate.toDateString() && hour >= 9 && (hour < 16 || (hour === 16 && minute === 0));
  });

  for (const time of times) {
    const price = parseFloat(time['close']);
    const date = new Date(time['datetime']);
    const estDate = new Date(date.getTime() - 4 * 60 * 60 * 1000); // Convert to EDT timezone
    const timeString = estDate.toLocaleTimeString('en-US', { timeZone: 'UTC', hour: 'numeric', minute: '2-digit', hour12: true });
    formattedData.push({ time: timeString, price: price });
  }

 return (
  <div className='chart-container'>
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={formattedData}>
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="time" type="category" allowDuplicatedCategory={false} reversed tickFormatter={(tickItem) => tickItem.replace(/:00/, '')} />
        <YAxis domain={[Math.min(...formattedData.map(d => d.price)), Math.max(...formattedData.map(d => d.price))]} tickFormatter={(tickItem) => tickItem.toFixed(2)} />
        <CartesianGrid stroke="#ccc" />
        <Tooltip />
        <Area type="monotone" dataKey="price" stroke="#8884d8" fillOpacity={1} fill="url(#colorPrice)" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
 );
};

export default StockChart;



















