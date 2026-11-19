import { summaryMetrics } from '../data/mockData'
import { SummaryCard } from '../components/dashboard/SummaryCard'
import { CashFlowChart } from '../components/dashboard/CashFlowChart'
import { SpendingBreakdown } from '../components/dashboard/SpendingBreakdown'
import { RecentTransactions } from '../components/dashboard/RecentTransactions'
export function Dashboard() { return <div className="dashboard"><section className="summary-grid" aria-label="Financial summary">{summaryMetrics.map((metric) => <SummaryCard metric={metric} key={metric.label} />)}</section><section className="dashboard-grid"><CashFlowChart /><SpendingBreakdown /><RecentTransactions /></section></div> }
