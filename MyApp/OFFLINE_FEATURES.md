# Offline Features Documentation

## Overview
This mobile device management app is now fully functional **offline** for every mobile phone. All data is stored locally on the device using AsyncStorage, ensuring the app works without internet connectivity.

## Key Features

### 1. **Offline Data Storage**
- All device information, inventory, and user data is stored locally using `@react-native-async-storage/async-storage`
- Data persists across app restarts
- No internet connection required for any operations

### 2. **Device Management**
- **Add Devices**: Store device details (IMEI, model, specs, pricing) offline
- **Search Devices**: Search by IMEI, model name, or serial number - all offline
- **View Device Details**: Access complete device information without network
- **Stock Management**: Track inventory status (In Stock, Out of Stock, Low Stock) locally

### 3. **Stock Operations**
- **Stock In**: Add new devices to inventory (offline)
- **Stock Out**: Process sales and update device status (offline)
- **Inventory Tracking**: View all inventory items with real-time statistics

### 4. **Authentication**
- User authentication state persists offline
- Login/logout works without network connection
- Role-based access (Manager/Team Member) stored locally

### 5. **Statistics & Dashboard**
- Real-time statistics calculated from local data:
  - Total devices count
  - Total inventory value
  - In stock / Out of stock counts
  - Low stock alerts
- Dashboard updates automatically as data changes

## Technical Implementation

### Storage Service (`src/services/storageService.js`)
- Centralized storage management
- CRUD operations for devices and inventory
- Statistics calculation
- Data persistence

### Device Context (`src/context/DeviceContext.js`)
- Global state management for devices
- Automatic data loading on app start
- Real-time updates across screens

### Auth Context (`src/context/AuthContext.js`)
- Persistent authentication state
- Auto-loads saved auth on app start
- Secure logout with data clearing

## Data Structure

### Device Object
```javascript
{
  id: string,
  imei: string,
  modelName: string,
  ram: string,
  storage: string,
  color: string,
  purchasePrice: string,
  sellPrice: string,
  deviceStatus: 'StockIn' | 'StockOut',
  customerName: string,
  customerContact: string,
  customerEmail: string,
  createdAt: ISO string,
  updatedAt: ISO string
}
```

## Usage

### Adding a Device
1. Navigate to "Add Device" screen
2. Enter IMEI (scan or manual entry)
3. Fill in device details
4. Add customer information
5. Device is saved locally immediately

### Searching Devices
1. Go to "Search" screen
2. Enter IMEI, model name, or serial number
3. Results appear instantly from local storage
4. Tap any device to view details

### Processing Stock Out
1. Navigate to "Stock Out" screen
2. Enter/scan IMEI to find device
3. Verify device details
4. Enter sale information
5. Device status updates to "Sold" locally

### Viewing Statistics
- Home screen displays real-time statistics
- All calculations based on local data
- Updates automatically when devices are added/removed

## Benefits

✅ **Works Everywhere**: No internet required
✅ **Fast Performance**: All data stored locally
✅ **Data Privacy**: All information stays on device
✅ **Reliable**: No network dependency
✅ **Cross-Platform**: Works on Android and iOS

## Future Enhancements (Optional)

If you want to add cloud sync later:
1. Add API integration to `storageService.js`
2. Implement sync queue for pending operations
3. Add network detection to trigger sync when online
4. Merge local and remote data intelligently

## Notes

- All data is stored in device's local storage
- Data persists until app is uninstalled or storage is cleared
- No data is sent to external servers
- Perfect for environments with limited or no internet connectivity


