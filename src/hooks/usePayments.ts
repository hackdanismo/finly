import { useEffect, useState } from 'react'
import type { PaymentAccount, PaymentHistoryEntry, PaymentsState, RecurringPayment, Payee, IncomeRecord, Person } from '../types/payments'
import { loadPayments, savePayments } from '../services/paymentStorage'
const id = () => crypto.randomUUID()
const now = () => new Date().toISOString()
export function usePayments() {
  const [state, setState] = useState<PaymentsState>(loadPayments)
  useEffect(() => savePayments(state), [state])
  const addAccount = (account: Omit<PaymentAccount, 'id' | 'createdAt' | 'updatedAt' | 'archived'>) => { const stamp = now(); const record = { ...account, id: id(), createdAt: stamp, updatedAt: stamp, archived: false }; setState((s) => ({ ...s, accounts: [...s.accounts, record] })); return record }
  const updateAccount = (account: PaymentAccount) => setState((s) => ({ ...s, accounts: s.accounts.map((item) => item.id === account.id ? { ...account, updatedAt: now() } : item) }))
  const removeAccount = (accountId: string) => setState((s) => {
    const paymentIds = new Set(s.payments.filter((payment) => payment.accountId === accountId).map((payment) => payment.id))
    return {
      ...s,
      accounts: s.accounts.filter((account) => account.id !== accountId),
      payments: s.payments.filter((payment) => payment.accountId !== accountId && !paymentIds.has(payment.transferPaymentId ?? '')),
      history: s.history.filter((entry) => !paymentIds.has(entry.paymentId)),
      income: s.income.filter((income) => income.accountId !== accountId),
    }
  })
  const addPayment = (payment: Omit<RecurringPayment, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'revisions'>) => { const stamp = now(); const record: RecurringPayment = { ...payment, allocations: payment.allocations ?? [], id: id(), createdAt: stamp, updatedAt: stamp, status: 'active', revisions: [{ id: id(), effectiveDate: payment.startDate, amountInPence: payment.amountInPence, paymentDay: payment.paymentDay, accountId: payment.accountId, type: payment.type, startDate: payment.startDate }] }; setState((s) => ({ ...s, payments: [...s.payments, record], history: [...s.history, { id: id(), paymentId: record.id, timestamp: stamp, type: 'created', newValue: record.name }] })) }
  const updatePayment = (payment: RecurringPayment, previous: RecurringPayment) => { const stamp = now(); const changes: PaymentHistoryEntry[] = []; const check = (changed: boolean, type: PaymentHistoryEntry['type'], a: string, b: string) => { if (changed) changes.push({ id: id(), paymentId: payment.id, timestamp: stamp, type, previousValue: a, newValue: b }) }; check(payment.name !== previous.name, 'name_changed', previous.name, payment.name); check(payment.amountInPence !== previous.amountInPence, 'amount_changed', String(previous.amountInPence), String(payment.amountInPence)); check(payment.accountId !== previous.accountId, 'account_changed', previous.accountId, payment.accountId); check(payment.type !== previous.type, 'type_changed', previous.type, payment.type); check(payment.payeeId !== previous.payeeId, 'payee_changed', previous.payeeId ?? '', payment.payeeId ?? ''); check(payment.category !== previous.category, 'category_changed', previous.category, payment.category); check(payment.paymentDay !== previous.paymentDay || payment.startDate !== previous.startDate, 'date_changed', previous.startDate, payment.startDate); const currentMonth = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-01`; const revised = { ...payment, updatedAt: stamp, revisions: changes.length ? [...payment.revisions, { id: id(), effectiveDate: currentMonth, amountInPence: payment.amountInPence, paymentDay: payment.paymentDay, accountId: payment.accountId, type: payment.type, startDate: payment.startDate }] : payment.revisions }; setState((s) => ({ ...s, payments: s.payments.map((item) => item.id === payment.id ? revised : item), history: [...s.history, ...changes] })) }
  const deletePayment = (paymentId: string) => setState((s) => ({ ...s, payments: s.payments.filter((p) => p.id !== paymentId), history: s.history.filter((h) => h.paymentId !== paymentId) }))
  const setStatus = (payment: RecurringPayment, status: 'active' | 'cancelled') => { const stamp = now(); setState((s) => ({ ...s, payments: s.payments.map((item) => item.id === payment.id ? { ...item, status, cancelledAt: status === 'cancelled' ? stamp.slice(0, 10) : undefined, updatedAt: stamp } : item), history: [...s.history, { id: id(), paymentId: payment.id, timestamp: stamp, type: status === 'cancelled' ? 'cancelled' : 'reactivated' }] })) }
  const addPayee = (payee: Omit<Payee, 'id' | 'createdAt' | 'updatedAt'>) => { const stamp = now(); const record = { ...payee, id: id(), createdAt: stamp, updatedAt: stamp }; setState((s) => ({ ...s, payees: [...s.payees, record] })); return record }
  const updatePayee = (payee: Payee) => setState((s) => ({ ...s, payees: s.payees.map((p) => p.id === payee.id ? { ...payee, updatedAt: now() } : p) }))
  const deletePayee = (payeeId: string) => setState((s) => s.payments.some((p) => p.payeeId === payeeId) ? s : { ...s, payees: s.payees.filter((p) => p.id !== payeeId) })
  const addIncome = (income: Omit<IncomeRecord, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => { const stamp = now(); setState((s) => ({ ...s, income: [...s.income, { ...income, id: id(), createdAt: stamp, updatedAt: stamp, status: 'active' }] })) }
  const updateIncome = (income: IncomeRecord) => setState((s) => ({ ...s, income: s.income.map((i) => i.id === income.id ? { ...income, updatedAt: now() } : i) }))
  const deleteIncome = (incomeId: string) => setState((s) => ({ ...s, income: s.income.filter((i) => i.id !== incomeId) }))
  const addPerson = (person: Omit<Person, 'id'|'createdAt'|'updatedAt'>) => { const stamp = now(); const record = { ...person, id: id(), createdAt: stamp, updatedAt: stamp }; setState((s) => ({ ...s, people: [...s.people, record] })); return record }
  const updatePerson = (person: Person) => setState((s) => ({ ...s, people: s.people.map((p) => p.id === person.id ? { ...person, updatedAt: now() } : p) }))
  const deletePerson = (personId: string) => setState((s) => s.income.some((i) => i.personId === personId) || s.payments.some((p) => p.allocations.some((a) => a.personId === personId)) ? s : { ...s, people: s.people.filter((p) => p.id !== personId) })
  return { ...state, addAccount, updateAccount, removeAccount, addPayment, updatePayment, deletePayment, setStatus, addPayee, updatePayee, deletePayee, addIncome, updateIncome, deleteIncome, addPerson, updatePerson, deletePerson }
}
