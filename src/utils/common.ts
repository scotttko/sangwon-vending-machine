export function commaizeNumber(value: string | number) {
  const numStr = String(value)

  if (isNaN(Number(value))) {
    return numStr
  }

  const commaRegex = /\B(?=(\d{3})+(?!\d))/g

  if (numStr.includes('.')) {
    // 소수일 경우
    const splited = numStr.split('.')
    const integers = splited[0].replace(commaRegex, ',')
    const decimals = splited[1]

    return `${integers}${decimals ? `.${decimals}` : ''}`
  } else {
    // 정수일 경우
    return numStr.replace(commaRegex, ',')
  }
}

export const delay = (ms: number) => {
  return new Promise((r) => setTimeout(r, ms))
}

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
