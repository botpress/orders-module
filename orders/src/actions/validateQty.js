/**
 * Validates the quantity
 * @title Validate quantity
 * @category Custom
 */
const validateQuantity = async () => {
  try {
    const qty = parseInt(temp.qty, 10)

    if (Number.isInteger(qty) && qty > 0) {
      temp.qtyValid = true
    } else {
      temp.qtyValid = false
    }
  } catch {
    temp.qtyValid = false
  }
}

return validateQuantity()
