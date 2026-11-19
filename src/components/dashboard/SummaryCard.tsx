import { Icon } from '../Icon'
import { useEffect, useState } from 'react'
import type { SummaryMetric } from '../../data/mockData'
import { parsePounds } from '../../utils/currency'
const money = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' })
type SummaryCardProps = { metric: SummaryMetric; onValueChange?: (value: number) => void }
export function SummaryCard({ metric, onValueChange }: SummaryCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(String(metric.value))
  const [error, setError] = useState('')
  useEffect(() => { if (!isOpen) return; const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setIsOpen(false) }; document.addEventListener('keydown', closeOnEscape); return () => document.removeEventListener('keydown', closeOnEscape) }, [isOpen])
  const save = () => { const pence = parsePounds(value); if (pence === null) { setError('Enter a valid amount, such as £4,250.00.'); return }; onValueChange?.(pence / 100); setIsOpen(false); setError('') }
  const card = <article className={`summary-card${onValueChange ? ' is-editable' : ''}`}><div className="summary-top"><span>{metric.label}</span><span className={`metric-icon ${metric.icon}`}><Icon name={metric.icon} size={19} /></span></div><strong>{money.format(metric.value)}</strong><p className={metric.trend}><span>{metric.trend === 'positive' ? '↗' : '•'}</span> {metric.detail}</p></article>
  return onValueChange ? <><button className="summary-card-button" type="button" onClick={() => setIsOpen(true)} aria-label={`Edit ${metric.label}`}>{card}</button>{isOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsOpen(false) }}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="income-modal-title"><div className="modal-header"><div><p className="section-kicker">MONTHLY SUMMARY</p><h2 id="income-modal-title">Edit income</h2></div><button className="modal-close" type="button" onClick={() => setIsOpen(false)} aria-label="Close edit income dialog"><Icon name="close" size={18} /></button></div><label htmlFor="income-value">Monthly income</label><div className="currency-input"><span>£</span><input id="income-value" type="text" inputMode="decimal" value={value} onChange={(event) => { setValue(event.target.value); setError('') }} autoFocus aria-describedby={error ? 'income-error' : undefined} /></div>{error && <p className="form-error" id="income-error">{error}</p>}<div className="modal-actions"><button className="secondary-button" type="button" onClick={() => setIsOpen(false)}>Cancel</button><button className="primary-button" type="button" onClick={save}>Save income</button></div></div></div>}</> : card
}
