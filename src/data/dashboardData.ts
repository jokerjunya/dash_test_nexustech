// 売上推移データ（過去5年）
export const revenueData = [
  { year: 2019, revenue: 120, growth: 5 },
  { year: 2020, revenue: 135, growth: 12.5 },
  { year: 2021, revenue: 160, growth: 18.5 },
  { year: 2022, revenue: 195, growth: 21.9 },
  { year: 2023, revenue: 250, growth: 28.2 },
];

// KPIデータ
export const kpiData = {
  customers: {
    current: 12500,
    previous: 9800,
    growth: 27.6,
    target: 13000,
  },
  repeatRate: {
    current: 68.5,
    previous: 62.3,
    growth: 9.9,
    industry: 58.2,
  },
  ltv: {
    current: 4850,
    previous: 4200,
    growth: 15.5,
    competitor: 3950,
  },
  conversionRate: {
    current: 3.8,
    previous: 3.2,
    growth: 18.8,
    industry: 2.9,
  },
};

// 地域別売上データ
export const regionData = [
  { id: "JP", name: "日本", value: 68, growth: 12.5 },
  { id: "CN", name: "中国", value: 45, growth: 18.2 },
  { id: "SG", name: "シンガポール", value: 32, growth: 35.8 },
  { id: "MY", name: "マレーシア", value: 28, growth: 42.3 },
  { id: "TH", name: "タイ", value: 25, growth: 38.9 },
  { id: "ID", name: "インドネシア", value: 22, growth: 45.2 },
  { id: "VN", name: "ベトナム", value: 18, growth: 52.6 },
  { id: "US", name: "アメリカ", value: 55, growth: 8.3 },
  { id: "UK", name: "イギリス", value: 38, growth: 6.5 },
  { id: "DE", name: "ドイツ", value: 32, growth: 5.8 },
  { id: "FR", name: "フランス", value: 28, growth: 4.2 },
  { id: "AU", name: "オーストラリア", value: 22, growth: 9.6 },
];

// 市場シェアデータ
export const marketShareData = [
  { year: 2021, nexustech: 18, competitorA: 25, competitorB: 22, competitorC: 15, others: 20 },
  { year: 2022, nexustech: 22, competitorA: 24, competitorB: 20, competitorC: 16, others: 18 },
  { year: 2023, nexustech: 28, competitorA: 23, competitorB: 17, competitorC: 16, others: 16 },
];

// 予測データ
export const forecastData = [
  { year: 2023, revenue: 250, forecast: false },
  { year: 2024, revenue: 312.5, forecast: true },
  { year: 2025, revenue: 390.6, forecast: true },
];

// リアルタイムデータ更新のシミュレーション用
export const generateRandomData = () => {
  return {
    activeUsers: Math.floor(Math.random() * 5000) + 45000,
    transactions: Math.floor(Math.random() * 500) + 3500,
    conversionRate: (Math.random() * 0.8 + 7.2).toFixed(1),
    averageOrderValue: Math.floor(Math.random() * 50) + 250,
  };
};

// リアルタイムデータの履歴用
export const generateTimeSeriesData = (count: number) => {
  const now = new Date();
  const data = [];
  
  // 時間間隔を調整（データポイント数に応じて）
  let timeInterval = 60000; // デフォルト1分
  if (count > 20) {
    timeInterval = 120000; // 2分
  }
  if (count > 40) {
    timeInterval = 180000; // 3分
  }
  
  for (let i = count - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * timeInterval);
    
    // 基本値 + ランダム変動 + 時間帯による変動（時間が進むにつれて少し上昇）
    const timeProgress = (count - i) / count; // 0～1の進行度
    const trendFactor = 1 + (timeProgress * 0.1); // 時間経過で最大10%上昇
    
    data.push({
      time: time.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
      activeUsers: Math.floor((Math.random() * 5000 + 45000) * trendFactor),
      transactions: Math.floor((Math.random() * 500 + 3500) * trendFactor),
      conversionRate: parseFloat(((Math.random() * 0.8 + 7.2) * trendFactor).toFixed(1)),
      averageOrderValue: Math.floor((Math.random() * 50 + 250) * trendFactor),
    });
  }
  
  return data;
}; 