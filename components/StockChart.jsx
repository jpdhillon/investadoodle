import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useEffect, useState } from 'react';

const StockChart = ({ symbol, onError }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/chart?symbol=${symbol}`);
        const data = await res.json();

        if (!data['values']) {
          throw new Error("Unexpected API response format");
        }

        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        onError(); // Call onError prop function
      }
    };
    fetchData();
  }, [symbol]);

  if (!data || !data['values']) {
    return <p>Loading...</p>;
  }

  const formattedData = [];
  const times = data['values'].filter(value => {
    const date = new Date(value['datetime']);
    return date.getUTCHours() >= 13 && date.getUTCHours() < 20; // Filter by NYSE trading hours
  });

  for (const time of times) {
    const price = parseFloat(time['close']);
    const date = new Date(time['datetime']);
    const timeString = date.toLocaleTimeString('en-US', { hour12: false });
    formattedData.push({ time: timeString, price: price });
  }

  return (
    <div className='chart-container'>
      <AreaChart width={800} height={400} data={formattedData}>
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="time" type="category" allowDuplicatedCategory={false} reversed />
        <YAxis domain={[Math.min(...formattedData.map(d => d.price)), Math.max(...formattedData.map(d => d.price))]} />
        <CartesianGrid stroke="#ccc" />
        <Tooltip />
        <Area type="monotone" dataKey="price" stroke="#8884d8" fillOpacity={1} fill="url(#colorPrice)" />
      </AreaChart>
    </div>
  );
};

export default StockChart;


