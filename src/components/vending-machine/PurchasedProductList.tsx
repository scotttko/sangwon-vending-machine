import { useVendingMachineValue } from '@/contexts/VendingMachineContextProvider'
import { colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'

function PurchasedProductList() {
  const { purchasedProducts } = useVendingMachineValue()

  return (
    <ProductList>
      {purchasedProducts.map((product) => (
        <PurchasedProductItem key={product.value}>
          <img src={`./images/${product.value}.png`} />
          <span>{product.quantity}</span>
        </PurchasedProductItem>
      ))}
    </ProductList>
  )
}

export default PurchasedProductList

const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  background-color: ${colors.gray600};
  padding: 12px;
  border-radius: 10px;
  min-height: 80px;
`

const PurchasedProductItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px;
  background-color: ${colors.white};
  border-radius: 12px;

  img {
    width: 60px;
    height: 60px;
  }

  span {
    padding: 4px 8px;
    font-size: 16px;
    background-color: ${colors.black};
    color: ${colors.white};
    border-radius: 10px;
  }
`
