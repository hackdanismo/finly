import type { PaymentsState, AccountType, RecurringPayment } from '../types/payments'
const key = 'finly-payments-v1'
const empty: PaymentsState = { version: 3, accounts: [], payments: [], history: [], payees: [], income: [], people: [] }
const validAccountType = (type: string): AccountType => type === 'joint' || type === 'other' ? type : 'personal'
export function loadPayments(): PaymentsState {
  try {
    const raw = localStorage.getItem(key); if (!raw) return empty
    const old = JSON.parse(raw) as Partial<PaymentsState> & { version?: number }
    if (!Array.isArray(old.accounts) || !Array.isArray(old.payments)) return empty
    const accounts = old.accounts.map((a) => ({ ...a, type: validAccountType(String(a.type)), updatedAt: a.updatedAt ?? a.createdAt, archived: Boolean(a.archived) }))
    const people = Array.isArray(old.people) ? old.people : []
    const payments = old.payments.map((p) => ({ ...p, payeeId: p.payeeId ?? null, category: p.category ?? 'other', revisions: p.revisions ?? [], allocations: Array.isArray(p.allocations) ? p.allocations : [] })) as RecurringPayment[]
    const income = Array.isArray(old.income) ? old.income.map((item) => ({ ...item, personId: item.personId ?? null })) : []
    return { version: 3, accounts, payments, history: Array.isArray(old.history) ? old.history : [], payees: Array.isArray(old.payees) ? old.payees : [], income, people }
  } catch { return empty }
}
export function savePayments(state: PaymentsState) { try { localStorage.setItem(key, JSON.stringify(state)) } catch { /* storage unavailable */ } }
const viewKey = 'finly-payments-view'
export const loadView = (): 'calendar' | 'list' => localStorage.getItem(viewKey) === 'calendar' ? 'calendar' : 'list'
export const saveView = (view: 'calendar' | 'list') => localStorage.setItem(viewKey, view)
