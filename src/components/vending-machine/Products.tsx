import { PRODUCTS } from '@/constants/products'
import {
  useVendingMachineAction,
  useVendingMachineValue,
} from '@/contexts/VendingMachineContextProvider'
import type { Product } from '@/models/products'
import { colors } from '@/styles/colorPalette'
import { commaizeNumber } from '@/utils/common'
import styled from '@emotion/styled'
import { useCallback } from 'react'

function Products() {
  const { insertedPayment, isLoading } = useVendingMachineValue()
  const { buyProduct } = useVendingMachineAction()
  const productList = PRODUCTS.map((product) => Array.from({ length: 5 }, () => product))

  const handleProductClick = useCallback(
    (product: Product) => () => {
      if (!insertedPayment) {
        return
      }

      buyProduct(insertedPayment.type, product)
    },
    [buyProduct, insertedPayment],
  )

  return (
    <ProductContainer>
      {productList.map((product, index) => (
        <ProductItemRow key={index}>
          {product.map((item, index) => (
            <ProductItem key={`${item.name}-${index}`}>
              <ProductImage src={`./images/${item.value}.png`} />
              <span>{commaizeNumber(item.price)}원</span>
              <ProductButton
                disabled={
                  isLoading ||
                  !insertedPayment ||
                  (insertedPayment.type === 'cash' && item.price > insertedPayment.amount)
                }
                onClick={handleProductClick(item)}
              >
                구매
              </ProductButton>
            </ProductItem>
          ))}
        </ProductItemRow>
      ))}
    </ProductContainer>
  )
}

export default Products

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 24px 16px;
  border-radius: 14px;
  background-color: ${colors.white};
`

const ProductItemRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 8px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${colors.gray100};
`

const ProductItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;

  span {
    font-size: 16px;
  }
`

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
`

const ProductButton = styled.button`
  padding: 4px 8px;
  border-radius: 10px;
  background-color: ${colors.black};
  color: ${colors.white};

  &:hover:not(:disabled) {
    background-color: ${colors.gray400};
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`
