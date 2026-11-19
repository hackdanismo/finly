import { summaryMetrics } from '../data/mockData'
import { useState } from 'react'
import { SummaryCard } from '../components/dashboard/SummaryCard'
import { CashFlowChart } from '../components/dashboard/CashFlowChart'
import { SpendingBreakdown } from '../components/dashboard/SpendingBreakdown'
import { RecentTransactions } from '../components/dashboard/RecentTransactions'
export function Dashboard() {
  const [income, setIncome] = useState(summaryMetrics.find((metric) => metric.icon === 'income')?.value ?? 0)
  return <div className="dashboard"><section className="summary-grid" aria-label="Financial summary">{summaryMetrics.map((metric) => <SummaryCard metric={metric.icon === 'income' ? { ...metric, value: income } : metric} key={metric.label} onValueChange={metric.icon === 'income' ? setIncome : undefined} />)}</section><section className="dashboard-grid"><CashFlowChart /><SpendingBreakdown /><RecentTransactions /></section></div>
}
