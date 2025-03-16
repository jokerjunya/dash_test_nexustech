import { kpiData } from '../data/dashboardData';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

interface KpiCardProps {
  title: string;
  value: number;
  unit?: string;
  growth: number;
  comparison?: { label: string; value: number };
  format?: (value: number) => string;
  index: number;
}

const KpiCard: React.FC<KpiCardProps> = ({ 
  title, 
  value, 
  unit = '', 
  growth, 
  comparison,
  format = (val) => val.toLocaleString(),
  index
}) => {
  // 目標達成率の計算（比較対象がある場合）
  const getProgressPercentage = () => {
    if (!comparison) return null;
    
    // 目標の場合は現在値/目標値
    if (comparison.label === '目標') {
      return Math.min(100, (value / comparison.value) * 100);
    }
    
    // 業界平均や競合の場合は、現在値と比較値の差を表現
    return Math.min(100, Math.max(0, ((value - comparison.value) / comparison.value) * 100 + 50));
  };

  const progressPercentage = getProgressPercentage();
  
  return (
    <motion.div 
      className="stat-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5, boxShadow: "0 12px 20px -5px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h3>
        <motion.div 
          className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${growth >= 0 ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2, delay: index * 0.1 + 0.2 }}
        >
          {growth >= 0 ? (
            <ArrowUpIcon className="h-3 w-3 mr-1" />
          ) : (
            <ArrowDownIcon className="h-3 w-3 mr-1" />
          )}
          <span>{Math.abs(growth).toFixed(1)}%</span>
        </motion.div>
      </div>
      
      <div className="stat-value mb-3">
        {format(value)}{unit}
      </div>
      
      {progressPercentage !== null && (
        <div className="mt-2 mb-1">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <motion.div 
              className={`h-full rounded-full ${comparison?.label === '目標' ? 'bg-primary' : growth >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.3, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>{comparison?.label}: {format(comparison?.value || 0)}{unit}</span>
            {comparison?.label.includes('競合') && value > comparison?.value && (
              <span className="text-green-500 font-medium">優位</span>
            )}
            {comparison?.label === '目標' && comparison.value && (
              <span className="font-medium">{Math.round((value / comparison.value) * 100)}%</span>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

const KpiCards = () => {
  const formatPercent = (value: number) => value.toFixed(1);
  const formatCurrency = (value: number) => value.toLocaleString();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KpiCard 
        title="顧客数" 
        value={kpiData.customers.current}
        growth={kpiData.customers.growth}
        comparison={{ label: '目標', value: kpiData.customers.target }}
        index={0}
      />
      
      <KpiCard 
        title="リピート率" 
        value={kpiData.repeatRate.current}
        unit="%"
        growth={kpiData.repeatRate.growth}
        comparison={{ label: '業界平均', value: kpiData.repeatRate.industry }}
        format={formatPercent}
        index={1}
      />
      
      <KpiCard 
        title="顧客生涯価値 (LTV)" 
        value={kpiData.ltv.current}
        unit="万円"
        growth={kpiData.ltv.growth}
        comparison={{ label: '主要競合', value: kpiData.ltv.competitor }}
        format={formatCurrency}
        index={2}
      />
      
      <KpiCard 
        title="コンバージョン率" 
        value={kpiData.conversionRate.current}
        unit="%"
        growth={kpiData.conversionRate.growth}
        comparison={{ label: '業界平均', value: kpiData.conversionRate.industry }}
        format={formatPercent}
        index={3}
      />
    </div>
  );
};

export default KpiCards; 