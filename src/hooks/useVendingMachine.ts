import { PAYMENTS } from '@/constants/products'
import type { InsertedPayment, Payment, PaymentType } from '@/models/payments'
import type { Product, PurchasedProduct } from '@/models/products'
import { calculateChange, delay } from '@/utils/common'
import { useCallback, useState } from 'react'

function useVendingMachine() {
  const [payments, setPayments] = useState<Payment[]>(PAYMENTS)

  const [isCardPayLoading, setIsCardPayLoading] = useState(false)

  const [insertedPayment, setInsertedPayment] = useState<InsertedPayment | null>(null)
  const [purchasedProducts, setPurchasedProducts] = useState<PurchasedProduct[]>([])

  const handleInsertPayment = (type: PaymentType, amount: number) => {
    if (type === 'cash') {
      setPayments((prev) =>
        prev.map((pay) =>
          pay.balance === amount && pay.quantity && pay.quantity > 0
            ? { ...pay, quantity: pay.quantity - 1 }
            : pay,
        ),
      )
    }

    setInsertedPayment((prev) => ({
      type,
      amount: (prev?.type === type && prev?.amount ? prev.amount : 0) + amount,
    }))
  }

  const updatePurchasedProducts = (product: Product) => {
    setPurchasedProducts((prev) => {
      const productIndex = prev.findIndex((prevProduct) => prevProduct.value === product.value)

      return productIndex === -1
        ? [...prev, { ...product, quantity: 1 }]
        : prev.map((prevProduct) =>
            prevProduct.value === product.value
              ? { ...prevProduct, quantity: prevProduct.quantity + 1 }
              : prevProduct,
          )
    })
  }

  const cashPay = useCallback(async (product: Product) => {
    setInsertedPayment((prev) =>
      prev && prev.amount >= product.price
        ? { ...prev, amount: prev.amount - product.price }
        : null,
    )

    updatePurchasedProducts(product)
  }, [])

  const cardPay = useCallback(
    async (type: PaymentType, product: Product) => {
      setIsCardPayLoading(true)

      await delay(2000)

      if (insertedPayment && insertedPayment.amount >= product.price) {
        updatePurchasedProducts(product)

        setPayments((prev) =>
          prev.map((pay) =>
            pay.type === type && pay.balance > 0
              ? { ...pay, balance: pay.balance - product.price }
              : pay,
          ),
        )
      } else {
        alert('카드 잔액이 부족합니다.')
      }

      setInsertedPayment(null)
      setIsCardPayLoading(false)
    },
    [insertedPayment],
  )

  const handlePurchaseProduct = useCallback(
    async (type: PaymentType, product: Product) => {
      if (type === 'cash') {
        cashPay(product)
      } else {
        cardPay(type, product)
      }
    },
    [cardPay, cashPay],
  )

  const handleCalculateChange = (amount: number) => {
    const change = calculateChange(
      amount,
      PAYMENTS.filter((pay) => pay.type === 'cash')
        .map((payment) => payment.balance)
        .reverse(),
    )

    if (change) {
      setPayments((prev) =>
        prev.map((pay) =>
          pay.type === 'cash' && !!pay.quantity
            ? { ...pay, quantity: pay.quantity + (change[pay.balance] ?? 0) }
            : pay,
        ),
      )
      setInsertedPayment(null)
    }
  }

  return {
    payments,
    insertedPayment,
    purchasedProducts,
    isLoading: isCardPayLoading,
    onInsertPayment: handleInsertPayment,
    onPurchaseProduct: handlePurchaseProduct,
    onCalculateChange: handleCalculateChange,
  }
}

export default useVendingMachine
