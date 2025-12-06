import React, { createContext, useState, useEffect, useContext } from 'react';
import StorageService from '../services/storageService';

const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
    const [devices, setDevices] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [statistics, setStatistics] = useState({
        totalDevices: 0,
        inStock: 0,
        outOfStock: 0,
        lowStock: 0,
        totalValue: 0,
        totalInventory: 0,
    });
    const [loading, setLoading] = useState(true);

    // Load data from storage on mount
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [devicesData, inventoryData, stats] = await Promise.all([
                StorageService.getDevices(),
                StorageService.getInventory(),
                StorageService.getStatistics(),
            ]);
            
            setDevices(devicesData);
            setInventory(inventoryData);
            setStatistics(stats);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const addDevice = async (deviceData) => {
        try {
            const result = await StorageService.saveDevice(deviceData);
            if (result.success) {
                await loadData(); // Reload to get updated data
                return { success: true, device: result.device };
            }
            return { success: false, error: result.error };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const updateDevice = async (deviceId, updates) => {
        try {
            const device = await StorageService.getDeviceById(deviceId);
            if (!device) {
                return { success: false, error: 'Device not found' };
            }
            
            const updatedDevice = { ...device, ...updates };
            const result = await StorageService.saveDevice(updatedDevice);
            if (result.success) {
                await loadData();
                return { success: true, device: updatedDevice };
            }
            return { success: false, error: result.error };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const deleteDevice = async (deviceId) => {
        try {
            const result = await StorageService.deleteDevice(deviceId);
            if (result.success) {
                await loadData();
                return { success: true };
            }
            return { success: false, error: result.error };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const searchDevices = async (query) => {
        try {
            if (!query || query.trim() === '') {
                return devices;
            }
            return await StorageService.searchDevices(query);
        } catch (error) {
            console.error('Error searching devices:', error);
            return [];
        }
    };

    const addInventoryItem = async (itemData) => {
        try {
            const result = await StorageService.saveInventoryItem(itemData);
            if (result.success) {
                await loadData();
                return { success: true };
            }
            return { success: false, error: result.error };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const getDeviceById = async (id) => {
        return await StorageService.getDeviceById(id);
    };

    const refreshData = async () => {
        await loadData();
    };

    return (
        <DeviceContext.Provider
            value={{
                devices,
                inventory,
                statistics,
                loading,
                addDevice,
                updateDevice,
                deleteDevice,
                searchDevices,
                addInventoryItem,
                getDeviceById,
                refreshData,
            }}
        >
            {children}
        </DeviceContext.Provider>
    );
};

export const useDevice = () => {
    const context = useContext(DeviceContext);
    if (!context) {
        throw new Error('useDevice must be used within DeviceProvider');
    }
    return context;
};


