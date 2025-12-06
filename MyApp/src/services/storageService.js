import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const STORAGE_KEYS = {
    DEVICES: '@devices',
    INVENTORY: '@inventory',
    AUTH: '@auth',
    LAST_SYNC: '@last_sync',
    PENDING_SYNC: '@pending_sync',
};

class StorageService {
    // Device operations
    async saveDevice(device) {
        try {
            const devices = await this.getDevices();
            const existingIndex = devices.findIndex(d => d.id === device.id);
            
            if (existingIndex >= 0) {
                devices[existingIndex] = { ...device, updatedAt: new Date().toISOString() };
            } else {
                devices.push({ ...device, id: device.id || Date.now().toString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
            }
            
            await AsyncStorage.setItem(STORAGE_KEYS.DEVICES, JSON.stringify(devices));
            return { success: true, device: devices.find(d => d.id === device.id || d.id === device.id) };
        } catch (error) {
            console.error('Error saving device:', error);
            return { success: false, error: error.message };
        }
    }

    async getDevices() {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEYS.DEVICES);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error getting devices:', error);
            return [];
        }
    }

    async getDeviceById(id) {
        try {
            const devices = await this.getDevices();
            return devices.find(d => d.id === id) || null;
        } catch (error) {
            console.error('Error getting device:', error);
            return null;
        }
    }

    async deleteDevice(id) {
        try {
            const devices = await this.getDevices();
            const filtered = devices.filter(d => d.id !== id);
            await AsyncStorage.setItem(STORAGE_KEYS.DEVICES, JSON.stringify(filtered));
            return { success: true };
        } catch (error) {
            console.error('Error deleting device:', error);
            return { success: false, error: error.message };
        }
    }

    async searchDevices(query) {
        try {
            const devices = await this.getDevices();
            const lowerQuery = query.toLowerCase();
            return devices.filter(device => 
                device.imei?.toLowerCase().includes(lowerQuery) ||
                device.modelName?.toLowerCase().includes(lowerQuery) ||
                device.serialNumber?.toLowerCase().includes(lowerQuery) ||
                device.sku?.toLowerCase().includes(lowerQuery)
            );
        } catch (error) {
            console.error('Error searching devices:', error);
            return [];
        }
    }

    // Inventory operations
    async saveInventoryItem(item) {
        try {
            const inventory = await this.getInventory();
            const existingIndex = inventory.findIndex(i => i.id === item.id);
            
            if (existingIndex >= 0) {
                inventory[existingIndex] = { ...item, updatedAt: new Date().toISOString() };
            } else {
                inventory.push({ ...item, id: item.id || Date.now().toString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
            }
            
            await AsyncStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(inventory));
            return { success: true };
        } catch (error) {
            console.error('Error saving inventory:', error);
            return { success: false, error: error.message };
        }
    }

    async getInventory() {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEYS.INVENTORY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error getting inventory:', error);
            return [];
        }
    }

    // Auth operations
    async saveAuth(authData) {
        try {
            await AsyncStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(authData));
            return { success: true };
        } catch (error) {
            console.error('Error saving auth:', error);
            return { success: false, error: error.message };
        }
    }

    async getAuth() {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEYS.AUTH);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error getting auth:', error);
            return null;
        }
    }

    async clearAuth() {
        try {
            await AsyncStorage.removeItem(STORAGE_KEYS.AUTH);
            return { success: true };
        } catch (error) {
            console.error('Error clearing auth:', error);
            return { success: false, error: error.message };
        }
    }

    // Statistics
    async getStatistics() {
        try {
            const devices = await this.getDevices();
            const inventory = await this.getInventory();
            
            const totalDevices = devices.length;
            const inStock = devices.filter(d => d.deviceStatus === 'StockIn' || d.status === 'In Stock').length;
            const outOfStock = devices.filter(d => d.deviceStatus === 'StockOut' || d.status === 'Out of Stock').length;
            const lowStock = devices.filter(d => d.status === 'Low Stock').length;
            
            const totalValue = devices.reduce((sum, d) => {
                const price = parseFloat(d.purchasePrice || d.sellPrice || 0);
                return sum + price;
            }, 0);

            return {
                totalDevices,
                inStock,
                outOfStock,
                lowStock,
                totalValue,
                totalInventory: inventory.length,
            };
        } catch (error) {
            console.error('Error getting statistics:', error);
            return {
                totalDevices: 0,
                inStock: 0,
                outOfStock: 0,
                lowStock: 0,
                totalValue: 0,
                totalInventory: 0,
            };
        }
    }

    // Clear all data (for testing/reset)
    async clearAll() {
        try {
            await AsyncStorage.multiRemove([
                STORAGE_KEYS.DEVICES,
                STORAGE_KEYS.INVENTORY,
                STORAGE_KEYS.LAST_SYNC,
                STORAGE_KEYS.PENDING_SYNC,
            ]);
            return { success: true };
        } catch (error) {
            console.error('Error clearing all data:', error);
            return { success: false, error: error.message };
        }
    }
}

export default new StorageService();


