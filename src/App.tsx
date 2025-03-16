import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import RevenueChart from './components/RevenueChart'
import KpiCards from './components/KpiCards'
import MarketShareChart from './components/MarketShareChart'
import RealtimeData from './components/RealtimeData'
import InsightPanel from './components/InsightPanel'
import RegionMap from './components/RegionMap'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  // ダークモードの設定を保存・読み込み
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(savedDarkMode)
    
    if (savedDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  // ダークモードの切り替え
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', String(newDarkMode))
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#111827] dark:to-[#0F172A] grid-bg">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-4 py-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <RealtimeData />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <KpiCards />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
        >
          <RegionMap />
          <InsightPanel />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
        >
          <RevenueChart />
          <MarketShareChart />
        </motion.div>
      </main>
      
      <footer className="bg-white/80 dark:bg-[#1F2937]/80 backdrop-blur-sm py-4 px-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700/30">
        <p>© 2024 NexusTech Inc. All rights reserved.</p>
        <p className="text-xs mt-1">このダッシュボードは経営判断のためのデータ可視化ツールです。</p>
      </footer>
    </div>
  )
}

export default App
