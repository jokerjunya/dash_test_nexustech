import { useState } from 'react';
import { motion } from 'framer-motion';
import { regionData } from '../data/dashboardData';

// 地域データの型定義
interface RegionData {
  id: string;
  name: string;
  value: number;
  growth: number;
}

const RegionMap = () => {
  const [hoveredRegion, setHoveredRegion] = useState<RegionData | null>(null);
  
  // 地域を売上の降順でソート
  const sortedRegions = [...regionData].sort((a, b) => b.value - a.value);
  
  // 地域の合計売上を計算
  const totalValue = regionData.reduce((sum, region) => sum + region.value, 0);
  
  // 成長率に基づく色を取得
  const getGrowthColor = (growth: number) => {
    if (growth >= 30) return 'bg-green-500';
    if (growth >= 15) return 'bg-green-400';
    if (growth >= 10) return 'bg-green-300';
    if (growth >= 5) return 'bg-blue-400';
    return 'bg-blue-300';
  };
  
  // 成長率のテキスト色を取得
  const getGrowthTextColor = (growth: number) => {
    if (growth >= 30) return 'text-green-500';
    if (growth >= 15) return 'text-green-400';
    if (growth >= 10) return 'text-green-300';
    if (growth >= 5) return 'text-blue-400';
    return 'text-blue-300';
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">地域別売上分布</h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          合計: {totalValue}億円
        </div>
      </div>
      
      <div className="space-y-3">
        {sortedRegions.map((region, index) => {
          const percentage = (region.value / totalValue) * 100;
          const isHovered = hoveredRegion?.id === region.id;
          
          return (
            <motion.div 
              key={region.id}
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onMouseEnter={() => setHoveredRegion(region)}
              onMouseLeave={() => setHoveredRegion(null)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <span className="font-medium">{region.name}</span>
                  <span className={`ml-2 text-sm ${getGrowthTextColor(region.growth)}`}>
                    {region.growth > 0 ? '+' : ''}{region.growth}%
                  </span>
                </div>
                <span className="text-sm font-medium">{region.value}億円</span>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <motion.div 
                  className={`h-full rounded-full ${getGrowthColor(region.growth)}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.5, delay: index * 0.05 + 0.2 }}
                />
              </div>
              
              {isHovered && (
                <motion.div 
                  className="absolute right-0 -top-1 text-xs text-gray-500 dark:text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {percentage.toFixed(1)}%
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
          <h3 className="text-sm font-medium mb-2">成長率トップ3</h3>
          <div className="space-y-2">
            {[...regionData].sort((a, b) => b.growth - a.growth).slice(0, 3).map((region) => (
              <div key={region.id} className="flex justify-between items-center">
                <span className="text-sm">{region.name}</span>
                <span className={`text-sm font-medium ${getGrowthTextColor(region.growth)}`}>
                  +{region.growth}%
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
          <h3 className="text-sm font-medium mb-2">売上トップ3</h3>
          <div className="space-y-2">
            {sortedRegions.slice(0, 3).map((region) => (
              <div key={region.id} className="flex justify-between items-center">
                <span className="text-sm">{region.name}</span>
                <span className="text-sm font-medium">{region.value}億円</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionMap; 