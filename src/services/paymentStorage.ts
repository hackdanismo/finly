import type { PaymentsState } from '../types/payments'
const key = 'finly-payments-v1'
const empty: PaymentsState = { version: 1, accounts: [], payments: [], history: [] }
export function loadPayments(): PaymentsState { try { const raw = localStorage.getItem(key); if (!raw) return empty; const data = JSON.parse(raw) as PaymentsState; if (data.version !== 1 || !Array.isArray(data.accounts) || !Array.isArray(data.payments)) return empty; return { ...empty, ...data, history: Array.isArray(data.history) ? data.history : [] } } catch { return empty } }
export function savePayments(state: PaymentsState) { try { localStorage.setItem(key, JSON.stringify(state)) } catch { /* Storage may be unavailable; UI remains usable. */ } }
const viewKey = 'finly-payments-view'
export const loadView = () => localStorage.getItem(viewKey) === 'list' ? 'list' : 'calendar'
export const saveView = (view: 'calendar' | 'list') => localStorage.setItem(viewKey, view)
