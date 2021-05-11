const verifyAddress = (address) => /^(?:ban)(?:_)(?:1|3)(?:[13456789abcdefghijkmnopqrstuwxyz]{59})$/.test(address)

export default verifyAddress