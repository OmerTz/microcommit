const mockNotifications = {
  requestPermissionsAsync: jest.fn().mockResolvedValue({
    status: 'granted',
    expires: 'never',
    permissions: {
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true
      }
    }
  }),
  
  getExpoPushTokenAsync: jest.fn().mockResolvedValue({
    data: 'ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]'
  }),
  
  setNotificationHandler: jest.fn(),
  
  scheduleNotificationAsync: jest.fn().mockResolvedValue('notification-id'),
  
  getAllScheduledNotificationsAsync: jest.fn().mockResolvedValue([]),
  
  cancelScheduledNotificationAsync: jest.fn().mockResolvedValue(undefined),
  
  cancelAllScheduledNotificationsAsync: jest.fn().mockResolvedValue(undefined),
  
  addNotificationResponseReceivedListener: jest.fn().mockReturnValue({
    remove: jest.fn()
  }),
  
  addNotificationReceivedListener: jest.fn().mockReturnValue({
    remove: jest.fn()
  })
};

export default mockNotifications;
export const requestPermissionsAsync = mockNotifications.requestPermissionsAsync;
export const getExpoPushTokenAsync = mockNotifications.getExpoPushTokenAsync;
export const setNotificationHandler = mockNotifications.setNotificationHandler;
export const scheduleNotificationAsync = mockNotifications.scheduleNotificationAsync;
export const getAllScheduledNotificationsAsync = mockNotifications.getAllScheduledNotificationsAsync;
export const cancelScheduledNotificationAsync = mockNotifications.cancelScheduledNotificationAsync;
export const cancelAllScheduledNotificationsAsync = mockNotifications.cancelAllScheduledNotificationsAsync;
export const addNotificationResponseReceivedListener = mockNotifications.addNotificationResponseReceivedListener;
export const addNotificationReceivedListener = mockNotifications.addNotificationReceivedListener;