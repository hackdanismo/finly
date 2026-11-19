export type AccountType = 'personal' | 'joint' | 'other'
export type PaymentType = 'direct_debit' | 'standing_order' | 'transfer'
export type PaymentStatus = 'active' | 'cancelled'
export type PaymentCategory = string
export type PayeeType = 'company' | 'organisation' | 'individual' | 'other'
export interface PaymentAccount { id: string; name: string; type: AccountType; colour: string; noIncome: boolean; createdAt: string; updatedAt: string; archived: boolean }
export interface Payee { id: string; name: string; type: PayeeType; reference?: string; notes?: string; createdAt: string; updatedAt: string }
export interface PaymentRevision { id: string; effectiveDate: string; amountInPence: number; paymentDay: number; accountId: string; type: PaymentType; startDate: string }
export interface Person { id: string; name: string; createdAt: string; updatedAt: string }
export interface BillAllocation { personId: string; percentage: number }
export interface IncomeRecord { id: string; name: string; personId: string | null; personName?: string; accountId: string; amountInPence: number; expectedDay: number; startDate: string; endDate?: string; notes?: string; status: 'active' | 'inactive'; createdAt: string; updatedAt: string }
export interface RecurringPayment extends Omit<RecurringPaymentBase, 'allocations'> { allocations: BillAllocation[] }
interface RecurringPaymentBase { id: string; name: string; type: PaymentType; accountId: string; payeeId: string | null; category: PaymentCategory; amountInPence: number; frequency: 'monthly'; paymentDay: number; startDate: string; status: PaymentStatus; cancelledAt?: string; notes?: string; createdAt: string; updatedAt: string; revisions: PaymentRevision[]; allocations?: BillAllocation[]; transferPaymentId?: string; transferPercentage?: number }
export type PaymentHistoryType = 'created' | 'amount_changed' | 'date_changed' | 'account_changed' | 'type_changed' | 'name_changed' | 'payee_changed' | 'category_changed' | 'cancelled' | 'reactivated'
export interface PaymentHistoryEntry { id: string; paymentId: string; timestamp: string; type: PaymentHistoryType; previousValue?: string; newValue?: string }
export interface PaymentsState { version: 3; accounts: PaymentAccount[]; payments: RecurringPayment[]; history: PaymentHistoryEntry[]; payees: Payee[]; income: IncomeRecord[]; people: Person[] }
