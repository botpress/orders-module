  /**
   * Validates the order ID
   * @title Validate order ID
   * @category Custom
   */
  const validateOrderId = async () => {
    try {
      const orderId = parseInt(temp.oid, 10)

      // Make sure the order ID only contains numbers and is of length 10
      if (Number.isInteger(orderId) && temp.oid.length === 10) {
        temp.oidValid = true
      } else {
        temp.oidValid = false
      }
    } catch {
      temp.oidValid = false
    }
  }

  return validateOrderId()