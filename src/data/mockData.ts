export type TransactionKind = 'income' | 'expense'
export interface SummaryMetric { label: string; value: number; detail: string; trend?: 'positive' | 'neutral' | 'negative'; icon: 'wallet' | 'income' | 'expense' | 'budget' }
export interface Transaction { name: string; category: string; date: string; amount: number; kind: TransactionKind; initials: string; tone: string }
export const summaryMetrics: SummaryMetric[] = [
  { label: 'Total balance', value: 12450, detail: '+8.2% from last month', trend: 'positive', icon: 'wallet' },
  { label: 'Monthly income', value: 4250, detail: '+5.4% from last month', trend: 'positive', icon: 'income' },
  { label: 'Monthly expenses', value: 2180, detail: '12.8% less than last month', trend: 'positive', icon: 'expense' },
  { label: 'Remaining budget', value: 2070, detail: '52% of monthly budget left', trend: 'neutral', icon: 'budget' },
]
export const cashFlowData = [
  { month: 'May', income: 3850, expenses: 2480 }, { month: 'Jun', income: 4100, expenses: 2250 }, { month: 'Jul', income: 3950, expenses: 2390 },
  { month: 'Aug', income: 4300, expenses: 2070 }, { month: 'Sep', income: 4150, expenses: 2280 }, { month: 'Oct', income: 4250, expenses: 2180 },
]
export const spendingCategories = [
  { name: 'Groceries', amount: 620, colour: '#4f67d8', percent: 28 }, { name: 'Shopping', amount: 410, colour: '#8d76d6', percent: 19 },
  { name: 'Transport', amount: 285, colour: '#59a9a0', percent: 13 }, { name: 'Bills', amount: 480, colour: '#e6a055', percent: 22 },
  { name: 'Subscriptions', amount: 185, colour: '#e27777', percent: 8 }, { name: 'Other', amount: 200, colour: '#aab3c4', percent: 10 },
]
export const recentTransactions: Transaction[] = [
  { name: 'Salary deposit', category: 'Income', date: '24 Oct 2024', amount: 4250, kind: 'income', initials: 'SD', tone: 'blue' },
  { name: 'Waitrose & Partners', category: 'Groceries', date: '23 Oct 2024', amount: 86.42, kind: 'expense', initials: 'W', tone: 'green' },
  { name: 'Netflix', category: 'Subscriptions', date: '21 Oct 2024', amount: 15.99, kind: 'expense', initials: 'N', tone: 'red' },
  { name: 'TfL Travel', category: 'Transport', date: '20 Oct 2024', amount: 42.5, kind: 'expense', initials: 'T', tone: 'purple' },
  { name: 'John Lewis', category: 'Shopping', date: '18 Oct 2024', amount: 129.99, kind: 'expense', initials: 'JL', tone: 'orange' },
]
