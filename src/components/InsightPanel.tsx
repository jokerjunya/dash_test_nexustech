import { 
  ChartBarIcon, 
  GlobeAsiaAustraliaIcon, 
  UserGroupIcon, 
  ArrowTrendingUpIcon 
} from '@heroicons/react/24/outline';

const InsightPanel = () => {
  const insights = [
    {
      title: '東南アジア市場での急成長',
      description: '東南アジア市場での急成長が競争優位の要因となっています。特にベトナム(+52.6%)とインドネシア(+45.2%)が注目です。',
      icon: GlobeAsiaAustraliaIcon,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      title: 'リピート率の優位性',
      description: 'リピート率が競合平均を10.3%上回っており、LTVを最大化する戦略が可能です。顧客維持コストの効率化が進んでいます。',
      icon: UserGroupIcon,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      title: '競合B社の市場シェア低下',
      description: '競合B社が市場シェアを3%失っており、今が攻めるチャンスです。特に彼らの主要顧客セグメントへのアプローチを強化すべきです。',
      icon: ChartBarIcon,
      color: 'text-red-500',
      bgColor: 'bg-red-100 dark:bg-red-900/30'
    },
    {
      title: '来年度の成長予測',
      description: 'マーケットシフトを予測し、来年度の売上を前年比+25%成長と想定しています。この成長に向けた投資計画の策定が必要です。',
      icon: ArrowTrendingUpIcon,
      color: 'text-amber-500',
      bgColor: 'bg-amber-100 dark:bg-amber-900/30'
    }
  ];

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4">主要インサイト</h2>
      
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="flex p-3 rounded-lg bg-gray-50 dark:bg-dark-lightest">
            <div className={`p-2 rounded-full ${insight.bgColor} mr-3 h-10 w-10 flex items-center justify-center flex-shrink-0`}>
              <insight.icon className={`h-5 w-5 ${insight.color}`} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">{insight.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{insight.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
        <p className="italic">これらのインサイトは、経営陣の意思決定をサポートするために、最新のデータ分析に基づいて生成されています。</p>
      </div>
    </div>
  );
};

export default InsightPanel; 