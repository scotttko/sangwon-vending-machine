import {
  useVendingMachineAction,
  useVendingMachineValue,
} from '@/contexts/VendingMachineContextProvider'
import type { PaymentType } from '@/models/payments'
import { colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'
import { useCallback } from 'react'

function Payments() {
  const { payments } = useVendingMachineValue()
  const { insertPayment } = useVendingMachineAction()

  const handlePaymentClick = useCallback(
    (type: PaymentType, balance: number) => () => {
      insertPayment(type, balance)
    },
    [insertPayment],
  )

  return (
    <PaymentContainer>
      <PaymentTitle>Payments</PaymentTitle>

      <PaymentList>
        {payments.map((pay) => (
          <PaymentItem
            key={pay.id}
            onClick={handlePaymentClick(pay.type, pay.balance)}
            disabled={pay.quantity === 0}
          >
            <img
              src={`./images/${
                pay.type === 'cash' ? `cash_${pay.balance}` : `${pay.type}_card`
              }.png`}
              css={{ width: pay.type === 'cash' && pay.balance >= 1000 ? 80 : 50 }}
            />
            <PaymentQuantity>
              {pay.type === 'cash' ? `${pay.quantity}개` : `${pay.balance}원`}
            </PaymentQuantity>
          </PaymentItem>
        ))}
      </PaymentList>
    </PaymentContainer>
  )
}

export default Payments

const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  border-radius: 10px;
  background-color: ${colors.gray100};
  max-width: 250px;
  width: 100%;
`

const PaymentTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
`

const PaymentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`

const PaymentItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  background-color: ${colors.white};

  &:hover {
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

const PaymentQuantity = styled.div`
  padding: 4px 8px;
  border-radius: 8px;
  border: 1px solid ${colors.gray400};
  margin-left: auto;
`
