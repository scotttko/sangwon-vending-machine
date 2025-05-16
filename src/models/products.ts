export interface Product {
  name: string
  value: string
  price: number
}

export interface PurchasedProduct extends Product {
  quantity: number
}
