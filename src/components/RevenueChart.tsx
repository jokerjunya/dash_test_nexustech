import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { revenueData, forecastData } from '../data/dashboardData';

const combinedData = [
  ...revenueData,
  ...forecastData.filter(item => item.forecast)
];

const RevenueChart = () => {
  const formatYAxis = (value: number) => {
    if (value >= 1000) {
      return `${value / 1000}K`;
    }
    return value;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const isForecast = payload[0].payload.forecast;
      
      return (
        <div className="bg-white dark:bg-dark-lighter p-3 border border-gray-200 dark:border-gray-700 rounded shadow-lg">
          <p className="font-semibold">{`${label}年`}</p>
          <p className="text-primary">
            <span className="font-medium">売上: </span>
            <span>{`${payload[0].value}M円`}</span>
            {isForecast && <span className="ml-2 text-xs text-orange-500">(予測)</span>}
          </p>
          {!isForecast && (
            <p className="text-secondary">
              <span className="font-medium">成長率: </span>
              <span>{`${payload[1]?.value}%`}</span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card h-full">
      <h2 className="text-lg font-semibold mb-4">売上推移（単位: 百万円）</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={combinedData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F97316" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#F97316" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              dataKey="year" 
              tick={{ fill: '#6B7280' }}
            />
            <YAxis 
              tickFormatter={formatYAxis} 
              tick={{ fill: '#6B7280' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#3B82F6" 
              fillOpacity={1}
              fill="url(#colorRevenue)" 
              name="売上"
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="growth" 
              stroke="#10B981" 
              fill="none"
              name="成長率 (%)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        <p className="font-medium text-orange-500">インサイト:</p>
        <p>直近1年で急成長しており、来年度は前年比+25%の成長が見込まれます。</p>
      </div>
    </div>
  );
};

export default RevenueChart; 