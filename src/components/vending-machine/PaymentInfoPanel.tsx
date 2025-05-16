import {
  useVendingMachineAction,
  useVendingMachineValue,
} from '@/contexts/VendingMachineContextProvider'
import { colors } from '@/styles/colorPalette'
import { commaizeNumber } from '@/utils/common'
import styled from '@emotion/styled'
import { useCallback, useMemo } from 'react'

function PaymentInfoPanel() {
  const { insertedPayment, isLoading } = useVendingMachineValue()
  const { calculateChange } = useVendingMachineAction()

  const insertedAmount = useMemo(() => {
    if (!insertedPayment) {
      return '0원'
    }

    return insertedPayment.type === 'cash'
      ? `${commaizeNumber(insertedPayment.amount)}원`
      : `카드 투입`
  }, [insertedPayment])

  const handleChangeClick = useCallback(() => {
    if (!insertedPayment) {
      return
    }

    calculateChange(insertedPayment.amount)
  }, [calculateChange, insertedPayment])

  return (
    <InfoPanelRow>
      <InsertedCashSection>
        투입된 금액:{' '}
        <span css={{ marginLeft: 'auto' }}>
          {isLoading ? '카드 결제 진행 중...' : insertedAmount}
        </span>
      </InsertedCashSection>
      <ChangeButton
        onClick={handleChangeClick}
        disabled={
          !insertedPayment || insertedPayment.amount === 0 || insertedPayment.type !== 'cash'
        }
      >
        거스름돈 반환
      </ChangeButton>
    </InfoPanelRow>
  )
}

export default PaymentInfoPanel

const InfoPanelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
`

const InsertedCashSection = styled.div`
  display: flex;
  align-items: center;
  border-radius: 6px;
  padding: 10px;
  background-color: ${colors.gray100};
  flex: 1;
`

const ChangeButton = styled.button`
  height: 40px;
  padding: 0 8px;
  border-radius: 8px;
  background-color: ${colors.black};
  color: ${colors.white};

  &:hover:not(:disabled) {
    background-color: ${colors.gray700};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`
