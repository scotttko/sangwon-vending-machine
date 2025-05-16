import PurchasedProductList from '@/components/vending-machine/PurchasedProductList'
import PaymentInfoPanel from '@/components/vending-machine/PaymentInfoPanel'
import Payments from '@/components/vending-machine/Payments'
import Products from '@/components/vending-machine/Products'
import { colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'

function VendingMachinePage() {
  return (
    <VendingMachineContainer>
      <VendingMachine>
        <Products />
        <PaymentInfoPanel />
        <PurchasedProductList />
      </VendingMachine>

      <Payments />
    </VendingMachineContainer>
  )
}

export default VendingMachinePage

const VendingMachineContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 32px 16px;
  width: 100%;
`

const VendingMachine = styled.div`
  padding: 32px 20px;
  background-color: ${colors.red500};
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`
