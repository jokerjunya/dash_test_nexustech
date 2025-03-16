import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateRandomData, generateTimeSeriesData } from '../data/dashboardData';
import { UserIcon, ShoppingCartIcon, CurrencyYenIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// データポイントの数
const TIME_SERIES_OPTIONS = [
  { value: 10, label: '10分' },
  { value: 30, label: '30分' },
  { value: 60, label: '1時間' }
];

const RealtimeData = () => {
  const [data, setData] = useState(generateRandomData());
  const [prevData, setPrevData] = useState(data);
  const [timeSeriesLength, setTimeSeriesLength] = useState(TIME_SERIES_OPTIONS[0].value);
  const [timeSeriesData, setTimeSeriesData] = useState(generateTimeSeriesData(timeSeriesLength));
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [selectedMetric, setSelectedMetric] = useState<string>('activeUsers');

  // 時間軸の変更時にデータを再生成
  useEffect(() => {
    setTimeSeriesData(generateTimeSeriesData(timeSeriesLength));
  }, [timeSeriesLength]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevData(data);
      const newData = generateRandomData();
      setData(newData);
      
      // 時系列データを更新
      setTimeSeriesData(prevTimeSeries => {
        const now = new Date();
        const newTimePoint = {
          time: now.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
          activeUsers: newData.activeUsers,
          transactions: newData.transactions,
          conversionRate: parseFloat(newData.conversionRate),
          averageOrderValue: newData.averageOrderValue,
        };
        
        // 最も古いデータを削除し、新しいデータを追加
        const updatedTimeSeries = [...prevTimeSeries.slice(1), newTimePoint];
        return updatedTimeSeries;
      });
      
      setLastUpdated(new Date());
    }, 5000); // 5秒ごとに更新
    
    return () => clearInterval(interval);
  }, [data]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ja-JP', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const getChangeColor = (current: number, previous: number) => {
    if (current > previous) return 'text-green-500';
    if (current < previous) return 'text-red-500';
    return 'text-gray-500 dark:text-gray-400';
  };

  const metrics = [
    {
      id: 'activeUsers',
      name: 'アクティブユーザー',
      value: data.activeUsers,
      prevValue: prevData.activeUsers,
      icon: UserIcon,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      lineColor: '#3B82F6',
      formatter: (value: number) => `${value.toLocaleString()}人`
    },
    {
      id: 'transactions',
      name: '現在のトランザクション',
      value: data.transactions,
      prevValue: prevData.transactions,
      icon: ShoppingCartIcon,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      lineColor: '#8B5CF6',
      formatter: (value: number) => `${value.toLocaleString()}件`
    },
    {
      id: 'conversionRate',
      name: 'コンバージョン率',
      value: parseFloat(data.conversionRate),
      prevValue: parseFloat(prevData.conversionRate),
      suffix: '%',
      icon: ArrowTrendingUpIcon,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      lineColor: '#10B981',
      formatter: (value: number) => `${value.toFixed(1)}%`
    },
    {
      id: 'averageOrderValue',
      name: '平均注文額',
      value: data.averageOrderValue,
      prevValue: prevData.averageOrderValue,
      suffix: '万円',
      icon: CurrencyYenIcon,
      color: 'text-amber-500',
      bgColor: 'bg-amber-100 dark:bg-amber-900/30',
      lineColor: '#F59E0B',
      formatter: (value: number) => `${value.toLocaleString()}万円`
    }
  ];

  // 選択されたメトリックの情報を取得
  const selectedMetricInfo = metrics.find(m => m.id === selectedMetric) || metrics[0];

  // メトリックに応じたY軸のドメインを取得
  const getYAxisDomain = () => {
    switch (selectedMetric) {
      case 'activeUsers':
        return [0, 'auto'] as [number, string];
      case 'transactions':
        return [0, 'auto'] as [number, string];
      case 'conversionRate':
        return [0, 'auto'] as [number, string];
      case 'averageOrderValue':
        return [0, 'auto'] as [number, string];
      default:
        return [0, 'auto'] as [number, string];
    }
  };

  // カスタムツールチップ
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-2 border border-gray-200 dark:border-gray-700 rounded shadow-md text-sm">
          <p className="font-medium">{label}</p>
          <p className="text-sm" style={{ color: selectedMetricInfo.lineColor }}>
            {selectedMetricInfo.name}: {selectedMetricInfo.formatter(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">リアルタイムデータ</h2>
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse-slow"></div>
          最終更新: {formatTime(lastUpdated)}
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <motion.div 
            key={index} 
            className={`glassmorphism rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600/50 cursor-pointer ${selectedMetric === metric.id ? 'ring-2 ring-primary' : ''}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            onClick={() => setSelectedMetric(metric.id)}
          >
            <div className="flex items-center p-4">
              <div className={`p-2 rounded-full ${metric.bgColor} mr-3`}>
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{metric.name}</div>
                <div className="flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={metric.value}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="font-semibold"
                    >
                      {typeof metric.value === 'number' ? metric.value : metric.value}
                      {metric.suffix}
                    </motion.div>
                  </AnimatePresence>
                  {metric.value !== metric.prevValue && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`ml-2 text-xs ${getChangeColor(metric.value, metric.prevValue)}`}
                    >
                      {metric.value > metric.prevValue ? '↑' : '↓'}
                    </motion.span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mt-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">{selectedMetricInfo.name}の推移</h3>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">表示期間:</span>
            <div className="flex rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
              {TIME_SERIES_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  className={`px-2 py-1 text-xs font-medium ${
                    timeSeriesLength === option.value
                      ? 'bg-primary text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => setTimeSeriesLength(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={timeSeriesData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.1)" />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12 }} 
                stroke="rgba(128, 128, 128, 0.3)"
                interval="preserveStartEnd"
                minTickGap={30}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                stroke="rgba(128, 128, 128, 0.3)"
                domain={getYAxisDomain()}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey={selectedMetric}
                stroke={selectedMetricInfo.lineColor}
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
                isAnimationActive={true}
                animationDuration={500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RealtimeData; 