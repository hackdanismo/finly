export type AccountType = 'personal' | 'partner' | 'joint' | 'other'
export type PaymentType = 'direct_debit' | 'standing_order'
export type PaymentStatus = 'active' | 'cancelled'

export interface PaymentAccount { id: string; name: string; type: AccountType; colour: string; createdAt: string; archived: boolean }
export interface PaymentRevision { id: string; effectiveDate: string; amountInPence: number; paymentDay: number; accountId: string; type: PaymentType; startDate: string }
export interface RecurringPayment { id: string; name: string; type: PaymentType; accountId: string; amountInPence: number; frequency: 'monthly'; paymentDay: number; startDate: string; status: PaymentStatus; cancelledAt?: string; notes?: string; createdAt: string; updatedAt: string; revisions: PaymentRevision[] }
export type PaymentHistoryType = 'created' | 'amount_changed' | 'date_changed' | 'account_changed' | 'type_changed' | 'cancelled' | 'reactivated' | 'name_changed'
export interface PaymentHistoryEntry { id: string; paymentId: string; timestamp: string; type: PaymentHistoryType; previousValue?: string; newValue?: string }
export interface PaymentsState { version: 1; accounts: PaymentAccount[]; payments: RecurringPayment[]; history: PaymentHistoryEntry[] }
