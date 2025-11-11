module.exports = {
  configure: jest.fn(),
  syncPurchases: jest.fn(),
  getProducts: jest.fn(),
  purchaseProduct: jest.fn(),
  restorePurchases: jest.fn(),
  getCustomerInfo: jest.fn(),
  setCustomerInfoUpdateListener: jest.fn(),
  default: {
    configure: jest.fn(),
    syncPurchases: jest.fn(),
    getProducts: jest.fn(),
    purchaseProduct: jest.fn(),
    restorePurchases: jest.fn(),
    getCustomerInfo: jest.fn(),
    setCustomerInfoUpdateListener: jest.fn(),
  },
};