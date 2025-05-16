export const calculateChange = (amount: number, units: number[]) => {
  const change: Partial<Record<number, number>> = {}
  let remaining = amount

  for (const unit of units) {
    if (remaining >= unit) {
      const quantity = Math.floor(remaining / unit)

      if (quantity > 0) {
        change[unit] = quantity
        remaining -= unit * quantity
      }
    }
  }

  return remaining === 0 ? change : null
}
