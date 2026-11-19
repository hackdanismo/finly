import { Icon } from '../Icon'
import type { SummaryMetric } from '../../data/mockData'
const money = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' })
export function SummaryCard({ metric }: { metric: SummaryMetric }) { return <article className="summary-card"><div className="summary-top"><span>{metric.label}</span><span className={`metric-icon ${metric.icon}`}><Icon name={metric.icon} size={19} /></span></div><strong>{money.format(metric.value)}</strong><p className={metric.trend}><span>{metric.trend === 'positive' ? '↗' : '•'}</span> {metric.detail}</p></article> }
