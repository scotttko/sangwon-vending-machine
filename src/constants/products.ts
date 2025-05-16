import type { Payment } from '@/models/payments'
import type { Product } from '@/models/products'

export const PRODUCTS: Product[] = [
  { name: '콜라', value: 'coke', price: 1100 },
  { name: '물', value: 'water', price: 600 },
  { name: '커피', value: 'coffee', price: 700 },
]

export const PAYMENTS: Payment[] = [
  { id: 0, type: 'cash', balance: 100, quantity: 5 },
  { id: 1, type: 'cash', balance: 500, quantity: 5 },
  { id: 2, type: 'cash', balance: 1000, quantity: 5 },
  { id: 3, type: 'cash', balance: 5000, quantity: 5 },
  { id: 4, type: 'cash', balance: 10000, quantity: 5 },
  { id: 5, type: 'credit', balance: 5000 },
  { id: 6, type: 'debit', balance: 1000 },
]
