export type CashUnit = 100 | 500 | 1000 | 5000 | 10000

export type CardType = 'credit' | 'debit'
export type PaymentType = CardType | 'cash'

export interface Payment {
  id: number
  type: PaymentType
  balance: number
  quantity?: number
}

export interface InsertedPayment {
  type: PaymentType
  amount: number
}
