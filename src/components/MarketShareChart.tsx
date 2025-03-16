import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { marketShareData } from '../data/dashboardData';

const MarketShareChart = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-dark-lighter p-3 border border-gray-200 dark:border-gray-700 rounded shadow-lg">
          <p className="font-semibold">{`${label}年`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              <span className="font-medium">{entry.name}: </span>
              <span>{`${entry.value}%`}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // 前年からの変化を計算
  const getYearOverYearChange = () => {
    if (marketShareData.length < 2) return null;
    
    const currentYear = marketShareData[marketShareData.length - 1];
    const previousYear = marketShareData[marketShareData.length - 2];
    
    return {
      nexustech: {
        value: currentYear.nexustech - previousYear.nexustech,
        isPositive: currentYear.nexustech > previousYear.nexustech
      },
      competitorB: {
        value: currentYear.competitorB - previousYear.competitorB,
        isPositive: currentYear.competitorB > previousYear.competitorB
      }
    };
  };

  const changes = getYearOverYearChange();

  return (
    <div className="card h-full">
      <h2 className="text-lg font-semibold mb-4">市場シェア比較</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={marketShareData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="nexustech" name="NexusTech" fill="#3B82F6" />
            <Bar dataKey="competitorA" name="競合A社" fill="#64748B" />
            <Bar dataKey="competitorB" name="競合B社" fill="#F43F5E" />
            <Bar dataKey="competitorC" name="競合C社" fill="#8B5CF6" />
            <Bar dataKey="others" name="その他" fill="#D1D5DB" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {changes && (
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          <p className="font-medium text-orange-500">インサイト:</p>
          <p>
            当社は前年比
            <span className="text-primary font-medium"> +{changes.nexustech.value}% </span>
            のシェア拡大に成功。一方、競合B社は
            <span className="text-red-500 font-medium"> {changes.competitorB.value}% </span>
            のシェアを失っており、今が攻めるチャンスです。
          </p>
        </div>
      )}
    </div>
  );
};

export default MarketShareChart; 