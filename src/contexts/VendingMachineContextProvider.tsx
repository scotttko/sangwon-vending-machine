import { PAYMENTS } from '@/constants/products'
import type { InsertedPayment, Payment, PaymentType } from '@/models/payments'
import type { Product, PurchasedProduct } from '@/models/products'
import { delay } from '@/utils/common'
import { calculateChange } from '@/utils/vending-machine'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

interface VendingMachineValueContext {
  payments: Payment[]
  insertedPayment: InsertedPayment | null
  purchasedProducts: PurchasedProduct[]
  isLoading: boolean
}

interface VendingMachineActionContext {
  insertPayment: (type: PaymentType, amount: number) => void
  buyProduct: (type: PaymentType, product: Product) => void
  calculateChange: (change: number) => void
}

const defaultValues: VendingMachineValueContext = {
  payments: PAYMENTS,
  insertedPayment: null,
  purchasedProducts: [],
  isLoading: false,
}

const defaultActions: VendingMachineActionContext = {
  insertPayment: () => {},
  buyProduct: () => {},
  calculateChange: () => {},
}

const ValueContext = createContext<VendingMachineValueContext>(defaultValues)
const ActionContext = createContext<VendingMachineActionContext>(defaultActions)

export function VendingMachineContextProvider({ children }: PropsWithChildren) {
  const [payments, setPayments] = useState<Payment[]>(PAYMENTS)

  const [insertedPayment, setInsertedPayment] = useState<InsertedPayment | null>(null)
  const [purchasedProducts, setPurchasedProducts] = useState<PurchasedProduct[]>([])

  const [isCardPayLoading, setIsCardPayLoading] = useState(false)

  const values = useMemo(
    () => ({ payments, insertedPayment, purchasedProducts, isLoading: isCardPayLoading }),
    [insertedPayment, isCardPayLoading, payments, purchasedProducts],
  )

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

  const actions = useMemo(
    () => ({
      insertPayment: (type: PaymentType, amount: number) => {
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
      },
      buyProduct: (type: PaymentType, product: Product) => {
        if (type === 'cash') {
          cashPay(product)
        } else {
          cardPay(type, product)
        }
      },
      calculateChange: (amount: number) => {
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
      },
    }),
    [cardPay, cashPay],
  )
  return (
    <ValueContext.Provider value={values}>
      <ActionContext.Provider value={actions}>{children}</ActionContext.Provider>
    </ValueContext.Provider>
  )
}

export function useVendingMachineValue() {
  const values = useContext(ValueContext)

  if (values === undefined) {
    throw new Error('ValueContext 내부에서 사용해주세요')
  }

  return values
}

export function useVendingMachineAction() {
  const actionValues = useContext(ActionContext)

  if (actionValues === undefined) {
    throw new Error('ActionContext 내부에서 사용해주세요')
  }

  return actionValues
}
